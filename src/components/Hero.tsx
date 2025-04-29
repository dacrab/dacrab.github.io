"use client";

import { useRef, useEffect, useState, memo, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";
import TextAnimation from "./TextAnimation";
import { useIsMobile } from "@/hooks/useIsMobile";

// Types
interface BackgroundElementsProps {
  isMobile: boolean;
}

interface HeroContentProps {
  showCVDropdown: boolean;
  setShowCVDropdown: (show: boolean) => void;
  handleCVDownload: (lang: string) => void;
  isMobile: boolean;
}

interface ButtonGroupProps {
  showCVDropdown: boolean;
  setShowCVDropdown: (show: boolean) => void;
  handleCVDownload: (lang: string) => void;
  isMobile: boolean;
}

interface TechKeywordsProps {
  className?: string;
}

interface HeroHeadingProps {
  isMobile: boolean;
}

// Animation constants
const ANIMATION = {
  easing: {
    explosive: [0, 0.9, 0.1, 1], // Extremely sharp, explosive curve
    crisp: [0.12, 0.8, 0.88, 0.58], // More explosive Swiss-style precision curve
    smooth: [0.1, 0.9, 0.1, 1], // Smooth curve
  },
  duration: {
    short: 0.5,
    medium: 0.8,
    long: 1.2,
    fast: 0.2,
  },
  delay: {
    stagger: 0.2,
  }
};

// Tech keywords array for easy modification
const TECH_KEYWORDS = ["REACT", "NEXTJS", "TYPESCRIPT", "NODEJS", "AWS"];

// Grid intersection points data
const GRID_POINTS = [
  { top: "1/4", left: "1/4", color: "var(--accent)", delay: 2.2 },
  { top: "1/4", left: "2/4", color: "var(--accent-secondary)", delay: 2.3 },
  { top: "1/4", left: "3/4", color: "var(--accent-tertiary)", delay: 2.4 },
  { top: "2/4", left: "1/4", color: "var(--accent-tertiary)", delay: 2.5 },
  { top: "2/4", left: "2/4", color: "var(--accent)", delay: 2.6 },
  { top: "2/4", left: "3/4", color: "var(--accent-secondary)", delay: 2.7 },
  { top: "3/4", left: "1/4", color: "var(--accent-secondary)", delay: 2.8 },
  { top: "3/4", left: "2/4", color: "var(--accent-tertiary)", delay: 2.9 },
  { top: "3/4", left: "3/4", color: "var(--accent)", delay: 3.0 }
];

// Helper function for smooth scrolling
const smoothScroll = (elementId: string) => {
  document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
};

// Main Hero component
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
      className="relative min-h-[calc(100vh-82px)] max-h-[1000px] pt-12 sm:pt-16 overflow-hidden flex flex-col"
    >
      {/* Background Elements - conditionally render fewer elements on mobile */}
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
            handleCVDownload={handleCVDownload}
            isMobile={isMobile}
          />
          
          {/* Right Hero Visual - conditionally render on mobile */}
          {!isMobile && <HeroVisual />}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </div>
  );
}

