import { GitHubRepo, GitHubProjectData } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";
const DEFAULT_USERNAME = "dacrab";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || DEFAULT_USERNAME;

/**
 * Fetches repositories for a GitHub user
 * 
 * @param username GitHub username (defaults to environment variable or "dacrab")
 * @param sort Sort method for repositories ("updated", "created", "pushed", "full_name")
 * @param direction Sort direction ("asc" or "desc")
 * @returns Array of GitHub repositories
 */
export async function fetchGitHubRepos(
  username: string = USERNAME,
  sort: "updated" | "created" | "pushed" | "full_name" = "updated",
  direction: "asc" | "desc" = "desc"
): Promise<GitHubRepo[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };
    
    // Add auth token if available
    // In Next.js, server-side environment variables (without NEXT_PUBLIC_) are only available in Server Components
    // or Route Handlers, not in client-side hooks like useGitHubProjects
    // For client usage, you'd need to create an API endpoint that uses the token server-side
    const token = process.env.GITHUB_ACCESS_TOKEN;
    if (token) {
      headers.Authorization = `token ${token}`;
      console.log("Using GitHub access token for authentication");
    } else {
      console.log("No GitHub access token found - rate limits will be stricter");
    }
    
    console.log(`Fetching GitHub repos for username: ${username}`);
    
    // For client-side requests without a token, use unauthenticated access
    const response = await fetch(
      `${GITHUB_API_URL}/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    // Check for rate limit errors specifically
    if (response.status === 403) {
      const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
      const rateLimitReset = response.headers.get('X-RateLimit-Reset');
      
      if (rateLimitRemaining === '0') {
        const resetDate = rateLimitReset 
          ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() 
          : 'unknown time';
        
        console.error(`GitHub API rate limit exceeded. Resets at ${resetDate}`);
        throw new Error(`GitHub API rate limit exceeded. Try again after ${resetDate} or add a personal access token.`);
      }
    }

    if (!response.ok) {
      // Additional error information for troubleshooting
      const errorText = await response.text();
      console.error(`GitHub API error (${response.status}): ${errorText}`);
      
      if (response.status === 404) {
        throw new Error(`GitHub user '${username}' not found. Please check the username.`);
      } else {
        throw new Error(`GitHub API error: ${response.status} - ${response.statusText}`);
      }
    }

    const data: GitHubRepo[] = await response.json();
    console.log(`Successfully fetched ${data.length} repositories`);
    return data;
  } catch (error) {
    // If we have a specific error message already, use it
    if (error instanceof Error) {
      console.error("Error fetching GitHub repositories:", error.message);
      throw error;
    }
    
    // Generic error
    console.error("Unknown error fetching GitHub repositories:", error);
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
  // Filter out forks and archived repositories, if desired
  const filteredRepos = repos.filter(repo => 
    !repo.fork && 
    !repo.archived &&
    repo.description // Only include repos with descriptions
  );

  // Transform GitHub data to project format
  return filteredRepos.map(repo => ({
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
  
  // Add GitHub topics
  if (repo.topics && repo.topics.length > 0) {
    // Limit to 3 topics to avoid cluttering
    tags.push(...repo.topics.slice(0, 3));
  }
  
  // If we still have no tags, add at least one generic tag
  if (tags.length === 0) {
    tags.push("Code");
  }
  
  return tags;
} 