import { GitHubProjectData } from "@/types/github";

// Project interface used throughout component
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: readonly string[] | string[];
  link: string;
}

// Common props for project components
export interface ProjectBaseProps {
  project: Project;
  isInView?: boolean;
  delay?: number;
  index?: number;
  isActive?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  isMobile?: boolean;
}

// Color mapping for project tags
export const getTagColor = (tag: string): string => {
  const colorMap: Record<string, string> = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#3178c6",
    "Python": "#3572A5",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "React": "#61dafb",
    "Next.js": "#000000",
    "Node.js": "#339933",
    "Java": "#b07219",
    "Go": "#00ADD8",
    "Rust": "#dea584",
    "PHP": "#4F5D95",
    "Ruby": "#701516"
  };
  
  return tag ? colorMap[tag] || "var(--accent)" : "var(--accent)";
};

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  stars?: number;
  language?: string;
}

// Empty default projects array - no fallback when GitHub API fails
export const DEFAULT_PROJECTS: ProjectData[] = [];

/**
 * Transform GitHub project data to ProjectData format
 */
export function transformGitHubToProjects(githubProjects: GitHubProjectData[]): ProjectData[] {
  return githubProjects.map(project => ({
    id: project.id,
    title: formatRepoName(project.name),
    description: project.description || "No description provided",
    tags: [project.language, ...project.topics.slice(0, 3)].filter(Boolean),
    link: project.url,
    stars: project.stars,
    language: project.language
  }));
}

/**
 * Format repository name to be more readable
 */
function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Technology data
export const TECHNOLOGIES = [
  "React",
  "Next.js",
  "TypeScript",
  "TailwindCSS",
  "Framer Motion",
  "WebGL"
];

// Technology descriptions
export const TECH_DESCRIPTIONS: Record<string, string> = {
  "React": "Building interactive UIs with component-based architecture for efficient development and maintenance.",
  "Next.js": "Leveraging server-side rendering and static generation for optimal performance and SEO.",
  "TypeScript": "Ensuring type safety and improved developer experience with static typing.",
  "TailwindCSS": "Creating custom, responsive designs with utility-first CSS for rapid development.",
  "Framer Motion": "Implementing fluid animations and interactive elements that enhance user experience.",
  "WebGL": "Creating immersive 3D experiences and visualizations directly in the browser."
};