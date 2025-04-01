"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TextAnimation from "./TextAnimation";
import ScrollScene from "./ScrollScene";
import ParallaxLayer from "./ParallaxLayer";

export default function Hero() {
  const ref = useRef(null);
  const [showCVDropdown, setShowCVDropdown] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const headerScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.3, 0]);
  
  // Signature SVG path animation
  const pathLength = useMotionValue(0);
  const springPathLength = useSpring(pathLength, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const timer = setTimeout(() => {
      pathLength.set(1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [pathLength]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showCVDropdown) return;
    
    const handleClickOutside = () => setShowCVDropdown(false);
    document.addEventListener('click', handleClickOutside);
    
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showCVDropdown]);

  const handleCVButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCVDropdown(!showCVDropdown);
  };

  const downloadCV = (language: string) => {
    const filename = language === 'english' ? 'CV_English.pdf' : 'CV_Greek.pdf';
    const link = document.createElement('a');
    link.href = `/assets/cv/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCVDropdown(false);
  };

  return (
    <div
      ref={ref}
      id="home"
      className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden pt-24"
    >
      {/* Abstract background grid */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
          opacity: gridOpacity,
          scale: gridScale,
        }}
      />
      
      {/* Asymmetrical background shapes */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute -left-[20%] top-[10%] w-[60%] h-[55%] rounded-full bg-gradient-1/10 blur-[120px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) }}
        />
        <motion.div 
          className="absolute right-[10%] bottom-[10%] w-[50%] h-[50%] rounded-full bg-gradient-2/10 blur-[120px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]) }}
        />
        <motion.div 
          className="absolute left-[40%] top-[60%] w-[30%] h-[30%] rounded-full bg-gradient-3/10 blur-[100px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
        />
        
        {/* Decorative lines */}
        <motion.div
          className="absolute inset-0 overflow-hidden opacity-20"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ["0%", "5%"]),
          }}
        >
          <motion.div className="absolute top-1/3 left-0 right-0 h-px bg-accent/30" 
            style={{ scaleX: useTransform(scrollYProgress, [0, 0.5], [1, 1.1]) }} 
          />
          <motion.div className="absolute top-2/3 left-0 right-0 h-px bg-accent/30" 
            style={{ scaleX: useTransform(scrollYProgress, [0, 0.5], [1, 0.9]) }} 
          />
          <motion.div className="absolute bottom-1/4 left-0 right-0 h-px bg-accent/30" 
            style={{ scaleX: useTransform(scrollYProgress, [0, 0.5], [1, 1.2]) }} 
          />
        </motion.div>
      </div>

      <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12 min-h-[65vh] items-center">
          {/* Left side asymmetrical content */}
          <motion.div 
            className="lg:col-span-7 xl:col-span-6 lg:col-start-1"
            style={{ opacity: headerOpacity, scale: headerScale }}
          >
            <div className="relative">
              <motion.div 
                className="mb-2 text-accent text-base md:text-lg tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <TextAnimation 
                  text="Hello, I'm a"
                  variant="typewriter"
                  className="inline-block"
                  delay={0.5}
                  duration={0.3}
                />
              </motion.div>
              
              <div className="mb-6 lg:mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.8,
                    ease: [0.215, 0.61, 0.355, 1] 
                  }}
                >
                  <TextAnimation 
                    text="Senior Web Developer"
                    variant="reveal"
                    className="block text-4xl md:text-5xl lg:text-6xl font-bold"
                    delay={0.1}
                    duration={0.5}
                  />
                </motion.div>
              </div>
              
              <motion.div
                className="max-w-2xl text-muted mb-8 lg:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <TextAnimation 
                  text="Crafting modern, high-performance web experiences with Next.js, TypeScript, and Tailwind CSS. Specializing in sleek UI/UX design with cutting-edge animations."
                  variant="split"
                  className="text-base md:text-lg"
                  delay={0.1}
                  duration={0.4}
                />
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap gap-3 md:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <a 
                  href="#projects" 
                  className="px-6 py-2.5 rounded-lg bg-accent text-white font-medium transition-all duration-300 hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-2.5 rounded-lg border border-border text-foreground transition-all duration-300 hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
                >
                  Contact Me
                </a>
                
                {/* CV Download Button with Dropdown */}
                <div className="relative">
                  <button 
                    onClick={handleCVButtonClick}
                    className="px-6 py-2.5 rounded-lg border border-accent bg-accent/10 text-accent font-medium transition-all duration-300 hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background flex items-center gap-2"
                  >
                    <span>Download CV</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {showCVDropdown && (
                      <motion.div 
                        className="absolute top-full left-0 mt-2 w-full bg-card/90 backdrop-blur-sm border border-border/40 rounded-lg shadow-lg overflow-hidden z-50"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button 
                          onClick={() => downloadCV('english')}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-accent/10 transition-colors duration-150 flex items-center gap-2"
                        >
                          <span className="text-accent">EN</span>
                          <span>English Version</span>
                        </button>
                        <button 
                          onClick={() => downloadCV('greek')}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-accent/10 transition-colors duration-150 flex items-center gap-2"
                        >
                          <span className="text-accent">GR</span>
                          <span>Greek Version</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right side abstract visual */}
          <div className="lg:col-span-5 xl:col-span-6 lg:col-start-8">
            <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center">
              {/* Abstract signature/path that draws itself */}
              <motion.svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 500 500" 
                fill="none" 
                className="w-full h-full max-h-[500px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Abstract decorative circles */}
                <motion.circle 
                  cx="250" 
                  cy="250" 
                  r="180" 
                  stroke="var(--border)" 
                  strokeWidth="0.5" 
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 2, delay: 1.5 }}
                />
                <motion.circle 
                  cx="250" 
                  cy="250" 
                  r="120" 
                  stroke="var(--border)" 
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 2, delay: 1.8 }}
                />
                
                {/* Animated signature/abstract design */}
                <motion.path
                  d="M150,250 C150,180 220,150 250,150 C280,150 320,180 320,220 C320,260 280,280 250,280 C220,280 180,260 180,220 C180,180 220,150 250,150 M250,280 L250,350 M200,320 L300,320"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    pathLength: springPathLength,
                    opacity: useTransform(springPathLength, [0, 1], [0, 1])
                  }}
                />
                
                {/* Accent elements */}
                <motion.circle 
                  cx="250" 
                  cy="150" 
                  r="5" 
                  fill="var(--accent)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 2.2 }}
                />
                <motion.circle 
                  cx="250" 
                  cy="350" 
                  r="5" 
                  fill="var(--accent)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 2.5 }}
                />
                
                {/* Abstract code-like elements */}
                <motion.text 
                  x="320" 
                  y="180" 
                  fill="var(--muted)" 
                  fontFamily="var(--font-geist-mono)" 
                  fontSize="10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 1, delay: 2.8 }}
                >
                  &lt;code&gt;
                </motion.text>
                <motion.text 
                  x="140" 
                  y="320" 
                  fill="var(--muted)" 
                  fontFamily="var(--font-geist-mono)" 
                  fontSize="10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 1, delay: 3 }}
                >
                  &lt;/code&gt;
                </motion.text>
              </motion.svg>
              
              {/* Floating tech keywords */}
              <motion.div
                className="absolute top-[15%] right-[15%] font-mono text-xs text-accent/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.5, delay: 3.2 }}
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
              >
                Next.js
              </motion.div>
              <motion.div
                className="absolute bottom-[20%] left-[20%] font-mono text-xs text-accent/70"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.5, delay: 3.4 }}
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
              >
                React
              </motion.div>
              <motion.div
                className="absolute top-[60%] right-[25%] font-mono text-xs text-accent/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.5, delay: 3.6 }}
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
              >
                TypeScript
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
      >
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center"
        >
          <div className="text-xs text-muted/70 mb-2">Scroll</div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
              <motion.circle 
                cx="8" 
                cy="8" 
                r="3" 
                fill="currentColor"
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
} 