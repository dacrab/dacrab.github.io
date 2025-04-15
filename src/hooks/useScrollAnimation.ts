import { useRef, useMemo } from "react";
import { useInView, Variants } from "framer-motion";

export interface ScrollAnimationOptions {
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  ease?: string | number[];
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

const defaultSpring = { stiffness: 260, damping: 20, mass: 1 };

/**
 * Custom hook for scroll-triggered animations
 * Optimized for performance with memoization and simplified logic
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
    springConfig = {},
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });

  // Memoize transition config
  const transition = useMemo(
    () => {
      const mergedSpring = { ...defaultSpring, ...springConfig };
      return {
        type: "spring",
        ...mergedSpring,
        duration,
        delay,
        ease,
      };
    },
    [duration, delay, ease, springConfig]
  );

  // Memoize initial and animate props
  const [initial, animate] = useMemo(() => {
    switch (direction) {
      case "up":
        return [{ opacity: 0, y: distance }, { opacity: 1, y: 0 }];
      case "down":
        return [{ opacity: 0, y: -distance }, { opacity: 1, y: 0 }];
      case "left":
        return [{ opacity: 0, x: -distance }, { opacity: 1, x: 0 }];
      case "right":
        return [{ opacity: 0, x: distance }, { opacity: 1, x: 0 }];
      case "none":
        return [{ opacity: 0 }, { opacity: 1 }];
      default:
        return [{ opacity: 0, y: distance }, { opacity: 1, y: 0 }];
    }
  }, [direction, distance]);

  // Memoize variants
  const variants = useMemo<Variants>(
    () => ({
      hidden: initial,
      visible: { ...animate, transition },
    }),
    [initial, animate, transition]
  );

  // Memoize container variants
  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        },
      },
    }),
    [delay]
  );

  // Memoize style for direct style prop animations
  const style = useMemo(
    () =>
      isInView
        ? { ...animate, transition: `all ${duration}s ${delay}s` }
        : initial,
    [isInView, animate, initial, duration, delay]
  );

  return {
    ref,
    isInView,
    variants,
    containerVariants,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    transition,
    style,
  };
}