// Background elements component
const BackgroundElements = memo(function BackgroundElements({ isMobile }: BackgroundElementsProps) {
  // Render fewer and simpler elements on mobile
  if (isMobile) {
    return (
      <>
        <SwissMotion
          type="reveal"
          delay={0.3}
          duration={0.8}
          className="absolute top-16 right-0 w-1/3 h-1/3 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-[200%] h-[2px] bg-[var(--accent)] origin-top-left rotate-45 transform -translate-x-1/4"></div>
        </SwissMotion>

        <ParallaxLayer speed={0.3} direction="up" className="absolute bottom-16 left-0 -z-10">
          <ShapeAnimation 
            type="square" 
            color="var(--accent-secondary)" 
            size={80} 
            variant="float"
            delay={0.5}
            duration={1.8}
            loop={true}
          />
        </ParallaxLayer>
        
        <ParallaxLayer speed={0.25} direction="left" className="absolute top-24 left-1/4 -z-10">
          <ShapeAnimation 
            type="triangle" 
            color="var(--accent)" 
            size={40} 
            variant="rotate"
            delay={0.3}
            duration={2.5}
            loop={true}
          />
        </ParallaxLayer>
        
        <ParallaxLayer speed={0.35} direction="right" className="absolute top-32 right-8 -z-10">
          <ShapeAnimation 
            type="circle" 
            color="var(--accent-tertiary)" 
            size={60} 
            variant="pulse"
            delay={0.7}
            duration={2.0}
            loop={true}
          />
        </ParallaxLayer>

        <ParallaxLayer speed={0.4} direction="right" className="absolute bottom-40 right-5 -z-10">
          <ShapeAnimation 
            type="diagonal" 
            color="var(--accent-secondary)" 
            size={50} 
            variant="draw"
            delay={0.9}
            duration={1.0}
            loop={true}
          />
        </ParallaxLayer>
      </>
    );
  }

  return (
    <>
      {/* Animated Swiss-style diagonal line */}
      <SwissMotion
        type="reveal"
        delay={0.3}
        duration={1.2}
        className="absolute top-0 right-0 w-1/2 h-1/2 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-[var(--accent)] origin-top-left rotate-45 transform -translate-x-1/4"></div>
      </SwissMotion>

      {/* Dynamic accent shapes */}
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
      
      {/* Additional energetic shapes */}
      <ParallaxLayer speed={0.15} direction="left" className="absolute top-40 left-1/4 -z-10">
        <ShapeAnimation 
          type="triangle" 
          color="var(--accent)" 
          size={60} 
          variant="rotate"
          delay={0.3}
          duration={3}
          loop={true}
        />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.25} direction="right" className="absolute bottom-40 right-1/3 -z-10">
        <ShapeAnimation 
          type="diagonal" 
          color="var(--accent-secondary)" 
          size={80} 
          variant="draw"
          delay={0.9}
          duration={1.2}
          loop={true}
        />
      </ParallaxLayer>
    </>
  );
});

// Tech keywords component
const TechKeywords = memo(function TechKeywords({ className = "" }: TechKeywordsProps) {
  return (
    <SwissMotion 
      type="stagger"
      delay={1.2}
      staggerChildren={0.08}
      className={`flex flex-wrap gap-2 text-xs ${className}`}
    >
      {TECH_KEYWORDS.map((tech) => (
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
  );
});

// Left side hero content
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
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: ANIMATION.duration.long, 
                delay: 1.2, 
                ease: ANIMATION.easing.crisp 
              }}
              style={{ background: 'var(--accent-secondary)', opacity: 0.3 }}
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
        
        {/* Tech Keywords - moved inside the motion container on desktop */}
        {!isMobile && (
          <TechKeywords className="mt-8" />
        )}
      </SwissMotion>

      {/* Tech Keywords - only on mobile, outside the motion container */}
      {isMobile && <TechKeywords className="mt-4" />}
      
      {/* Mobile-only Visual */}
      {isMobile && MobileVisual}
    </div>
  );
});

