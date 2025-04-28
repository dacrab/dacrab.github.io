import { GitHubRepo, GitHubProjectData } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "dacrab";
const CACHE_DURATION_MS = 3600 * 1000; // 1 hour in ms

const repoCache = new Map<string, { data: GitHubRepo[]; timestamp: number }>();
const projectsCache = new Map<string, GitHubProjectData[]>();

export async function fetchGitHubRepos(
  username: string = USERNAME,
  sort: "updated" | "created" | "pushed" | "full_name" = "updated",
  direction: "asc" | "desc" = "desc"
): Promise<GitHubRepo[]> {
  const cacheKey = `${username}-${sort}-${direction}`;
  const now = Date.now();
  const cached = repoCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_DURATION_MS) return cached.data;

  const headers: HeadersInit = { Accept: "application/vnd.github.v3+json" };
  const token = process.env.GITHUB_ACCESS_TOKEN;
  if (token) headers.Authorization = `token ${token}`;

  const url = `${GITHUB_API_URL}/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=100`;

  const response = await fetch(url, {
    headers,
    next: { revalidate: CACHE_DURATION_MS / 1000 }
  });

  if (response.status === 403 && response.headers.get("X-RateLimit-Remaining") === "0") {
    const reset = response.headers.get("X-RateLimit-Reset");
    throw new Error(
      `GitHub API rate limit exceeded. Reset at ${
        reset ? new Date(+reset * 1000).toISOString() : "unknown time"
      }`
    );
  }
  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? `GitHub user '${username}' not found`
        : `GitHub API error: ${response.status}`
    );
  }

  const data = await response.json();
  repoCache.set(cacheKey, { data, timestamp: now });
  return data;
}

/**
 * Transforms GitHub API repository data into project format
 */
export function transformReposToProjects(repos: GitHubRepo[]): GitHubProjectData[] {
  if (!repos || !Array.isArray(repos)) return [];
  
  return repos.map(repo => ({
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

export function clearGitHubCaches(): void {
  repoCache.clear();
  projectsCache.clear();
}