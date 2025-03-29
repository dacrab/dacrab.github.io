"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // -1 (reverse) to 1 (normal), 0 = static
  direction?: "vertical" | "horizontal";
  offset?: string | number; // CSS value for offset
  className?: string;
  zIndex?: number;
  startScale?: number;
  endScale?: number;
  startOpacity?: number;
  endOpacity?: number;
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  direction = "vertical",
  offset = 0,
  className = "",
  zIndex = 0,
  startScale = 1,
  endScale = 1,
  startOpacity = 1,
  endOpacity = 1,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Transform values based on scroll position and speed
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical" ? [0, 100 * speed] : [0, 0]
  );
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "horizontal" ? [0, 100 * speed] : [0, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [startScale, endScale]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [startOpacity, endOpacity]
  );
  
  // Get the offset as a string with CSS units
  const getOffset = () => {
    if (typeof offset === "number") {
      return `${offset}px`;
    }
    return offset;
  };
  
  return (
    <motion.div
      ref={ref}
      className={`absolute ${className}`}
      style={{
        y,
        x,
        scale,
        opacity,
        zIndex,
        ...(direction === "vertical" 
          ? { top: getOffset(), left: 0, right: 0 }
          : { left: getOffset(), top: 0, bottom: 0 }),
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

// Simpler version for when you need multiple elements with same parallax behavior
export function useParallax(scrollYProgress: MotionValue<number>, speed: number = 0.5) {
  return useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);
} 