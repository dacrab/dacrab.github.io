"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import ShapeAnimation from "../../ShapeAnimation";
import { ANIMATION } from "../constants";

/**
 * Floating animated elements with Swiss design aesthetic
 */
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

export default FloatingElements; 