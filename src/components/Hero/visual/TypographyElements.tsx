"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ANIMATION } from "../constants";

/**
 * Animated typography elements with Swiss design aesthetic
 */
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

export default TypographyElements; 