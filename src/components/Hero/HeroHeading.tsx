"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import TextAnimation from "../TextAnimation";
import ShapeAnimation from "../ShapeAnimation";
import { HeroHeadingProps } from "./types";
import { ANIMATION } from "./constants";

/**
 * Animated heading with Swiss design aesthetic
 */
const HeroHeading = memo(function HeroHeading({ isMobile }: HeroHeadingProps) {
  // Use smaller text and fewer animations on mobile
  const textClass = isMobile 
    ? "text-3xl sm:text-4xl font-bold mb-4" 
    : "swiss-heading-1 mt-3 mb-4 relative";
  
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

export default HeroHeading; 