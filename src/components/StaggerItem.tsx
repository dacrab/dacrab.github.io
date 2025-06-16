"use client";

import { ReactNode, useState, useEffect } from "react";
import { motion, Variants, TargetAndTransition } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

// Define interface for Navigator with deviceMemory property
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

type CubicBezier = [number, number, number, number];

// Swiss-style animation curves
const EASE: {
  precision: CubicBezier;
  sharp: CubicBezier;
} = {
  precision: [0.19, 1, 0.22, 1],
  sharp: [0.17, 0.67, 0.83, 0.67],
};

type AnimationType = "fade" | "slide" | "scale" | "rotate" | "reveal";
type Direction = "up" | "down" | "left" | "right";
type HoverEffect = "lift" | "glow" | "scale" | "rotate" | "none";
type TapEffect = "press" | "none";

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
  type?: AnimationType;
  direction?: Direction;
  delay?: number;
  duration?: number;
  whileHover?: HoverEffect;
  whileTap?: TapEffect;
  disableOnMobile?: boolean;
  mobileOptimized?: boolean;
}

export default function StaggerItem({
  children,
  className = "",
  type = "fade",
  direction = "up",
  delay = 0,
  duration = 0.5,
  whileHover = "none",
  whileTap = "none",
  disableOnMobile = false,
  mobileOptimized = true
}: StaggerItemProps) {
  const isMobile = useIsMobile();
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  
  // Check for low-end device on mount
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    
    const hasLowCores = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;
    const nav = navigator as NavigatorWithMemory;
    const hasLowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    setIsLowEndDevice(hasLowCores || hasLowMemory);
  }, []);
  
  // Skip animation for low-end or mobile devices when configured
  if ((isMobile && disableOnMobile) || (isMobile && isLowEndDevice)) {
    return <div className={className}>{children}</div>;
  }
  
  // Mobile optimizations
  const optimized = {
    duration: isMobile && mobileOptimized ? duration * 0.6 : duration,
    delay: isMobile && mobileOptimized ? delay * 0.5 : delay,
    type: isMobile && mobileOptimized && (type === "rotate" || type === "reveal") ? "fade" : type,
    direction: isMobile && mobileOptimized && (direction === "left" || direction === "right") ? "up" : direction,
    offset: isMobile ? 10 : 20,
    scale: isMobile ? 0.95 : 0.9,
    rotate: isMobile ? -1 : -3
  };
  
  // Animation variants based on type and direction
  const getVariants = (): Variants => {
    const baseTransition = { 
      duration: optimized.duration, 
      delay: optimized.delay,
      ease: optimized.type === "slide" ? EASE.precision : EASE.sharp
    };

    // Slide animation initial states
    const slideStates = {
      up: { opacity: 0, y: optimized.offset },
      down: { opacity: 0, y: -optimized.offset },
      left: { opacity: 0, x: optimized.offset },
      right: { opacity: 0, x: -optimized.offset }
    };

    // Define animation variants by type
    const variants: Record<AnimationType, Variants> = {
      fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: baseTransition }
      },
      scale: {
        hidden: { opacity: 0, scale: optimized.scale },
        visible: { opacity: 1, scale: 1, transition: baseTransition }
      },
      rotate: {
        hidden: { opacity: 0, rotate: optimized.rotate },
        visible: { opacity: 1, rotate: 0, transition: baseTransition }
      },
      reveal: {
        hidden: { clipPath: "inset(0 100% 0 0)" },
        visible: { clipPath: "inset(0 0% 0 0)", transition: baseTransition }
      },
      slide: {
        hidden: slideStates[optimized.direction],
        visible: { opacity: 1, x: 0, y: 0, transition: baseTransition }
      }
    };

    return variants[optimized.type];
  };
  
  // Hover and tap effects
  const hoverEffects: Record<HoverEffect, TargetAndTransition> = {
    lift: { y: isMobile ? -4 : -8, transition: { duration: 0.3, ease: "easeOut" } },
    glow: { boxShadow: "0 0 10px 2px rgba(var(--accent-rgb), 0.3)", transition: { duration: 0.3 } },
    scale: { scale: isMobile ? 1.02 : 1.03, transition: { duration: 0.3, ease: "easeOut" } },
    rotate: { rotate: isMobile ? 0.5 : 1, transition: { duration: 0.3, ease: "easeOut" } },
    none: {}
  };

  const tapEffects: Record<TapEffect, TargetAndTransition> = {
    press: { scale: 0.98, transition: { duration: 0.1 } },
    none: {}
  };

  // Simplify hover effects on mobile
  const effectiveHover = isMobile ? 
    (whileHover === "rotate" ? "none" : whileHover === "lift" ? "scale" : whileHover) : 
    whileHover;

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      initial="hidden"
      animate="visible"
      whileHover={hoverEffects[effectiveHover]}
      whileTap={tapEffects[whileTap]}
      style={{ willChange: isMobile ? "auto" : "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}