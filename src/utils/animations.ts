import { Variants, Transition } from "framer-motion";

// Animation utility functions for consistent, optimized animations

const variantCache = new Map<string, unknown>();

type CubicBezier = [number, number, number, number];

const customEaseOut: CubicBezier = [0, 0, 0.2, 1];
const smoothRevealCurve: CubicBezier = [0.215, 0.61, 0.355, 1];

const transitions: { [key: string]: Transition } = {
  spring: { type: "spring", stiffness: 260, damping: 20 },
  springMobile: { type: "spring", stiffness: 200, damping: 25 },
  snappy: { type: "spring", stiffness: 320, damping: 30 },
  snappyMobile: { type: "spring", stiffness: 250, damping: 35 },
  easeOut: { type: "tween", ease: customEaseOut },
  smoothReveal: { type: "tween", ease: smoothRevealCurve },
};

const defaults = {
  duration: 0.5,
  delay: 0,
  staggerDelay: 0.1,
  distance: { desktop: 50, mobile: 30 },
};

export const getOptimizedValue = (
  value: number,
  isMobile: boolean,
  factor = 0.7,
  maxValue?: number
): number => {
  if (!isMobile) return value;
  const optimized = value * factor;
  return maxValue !== undefined ? Math.min(optimized, maxValue) : optimized;
};

const getDirectionalOffset = (
  direction: "up" | "down" | "left" | "right" | "none",
  distance: number,
  isMobile: boolean
) => {
  if (direction === "none") return {};
  const d = isMobile ? getOptimizedValue(distance, true, 0.6, 30) : distance;
  if (direction === "up") return { y: d };
  if (direction === "down") return { y: -d };
  if (direction === "left") return { x: d };
  if (direction === "right") return { x: -d };
  return {};
};

const getTransition = (
  type: "spring" | "snappy" | "tween" | "smoothReveal" = "spring",
  duration: number,
  delay: number,
  isMobile: boolean
): Transition => {
  const optimizedDuration = getOptimizedValue(duration, isMobile, 0.8, 0.4);
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.7);
  let base;
  if (type === "spring") base = isMobile ? transitions.springMobile : transitions.spring;
  else if (type === "snappy") base = isMobile ? transitions.snappyMobile : transitions.snappy;
  else if (type === "smoothReveal") base = isMobile ? transitions.easeOut : transitions.smoothReveal;
  else base = transitions.easeOut;
  return { ...base, duration: optimizedDuration, delay: optimizedDelay };
};

export const fadeIn = (
  direction: "up" | "down" | "left" | "right" | "none" = "up",
  delay: number = defaults.delay,
  duration: number = defaults.duration,
  isMobile: boolean = false,
  distance: number = defaults.distance.desktop
): Variants => {
  const key = `fadeIn-${direction}-${delay}-${duration}-${isMobile}-${distance}`;
  if (variantCache.has(key)) return variantCache.get(key) as Variants;
  const variant = {
    hidden: { opacity: 0, ...getDirectionalOffset(direction, distance, isMobile) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: getTransition("spring", duration, delay, isMobile),
    },
  };
  variantCache.set(key, variant);
  return variant;
};

export const scaleIn = (
  delay: number = defaults.delay,
  duration: number = defaults.duration,
  isMobile: boolean = false
): Variants => {
  const key = `scaleIn-${delay}-${duration}-${isMobile}`;
  if (variantCache.has(key)) return variantCache.get(key) as Variants;
  const variant = {
    hidden: { opacity: 0, scale: isMobile ? 0.9 : 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: getTransition("snappy", duration, delay, isMobile),
    },
  };
  variantCache.set(key, variant);
  return variant;
};

