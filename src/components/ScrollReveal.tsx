"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
  style?: Record<string, unknown>;
  viewport?: { amount?: number; once?: boolean };
}

/**
 * ScrollReveal - A component that reveals its children with a sleek animation when scrolled into view.
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
    once: viewport?.once ?? once 
  });

  // Calculate animation properties based on direction
  const getAnimationProps = () => {
    // Define the types explicitly to include x and y properties
    const initialProps: { opacity: number; x?: number; y?: number } = { opacity: 0 };
    const finalProps: { opacity: number; x?: number; y?: number } = { opacity: 1 };
    
    if (direction !== "none") {
      const axis = direction === "left" || direction === "right" ? "x" : "y";
      const value = distance * (direction === "right" || direction === "up" ? 1 : -1);
      
      initialProps[axis] = value;
      finalProps[axis] = 0;
    }
    
    return { initialProps, finalProps };
  };

  const { initialProps, finalProps } = getAnimationProps();

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
    hidden: initialProps,
    show: {
      ...finalProps,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration,
        delay,
      },
    },
  };

  if (!staggerChildren) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={initialProps}
        animate={isInView ? finalProps : initialProps}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

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