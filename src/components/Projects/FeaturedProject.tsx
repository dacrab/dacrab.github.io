import { useRef } from "react";
import { motion } from "framer-motion";
import { ProjectBaseProps, getTagColor } from "./types";

interface FeaturedProjectProps extends ProjectBaseProps {
  reversed?: boolean;
}

export default function FeaturedProject({ 
  project, 
  isInView, 
  delay, 
  reversed = false 
}: FeaturedProjectProps) {
  const containerRef = useRef(null);
  
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.8, delay }}
      className="relative bg-card/10 backdrop-blur-sm border-2 border-border rounded-xl overflow-hidden group hover:border-accent/50 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)] transition-all duration-500"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 min-h-[200px] ${reversed ? 'lg:grid-flow-dense' : ''}`}>
        {/* Project Metadata Section */}
        <div className={`p-8 lg:col-span-4 ${reversed ? 'lg:col-start-9' : 'lg:col-start-1'} relative flex flex-col justify-center`}>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Project number/identifier and minimal decoration */}
          <div className="mb-6 flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono border-2"
              style={{ borderColor: `${getTagColor(project.tags[0])}33` }}
            >
              {String(project.id).padStart(2, '0')}
            </div>
            <div className="h-[1px] flex-grow" style={{ background: `linear-gradient(to right, ${getTagColor(project.tags[0])}40, transparent)` }}></div>
          </div>
          
          {/* Primary language/tech tag */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-3">
              <span 
                className="text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full"
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
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300"
          >
            {project.title}
          </motion.h3>
          
          <div className="mt-auto">
            {/* Secondary tags */}
            <div className="flex flex-wrap gap-2 mt-4 mb-4">
              {project.tags.slice(1).map(tag => (
                <span 
                  key={tag} 
                  className="text-xs bg-background/50 px-2 py-1 rounded-md border border-border/30 text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Project Description + Link Section */}
        <div className={`p-8 border-t lg:border-t-0 ${reversed ? 'lg:border-r' : 'lg:border-l'} border-border/10 lg:col-span-8 ${reversed ? 'lg:col-start-1' : 'lg:col-start-5'} flex flex-col justify-center`}>
          <motion.p 
            className="text-muted mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
          >
            {project.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: delay + 0.4 }}
            className="mt-auto"
          >
            <a 
              href={project.link} 
              className="inline-flex items-center text-accent hover:text-accent-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mr-2">View Project</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 