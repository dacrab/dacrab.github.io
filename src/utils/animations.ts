import { Variants } from "framer-motion";

/**
 * Animation utility functions for consistent animations across the application
 */

// Common transition presets
const transitions = {
  spring: { type: "spring", damping: 25, stiffness: 100 },
  snappy: { type: "spring", stiffness: 260, damping: 20 },
  smooth: { type: "tween", ease: [0.215, 0.61, 0.355, 1] },
  easeOut: { type: "tween", ease: "easeOut" },
};

// Direction mapping helper
const getDirectionalOffset = (direction: string) => {
  const offsets = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };
  return offsets[direction as keyof typeof offsets] || { y: 40 };
};

/**
 * Creates a fade-in animation with directional movement
 */
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "up", 
  delay: number = 0, 
  duration: number = 0.5
): Variants => ({
  hidden: {
    opacity: 0,
    ...getDirectionalOffset(direction),
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      ...transitions.spring,
      duration,
      delay,
    },
  },
});

/**
 * Creates a reveal animation for sections or large elements
 */
export const revealSection = (delay: number = 0): Variants => ({
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      ...transitions.smooth,
      duration: 0.8,
      delay,
    },
  },
});

/**
 * Creates a staggered animation for container elements with children
 */
export const staggerContainer = (
  staggerChildren: number = 0.1, 
  delayChildren: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Scale animation for elements that should grow/shrink into view
 */
export const scaleIn = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      ...transitions.snappy,
      delay,
      duration,
    },
  },
});

/**
 * Special animation for card elements with subtle perspective
 */
export const cardAnimation = (delay: number = 0): Variants => ({
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
      ...transitions.snappy,
      delay,
    },
  },
});

/**
 * Creates text animation variants for headings and paragraphs
 */
export const textVariant = (delay: number = 0): Variants => ({
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
});

/**
 * Animation for sliding elements in from a specific direction
 */
export const slideIn = (
  direction: "up" | "down" | "left" | "right", 
  type: string, 
  delay: number, 
  duration: number
): Variants => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
  },
  visible: {
    x: 0,
    y: 0,
    transition: {
      ...transitions.easeOut,
      type,
      delay,
      duration,
    },
  },
});

/**
 * Animation for zooming elements in
 */
export const zoomIn = (delay: number, duration: number): Variants => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      ...transitions.easeOut,
      delay,
      duration,
    },
  },
});