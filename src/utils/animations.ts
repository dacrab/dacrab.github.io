import { Variants } from "framer-motion";

/**
 * Animation utility functions for consistent animations across the application
 * Optimized for performance with memoization and reduced object creation
 */

// Common transition presets - frozen objects to prevent recreation
const transitions = Object.freeze({
  spring: Object.freeze({ type: "spring", damping: 25, stiffness: 100 }),
  snappy: Object.freeze({ type: "spring", stiffness: 260, damping: 20 }),
  smooth: Object.freeze({ type: "tween", ease: [0.215, 0.61, 0.355, 1] }),
  easeOut: Object.freeze({ type: "tween", ease: "easeOut" }),
});

// Direction mapping with frozen objects
const directionalOffsets = Object.freeze({
  up: Object.freeze({ y: 40 }),
  down: Object.freeze({ y: -40 }),
  left: Object.freeze({ x: 40 }),
  right: Object.freeze({ x: -40 }),
  none: Object.freeze({}),
});

// Memoization cache for common animation variants
const variantCache = new Map<string, Variants>();

/**
 * Gets cached directional offset
 */
const getDirectionalOffset = (direction: string) => {
  return directionalOffsets[direction as keyof typeof directionalOffsets] || directionalOffsets.up;
};

/**
 * Creates a fade-in animation with directional movement
 * Memoized to prevent redundant object creation
 */
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "up", 
  delay: number = 0, 
  duration: number = 0.5
): Variants => {
  const cacheKey = `fadeIn-${direction}-${delay}-${duration}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
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
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Creates a reveal animation for sections or large elements
 * Memoized for performance
 */
export const revealSection = (delay: number = 0): Variants => {
  const cacheKey = `revealSection-${delay}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
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
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Creates a staggered animation for container elements with children
 * Memoized for performance
 */
export const staggerContainer = (
  staggerChildren: number = 0.1, 
  delayChildren: number = 0
): Variants => {
  const cacheKey = `staggerContainer-${staggerChildren}-${delayChildren}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Scale animation for elements that should grow/shrink into view
 * Memoized for performance
 */
export const scaleIn = (delay: number = 0, duration: number = 0.5): Variants => {
  const cacheKey = `scaleIn-${delay}-${duration}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
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
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Special animation for card elements with subtle perspective
 * Memoized for performance
 */
export const cardAnimation = (delay: number = 0): Variants => {
  const cacheKey = `cardAnimation-${delay}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
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
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Creates text animation variants for headings and paragraphs
 * Memoized for performance
 */
export const textVariant = (delay: number = 0): Variants => {
  const cacheKey = `textVariant-${delay}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
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
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Animation for sliding elements in from a specific direction
 * Memoized for performance
 */
export const slideIn = (
  direction: "up" | "down" | "left" | "right", 
  type: string, 
  delay: number, 
  duration: number
): Variants => {
  const cacheKey = `slideIn-${direction}-${type}-${delay}-${duration}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
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
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Animation for zooming elements in
 * Memoized for performance
 */
export const zoomIn = (delay: number, duration: number): Variants => {
  const cacheKey = `zoomIn-${delay}-${duration}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
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
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Animation for the CV dropdown menu
 */
export const dropdownAnimation: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

/**
 * Hero SVG signature path animation
 */
export const svgSignatureAnimation = (delay: number = 1): Variants => {
  const cacheKey = `svgSignature-${delay}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { 
          type: "spring", 
          duration: 2.5, 
          bounce: 0, 
          delay 
        },
        opacity: { duration: 0.5, delay }
      }
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Animation for SVG circle elements
 */
export const svgCircleAnimation = (delay: number = 0): Variants => {
  const cacheKey = `svgCircle-${delay}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        ...transitions.snappy,
        delay,
        duration: 0.5
      }
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Animation for SVG decorative circles with dash arrays
 */
export const svgDecorativeCircleAnimation = (delay: number = 0, opacity: number = 0.6): Variants => {
  const cacheKey = `svgDecorativeCircle-${delay}-${opacity}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity,
      transition: { 
        duration: 2, 
        delay 
      }
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Continuous floating animation for components (safe for SVG elements)
 */
export const floatingAnimation = (
  amplitude: number = 10, 
  duration: number = 3
) => {
  return {
    y: [0, -amplitude, 0, amplitude, 0],
    transition: {
      repeat: Infinity,
      duration,
      ease: "easeInOut"
    }
  };
};

/**
 * Pulse animation for SVG elements
 */
export const pulseAnimation = (
  scale: number[] = [1, 1.05, 1],
  duration: number = 3
) => {
  return {
    scale,
    transition: {
      repeat: Infinity,
      duration,
      ease: "easeInOut"
    }
  };
};

/**
 * Rotating animation for SVG elements
 */
export const rotationAnimation = (
  rotate: number[] = [0, 360],
  duration: number = 20
) => {
  return {
    rotate,
    transition: {
      repeat: Infinity,
      duration,
      ease: "linear"
    }
  };
};

/**
 * Orbit animation for decorative elements
 */
export const orbitAnimation = (
  radius: number = 20,
  duration: number = 10
) => {
  const steps = 60;
  const xValues = [];
  const yValues = [];
  
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI;
    xValues.push(Math.cos(angle) * radius);
    yValues.push(Math.sin(angle) * radius);
  }
  
  return {
    x: xValues,
    y: yValues,
    transition: {
      repeat: Infinity,
      duration,
      ease: "linear",
    }
  };
};

/**
 * Tech keyword animation for hero section
 */
export const techKeywordAnimation = (delay: number, y: string[] = ["0%", "-50%"]): Variants => {
  const cacheKey = `techKeyword-${delay}-${y.join("-")}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 0.7, 
      y: 0,
      transition: {
        duration: 0.8,
        delay
      } 
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Scroll indicator animation
 */
export const scrollIndicatorAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      delay: 3.5, 
      duration: 1 
    } 
  }
};

/**
 * Animation for scroll indicator dot
 */
export const scrollDotAnimation = {
  animate: {
    y: [0, 8, 0],
    transition: { 
      repeat: Infinity, 
      duration: 2, 
      ease: "easeInOut" 
    }
  }
};

/**
 * Background grid animation
 */
export const gridAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 0.7,
    transition: { 
      duration: 1.5 
    } 
  }
};

/**
 * Background shape animation
 */
export const bgShapeAnimation = (delay: number = 0, opacity: number = 0.5): Variants => {
  const cacheKey = `bgShape-${delay}-${opacity}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
    hidden: { opacity: 0 },
    visible: { 
      opacity,
      transition: { 
        duration: 1.5, 
        delay 
      }
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Clear animation cache - useful for testing or forced refreshes
 */
export function clearAnimationCache(): void {
  variantCache.clear();
}