"use client";

import { useRef, useState, useMemo, memo, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { DEFAULT_PROJECTS, transformGitHubToProjects, ProjectData } from "./Projects/types";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "./Projects/LoadingSpinner";
import ErrorMessage from "./Projects/ErrorMessage";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import StaggerItem from "./StaggerItem";
import ParallaxLayer from "./ParallaxLayer";
import TextAnimation from "./TextAnimation";

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
      if (error) console.log("Using default projects due to error:", error.message);
      return DEFAULT_PROJECTS.slice(0, 6);
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
        {/* Section header with Swiss style - Split letters animation unique to Projects */}
        <div className="mb-16">
          <SwissMotion type="slide" delay={0.2} duration={0.5} className="flex items-center mb-4">
            <div className="w-8 h-8 bg-[var(--accent)] mr-4"></div>
            <TextAnimation
              text="PROJECTS"
              variant="split"
              className="swiss-heading-2"
              delay={0.3}
              duration={0.6}
            />
          </SwissMotion>
          <div className="ml-12">
            <SwissMotion type="reveal" delay={0.5} duration={0.6}>
            <div className="w-24 h-1 bg-[var(--foreground)] mb-8"></div>
            </SwissMotion>
            <SwissMotion type="fade" delay={0.7} duration={0.6}>
            <p className="swiss-body max-w-2xl">
              A curated selection of projects that demonstrate my technical expertise, 
              problem-solving abilities, and creative approach to development.
            </p>
            </SwissMotion>
          </div>
        </div>

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
                <StaggerItem 
                  key={project.id}
                  type="scale"
                  whileHover="scale"
                  whileTap="press"
                  index={idx} // Pass index for staggered animations
                  className="swiss-card relative overflow-hidden group"
                >
                  <SwissMotion type="reveal" delay={0.1} duration={0.4}>
                  <div className="absolute top-0 left-0 w-1/4 h-1 bg-[var(--accent)]"></div>
                  </SwissMotion>
                  
                  <SwissMotion type="reveal" delay={0.3} duration={0.4}>
                  <div className="absolute bottom-0 right-0 w-1 h-1/4 bg-[var(--accent-secondary)]"></div>
                  </SwissMotion>
                  
                  <TextAnimation 
                    text={project.title}
                    variant="reveal"
                    className="text-xl font-bold mb-3"
                    delay={0.4 + (idx * 0.1)}
                  />
                  
                  <p className="text-[var(--muted)] mb-4 text-sm">{project.description}</p>
                  
                  <SwissMotion type="stagger" staggerChildren={0.05} delay={0.5} className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <StaggerItem 
                        key={`${project.id}-${tag}`}
                        type="fade"
                        whileHover="glow"
                      >
                        <span className="text-xs px-2 py-1 bg-[var(--card-hover)] rounded-sm">
                        {tag}
                      </span>
                      </StaggerItem>
                    ))}
                  </SwissMotion>
                  
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-sm font-medium mt-auto text-[var(--accent)] hover:underline"
                  >
                    <SwissMotion type="reveal" delay={0.6 + (idx * 0.1)}>
                      View Project <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </SwissMotion>
                  </a>
                </StaggerItem>
              ))}
            </SwissMotion>
          </div>

          {/* GitHub Projects */}
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
                <SwissMotion
                  key={project.id} 
                  gridLayout={{
                    columns: isMobile ? 1 : (githubData.length < 3 ? 2 : 3),
                    rows: Math.ceil(githubData.length / (isMobile ? 1 : (githubData.length < 3 ? 2 : 3))),
                    itemIndex: index
                  }}
                  whileHover="scale"
                  whileTap="press"
                  className="swiss-card relative"
                >
                  {/* Portfolio grid pattern animation - signature for Projects cards */}
                  <motion.div 
                    className="absolute top-2 right-2 w-8 h-8 grid grid-cols-2 grid-rows-2 gap-px opacity-20 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
                  >
                    {[0, 1, 2, 3].map(i => (
                      <div key={i} className="bg-[var(--accent)]"></div>
                    ))}
                  </motion.div>
                  
                  <div className="absolute top-0 right-0 w-1/5 h-1 bg-[var(--accent-tertiary)]"></div>
                  
                  <h4 className="font-bold mb-3">{project.title}</h4>
                  <p className="text-[var(--muted)] mb-4 text-sm line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <motion.span 
                        key={`${project.id}-${tag}-${i}`} 
                        className="text-xs px-2 py-1 bg-[var(--card-hover)] rounded-sm"
                        whileHover={{ 
                          backgroundColor: "var(--accent)",
                          color: "var(--card)",
                          transition: { duration: 0.3 }
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <motion.span 
                        className="flex items-center text-xs text-[var(--muted)]"
                        whileHover={{ 
                          scale: 1.1, 
                          color: "var(--accent)",
                          transition: { duration: 0.3 }
                        }}
                      >
                        ★ {project.stars}
                      </motion.span>
                      {project.language && (
                        <span className="ml-4 flex items-center text-xs text-[var(--muted)]">
                          <span 
                            className="inline-block w-2 h-2 rounded-full mr-1"
                            style={{ backgroundColor: getLanguageColor(project.language) }}
                          ></span>
                          {project.language}
                        </span>
                      )}
                    </div>
                    
                    <Link 
                    href={project.link}
                    target="_blank"
                      className="text-sm font-medium text-[var(--accent)] hover:underline"
                    >
                      <motion.div
                        whileHover={{ 
                          rotate: 45,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <ArrowUpRight size={14} />
                </motion.div>
                    </Link>
                  </div>
                </SwissMotion>
              ))}
            </SwissMotion>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

// Helper function to get language color
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Java: "#b07219",
    Go: "#00ADD8",
    Rust: "#dea584",
    Ruby: "#701516",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    PHP: "#4F5D95",
    Shell: "#89e051",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Dart: "#00B4AB",
  };

  return colors[language] || "#8b949e"; // Default color if language not found
}

export default Projects;