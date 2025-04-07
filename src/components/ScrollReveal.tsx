"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getOptimizedValue, emojiAnimation, staggerContainer } from "@/utils/animations";

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
  emojiAnimation: emojiAnimationType = "wave",
  emojiPosition = "after",
  emojiSize = "text-2xl",
  mobileOptimized = true
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  
  // Use centralized utility for optimized values
  const optimizedDistance = getOptimizedValue(distance, isMobile && mobileOptimized, 0.7, 30);
  const optimizedDuration = getOptimizedValue(duration, isMobile && mobileOptimized, 0.8, 0.5);
  const optimizedDelay = getOptimizedValue(delay, isMobile && mobileOptimized, 0.7);
  const optimizedStaggerDelay = getOptimizedValue(staggerDelay, isMobile && mobileOptimized, 0.6, 0.05);
  const optimizedThreshold = getOptimizedValue(threshold, isMobile && mobileOptimized, 0.8, 0.15);
  
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

  // Use centralized stagger container variant
  const containerVariants = staggerContainer(optimizedStaggerDelay, optimizedDelay, isMobile && mobileOptimized);

  // Item variants for staggered children - using central transition presets
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

  // Use centralized emoji animation utility
  const emojiAnimationConfig = emojiAnimation(
    emojiAnimationType,
    delay + duration + 0.3,
    emojiAnimationType === "wave" ? 1.5 : 0.8,
    isMobile && mobileOptimized
  );
  
  // Emoji component with centralized animation
  const EmojiComponent = emoji ? (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        scale: isInView ? 1 : 0.5,
        ...(emojiAnimationType !== "none" ? emojiAnimationConfig.animate : {})
      }}
      transition={{
        opacity: { duration: 0.3, delay: optimizedDelay + optimizedDuration },
        scale: { duration: 0.5, delay: optimizedDelay + optimizedDuration, type: "spring" },
        ...(emojiAnimationType !== "none" ? emojiAnimationConfig.transition : {})
      }}
      className={`inline-block ${emojiAnimationConfig.className} ${emojiSize} mx-2`}
      style={{ 
        willChange: emojiAnimationType !== "none" ? "transform" : "opacity" 
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