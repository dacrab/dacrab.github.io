"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showCVDropdown, setShowCVDropdown] = useState(false);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Handle CV download
  const handleCVDownload = (lang: string) => {
    const link = document.createElement("a");
    link.href = `/CV_${lang}.pdf`;
    link.setAttribute("download", `CV_${lang}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCVDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showCVDropdown) return;
    
    const handle = () => setShowCVDropdown(false);
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, [showCVDropdown]);

  return (
    <div
      ref={heroRef} 
      id="home"
      className="relative min-h-[calc(100vh-82px)] max-h-[800px] pt-12 overflow-hidden flex flex-col"
    >
      {/* Animated Swiss-style diagonal line */}
      <SwissMotion
        type="reveal"
        delay={0.3}
        duration={1.2}
        className="absolute top-0 right-0 w-1/2 h-1/2 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-[var(--accent)] origin-top-left rotate-45 transform -translate-x-1/4"></div>
      </SwissMotion>

      {/* Animated accent shapes */}
      <ParallaxLayer speed={0.2} direction="up" className="absolute bottom-16 left-16 -z-10">
        <ShapeAnimation 
          type="square" 
          color="var(--accent-secondary)" 
          size={160} 
          variant="float"
          delay={0.5}
          loop={true}
        />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.3} direction="down" className="absolute top-32 right-32 -z-10">
        <ShapeAnimation 
          type="circle" 
          color="var(--accent-tertiary)" 
          size={96} 
          variant="pulse"
          delay={0.7}
          loop={true}
        />
      </ParallaxLayer>
      
      <motion.div
        className="swiss-container flex-1 flex flex-col"
        style={{ y }}
      >
        <div className="swiss-grid flex-1 mt-8 md:mt-24">
          {/* Left Hero Content */}
          <div className="swiss-asymmetric-left flex flex-col justify-center mb-12 md:mb-0">
            <SwissMotion
              type="slide"
              delay={0.2}
              duration={0.8}
              className="mb-6"
            >
              <div className="flex items-center mb-2">
                <div className="w-16 h-1 bg-[var(--accent)] mr-4"></div>
                <p className="text-[var(--muted)] uppercase tracking-widest text-sm">Web Developer</p>
              </div>
              <h1 className="swiss-heading-1 mt-3 mb-4">
                MODERN<br />WEB<br />SOLUTIONS
              </h1>
              <p className="swiss-body max-w-md mb-6">
                Creating clean, functional, and engaging digital experiences
                through thoughtful design and modern development techniques.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <SwissMotion type="fade" delay={0.9} whileHover="lift" whileTap="press">
                  <button 
                    className="swiss-button"
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    VIEW PROJECTS
                  </button>
                </SwissMotion>
                
                <div className="relative">
                  <SwissMotion type="fade" delay={1.1} whileHover="lift" whileTap="press">
                    <button
                      className="swiss-button-outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCVDropdown(!showCVDropdown);
                      }}
                    >
                      DOWNLOAD CV
                    </button>
                  </SwissMotion>
                  
                  {/* CV Download Dropdown */}
                  {showCVDropdown && (
                    <motion.div 
                      className="absolute top-full left-0 mt-2 w-full bg-[var(--background)] swiss-border z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button
                        onClick={() => handleCVDownload("english")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--accent)]/10 transition-colors duration-150 uppercase"
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleCVDownload("greek")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--accent)]/10 transition-colors duration-150 uppercase"
                      >
                        Greek
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </SwissMotion>

            {/* Tech Keywords */}
            <SwissMotion 
              type="stagger"
              delay={1.2}
              staggerChildren={0.08}
              className="flex flex-wrap gap-2 mt-auto"
            >
              {["REACT", "NEXTJS", "TYPESCRIPT", "NODEJS", "AWS"].map((tech) => (
                <SwissMotion
                  key={tech}
                  type="fade"
                  whileHover="scale"
                >
                  <span className="text-xs uppercase tracking-wider px-2 py-1 swiss-border">
                    {tech}
                  </span>
                </SwissMotion>
              ))}
            </SwissMotion>
          </div>
          
          {/* Right Hero Visual */}
          <div className="swiss-asymmetric-right flex items-center justify-center relative">
            <SwissMotion
              type="scale"
              delay={0.5}
              duration={0.8}
              className="relative"
            >
              {/* Swiss style grid pattern */}
              <div className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 swiss-grid-pattern relative">
                {/* Accent shapes for Swiss style */}
                <SwissMotion type="reveal" delay={0.8} duration={0.5}>
                  <div className="absolute left-0 top-0 w-full h-1 bg-[var(--accent)]"></div>
                </SwissMotion>
                <SwissMotion type="reveal" delay={1.0} duration={0.5}>
                  <div className="absolute right-0 top-0 w-1 h-full bg-[var(--accent-secondary)]"></div>
                </SwissMotion>
                <SwissMotion type="fade" delay={1.2} duration={0.5}>
                  <div className="absolute right-1/3 bottom-1/3 w-1/4 h-1/4 bg-[var(--accent-tertiary)]"></div>
                </SwissMotion>
                
                {/* New Swiss-style visual elements */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  {/* Central geometric composition */}
                  <div className="relative w-4/5 h-4/5">
                    {/* Grid lines */}
                    <motion.div 
                      className="absolute top-1/4 left-0 w-full h-[1px] bg-[var(--foreground)] opacity-20"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.5, ease: [0.17, 0.67, 0.83, 0.67] }}
                    />
                    <motion.div 
                      className="absolute top-2/4 left-0 w-full h-[1px] bg-[var(--foreground)] opacity-20"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.6, ease: [0.17, 0.67, 0.83, 0.67] }}
                    />
                    <motion.div 
                      className="absolute top-3/4 left-0 w-full h-[1px] bg-[var(--foreground)] opacity-20"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.7, ease: [0.17, 0.67, 0.83, 0.67] }}
                    />
                    <motion.div 
                      className="absolute top-0 left-1/4 w-[1px] h-full bg-[var(--foreground)] opacity-20"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: 1.8, ease: [0.17, 0.67, 0.83, 0.67] }}
                    />
                    <motion.div 
                      className="absolute top-0 left-2/4 w-[1px] h-full bg-[var(--foreground)] opacity-20"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: 1.9, ease: [0.17, 0.67, 0.83, 0.67] }}
                    />
                    <motion.div 
                      className="absolute top-0 left-3/4 w-[1px] h-full bg-[var(--foreground)] opacity-20"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: 2.0, ease: [0.17, 0.67, 0.83, 0.67] }}
                    />
                    
                    {/* Grid intersections */}
                    <motion.div 
                      className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[var(--accent)] -translate-x-[3px] -translate-y-[3px]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.3, delay: 2.2 }}
                    />
                    <motion.div 
                      className="absolute top-1/4 left-2/4 w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] -translate-x-[3px] -translate-y-[3px]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.3, delay: 2.3 }}
                    />
                    <motion.div 
                      className="absolute top-1/4 left-3/4 w-1.5 h-1.5 rounded-full bg-[var(--accent-tertiary)] -translate-x-[3px] -translate-y-[3px]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.3, delay: 2.4 }}
                    />
                    <motion.div 
                      className="absolute top-2/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[var(--accent-tertiary)] -translate-x-[3px] -translate-y-[3px]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.3, delay: 2.5 }}
                    />
                    <motion.div 
                      className="absolute top-2/4 left-2/4 w-1.5 h-1.5 rounded-full bg-[var(--accent)] -translate-x-[3px] -translate-y-[3px]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.3, delay: 2.6 }}
                    />
                    <motion.div 
                      className="absolute top-2/4 left-3/4 w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] -translate-x-[3px] -translate-y-[3px]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.3, delay: 2.7 }}
                    />
                    <motion.div 
                      className="absolute top-3/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] -translate-x-[3px] -translate-y-[3px]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.3, delay: 2.8 }}
                    />
                    <motion.div 
                      className="absolute top-3/4 left-2/4 w-1.5 h-1.5 rounded-full bg-[var(--accent-tertiary)] -translate-x-[3px] -translate-y-[3px]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.3, delay: 2.9 }}
                    />
                    <motion.div 
                      className="absolute top-3/4 left-3/4 w-1.5 h-1.5 rounded-full bg-[var(--accent)] -translate-x-[3px] -translate-y-[3px]"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.3, delay: 3.0 }}
                    />
                    
                    {/* Geometric shapes */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-1/4 h-1/4 border border-[var(--accent)] bg-[var(--background)] opacity-90"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.1, ease: [0.17, 0.67, 0.83, 0.67] }}
                    />
                    <motion.div
                      className="absolute top-2/4 left-2/4 w-1/4 h-1/4 bg-[var(--accent-secondary)] opacity-25"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.2, ease: [0.17, 0.67, 0.83, 0.67] }}
                    />
                    <motion.div
                      className="absolute top-1/4 left-2/4 w-8 h-8 bg-[var(--accent)] opacity-40"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.3, ease: [0.17, 0.67, 0.83, 0.67] }}
                    />
                    
                    {/* Typography elements */}
                    <motion.div 
                      className="absolute top-3/4 left-3/4 flex flex-col items-end"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ duration: 0.5, delay: 2.5 }}
                    >
                      <motion.div 
                        className="text-xs font-bold tracking-widest uppercase"
                        animate={{ opacity: [0.7, 0.9, 0.7] }}
                        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
                      >
                        Design
                      </motion.div>
                      <motion.div 
                        className="w-8 h-[2px] mt-1 bg-[var(--accent)]"
                        initial={{ width: 0 }}
                        animate={{ width: 32 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="absolute top-8 left-8 flex flex-col items-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      transition={{ duration: 0.5, delay: 2.6 }}
                    >
                      <motion.div 
                        className="text-xs font-bold tracking-widest uppercase"
                        animate={{ opacity: [0.7, 0.9, 0.7] }}
                        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", delay: 1 }}
                      >
                        Code
                      </motion.div>
                      <motion.div 
                        className="w-8 h-[2px] mt-1 bg-[var(--accent-secondary)]"
                        initial={{ width: 0 }}
                        animate={{ width: 32 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </SwissMotion>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <SwissMotion
        type="fade" 
        delay={1.5}
        duration={0.5}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <p className="text-xs uppercase tracking-widest mb-2">Scroll Down</p>
        <motion.div 
          className="h-8 w-[1px] bg-[var(--foreground)]"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"  
          }}
        />
      </SwissMotion>
    </div>
  );
}