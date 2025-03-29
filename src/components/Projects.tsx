"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import TextAnimation from "./TextAnimation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Define TypeScript interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
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
    image: "/placeholder.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Creative Portfolio Template",
    description: "A customizable portfolio template for creatives with animations, filtering capabilities, and responsive design for optimal viewing on all devices.",
    tags: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
    image: "/placeholder.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Task Management Dashboard",
    description: "A comprehensive task management system with real-time updates, drag-and-drop functionality, team collaboration tools, and performance analytics.",
    tags: ["TypeScript", "React", "Firebase", "Recharts"],
    image: "/placeholder.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "An intelligent content creation platform that generates high-quality articles, social media posts, and marketing copy using advanced AI algorithms.",
    tags: ["Python", "TensorFlow", "React", "Node.js"],
    image: "/placeholder.jpg",
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
  
  // Subtle scroll-based animations
  const translateX = useTransform(
    scrollYProgress, 
    [0, 1], 
    reversed ? ['-5%', '5%'] : ['5%', '-5%']
  );
  
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.8, delay }}
      className="relative bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden group"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[300px] lg:min-h-[400px] ${reversed ? 'lg:grid-flow-dense' : ''}`}>
        {/* Image section */}
        <div className={`relative overflow-hidden ${reversed ? 'lg:col-start-2' : ''}`}>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          />
          <motion.div
            className="w-full h-full bg-card/50"
            style={{ 
              background: `url(${project.image}) center/cover no-repeat`,
              x: translateX 
            }}
          >
            {/* Image overlay */}
            <div className="absolute inset-0 bg-card/30 backdrop-blur-[2px]"></div>
          </motion.div>
        </div>
        
        {/* Content section */}
        <div className={`p-6 md:p-8 flex flex-col justify-center ${reversed ? 'lg:col-start-1' : ''}`}>
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
            </motion.div>
            
            <motion.p 
              className="text-muted mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
            >
              {project.description}
            </motion.p>
            
            <ProjectTags 
              tags={project.tags} 
              isInView={isInView} 
              delay={delay + 0.4}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.5 }}
            >
              <a 
                href={project.link} 
                className="inline-flex items-center text-accent hover:text-accent-light transition-colors"
              >
                <span>View Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </div>
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
  const cardRef = useRef(null);
  const cardProgress = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(cardProgress.scrollYProgress, [0, 1], ["5%", "-5%"]);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.7, delay }}
      className="relative bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden h-full group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Card content */}
      <div className="p-6 md:p-8 flex flex-col h-full">
        <motion.h3 
          className="text-xl font-bold mb-3 text-foreground group-hover:text-accent transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-muted mb-6 flex-grow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
        >
          {project.description}
        </motion.p>
        
        <ProjectTags 
          tags={project.tags} 
          isInView={isInView} 
          delay={delay + 0.3}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.4, delay: delay + 0.4 }}
          className="mt-auto"
        >
          <a 
            href={project.link} 
            className="inline-flex items-center text-accent hover:text-accent-light transition-colors"
          >
            <span>View Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
        
        {/* Abstract decorative element */}
        <motion.div 
          className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ y }}
        />
      </div>
    </motion.div>
  );
}

// ProjectTags component
interface ProjectTagsProps {
  tags: string[];
  isInView: boolean;
  delay: number;
  smallSize?: boolean;
}

function ProjectTags({ tags, isInView, delay, smallSize = false }: ProjectTagsProps) {
  return (
    <motion.div 
      className="flex flex-wrap gap-2 mb-6"
      initial={{ opacity: 0, y: smallSize ? 10 : 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : smallSize ? 10 : 20 }}
      transition={{ duration: smallSize ? 0.4 : 0.5, delay }}
    >
      {tags.map(tag => (
        <span 
          key={tag} 
          className={`text-xs bg-background/50 border border-border/40 ${smallSize ? 'px-2 py-0.5' : 'px-2.5 py-1'} rounded-md text-muted`}
        >
          {tag}
        </span>
      ))}
    </motion.div>
  );
}

// Main Projects component
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Abstract background */}
      <BackgroundEffects isInView={isInView} />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <SectionHeader isInView={isInView} />
        
        {/* Project grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* First row: Large featured project */}
          <div className="lg:col-span-12">
            <FeaturedProject 
              project={PROJECTS[0]} 
              isInView={isInView}
              delay={0.2}
            />
          </div>

          {/* Innovation Spotlight Section with Lottie Animation */}
          <InnovationSpotlight isInView={isInView} delay={0.4} />
          
          {/* Second row: Two side-by-side projects */}
          <div className="lg:col-span-6">
            <ProjectCard 
              project={PROJECTS[1]} 
              isInView={isInView}
              delay={0.6}
              index={1}
              isActive={activeIndex === 1}
              onHover={() => setActiveIndex(1)}
              onLeave={() => setActiveIndex(null)}
            />
          </div>
          
          <div className="lg:col-span-6">
            <ProjectCard 
              project={PROJECTS[2]} 
              isInView={isInView}
              delay={0.7}
              index={2}
              isActive={activeIndex === 2}
              onHover={() => setActiveIndex(2)}
              onLeave={() => setActiveIndex(null)}
            />
          </div>
          
          {/* Third row: Featured project (reversed layout) */}
          <div className="lg:col-span-12 mt-8">
            <FeaturedProject 
              project={PROJECTS[3]} 
              isInView={isInView}
              delay={0.8}
              reversed
            />
          </div>
        </div>
        
        {/* View all projects button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-14 text-center"
        >
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 rounded-lg border border-border bg-card/20 hover:bg-card/30 hover:border-accent/50 transition-all duration-300 text-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background"
          >
            <span>View All Projects</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Background effects component
function BackgroundEffects({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
      
      {/* Abstract grid pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.05 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(var(--border) 0.5px, transparent 0.5px), 
                            linear-gradient(to right, var(--border) 0.5px, transparent 0.5px)`,
            backgroundSize: '50px 50px',
          }}/>
        </div>
      </motion.div>
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -left-[10%] top-[20%] w-[40%] h-[40%] rounded-full bg-gradient-2/5 blur-[80px]"
          animate={isInView ? {
            y: [0, 30, 0],
            opacity: [0, 0.4, 0],
          } : {}}
          transition={{ 
            duration: 20, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute right-[10%] bottom-[10%] w-[30%] h-[30%] rounded-full bg-gradient-1/5 blur-[100px]"
          animate={isInView ? {
            x: [0, -20, 0],
            opacity: [0, 0.5, 0],
          } : {}}
          transition={{ 
            duration: 15, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </div>
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