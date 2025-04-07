"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  threshold?: number;
  once?: boolean;
  childClassName?: string;
  style?: React.CSSProperties;
  mobileOptimized?: boolean; // Allow disabling optimization
}

/**
 * StaggerReveal component to animate children with a staggered timing
 * 
 * This is perfect for animating lists, grids, and any groups of items
 * where you want them to appear one after another for a beautiful cascading effect.
 */
export default function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  childDelay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
  threshold = 0.1,
  once = true,
  childClassName = "",
  style = {},
  mobileOptimized = true,
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  
  // Mobile optimizations
  const optimizedDistance = mobileOptimized && isMobile ? Math.min(distance * 0.6, 20) : distance;
  const optimizedDuration = mobileOptimized && isMobile ? Math.min(duration * 0.8, 0.4) : duration;
  const optimizedDelay = mobileOptimized && isMobile ? Math.min(childDelay * 0.7, childDelay) : childDelay;
  const optimizedStaggerDelay = mobileOptimized && isMobile ? Math.min(staggerDelay * 0.6, 0.05) : staggerDelay;
  const optimizedThreshold = mobileOptimized && isMobile ? Math.min(threshold, 0.05) : threshold;
  
  const isInView = useInView(ref, { amount: optimizedThreshold, once });

  // Container variants for parent
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: optimizedStaggerDelay,
        delayChildren: optimizedDelay,
      },
    },
  };

  // Child variants for individual items
  const childVariants: Variants = {
    hidden: (() => {
      // Simpler animations for mobile
      if (mobileOptimized && isMobile) {
        switch (direction) {
          case "up": return { opacity: 0, y: optimizedDistance };
          case "down": return { opacity: 0, y: -optimizedDistance };
          case "left": return { opacity: 0, x: -optimizedDistance };
          case "right": return { opacity: 0, x: optimizedDistance };
          case "none": return { opacity: 0 };
          default: return { opacity: 0, y: optimizedDistance };
        }
      }
      
      // Regular animations for desktop
      switch (direction) {
        case "up": return { opacity: 0, y: optimizedDistance };
        case "down": return { opacity: 0, y: -optimizedDistance };
        case "left": return { opacity: 0, x: -optimizedDistance };
        case "right": return { opacity: 0, x: optimizedDistance };
        case "none": return { opacity: 0, scale: 0.95 };
        default: return { opacity: 0, y: optimizedDistance };
      }
    })(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 260, // Less bouncy on mobile
        damping: isMobile ? 25 : 20,     // More damping on mobile
        duration: optimizedDuration,
      },
    },
  };
  
  // Determine the appropriate will-change property based on direction
  const getWillChange = (): string => {
    if (direction === "none") return "opacity";
    if (direction === "up" || direction === "down") return "transform, opacity";
    if (direction === "left" || direction === "right") return "transform, opacity";
    return "opacity";
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        ...style,
        willChange: "opacity"
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div 
          className={childClassName} 
          variants={childVariants}
          style={{ willChange: getWillChange() }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}