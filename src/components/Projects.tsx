"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { Project, DEFAULT_PROJECTS, transformGitHubToProjects } from "./Projects/types";

// Import extracted components
import SectionHeader from "./Projects/SectionHeader";
import InnovationSpotlight from "./Projects/InnovationSpotlight";
import FeaturedProject from "./Projects/FeaturedProject";
import ProjectCard from "./Projects/ProjectCard";
import LottiePanel from "./Projects/LottiePanel";
import ErrorMessage from "./Projects/ErrorMessage";
import LoadingSpinner from "./Projects/LoadingSpinner";

export default function Projects() {
  // References and scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Fetch GitHub projects with custom hook
  const { projects: githubProjects, loading, error } = useGitHubProjects("dacrab", {
    sort: "updated",
    excludeForks: true,
    minStars: 0
  });
  
  // State for projects to display
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);
  
  // Transform GitHub projects to our Project format on data change
  useEffect(() => {
    if (loading) return;
    
    if (error || githubProjects.length === 0) {
      console.warn("Using fallback projects due to:", error?.message || "No GitHub projects found");
      setDisplayProjects(DEFAULT_PROJECTS);
      return;
    }
    
    // Transform GitHub projects to match the Project interface
    const formattedProjects = transformGitHubToProjects(githubProjects);
    
    // Use up to 6 GitHub projects
    setDisplayProjects(formattedProjects.slice(0, 6));
  }, [githubProjects, loading, error]);
  
  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <SectionHeader isInView={isInView} />
        
        {/* Loading State */}
        {loading && <LoadingSpinner />}
        
        {/* Error State */}
        {error && !loading && <ErrorMessage error={error} />}
        
        {/* Project grid */}
        {!loading && displayProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-8">
            {/* Featured projects section with Lottie */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left column: First two featured projects */}
              <div className="lg:col-span-8 space-y-8">
                {/* First featured project */}
                {displayProjects.length > 0 && (
                  <FeaturedProject 
                    project={displayProjects[0]} 
                    isInView={isInView}
                    delay={0.2}
                  />
                )}
                
                {/* Second featured project */}
                {displayProjects.length > 1 && (
                  <FeaturedProject 
                    project={displayProjects[1]} 
                    isInView={isInView}
                    delay={0.3}
                    reversed
                  />
                )}
              </div>
              
              {/* Right column: Lottie Animation */}
              <div className="lg:col-span-4">
                <LottiePanel isInView={isInView} delay={0.4} />
              </div>
            </div>
            
            {/* Innovation spotlight section */}
            <InnovationSpotlight isInView={isInView} delay={0.5} />
            
            {/* Additional projects grid */}
            {displayProjects.length > 2 && (
              <div className="mt-16">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-xl font-bold mb-6 text-center"
                >
                  More Projects
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProjects.slice(2).map((project, index) => (
                    <ProjectCard 
                      key={project.id}
                      project={project} 
                      isInView={isInView}
                      delay={1.0 + (index * 0.1)}
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
        
        {/* View all projects button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a 
            href="https://github.com/dacrab" 
            className="inline-flex items-center px-6 py-3 rounded-lg border border-border bg-card/20 hover:bg-card/30 hover:border-accent/50 transition-all duration-300 text-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View All Projects on GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}