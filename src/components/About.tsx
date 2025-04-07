"use client";

import { useRef, useEffect, RefObject, memo, useState } from "react";
import { useInView, useAnimation, useScroll, useTransform, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Import extracted components
import SectionHeader from "./About/SectionHeader";
import ProfileImage from "./About/ProfileImage";
import BioSection from "./About/BioSection";

// Memoize the component to prevent unnecessary re-renders
const About = memo(function About() {
  // Refs and hooks
  const ref = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: isMobile ? 0.05 : 0.1 });
  const controls = useAnimation();
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Optimized transform with fewer interpolation points
  const contentY = useTransform(scrollYProgress, [0, 0.5], [isMobile ? 3 : 5, 0]);
  
  // Track if component has been visible for lazy loading
  useEffect(() => {
    if (isInView && !hasBeenVisible) {
      setHasBeenVisible(true);
    }
  }, [isInView, hasBeenVisible]);
  
  // Control animations based on view state
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!hasBeenVisible) {
      // Only reset to hidden if never been visible before
      controls.start("hidden");
    }
  }, [isInView, controls, hasBeenVisible]);
  
  return (
    <section 
      id="about"
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden"
    >
      {/* Render background effects only after first visibility */}
      {hasBeenVisible && (
        <>
          {/* Left accent glow */}
          <motion.div 
            className="absolute top-1/4 -left-[10%] w-[35%] h-[40%] rounded-full bg-accent/20 blur-[120px] opacity-0"
            animate={{ 
              opacity: isInView ? (isMobile ? 0.3 : 0.5) : 0,
              scale: isInView ? [1, 1.1, 1] : 0.8,
            }}
            transition={{ 
              opacity: { duration: isMobile ? 1.2 : 1.5 },
              scale: { 
                repeat: Infinity,
                duration: isMobile ? 18 : 15,
                ease: "easeInOut",
                repeatType: "mirror"
              }
            }}
          />
          
          {/* Right accent glow */}
          <motion.div 
            className="absolute bottom-1/4 -right-[5%] w-[25%] h-[30%] rounded-full bg-accent/15 blur-[100px] opacity-0"
            animate={{ 
              opacity: isInView ? (isMobile ? 0.25 : 0.4) : 0,
              scale: isInView ? [1, 0.95, 1] : 0.8,
            }}
            transition={{ 
              opacity: { duration: isMobile ? 1.2 : 1.5, delay: isMobile ? 0.2 : 0.3 },
              scale: { 
                repeat: Infinity,
                duration: isMobile ? 15 : 12,
                ease: "easeInOut",
                repeatType: "mirror"
              }
            }}
          />
        </>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section heading */}
        <SectionHeader isMobile={isMobile} />
        
        {/* Main content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 relative">
          {/* Left column: Profile image and stats */}
          <ProfileImage contentY={contentY} isMobile={isMobile} />
          
          {/* Right column: Bio and skills */}
          <BioSection 
            contentY={contentY} 
            bioRef={bioRef as RefObject<HTMLDivElement>}
            bioAnimate={controls}
            isMobile={isMobile}
          />
        </div>
      </div>
    </section>
  );
});

// Add display name for better debugging
About.displayName = 'About';

export default About;