"use client";

import React, { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

// Swiss-style animation curves
const EASE = {
  precision: [0.17, 0.67, 0.83, 0.67],
  simplified: [0.2, 0.5, 0.8, 1]
};

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  style?: React.CSSProperties;
  viewport?: { amount?: number; once?: boolean };
  mobileOptimized?: boolean;
  disableOnMobile?: boolean;
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
  mobileOptimized = true,
  disableOnMobile = false
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  
  // Calculate optimized values
  const optimized = {
    threshold: isMobile && mobileOptimized ? Math.min(threshold * 0.6, 0.1) : threshold,
    distance: isMobile && mobileOptimized ? Math.min(distance * 0.5, 20) : distance,
    duration: isMobile && mobileOptimized ? Math.min(duration * 0.7, 0.4) : duration,
    delay: isMobile && mobileOptimized ? delay * 0.5 : delay,
    direction: isMobile && mobileOptimized && (direction === "left" || direction === "right") ? "up" : direction,
    ease: isMobile ? EASE.simplified : EASE.precision
  };
  
  // Initialize isInView hook
  const isInView = useInView(ref, {
    amount: viewport?.amount || optimized.threshold,
    once: viewport?.once || once
  });

  // Check for low-end device
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    
    const hasLowCores = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;
    const nav = navigator as NavigatorWithMemory;
    const hasLowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    setIsLowEndDevice(hasLowCores || hasLowMemory);
  }, []);

  // Skip animation for low-end or mobile devices when configured
  if ((isMobile && disableOnMobile) || (isMobile && isLowEndDevice)) {
    return <div className={className} style={style}>{children}</div>;
  }

  // Generate animation properties based on direction
  const getMotionProps = () => {
    // Simple fade animation
    if (optimized.direction === "none") {
      return {
        initial: { opacity: 0 },
        animate: { opacity: isInView ? 1 : 0 },
        transition: { 
          duration: optimized.duration, 
          delay: optimized.delay,
          ease: optimized.ease
        }
      };
    }

    // Directional animation
    const axis = optimized.direction === "left" || optimized.direction === "right" ? "x" : "y";
    const sign = optimized.direction === "right" || optimized.direction === "up" ? 1 : -1;
    
    const initial = { opacity: 0, [axis]: optimized.distance * sign };
    const animate = { opacity: isInView ? 1 : 0, [axis]: isInView ? 0 : optimized.distance * sign };
    
    return {
      initial,
      animate,
      transition: { 
        duration: optimized.duration, 
        delay: optimized.delay,
        ease: optimized.ease
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
        willChange: isMobile ? "auto" : (optimized.direction !== "none" ? "transform, opacity" : "opacity")
      }}
    >
      {children}
    </motion.div>
  );
}