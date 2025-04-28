"use client";

import { useState, useEffect, useCallback } from "react";
import { GitHubProjectData } from "@/types/github";
import { fetchGitHubRepos, transformReposToProjects } from "@/services/github";

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

export function useGitHubProjects(
  username: string = "dacrab",
  options: GitHubProjectsOptions = {},
  shouldFetch: boolean = true
): UseGitHubProjectsResult {
  const [projects, setProjects] = useState<GitHubProjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Memoize options to prevent infinite loops
  const { sort, direction, minStars, excludeForks, forceFresh } = options;

  const fetchProjects = useCallback(async () => {
    if (!shouldFetch) return;
    
    try {
      setLoading(true);
      setError(null);

      // Fetch repos from the central service
      const repos = await fetchGitHubRepos(
        username, 
        sort || "updated", 
        direction || "desc", 
        forceFresh
      );
      
      // Transform and filter repos to projects
      const filteredProjects = transformReposToProjects(repos, {
        minStars,
        excludeForks
      });
      
      setProjects(filteredProjects);
    } catch (err) {
      console.error("Error fetching GitHub projects:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch GitHub projects"));
    } finally {
      setLoading(false);
    }
  }, [username, sort, direction, minStars, excludeForks, forceFresh, shouldFetch]);

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