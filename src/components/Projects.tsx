"use client";

import { useRef, useState, useMemo, memo, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { DEFAULT_PROJECTS, transformGitHubToProjects } from "./Projects/types";
import { useIsMobile } from "@/hooks/useIsMobile";

// Import extracted components
import SectionHeader from "./Projects/SectionHeader";
import FeaturedProject from "./Projects/FeaturedProject";
import ProjectCard from "./Projects/ProjectCard";
import LottiePanel from "./Projects/LottiePanel";
import LoadingSpinner from "./Projects/LoadingSpinner";

// Memoize the component to prevent unnecessary re-renders
const Projects = memo(function Projects() {
  const isMobile = useIsMobile();
  // References and scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { 
    once: false, 
    amount: isMobile ? 0.05 : 0.1 
  });
  
  // Added explicit state to track if the component has ever been visible
  // This prevents unnecessary API calls when lazy loading
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  // Set hasBeenVisible state when component comes into view
  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isInView, hasBeenVisible]);
  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Define base animation delay, reduced for mobile
  const baseDelay = isMobile ? 0.6 : 0.7;
  
  // Scroll progress for animations with simplified values
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Optimized transform values with fewer interpolation points
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.9, 1], 
    [0.2, 1, 1, 0.2]
  );
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.9, 1], 
    [0.995, 1, 1, 0.995]
  );
  
  // Fetch GitHub projects with custom hook - only when component is visible and has been visible at least once
  const { projects: githubProjects, loading, error } = useGitHubProjects("dacrab", {
    sort: "updated",
    excludeForks: true,
    minStars: 0,
    forceFresh: false // Use cached data when available
  }, isInView && hasBeenVisible); // Only fetch when visible AND has been visible at least once
  
  // Custom featured projects - memoized to prevent unnecessary recalculations
  const customProjects = useMemo(() => [
    {
      id: 91,
      title: "Argicon.gr",
      description: "A professional website for a technical construction company showcasing their services, projects portfolio, and expertise in infrastructure development with a modern, responsive design.",
      tags: ["TypeScript", "Next.js", "Tailwind CSS", "React"],
      link: "https://argicon.gr",
    },
    {
      id: 92,
      title: "DesignDash.gr",
      description: "A comprehensive digital platform for a technical construction firm featuring project galleries, technical specifications, and service offerings with an emphasis on engineering excellence.",
      tags: ["TypeScript", "Next.js", "Tailwind CSS", "React"],
      link: "https://designdash.gr",
    },
  ], []);
  
  // Process GitHub projects - limit to 6 projects and memoize
  const originalProjects = useMemo(() => {
    // Always use defaults if there was an error or if no projects loaded yet
    if (error) {
      console.log("Using default projects due to error:", error.message);
      return DEFAULT_PROJECTS.slice(0, 6);
    }
    
    // Use GitHub projects if available, otherwise use defaults
    return githubProjects.length > 0 
      ? transformGitHubToProjects(githubProjects).slice(0, 6) 
      : DEFAULT_PROJECTS.slice(0, 6);
  }, [githubProjects, error]);
  
  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-16 md:py-28 relative overflow-hidden"
    >
      {/* Accent glow effects - optimized for performance */}
      {hasBeenVisible && (
        <>
          <motion.div 
            className="absolute top-0 right-[10%] w-[40%] h-[30%] rounded-full bg-accent/15 blur-[150px] opacity-0"
            animate={{ 
              opacity: isInView ? (isMobile ? 0.4 : 0.5) : 0,
              y: isInView ? [0, 10, 0] : 0, // Simplified keyframes
            }}
            transition={{ 
              opacity: { duration: 1.5 },
              y: { 
                repeat: Infinity,
                duration: 20,
                ease: "easeInOut",
                repeatType: "mirror" // More efficient than full cycle
              }
            }}
          />
          <motion.div 
            className="absolute bottom-[20%] left-[5%] w-[30%] h-[25%] rounded-full bg-accent/20 blur-[120px] opacity-0"
            animate={{ 
              opacity: isInView ? (isMobile ? 0.5 : 0.6) : 0,
              scale: isInView ? [1, 1.1, 1] : 0.9, // Simplified keyframes
            }}
            transition={{ 
              opacity: { duration: 1.2, delay: 0.3 },
              scale: { 
                repeat: Infinity,
                duration: 15,
                ease: "easeInOut",
                repeatType: "mirror" // More efficient than full cycle
              }
            }}
          />
        </>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <SectionHeader isInView={isInView} isMobile={isMobile} />
        
        {/* Project grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Featured projects section with Lottie */}
          <motion.div 
            className="backdrop-blur-sm rounded-xl overflow-hidden border border-border/20 shadow-lg relative"
            style={{ 
              background: "rgba(var(--card-rgb), 0.6)",
              opacity,
              scale 
            }}
            // Use layout='position' to optimize rendering
            layout="position"
          >
            {/* Card glow effect - only render if visible */}
            {hasBeenVisible && (
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent/5 to-accent/20 rounded-xl opacity-0"
                animate={{ 
                  opacity: isInView ? [0, isMobile ? 0.4 : 0.5, 0] : 0,
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  repeatType: "mirror" // More efficient than full cycle
                }}
                style={{ filter: "blur(8px)" }}
              />
            )}
            
            <div className="p-5 md:p-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
                {/* Left column: First two featured projects */}
                <div className="lg:col-span-8 space-y-5 md:space-y-6">
                  {/* First featured project - Argicon.gr */}
                  <FeaturedProject 
                    project={customProjects[0]} 
                    isInView={isInView}
                    delay={0.1}
                    index={0}
                    isMobile={isMobile}
                  />
                  
                  {/* Second featured project - DesignDash.gr */}
                  <FeaturedProject 
                    project={customProjects[1]} 
                    isInView={isInView}
                    delay={0.15}
                    reversed
                    index={1}
                    isMobile={isMobile}
                  />
                </div>
                
                {/* Right column: Lottie Animation */}
                <div className="lg:col-span-4">
                  <LottiePanel isInView={isInView} delay={0.2} isMobile={isMobile} />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* GitHub projects section */}
          <div className="mt-12">
            <motion.h3
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 5 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="text-xl md:text-2xl font-bold mb-5 text-gradient text-center"
            >
              GitHub Projects
            </motion.h3>
            
            {/* Loading state with smaller spinner that doesn't disrupt layout */}
            {loading && <LoadingSpinner delay={800} />}
            
            {/* Error state */}
            {error && !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                className="text-center text-xs text-muted mb-6"
              >
                <p>Using fallback projects. {error.message}</p>
              </motion.div>
            )}
            
            {/* Projects grid - Only render up to 6 projects for better performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {originalProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isInView={isInView}
                  delay={baseDelay}
                  index={index}
                  isActive={activeIndex === index}
                  onHoverStart={() => setActiveIndex(index)}
                  onHoverEnd={() => setActiveIndex(null)}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
          
          {/* GitHub link */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 5 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <motion.a 
              href="https://github.com/dacrab" 
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent text-white hover:bg-accent-dark transition-colors duration-200 shadow-md hover:shadow-accent/15 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-background"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)",
                scale: 1.01
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium">View All Projects on GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

// Add display name for better debugging in dev tools
Projects.displayName = 'Projects';

export default Projects;