// Hero heading with animated elements
const HeroHeading = memo(function HeroHeading({ isMobile }: HeroHeadingProps) {
  // Smaller text and fewer animations on mobile
  const textClass = isMobile ? "text-3xl sm:text-4xl font-bold mb-4" : "swiss-heading-1 mt-3 mb-4 relative";
  
  return (
    <h1 className={textClass}>
      <div className="relative inline-block">
        <TextAnimation text="MODERN" variant="reveal" delay={0.3} />
        {!isMobile && (
          <motion.div 
            className="absolute -right-4 top-1/2 w-8 h-8"
            animate={{ 
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: ANIMATION.easing.crisp 
            }}
          >
            <ShapeAnimation 
              type="cross" 
              color="var(--accent)" 
              size={24} 
              variant="draw"
              loop={true}
            />
          </motion.div>
        )}
      </div>
      <br />
      <div className="relative inline-block">
        <TextAnimation text="WEB" variant="reveal" delay={0.5} />
        {!isMobile && (
          <motion.div 
            className="absolute -left-2 top-1/2 w-6 h-6"
            animate={{ 
              y: [-5, 5, -5],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ShapeAnimation 
              type="circle" 
              color="var(--accent-tertiary)" 
              size={12} 
              variant="pulse"
              loop={true}
            />
          </motion.div>
        )}
      </div>
      <br />
      <div className="relative inline-block">
        <TextAnimation text="SOLUTIONS" variant="reveal" delay={0.7} />
        {!isMobile && (
          <motion.div 
            className="absolute -right-2 bottom-1/4 w-10 h-10"
            animate={{ 
              rotate: [0, 45, 0, -45, 0],
              scale: [1, 0.9, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: ANIMATION.easing.explosive 
            }}
          >
            <ShapeAnimation 
              type="square" 
              color="var(--accent-secondary)" 
              size={16} 
              variant="rotate"
              loop={true}
            />
          </motion.div>
        )}
      </div>
    </h1>
  );
});

// Button group with dropdown
const ButtonGroup = memo(function ButtonGroup({ 
  showCVDropdown, 
  setShowCVDropdown, 
  handleCVDownload,
  isMobile
}: ButtonGroupProps) {
  const buttonSize = isMobile ? "text-xs" : "text-sm";
  
  // Handler to view projects section
  const handleViewProjects = () => smoothScroll('projects');
  
  // Handler for CV button click
  const handleCVButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCVDropdown(!showCVDropdown);
  };
  
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      <SwissMotion type="fade" delay={0.9} whileHover="lift" whileTap="press">
        <button 
          className={`swiss-button ${buttonSize}`}
          onClick={handleViewProjects}
        >
          VIEW PROJECTS
        </button>
      </SwissMotion>
      
      <div className="relative">
        <SwissMotion type="fade" delay={1.1} whileHover="lift" whileTap="press">
          <button
            className={`swiss-button-outline ${buttonSize}`}
            onClick={handleCVButtonClick}
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
  );
});

// Right side visual component
const HeroVisual = memo(function HeroVisual() {
  return (
    <div className="swiss-asymmetric-right flex items-center justify-center relative">
      <SwissMotion
        type="scale"
        delay={0.5}
        duration={ANIMATION.duration.medium}
        className="relative"
      >
        {/* Swiss style grid pattern */}
        <div className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 swiss-grid-pattern relative">
          {/* Accent shapes for Swiss style */}
          <AccentBorders />
          
          {/* Dynamic Swiss-style visual elements */}
          <GridCanvas />
        </div>
      </SwissMotion>
    </div>
  );
});

// Accent borders for the visual grid
const AccentBorders = memo(function AccentBorders() {
  return (
    <>
      <SwissMotion type="reveal" delay={0.6} duration={0.4}>
        <div className="absolute left-0 top-0 w-full h-2 bg-[var(--accent)]"></div>
      </SwissMotion>
      <SwissMotion type="reveal" delay={0.8} duration={0.4}>
        <div className="absolute right-0 top-0 w-2 h-full bg-[var(--accent-secondary)]"></div>
      </SwissMotion>
      <SwissMotion type="fade" delay={1.2} duration={0.5}>
        <div className="absolute right-1/3 bottom-1/3 w-1/4 h-1/4 bg-[var(--accent-tertiary)]"></div>
      </SwissMotion>
    </>
  );
});

// Grid lines animation
const GridLines = memo(function GridLines() {
  return (
    <>
      {/* Horizontal grid lines */}
      {[1, 2, 3].map((index) => (
        <motion.div 
          key={`h-line-${index}`}
          className={`absolute top-${index}/4 left-0 w-full h-[1px] bg-[var(--foreground)] opacity-20`}
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: [0, index === 2 ? 0.8 : 1.1, index === 3 ? 0.9 : 1, index === 1 ? 0.95 : 1],
            opacity: [0, 0.2, index === 2 ? 0.3 : 0.2, 0.2]
          }}
          transition={{ 
            duration: ANIMATION.duration.long + (index * 0.2), 
            delay: 1.5 + (index * 0.1), 
            ease: ANIMATION.easing.crisp,
            times: index === 2 ? [0, 0.3, 0.6, 1] : [0, 0.4, 0.7, 1]
          }}
        />
      ))}
      
      {/* Vertical grid lines */}
      {[1, 2, 3].map((index) => (
        <motion.div 
          key={`v-line-${index}`}
          className={`absolute top-0 left-${index}/4 w-[1px] h-full bg-[var(--foreground)] opacity-20`}
          initial={{ scaleY: 0 }}
          animate={{ 
            scaleY: [0, index === 1 ? 1.05 : 0.9, index === 3 ? 1.1 : 0.95, 1],
            opacity: [0, index === 2 ? 0.25 : 0.2, index === 1 ? 0.3 : 0.15, 0.2] 
          }}
          transition={{ 
            duration: ANIMATION.duration.long + (index * 0.2), 
            delay: 1.8 + (index * 0.1), 
            ease: ANIMATION.easing.crisp,
            times: index === 2 ? [0, 0.4, 0.7, 1] : [0, 0.3, 0.6, 1]
          }}
        />
      ))}
    </>
  );
});

