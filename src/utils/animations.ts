import { Variants } from "framer-motion";

/**
 * Animation utility functions for consistent animations across the application
 * Optimized for performance with memoization and reduced object creation
 */

// Cache to prevent redundant variant recreation
const variantCache = new Map<string, Variants>();

// Common transition presets - centralized for consistency
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
  easeInOut: {
    type: "tween",
    ease: "easeInOut",
  },
  linear: {
    type: "tween",
    ease: "linear",
  },
  // Special cubic bezier for smooth reveals
  smoothReveal: {
    type: "tween",
    ease: [0.215, 0.61, 0.355, 1],
  },
};

// Common animation defaults
const defaults = {
  duration: 0.5,
  delay: 0,
  staggerDelay: 0.1,
  distance: {
    desktop: 50,
    mobile: 30,
  },
};

// Helper functions
// ---------------

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

/**
 * Get appropriate directional offset based on direction and device
 */
const getDirectionalOffset = (
  direction: "up" | "down" | "left" | "right" | "none", 
  distance: number, 
  isMobile: boolean
) => {
  // For "none" direction, return empty object
  if (direction === "none") return {};
  
  // Optimize distance for mobile
  const optimizedDistance = isMobile ? 
    getOptimizedValue(distance, true, 0.6, 30) : 
    distance;
  
  switch (direction) {
    case "up": return { y: optimizedDistance };
    case "down": return { y: -optimizedDistance };
    case "left": return { x: optimizedDistance };
    case "right": return { x: -optimizedDistance };
    default: return {};
  }
};

/**
 * Get transition based on device type
 */
const getTransition = (
  type: "spring" | "snappy" | "tween" | "smoothReveal" = "spring",
  duration: number,
  delay: number,
  isMobile: boolean
) => {
  const optimizedDuration = getOptimizedValue(duration, isMobile, 0.8, 0.4);
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  
  let baseTransition;
  
  switch (type) {
    case "spring":
      baseTransition = isMobile ? transitions.springMobile : transitions.spring;
      break;
    case "snappy":
      baseTransition = isMobile ? transitions.snappyMobile : transitions.snappy;
      break;
    case "smoothReveal":
      baseTransition = isMobile ? transitions.easeOut : transitions.smoothReveal;
      break;
    default:
      baseTransition = transitions.easeOut;
  }
  
  return {
    ...baseTransition,
    duration: optimizedDuration,
    delay: optimizedDelay,
  };
};

// Core Animation Variants
// ----------------------

