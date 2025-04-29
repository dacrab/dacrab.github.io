import React from 'react';
import { ProjectData } from "./types";
import SwissMotion from "../SwissMotion";
import ProjectTag from "./ProjectTag";
import ProjectLink from "./ProjectLink";
import ProjectMeta from "./ProjectMeta";
import ProjectTitle from "./ProjectTitle";
import ProjectDescription from "./ProjectDescription";

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
      
      <ProjectTitle 
        title={project.title}
        delay={0.35 + (index * 0.05)}
      />
      
      <ProjectDescription
        description={project.description}
        delay={0.4 + (index * 0.05)}
      />
      
      <SwissMotion type="stagger" staggerChildren={0.03} delay={0.45 + (index * 0.05)} className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, i) => (
          <ProjectTag
            key={`${project.id}-${tag}-${i}`}
            tag={tag}
            projectId={project.id}
            index={i}
          />
        ))}
      </SwissMotion>
      
      <SwissMotion type="fade" delay={0.5 + (index * 0.05)} duration={0.5} className="mt-auto">
        <ProjectMeta 
          stars={project.stars} 
          language={project.language}
          delay={0.55 + (index * 0.05)}
        />
        
        <ProjectLink 
          href={project.link} 
          label="View on GitHub"
          delay={0.55 + (index * 0.05)}
        />
      </SwissMotion>
    </SwissMotion>
  );
} 