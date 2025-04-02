import { motion } from "framer-motion";
import { ProjectBaseProps, getTagColor } from "./types";

interface ProjectCardProps extends ProjectBaseProps {
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export default function ProjectCard({ 
  project, 
  isInView, 
  delay, 
  onHover, 
  onLeave 
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.7, delay }}
      className="relative bg-card/10 backdrop-blur-sm border-2 border-border rounded-xl overflow-hidden h-full group hover:border-accent/50 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)] transition-all duration-300"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Top badge */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-4">
            <span 
              className="text-xs uppercase tracking-wider font-medium px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: `${getTagColor(project.tags[0])}15`, 
                color: getTagColor(project.tags[0]),
                border: `1px solid ${getTagColor(project.tags[0])}30`
              }}
            >
              {project.tags[0]}
            </span>
          </div>
        )}
        
        <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-muted text-sm mb-4 flex-grow">
          {project.description.length > 120 
            ? `${project.description.substring(0, 120)}...` 
            : project.description}
        </p>
        
        {/* Secondary tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(1, 3).map(tag => (
            <span 
              key={tag} 
              className="text-xs bg-background/50 px-1.5 py-0.5 rounded-md border border-border/30 text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pt-3 border-t border-border/10">
          <a 
            href={project.link} 
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center text-xs text-accent hover:text-accent-light transition-colors"
          >
            <span className="mr-1">View Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
} 