/**
 * Fade in animation from a direction
 * Memoized for performance
 */
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "up", 
  delay: number = defaults.delay, 
  duration: number = defaults.duration,
  isMobile: boolean = false,
  distance: number = defaults.distance.desktop
): Variants => {
  const cacheKey = `fadeIn-${direction}-${delay}-${duration}-${isMobile}-${distance}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const directionOffset = getDirectionalOffset(direction, distance, isMobile);
  
  const variant = {
    hidden: {
      opacity: 0,
      ...directionOffset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: getTransition("spring", duration, delay, isMobile),
    },
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

/**
 * Scale animation for elements that should grow/shrink into view
 * Memoized for performance
 */
export const scaleIn = (
  delay: number = defaults.delay, 
  duration: number = defaults.duration, 
  isMobile: boolean = false
): Variants => {
  const cacheKey = `scaleIn-${delay}-${duration}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  const variant = {
    hidden: { 
      opacity: 0, 
      scale: isMobile ? 0.9 : 0.8, // Less scale for mobile for better performance
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: getTransition("snappy", duration, delay, isMobile),
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
  staggerChildren: number = defaults.staggerDelay, 
  delayChildren: number = defaults.delay,
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
 * Creates a reveal animation for sections or large elements
 * Memoized for performance
 */
export const revealSection = (delay: number = defaults.delay, isMobile: boolean = false): Variants => {
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
 * Animation for card elements with hover effects
 * Memoized for performance
 */
export const cardAnimation = (delay: number = defaults.delay, isMobile: boolean = false): Variants => {
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

// Specialized Animations
// ---------------------

/**
 * SVG path animation for drawing effects
 * Memoized for performance
 */
export const svgPathAnimation = (
  delay: number = defaults.delay, 
  duration: number = 2, 
  isMobile: boolean = false
): Variants => {
  const cacheKey = `svgPath-${delay}-${duration}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized values
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  const optimizedDuration = getOptimizedValue(duration, isMobile, 0.8, 1.5);
  
  const variant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: optimizedDelay,
          type: "spring",
          duration: optimizedDuration,
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
 * SVG shape animation for circles, rectangles, etc.
 * Memoized for performance
 */
export const svgShapeAnimation = (
  delay: number = defaults.delay, 
  duration: number = 1.2, 
  opacity: number = 1,
  isMobile: boolean = false
): Variants => {
  const cacheKey = `svgShape-${delay}-${duration}-${opacity}-${isMobile}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey)!;
  }
  
  // Get optimized values
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  const optimizedDuration = getOptimizedValue(duration, isMobile, 0.8, 0.8);
  const finalOpacity = isMobile ? Math.min(opacity * 0.8, 0.8) : opacity;
  
  const variant = {
    hidden: { 
      scale: 0, 
      opacity: 0 
    },
    visible: {
      scale: 1,
      opacity: finalOpacity,
      transition: {
        delay: optimizedDelay,
        duration: optimizedDuration,
        ease: "easeOut"
      }
    }
  };
  
  variantCache.set(cacheKey, variant);
  return variant;
};

// Continuous Animations (for infinite effects)
// -------------------------------------------

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

// Dropdown and UI component animations
// ----------------------------------

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

// Specialized Text Animations
// --------------------------

/**
 * Centralized emoji animations for consistent effects across components
 * Memoized for performance and optimized for mobile
 */
export const emojiAnimation = (
  animation: "wave" | "bounce" | "pulse" | "spin" | "float" | "none" = "wave",
  delay: number = defaults.delay, 
  duration: number = defaults.duration,
  isMobile: boolean = false
): { 
  animate: Record<string, unknown>; 
  transition: Record<string, unknown>; 
  className: string;
} => {
  const cacheKey = `emojiAnimation-${animation}-${delay}-${duration}-${isMobile}`;
  
  // Basic result structure for "none" animation
  const baseResult = {
    animate: {},
    transition: {},
    className: "inline-block"
  };
  
  if (animation === "none") return baseResult;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey) as unknown as { 
      animate: Record<string, unknown>; 
      transition: Record<string, unknown>; 
      className: string;
    };
  }
  
  // Get optimized values for mobile
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  
  let result;
  
  // Mobile optimizations - simpler animations for better performance
  if (isMobile) {
    switch (animation) {
      case "wave":
        result = {
          animate: { rotate: [0, 5, 0] },
          transition: {
            repeat: Infinity,
            repeatDelay: 5,
            duration: 0.8,
            delay: optimizedDelay,
            ease: "easeInOut",
          },
          className: "inline-block origin-bottom-right"
        };
        break;
      case "bounce":
        result = {
          animate: { y: [0, -3, 0] },
          transition: {
            repeat: Infinity,
            repeatDelay: 4,
            duration: 0.5,
            delay: optimizedDelay,
            ease: "easeOut",
          },
          className: "inline-block"
        };
        break;
      case "pulse":
        result = {
          animate: { scale: [1, 1.1, 1] },
          transition: {
            repeat: Infinity,
            repeatDelay: 3,
            duration: 0.5,
            delay: optimizedDelay,
            ease: "easeInOut",
          },
          className: "inline-block"
        };
        break;
      // Simplify or disable complex animations on mobile
      case "spin":
      case "float":
      default:
        result = baseResult;
        break;
    }
  } else {
    // Full animations for desktop
    switch (animation) {
      case "wave":
        result = {
          animate: { rotate: [0, 15, 5, 15, 0, -5, 0] },
          transition: {
            repeat: Infinity,
            repeatDelay: 3,
            duration: 1.5,
            delay: optimizedDelay,
            ease: [0.215, 0.61, 0.355, 1],
            times: [0, 0.2, 0.3, 0.4, 0.6, 0.8, 1]
          },
          className: "inline-block origin-bottom-right"
        };
        break;
      case "bounce":
        result = {
          animate: { y: [0, -10, 0] },
          transition: {
            repeat: Infinity,
            repeatDelay: 2,
            duration: 0.8,
            delay: optimizedDelay,
            ease: "easeOut",
          },
          className: "inline-block"
        };
        break;
      case "pulse":
        result = {
          animate: { scale: [1, 1.2, 1] },
          transition: {
            repeat: Infinity,
            repeatDelay: 2.5,
            duration: 0.7,
            delay: optimizedDelay,
            ease: "easeInOut",
          },
          className: "inline-block"
        };
        break;
      case "spin":
        result = {
          animate: { rotate: [0, 360] },
          transition: {
            repeat: Infinity,
            repeatDelay: 3,
            duration: 1.2,
            delay: optimizedDelay,
            ease: "linear",
          },
          className: "inline-block"
        };
        break;
      case "float":
        result = {
          animate: { y: [0, -5, 0, 5, 0] },
          transition: {
            repeat: Infinity,
            duration: 4,
            delay: optimizedDelay,
            ease: "easeInOut",
          },
          className: "inline-block"
        };
        break;
      default:
        result = baseResult;
        break;
    }
  }
  
  variantCache.set(cacheKey, result as unknown as Variants);
  return result as { 
    animate: Record<string, unknown>; 
    transition: Record<string, unknown>; 
    className: string;
  };
};

/**
 * Specialized text animation variants for different text effects
 * Memoized for performance and optimized for mobile
 */
export const textAnimation = (
  variant: "reveal" | "split" | "char-by-char" | "typewriter" | "gradient",
  text: string,
  delay: number = defaults.delay,
  duration: number = defaults.duration,
  isMobile: boolean = false,
  isInView: boolean = true
): {
  containerProps: Record<string, unknown>;
  itemProps?: Record<string, unknown>;
  additionalProps?: Record<string, unknown>;
} => {
  const cacheKey = `textAnimation-${variant}-${text.length}-${delay}-${duration}-${isMobile}-${isInView}`;
  
  if (variantCache.has(cacheKey)) {
    return variantCache.get(cacheKey) as unknown as {
      containerProps: Record<string, unknown>;
      itemProps?: Record<string, unknown>;
      additionalProps?: Record<string, unknown>;
    };
  }
  
  // Get optimized values
  const optimizedDuration = getOptimizedValue(duration, isMobile, 0.6, 0.3);
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.5);
  
  let result;
  
  switch (variant) {
    case "reveal":
      result = {
        containerProps: {
          initial: { y: isMobile ? "50%" : "100%", opacity: 0 },
          animate: isInView 
            ? { y: "0%", opacity: 1 } 
            : { y: isMobile ? "50%" : "100%", opacity: 0 },
          transition: {
            duration: optimizedDuration,
            delay: optimizedDelay,
            ease: isMobile ? "easeOut" : [0.215, 0.61, 0.355, 1]
          },
          style: { willChange: "transform, opacity" }
        }
      };
      break;
      
    case "char-by-char":
      result = {
        containerProps: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3, delay: optimizedDelay }
        },
        itemProps: {
          initial: { clipPath: "inset(0 100% 0 0)" },
          animate: isInView ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" },
          transition: {
            duration: optimizedDuration,
            delay: optimizedDelay, // The component will add staggered delays
            ease: isMobile ? "easeOut" : [0.215, 0.61, 0.355, 1]
          },
          style: { willChange: "clip-path" }
        }
      };
      break;
      
    case "split":
      result = {
        containerProps: {
          initial: { opacity: 1 },
          animate: { opacity: 1 }
        },
        itemProps: {
          initial: { opacity: 0, y: isMobile ? 15 : 20, display: "inline-block" },
          animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 15 : 20 },
          transition: {
            duration: optimizedDuration,
            delay: optimizedDelay, // The component will add staggered delays
            ease: isMobile ? "easeOut" : [0.215, 0.61, 0.355, 1]
          },
          style: { willChange: "transform, opacity" }
        }
      };
      break;
      
    case "typewriter":
      if (isMobile && text.length > 50) {
        // Static reveal for long text on mobile
        result = {
          containerProps: {
            initial: { opacity: 0 },
            animate: isInView ? { opacity: 1 } : { opacity: 0 },
            transition: {
              duration: 0.4,
              delay: optimizedDelay,
            },
            className: "whitespace-pre-line"
          }
        };
      } else {
        const typingSpeed = isMobile 
          ? optimizedDuration * text.length * 0.03
          : duration * text.length * 0.08;
          
        result = {
          containerProps: {
            initial: { width: "0%" },
            animate: isInView ? { width: "100%" } : { width: "0%" },
            transition: {
              duration: typingSpeed,
              delay: optimizedDelay,
              ease: "linear"
            },
            className: "whitespace-nowrap",
            style: { willChange: "width" }
          },
          additionalProps: {
            cursor: {
              animate: { opacity: [1, 0, 1] },
              transition: { 
                repeat: Infinity, 
                duration: isMobile ? 1 : 0.8 
              },
              style: { willChange: "opacity" }
            }
          }
        };
      }
      break;
      
    case "gradient":
      if (isMobile) {
        // Static gradient for mobile
        result = {
          containerProps: {
            initial: { opacity: 0 },
            animate: isInView ? { opacity: 1 } : { opacity: 0 },
            transition: {
              duration: optimizedDuration,
              delay: optimizedDelay,
            },
            className: "bg-clip-text text-transparent bg-gradient-to-r from-accent via-gradient-2 to-gradient-4"
          }
        };
      } else {
        // Animated gradient for desktop
        const gradientDuration = duration * 5;
        
        result = {
          containerProps: {
            initial: { backgroundPosition: "0% 50%" },
            animate: isInView 
              ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } 
              : { backgroundPosition: "0% 50%" },
            transition: {
              duration: gradientDuration,
              delay: optimizedDelay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            },
            className: "bg-clip-text text-transparent bg-gradient-to-r from-accent via-gradient-2 to-gradient-4 bg-[size:300%]",
            style: { willChange: "background-position" }
          }
        };
      }
      break;
      
    default:
      result = {
        containerProps: {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1 } : { opacity: 0 },
          transition: {
            duration: optimizedDuration,
            delay: optimizedDelay
          }
        }
      };
  }
  
  variantCache.set(cacheKey, result as unknown as Variants);
  return result as {
    containerProps: Record<string, unknown>;
    itemProps?: Record<string, unknown>;
    additionalProps?: Record<string, unknown>;
  };
};

/**
 * Clears the variant cache to prevent memory leaks
 * Can be called when components unmount if needed
 */
export function clearAnimationCache(): void {
  variantCache.clear();
}
