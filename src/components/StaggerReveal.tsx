"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getOptimizedValue, staggerContainer, fadeIn } from "@/utils/animations";

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
  const shouldOptimize = isMobile && mobileOptimized;
  
  // Use centralized utility for optimized values
  const optimizedDuration = getOptimizedValue(duration, shouldOptimize, 0.8, 0.4);
  const optimizedDelay = getOptimizedValue(childDelay, shouldOptimize, 0.7);
  const optimizedStaggerDelay = getOptimizedValue(staggerDelay, shouldOptimize, 0.6, 0.05);
  const optimizedThreshold = getOptimizedValue(threshold, shouldOptimize, 1, 0.05);
  const optimizedDistance = getOptimizedValue(distance, shouldOptimize, 1, 0.05);
  
  const isInView = useInView(ref, { amount: optimizedThreshold, once });

  // Use centralized stagger container variant
  const containerVariants = staggerContainer(optimizedStaggerDelay, optimizedDelay, shouldOptimize);

  // Use the fadeIn utility for child variants
  const getItemVariants = (): Variants => {
    if (direction === "none") {
      // For "none" direction, use a simple fade-in with scale
      return {
        hidden: { 
          opacity: 0, 
          scale: shouldOptimize ? 1 : 0.95 
        },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: shouldOptimize ? 200 : 260,
            damping: shouldOptimize ? 25 : 20,
            duration: optimizedDuration,
          }
        }
      };
    }
    
    // For directional animations, use the fadeIn utility with optimized distance
    const fadeInVariant = fadeIn(direction, 0, optimizedDuration, shouldOptimize, optimizedDistance);
    
    // Rename the variants to match our stagger container
    return {
      hidden: fadeInVariant.hidden,
      visible: fadeInVariant.visible
    };
  };
  
  const childVariants = getItemVariants();
  
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