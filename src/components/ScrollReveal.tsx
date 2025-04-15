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
  style?: React.CSSProperties;
  viewport?: { amount?: number; once?: boolean };
  emoji?: string;
  emojiAnimation?: "wave" | "bounce" | "pulse" | "spin" | "float" | "none";
  emojiPosition?: "before" | "after";
  emojiSize?: string;
  mobileOptimized?: boolean;
}

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

  // Optimize values for mobile if needed
  const optimizedDistance = getOptimizedValue(distance, isMobile && mobileOptimized, 0.7, 30);
  const optimizedDuration = getOptimizedValue(duration, isMobile && mobileOptimized, 0.8, 0.5);
  const optimizedDelay = getOptimizedValue(delay, isMobile && mobileOptimized, 0.7);
  const optimizedStaggerDelay = getOptimizedValue(staggerDelay, isMobile && mobileOptimized, 0.6, 0.05);
  const optimizedThreshold = getOptimizedValue(threshold, isMobile && mobileOptimized, 0.8, 0.15);

  const isInView = useInView(ref, {
    amount: viewport?.amount ?? optimizedThreshold,
    once: viewport?.once ?? once
  });

  // Animation props based on direction
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign = direction === "right" || direction === "up" ? 1 : -1;
  const initialProps: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  if (direction !== "none") initialProps[axis] = optimizedDistance * sign;
  const finalProps: { opacity: number; x?: number; y?: number } = { opacity: 1 };
  if (direction !== "none") finalProps[axis] = 0;

  // Variants for staggered children
  const containerVariants = staggerContainer(optimizedStaggerDelay, optimizedDelay, isMobile && mobileOptimized);
  const itemVariants = {
    hidden: initialProps,
    show: {
      ...finalProps,
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 260,
        damping: isMobile ? 25 : 20,
        duration: optimizedDuration,
        delay: optimizedDelay,
      },
    },
  };

  // Emoji animation config
  const emojiConfig = emojiAnimation(
    emojiAnimationType,
    delay + duration + 0.3,
    emojiAnimationType === "wave" ? 1.5 : 0.8,
    isMobile && mobileOptimized
  );

  // Emoji component
  const Emoji = emoji ? (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.5,
        ...(emojiAnimationType !== "none" ? emojiConfig.animate : {})
      }}
      transition={{
        opacity: { duration: 0.3, delay: optimizedDelay + optimizedDuration },
        scale: { duration: 0.5, delay: optimizedDelay + optimizedDuration, type: "spring" },
        ...(emojiAnimationType !== "none" ? emojiConfig.transition : {})
      }}
      className={`inline-block ${emojiConfig.className} ${emojiSize} mx-2`}
      style={{ willChange: emojiAnimationType !== "none" ? "transform" : "opacity" }}
    >
      {emoji}
    </motion.span>
  ) : null;

  // Layout for emoji and content
  const flexDir = emojiPosition === "before" ? "flex-row" : "flex-row-reverse";

  if (!staggerChildren) {
    return (
      <div className={`flex ${flexDir} items-center gap-2 ${className}`}>
        {emoji && emojiPosition === "before" && Emoji}
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
        {emoji && emojiPosition === "after" && Emoji}
      </div>
    );
  }

  return (
    <div className={`flex ${flexDir} items-center gap-2 ${className}`}>
      {emoji && emojiPosition === "before" && Emoji}
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
        {React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            style={{
              willChange: direction !== "none" ? "transform, opacity" : "opacity"
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
      {emoji && emojiPosition === "after" && Emoji}
    </div>
  );
}