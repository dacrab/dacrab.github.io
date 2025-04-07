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
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: isMobile ? 0.05 : 0.1 }); // Even lower threshold for mobile for earlier animation
  
  // State to track if component has ever been visible
  // This helps with lazy loading optimizations
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  // Only perform expensive animations/calculations after component has been visible once
  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isInView, hasBeenVisible]);
  
  // Scroll progress for animations with simplified values
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Simplified transform values with reduced range for better mobile performance
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [isMobile ? 0.3 : 0.2, 1, 1, isMobile ? 0.3 : 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [isMobile ? 0.995 : 0.99, 1, 1, isMobile ? 0.995 : 0.99]);
  
  return (
    <section 
      id="experience" 
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden" // Reduced padding for mobile
    >
      {/* Only render complex animations if component has been visible at least once */}
      {hasBeenVisible && (
        <>
          {/* Accent glow effects */}
          <motion.div 
            className="absolute top-[15%] left-[50%] w-[40%] h-[35%] rounded-full bg-accent/15 blur-[150px] opacity-0"
            animate={{ 
              opacity: isInView ? (isMobile ? 0.3 : 0.5) : 0,
              x: isInView ? [-50, -60, -55, -45, -50] : -50, // subtle side-to-side movement
            }}
            transition={{ 
              opacity: { duration: isMobile ? 1.5 : 1.8 },
              x: { 
                repeat: Infinity,
                duration: isMobile ? 25 : 20,
                ease: "easeInOut" 
              }
            }}
          />
          <motion.div 
            className="absolute bottom-[25%] right-[10%] w-[30%] h-[40%] rounded-full bg-accent/20 blur-[120px] opacity-0"
            animate={{ 
              opacity: isInView ? (isMobile ? 0.4 : 0.6) : 0,
              scale: isInView ? [1, 1.15, 1, 0.9, 1] : 0.9,
            }}
            transition={{ 
              opacity: { duration: isMobile ? 1.2 : 1.5, delay: isMobile ? 0.3 : 0.5 },
              scale: { 
                repeat: Infinity,
                duration: isMobile ? 22 : 18,
                ease: "easeInOut" 
              }
            }}
          />
        </>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <SectionHeader isMobile={isMobile} />

        {/* Main content with professional card layout */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16" // Reduced margin for mobile
          style={{ 
            opacity,
            scale 
          }}
        >
          <div className="backdrop-blur-sm rounded-xl overflow-hidden border border-border/20 shadow-lg relative" // Reduced shadow and border radius for better performance
               style={{ background: "rgba(var(--card-rgb), 0.6)" }}>
            
            {/* Card glow effect - only render if visible at least once */}
            {hasBeenVisible && (
              <motion.div 
                className="absolute inset-0 bg-accent/5 opacity-0"
                animate={{ 
                  opacity: isInView ? [0, isMobile ? 0.6 : 0.8, 0] : 0,
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: isMobile ? 10 : 8,
                  ease: "easeInOut" 
                }}
              />
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
              {/* Left column: Lottie Visualization */}
              <div className="p-5 md:p-8 border-b lg:border-b-0 lg:border-r border-border/20"> {/* Reduced padding for mobile */}
                <LottieVisualization isInView={isInView} isMobile={isMobile} />
              </div>
              
              {/* Right column: Skill Progressions */}
              <div className="p-5 md:p-8"> {/* Reduced padding for mobile */}
                <SkillProgressions isInView={isInView} isMobile={isMobile} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Section with enhanced styling */}
        <Timeline isInView={isInView} isMobile={isMobile} />
      </div>
    </section>
  );
});

export default Experience; 