"use client";

import { ReactNode } from "react";
import { motion, MotionStyle, Variants, TargetAndTransition, VariantLabels } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export type SwissMotionType = 
  | "fade" 
  | "slide" 
  | "scale" 
  | "rotate" 
  | "stagger" 
  | "grid" 
  | "reveal" 
  | "parallax"
  | "pulse";

export type HoverEffect = "lift" | "glow" | "scale" | "rotate" | "none";
type TapEffect = "press" | "none";

interface GridLayoutProps {
  columns: number;
  rows: number;
  itemIndex: number;
}

interface SwissMotionProps {
  children: ReactNode;
  type?: SwissMotionType;
  delay?: number;
  duration?: number;
  style?: MotionStyle;
  className?: string;
  viewport?: { once?: boolean; margin?: string };
  staggerChildren?: number;
  staggerDirection?: 1 | -1;
  whileHover?: HoverEffect;
  whileTap?: TapEffect;
  gridLayout?: GridLayoutProps;
  disableOnMobile?: boolean;
  mobileOptimized?: boolean;
}

// Swiss style easing curves
const EASING = {
  precision: [0.17, 0.67, 0.83, 0.67],
  sharp: [0.19, 1, 0.22, 1],
  parallax: [0.08, 0.82, 0.17, 1]
};

// Mobile animation type mapping
const MOBILE_TYPE_MAP: Partial<Record<SwissMotionType, SwissMotionType>> = {
  parallax: "slide",
  grid: "stagger",
  rotate: "fade"
};

// Mobile hover effect mapping
const MOBILE_HOVER_MAP: Partial<Record<HoverEffect, HoverEffect>> = {
  lift: "scale",
  rotate: "none",
  glow: "scale"
};

