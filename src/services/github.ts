import { GitHubRepo, GitHubProjectData } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";
const DEFAULT_USERNAME = "dacrab";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || DEFAULT_USERNAME;
const CACHE_DURATION = 3600; // Cache for 1 hour

// Memory cache to avoid redundant API calls
const repoCache = new Map<string, { data: GitHubRepo[], timestamp: number }>();

/**
 * Fetches repositories for a GitHub user
 * 
 * @param username GitHub username (defaults to environment variable or "dacrab")
 * @param sort Sort method for repositories
 * @param direction Sort direction
 * @returns Array of GitHub repositories
 */
export async function fetchGitHubRepos(
  username: string = USERNAME,
  sort: "updated" | "created" | "pushed" | "full_name" = "updated",
  direction: "asc" | "desc" = "desc"
): Promise<GitHubRepo[]> {
  // Create cache key based on parameters
  const cacheKey = `${username}-${sort}-${direction}`;
  
  // Check memory cache first
  const cached = repoCache.get(cacheKey);
  const now = Date.now();
  if (cached && (now - cached.timestamp) < CACHE_DURATION * 1000) {
    return cached.data;
  }
  
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };
    
    // Add auth token if available
    const token = process.env.GITHUB_ACCESS_TOKEN;
    if (token) {
      headers.Authorization = `token ${token}`;
    }
    
    const response = await fetch(
      `${GITHUB_API_URL}/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=100`,
      {
        headers,
        next: { revalidate: CACHE_DURATION }
      }
    );

    // Handle rate limiting more efficiently
    if (response.status === 403 && response.headers.get('X-RateLimit-Remaining') === '0') {
      const resetTime = response.headers.get('X-RateLimit-Reset');
      throw new Error(`GitHub API rate limit exceeded. Reset at ${resetTime ? new Date(parseInt(resetTime) * 1000).toISOString() : 'unknown time'}`);
    }

    // Handle other errors
    if (!response.ok) {
      throw new Error(response.status === 404 
        ? `GitHub user '${username}' not found` 
        : `GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Update memory cache
    repoCache.set(cacheKey, { data, timestamp: now });
    
    return data;
  } catch (error) {
    console.error("GitHub API error:", error instanceof Error ? error.message : String(error));
    throw error instanceof Error ? error : new Error("GitHub API request failed");
  }
}

// Memoization for transformed projects
const projectsCache = new Map<string, GitHubProjectData[]>();

/**
 * Transforms GitHub repositories into project format
 * with memoization for better performance
 * 
 * @param repos Array of GitHub repositories
 * @returns Array of formatted project data
 */
export function transformReposToProjects(repos: GitHubRepo[]): GitHubProjectData[] {
  // Create cache key based on repo IDs to ensure uniqueness
  const cacheKey = repos.map(r => r.id).sort().join('-');
  
  // Return cached result if available
  if (projectsCache.has(cacheKey)) {
    return projectsCache.get(cacheKey)!;
  }
  
  // Process repos and transform to projects
  const projects = repos
    .filter(repo => !repo.fork && !repo.archived && repo.description)
    .map(repo => ({
      id: repo.id,
      title: formatRepoName(repo.name),
      description: repo.description || "No description provided",
      tags: getTags(repo),
      link: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language || "Unknown",
      fork: repo.fork
    }));
  
  // Cache the result
  projectsCache.set(cacheKey, projects);
  
  return projects;
}

// Reuse a string lookup cache for commonly repeated operations
const nameFormatCache = new Map<string, string>();

/**
 * Converts repository name from kebab-case to Title Case
 * with memoization for frequently accessed names
 */
function formatRepoName(name: string): string {
  if (nameFormatCache.has(name)) {
    return nameFormatCache.get(name)!;
  }
  
  const formatted = name
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
    
  nameFormatCache.set(name, formatted);
  return formatted;
}

/**
 * Gets tags for a repository based on topics, language and features
 */
function getTags(repo: GitHubRepo): string[] {
  // Pre-allocate array with expected capacity
  const tags: string[] = [];
  
  // Add language as first tag if it exists
  if (repo.language) {
    tags.push(repo.language);
  }
  
  // Add up to 3 GitHub topics if they exist
  if (repo.topics?.length > 0) {
    // Use length-aware loop instead of slice for better performance
    const topicsLength = Math.min(repo.topics.length, 3);
    for (let i = 0; i < topicsLength; i++) {
      tags.push(repo.topics[i]);
    }
  }
  
  // Ensure at least one tag
  return tags.length > 0 ? tags : ["Code"];
}

/**
 * Clear caches - useful for testing or forced refreshes
 */
export function clearGitHubCaches(): void {
  repoCache.clear();
  projectsCache.clear();
  nameFormatCache.clear();
}