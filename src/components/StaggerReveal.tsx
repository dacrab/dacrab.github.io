"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

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
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });

  // Get initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: -distance };
      case "right":
        return { opacity: 0, x: distance };
      case "none":
        return { opacity: 0, scale: 0.95 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  // Container variants for parent
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  };

  // Child variants for individual items
  const childVariants: Variants = {
    hidden: getInitialPosition(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={style}
    >
      {React.Children.map(children, (child) => (
        <motion.div className={childClassName} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
} 