"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import TextAnimation from "./TextAnimation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { GitHubProjectData } from "@/types/github";
import SectionBackground from "./SectionBackground";

// Define TypeScript interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface TechDescription {
  [key: string]: string;
}

// Tech data with descriptions
const TECHNOLOGIES = [
  "React",
  "Next.js",
  "TypeScript",
  "TailwindCSS",
  "Framer Motion",
  "WebGL"
];

const TECH_DESCRIPTIONS: TechDescription = {
  "React": "Building interactive UIs with component-based architecture for efficient development and maintenance.",
  "Next.js": "Leveraging server-side rendering and static generation for optimal performance and SEO.",
  "TypeScript": "Ensuring type safety and improved developer experience with static typing.",
  "TailwindCSS": "Creating custom, responsive designs with utility-first CSS for rapid development.",
  "Framer Motion": "Implementing fluid animations and interactive elements that enhance user experience.",
  "WebGL": "Creating immersive 3D experiences and visualizations directly in the browser."
};

// Project data
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Modern E-commerce Platform",
    description: "A full-featured e-commerce solution built with Next.js, featuring dynamic product pages, cart functionality, payment processing, and admin dashboard.",
    tags: ["Next.js", "React", "Stripe", "MongoDB"],
    link: "#",
  },
  {
    id: 2,
    title: "Creative Portfolio Template",
    description: "A customizable portfolio template for creatives with animations, filtering capabilities, and responsive design for optimal viewing on all devices.",
    tags: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    link: "#",
  },
  {
    id: 3,
    title: "Task Management Dashboard",
    description: "A comprehensive task management system with real-time updates, drag-and-drop functionality, team collaboration tools, and performance analytics.",
    tags: ["TypeScript", "React", "Firebase", "Recharts"],
    link: "#",
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "An intelligent content creation platform that generates high-quality articles, social media posts, and marketing copy using advanced AI algorithms.",
    tags: ["Python", "TensorFlow", "React", "Node.js"],
    link: "#",
  },
];

// Innovation Spotlight component
interface InnovationSpotlightProps {
  isInView: boolean;
  delay: number;
}

