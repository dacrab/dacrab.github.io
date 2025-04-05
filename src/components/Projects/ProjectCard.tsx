import { motion } from "framer-motion";
import { ProjectBaseProps, getTagColor } from "./types";

export default function ProjectCard({ 
  project, 
  isInView, 
  delay,
  isActive,
  onHover,
  onLeave,
}: ProjectBaseProps) {
  const primaryTag = project.tags?.[0];
  const primaryTagColor = primaryTag ? getTagColor(primaryTag) : '';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5, delay }}
      className={`group bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-lg ${isActive ? 'ring-2 ring-accent/40' : ''}`}
      onMouseEnter={() => onHover?.()}
      onMouseLeave={() => onLeave?.()}
    >
      {/* Card header */}
      <div className="p-5 border-b border-border/20 flex items-center justify-between">
        {/* Primary tag */}
        {primaryTag && (
          <span 
            className="text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full"
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
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border border-accent/30 bg-card/50 shadow-sm"
          style={{ color: primaryTagColor }}
        >
          {String(project.id).padStart(2, '0')}
        </div>
      </div>
      
      {/* Card body */}
      <div className="p-5 flex-grow flex flex-col">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
          className="text-lg font-bold mb-3 group-hover:text-accent transition-colors duration-300"
        >
          {project.title}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
          className="text-muted text-sm mb-4 flex-grow"
        >
          {project.description}
        </motion.p>
        
        {/* Secondary tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
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
      <div className="p-5 border-t border-border/20 bg-card/20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.4, delay: delay + 0.4 }}
        >
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
        </motion.div>
      </div>
    </motion.div>
  );
} 