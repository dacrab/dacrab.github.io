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
  emoji?: string;
  emojiAnimation?: "wave" | "bounce" | "pulse" | "spin" | "float" | "none";
  emojiPosition?: "before" | "after";
  emojiSize?: string;
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
  emoji,
  emojiAnimation = "wave",
  emojiPosition = "after",
  emojiSize = "text-2xl"
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

  // Get emoji animation properties
  const getEmojiAnimation = () => {
    switch (emojiAnimation) {
      case "wave":
        return {
          animate: { rotate: [0, 15, 5, 15, 0, -5, 0] },
          transition: {
            repeat: Infinity,
            repeatDelay: 3,
            duration: 1.5,
            delay: delay + duration + 0.3,
            ease: [0.215, 0.61, 0.355, 1],
            times: [0, 0.2, 0.3, 0.4, 0.6, 0.8, 1]
          },
          className: "origin-bottom-right"
        };
      case "bounce":
        return {
          animate: { y: [0, -10, 0] },
          transition: {
            repeat: Infinity,
            repeatDelay: 2,
            duration: 0.8,
            delay: delay + duration + 0.3,
            ease: "easeOut",
          },
          className: ""
        };
      case "pulse":
        return {
          animate: { scale: [1, 1.2, 1] },
          transition: {
            repeat: Infinity,
            repeatDelay: 2.5,
            duration: 0.7,
            delay: delay + duration + 0.3,
            ease: "easeInOut",
          },
          className: ""
        };
      case "spin":
        return {
          animate: { rotate: [0, 360] },
          transition: {
            repeat: Infinity,
            repeatDelay: 3,
            duration: 1.2,
            delay: delay + duration + 0.3,
            ease: "linear",
          },
          className: ""
        };
      case "float":
        return {
          animate: { y: [0, -5, 0, 5, 0] },
          transition: {
            repeat: Infinity,
            duration: 4,
            delay: delay + duration + 0.3,
            ease: "easeInOut",
          },
          className: ""
        };
      default:
        return {
          animate: {},
          transition: {},
          className: ""
        };
    }
  };
  
  // Emoji component
  const EmojiComponent = emoji ? (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        scale: isInView ? 1 : 0.5,
        ...getEmojiAnimation().animate
      }}
      transition={{
        opacity: { duration: 0.3, delay: delay + duration },
        scale: { duration: 0.5, delay: delay + duration, type: "spring" },
        ...getEmojiAnimation().transition
      }}
      className={`inline-block ${getEmojiAnimation().className} ${emojiSize} mx-2`}
    >
      {emoji}
    </motion.span>
  ) : null;

  if (!staggerChildren) {
    return (
      <div className={`flex ${emojiPosition === "before" ? "flex-row" : "flex-row-reverse"} items-center gap-2 ${className}`}>
        {emoji && emojiPosition === "before" && EmojiComponent}
        <motion.div
          ref={ref}
          className="flex-grow"
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
        {emoji && emojiPosition === "after" && EmojiComponent}
      </div>
    );
  }

  return (
    <div className={`flex ${emojiPosition === "before" ? "flex-row" : "flex-row-reverse"} items-center gap-2 ${className}`}>
      {emoji && emojiPosition === "before" && EmojiComponent}
      <motion.div
        ref={ref}
        className="flex-grow"
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
      {emoji && emojiPosition === "after" && EmojiComponent}
    </div>
  );
}