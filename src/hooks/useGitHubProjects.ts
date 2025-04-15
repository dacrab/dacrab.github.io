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

interface CacheEntry {
  data: GitHubRepo[];
  timestamp: number;
  username: string;
}

const CACHE_EXPIRATION = 15 * 60 * 1000; // 15 minutes
const FETCH_DEBOUNCE_DELAY = 500; // ms

const activeRequests = new Map<string, Promise<GitHubRepo[]>>();
const projectsCache = new Map<string, CacheEntry>();
let isSSRPrefetched = false;

const rateLimitState = {
  isLimited: false,
  resetTime: 0,
};

function getCacheKey(username?: string, options?: GitHubProjectsOptions) {
  // Only include relevant options in cache key
  return `github_projects_${username || ""}_${options?.sort || ""}_${options?.direction || ""}_${options?.minStars || ""}_${options?.excludeForks ? 1 : 0}`;
}

function isCacheValid(entry: CacheEntry, username?: string) {
  return (
    entry &&
    Date.now() - entry.timestamp < CACHE_EXPIRATION &&
    entry.username === (username || "")
  );
}

function filterProjects(
  data: GitHubRepo[],
  options?: GitHubProjectsOptions
): GitHubProjectData[] {
  let projects = transformReposToProjects(data);
  if (!options) return projects;
  const { minStars, excludeForks } = options;
  if (minStars || excludeForks) {
    projects = projects.filter(
      (p) =>
        (!minStars || p.stars >= minStars) &&
        (!excludeForks || !p.fork)
    );
  }
  return projects;
}

export function useGitHubProjects(
  username?: string,
  options?: GitHubProjectsOptions,
  shouldFetch: boolean = true
): UseGitHubProjectsResult {
  const [projects, setProjects] = useState<GitHubProjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [fetchAttempted, setFetchAttempted] = useState(false);

  // SSR detection
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const cacheKey = getCacheKey(username, options);

  const fetchProjects = useCallback(async () => {
    if (rateLimitState.isLimited && Date.now() < rateLimitState.resetTime) {
      console.log(
        `GitHub API rate limited. Retry after ${new Date(
          rateLimitState.resetTime
        ).toLocaleTimeString()}`
      );
      return;
    }

    try {
      if (!fetchAttempted) setLoading(true);
      setError(null);

      // Check cache
      const cached = projectsCache.get(cacheKey);
      if (!options?.forceFresh && cached && isCacheValid(cached, username)) {
        setProjects(filterProjects(cached.data, options));
        setLoading(false);
        setFetchAttempted(true);
        return;
      }

      // Deduplicate fetches
      let fetchPromise = activeRequests.get(cacheKey);
      if (!fetchPromise) {
        const params = new URLSearchParams();
        if (username) params.append("username", username);
        if (options?.sort) params.append("sort", options.sort);
        if (options?.direction) params.append("direction", options.direction);

        const requestUrl = `/api/github?${params.toString()}`;
        fetchPromise = fetch(requestUrl)
          .then(async (response) => {
            if (response.status === 429) {
              const resetHeader = response.headers.get("x-ratelimit-reset");
              const resetTime = resetHeader
                ? parseInt(resetHeader) * 1000
                : Date.now() + 60 * 60 * 1000;
              rateLimitState.isLimited = true;
              rateLimitState.resetTime = resetTime;
              throw new Error(
                `GitHub API rate limit exceeded. Resets at ${new Date(
                  resetTime
                ).toLocaleTimeString()}`
              );
            }
            if (!response.ok) {
              let errorMsg = `API error: ${response.status}`;
              try {
                const errorData = await response.json();
                errorMsg = errorData.error || errorMsg;
              } catch {}
              throw new Error(errorMsg);
            }
            rateLimitState.isLimited = false;
            return response.json();
          })
          .finally(() => {
            activeRequests.delete(cacheKey);
            setFetchAttempted(true);
          });
        activeRequests.set(cacheKey, fetchPromise);
      }

      const repos: GitHubRepo[] = await fetchPromise;
      if (repos && Array.isArray(repos) && repos.length > 0) {
        projectsCache.set(cacheKey, {
          data: repos,
          timestamp: Date.now(),
          username: username || "",
        });
      }
      if (isMounted) setProjects(filterProjects(repos, options));
    } catch (err) {
      if (isMounted) {
        setError(err instanceof Error ? err : new Error("Failed to fetch GitHub projects"));
        // Only log in dev
        if (process.env.NODE_ENV !== "production") {
          console.error("Error in useGitHubProjects:", err);
        }
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  }, [username, cacheKey, options, fetchAttempted, isMounted]);

  useEffect(() => {
    if (typeof window !== "undefined" && !fetchAttempted && isSSRPrefetched) {
      setFetchAttempted(true);
      isSSRPrefetched = false;
      return;
    }
    if (shouldFetch && isMounted && !fetchAttempted) {
      const timer = setTimeout(fetchProjects, FETCH_DEBOUNCE_DELAY);
      return () => clearTimeout(timer);
    }
  }, [fetchProjects, shouldFetch, fetchAttempted, isMounted]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
}