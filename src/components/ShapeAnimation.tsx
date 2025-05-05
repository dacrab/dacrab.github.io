"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, Transition } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export type ShapeType = "square" | "circle" | "triangle" | "line" | "diagonal" | "cross";
export type AnimationVariant = "float" | "rotate" | "pulse" | "draw" | "path";

interface ShapeAnimationProps {
  type: ShapeType;
  className?: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  loop?: boolean;
  variant?: AnimationVariant;
  disableOnMobile?: boolean;
  mobileOptimized?: boolean;
}

export default function ShapeAnimation({
  type,
  className = "",
  color = "var(--accent)",
  size = 100,
  strokeWidth = 2,
  delay = 0,
  duration = 0.8,
  loop = false,
  variant = "float",
  disableOnMobile = false,
  mobileOptimized = true
}: ShapeAnimationProps) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: !loop, amount: 0.3 });
  const [isMounted, setIsMounted] = useState(false);
  
  // Client-side only animations
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Configuration
  const shapeSize = typeof size === 'number' ? `${size}px` : size;
  const shouldDisableAnimation = isMobile && disableOnMobile;
  
  // Animation settings
  const swissEase = [0.19, 1, 0.22, 1]; // Smooth
  const swissEaseCrisp = [0.17, 0.67, 0.83, 0.67]; // Crisp
  
  // Mobile optimizations
  const optimizedDuration = isMobile && mobileOptimized ? duration * 0.6 : duration;
  const optimizedDelay = isMobile && mobileOptimized ? delay * 0.5 : delay;
  
  // Get appropriate animation variant based on device
  const effectiveVariant = shouldDisableAnimation ? "none" : 
    (isMobile && mobileOptimized) ? 
      (variant === "path" ? "draw" : variant === "rotate" ? "pulse" : variant) : 
      variant;
  
  // Base transition configuration
  const baseTransition = {
    duration: optimizedDuration,
    delay: optimizedDelay,
    ease: swissEase,
    repeat: !shouldDisableAnimation && loop ? (isMobile ? 2 : Infinity) : 0,
    repeatType: !shouldDisableAnimation && loop ? "reverse" as const : undefined,
    repeatDelay: isMobile ? 0.5 : 1
  };
  
  // Animation variants
  const animations = {
    none: {
      initial: { opacity: 1 },
      animate: { opacity: 1 }
    },
    float: {
      initial: { y: 0 },
      animate: isInView ? { y: [0, -10, 0] } : { y: 0 },
      transition: {
        ...baseTransition,
        times: [0, 0.5, 1]
      }
    },
    rotate: {
      initial: { rotate: 0 },
      animate: isInView ? { rotate: 360 } : { rotate: 0 },
      transition: {
        ...baseTransition,
        duration: optimizedDuration * (isMobile ? 2 : 3)
      }
    },
    pulse: {
      initial: { scale: 1 },
      animate: isInView ? { scale: [1, 1.05, 1] } : { scale: 1 },
      transition: {
        ...baseTransition,
        times: [0, 0.5, 1]
      }
    },
    draw: {
      initial: { pathLength: 0, opacity: 0 },
      animate: isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
      transition: {
        pathLength: { duration: optimizedDuration, delay: optimizedDelay, ease: swissEaseCrisp },
        opacity: { duration: optimizedDuration * 0.5, delay: optimizedDelay }
      }
    },
    path: {
      initial: { pathOffset: 0 },
      animate: isInView ? { pathOffset: 1 } : { pathOffset: 0 },
      transition: {
        duration: optimizedDuration * (isMobile ? 1.5 : 2),
        delay: optimizedDelay,
        ease: swissEaseCrisp
      }
    },
    default: {
      initial: { opacity: 0, scale: 0.9 },
      animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
      transition: baseTransition
    }
  };
  
  // Get animation properties
  const getAnimationProps = () => {
    if (!isMounted) return { initial: {}, animate: {} };
    return animations[effectiveVariant] || animations.default;
  };
  
  // SVG path definitions
  const svgPaths = {
    line: "M10 50 L90 50",
    diagonal: "M10 10 L90 90",
    cross: "M10 10 L90 90 M10 90 L90 10"
  };
  
  // SVG shape renderer
  const renderSvgShape = (type: "line" | "diagonal" | "cross") => {
    const pathTransition: Transition = {
      pathLength: { duration: optimizedDuration, delay: optimizedDelay, ease: swissEaseCrisp },
      opacity: { duration: optimizedDuration * 0.5, delay: optimizedDelay }
    };
    
    return (
      <motion.svg
        ref={ref}
        width={shapeSize}
        height={shapeSize}
        viewBox="0 0 100 100"
        className={`inline-block ${className}`}
        style={{ willChange: shouldDisableAnimation ? "auto" : "transform" }}
        initial={isMounted && !shouldDisableAnimation ? { opacity: 0 } : { opacity: 1 }}
        animate={isMounted && !shouldDisableAnimation ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: optimizedDuration, delay: optimizedDelay }}
      >
        <motion.path
          d={svgPaths[type]}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={isMounted && !shouldDisableAnimation ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
          animate={isMounted && !shouldDisableAnimation && isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={pathTransition}
        />
      </motion.svg>
    );
  };
  
  // Shape renderers
  const shapeRenderers = {
    square: () => (
      <motion.div
        ref={ref}
        className={`inline-block ${className}`}
        style={{ 
          width: shapeSize, 
          height: shapeSize, 
          backgroundColor: color,
          willChange: shouldDisableAnimation ? "auto" : "transform"
        }}
        {...getAnimationProps()}
      />
    ),
    
    circle: () => (
      <motion.div
        ref={ref}
        className={`inline-block rounded-full ${className}`}
        style={{ 
          width: shapeSize, 
          height: shapeSize, 
          backgroundColor: color,
          willChange: shouldDisableAnimation ? "auto" : "transform"
        }}
        {...getAnimationProps()}
      />
    ),
    
    triangle: () => {
      const triangleSize = typeof size === 'number' ? size : parseInt(size);
      return (
        <motion.div
          ref={ref}
          className={`inline-block ${className}`}
          style={{ 
            width: 0, 
            height: 0, 
            borderLeft: `${triangleSize / 2}px solid transparent`,
            borderRight: `${triangleSize / 2}px solid transparent`,
            borderBottom: `${triangleSize}px solid ${color}`,
            willChange: shouldDisableAnimation ? "auto" : "transform"
          }}
          {...getAnimationProps()}
        />
      );
    },
    
    line: () => {
      if (effectiveVariant === "draw") return renderSvgShape("line");
      
      const lineWidth = typeof size === 'number' ? size : parseInt(size);
      return (
        <motion.div
          ref={ref}
          className={`inline-block ${className}`}
          style={{ 
            width: lineWidth, 
            height: strokeWidth, 
            backgroundColor: color,
            willChange: shouldDisableAnimation ? "auto" : "transform"
          }}
          {...getAnimationProps()}
        />
      );
    },
    
    diagonal: () => {
      if (effectiveVariant === "draw") return renderSvgShape("diagonal");
      
      return (
        <motion.div
          ref={ref}
          className={`inline-block relative ${className}`}
          style={{ width: shapeSize, height: shapeSize, willChange: shouldDisableAnimation ? "auto" : "transform" }}
          {...getAnimationProps()}
        >
          <div 
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '100%',
              height: `${strokeWidth}px`,
              backgroundColor: color,
              transformOrigin: 'center',
              transform: 'rotate(45deg)'
            }}
          />
        </motion.div>
      );
    },
    
    cross: () => {
      if (effectiveVariant === "draw") return renderSvgShape("cross");
      
      return (
        <motion.div
          ref={ref}
          className={`inline-block relative ${className}`}
          style={{ width: shapeSize, height: shapeSize, willChange: shouldDisableAnimation ? "auto" : "transform" }}
          {...getAnimationProps()}
        >
          <div 
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '100%',
              height: `${strokeWidth}px`,
              backgroundColor: color,
              transformOrigin: 'center',
              transform: 'rotate(45deg)'
            }}
          />
          <div 
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '100%',
              height: `${strokeWidth}px`,
              backgroundColor: color,
              transformOrigin: 'center',
              transform: 'rotate(-45deg)'
            }}
          />
        </motion.div>
      );
    }
  };
  
  return shapeRenderers[type]?.() || null;
}