function InnovationSpotlight({ isInView, delay }: InnovationSpotlightProps) {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  
  return (
    <motion.div 
      className="lg:col-span-12 my-12 md:my-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="relative bg-card/10 backdrop-blur-sm border-2 border-transparent rounded-xl overflow-hidden before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-accent-light/30 before:via-accent/20 before:to-accent-dark/30 before:-z-10 before:content-['']">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px]">
          {/* Lottie Animation Section */}
          <div className="relative overflow-hidden flex items-center justify-center p-6 md:p-10">
            <motion.div 
              className="w-full max-w-md h-64 md:h-80 relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <DotLottieReact
                src="https://lottie.host/89786656-4880-42e7-9f18-82895c67895a/37mBlD7a1R.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
              
              {/* Subtle glow effect behind animation */}
              <div className="absolute inset-0 -z-10 bg-accent/5 blur-xl rounded-full transform scale-75"></div>
            </motion.div>
          </div>
          
          {/* Innovation Spotlight Content */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-3 text-gradient-animated">
                Innovation Spotlight
              </h3>
            </motion.div>
            
            <motion.p 
              className="text-muted mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
            >
              My projects leverage cutting-edge technology to deliver exceptional user experiences. I focus on creating responsive, accessible, and performance-optimized applications that push the boundaries of what's possible on the web.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
            >
              {TECHNOLOGIES.map(tech => (
                <motion.span 
                  key={tech} 
                  className={`text-xs bg-background/50 border px-3 py-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                    activeTech === tech 
                      ? "border-accent text-accent scale-110" 
                      : "border-accent/20 text-accent hover:border-accent/50"
                  }`}
                  onMouseEnter={() => setActiveTech(tech)}
                  onMouseLeave={() => setActiveTech(null)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Tech description that changes based on hover */}
            <motion.div
              className="min-h-[60px] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.4 }}
            >
              <AnimatePresence mode="wait">
                {activeTech ? (
                  <motion.p 
                    key={activeTech}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-muted italic"
                  >
                    {TECH_DESCRIPTIONS[activeTech]}
                  </motion.p>
                ) : (
                  <motion.p
                    key="default"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-muted italic"
                  >
                    Hover over a technology to learn more about my expertise.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.5 }}
            >
              <a 
                href="#contact" 
                className="inline-flex items-center bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg transition-colors"
              >
                <span>Discuss Your Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract decoration */}
        <motion.div 
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl"
          animate={isInView ? {
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          } : {}}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </motion.div>
  );
}

// FeaturedProject component
interface FeaturedProjectProps {
  project: Project;
  isInView: boolean;
  delay: number;
  reversed?: boolean;
}

function FeaturedProject({ project, isInView, delay, reversed = false }: FeaturedProjectProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Get color based on the first tag/language
  const getTagColor = () => {
    if (!project.tags || !project.tags.length) return "var(--accent)";
    
    const colorMap: Record<string, string> = {
      "JavaScript": "#f1e05a",
      "TypeScript": "#3178c6",
      "Python": "#3572A5",
      "HTML": "#e34c26",
      "CSS": "#563d7c",
      "React": "#61dafb",
      "Next.js": "#000000",
      "Node.js": "#339933",
      "Java": "#b07219",
      "Go": "#00ADD8",
      "Rust": "#dea584",
      "PHP": "#4F5D95",
      "Ruby": "#701516"
    };
    
    return colorMap[project.tags[0]] || "var(--accent)";
  };
  
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.8, delay }}
      className="relative bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-500"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 min-h-[200px] ${reversed ? 'lg:grid-flow-dense' : ''}`}>
        {/* Project Metadata Section */}
        <div className={`p-8 lg:col-span-4 ${reversed ? 'lg:col-start-9' : 'lg:col-start-1'} relative flex flex-col justify-center`}>
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Project number/identifier and minimal decoration */}
          <div className="mb-6 flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono border-2"
              style={{ borderColor: `${getTagColor()}33` }}
            >
              {String(project.id).padStart(2, '0')}
            </div>
            <div className="h-[1px] flex-grow" style={{ background: `linear-gradient(to right, ${getTagColor()}40, transparent)` }}></div>
          </div>
          
          {/* Primary language/tech tag */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-3">
              <span 
                className="text-xs uppercase tracking-wider font-medium px-3 py-1 rounded-full"
                style={{ 
                  backgroundColor: `${getTagColor()}15`, 
                  color: getTagColor(),
                  border: `1px solid ${getTagColor()}30`
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

// ProjectCard component
interface ProjectCardProps {
  project: Project;
  isInView: boolean;
  delay: number;
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ProjectCard({ project, isInView, delay, index, isActive, onHover, onLeave }: ProjectCardProps) {
  // Get color based on the first tag/language
  const getTagColor = () => {
    if (!project.tags || !project.tags.length) return "var(--accent)";
    
    const colorMap: Record<string, string> = {
      "JavaScript": "#f1e05a",
      "TypeScript": "#3178c6",
      "Python": "#3572A5",
      "HTML": "#e34c26",
      "CSS": "#563d7c",
      "React": "#61dafb",
      "Next.js": "#000000",
      "Node.js": "#339933",
      "Java": "#b07219",
      "Go": "#00ADD8",
      "Rust": "#dea584",
      "PHP": "#4F5D95",
      "Ruby": "#701516"
    };
    
    return colorMap[project.tags[0]] || "var(--accent)";
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.7, delay }}
      className="relative bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden h-full group hover:border-accent/30 transition-all duration-300"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Top badge */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-4">
            <span 
              className="text-xs uppercase tracking-wider font-medium px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: `${getTagColor()}15`, 
                color: getTagColor(),
                border: `1px solid ${getTagColor()}30`
              }}
            >
              {project.tags[0]}
            </span>
          </div>
        )}
        
        <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-muted text-sm mb-4 flex-grow">
          {project.description.length > 120 
            ? `${project.description.substring(0, 120)}...` 
            : project.description}
        </p>
        
        {/* Secondary tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(1, 3).map(tag => (
            <span 
              key={tag} 
              className="text-xs bg-background/50 px-1.5 py-0.5 rounded-md border border-border/30 text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pt-3 border-t border-border/10">
          <a 
            href={project.link} 
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center text-xs text-accent hover:text-accent-light transition-colors"
          >
            <span className="mr-1">View Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// Main Projects component
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Fetch GitHub projects
  const { projects: githubProjects, loading, error } = useGitHubProjects("dacrab", {
    sort: "updated",
    excludeForks: true,
    minStars: 0
  });
  
  // State for projects to display
  const [displayProjects, setDisplayProjects] = useState<Project[]>([]);
  
  // Fallback to example projects if there's an error or no GitHub projects
  const fallbackProjects: Project[] = [
    {
      id: 1,
      title: "Modern E-commerce Platform",
      description: "A full-featured e-commerce solution built with Next.js, featuring dynamic product pages, cart functionality, payment processing, and admin dashboard.",
      tags: ["Next.js", "React", "Stripe", "MongoDB"],
      link: "#",
    },
    {
      id: 2,
      title: "Creative Portfolio Template",
      description: "A customizable portfolio template for creatives with animations, filtering capabilities, and responsive design for optimal viewing on all devices.",
      tags: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
      link: "#",
    },
    {
      id: 3,
      title: "Task Management Dashboard",
      description: "A comprehensive task management system with real-time updates, drag-and-drop functionality, team collaboration tools, and performance analytics.",
      tags: ["TypeScript", "React", "Firebase", "Recharts"],
      link: "#",
    },
    {
      id: 4,
      title: "AI Content Generator",
      description: "An intelligent content creation platform that generates high-quality articles, social media posts, and marketing copy using advanced AI algorithms.",
      tags: ["Python", "TensorFlow", "React", "Node.js"],
      link: "#",
    },
  ];
  
  // Transform GitHub projects to the Project format and set display projects
  useEffect(() => {
    if (loading) return;
    
    if (error || githubProjects.length === 0) {
      console.warn("Using fallback projects due to:", error?.message || "No GitHub projects found");
      setDisplayProjects(fallbackProjects);
      return;
    }
    
    // Transform GitHub projects to match the Project interface
    const formattedProjects: Project[] = githubProjects.map(repo => ({
      id: repo.id,
      title: repo.title,
      description: repo.description,
      tags: repo.tags,
      link: repo.link,
    }));
    
    // Use up to 6 GitHub projects
    setDisplayProjects(formattedProjects.slice(0, 6));
  }, [githubProjects, loading, error]);
  
  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Professional tech background */}
      <SectionBackground 
        variant="code" 
        intensity={0.8} 
        color="accent"
        isInView={isInView}
      />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <SectionHeader isInView={isInView} />
        
        {/* Loading State */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-20"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-t-2 border-accent rounded-full animate-spin mb-4"></div>
              <p className="text-muted">Loading GitHub projects...</p>
            </div>
          </motion.div>
        )}
        
        {/* Error State - Enhanced with more detailed error messages */}
        {error && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-8 text-center max-w-3xl mx-auto"
          >
            <h3 className="text-xl font-bold mb-2 text-red-500">GitHub API Error</h3>
            
            {error.message.includes("rate limit exceeded") ? (
              <>
                <p className="text-muted mb-4">
                  We've hit GitHub's rate limits. This typically happens when making too many requests without authentication.
                </p>
                <div className="bg-card/30 p-4 rounded-lg text-left mb-4 text-sm font-mono overflow-auto">
                  <p>{error.message}</p>
                </div>
                <p className="text-sm text-muted mb-2">To fix this issue:</p>
                <ul className="text-sm text-muted list-disc list-inside text-left max-w-md mx-auto">
                  <li>Generate a GitHub personal access token</li>
                  <li>Add it to your .env.local file as GITHUB_ACCESS_TOKEN</li>
                  <li>Restart your development server</li>
                </ul>
              </>
            ) : error.message.includes("not found") ? (
              <>
                <p className="text-muted mb-2">The GitHub username could not be found.</p>
                <p className="text-sm text-muted">Check your NEXT_PUBLIC_GITHUB_USERNAME value in .env.local</p>
              </>
            ) : (
              <p className="text-muted">
                {error.message || "An unexpected error occurred while fetching your GitHub projects."}
              </p>
            )}
            
            <p className="text-muted text-sm mt-4">Displaying example projects instead.</p>
          </motion.div>
        )}
        
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
                <motion.div 
                  className="sticky top-32 bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden h-full group hover:border-accent/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="p-6 h-full flex flex-col">
                    {/* Lottie Animation */}
                    <div className="flex-grow relative overflow-hidden flex items-center justify-center py-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <motion.div 
                        className="w-full h-80 relative"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DotLottieReact
                          src="https://lottie.host/89786656-4880-42e7-9f18-82895c67895a/37mBlD7a1R.lottie"
                          loop
                          autoplay
                          className="w-full h-full"
                        />
                        
                        {/* Subtle glow effect behind animation */}
                        <div className="absolute inset-0 -z-10 bg-accent/5 blur-xl rounded-full transform scale-75"></div>
                      </motion.div>
                    </div>
                    
                    {/* "Discuss Your Project" button */}
                    <div className="mt-4 text-center">
                      <motion.a
                        href="#contact"
                        className="inline-flex items-center px-4 py-2 rounded-lg border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300"
                        whileHover={{ y: -3 }}
                        whileTap={{ y: 0 }}
                      >
                        <span>Discuss Your Project</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                          <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
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

// Section header component
function SectionHeader({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6 }}
      className="mb-16 text-center"
    >
      <TextAnimation 
        text="Featured Projects" 
        variant="reveal" 
        className="text-3xl md:text-4xl font-bold mb-4"
        delay={0.2}
        duration={0.4}
      />
      
      <div className="w-24 h-0.5 bg-accent mx-auto mb-6"></div>
      
      <TextAnimation 
        text="A selection of my recent work spanning web applications, interactive experiences, and digital platforms."
        variant="split" 
        className="text-muted max-w-2xl mx-auto"
        delay={0.4}
        duration={0.3}
      />
    </motion.div>
  );
}