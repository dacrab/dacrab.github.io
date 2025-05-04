"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ANIMATION } from "../constants";

/**
 * Animated geometric shapes with Swiss design aesthetic
 */
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

export default GeometricShapes; 