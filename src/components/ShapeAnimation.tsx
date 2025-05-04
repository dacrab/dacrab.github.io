"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, Transition } from "framer-motion";

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
  variant = "float"
}: ShapeAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: !loop, amount: 0.3 });
  const [isMounted, setIsMounted] = useState(false);
  
  // Only run animations on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Convert size to string with px if it's a number
  const shapeSize = typeof size === 'number' ? `${size}px` : size;
  
  // Swiss style easing functions
  const swissEase = [0.19, 1, 0.22, 1]; // Smooth
  const swissEaseCrisp = [0.17, 0.67, 0.83, 0.67]; // Crisp
  
  const baseTransition = {
    duration,
    delay,
    ease: swissEase,
    repeat: loop ? Infinity : 0,
    repeatType: loop ? "reverse" as const : undefined,
    repeatDelay: 1
  };
  
  // Animation variants based on animation type
  const getAnimationProps = () => {
    // Return empty animation properties for server-side rendering
    if (!isMounted) return { initial: {}, animate: {} };
    
    switch (variant) {
      case "float":
        return {
          initial: { y: 0 },
          animate: isInView ? { y: [0, -10, 0] } : { y: 0 },
          transition: {
            ...baseTransition,
            times: [0, 0.5, 1]
          }
        };
      case "rotate":
        return {
          initial: { rotate: 0 },
          animate: isInView ? { rotate: 360 } : { rotate: 0 },
          transition: {
            ...baseTransition,
            duration: duration * 3
          }
        };
      case "pulse":
        return {
          initial: { scale: 1 },
          animate: isInView ? { scale: [1, 1.05, 1] } : { scale: 1 },
          transition: {
            ...baseTransition,
            times: [0, 0.5, 1]
          }
        };
      case "draw":
        return {
          initial: { pathLength: 0, opacity: 0 },
          animate: isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
          transition: {
            pathLength: { duration, delay, ease: swissEaseCrisp },
            opacity: { duration: duration * 0.5, delay }
          }
        };
      case "path":
        return {
          initial: { pathOffset: 0 },
          animate: isInView ? { pathOffset: 1 } : { pathOffset: 0 },
          transition: {
            duration: duration * 2,
            delay,
            ease: swissEaseCrisp
          }
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
          transition: baseTransition
        };
    }
  };
  
  // SVG shape renderer
  const renderSvgShape = (svgPath: string) => {
    const pathTransition: Transition = {
      pathLength: { duration, delay, ease: swissEaseCrisp },
      opacity: { duration: duration * 0.5, delay }
    };
    
    return (
      <motion.svg
        ref={ref}
        width={shapeSize}
        height={shapeSize}
        viewBox="0 0 100 100"
        className={`inline-block ${className}`}
        style={{ willChange: "transform" }}
        initial={isMounted ? { opacity: 0 } : {}}
        animate={isMounted ? { opacity: 1 } : {}}
        transition={{ duration, delay }}
      >
        <motion.path
          d={svgPath}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={isMounted ? { pathLength: 0, opacity: 0 } : {}}
          animate={isMounted && isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={pathTransition}
        />
      </motion.svg>
    );
  };
  
  // Render different shapes based on type
  const renderShape = () => {
    const animProps = getAnimationProps();
    
    // Handle SVG drawing variants first
    if (variant === "draw") {
      switch (type) {
        case "line": return renderSvgShape("M10 50 L90 50");
        case "diagonal": return renderSvgShape("M10 10 L90 90");
        case "cross": return renderSvgShape("M10 10 L90 90 M10 90 L90 10");
      }
    }
    
    // Handle regular shapes
    switch (type) {
      case "square": {
        return (
          <motion.div
            ref={ref}
            className={`inline-block ${className}`}
            style={{ 
              width: shapeSize, 
              height: shapeSize, 
              backgroundColor: color,
              willChange: "transform"
            }}
            {...animProps}
          />
        );
      }
        
      case "circle": {
        return (
          <motion.div
            ref={ref}
            className={`inline-block rounded-full ${className}`}
            style={{ 
              width: shapeSize, 
              height: shapeSize, 
              backgroundColor: color,
              willChange: "transform"
            }}
            {...animProps}
          />
        );
      }
        
      case "triangle": {
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
              willChange: "transform"
            }}
            {...animProps}
          />
        );
      }
        
      case "line": {
        const lineWidth = typeof size === 'number' ? size : parseInt(size);
        return (
          <motion.div
            ref={ref}
            className={`inline-block ${className}`}
            style={{ 
              width: lineWidth, 
              height: strokeWidth, 
              backgroundColor: color,
              willChange: "transform"
            }}
            {...animProps}
          />
        );
      }
        
      case "diagonal": {
        return (
          <motion.div
            ref={ref}
            className={`inline-block relative ${className}`}
            style={{ width: shapeSize, height: shapeSize, willChange: "transform" }}
            {...animProps}
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
                transform: 'translateY(-50%) rotate(45deg)'
              }} 
            />
          </motion.div>
        );
      }
        
      case "cross": {
        return (
          <motion.div
            ref={ref}
            className={`inline-block relative ${className}`}
            style={{ width: shapeSize, height: shapeSize, willChange: "transform" }}
            {...animProps}
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
                transform: 'translateY(-50%) rotate(45deg)'
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
                transform: 'translateY(-50%) rotate(-45deg)'
              }} 
            />
          </motion.div>
        );
      }
        
      default:
        return null;
    }
  };
  
  return renderShape();
}