import { GitHubProjectData } from "@/types/github";

// Project interface used throughout component
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

// Common props for project components
export interface ProjectBaseProps {
  project: Project;
  isInView: boolean;
  delay: number;
  isActive?: boolean;
  onHover?: () => void;
  onLeave?: () => void;
  index?: number;
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

// Transforms GitHub project data to our Project interface
export const transformGitHubToProjects = (
  githubProjects: GitHubProjectData[]
): Project[] => {
  return githubProjects.map(repo => ({
    id: repo.id,
    title: repo.title,
    description: repo.description,
    tags: repo.tags,
    link: repo.link,
  }));
};

// Default fallback projects if GitHub API fails
export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    description: "A full-featured e-commerce solution built with Next.js, featuring dynamic product pages, cart functionality, payment processing, and admin dashboard.",
    tags: ["Next.js", "React", "Stripe", "MongoDB"],
    link: "#",
  },
  {
    id: 2,
    title: "Creative Portfolio Template",
    description: "A customizable portfolio template for creatives with animations, filtering capabilities, and responsive design for optimal viewing on all devices.",
    tags: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    link: "#",
  },
  {
    id: 3,
    title: "Task Management Dashboard",
    description: "A comprehensive task management system with real-time updates, drag-and-drop functionality, team collaboration tools, and performance analytics.",
    tags: ["TypeScript", "React", "Firebase", "Recharts"],
    link: "#",
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "An intelligent content creation platform that generates high-quality articles, social media posts, and marketing copy using advanced AI algorithms.",
    tags: ["Python", "TensorFlow", "React", "Node.js"],
    link: "#",
  },
];

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