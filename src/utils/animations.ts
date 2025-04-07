import { Variants } from "framer-motion";

/**
 * Animation utility functions for consistent animations across the application
 * Optimized for performance with memoization and reduced object creation
 */

// Cache to prevent redundant variant recreation
const variantCache = new Map<string, Variants>();

// Common transition presets
const transitions = {
  spring: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
  springMobile: {
    type: "spring",
    stiffness: 200, // Less bouncy for mobile
    damping: 25,    // More damping for mobile
  },
  snappy: {
    type: "spring",
    stiffness: 320,
    damping: 30,
  },
  snappyMobile: {
    type: "spring",
    stiffness: 250, // Less bouncy for mobile
    damping: 35,    // More damping for mobile
  },
  easeIn: {
    type: "tween",
    ease: [0.4, 0, 1, 1],
  },
  easeOut: {
    type: "tween",
    ease: [0, 0, 0.2, 1],
  },
};

/**
 * Helper to get optimized animation values for mobile
 */
export const getOptimizedValue = (
  value: number, 
  isMobile: boolean, 
  factor: number = 0.7,
  maxValue?: number
): number => {
  if (!isMobile) return value;
  
  const optimized = value * factor;
  return maxValue !== undefined ? Math.min(optimized, maxValue) : optimized;
};

// Helper function to get directional offset
const getDirectionalOffset = (direction: string) => {
  switch (direction) {
    case "up": return { y: 50 };
    case "down": return { y: -50 };
    case "left": return { x: 50 };
    case "right": return { x: -50 };
    default: return {};
  }
};

// Helper function to get mobile-optimized directional offset
const getMobileDirectionalOffset = (direction: string) => {
  switch (direction) {
    case "up": return { y: 30 };     // Reduced distance
    case "down": return { y: -30 };  // Reduced distance
    case "left": return { x: 30 };   // Reduced distance
    case "right": return { x: -30 }; // Reduced distance
    default: return {};
  }
};