export const staggerContainer = (
  staggerChildren: number = defaults.staggerDelay,
  delayChildren: number = defaults.delay,
  isMobile: boolean = false
): Variants => {
  const key = `staggerContainer-${staggerChildren}-${delayChildren}-${isMobile}`;
  if (variantCache.has(key)) return variantCache.get(key) as Variants;
  const variant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: getOptimizedValue(staggerChildren, isMobile, 0.6, 0.05),
        delayChildren: getOptimizedValue(delayChildren, isMobile, 0.7),
      },
    },
  };
  variantCache.set(key, variant);
  return variant;
};

export const revealSection = (
  delay: number = defaults.delay,
  isMobile: boolean = false
): Variants => {
  const key = `revealSection-${delay}-${isMobile}`;
  if (variantCache.has(key)) return variantCache.get(key) as Variants;
  const variant = {
    hidden: { opacity: 0, y: isMobile ? 20 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...(isMobile ? transitions.springMobile : transitions.spring),
        delay: getOptimizedValue(delay, isMobile, 0.7),
        duration: isMobile ? 0.5 : 0.7,
      },
    },
  };
  variantCache.set(key, variant);
  return variant;
};

export const cardAnimation = (
  delay: number = defaults.delay,
  isMobile: boolean = false
): Variants => {
  const key = `cardAnimation-${delay}-${isMobile}`;
  if (variantCache.has(key)) return variantCache.get(key) as Variants;
  const variant = {
    hidden: {
      opacity: 0,
      y: isMobile ? 15 : 25,
      scale: isMobile ? 0.95 : 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ...(isMobile ? transitions.springMobile : transitions.spring),
        delay: getOptimizedValue(delay, isMobile, 0.7),
        duration: isMobile ? 0.5 : 0.7,
      },
    },
    hover: isMobile
      ? { y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", transition: { duration: 0.3 } }
      : { y: -10, scale: 1.03, boxShadow: "0 20px 30px rgba(0,0,0,0.15)", transition: { duration: 0.4 } },
  };
  variantCache.set(key, variant);
  return variant;
};

export const svgPathAnimation = (
  delay: number = defaults.delay,
  duration: number = 2,
  isMobile: boolean = false
): Variants => {
  const key = `svgPath-${delay}-${duration}-${isMobile}`;
  if (variantCache.has(key)) return variantCache.get(key) as Variants;
  const variant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: getOptimizedValue(delay, isMobile, 0.7),
          type: "spring" as const,
          duration: getOptimizedValue(duration, isMobile, 0.8, 1.5),
          bounce: 0,
        },
        opacity: {
          delay: getOptimizedValue(delay, isMobile, 0.7),
          duration: isMobile ? 0.05 : 0.1,
        },
      },
    },
  };
  variantCache.set(key, variant);
  return variant;
};

export const svgShapeAnimation = (
  delay: number = defaults.delay,
  duration: number = 1.2,
  opacity: number = 1,
  isMobile: boolean = false
): Variants => {
  const key = `svgShape-${delay}-${duration}-${opacity}-${isMobile}`;
  if (variantCache.has(key)) return variantCache.get(key) as Variants;

  const transition: Transition = {
    delay: getOptimizedValue(delay, isMobile, 0.7),
    duration: getOptimizedValue(duration, isMobile, 0.8, 0.8),
    ease: "easeOut",
  };

  const variant = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: isMobile ? Math.min(opacity * 0.8, 0.8) : opacity,
      transition,
    },
  };
  variantCache.set(key, variant);
  return variant;
};

export const floatingAnimation = (
  amplitude: number = 10,
  duration: number = 3,
  isMobile: boolean = false
) => ({
  y: isMobile
    ? [0, -Math.min(amplitude * 0.7, 5), 0, Math.min(amplitude * 0.7, 5), 0]
    : [0, -amplitude, 0, amplitude, 0],
  transition: {
    duration: isMobile ? duration * 1.2 : duration,
    repeat: Infinity,
    ease: "easeInOut",
  },
});

export const pulseAnimation = (
  scale: number[] = [1, 1.05, 1],
  duration: number = 3,
  isMobile: boolean = false
) => ({
  scale: isMobile ? scale.map(s => 1 + (s - 1) * 0.7) : scale,
  transition: {
    duration: isMobile ? duration * 1.2 : duration,
    repeat: Infinity,
    ease: "easeInOut",
  },
});

