import React from 'react';
import { ProjectData } from "./types";
import { ArrowUpRight } from "lucide-react";
import SwissMotion from "../SwissMotion";
import StaggerItem from "../StaggerItem";

interface ProjectCardProps {
  project: ProjectData;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <SwissMotion
      type="scale"
      delay={0.3 + (index * 0.05)}
      duration={0.6}
      whileHover="lift"
      className="swiss-card relative h-full flex flex-col group"
    >
      {/* Swiss style accent elements */}
      <SwissMotion type="reveal" delay={0.4 + (index * 0.05)} duration={0.4}>
        <div className="absolute top-0 right-0 w-1/5 h-1 bg-[var(--accent-tertiary)]"></div>
      </SwissMotion>
      
      <SwissMotion type="slide" delay={0.35 + (index * 0.05)} duration={0.5}>
        <h3 className="font-bold mb-3">{project.title}</h3>
      </SwissMotion>
      
      <SwissMotion type="fade" delay={0.4 + (index * 0.05)} duration={0.5}>
        <p className="text-[var(--muted)] mb-4 text-sm line-clamp-3">{project.description}</p>
      </SwissMotion>
      
      <SwissMotion type="stagger" staggerChildren={0.03} delay={0.45 + (index * 0.05)} className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, i) => (
          <StaggerItem 
            key={`${project.id}-${tag}-${i}`}
            type="fade"
            whileHover="scale"
          >
            <span className="text-xs px-2 py-1 bg-[var(--card-hover)] rounded-sm inline-block">
              {tag}
            </span>
          </StaggerItem>
        ))}
      </SwissMotion>
      
      <SwissMotion type="fade" delay={0.5 + (index * 0.05)} duration={0.5} className="mt-auto">
        {project.stars !== undefined && project.language && (
          <div className="flex items-center mb-4">
            <span className="flex items-center text-xs text-[var(--muted)]">
              <SwissMotion type="scale" delay={0.55 + (index * 0.05)} duration={0.3}>
                ★ {project.stars}
              </SwissMotion>
            </span>
            <span className="ml-4 flex items-center text-xs text-[var(--muted)]">
              <span 
                className="inline-block w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: getLanguageColor(project.language) }}
              ></span>
              {project.language}
            </span>
          </div>
        )}
        
        <SwissMotion whileHover="scale">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View on GitHub 
            <ArrowUpRight size={14} className="ml-1 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </SwissMotion>
      </SwissMotion>
    </SwissMotion>
  );
} 

// Helper function to get language color
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    "C": "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    PHP: "#4F5D95",
    Shell: "#89e051",
    Swift: "#ffac45",
  };

  return colors[language] || "#8b949e"; // Default color if language not found
} 