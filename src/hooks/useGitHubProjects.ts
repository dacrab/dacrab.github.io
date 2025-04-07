"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { GitHubProjectData, GitHubRepo } from "@/types/github";
import { transformReposToProjects } from "@/services/github";

interface UseGitHubProjectsResult {
  projects: GitHubProjectData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

// Active requests tracker to prevent duplicate requests
const activeRequests = new Map<string, Promise<GitHubRepo[]>>();

// Cache for GitHub projects data
interface CacheEntry {
  data: GitHubRepo[];
  timestamp: number;
  username: string;
}

// Global cache for GitHub projects
const projectsCache = new Map<string, CacheEntry>();

// Cache expiration time (increased to 15 minutes for better performance)
const CACHE_EXPIRATION = 15 * 60 * 1000;

// SSR prefetched flag to avoid refetching on client after SSR
let isSSRPrefetched = false;

// Rate limit tracking - prevent excessive requests if rate limit hit
const rateLimitState = {
  isLimited: false,
  resetTime: 0,
  retryCount: 0
};

/**
 * Custom hook to fetch and manage GitHub projects via server API route
 * This approach securely handles authentication by keeping tokens on the server
 * 
 * @param username GitHub username
 * @param options Additional options for fetching repositories
 * @param shouldFetch Control when fetching happens (e.g., based on component visibility)
 * @returns Object containing projects, loading state, error, and refetch function
 */
export function useGitHubProjects(
  username?: string,
  options?: {
    sort?: "updated" | "created" | "pushed" | "full_name";
    direction?: "asc" | "desc";
    minStars?: number;
    excludeForks?: boolean;
    forceFresh?: boolean; // Force fresh data fetch bypassing cache
  },
  shouldFetch: boolean = true
): UseGitHubProjectsResult {
  const [projects, setProjects] = useState<GitHubProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [fetchAttempted, setFetchAttempted] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // For SSR detection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoize options to use as dependency for fetchProjects
  const optionsString = useMemo(() => {
    return JSON.stringify({
      username,
      sort: options?.sort,
      direction: options?.direction,
      minStars: options?.minStars,
      excludeForks: options?.excludeForks,
      forceFresh: options?.forceFresh
    });
  }, [username, options?.sort, options?.direction, options?.minStars, options?.excludeForks, options?.forceFresh]);

  // Generate cache key from request parameters
  const getCacheKey = (requestUrl: string) => {
    return `github_projects_${requestUrl}`;
  };

  // Check if cache is valid and hasn't expired
  const isCacheValid = (cacheEntry: CacheEntry) => {
    return (
      cacheEntry &&
      Date.now() - cacheEntry.timestamp < CACHE_EXPIRATION && 
      cacheEntry.username === username
    );
  };

  // Function to apply client-side filtering to projects
  const filterProjects = useCallback((data: GitHubRepo[]): GitHubProjectData[] => {
    let projectData = transformReposToProjects(data);
    
    if (options) {
      const { minStars, excludeForks } = options;
      
      if ((minStars && minStars > 0) || excludeForks) {
        projectData = projectData.filter(project => {
          const passesStarFilter = !minStars || project.stars >= minStars;
          const passesForkFilter = !excludeForks || !project.fork;
          return passesStarFilter && passesForkFilter;
        });
      }
    }
    
    return projectData;
  }, [options]);

  const fetchProjects = useCallback(async () => {
    // Skip fetching if we hit a rate limit and it hasn't reset yet
    if (rateLimitState.isLimited && Date.now() < rateLimitState.resetTime) {
      console.log(`GitHub API rate limited. Retry after ${new Date(rateLimitState.resetTime).toLocaleTimeString()}`);
      return;
    }

    try {
      // Only show loading state if we haven't fetched before
      if (!fetchAttempted) {
        setLoading(true);
      }
      setError(null);
      
      // Build query params for the API route
      const params = new URLSearchParams();
      if (username) params.append('username', username);
      if (options?.sort) params.append('sort', options.sort);
      if (options?.direction) params.append('direction', options.direction);
      
      const requestUrl = `/api/github?${params.toString()}`;
      const cacheKey = getCacheKey(requestUrl);
      
      // Check cache first if not forcing fresh data
      const cachedData = projectsCache.get(cacheKey);
      if (!options?.forceFresh && cachedData && isCacheValid(cachedData)) {
        console.log('Using cached GitHub projects data');
        
        // Apply client-side filtering to cached data
        const filteredProjects = filterProjects(cachedData.data);
        setProjects(filteredProjects);
        setLoading(false);
        setFetchAttempted(true);
        return;
      }
      
      // Deduplicate active fetch requests
      let fetchPromise = activeRequests.get(requestUrl);
      
      if (!fetchPromise) {
        // Create new request if none exists
        fetchPromise = fetch(requestUrl)
          .then(response => {
            if (response.status === 429) {
              // Handle rate limit
              const resetHeader = response.headers.get('x-ratelimit-reset');
              const resetTime = resetHeader 
                ? parseInt(resetHeader) * 1000 // Convert from seconds to milliseconds
                : Date.now() + 60 * 60 * 1000; // Default to 1 hour if header not available
              
              rateLimitState.isLimited = true;
              rateLimitState.resetTime = resetTime;
              rateLimitState.retryCount++;
              
              throw new Error(`GitHub API rate limit exceeded. Resets at ${new Date(resetTime).toLocaleTimeString()}`);
            }
            
            if (!response.ok) {
              return response.json().then(errorData => {
                throw new Error(errorData.error || `API error: ${response.status}`);
              }).catch(() => {
                throw new Error(`Network error: ${response.status}`);
              });
            }
            
            // Reset rate limit state on successful request
            rateLimitState.isLimited = false;
            rateLimitState.retryCount = 0;
            
            return response.json();
          })
          .finally(() => {
            // Remove from active requests when done
            activeRequests.delete(requestUrl);
            setFetchAttempted(true);
          });
          
        // Store the promise to deduplicate subsequent requests
        activeRequests.set(requestUrl, fetchPromise);
      }
      
      // Wait for the request to complete
      const repos: GitHubRepo[] = await fetchPromise;
      
      // Store in cache
      if (repos && Array.isArray(repos) && repos.length > 0) {
        projectsCache.set(cacheKey, {
          data: repos,
          timestamp: Date.now(),
          username: username || ''
        });
      }
      
      // Only update state if component is still mounted
      if (isMounted) {
        // Apply transformations and filtering
        const filteredProjects = filterProjects(repos);
        setProjects(filteredProjects);
      }
    } catch (err) {
      if (isMounted) {
        setError(err instanceof Error ? err : new Error("Failed to fetch GitHub projects"));
        console.error("Error in useGitHubProjects:", err);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  }, [username, filterProjects, fetchAttempted, isMounted, options?.sort, options?.direction, options?.forceFresh, isCacheValid]);

  useEffect(() => {
    // Skip fetch if SSR prefetched and this is first client render
    if (typeof window !== 'undefined' && !fetchAttempted && isSSRPrefetched) {
      setFetchAttempted(true);
      isSSRPrefetched = false;
      return;
    }
    
    // Only fetch if the component should fetch and is mounted
    if (shouldFetch && isMounted && (!fetchAttempted || optionsString)) {
      // Add a small delay to prevent rapid consecutive API calls
      // and to prioritize UI rendering
      const debounceTimer = setTimeout(() => {
        fetchProjects();
      }, 500); // Increased delay for better performance
      
      return () => clearTimeout(debounceTimer);
    }
  }, [fetchProjects, shouldFetch, fetchAttempted, optionsString, isMounted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
}