// Grid intersections animation
const GridIntersections = memo(function GridIntersections() {
  return (
    <>
      {GRID_POINTS.map((point, index) => (
        <motion.div 
          key={index}
          className={`absolute top-${point.top} left-${point.left} w-1.5 h-1.5 rounded-full -translate-x-[3px] -translate-y-[3px]`}
          style={{ backgroundColor: point.color }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.5, 0.8, 1.2, 1],
            opacity: [0, 0.9, 0.6, 0.8, 0.7] 
          }}
          transition={{ 
            duration: 0.7, 
            delay: point.delay,
            ease: ANIMATION.easing.explosive,
            times: [0, 0.3, 0.5, 0.8, 1]
          }}
        />
      ))}
    </>
  );
});

// Geometric shapes animation
const GeometricShapes = memo(function GeometricShapes() {
  return (
    <>
      <motion.div
        className="absolute top-1/4 left-1/4 w-1/4 h-1/4 border border-[var(--accent)] bg-[var(--background)] opacity-90"
        initial={{ scale: 0, rotate: -15 }}
        animate={{ 
          scale: [0, 1.2, 0.9, 1.05, 1],
          rotate: [-15, 5, -5, 0],
          x: [10, -5, 2, 0],
          y: [-5, 8, -2, 0]
        }}
        transition={{ 
          duration: 1.2, 
          delay: 2.1, 
          ease: ANIMATION.easing.explosive,
          times: [0, 0.4, 0.7, 0.9, 1]
        }}
      />
      <motion.div
        className="absolute top-2/4 left-2/4 w-1/4 h-1/4 bg-[var(--accent-secondary)] opacity-25"
        initial={{ scale: 0, rotate: 15 }}
        animate={{ 
          scale: [0, 0.8, 1.1, 0.95, 1],
          rotate: [15, -8, 5, 0],
          x: [-15, 8, -3, 0],
          y: [8, -10, 4, 0]
        }}
        transition={{ 
          duration: 1.3, 
          delay: 2.2, 
          ease: ANIMATION.easing.explosive,
          times: [0, 0.3, 0.6, 0.8, 1]
        }}
      />
      <motion.div
        className="absolute top-1/4 left-2/4 w-8 h-8 bg-[var(--accent)] opacity-40"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.3, 0.7, 1.1, 1],
          rotate: [0, 30, -15, 5, 0]
        }}
        transition={{ 
          duration: 1.4, 
          delay: 2.3, 
          ease: ANIMATION.easing.explosive,
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
      />
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-[var(--accent-tertiary)]"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: [0, 1.2, 0.9, 1],
          opacity: [0, 0.8, 0.6, 0.7]
        }}
        transition={{ 
          duration: 1.2, 
          delay: 2.7, 
          ease: ANIMATION.easing.explosive,
          times: [0, 0.4, 0.7, 1]
        }}
      />
    </>
  );
});

