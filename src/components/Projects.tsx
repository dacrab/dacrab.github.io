"use client";

import { useRef, useState, useMemo, memo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { DEFAULT_PROJECTS, transformGitHubToProjects } from "./Projects/types";
import SectionBackground from "./SectionBackground";

// Import extracted components
import SectionHeader from "./Projects/SectionHeader";
import FeaturedProject from "./Projects/FeaturedProject";
import ProjectCard from "./Projects/ProjectCard";
import LottiePanel from "./Projects/LottiePanel";
import ErrorMessage from "./Projects/ErrorMessage";
import LoadingSpinner from "./Projects/LoadingSpinner";

// Memoize the component to prevent unnecessary re-renders
const Projects = memo(function Projects() {
  // References and scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 }); // Reduced threshold for earlier animation
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Scroll progress for animations with simplified values
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Simplified transform values for better mobile performance
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.2, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.99, 1, 1, 0.99]);
  
  // Fetch GitHub projects with custom hook
  const { projects: githubProjects, loading, error } = useGitHubProjects("dacrab", {
    sort: "updated",
    excludeForks: true,
    minStars: 0
  });
  
  // Custom featured projects
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
  
  // Process GitHub projects - limit to 6 projects for better performance
  const originalProjects = useMemo(() => {
    if (loading || (error && githubProjects.length === 0)) {
      return error || githubProjects.length === 0 ? DEFAULT_PROJECTS.slice(0, 6) : [];
    }
    
    return transformGitHubToProjects(githubProjects).slice(0, 6);
  }, [githubProjects, loading, error]);
  
  // Combine all projects for display
  const displayProjects = useMemo(() => 
    [...customProjects, ...originalProjects], 
    [originalProjects, customProjects]
  );
  
  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-16 md:py-28 relative overflow-hidden" // Reduced padding for mobile
    >
      {/* Grid pattern background */}
      <SectionBackground 
        variant="grid" 
        intensity={0.4} // Reduced intensity
        color="accent" 
        isInView={isInView} 
      />
      
      {/* Abstract decorative elements - simplified for mobile */}
      <motion.div 
        className="absolute top-1/4 -right-36 w-64 h-64 rounded-full bg-gradient-2/10 blur-3xl opacity-60 hidden md:block" // Smaller and hidden on mobile
        style={{ 
          y: useTransform(scrollYProgress, [0, 0.5], [30, -30]), // Reduced movement
          opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.4, 0.4, 0]) 
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 -left-36 w-64 h-64 rounded-full bg-gradient-4/10 blur-3xl opacity-60 hidden md:block" // Smaller and hidden on mobile
        style={{ 
          y: useTransform(scrollYProgress, [0, 0.5], [-20, 20]), // Reduced movement
          opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 0.3, 0.3, 0]) 
        }}
      />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <SectionHeader isInView={isInView} />
        
        {/* Loading State */}
        {loading && <LoadingSpinner />}
        
        {/* Error State */}
        {error && !loading && <ErrorMessage error={error} />}
        
        {/* Project grid */}
        {!loading && displayProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-6"> {/* Reduced gap */}
            {/* Featured projects section with Lottie */}
            <motion.div 
              className="backdrop-blur-sm rounded-xl overflow-hidden border border-border/20 shadow-lg" // Reduced shadow and corner radius
              style={{ 
                background: "rgba(var(--card-rgb), 0.6)",
                opacity,
                scale 
              }}
            >
              <div className="p-5 md:p-8"> {/* Reduced padding */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6"> {/* Responsive gap */}
                  {/* Left column: First two featured projects */}
                  <div className="lg:col-span-8 space-y-5 md:space-y-6"> {/* Reduced spacing */}
                    {/* First featured project - Argicon.gr */}
                    <FeaturedProject 
                      project={customProjects[0]} 
                      isInView={isInView}
                      delay={0.15} // Reduced delay
                      index={0}
                    />
                    
                    {/* Second featured project - DesignDash.gr */}
                    <FeaturedProject 
                      project={customProjects[1]} 
                      isInView={isInView}
                      delay={0.2} // Reduced delay
                      reversed
                      index={1}
                    />
                  </div>
                  
                  {/* Right column: Lottie Animation */}
                  <div className="lg:col-span-4">
                    <LottiePanel isInView={isInView} delay={0.25} /> {/* Reduced delay */}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Additional projects grid - optimized */}
            {originalProjects.length > 0 && (
              <div className="mt-12"> {/* Reduced margin */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }} // Reduced animation distance
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                  transition={{ duration: 0.4, delay: 0.6 }} // Faster animation, reduced delay
                  className="text-xl md:text-2xl font-bold mb-5 text-gradient text-center" // Smaller text and margin
                >
                  More Projects
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"> {/* Reduced gap */}
                  {originalProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.id}
                      project={project} 
                      isInView={isInView}
                      delay={0.7 + (index * 0.06)} // Reduced base delay and increment
                      index={index + 2}
                      isActive={activeIndex === (index + 2)}
                      onHover={() => setActiveIndex(index + 2)}
                      onLeave={() => setActiveIndex(null)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* View all projects button - simplified */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} // Reduced animation distance
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.4, delay: 0.7 }} // Faster animation, reduced delay
          className="mt-12 text-center" // Reduced margin
        >
          <a 
            href="https://github.com/dacrab" 
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent text-white hover:bg-accent-dark transition-colors duration-200 shadow-md hover:shadow-accent/15 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-2 focus:ring-offset-background" // Simplified styles
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-medium">View All Projects on GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
});

export default Projects;