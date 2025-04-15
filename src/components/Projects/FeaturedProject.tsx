import { useRef, memo, useMemo } from "react";
import { motion } from "framer-motion";
import { ProjectBaseProps, getTagColor } from "./types";

interface FeaturedProjectProps extends ProjectBaseProps {
  reversed?: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const FeaturedProject = memo(function FeaturedProject({ 
  project, 
  isInView, 
  delay, 
  reversed = false,
  index = 0,
  isMobile = false
}: FeaturedProjectProps) {
  const containerRef = useRef(null);
  
  // Memoized animation function
  const fadeIn = useMemo(() => (delayOffset: number = 0) => ({
    initial: { opacity: 0, y: isMobile ? 5 : 8 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : (isMobile ? 5 : 8) },
    transition: { 
      duration: isMobile ? 0.3 : 0.4, 
      delay: (delay || 0) + delayOffset + (Math.min(index, 2) * (isMobile ? 0.03 : 0.05)) 
    }
  }), [isMobile, isInView, delay, index]);
  
  // Memoized layout classes
  const layoutClasses = useMemo(() => ({
    grid: `grid grid-cols-1 lg:grid-cols-12 ${reversed ? 'lg:grid-flow-dense' : ''}`,
    metaSection: `p-5 md:p-6 lg:col-span-4 ${reversed ? 'lg:col-start-9' : 'lg:col-start-1'} relative flex flex-col justify-between`,
    contentSection: `p-5 md:p-6 border-t lg:border-t-0 ${reversed ? 'lg:border-r' : 'lg:border-l'} border-border/20 lg:col-span-8 ${reversed ? 'lg:col-start-1' : 'lg:col-start-5'} bg-card/20 flex flex-col justify-between`
  }), [reversed]);
  
  // Memoized primary tag color
  const primaryTagColor = useMemo(() => 
    project.tags && project.tags.length > 0 
      ? getTagColor(project.tags[0]) 
      : undefined,
    [project.tags]
  );

  // Memoize main container animation
  const mainContainerAnimation = useMemo(() => ({
    initial: { opacity: 0, y: isMobile ? 10 : 15 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : (isMobile ? 10 : 15) },
    transition: { duration: isMobile ? 0.4 : 0.5, delay: delay || 0 }
  }), [isInView, isMobile, delay]);
  
  return (
    <motion.div
      ref={containerRef}
      {...mainContainerAnimation}
      className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-300 shadow-md relative"
    >
      <div className={layoutClasses.grid}>
        {/* Project Metadata Section */}
        <div className={layoutClasses.metaSection}>
          {/* Simplified background highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Project number with dot */}
          <div className="mb-5 flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border border-accent/30 bg-card/50"
              style={primaryTagColor ? { color: primaryTagColor } : undefined}
            >
              {String(project.id).padStart(2, '0')}
            </div>
            <div 
              className="h-px flex-grow" 
              style={primaryTagColor ? { background: `linear-gradient(to right, ${primaryTagColor}40, transparent)` } : undefined}
            ></div>
          </div>
          
          {/* Primary language/tech tag */}
          {primaryTagColor && (
            <div className="mb-3">
              <span 
                className="text-xs uppercase tracking-wider font-medium px-2.5 py-0.5 rounded-full"
                style={{ 
                  backgroundColor: `${primaryTagColor}15`, 
                  color: primaryTagColor,
                  border: `1px solid ${primaryTagColor}30`
                }}
              >
                {project.tags[0]}
              </span>
            </div>
          )}
          
          <motion.h3
            {...fadeIn(0.1)}
            className="text-lg md:text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-200"
          >
            {project.title}
          </motion.h3>
          
          <div className="mt-auto">
            {/* Secondary tags - limited to 3 */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.slice(1, 4).map(tag => (
                <span 
                  key={tag} 
                  className="text-xs px-2 py-0.5 rounded-md border border-border/20 bg-card/40 text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Project Description + Link Section */}
        <div className={layoutClasses.contentSection}>
          <motion.p 
            className="text-muted mb-5 text-sm md:text-base"
            {...fadeIn(0.2)}
          >
            {project.description}
          </motion.p>
          
          <motion.div
            {...fadeIn(0.3)}
            className="mt-auto"
          >
            <a 
              href={project.link} 
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors border border-accent/20 text-sm font-medium"
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
});

export default FeaturedProject;