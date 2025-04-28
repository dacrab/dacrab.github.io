import { GitHubRepo, GitHubProjectData } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "dacrab";
// Using a larger cache duration since we have revalidation controls elsewhere
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour in ms

// Single cache for repos that can be used both client and server side
const cache = {
  repos: new Map<string, { data: GitHubRepo[]; timestamp: number }>()
};

/**
 * Fetches GitHub repositories for a user with caching
 */
export async function fetchGitHubRepos(
  username: string = USERNAME,
  sort: "updated" | "created" | "pushed" | "full_name" = "updated",
  direction: "asc" | "desc" = "desc",
  forceFresh: boolean = false
): Promise<GitHubRepo[]> {
  const cacheKey = `${username}-${sort}-${direction}`;
  const now = Date.now();
  const cached = cache.repos.get(cacheKey);
  
  // Return cached data if available and not forcing fresh
  if (!forceFresh && cached && now - cached.timestamp < CACHE_DURATION_MS) {
    return cached.data;
  }

  const headers: HeadersInit = { 
    Accept: "application/vnd.github.v3+json",
    'User-Agent': 'Portfolio-Website'
  };
  
  // Use token from environment if available
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_ACCESS_TOKEN;
  if (token) headers.Authorization = `token ${token}`;

  const url = `${GITHUB_API_URL}/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=100`;

  try {
    const response = await fetch(url, {
      headers,
      // Only use Next.js cache when running on the server
      ...(typeof window === 'undefined' && {
        next: { revalidate: CACHE_DURATION_MS / 1000 }
      })
    });

    // Handle rate limiting
    if (response.status === 403 && response.headers.get("X-RateLimit-Remaining") === "0") {
      const reset = response.headers.get("X-RateLimit-Reset");
      throw new Error(
        `GitHub API rate limit exceeded. Reset at ${
          reset ? new Date(+reset * 1000).toISOString() : "unknown time"
        }`
      );
    }
    
    // Handle other errors
    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? `GitHub user '${username}' not found`
          : `GitHub API error: ${response.status}`
      );
    }

    const data = await response.json();
    // Update cache
    cache.repos.set(cacheKey, { data, timestamp: now });
    return data;
  } catch (error) {
    console.error('GitHub API error:', error);
    
    // If we have cached data, return it despite the error
    if (cached) return cached.data;
    
    // Otherwise re-throw
    throw error;
  }
}

/**
 * Transforms GitHub API repository data into project format
 */
export function transformReposToProjects(
  repos: GitHubRepo[], 
  options: { minStars?: number; excludeForks?: boolean } = {}
): GitHubProjectData[] {
  if (!repos || !Array.isArray(repos)) return [];
  
  return repos
    .filter(repo => 
      // Apply filtering based on options
      (!options.minStars || repo.stargazers_count >= options.minStars) &&
      (!options.excludeForks || !repo.fork)
    )
    .map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      url: repo.html_url,
      description: repo.description || "",
      fork: repo.fork,
      stars: repo.stargazers_count,
      language: repo.language || "Unknown",
      topics: repo.topics || [],
      homepage: repo.homepage || "",
      updatedAt: repo.updated_at
    }));
}

/**
 * Clears all GitHub caches
 */
export function clearGitHubCaches(): void {
  cache.repos.clear();
}