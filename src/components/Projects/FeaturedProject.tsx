import { memo } from "react";
import { ProjectBaseProps } from "./types";
import { ArrowUpRight } from "lucide-react";
import SwissMotion from "../SwissMotion";
import StaggerItem from "../StaggerItem";

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
        <SwissMotion type="slide" delay={0.3 + (index * 0.1)} duration={0.5}>
          <h3 className="text-xl font-bold mb-3">{project.title}</h3>
        </SwissMotion>
        
        <SwissMotion type="fade" delay={0.4 + (index * 0.1)} duration={0.5}>
          <p className="text-[var(--muted)] mb-6">{project.description}</p>
        </SwissMotion>
        
        <SwissMotion type="stagger" staggerChildren={0.05} delay={0.5 + (index * 0.1)} className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, tagIndex) => (
            <StaggerItem 
              key={`${project.id}-${tag}-${tagIndex}`}
              type="fade"
              whileHover="scale"
            >
              <span className="text-xs px-2 py-1 bg-[var(--card-hover)] rounded-sm inline-block">
                {tag}
              </span>
            </StaggerItem>
          ))}
        </SwissMotion>
        
        <SwissMotion 
          type="reveal" 
          delay={0.6 + (index * 0.1)} 
          duration={0.5}
          whileHover="scale"
        >
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="swiss-button inline-flex items-center text-sm gap-2"
          >
            View Project
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </SwissMotion>
      </div>
    </SwissMotion>
  );
});

export default FeaturedProject;