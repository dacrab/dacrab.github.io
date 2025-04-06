import { motion } from "framer-motion";
import { ProjectBaseProps, getTagColor } from "./types";
import { memo } from "react";

// Memoize the component to prevent unnecessary re-renders
const ProjectCard = memo(function ProjectCard({ 
  project, 
  isInView, 
  delay,
  isActive,
  onHover,
  onLeave,
  index
}: ProjectBaseProps) {
  const primaryTag = project.tags?.[0];
  const primaryTagColor = primaryTag ? getTagColor(primaryTag) : '';
  
  // Delay calculation that caps the index value for better mobile performance
  const calculatedDelay = delay + (Math.min(index || 0, 5) * 0.05);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
      transition={{ duration: 0.4, delay: calculatedDelay }}
      className={`group bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-200 flex flex-col h-full shadow-sm ${isActive ? 'ring-2 ring-accent/40' : ''}`}
      onMouseEnter={() => onHover?.()}
      onMouseLeave={() => onLeave?.()}
    >
      {/* Card header */}
      <div className="p-4 border-b border-border/20 flex items-center justify-between">
        {/* Primary tag */}
        {primaryTag && (
          <span 
            className="text-xs uppercase tracking-wider font-medium px-2.5 py-0.5 rounded-full"
            style={{ 
              backgroundColor: `${primaryTagColor}15`, 
              color: primaryTagColor,
              border: `1px solid ${primaryTagColor}30`
            }}
          >
            {primaryTag}
          </span>
        )}
        
        {/* Project ID */}
        <div 
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border border-accent/30 bg-card/50"
          style={{ color: primaryTagColor }}
        >
          {String(project.id).padStart(2, '0')}
        </div>
      </div>
      
      {/* Card body */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-base md:text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>
        
        <p className="text-muted text-sm mb-3 flex-grow">
          {project.description}
        </p>
        
        {/* Secondary tags */}
        <div className="flex flex-wrap gap-1 mt-auto">
          {project.tags?.slice(1, 4).map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 rounded-md border border-border/20 bg-card/40 text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Card footer */}
      <div className="p-4 border-t border-border/20 bg-card/20">
        <a 
          href={project.link} 
          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors border border-accent/20 text-sm font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="mr-2">View Project</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
});

export default ProjectCard; 