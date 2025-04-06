export interface GitHubRepo {
  readonly id: number;
  readonly name: string;
  readonly full_name: string;
  readonly html_url: string;
  readonly description: string;
  readonly homepage: string;
  readonly stargazers_count: number;
  readonly watchers_count: number;
  readonly forks_count: number;
  readonly language: string;
  readonly topics: readonly string[];
  readonly fork: boolean;
  readonly archived: boolean;
  readonly created_at: string;
  readonly updated_at: string;
  readonly pushed_at: string;
  readonly default_branch: string;
}

export interface GitHubProjectData {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly link: string;
  readonly stars: number;
  readonly language: string;
  readonly fork: boolean;
} 