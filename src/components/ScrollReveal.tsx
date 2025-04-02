"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  distance?: number; // Distance to travel
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  rootMargin?: string;
  threshold?: number; 
  once?: boolean;
  style?: Record<string, unknown>;
  viewport?: { amount?: number; once?: boolean };
}

/**
 * ScrollReveal - A component that reveals its children with a sleek animation when scrolled into view.
 * 
 * This uses framer-motion's useInView hook to detect when the component is in the viewport,
 * and then animates the children into view with a fade and translation effect.
 */
export default function ScrollReveal({
  children,
  direction = "up",
  className = "",
  distance = 50,
  duration = 0.8,
  delay = 0,
  staggerChildren = false,
  staggerDelay = 0.1,
  threshold = 0.2,
  once = true,
  style = {},
  viewport,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: viewport?.amount || threshold, 
    once: viewport?.once !== undefined ? viewport.once : once 
  });

  // Determine initial positions based on direction
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
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  // Get final position
  const getFinalPosition = () => {
    return direction === "left" || direction === "right" 
      ? { opacity: 1, x: 0 } 
      : direction === "none" 
        ? { opacity: 1 } 
        : { opacity: 1, y: 0 };
  };

  // Container variant for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  // Item variants for staggered children
  const itemVariants = {
    hidden: getInitialPosition(),
    show: {
      ...getFinalPosition(),
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration,
        delay,
      },
    },
  };

  // For non-staggered animations, use the motion component directly
  if (!staggerChildren) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={getInitialPosition()}
        animate={isInView ? getFinalPosition() : getInitialPosition()}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1], // Custom ease for smooth animation
        }}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  // For staggered animations, use variants
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      style={style}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
} 