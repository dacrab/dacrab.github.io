"use client";

import { memo, useMemo } from "react";
import SwissMotion from "../SwissMotion";
import HeroHeading from "./HeroHeading";
import ButtonGroup from "./ButtonGroup";
import TechKeywords from "./TechKeywords";
import { motion } from "framer-motion";
import { HeroContentProps } from "./types";
import { ANIMATION } from "./constants";

/**
 * Left side content of the hero section with heading, description, buttons, and tech keywords
 */
const HeroContent = memo(function HeroContent({ 
  showCVDropdown, 
  setShowCVDropdown, 
  handleCVDownload,
  isMobile
}: HeroContentProps) {
  // Memoize the mobile visual renderer to prevent unnecessary re-renders
  const MobileVisual = useMemo(() => (
    <div className="mt-16">
      <SwissMotion
        type="scale"
        delay={0.5}
        duration={ANIMATION.duration.medium}
      >
        <div className="w-40 h-40 swiss-grid-pattern relative mx-auto">
          {/* Swiss style accent borders */}
          <SwissMotion type="reveal" delay={0.6} duration={0.4}>
            <div className="absolute left-0 top-0 w-full h-2 bg-[var(--accent)]"></div>
          </SwissMotion>
          <SwissMotion type="reveal" delay={0.8} duration={0.4}>
            <div className="absolute right-0 top-0 w-2 h-full bg-[var(--accent-secondary)]"></div>
          </SwissMotion>
          
          {/* Swiss design elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-1/3 h-1/3 border border-[var(--accent)] bg-[var(--background)] opacity-90"
            initial={{ scale: 0, rotate: -15 }}
            animate={{ 
              scale: [0, 1.3, 0.85, 1.15, 1],
              rotate: [-25, 8, -8, 3, 0],
              x: [15, -8, 4, -2, 0],
              y: [-8, 12, -4, 2, 0]
            }}
            transition={{ 
              duration: 1.0, 
              delay: 0.5, 
              ease: ANIMATION.easing.explosive,
              times: [0, 0.35, 0.6, 0.85, 1]
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-[var(--accent-secondary)] opacity-25"
            initial={{ scale: 0, rotate: 15 }}
            animate={{ 
              scale: [0, 0.7, 1.2, 0.9, 1],
              rotate: [25, -15, 10, -5, 0],
              x: [-20, 12, -6, 2, 0],
              y: [12, -15, 6, -2, 0]
            }}
            transition={{ 
              duration: 1.1, 
              delay: 0.6, 
              ease: ANIMATION.easing.explosive,
              times: [0, 0.25, 0.55, 0.8, 1]
            }}
          />
          
          {/* Grid lines */}
          <motion.div 
            className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--foreground)] opacity-20"
            initial={{ scaleX: 0 }}
            animate={{ 
              scaleX: [0, 1.2, 0.9, 1.1, 1],
              opacity: [0, 0.3, 0.2, 0.35, 0.25]
            }}
            transition={{ 
              duration: ANIMATION.duration.medium,
              delay: 0.9, 
              ease: ANIMATION.easing.explosive,
              times: [0, 0.3, 0.6, 0.8, 1]
            }}
          />
          <motion.div 
            className="absolute top-0 left-1/2 w-[1px] h-full bg-[var(--foreground)] opacity-20"
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: [0, 1.15, 0.9, 1.05, 1],
              opacity: [0, 0.3, 0.2, 0.25, 0.2] 
            }}
            transition={{ 
              duration: ANIMATION.duration.medium,
              delay: 1.0, 
              ease: ANIMATION.easing.explosive,
              times: [0, 0.25, 0.55, 0.75, 1]
            }}
          />

          {/* Additional energetic element */}
          <motion.div
            className="absolute top-3/4 left-3/4 w-6 h-6 bg-[var(--accent)] opacity-70"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.4, 0.7, 1.2, 1],
              rotate: [0, 45, -15, 20, 0],
              opacity: [0, 0.8, 0.5, 0.7, 0.6]
            }}
            transition={{ 
              duration: 0.9, 
              delay: 1.2,
              ease: ANIMATION.easing.explosive,
              times: [0, 0.3, 0.5, 0.75, 1]
            }}
          />
        </div>
      </SwissMotion>
    </div>
  ), []);

  return (
    <div className="md:swiss-asymmetric-left flex flex-col justify-center mb-8 md:mb-0">
      <SwissMotion
        type="slide"
        delay={0.2}
        duration={ANIMATION.duration.medium}
        className="mb-6"
      >
        <div className="flex items-center mb-2">
          <div className="w-10 md:w-16 h-1 bg-[var(--accent)] mr-4"></div>
          <p className="text-[var(--muted)] uppercase tracking-widest text-xs sm:text-sm">Web Developer</p>
        </div>
        
        {/* Heading with animated elements */}
        <HeroHeading isMobile={isMobile} />
        
        {/* Description text */}
        <div className="swiss-body max-w-md mb-6 relative text-sm md:text-base">
          <span className="relative inline-block">
            Creating clean, functional, and engaging digital experiences
            through thoughtful design and modern development techniques.
            <motion.span 
              className="absolute right-0 -bottom-2 w-full h-[2px] block"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: ANIMATION.duration.long, 
                delay: 1.2, 
                ease: ANIMATION.easing.crisp 
              }}
              style={{ background: 'var(--accent-secondary)', opacity: 0.3, transformOrigin: 'left' }}
            />
          </span>
        </div>
        
        {/* Buttons */}
        <ButtonGroup 
          showCVDropdown={showCVDropdown} 
          setShowCVDropdown={setShowCVDropdown} 
          handleCVDownload={handleCVDownload}
          isMobile={isMobile}
        />
        
        {/* Tech Keywords - on desktop, inside the motion container */}
        {!isMobile && (
          <TechKeywords className="mt-8" />
        )}
      </SwissMotion>

      {/* Tech Keywords - on mobile, outside the motion container */}
      {isMobile && <TechKeywords className="mt-4" />}
      
      {/* Mobile-only Visual */}
      {isMobile && MobileVisual}
    </div>
  );
});

export default HeroContent; 