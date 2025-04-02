"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import TextAnimation from "./TextAnimation";

export default function Hero() {
  const ref = useRef(null);
  const [showCVDropdown, setShowCVDropdown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Mark component as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

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
      {/* Enhanced abstract background grid with subtle animation */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
          opacity: gridOpacity,
          scale: gridScale,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.7,
          backgroundSize: ["50px 50px", "52px 52px", "50px 50px"]
        }}
        transition={{ 
          opacity: { duration: 1.5 },
          backgroundSize: { 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        }}
      />
      
      {/* Floating particles with client-side only randomization */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => {
          // Deterministic initial positions based on index
          const leftPos = `${(i * 6.5) % 100}%`;
          const topPos = `${(i * 7) % 100}%`;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-accent/20"
              initial={{ 
                opacity: 0, 
                scale: 0,
                left: leftPos,
                top: topPos
              }}
              animate={isMounted ? { 
                x: [
                  ((i % 3) * 20) - 25, 
                  (((i + 1) % 3) * 20) - 25, 
                  ((i % 3) * 20) - 25
                ],
                y: [
                  ((i % 4) * 15) - 25, 
                  (((i + 2) % 4) * 15) - 25, 
                  ((i % 4) * 15) - 25
                ],
                opacity: [0, 0.4, 0],
                scale: [0, 1, 0]
              } : {}}
              transition={isMounted ? {
                duration: 10 + (i % 10),
                repeat: Infinity,
                delay: i % 5
              } : {}}
            />
          );
        })}
      </div>
      
      {/* Enhanced asymmetrical background shapes */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute -left-[20%] top-[10%] w-[60%] h-[55%] rounded-full bg-accent/10 blur-[120px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute right-[10%] bottom-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]) }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            opacity: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 14, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            delay: 1
          }}
        />
        <motion.div 
          className="absolute left-[40%] top-[60%] w-[30%] h-[30%] rounded-full bg-accent/10 blur-[100px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.15, 1],
            x: [-10, 10, -10]
          }}
          transition={{ 
            opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            delay: 2
          }}
        />
        
        {/* Enhanced decorative lines with more dynamic animations */}
        <motion.div
          className="absolute inset-0 overflow-hidden opacity-20"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ["0%", "5%"]),
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <motion.div 
            className="absolute top-1/3 left-0 right-0 h-px bg-accent/30" 
            style={{ 
              scaleX: useTransform(scrollYProgress, [0, 0.5], [1, 1.1]),
              x: useTransform(scrollYProgress, [0, 1], ["0%", "2%"])
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, 5, 0]
            }}
            transition={{
              opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute top-2/3 left-0 right-0 h-px bg-accent/30" 
            style={{ 
              scaleX: useTransform(scrollYProgress, [0, 0.5], [1, 0.9]),
              x: useTransform(scrollYProgress, [0, 1], ["0%", "-3%"])
            }} 
            animate={{
              opacity: [0.3, 0.5, 0.3],
              y: [0, -5, 0]
            }}
            transition={{
              opacity: { duration: 9, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 14, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-0 right-0 h-px bg-accent/30" 
            style={{ 
              scaleX: useTransform(scrollYProgress, [0, 0.5], [1, 1.2]),
              x: useTransform(scrollYProgress, [0, 1], ["0%", "1%"])
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              y: [0, 8, 0]
            }}
            transition={{
              opacity: { duration: 11, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 16, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Additional diagonal decorative lines */}
          <motion.div 
            className="absolute top-[20%] right-[20%] w-[30%] h-px bg-accent/20 origin-left" 
            animate={{
              rotate: [15, 20, 15],
              opacity: [0.2, 0.4, 0.2],
              scaleX: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 13, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              scaleX: { duration: 18, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute bottom-[30%] left-[20%] w-[35%] h-px bg-accent/20 origin-left" 
            animate={{
              rotate: [-20, -15, -20],
              opacity: [0.2, 0.5, 0.2],
              scaleX: [1, 1.15, 1]
            }}
            transition={{
              rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              scaleX: { duration: 20, repeat: Infinity, ease: "easeInOut" }
            }}
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
                    text="Junior Web Developer"
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
                  text="Crafting modern web experiences with Next.js, TypeScript, and Tailwind CSS. Passionate about learning UI/UX design and cutting-edge animations."
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
                          <svg 
                            className="h-4 w-6 rounded-sm shadow-sm" 
                            viewBox="0 0 640 480" 
                            aria-hidden="true"
                          >
                            <g fillRule="evenodd">
                              <g strokeWidth="1pt">
                                <path fill="#bd3d44" d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)"/>
                                <path fill="#fff" d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z" transform="scale(.9375)"/>
                              </g>
                              <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)"/>
                              <path fill="#fff" d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.4l-9.2 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 39.4l3.5 10.9h11.5L70.6 57 74 67.9l-9-6.7-9.3 6.7L59 57l-9-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7L124 57l-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5L330 57l3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 66.9L36 78h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7H29zm64.9 0l3.5 11h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zm64.8 0l3.6 11H177l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7h11.5zm64.9 0l3.5 11H242l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.4zm64.8 0l3.6 11h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.2-6.7h11.4zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.5zM64.9 94.5l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 122.1L36 133h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 149.7l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zM32.4 177.2l3.6 11h11.4l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 11H177l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 11H242l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 11h11.4l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 204.8l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4z" transform="scale(.9375)"/>
                            </g>
                          </svg>
                          <span>English Version</span>
                        </button>
                        <button 
                          onClick={() => downloadCV('greek')}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-accent/10 transition-colors duration-150 flex items-center gap-2"
                        >
                          <svg 
                            className="h-4 w-6 rounded-sm shadow-sm" 
                            viewBox="0 0 640 480" 
                            aria-hidden="true"
                          >
                            <path fill="#0d5eaf" d="M0 0h640v53.3H0z"/>
                            <path fill="#fff" d="M0 53.3h640v53.4H0z"/>
                            <path fill="#0d5eaf" d="M0 106.7h640V160H0z"/>
                            <path fill="#fff" d="M0 160h640v53.3H0z"/>
                            <path fill="#0d5eaf" d="M0 213.3h640v53.4H0z"/>
                            <path fill="#fff" d="M0 266.7h640V320H0z"/>
                            <path fill="#0d5eaf" d="M0 320h640v53.3H0z"/>
                            <path fill="#fff" d="M0 373.3h640v53.4H0z"/>
                            <path fill="#0d5eaf" d="M0 426.7h640V480H0z"/>
                            <path fill="#0d5eaf" d="M0 0h213.3v240H0z"/>
                            <path fill="#fff" d="M0 80h213.3v80H0z"/>
                            <path fill="#fff" d="M80 0h53.3v240H80z"/>
                          </svg>
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
                animate={{ 
                  opacity: 1,
                  rotateZ: [0, 1, -1, 0] 
                }}
                transition={{ 
                  opacity: { duration: 1, delay: 0.5 },
                  rotateZ: { duration: 20, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Abstract decorative circles */}
                <motion.circle 
                  cx="250" 
                  cy="250" 
                  r="180" 
                  stroke="var(--accent)" 
                  strokeOpacity="0.15"
                  strokeWidth="0.5" 
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 0.6,
                    rotate: [0, 360],
                    r: [180, 185, 180]
                  }}
                  transition={{ 
                    opacity: { duration: 2, delay: 1.5 },
                    rotate: { duration: 120, repeat: Infinity, ease: "linear" },
                    r: { duration: 15, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <motion.circle 
                  cx="250" 
                  cy="250" 
                  r="120" 
                  stroke="var(--accent)" 
                  strokeOpacity="0.25"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 0.8,
                    rotate: [0, -360],
                    r: [120, 125, 120]
                  }}
                  transition={{ 
                    opacity: { duration: 2, delay: 1.8 },
                    rotate: { duration: 90, repeat: Infinity, ease: "linear" },
                    r: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                
                {/* New decorative pulsing dots */}
                {[40, 80, 140, 200].map((radius, i) => (
                  <motion.circle 
                    key={`pulse-dot-${i}`}
                    cx="250" 
                    cy="250" 
                    r="3"
                    fill="var(--accent)"
                    fillOpacity="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 0.7, 0],
                      scale: [0, 1, 0],
                      translateX: [radius * Math.cos(i * Math.PI/2), radius * Math.cos(i * Math.PI/2)],
                      translateY: [radius * Math.sin(i * Math.PI/2), radius * Math.sin(i * Math.PI/2)]
                    }}
                    transition={{ 
                      duration: 4,
                      delay: 2 + i * 0.5,
                      repeat: Infinity,
                      repeatDelay: i + 1
                    }}
                  />
                ))}
                
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
                
                {/* Animated glow effect for signature path */}
                <motion.path
                  d="M150,250 C150,180 220,150 250,150 C280,150 320,180 320,220 C320,260 280,280 250,280 C220,280 180,260 180,220 C180,180 220,150 250,150 M250,280 L250,350 M200,320 L300,320"
                  stroke="var(--accent)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeOpacity="0.3"
                  fill="none"
                  style={{
                    pathLength: springPathLength,
                    opacity: useTransform(springPathLength, [0, 1], [0, 0.3])
                  }}
                  filter="blur(4px)"
                />
                
                {/* Accent elements with pulse animation */}
                <motion.circle 
                  cx="250" 
                  cy="150" 
                  r="5" 
                  fill="var(--accent)"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                    boxShadow: "0 0 10px var(--accent)"
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 2.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.circle 
                  cx="250" 
                  cy="350" 
                  r="5" 
                  fill="var(--accent)"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 3,
                    delay: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Abstract code-like elements with typing animation */}
                <motion.text 
                  x="320" 
                  y="180" 
                  fill="var(--accent)" 
                  fillOpacity="0.6"
                  fontFamily="var(--font-geist-mono)" 
                  fontSize="10"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ 
                    opacity: [0, 0.7, 0.7],
                    width: [0, 60, 60]
                  }}
                  transition={{ 
                    opacity: { duration: 1, delay: 2.8 },
                    width: { duration: 1, delay: 2.8 }
                  }}
                >
                  &lt;code&gt;
                </motion.text>
                <motion.text 
                  x="140" 
                  y="320" 
                  fill="var(--accent)" 
                  fillOpacity="0.6"
                  fontFamily="var(--font-geist-mono)" 
                  fontSize="10"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ 
                    opacity: [0, 0.7, 0.7],
                    width: [0, 70, 70]
                  }}
                  transition={{ 
                    opacity: { duration: 1, delay: 3 },
                    width: { duration: 1, delay: 3 }
                  }}
                >
                  &lt;/code&gt;
                </motion.text>
              </motion.svg>
              
              {/* Floating tech keywords with enhanced animation */}
              <motion.div
                className="absolute top-[15%] right-[15%] font-mono text-xs text-accent/70 backdrop-blur-sm px-2 py-1 rounded-full bg-card/10 border border-accent/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: [0, 0.7, 0.5, 0.7],
                  y: [20, 0, -5, 0]
                }}
                transition={{ 
                  opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3.2 }
                }}
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
              >
                Next.js
              </motion.div>
              <motion.div
                className="absolute bottom-[20%] left-[20%] font-mono text-xs text-accent/70 backdrop-blur-sm px-2 py-1 rounded-full bg-card/10 border border-accent/5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: [0, 0.7, 0.5, 0.7],
                  y: [-20, 0, 5, 0]
                }}
                transition={{ 
                  opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3.4 }
                }}
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
              >
                React
              </motion.div>
              <motion.div
                className="absolute top-[60%] right-[25%] font-mono text-xs text-accent/70 backdrop-blur-sm px-2 py-1 rounded-full bg-card/10 border border-accent/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: [0, 0.7, 0.5, 0.7],
                  y: [20, 0, -8, 0]
                }}
                transition={{ 
                  opacity: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3.6 }
                }}
                style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
              >
                TypeScript
              </motion.div>
              
              {/* New floating keywords */}
              <motion.div
                className="absolute top-[35%] left-[15%] font-mono text-xs text-accent/70 backdrop-blur-sm px-2 py-1 rounded-full bg-card/10 border border-accent/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: [0, 0.7, 0.5, 0.7],
                  y: [20, 0, -10, 0]
                }}
                transition={{ 
                  opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3.8 }
                }}
              >
                Tailwind
              </motion.div>
              <motion.div
                className="absolute top-[80%] right-[40%] font-mono text-xs text-accent/70 backdrop-blur-sm px-2 py-1 rounded-full bg-card/10 border border-accent/5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: [0, 0.7, 0.5, 0.7],
                  y: [-20, 0, 5, 0]
                }}
                transition={{ 
                  opacity: { duration: 9, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4.0 }
                }}
              >
                Framer Motion
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
          <div className="text-xs text-accent/70 mb-2">Scroll</div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
              <motion.circle 
                cx="8" 
                cy="8" 
                r="3" 
                fill="var(--accent)"
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