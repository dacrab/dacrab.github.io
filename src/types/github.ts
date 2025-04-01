export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  homepage: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  default_branch: string;
}

export interface GitHubProjectData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  stars: number;
  language: string;
  fork: boolean;
} 