"use client";

import { ReactNode } from "react";
import { motion, Variants, TargetAndTransition } from "framer-motion";

// Swiss-style animation curves
const swissPrecisionEase = [0.19, 1, 0.22, 1];
const swissSharpEase = [0.17, 0.67, 0.83, 0.67];

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
}

export default function StaggerItem({
  children,
  className = "",
  type = "fade",
  direction = "up",
  delay = 0,
  duration = 0.5,
  whileHover = "none",
  whileTap = "none"
}: StaggerItemProps) {
  // Animation variants based on type and direction
  const getVariants = (): Variants => {
    const baseTransition = { 
      duration, 
      delay,
      ease: type === "slide" ? swissPrecisionEase : swissSharpEase
    };

    // Define animation variants by type
    const variants: Record<AnimationType, Variants> = {
      fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: baseTransition }
      },
      scale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: baseTransition }
      },
      rotate: {
        hidden: { opacity: 0, rotate: -3 },
        visible: { opacity: 1, rotate: 0, transition: baseTransition }
      },
      reveal: {
        hidden: { clipPath: "inset(0 100% 0 0)" },
        visible: { clipPath: "inset(0 0% 0 0)", transition: baseTransition }
      },
      slide: {
        hidden: getSlideInitialState(direction),
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          transition: baseTransition
        }
      }
    };

    return variants[type];
  };
  
  // Helper function to get initial state for slide animations
  const getSlideInitialState = (direction: Direction) => {
    switch (direction) {
      case "up": return { opacity: 0, y: 20 };
      case "down": return { opacity: 0, y: -20 };
      case "left": return { opacity: 0, x: 20 };
      case "right": return { opacity: 0, x: -20 };
    }
  };
  
  // Swiss style hover and tap effects
  const hoverEffects: Record<HoverEffect, TargetAndTransition> = {
    lift: { y: -8, transition: { duration: 0.3, ease: "easeOut" } },
    glow: { boxShadow: "0 0 10px 2px rgba(var(--accent-rgb), 0.3)", transition: { duration: 0.3 } },
    scale: { scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } },
    rotate: { rotate: 1, transition: { duration: 0.3, ease: "easeOut" } },
    none: {}
  };

  const tapEffects: Record<TapEffect, TargetAndTransition> = {
    press: { scale: 0.98, transition: { duration: 0.1 } },
    none: {}
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      whileHover={hoverEffects[whileHover]}
      whileTap={tapEffects[whileTap]}
    >
      {children}
    </motion.div>
  );
}