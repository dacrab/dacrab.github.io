"use client";

import { useRef, useState, useMemo, memo, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { transformGitHubToProjects, ProjectData } from "./Projects/types";
import { useIsMobile } from "@/hooks/useIsMobile";
import LoadingSpinner from "./Projects/LoadingSpinner";
import ErrorMessage from "./Projects/ErrorMessage";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";
import FeaturedProject from "./Projects/FeaturedProject";
import ProjectCard from "./Projects/ProjectCard";
import { SectionHeader } from "./common";

// Constants
const GRID_CONFIG = {
  cells: 3,
  rows: 3,
  gap: 2,
  size: { base: 'w-40 h-40', md: 'md:left-16' },
  opacity: 'opacity-10',
  position: 'left-8 top-16'
};

const CUSTOM_PROJECTS = [
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
  }
];

// Animation constants
const ANIMATION = {
  standard: {
    duration: 0.5,
    ease: [0.2, 0.65, 0.3, 0.9]
  }
};

const Projects = memo(function Projects() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: isMobile ? 0.05 : 0.1 });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // Effects
  useEffect(() => {
    if (isInView && !hasBeenVisible) setHasBeenVisible(true);
  }, [isInView, hasBeenVisible]);

  // Single simplified scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Data fetching
  const { projects: githubProjects, loading, error } = useGitHubProjects(
    "dacrab",
    { sort: "updated", excludeForks: true, minStars: 0 },
    isInView && hasBeenVisible
  );

  const githubData = useMemo(() => {
    if (error || (githubProjects.length === 0 && !loading)) {
      if (error) console.log("No GitHub projects available:", error.message);
      return [];
    }
    return githubProjects.length
      ? transformGitHubToProjects(githubProjects).slice(0, 6)
      : [];
  }, [githubProjects, error, loading]);

  // Simplified grid cells with single animation approach
  const renderGridCells = () => (
    Array.from({ length: GRID_CONFIG.cells * GRID_CONFIG.rows }).map((_, i) => (
      <motion.div
        key={`grid-${i}`}
        className="border border-[var(--foreground)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ 
          duration: ANIMATION.standard.duration,
          delay: 0.1,
          ease: ANIMATION.standard.ease
        }}
      />
    ))
  );

  const renderGitHubProjects = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <SwissMotion type="slide" delay={0.2}>
          <h3 className="swiss-heading-3">GITHUB PROJECTS</h3>
        </SwissMotion>
        {loading && (
          <SwissMotion type="fade" delay={0.1}>
            <div className="flex items-center">
              <LoadingSpinner size="small" />
              <span className="ml-2 text-sm text-[var(--muted)]">Loading projects...</span>
            </div>
          </SwissMotion>
        )}
      </div>
      
      {error && <ErrorMessage message={error.message} />}
      
      {!loading && githubData.length === 0 && !error && (
        <SwissMotion type="fade" delay={0.1}>
          <div className="swiss-card text-center py-12">
            <p className="text-[var(--muted)]">No GitHub projects found. Check back later!</p>
          </div>
        </SwissMotion>
      )}
      
      <SwissMotion 
        type="grid" 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {githubData.map((project: ProjectData, index) => (
          <ProjectCard 
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </SwissMotion>
    </div>
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Simplified background elements */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0">
        <div className={`absolute ${GRID_CONFIG.position} ${GRID_CONFIG.size.base} ${GRID_CONFIG.opacity} ${GRID_CONFIG.size.md}`}>
          <div className={`grid grid-cols-${GRID_CONFIG.cells} grid-rows-${GRID_CONFIG.rows} gap-${GRID_CONFIG.gap} w-full h-full`}>
            {renderGridCells()}
          </div>
        </div>
      </div>
      
      {/* Reduced number of shape animations */}
      <ParallaxLayer speed={0.1} direction="right" className="absolute left-0 top-1/3 z-0">
        <ShapeAnimation 
          type="line" 
          color="var(--accent-secondary)" 
          size={150} 
          strokeWidth={32}
          variant="draw"
          delay={0.2}
          duration={1}
        />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.1} direction="left" className="absolute right-24 bottom-64 z-0">
        <ShapeAnimation 
          type="cross" 
          color="var(--accent)" 
          size={80} 
          strokeWidth={4}
          variant="draw"
          delay={0.2}
          duration={1}
        />
      </ParallaxLayer>

      <div className="swiss-container relative z-10">
        <SectionHeader 
          title="PROJECTS"
          description="A curated selection of projects that demonstrate my technical expertise, problem-solving abilities, and creative approach to development."
          accentColor="primary"
          textAnimationVariant="reveal"
          motionDelay={0.1}
        />

        <motion.div style={{ y: contentY }}>
          <div className="mb-16">
            <SwissMotion type="slide" delay={0.2} className="mb-8">
              <h3 className="swiss-heading-3">FEATURED WORK</h3>
            </SwissMotion>
            
            <SwissMotion type="stagger" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {CUSTOM_PROJECTS.map((project, idx) => (
                <FeaturedProject 
                  key={project.id} 
                  project={project} 
                  index={idx} 
                  reversed={idx % 2 !== 0}
                />
              ))}
            </SwissMotion>
          </div>

          {githubData.length > 0 && renderGitHubProjects()}
        </motion.div>
      </div>
    </section>
  );
});

export default Projects;