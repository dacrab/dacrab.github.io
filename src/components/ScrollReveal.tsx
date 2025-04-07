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
  mobileOptimized?: boolean; // Allow disabling optimization
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
  emojiSize = "text-2xl",
  mobileOptimized = true
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  
  // Optimize animations for mobile
  const optimizedDistance = mobileOptimized && isMobile ? Math.min(distance * 0.7, 30) : distance;
  const optimizedDuration = mobileOptimized && isMobile ? Math.min(duration * 0.8, 0.5) : duration;
  const optimizedDelay = mobileOptimized && isMobile ? Math.min(delay * 0.7, delay) : delay;
  const optimizedStaggerDelay = mobileOptimized && isMobile ? Math.min(staggerDelay * 0.6, 0.05) : staggerDelay;
  
  // Viewport threshold can be smaller on mobile for earlier reveal
  const optimizedThreshold = mobileOptimized && isMobile ? Math.min(threshold * 0.8, 0.15) : threshold;
  
  const isInView = useInView(ref, { 
    amount: viewport?.amount || optimizedThreshold, 
    once: viewport?.once ?? once 
  });

  // Calculate animation properties based on direction
  const getAnimationProps = () => {
    // Define the types explicitly to include x and y properties
    const initialProps: { opacity: number; x?: number; y?: number } = { opacity: 0 };
    const finalProps: { opacity: number; x?: number; y?: number } = { opacity: 1 };
    
    if (direction !== "none") {
      const axis = direction === "left" || direction === "right" ? "x" : "y";
      const value = optimizedDistance * (direction === "right" || direction === "up" ? 1 : -1);
      
      initialProps[axis] = value;
      finalProps[axis] = 0;
    }
    
    return { initialProps, finalProps };
  };

  const { initialProps, finalProps } = getAnimationProps();

  // Container variant for staggered animations - optimized for mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: optimizedStaggerDelay,
        delayChildren: optimizedDelay,
      },
    },
  };

  // Item variants for staggered children - optimized for mobile
  const itemVariants = {
    hidden: initialProps,
    show: {
      ...finalProps,
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 260, // Less bouncy on mobile
        damping: isMobile ? 25 : 20,     // More damping on mobile
        duration: optimizedDuration,
        delay: optimizedDelay,
      },
    },
  };

  // Get emoji animation properties - simplified for mobile
  const getEmojiAnimation = () => {
    // On mobile with optimization enabled, use simpler animations
    if (mobileOptimized && isMobile) {
      // Simplified version for mobile - less complex animations
      switch (emojiAnimation) {
        case "wave":
          return {
            animate: { rotate: [0, 10, 0, -5, 0] }, // Simplified rotation
            transition: {
              repeat: Infinity,
              repeatDelay: 4,      // Longer delay between animations
              duration: 1.2,       // Shorter duration
              delay: optimizedDelay + optimizedDuration + 0.3,
              ease: "easeInOut",
            },
            className: "origin-bottom-right"
          };
        case "bounce":
          return {
            animate: { y: [0, -5, 0] }, // Reduced bounce distance
            transition: {
              repeat: Infinity,
              repeatDelay: 3,      // Longer delay between animations
              duration: 0.6,       // Shorter duration
              delay: optimizedDelay + optimizedDuration + 0.3,
              ease: "easeOut",
            },
            className: ""
          };
        case "pulse":
        case "spin":
        case "float":
        default:
          // Disable complex animations on mobile
          return {
            animate: {},
            transition: {},
            className: ""
          };
      }
    }
    
    // Full animations for desktop
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
  
  // Emoji component - conditionally optimized for mobile
  const EmojiComponent = emoji ? (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        scale: isInView ? 1 : 0.5,
        ...(emojiAnimation !== "none" ? getEmojiAnimation().animate : {})
      }}
      transition={{
        opacity: { duration: 0.3, delay: optimizedDelay + optimizedDuration },
        scale: { duration: 0.5, delay: optimizedDelay + optimizedDuration, type: "spring" },
        ...(emojiAnimation !== "none" ? getEmojiAnimation().transition : {})
      }}
      className={`inline-block ${getEmojiAnimation().className} ${emojiSize} mx-2`}
      style={{ 
        willChange: emojiAnimation !== "none" ? "transform" : "opacity" 
      }}
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
            duration: optimizedDuration,
            delay: optimizedDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            ...style,
            willChange: direction !== "none" ? "transform, opacity" : "opacity"
          }}
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
        style={{
          ...style,
          willChange: "opacity"
        }}
      >
        {React.Children.map(children, (child) => (
          <motion.div 
            variants={itemVariants}
            style={{
              willChange: direction !== "none" ? "transform, opacity" : "opacity"
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
      {emoji && emojiPosition === "after" && EmojiComponent}
    </div>
  );
}