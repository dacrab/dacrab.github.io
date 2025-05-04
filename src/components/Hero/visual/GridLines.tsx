"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ANIMATION } from "../constants";

/**
 * Animated grid lines with Swiss design aesthetic
 */
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

export default GridLines; 