// Typography elements animation
const TypographyElements = memo(function TypographyElements() {
  return (
    <>
      <motion.div 
        className="absolute top-3/4 left-3/4 flex flex-col items-end"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 0.8, delay: 2.5, ease: ANIMATION.easing.crisp }}
      >
        <motion.div 
          className="text-xs font-bold tracking-widest uppercase"
          animate={{ 
            opacity: [0.7, 1, 0.7],
            y: [0, -3, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: "mirror",
            ease: "easeInOut" 
          }}
        >
          Design
        </motion.div>
        <motion.div 
          className="w-8 h-[2px] mt-1 bg-[var(--accent)]"
          initial={{ width: 0 }}
          animate={{ 
            width: [0, 40, 30, 32],
            scaleX: [1, 1.1, 0.95, 1] 
          }}
          transition={{ 
            duration: 1, 
            delay: 0.2,
            ease: ANIMATION.easing.explosive,
            times: [0, 0.4, 0.7, 1]
          }}
        />
      </motion.div>
      
      <motion.div 
        className="absolute top-8 left-8 flex flex-col items-start"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 0.8, delay: 2.6, ease: ANIMATION.easing.crisp }}
      >
        <motion.div 
          className="text-xs font-bold tracking-widest uppercase"
          animate={{ 
            opacity: [0.7, 1, 0.7],
            y: [0, 3, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            repeatType: "mirror", 
            delay: 1,
            ease: "easeInOut"
          }}
        >
          Code
        </motion.div>
        <motion.div 
          className="w-8 h-[2px] mt-1 bg-[var(--accent-secondary)]"
          initial={{ width: 0 }}
          animate={{ 
            width: [0, 35, 25, 32],
            scaleX: [1, 0.9, 1.05, 1] 
          }}
          transition={{ 
            duration: 1, 
            delay: 0.2,
            ease: ANIMATION.easing.explosive,
            times: [0, 0.3, 0.6, 1]
          }}
        />
      </motion.div>
    </>
  );
});

// Floating elements animation
const FloatingElements = memo(function FloatingElements() {
  return (
    <>
      <motion.div
        className="absolute right-10 top-10 w-8 h-8"
        animate={{ 
          y: [-5, 5, -5],
          rotate: [0, 45, 0],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ 
          duration: ANIMATION.duration.long * 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <ShapeAnimation
          type="diagonal"
          color="var(--accent)"
          size={32}
          variant="float"
          loop={true}
        />
      </motion.div>
      
      <motion.div
        className="absolute left-12 bottom-12 w-6 h-6"
        animate={{ 
          x: [-3, 3, -3],
          rotate: [0, -30, 0],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{ 
          duration: ANIMATION.duration.long * 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        <ShapeAnimation
          type="circle"
          color="var(--accent-secondary)"
          size={24}
          variant="pulse"
          loop={true}
        />
      </motion.div>
    </>
  );
});

// Grid canvas with all the dynamic elements
const GridCanvas = memo(function GridCanvas() {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
    >
      {/* Central geometric composition */}
      <div className="relative w-4/5 h-4/5">
        {/* Animated grid lines */}
        <GridLines />
        
        {/* Animated grid intersections */}
        <GridIntersections />
        
        {/* Geometric shapes */}
        <GeometricShapes />
        
        {/* Typography elements */}
        <TypographyElements />
        
        {/* Floating elements */}
        <FloatingElements />
      </div>
    </motion.div>
  );
});

// Scroll indicator component
const ScrollIndicator = memo(function ScrollIndicator() {
  return (
    <SwissMotion
      type="fade" 
      delay={1.5}
      duration={0.5}
      className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
    >
      <p className="text-xs uppercase tracking-widest mb-2">Scroll Down</p>
      <motion.div 
        className="h-8 w-[1px] bg-[var(--foreground)]"
        animate={{ 
          scaleY: [0.3, 1, 0.3],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"  
        }}
      />
    </SwissMotion>
  );
});