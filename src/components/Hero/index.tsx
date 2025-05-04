"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import BackgroundElements from "./BackgroundElements";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import ScrollIndicator from "./ScrollIndicator";
import { handleCVDownload as downloadCV } from "./utils";

/**
 * Main Hero component for the portfolio landing section
 * Uses Swiss design principles with responsive behavior
 */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showCVDropdown, setShowCVDropdown] = useState(false);
  const isMobile = useIsMobile();
  
  // Parallax scrolling effect - reduced effect on mobile
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    isMobile ? ["0%", "20%"] : ["0%", "50%"]
  );
  
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
      className="relative min-h-[calc(100vh-82px)] max-h-[1000px] pt-12 sm:pt-16 overflow-hidden flex flex-col"
    >
      {/* Background Elements - with mobile optimization */}
      <BackgroundElements isMobile={isMobile} />
      
      <motion.div
        className="swiss-container flex-1 flex flex-col"
        style={{ y }}
      >
        <div className={`flex flex-col md:grid md:swiss-grid flex-1 ${isMobile ? 'mt-12' : 'mt-4 md:mt-24'}`}>
          {/* Left Hero Content */}
          <HeroContent 
            showCVDropdown={showCVDropdown} 
            setShowCVDropdown={setShowCVDropdown} 
            handleCVDownload={downloadCV}
            isMobile={isMobile}
          />
          
          {/* Right Hero Visual - only on desktop */}
          {!isMobile && <HeroVisual />}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </div>
  );
} 