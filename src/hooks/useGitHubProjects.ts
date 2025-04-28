"use client";

import { useState, useEffect, useCallback } from "react";
import { GitHubProjectData, GitHubRepo } from "@/types/github";
import { transformReposToProjects } from "@/services/github";

interface UseGitHubProjectsResult {
  projects: GitHubProjectData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

interface GitHubProjectsOptions {
  sort?: "updated" | "created" | "pushed" | "full_name";
  direction?: "asc" | "desc";
  minStars?: number;
  excludeForks?: boolean;
  forceFresh?: boolean;
}

// Cache implementation
const CACHE_EXPIRATION = 15 * 60 * 1000; // 15 minutes
const projectsCache = new Map<string, { data: GitHubRepo[], timestamp: number }>();

export function useGitHubProjects(
  username: string = "dacrab",
  options: GitHubProjectsOptions = {},
  shouldFetch: boolean = true
): UseGitHubProjectsResult {
  const [projects, setProjects] = useState<GitHubProjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Generate a cache key based on query parameters
  const cacheKey = `${username}_${options.sort || ""}_${options.direction || ""}`;
  
  // Memoize options to prevent infinite loops
  const { minStars, excludeForks, forceFresh } = options;

  const fetchProjects = useCallback(async () => {
    if (!shouldFetch) return;
    
    try {
      setLoading(true);
      setError(null);

      // Check cache first if not forcing fresh data
      const cached = projectsCache.get(cacheKey);
      if (!forceFresh && cached && (Date.now() - cached.timestamp < CACHE_EXPIRATION)) {
        const filteredProjects = transformReposToProjects(cached.data).filter(project => 
          (!minStars || project.stars >= (minStars || 0)) &&
          (!excludeForks || !project.fork)
        );
        setProjects(filteredProjects);
        setLoading(false);
        return;
      }

      // Build query parameters
      const params = new URLSearchParams();
      if (username) params.append("username", username);
      if (options.sort) params.append("sort", options.sort);
      if (options.direction) params.append("direction", options.direction);

      // Fetch from API
      const response = await fetch(`/api/github?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const repos: GitHubRepo[] = await response.json();
      
      // Cache the results
      projectsCache.set(cacheKey, {
        data: repos,
        timestamp: Date.now()
      });
      
      // Filter and transform the projects
      const filteredProjects = transformReposToProjects(repos).filter(project => 
        (!minStars || project.stars >= (minStars || 0)) &&
        (!excludeForks || !project.fork)
      );
      
      setProjects(filteredProjects);
    } catch (err) {
      console.error("Error fetching GitHub projects:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch GitHub projects"));
    } finally {
      setLoading(false);
    }
  }, [username, cacheKey, minStars, excludeForks, forceFresh, shouldFetch, options.direction, options.sort]);

  useEffect(() => {
    if (shouldFetch) {
      fetchProjects();
    }
  }, [fetchProjects, shouldFetch]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
}