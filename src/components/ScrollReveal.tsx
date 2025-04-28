"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  style?: React.CSSProperties;
  viewport?: { amount?: number; once?: boolean };
  mobileOptimized?: boolean;
}

export default function ScrollReveal({
  children,
  direction = "up",
  className = "",
  distance = 50,
  duration = 0.8,
  delay = 0,
  threshold = 0.2,
  once = true,
  style = {},
  viewport,
  mobileOptimized = true
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isMobile = useIsMobile();

  // Optimize values for mobile if needed
  const optimizedDistance = isMobile && mobileOptimized ? Math.min(distance * 0.7, 30) : distance;
  const optimizedDuration = isMobile && mobileOptimized ? Math.min(duration * 0.8, 0.5) : duration;
  const optimizedDelay = isMobile && mobileOptimized ? delay * 0.7 : delay;
  const optimizedThreshold = isMobile && mobileOptimized ? Math.min(threshold * 0.8, 0.15) : threshold;

  const isInView = useInView(ref, {
    amount: viewport?.amount ?? optimizedThreshold,
    once: viewport?.once ?? once
  });

  // Animation props based on direction - Swiss style with clean motion
  const getMotionProps = () => {
    if (direction === "none") {
      return {
        initial: { opacity: 0 },
        animate: { opacity: isInView ? 1 : 0 },
        transition: { 
          duration: optimizedDuration, 
          delay: optimizedDelay,
          ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style precision animation
        }
      };
    }

    const axis = direction === "left" || direction === "right" ? "x" : "y";
    const sign = direction === "right" || direction === "up" ? 1 : -1;
    
    // Define with correct typing that includes x and y properties
    const initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };
    initial[axis] = optimizedDistance * sign;
    
    const animate: { opacity: number; x?: number; y?: number } = { opacity: isInView ? 1 : 0 };
    animate[axis] = isInView ? 0 : optimizedDistance * sign;
    
    return {
      initial,
      animate,
      transition: { 
        duration: optimizedDuration, 
        delay: optimizedDelay,
        ease: [0.25, 0.1, 0.25, 1] // Swiss-style clean motion
      }
    };
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      {...getMotionProps()}
      style={{
        ...style,
        willChange: direction !== "none" ? "transform, opacity" : "opacity"
      }}
    >
      {children}
    </motion.div>
  );
}