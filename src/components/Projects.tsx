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
import TextAnimation from "./TextAnimation";
import FeaturedProject from "./Projects/FeaturedProject";
import ProjectCard from "./Projects/ProjectCard";
import { SectionHeader } from "./common";

const Projects = memo(function Projects() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: isMobile ? 0.05 : 0.1 });

  // Only fetch GitHub projects after first visible
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  useEffect(() => {
    if (isInView && !hasBeenVisible) setHasBeenVisible(true);
  }, [isInView, hasBeenVisible]);

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // Only fetch when visible at least once
  const { projects: githubProjects, loading, error } = useGitHubProjects(
    "dacrab",
    { sort: "updated", excludeForks: true, minStars: 0 },
    isInView && hasBeenVisible
  );

  // Featured projects (static)
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

  // Get up to 6 projects, fallback to defaults if error or empty
  const githubData = useMemo(() => {
    if (error || (githubProjects.length === 0 && !loading)) {
      if (error) console.log("No GitHub projects available:", error.message);
      return [];
    }
    return githubProjects.length
      ? transformGitHubToProjects(githubProjects).slice(0, 6)
      : [];
  }, [githubProjects, error, loading]);

  // Project section signature - grid pattern animation
  const gridCells = 3;
  const gridRows = 3;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Swiss style accent elements with Project-specific animations */}
      {/* Portfolio grid pattern - unique signature for Projects section */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0">
        <div className="absolute left-8 md:left-16 top-16 w-40 h-40 opacity-10">
          <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full">
            {Array.from({ length: gridCells * gridRows }).map((_, i) => {
              const row = Math.floor(i / gridCells);
              const col = i % gridCells;
              return (
                <motion.div
                  key={`grid-${i}`}
                  className="border border-[var(--foreground)]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + (col * 0.1) + (row * 0.1),
                    ease: [0.19, 1, 0.22, 1]
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Projects-specific thick line animation */}
      <ParallaxLayer speed={0.1} direction="right" className="absolute left-0 top-1/3 z-0">
        <ShapeAnimation 
          type="line" 
          color="var(--accent-secondary)" 
          size={150} 
          strokeWidth={32}
          variant="draw"
          delay={0.3}
          duration={1.5}
        />
      </ParallaxLayer>
      
      {/* Projects-specific crossed lines */}
      <ParallaxLayer speed={0.15} direction="left" className="absolute right-24 top-64 z-0">
        <ShapeAnimation 
          type="cross" 
          color="var(--accent)" 
          size={80} 
          strokeWidth={4}
          variant="draw"
          delay={0.5}
          duration={1.0}
        />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.2} direction="up" className="absolute right-1/4 bottom-24 z-0">
        <ShapeAnimation 
          type="square" 
          color="var(--accent-tertiary)" 
          size={64} 
          variant="float"
          delay={0.7}
          loop={true}
        />
      </ParallaxLayer>

      <div className="swiss-container relative z-10">
        {/* Section header with Swiss style using dedicated component */}
        <SectionHeader 
          title="PROJECTS"
          description="A curated selection of projects that demonstrate my technical expertise, problem-solving abilities, and creative approach to development."
          accentColor="primary"
          textAnimationVariant="split"
          motionDelay={0.2}
        />

        {/* Project grid with Swiss style */}
        <motion.div
          style={{ y: contentY }}
        >
          {/* Featured Projects - custom portfolio highlights */}
          <div className="mb-16">
            <SwissMotion type="slide" delay={0.3} className="mb-8">
              <TextAnimation
                text="FEATURED WORK"
                variant="reveal"
                className="swiss-heading-3"
                delay={0.4}
              />
            </SwissMotion>
            
            <SwissMotion type="stagger" staggerChildren={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {customProjects.map((project, idx) => (
                <FeaturedProject 
                  key={project.id} 
                  project={project} 
                  index={idx} 
                  reversed={idx % 2 !== 0}
                />
              ))}
            </SwissMotion>
          </div>

          {/* GitHub Projects */}
          {githubData.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <SwissMotion type="slide" delay={0.4}>
                  <TextAnimation
                    text="GITHUB PROJECTS"
                    variant="reveal"
                    className="swiss-heading-3"
                    delay={0.5}
                  />
                </SwissMotion>
                {loading && (
                  <SwissMotion type="fade" delay={0.2}>
                  <div className="flex items-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2 text-sm text-[var(--muted)]">Loading projects...</span>
                  </div>
                  </SwissMotion>
                )}
              </div>
              
              {error && <ErrorMessage message={error.message} />}
              
              {!loading && githubData.length === 0 && !error && (
                <SwissMotion type="fade" delay={0.2}>
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
          )}
        </motion.div>
      </div>
    </section>
  );
});

export default Projects;