export default function SwissMotion({
  children,
  type = "fade",
  delay = 0,
  duration = 0.5,
  style = {},
  className = "",
  viewport = { once: true, margin: "0px" },
  staggerChildren = 0.1,
  staggerDirection = 1,
  whileHover = "none",
  whileTap = "none",
  gridLayout,
  disableOnMobile = false,
  mobileOptimized = true
}: SwissMotionProps) {
  const isMobile = useIsMobile();
  
  // Handle mobile optimizations
  const shouldDisableAnimation = isMobile && disableOnMobile;
  
  // Apply mobile optimization factors
  const optimized = {
    duration: isMobile && mobileOptimized ? duration * 0.6 : duration,
    delay: isMobile && mobileOptimized ? delay * 0.5 : delay,
    staggerChildren: isMobile && mobileOptimized ? Math.min(staggerChildren * 0.5, 0.05) : staggerChildren
  };
  
  // Get effective animation type based on device
  const effectiveType = shouldDisableAnimation 
    ? "fade" 
    : (isMobile && mobileOptimized ? MOBILE_TYPE_MAP[type] || type : type);
  
  // Get effective hover effect for current device
  const effectiveHoverEffect = isMobile 
    ? MOBILE_HOVER_MAP[whileHover] || whileHover 
    : whileHover;

  // Swiss style animation variants
  const variants: Record<SwissMotionType, Variants> = {
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: optimized.duration, delay: optimized.delay, ease: EASING.precision }
      }
    },
    slide: {
      hidden: { opacity: 0, x: isMobile ? -20 : -40 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: optimized.duration, delay: optimized.delay, ease: EASING.sharp }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: optimized.duration, delay: optimized.delay, ease: EASING.precision }
      }
    },
    rotate: {
      hidden: { opacity: 0, rotate: isMobile ? -2 : -5 },
      visible: {
        opacity: 1,
        rotate: 0,
        transition: { duration: optimized.duration, delay: optimized.delay, ease: EASING.precision }
      }
    },
    stagger: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: optimized.staggerChildren,
          staggerDirection,
          delayChildren: optimized.delay
        }
      }
    },
    grid: {
      hidden: { opacity: 0, y: isMobile ? 10 : 20 },
      visible: customParams => {
        if (!customParams) {
          return { 
            opacity: 1, 
            y: 0,
            transition: { duration: optimized.duration, delay: optimized.delay, ease: EASING.sharp }
          };
        }
        
        const { columns = 3, rows = 3, itemIndex = 0 } = customParams;
        const col = itemIndex % columns;
        const row = Math.floor(itemIndex / columns) % rows;
        
        // Simplified wave effect for mobile
        if (isMobile && mobileOptimized) {
          return {
            opacity: 1,
            y: 0,
            transition: {
              duration: optimized.duration,
              delay: optimized.delay + (col + row) * 0.1,
              ease: EASING.sharp
            }
          };
        }
        
        // Full effect for desktop
        const startPosition = [0, 0.3, 0.6]; // Start positions for wave effect
        const staggerDelay = (startPosition[col % 3] + startPosition[row % 3]) * 0.2;
        
        return {
          opacity: 1,
          y: 0, 
          transition: {
            duration: optimized.duration, 
            delay: optimized.delay + staggerDelay,
            ease: EASING.sharp
          }
        };
      }
    },
    reveal: {
      hidden: { clipPath: "inset(0 100% 0 0)" },
      visible: {
        clipPath: "inset(0 0% 0 0)",
        transition: { duration: optimized.duration, delay: optimized.delay, ease: EASING.precision }
      }
    },
    parallax: {
      hidden: { opacity: 0, y: isMobile ? 30 : 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: isMobile ? optimized.duration : optimized.duration * 1.5,
          delay: optimized.delay,
          ease: EASING.parallax
        }
      }
    },
    pulse: {
      hidden: { opacity: 0.6, scale: 0.97 },
      visible: {
        opacity: 1, 
        scale: 1,
        transition: {
          duration: isMobile ? 1.2 : 1.8,
          delay: optimized.delay,
          ease: "easeInOut",
          repeat: isMobile ? 2 : Infinity,
          repeatType: "reverse"
        }
      }
    }
  };

  // Swiss style hover variants
  const hoverVariants: Record<HoverEffect, TargetAndTransition | VariantLabels> = {
    lift: { y: isMobile ? -4 : -8, transition: { duration: 0.3, ease: "easeOut" } },
    glow: { 
      boxShadow: "0 0 10px 2px rgba(var(--accent-rgb), 0.3)", 
      transition: { duration: 0.3 } 
    },
    scale: { scale: isMobile ? 1.02 : 1.03, transition: { duration: 0.3, ease: "easeOut" } },
    rotate: { rotate: isMobile ? 0.5 : 1, transition: { duration: 0.3, ease: "easeOut" } },
    none: {}
  };

  // Swiss style tap variants
  const tapVariants: Record<TapEffect, TargetAndTransition | VariantLabels> = {
    press: { scale: 0.98, transition: { duration: 0.1 } },
    none: {}
  };

  // Get motion props based on animation type
  const getMotionProps = () => {
    // For disabled animations on mobile, just return simple fade
    if (shouldDisableAnimation) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
        style
      };
    }
    
    const commonProps = {
      initial: "hidden",
      whileInView: "visible",
      viewport,
      style: {
        ...style,
        willChange: effectiveType === "parallax" ? "transform, opacity" : "auto"
      }
    };

    if (effectiveType === "grid" && gridLayout) {
      return {
        ...commonProps,
        custom: gridLayout,
        variants: variants[effectiveType],
        whileHover: hoverVariants[effectiveHoverEffect],
        whileTap: tapVariants[whileTap]
      };
    }

    if (effectiveType === "stagger") {
      return {
        ...commonProps,
        variants: variants.stagger,
        whileHover: hoverVariants[effectiveHoverEffect],
        whileTap: tapVariants[whileTap]
      };
    }

    return {
      ...commonProps,
      variants: variants[effectiveType],
      whileHover: hoverVariants[effectiveHoverEffect],
      whileTap: tapVariants[whileTap]
    };
  };
  
  return (
    <motion.div className={className} {...getMotionProps()}>
      {children}
    </motion.div>
  );
}