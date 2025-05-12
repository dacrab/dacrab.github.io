import { GitHubProjectData } from "@/types/github";

// Interfaces
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: readonly string[] | string[];
  link: string;
  hasGallery?: boolean;
  galleryFolder?: string;
}

export interface ProjectData extends Project {
  stars?: number;
  language?: string;
}

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

// Constants
export const DEFAULT_PROJECTS: ProjectData[] = [];
export const TECHNOLOGIES = [
  "React",
  "NextJS",
  "TypeScript",
  "JavaScript",
  "TailwindCSS", 
  "Framer Motion",
  "Svelte",
  "SvelteKit"
];

export const TECH_DESCRIPTIONS: Record<string, string> = {
  "React": "Building interactive UIs with component-based architecture for efficient development and maintenance.",
  "NextJS": "Leveraging server-side rendering and static generation for optimal performance and SEO.",
  "TypeScript": "Ensuring type safety and improved developer experience with static typing.",
  "TailwindCSS": "Creating custom, responsive designs with utility-first CSS for rapid development.",
  "Framer Motion": "Implementing fluid animations and interactive elements that enhance user experience.",
  "JavaScript": "JavaScript is a programming language that allows you to implement complex features on web pages.",
  "Svelte": "Svelte is a modern JavaScript compiler that allows you to build interactive UIs with component-based architecture for efficient development and maintenance.",
  "SvelteKit": "SvelteKit is a framework for building server-side rendered (SSR) web applications with Svelte. It provides a robust routing system, server-side rendering, and a build system for production deployment."
};

// Utilities
export const getTagColor = (tag: string): string => {
  const colorMap: Record<string, string> = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#3178c6",
    "React": "#61dafb",
    "NextJS": "#000000",
    "TailwindCSS": "#38bdf8",
    "Framer Motion": "#0055ff",
    "Svelte": "#ff3e00",
    "SvelteKit": "#ff3e00"
  };
  return tag ? colorMap[tag] || "var(--accent)" : "var(--accent)";
};

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

function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}