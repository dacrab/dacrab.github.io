import { useRef } from "react";
import { useInView, Transition, Variants } from "framer-motion";

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

/**
 * Custom hook for scroll-triggered animations
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

  // Determine the initial and animate states based on direction
  const getInitialProps = () => {
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

  const getAnimateProps = () => {
    return direction === "left" || direction === "right"
      ? { opacity: 1, x: 0 }
      : direction === "none"
        ? { opacity: 1 }
        : { opacity: 1, y: 0 };
  };

  // Create the animation variants
  const variants: Variants = {
    hidden: getInitialProps(),
    visible: {
      ...getAnimateProps(),
      transition: {
        type: "spring",
        ...springConfig,
        duration,
        delay,
        ease,
      },
    },
  };

  // Define stagger variants for container elements
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  return {
    ref,
    isInView,
    variants,
    containerVariants,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    transition: {
      type: "spring",
      ...springConfig,
      duration,
      delay,
      ease,
    },
    // Helper function for direct style prop animations
    style: isInView
      ? { ...getAnimateProps(), transition: `all ${duration}s ${delay}s` }
      : getInitialProps(),
  };
} 