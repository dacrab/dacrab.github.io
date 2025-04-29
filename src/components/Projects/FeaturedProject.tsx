import { memo } from "react";
import { ProjectBaseProps } from "./types";
import SwissMotion from "../SwissMotion";
import ProjectTag from "./ProjectTag";
import ProjectLink from "./ProjectLink";
import ProjectTitle from "./ProjectTitle";
import ProjectDescription from "./ProjectDescription";

interface FeaturedProjectProps extends ProjectBaseProps {
  reversed?: boolean;
  index?: number;
}

const FeaturedProject = memo(function FeaturedProject({ 
  project, 
  reversed = false,
  index = 0
}: FeaturedProjectProps) {
  
  return (
    <SwissMotion
      type="scale"
      delay={0.2 + (index * 0.1)}
      duration={0.7}
      whileHover="lift"
      className={`swiss-card relative ${reversed ? 'swiss-grid-reversed' : ''}`}
    >
      {/* Swiss style accent elements */}
      <SwissMotion type="reveal" delay={0.3 + (index * 0.1)} duration={0.4}>
        <div className={`absolute ${reversed ? 'right-0' : 'left-0'} top-0 w-1/3 h-1 bg-[var(--accent)]`}></div>
      </SwissMotion>
      
      <SwissMotion type="reveal" delay={0.4 + (index * 0.1)} duration={0.4}>
        <div className={`absolute ${reversed ? 'left-0 bottom-0' : 'right-0 top-0'} w-1 h-1/4 bg-[var(--accent-secondary)]`}></div>
      </SwissMotion>
      
      <div className="mb-6">
        <ProjectTitle 
          title={project.title}
          delay={0.3 + (index * 0.1)}
          isFeatured={true}
        />
        
        <ProjectDescription
          description={project.description}
          delay={0.4 + (index * 0.1)}
          isFeatured={true}
        />
        
        <SwissMotion type="stagger" staggerChildren={0.05} delay={0.5 + (index * 0.1)} className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, tagIndex) => (
            <ProjectTag
              key={`${project.id}-${tag}-${tagIndex}`}
              tag={tag}
              projectId={project.id}
              index={tagIndex}
            />
          ))}
        </SwissMotion>
        
        <ProjectLink 
          href={project.link} 
          delay={0.6 + (index * 0.1)}
          isButtonStyle={true}
        />
      </div>
    </SwissMotion>
  );
});

export default FeaturedProject;