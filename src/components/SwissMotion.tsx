"use client";

import { ReactNode } from "react";
import { motion, MotionStyle, Variants } from "framer-motion";

export type SwissMotionType = 
  | "slide" 
  | "fade" 
  | "scale" 
  | "rotate" 
  | "stagger" 
  | "grid" 
  | "reveal" 
  | "parallax"
  | "pulse";

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
  whileHover?: "lift" | "glow" | "scale" | "rotate" | "none";
  whileTap?: "press" | "none";
  gridLayout?: GridLayoutProps;
}

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
  gridLayout
}: SwissMotionProps) {
  
  // Swiss style animation variants
  const variants: { [key in SwissMotionType]: Variants } = {
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration, 
          delay,
          ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style precision curve
        }
      }
    },
    slide: {
      hidden: { opacity: 0, x: -40 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.19, 1, 0.22, 1] // Swiss-style precision curve
        }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style precision curve
        }
      }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -5 },
      visible: {
        opacity: 1,
        rotate: 0,
        transition: {
          duration,
          delay,
          ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style precision curve
        }
      }
    },
    stagger: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren,
          staggerDirection,
          delayChildren: delay
        }
      }
    },
    grid: {
      hidden: { opacity: 0, y: 20 },
      visible: customParams => {
        if (!customParams) return { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration, 
            delay, 
            ease: [0.19, 1, 0.22, 1] 
          }
        };
        
        const columns = typeof customParams === 'object' && 'columns' in customParams ? customParams.columns : 3;
        const rows = typeof customParams === 'object' && 'rows' in customParams ? customParams.rows : 3;
        const itemIndex = typeof customParams === 'object' && 'itemIndex' in customParams ? customParams.itemIndex : 0;
        
        const col = itemIndex % columns;
        const row = Math.floor(itemIndex / columns) % rows;
        const startPosition = [0, 0.3, 0.6]; // Start at different times based on grid position
        const timeOffset = 0.2; // Delay increment
        
        // Calculate delay based on grid position for a wave-like effect
        const staggerDelay = (startPosition[col] + startPosition[row]) * timeOffset;
        
        return {
          opacity: 1,
          y: 0, 
          transition: {
            duration: duration, 
            delay: delay + staggerDelay,
            ease: [0.19, 1, 0.22, 1] // Swiss-style precision curve
          }
        };
      }
    },
    reveal: {
      hidden: { clipPath: "inset(0 100% 0 0)" },
      visible: {
        clipPath: "inset(0 0% 0 0)",
        transition: {
          duration,
          delay,
          ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style precision curve
        }
      }
    },
    parallax: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: duration * 1.5,
          delay,
          ease: [0.08, 0.82, 0.17, 1] // Swiss-style smooth parallax
        }
      }
    },
    pulse: {
      hidden: { opacity: 0.6, scale: 0.97 },
      visible: {
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 1.8,
          delay,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }
      }
    }
  };

  // Swiss style hover variants
  const hoverVariants = {
    lift: { y: -8, transition: { duration: 0.3, ease: "easeOut" } },
    glow: { 
      boxShadow: "0 0 10px 2px rgba(var(--accent-rgb), 0.3)", 
      transition: { duration: 0.3 } 
    },
    scale: { scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } },
    rotate: { rotate: 1, transition: { duration: 0.3, ease: "easeOut" } },
    none: {}
  };

  // Swiss style tap variants
  const tapVariants = {
    press: { scale: 0.98, transition: { duration: 0.1 } },
    none: {}
  };

  // Custom props based on animation type
  const getMotionProps = () => {
    const commonProps = {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: viewport.once, margin: viewport.margin },
      style: {
        ...style,
        willChange: type === "parallax" ? "transform, opacity" : "auto"
      }
    };

    // For grid layout animations
    if (type === "grid" && gridLayout) {
      return {
        ...commonProps,
        custom: gridLayout,
        variants: variants[type]
      };
    }

    // For stagger animations (parent container)
    if (type === "stagger") {
      return {
        ...commonProps,
        variants: variants.stagger
      };
    }

    // For regular animations
    return {
      ...commonProps,
      variants: variants[type],
      whileHover: hoverVariants[whileHover],
      whileTap: tapVariants[whileTap]
    };
  };
  
  return (
    <motion.div className={className} {...getMotionProps()}>
      {children}
    </motion.div>
  );
} 