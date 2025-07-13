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
const CUSTOM_PROJECTS = [
  {
    id: 90,
    title: "Silver and Gold Money (Concept)",
    description: "A modern landing page concept for a local pawn shop featuring services like loans, buying/selling gold and silver, and a loan calculator with a clean, professional design that builds customer trust.",
    tags: ["Svelte", "SvelteKit", "TailwindCSS", "TypeScript"],
    link: "https://gsm-beta.vercel.app/",
    hasGallery: true,
    galleryFolder: "gsm"
  },
  {
    id: 91,
    title: "Argicon.gr",
    description: "A professional website for a technical construction company showcasing their services, projects portfolio, and expertise in infrastructure development with a modern, responsive design.",
    tags: ["TypeScript", "NextJS", "TailwindCSS", "React"],
    link: "https://argicon.gr",
    hasGallery: true,
    galleryFolder: "argicon"
  },
  {
    id: 92,
    title: "DesignDash.gr",
    description: "A comprehensive digital platform for a technical construction firm featuring project galleries, technical specifications, and service offerings with an emphasis on engineering excellence.",
    tags: ["TypeScript", "NextJS", "TailwindCSS", "React"],
    link: "https://designdash.gr",
    hasGallery: true,
    galleryFolder: "designdash"
  }
];

type CubicBezier = [number, number, number, number];

// Animation constants - match the format used in child components
const ANIMATION: {
  baseDelay: number;
  duration: number;
  ease: CubicBezier;
} = {
  baseDelay: 0.1,
  duration: 0.5,
  ease: [0.2, 0.65, 0.3, 0.9]
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

  // Single scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const featuredY = useTransform(scrollYProgress, [0, 1], [-10, 30]);
  const githubY = useTransform(scrollYProgress, [0, 1], [10, -30]);

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

  // Helper function to get accent color based on index
  const getAccentColor = (index: number): 'primary' | 'secondary' | 'tertiary' => {
    return index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary';
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute left-8 top-16 md:left-16 w-40 h-40 opacity-10 pointer-events-none z-0">
        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-full">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={`grid-${i}`}
              className="border border-[var(--foreground)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ 
                duration: ANIMATION.duration,
                delay: ANIMATION.baseDelay,
                ease: ANIMATION.ease
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Shape animations */}
      <ParallaxLayer speed={0.25} direction="right" className="absolute left-0 top-1/3 z-0">
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
      
      <ParallaxLayer speed={0.35} direction="up" className="absolute right-24 bottom-64 z-0">
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
          motionDelay={ANIMATION.baseDelay}
        />

        <div>
          {/* Featured Projects */}
          <motion.div className="mb-16" style={{ y: featuredY }}>
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
                  accentColor={getAccentColor(idx)}
                  backgroundPattern={idx % 2 === 0 ? 'grid' : 'dots'}
                />
              ))}
            </SwissMotion>
          </motion.div>

          {/* GitHub Projects */}
          {(githubData.length > 0 || loading || error) && (
            <motion.div style={{ y: githubY }}>
              <div className="flex items-center justify-between mb-8">
                <SwissMotion type="slide" delay={0.2}>
                  <h3 className="swiss-heading-3">GITHUB PROJECTS</h3>
                </SwissMotion>
                
                {loading && (
                  <SwissMotion type="fade" delay={ANIMATION.baseDelay}>
                    <div className="flex items-center">
                      <LoadingSpinner size="small" />
                      <span className="ml-2 text-sm text-[var(--muted)]">Loading projects...</span>
                    </div>
                  </SwissMotion>
                )}
              </div>
              
              {error && <ErrorMessage message={error.message} />}
              
              {!loading && githubData.length === 0 && !error && (
                <SwissMotion type="fade" delay={ANIMATION.baseDelay}>
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
                    accentColor={getAccentColor(index)}
                    backgroundPattern="dots"
                  />
                ))}
              </SwissMotion>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
});

export default Projects;