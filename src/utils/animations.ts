import { Variants } from "framer-motion";

/**
 * Animation utility functions for consistent animations across the application
 */

/**
 * Creates a fade-in animation variant with directional movement
 */
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "up", 
  delay: number = 0, 
  duration: number = 0.5
): Variants => {
  const getDirectionalProps = () => {
    switch (direction) {
      case "up":
        return { y: 40 };
      case "down":
        return { y: -40 };
      case "left":
        return { x: 40 };
      case "right":
        return { x: -40 };
      case "none":
        return {};
      default:
        return { y: 40 };
    }
  };

  return {
    hidden: {
      opacity: 0,
      ...getDirectionalProps(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        duration,
        delay,
      },
    },
  };
};

/**
 * Creates a reveal animation for sections or large elements
 */
export const revealSection = (delay: number = 0, once: boolean = true): Variants => {
  return {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };
};

/**
 * Creates a staggered animation for container elements that have children to animate
 */
export const staggerContainer = (
  staggerChildren: number = 0.1, 
  delayChildren: number = 0
): Variants => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

/**
 * Scale animation for elements that should grow/shrink into view
 */
export const scaleIn = (delay: number = 0, duration: number = 0.5): Variants => {
  return {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay,
        duration,
      },
    },
  };
};

/**
 * Special animation for card or floating elements with subtle perspective
 */
export const cardAnimation = (delay: number = 0): Variants => {
  return {
    hidden: { 
      opacity: 0, 
      y: 30, 
      rotateX: 5, 
      rotateY: -5, 
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      rotateY: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      },
    },
  };
};

/**
 * Creates text animation variants for headings and paragraphs
 */
export const textVariant = (delay: number = 0): Variants => {
  return {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.6,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

/**
 * Animation for sliding elements in from a specific direction
 * Added from animation.ts
 */
export const slideIn = (
  direction: "up" | "down" | "left" | "right", 
  type: string, 
  delay: number, 
  duration: number
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    },
    visible: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

/**
 * Animation for zooming elements in
 * Added from animation.ts
 */
export const zoomIn = (delay: number, duration: number): Variants => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
}; 