export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  homepage: string;
  default_branch: string;
}

export interface GitHubProjectData {
  id: number;
  name: string;
  fullName: string;
  url: string;
  description: string;
  fork: boolean;
  stars: number;
  language: string;
  topics: string[];
  homepage: string;
  updatedAt: string;
} 