export const rotationAnimation = (
  rotate: number[] = [0, 360],
  duration: number = 20,
  isMobile: boolean = false
) => ({
  rotate,
  transition: {
    duration: isMobile ? duration * 1.5 : duration,
    repeat: Infinity,
    ease: "linear",
  },
});

export const dropdownAnimation: Variants = {
  hidden: {
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: { duration: 0.15, ease: "easeInOut" },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -5,
    scale: 0.95,
    transition: { duration: 0.15, ease: "easeInOut" },
  },
};

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
  const key = `emojiAnimation-${animation}-${delay}-${duration}-${isMobile}`;
  if (animation === "none") return { animate: {}, transition: {}, className: "inline-block" };
  if (variantCache.has(key)) return variantCache.get(key) as unknown as { animate: Record<string, unknown>; transition: Record<string, unknown>; className: string };

  const d = getOptimizedValue(delay, isMobile, 0.7);
  let result: unknown;
  if (isMobile) {
    if (animation === "wave")
      result = {
        animate: { rotate: [0, 5, 0] },
        transition: { repeat: Infinity, repeatDelay: 5, duration: 0.8, delay: d, ease: "easeInOut" },
        className: "inline-block origin-bottom-right",
      };
    else if (animation === "bounce")
      result = {
        animate: { y: [0, -3, 0] },
        transition: { repeat: Infinity, repeatDelay: 4, duration: 0.5, delay: d, ease: "easeOut" },
        className: "inline-block",
      };
    else if (animation === "pulse")
      result = {
        animate: { scale: [1, 1.1, 1] },
        transition: { repeat: Infinity, repeatDelay: 3, duration: 0.5, delay: d, ease: "easeInOut" },
        className: "inline-block",
      };
    else result = { animate: {}, transition: {}, className: "inline-block" };
  } else {
    if (animation === "wave")
      result = {
        animate: { rotate: [0, 15, 5, 15, 0, -5, 0] },
        transition: {
          repeat: Infinity,
          repeatDelay: 3,
          duration: 1.5,
          delay: d,
          ease: smoothRevealCurve,
          times: [0, 0.2, 0.3, 0.4, 0.6, 0.8, 1],
        },
        className: "inline-block origin-bottom-right",
      };
    else if (animation === "bounce")
      result = {
        animate: { y: [0, -10, 0] },
        transition: { repeat: Infinity, repeatDelay: 2, duration: 0.8, delay: d, ease: "easeOut" },
        className: "inline-block",
      };
    else if (animation === "pulse")
      result = {
        animate: { scale: [1, 1.2, 1] },
        transition: { repeat: Infinity, repeatDelay: 2.5, duration: 0.7, delay: d, ease: "easeInOut" },
        className: "inline-block",
      };
    else if (animation === "spin")
      result = {
        animate: { rotate: [0, 360] },
        transition: { repeat: Infinity, repeatDelay: 3, duration: 1.2, delay: d, ease: "linear" },
        className: "inline-block",
      };
    else if (animation === "float")
      result = {
        animate: { y: [0, -5, 0, 5, 0] },
        transition: { repeat: Infinity, duration: 4, delay: d, ease: "easeInOut" },
        className: "inline-block",
      };
    else result = { animate: {}, transition: {}, className: "inline-block" };
  }
  variantCache.set(key, result as unknown as { animate: Record<string, unknown>; transition: Record<string, unknown>; className: string });
  return result as unknown as { animate: Record<string, unknown>; transition: Record<string, unknown>; className: string };
};

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
  const key = `textAnimation-${variant}-${text.length}-${delay}-${duration}-${isMobile}-${isInView}`;
  if (variantCache.has(key)) return variantCache.get(key) as unknown as {
    containerProps: Record<string, unknown>;
    itemProps?: Record<string, unknown>;
    additionalProps?: Record<string, unknown>;
  };
  const optimizedDuration = getOptimizedValue(duration, isMobile, 0.6, 0.3);
  const optimizedDelay = getOptimizedValue(delay, isMobile, 0.5);

  let result: unknown;
  if (variant === "reveal") {
    result = {
      containerProps: {
        initial: { y: isMobile ? "50%" : "100%", opacity: 0 },
        animate: isInView ? { y: "0%", opacity: 1 } : { y: isMobile ? "50%" : "100%", opacity: 0 },
        transition: {
          duration: optimizedDuration,
          delay: optimizedDelay,
          ease: isMobile ? "easeOut" : smoothRevealCurve,
        },
        style: { willChange: "transform, opacity" },
      },
    };
  } else if (variant === "char-by-char") {
    result = {
      containerProps: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3, delay: optimizedDelay },
      },
      itemProps: {
        initial: { clipPath: "inset(0 100% 0 0)" },
        animate: isInView ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" },
        transition: {
          duration: optimizedDuration,
          delay: optimizedDelay,
          ease: isMobile ? "easeOut" : smoothRevealCurve,
        },
        style: { willChange: "clip-path" },
      },
    };
  } else if (variant === "split") {
    result = {
      containerProps: { initial: { opacity: 1 }, animate: { opacity: 1 } },
      itemProps: {
        initial: { opacity: 0, y: isMobile ? 15 : 20, display: "inline-block" },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 15 : 20 },
        transition: {
          duration: optimizedDuration,
          delay: optimizedDelay,
          ease: isMobile ? "easeOut" : smoothRevealCurve,
        },
        style: { willChange: "transform, opacity" },
      },
    };
  } else if (variant === "typewriter") {
    if (isMobile && text.length > 50) {
      result = {
        containerProps: {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.4, delay: optimizedDelay },
          className: "whitespace-pre-line",
        },
      };
    } else {
      const typingSpeed = (isMobile ? optimizedDuration * 0.03 : duration * 0.08) * text.length;
      result = {
        containerProps: {
          initial: { width: "0%" },
          animate: isInView ? { width: "100%" } : { width: "0%" },
          transition: { duration: typingSpeed, delay: optimizedDelay, ease: "linear" },
          className: "whitespace-nowrap",
          style: { willChange: "width" },
        },
        additionalProps: {
          cursor: {
            animate: { opacity: [1, 0, 1] },
            transition: { repeat: Infinity, duration: isMobile ? 1 : 0.8 },
            style: { willChange: "opacity" },
          },
        },
      };
    }
  } else if (variant === "gradient") {
    if (isMobile) {
      result = {
        containerProps: {
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: optimizedDuration, delay: optimizedDelay },
          className: "bg-clip-text text-transparent bg-gradient-to-r from-accent via-gradient-2 to-gradient-4",
        },
      };
    } else {
      result = {
        containerProps: {
          initial: { backgroundPosition: "0% 50%" },
          animate: isInView
            ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
            : { backgroundPosition: "0% 50%" },
          transition: {
            duration: duration * 5,
            delay: optimizedDelay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          },
          className:
            "bg-clip-text text-transparent bg-gradient-to-r from-accent via-gradient-2 to-gradient-4 bg-[size:300%]",
          style: { willChange: "background-position" },
        },
      };
    }
  } else {
    result = {
      containerProps: {
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : { opacity: 0 },
        transition: { duration: optimizedDuration, delay: optimizedDelay },
      },
    };
  }
  variantCache.set(key, result as unknown as {
    containerProps: Record<string, unknown>;
    itemProps?: Record<string, unknown>;
    additionalProps?: Record<string, unknown>;
  });
  return result as unknown as {
    containerProps: Record<string, unknown>;
    itemProps?: Record<string, unknown>;
    additionalProps?: Record<string, unknown>;
  };
};

export function clearAnimationCache(): void {
  variantCache.clear();
}
