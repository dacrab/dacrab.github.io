"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  color?: string;
  size?: number;
  showPercentage?: boolean;
  position?: "top" | "bottom";
  showArrow?: boolean;
}

export default function ScrollProgress({
  color = "accent",
  size = 4,
  showPercentage = false,
  position = "top",
  showArrow = false,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(v => {
      setScrollPercentage(Math.round(v * 100));
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className={`fixed left-0 right-0 z-50 ${position === "top" ? "top-0" : "bottom-0"}`}
        style={{
          height: size,
          scaleX,
          transformOrigin: "left",
          backgroundColor: `var(--${color})`,
        }}
      />
      
      {/* Percentage display */}
      {showPercentage && (
        <motion.div
          className={`fixed ${position === "top" ? "top-4" : "bottom-4"} right-4 bg-card/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs z-50 font-medium`}
          initial={{ opacity: 0, y: position === "top" ? -20 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-1.5">
            {showArrow && (
              <motion.div
                animate={{ 
                  y: [0, scrollPercentage < 100 ? -3 : 0, 0],
                  opacity: scrollPercentage < 100 ? [1, 1, 0.5] : 1,
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: scrollPercentage < 100 ? Infinity : 0,
                  repeatType: "loop",
                }}
                className={scrollPercentage < 100 ? "text-accent" : "text-green-500"}
              >
                {scrollPercentage < 100 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.div>
            )}
            <span className={scrollPercentage === 100 ? "text-green-500" : ""}>{scrollPercentage}%</span>
          </div>
        </motion.div>
      )}
    </>
  );
} 