"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import SwissMotion from "../SwissMotion";

/**
 * Animated scroll indicator with Swiss design aesthetic
 */
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

export default ScrollIndicator; 