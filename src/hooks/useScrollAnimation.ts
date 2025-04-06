import { useRef, useMemo } from "react";
import { useInView, Variants } from "framer-motion";

export interface ScrollAnimationOptions {
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  ease?: string | number[] | undefined;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

// Cache for common transition configurations
const cachedTransitions = new Map<string, object>();

/**
 * Custom hook for scroll-triggered animations
 * Optimized for performance with memoization
 * 
 * @param options Configuration options for animations
 * @returns Object containing refs and animation properties
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    direction = "up",
    distance = 50,
    duration = 0.8,
    delay = 0,
    threshold = 0.2,
    once = true,
    ease = [0.25, 0.1, 0.25, 1],
    springConfig = { stiffness: 260, damping: 20 }
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });

  // Memoize transition config to prevent recreation on each render
  const transitionConfig = useMemo(() => {
    const cacheKey = `${duration}-${delay}-${springConfig.stiffness}-${springConfig.damping}-${springConfig.mass ?? 1}`;
    
    if (cachedTransitions.has(cacheKey)) {
      return cachedTransitions.get(cacheKey);
    }
    
    const config = {
      type: "spring",
      ...springConfig,
      duration,
      delay,
      ease,
    };
    
    cachedTransitions.set(cacheKey, config);
    return config;
  }, [duration, delay, ease, springConfig]);

  // Memoize initial props based on direction to prevent object recreations
  const initialProps = useMemo(() => {
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
  }, [direction, distance]);

  // Memoize animate props to prevent object recreations
  const animateProps = useMemo(() => {
    return direction === "left" || direction === "right"
      ? { opacity: 1, x: 0 }
      : direction === "none"
        ? { opacity: 1 }
        : { opacity: 1, y: 0 };
  }, [direction]);

  // Memoize variants to prevent recreation on each render
  const variants = useMemo<Variants>(() => ({
    hidden: initialProps,
    visible: {
      ...animateProps,
      transition: transitionConfig,
    },
  }), [initialProps, animateProps, transitionConfig]);

  // Memoize container variants to prevent recreation
  const containerVariants = useMemo<Variants>(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }), [delay]);

  // Memoize the entire return object to prevent recreations
  return useMemo(() => ({
    ref,
    isInView,
    variants,
    containerVariants,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    transition: transitionConfig,
    // Helper function for direct style prop animations
    style: isInView
      ? { ...animateProps, transition: `all ${duration}s ${delay}s` }
      : initialProps,
  }), [
    isInView, 
    variants, 
    containerVariants, 
    transitionConfig, 
    animateProps, 
    initialProps, 
    duration, 
    delay
  ]);
} 