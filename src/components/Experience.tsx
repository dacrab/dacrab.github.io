"use client";

import { useRef, useState, useEffect, memo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Import extracted components
import SectionHeader from "./Experience/SectionHeader";
import LottieVisualization from "./Experience/LottieVisualization";
import SkillProgressions from "./Experience/SkillProgressions";
import Timeline from "./Experience/Timeline";

// Memoize the component to prevent unnecessary re-renders
const Experience = memo(function Experience() {
  // Refs and hooks
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: isMobile ? 0.05 : 0.1 });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  // Track if component has been visible for lazy loading
  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isInView, hasBeenVisible]);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Optimized transform values
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.995, 1, 1, 0.995]);
  
  // Animation configurations
  const primaryGlowAnimation = {
    opacity: isInView ? (isMobile ? 0.3 : 0.5) : 0,
    x: isInView ? [-50, -55, -50] : -50,
  };
  
  const secondaryGlowAnimation = {
    opacity: isInView ? (isMobile ? 0.4 : 0.6) : 0,
    scale: isInView ? [1, 1.1, 1] : 0.9,
  };
  
  const cardGlowAnimation = {
    opacity: isInView ? [0, isMobile ? 0.6 : 0.8, 0] : 0,
  };
  
  return (
    <section 
      id="experience" 
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden"
    >
      {/* Background effects - only render when needed */}
      {hasBeenVisible && (
        <>
          {/* Primary accent glow */}
          <motion.div 
            className="absolute top-[15%] left-[50%] w-[40%] h-[35%] rounded-full bg-accent/15 blur-[150px] opacity-0"
            animate={primaryGlowAnimation}
            transition={{ 
              opacity: { duration: isMobile ? 1.5 : 1.8 },
              x: { 
                repeat: Infinity,
                duration: isMobile ? 25 : 20,
                ease: "easeInOut",
                repeatType: "mirror"
              }
            }}
          />
          
          {/* Secondary accent glow */}
          <motion.div 
            className="absolute bottom-[25%] right-[10%] w-[30%] h-[40%] rounded-full bg-accent/20 blur-[120px] opacity-0"
            animate={secondaryGlowAnimation}
            transition={{ 
              opacity: { duration: isMobile ? 1.2 : 1.5, delay: isMobile ? 0.3 : 0.5 },
              scale: { 
                repeat: Infinity,
                duration: isMobile ? 22 : 18,
                ease: "easeInOut",
                repeatType: "mirror"
              }
            }}
          />
        </>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <SectionHeader isMobile={isMobile} />

        {/* Main content card */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          style={{ opacity, scale }}
          layout="position"
        >
          <div 
            className="backdrop-blur-sm rounded-xl overflow-hidden border border-border/20 shadow-lg relative"
            style={{ background: "rgba(var(--card-rgb), 0.6)" }}
          >
            {/* Card glow effect */}
            {hasBeenVisible && (
              <motion.div 
                className="absolute inset-0 bg-accent/5 opacity-0"
                animate={cardGlowAnimation}
                transition={{ 
                  repeat: Infinity,
                  duration: isMobile ? 10 : 8,
                  ease: "easeInOut",
                  repeatType: "mirror"
                }}
              />
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
              {/* Left column: Visualization */}
              <div className="p-5 md:p-8 border-b lg:border-b-0 lg:border-r border-border/20">
                <LottieVisualization isInView={isInView} isMobile={isMobile} />
              </div>
              
              {/* Right column: Skills */}
              <div className="p-5 md:p-8">
                <SkillProgressions isInView={isInView} isMobile={isMobile} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <Timeline isInView={isInView} isMobile={isMobile} />
      </div>
    </section>
  );
});

// Add display name for better debugging
Experience.displayName = 'Experience';

export default Experience;