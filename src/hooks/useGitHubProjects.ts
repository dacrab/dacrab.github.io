"use client";

import { useState, useEffect } from "react";
import { GitHubProjectData, GitHubRepo } from "@/types/github";
import { transformReposToProjects } from "@/services/github";

interface UseGitHubProjectsResult {
  projects: GitHubProjectData[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

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

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query params for the API route
      const params = new URLSearchParams();
      if (username) params.append('username', username);
      if (options?.sort) params.append('sort', options.sort);
      if (options?.direction) params.append('direction', options.direction);
      
      // Fetch from our server API route instead of GitHub directly
      // This allows proper authentication with server-side token
      const response = await fetch(`/api/github?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }
      
      const repos: GitHubRepo[] = await response.json();
      let projectData = transformReposToProjects(repos);
      
      // Apply additional filtering client-side
      if (options?.minStars && options.minStars > 0) {
        projectData = projectData.filter(project => project.stars >= options.minStars!);
      }
      
      if (options?.excludeForks) {
        projectData = projectData.filter(project => !project.fork);
      }
      
      setProjects(projectData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch GitHub projects"));
      console.error("Error in useGitHubProjects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [username, options?.sort, options?.direction, options?.minStars, options?.excludeForks]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
}