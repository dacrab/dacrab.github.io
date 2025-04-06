import { GitHubRepo, GitHubProjectData } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";
const DEFAULT_USERNAME = "dacrab";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || DEFAULT_USERNAME;
const CACHE_DURATION = 3600; // Cache for 1 hour

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

    // Handle rate limiting
    if (response.status === 403 && response.headers.get('X-RateLimit-Remaining') === '0') {
      const resetTime = response.headers.get('X-RateLimit-Reset');
      const resetDate = resetTime 
        ? new Date(parseInt(resetTime) * 1000).toLocaleTimeString() 
        : 'unknown time';
      
      throw new Error(`GitHub API rate limit exceeded. Try again after ${resetDate} or add a personal access token.`);
    }

    // Handle other errors
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`GitHub user '${username}' not found. Please check the username.`);
      }
      throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch GitHub repositories. Please try again later.");
  }
}

/**
 * Transforms GitHub repositories into project format
 * 
 * @param repos Array of GitHub repositories
 * @returns Array of formatted project data
 */
export function transformReposToProjects(repos: GitHubRepo[]): GitHubProjectData[] {
  return repos
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
}

/**
 * Converts repository name from kebab-case to Title Case
 */
function formatRepoName(name: string): string {
  return name
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Gets tags for a repository based on topics, language and features
 */
function getTags(repo: GitHubRepo): string[] {
  const tags: string[] = [];
  
  // Add language as first tag if it exists
  if (repo.language) {
    tags.push(repo.language);
  }
  
  // Add up to 3 GitHub topics
  if (repo.topics?.length > 0) {
    tags.push(...repo.topics.slice(0, 3));
  }
  
  // Ensure at least one tag
  return tags.length > 0 ? tags : ["Code"];
}