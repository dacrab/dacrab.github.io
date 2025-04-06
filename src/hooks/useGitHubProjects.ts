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

/**
 * Custom hook to fetch and manage GitHub projects via server API route
 * This approach securely handles authentication by keeping tokens on the server
 * 
 * @param username GitHub username
 * @param options Additional options for fetching repositories
 * @returns Object containing projects, loading state, error, and refetch function
 */
export function useGitHubProjects(
  username?: string,
  options?: {
    sort?: "updated" | "created" | "pushed" | "full_name";
    direction?: "asc" | "desc";
    minStars?: number;
    excludeForks?: boolean;
  }
): UseGitHubProjectsResult {
  const [projects, setProjects] = useState<GitHubProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize options to use as dependency for fetchProjects
  const optionsString = useMemo(() => {
    return JSON.stringify({
      username,
      sort: options?.sort,
      direction: options?.direction,
      minStars: options?.minStars,
      excludeForks: options?.excludeForks
    });
  }, [username, options?.sort, options?.direction, options?.minStars, options?.excludeForks]);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query params for the API route
      const params = new URLSearchParams();
      if (username) params.append('username', username);
      if (options?.sort) params.append('sort', options.sort);
      if (options?.direction) params.append('direction', options.direction);
      
      const requestUrl = `/api/github?${params.toString()}`;
      
      // Deduplicate active fetch requests
      let fetchPromise = activeRequests.get(requestUrl);
      
      if (!fetchPromise) {
        // Create new request if none exists
        fetchPromise = fetch(requestUrl)
          .then(response => {
            if (!response.ok) {
              return response.json().then(errorData => {
                throw new Error(errorData.error || `API error: ${response.status}`);
              });
            }
            return response.json();
          })
          .finally(() => {
            // Remove from active requests when done
            activeRequests.delete(requestUrl);
          });
          
        // Store the promise to deduplicate subsequent requests
        activeRequests.set(requestUrl, fetchPromise);
      }
      
      // Wait for the request to complete
      const repos: GitHubRepo[] = await fetchPromise;
      
      // Apply transformations and filtering efficiently
      let projectData = transformReposToProjects(repos);
      
      // Apply client-side filtering with optimized conditionals
      if (options) {
        const { minStars, excludeForks } = options;
        
        if ((minStars && minStars > 0) || excludeForks) {
          projectData = projectData.filter(project => {
            // Combine filter conditions for a single pass
            const passesStarFilter = !minStars || project.stars >= minStars;
            const passesForkFilter = !excludeForks || !project.fork;
            return passesStarFilter && passesForkFilter;
          });
        }
      }
      
      setProjects(projectData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch GitHub projects"));
      console.error("Error in useGitHubProjects:", err);
    } finally {
      setLoading(false);
    }
  }, [optionsString]); // Use the memoized string as dependency

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
}