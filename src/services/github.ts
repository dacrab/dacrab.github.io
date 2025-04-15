import { GitHubRepo, GitHubProjectData } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "dacrab";
const CACHE_DURATION_MS = 3600 * 1000; // 1 hour in ms

const repoCache = new Map<string, { data: GitHubRepo[]; timestamp: number }>();
const projectsCache = new Map<string, GitHubProjectData[]>();
const nameFormatCache = new Map<string, string>();

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

export function transformReposToProjects(repos: GitHubRepo[]): GitHubProjectData[] {
  const cacheKey = repos.map(r => r.id).sort().join("-");
  if (projectsCache.has(cacheKey)) return projectsCache.get(cacheKey)!;

  const projects = repos
    .filter(r => !r.fork && !r.archived && r.description)
    .map(r => ({
      id: r.id,
      title: formatRepoName(r.name),
      description: r.description!,
      tags: getTags(r),
      link: r.html_url,
      stars: r.stargazers_count,
      language: r.language || "Unknown",
      fork: r.fork
    }));

  projectsCache.set(cacheKey, projects);
  return projects;
}

function formatRepoName(name: string): string {
  if (nameFormatCache.has(name)) return nameFormatCache.get(name)!;
  const formatted = name
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  nameFormatCache.set(name, formatted);
  return formatted;
}

function getTags(repo: GitHubRepo): string[] {
  const tags = [];
  if (repo.language) tags.push(repo.language);
  if (repo.topics?.length) tags.push(...repo.topics.slice(0, 3));
  return tags.length ? tags : ["Code"];
}

export function clearGitHubCaches(): void {
  repoCache.clear();
  projectsCache.clear();
  nameFormatCache.clear();
}