/**
 * Fade in animation from a direction
 * Memoized for performance
 */
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "up", 
  delay: number = 0, 
  duration: number = 0.5,
  isMobile: boolean = false
): Variants => {
  const cacheKey = `fadeIn-${direction}-${delay}-${duration}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized values for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  const optimizedDuration = getOptimizedValue(duration, isMobile, 0.8, 0.4);
  
  const variant = {
    hidden: {
      opacity: 0,
      ...(isMobile ? getMobileDirectionalOffset(direction) : getDirectionalOffset(direction)),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        ...(isMobile ? transitions.springMobile : transitions.spring),
        duration: optimizedDuration,
        delay: optimizedDelay,
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
export const revealSection = (delay: number = 0, isMobile: boolean = false): Variants => {
  const cacheKey = `revealSection-${delay}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized delay for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  
  const variant = {
    hidden: { 
      opacity: 0,
      y: isMobile ? 20 : 30, // Reduced distance for mobile
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        ...(isMobile ? transitions.springMobile : transitions.spring),
        delay: optimizedDelay,
        duration: isMobile ? 0.5 : 0.7, // Faster animation on mobile
      }
    },
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Creates a stagger container animation
 * Memoized for performance
 */
export const staggerContainer = (
  staggerChildren: number = 0.1, 
  delayChildren: number = 0,
  isMobile: boolean = false
): Variants => {
  const cacheKey = `staggerContainer-${staggerChildren}-${delayChildren}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized values for mobile
  const optimizedStagger = getOptimizedValue(staggerChildren, isMobile, 0.6, 0.05);
  const optimizedDelay = getOptimizedValue(delayChildren, isMobile, 0.7);
  
  const variant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: optimizedStagger,
        delayChildren: optimizedDelay,
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
export const scaleIn = (delay: number = 0, duration: number = 0.5, isMobile: boolean = false): Variants => {
  const cacheKey = `scaleIn-${delay}-${duration}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized values for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  const optimizedDuration = getOptimizedValue(duration, isMobile, 0.8, 0.4);
  
  const variant = {
    hidden: { 
      opacity: 0, 
      scale: isMobile ? 0.9 : 0.8, // Less scale for mobile for better performance
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        ...(isMobile ? transitions.snappyMobile : transitions.snappy),
        delay: optimizedDelay,
        duration: optimizedDuration,
      },
    },
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Animation for card elements with hover effects
 * Memoized for performance
 */
export const cardAnimation = (delay: number = 0, isMobile: boolean = false): Variants => {
  const cacheKey = `cardAnimation-${delay}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized delay for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  
  const variant = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 15 : 25,  // Reduced distance for mobile
      scale: isMobile ? 0.95 : 0.9, // Less scale for mobile for better performance
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        ...(isMobile ? transitions.springMobile : transitions.spring),
        delay: optimizedDelay,
        duration: isMobile ? 0.5 : 0.7, // Faster animation on mobile
      }
    },
    hover: isMobile ? 
      { 
        // Simpler hover for mobile
        y: -5, 
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 }
      } :
      {
        // Full hover for desktop
        y: -10,
        scale: 1.03,
        boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
        transition: { duration: 0.4 }
      }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Text reveal animation
 * Memoized for performance
 */
export const textVariant = (delay: number = 0, isMobile: boolean = false): Variants => {
  const cacheKey = `textVariant-${delay}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized delay for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  
  const variant = {
    hidden: {
      y: isMobile ? 25 : 40,  // Reduced distance for mobile
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 260,
        damping: isMobile ? 25 : 20,
        delay: optimizedDelay,
        duration: isMobile ? 0.5 : 0.7,
      },
    },
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Slide in animation with customizable direction and timing
 * Memoized for performance
 */
export const slideIn = (
  direction: "up" | "down" | "left" | "right", 
  type: string, 
  delay: number, 
  duration: number,
  isMobile: boolean = false
): Variants => {
  const cacheKey = `slideIn-${direction}-${type}-${delay}-${duration}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized values for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  const optimizedDuration = getOptimizedValue(duration, isMobile, 0.8, 0.4);
  
  // Calculate values based on direction
  let x = 0;
  let y = 0;
  
  const distance = isMobile ? 50 : 80; // Reduced distance for mobile
  
  if (direction === "left") x = -distance;
  if (direction === "right") x = distance;
  if (direction === "up") y = distance;
  if (direction === "down") y = -distance;
  
  const variant = {
    hidden: {
      x,
      y,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay: optimizedDelay,
        duration: optimizedDuration,
        ease: "easeOut",
      },
    },
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Zoom in animation for elements
 * Memoized for performance
 */
export const zoomIn = (delay: number, duration: number, isMobile: boolean = false): Variants => {
  const cacheKey = `zoomIn-${delay}-${duration}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized values for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  const optimizedDuration = getOptimizedValue(duration, isMobile, 0.8, 0.4);
  
  // Reduced scale values for mobile to improve performance
  const initialScale = isMobile ? 0.9 : 0.85;
  
  const variant = {
    hidden: {
      scale: initialScale,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: optimizedDelay,
        duration: optimizedDuration,
        ease: "easeOut",
      },
    },
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * SVG signature animation for decorative elements
 * Memoized for performance
 */
export const svgSignatureAnimation = (delay: number = 1, isMobile: boolean = false): Variants => {
  const cacheKey = `svgSignature-${delay}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized delay for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  
  // Shorter durations on mobile
  const drawDuration = isMobile ? 2 : 2.5;
  
  const variant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: optimizedDelay,
          type: "spring",
          duration: drawDuration,
          bounce: 0,
        },
        opacity: { 
          delay: optimizedDelay, 
          duration: isMobile ? 0.05 : 0.1 
        }
      }
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * SVG circle animation for decorative elements
 * Memoized for performance
 */
export const svgCircleAnimation = (delay: number = 0, isMobile: boolean = false): Variants => {
  const cacheKey = `svgCircle-${delay}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized delay for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  
  const variant = {
    hidden: { 
      scale: 0,
      opacity: 0 
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: optimizedDelay,
        duration: isMobile ? 0.8 : 1.2,
        ease: "easeOut"
      }
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * SVG decorative circle animation with pulsing effect
 * Memoized for performance
 */
export const svgDecorativeCircleAnimation = (delay: number = 0, opacity: number = 0.6, isMobile: boolean = false): Variants => {
  const cacheKey = `svgDecorativeCircle-${delay}-${opacity}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized delay for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  
  // Lower opacity on mobile for better performance
  const finalOpacity = isMobile ? Math.min(opacity * 0.8, 0.5) : opacity;
  
  const variant = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: finalOpacity,
      transition: {
        delay: optimizedDelay,
        duration: isMobile ? 0.8 : 1.2,
        ease: "easeOut"
      }
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Floating animation for decorative elements
 */
export const floatingAnimation = (
  amplitude: number = 10, 
  duration: number = 3,
  isMobile: boolean = false
) => {
  // Reduce amplitude and slow down animation on mobile
  const mobileAmplitude = Math.min(amplitude * 0.7, 5);
  const mobileDuration = duration * 1.2; // Slower on mobile to reduce CPU usage
  
  return {
    y: isMobile 
      ? [0, -mobileAmplitude, 0, mobileAmplitude, 0] 
      : [0, -amplitude, 0, amplitude, 0],
    transition: {
      duration: isMobile ? mobileDuration : duration,
      repeat: Infinity,
      ease: "easeInOut",
    }
  };
};

/**
 * Pulse animation for decorative elements
 */
export const pulseAnimation = (
  scale: number[] = [1, 1.05, 1],
  duration: number = 3,
  isMobile: boolean = false
) => {
  // Less dramatic scale on mobile
  const mobileScale = scale.map(s => {
    // Bring scale values closer to 1 on mobile
    return 1 + (s - 1) * 0.7;
  });
  
  return {
    scale: isMobile ? mobileScale : scale,
    transition: {
      duration: isMobile ? duration * 1.2 : duration, // Slower on mobile
      repeat: Infinity,
      ease: "easeInOut",
    }
  };
};

/**
 * Rotation animation for decorative elements
 */
export const rotationAnimation = (
  rotate: number[] = [0, 360],
  duration: number = 20,
  isMobile: boolean = false
) => {
  return {
    rotate: rotate,
    transition: {
      duration: isMobile ? duration * 1.5 : duration, // Slower on mobile
      repeat: Infinity,
      ease: "linear",
    }
  };
};

/**
 * Orbit animation for particles and decorative elements
 */
export const orbitAnimation = (
  radius: number = 20,
  duration: number = 10,
  isMobile: boolean = false
) => {
  // Reduce radius on mobile for better performance
  const optimizedRadius = isMobile ? Math.min(radius * 0.7, 15) : radius;
  // Slower on mobile to reduce CPU usage
  const optimizedDuration = isMobile ? duration * 1.3 : duration;
  
  const steps = 36; // Number of points in the orbit path
  const xValues = [];
  const yValues = [];
  
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI;
    xValues.push(Math.cos(angle) * optimizedRadius);
    yValues.push(Math.sin(angle) * optimizedRadius);
  }
  
  return {
    x: xValues,
    y: yValues,
    transition: {
      repeat: Infinity,
      duration: optimizedDuration,
      ease: "linear",
    }
  };
};

/**
 * Tech keyword animation for hero section
 */
export const techKeywordAnimation = (delay: number, y: string[] = ["0%", "-50%"], isMobile: boolean = false): Variants => {
  const cacheKey = `techKeyword-${delay}-${y.join("-")}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized delay for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  
  // Reduce distance on mobile for better performance
  const optimizedY = isMobile 
    ? [0, 10] // Smaller movement on mobile
    : [0, 20]; // Regular movement on desktop
  
  const variant = {
    hidden: { opacity: 0, y: optimizedY[1] },
    visible: { 
      opacity: isMobile ? 0.6 : 0.7, // Lower opacity on mobile
      y: 0,
      transition: {
        duration: isMobile ? 0.6 : 0.8, // Faster on mobile
        delay: optimizedDelay
      } 
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Background shape animation
 */
export const bgShapeAnimation = (delay: number = 0, opacity: number = 0.5, isMobile: boolean = false): Variants => {
  const cacheKey = `bgShape-${delay}-${opacity}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized values for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  const optimizedOpacity = isMobile ? Math.min(opacity * 0.7, 0.3) : opacity; // Lower opacity on mobile
  
  const variant = {
    hidden: { 
      opacity: 0,
      scale: 0.7
    },
    visible: { 
      opacity: optimizedOpacity,
      scale: 1,
      transition: {
        opacity: { duration: isMobile ? 0.8 : 1.2, delay: optimizedDelay },
        scale: { duration: isMobile ? 1 : 1.5, delay: optimizedDelay }
      } 
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Dropdown animation for popups and dropdowns 
 */
export const dropdownAnimation: Variants = {
  hidden: { 
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeInOut"
    }
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeInOut"
    }
  }
};

/**
 * Clears the variant cache to prevent memory leaks
 * Can be called when components unmount if needed
 */
export function clearAnimationCache(): void {
  variantCache.clear();
}