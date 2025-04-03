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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.7, delay }}
      className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-500 shadow-md hover:shadow-xl relative"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 ${reversed ? 'lg:grid-flow-dense' : ''}`}>
        {/* Project Metadata Section */}
        <div className={`p-6 md:p-8 lg:col-span-4 ${reversed ? 'lg:col-start-9' : 'lg:col-start-1'} relative flex flex-col justify-between`}>
          {/* Background highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Project number with dot */}
          <div className="mb-6 flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border border-accent/30 bg-card/50 shadow-sm"
              style={{ color: getTagColor(project.tags[0]) }}
            >
              {String(project.id).padStart(2, '0')}
            </div>
            <div className="h-px flex-grow" style={{ background: `linear-gradient(to right, ${getTagColor(project.tags[0])}40, transparent)` }}></div>
          </div>
          
          {/* Primary language/tech tag */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-4">
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-xl font-bold mb-4 group-hover:text-accent transition-colors duration-300"
          >
            {project.title}
          </motion.h3>
          
          <div className="mt-auto">
            {/* Secondary tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.slice(1, 4).map(tag => (
                <span 
                  key={tag} 
                  className="text-xs px-2 py-1 rounded-md border border-border/20 bg-card/40 text-muted shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Project Description + Link Section */}
        <div className={`p-6 md:p-8 border-t lg:border-t-0 ${reversed ? 'lg:border-r' : 'lg:border-l'} border-border/20 lg:col-span-8 ${reversed ? 'lg:col-start-1' : 'lg:col-start-5'} bg-card/20 flex flex-col justify-between`}>
          <motion.p 
            className="text-muted mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
          >
            {project.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ duration: 0.5, delay: delay + 0.4 }}
            className="mt-auto"
          >
            <a 
              href={project.link} 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors border border-accent/20 shadow-sm group-hover:shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="mr-2 font-medium">View Project</span>
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