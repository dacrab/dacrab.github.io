"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { GRID_POINTS } from "../constants";
import { ANIMATION } from "../constants";

/**
 * Animated grid intersection points with Swiss design aesthetic
 */
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

export default GridIntersections; 