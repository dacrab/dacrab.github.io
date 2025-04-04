"use client";

import React, { ReactNode, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface GlowEffectProps {
  children: ReactNode;
  color?: string;
  size?: number; // 1 = normal, 2 = large, 0.5 = small
  intensity?: number; // 0-1 value for opacity
  pulseEffect?: boolean;
  followCursor?: boolean;
  className?: string;
  shape?: "circle" | "square" | "blob";
}

export default function GlowEffect({
  children,
  color = "accent",
  size = 1,
  intensity = 0.5,
  pulseEffect = false,
  followCursor = true,
  className = "",
  shape = "circle",
}: GlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle mouse move for glow effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !followCursor) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setPosition({ x, y });
  };
  
  // Set glow to center when not following cursor
  useEffect(() => {
    if (!followCursor && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({ x: rect.width / 2, y: rect.height / 2 });
    }
  }, [followCursor]);
  
  // Get shape styles based on the shape prop
  const getShapeStyles = () => {
    switch (shape) {
      case "square":
        return {
          borderRadius: "10%",
          background: `radial-gradient(circle, var(--${color}) 0%, transparent 70%)`,
        };
      case "blob":
        return {
          // More extreme blob shape with multiple pseudo-random border radius values
          background: `radial-gradient(circle, var(--${color}) 0%, transparent 70%)`,
          // No border-radius here - we'll use the SVG mask instead
        };
      case "circle":
      default:
        return {
          borderRadius: "50%",
          background: `radial-gradient(circle, var(--${color}) 0%, transparent 70%)`,
        };
    }
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG for blob shape with animated morphing path */}
      {shape === "blob" && (
        <svg 
          width="0" 
          height="0" 
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <filter id="glow-blur">
              <feGaussianBlur stdDeviation={size * 20} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="atop" />
            </filter>
            
            <mask id="blob-mask">
              <motion.path
                fill="white"
                animate={{
                  d: [
                    "M60,10 C70,0 90,0 100,10 C110,20 110,40 100,50 C90,60 70,60 60,50 C50,40 50,20 60,10",
                    "M65,5 C80,0 95,5 100,15 C105,25 105,45 95,55 C85,60 65,55 60,45 C55,35 50,10 65,5",
                    "M55,15 C65,0 90,0 100,15 C115,25 110,45 95,55 C75,65 60,55 50,45 C45,30 45,30 55,15",
                    "M60,10 C70,0 90,0 100,10 C110,20 110,40 100,50 C90,60 70,60 60,50 C50,40 50,20 60,10"
                  ]
                }}
                transition={{
                  duration: 12,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </mask>
          </defs>
        </svg>
      )}
      
      {/* Glow effect */}
      <motion.div
        ref={glowRef}
        className="pointer-events-none absolute -z-10"
        animate={{
          opacity: isHovered ? intensity : 0,
          scale: isHovered ? (pulseEffect ? [1, 1.1, 1] : 1) : 0.8,
          x: position.x - (size * 100),
          y: position.y - (size * 100),
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: {
            duration: pulseEffect ? 2 : 0.3,
            repeat: pulseEffect ? Infinity : 0,
            repeatType: "reverse",
          },
          x: { duration: followCursor ? 0.1 : 0.3, ease: "easeOut" },
          y: { duration: followCursor ? 0.1 : 0.3, ease: "easeOut" },
        }}
        style={{
          width: size * 200,
          height: size * 200,
          willChange: "opacity, transform",
          ...getShapeStyles(),
          filter: shape === "blob" 
            ? `blur(${size * 40}px)` 
            : `blur(${size * 30}px)`,
          maskImage: shape === "blob" ? "url(#blob-mask)" : "none",
          WebkitMaskImage: shape === "blob" ? "url(#blob-mask)" : "none",
        }}
      />
      
      {/* Extra blob layers for more organic feel */}
      {shape === "blob" && isHovered && (
        <>
          <motion.div
            className="pointer-events-none absolute -z-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: intensity * 0.7,
              scale: pulseEffect ? [0.9, 1, 0.9] : 0.9,
              x: position.x - (size * 90),
              y: position.y - (size * 90),
            }}
            transition={{
              opacity: { duration: 0.4 },
              scale: {
                duration: pulseEffect ? 3 : 0.3,
                repeat: pulseEffect ? Infinity : 0,
                repeatType: "reverse",
                delay: 0.1
              },
              x: { duration: followCursor ? 0.15 : 0.4 },
              y: { duration: followCursor ? 0.15 : 0.4 },
            }}
            style={{
              width: size * 180,
              height: size * 180,
              filter: `blur(${size * 35}px)`,
              background: `radial-gradient(circle, var(--${color}) 0%, transparent 70%)`,
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              transform: "rotate(45deg)"
            }}
          />
          
          <motion.div
            className="pointer-events-none absolute -z-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: intensity * 0.5,
              scale: pulseEffect ? [1.1, 0.9, 1.1] : 1.1,
              x: position.x - (size * 110),
              y: position.y - (size * 110),
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: {
                duration: pulseEffect ? 4 : 0.3,
                repeat: pulseEffect ? Infinity : 0,
                repeatType: "reverse",
                delay: 0.2
              },
              x: { duration: followCursor ? 0.2 : 0.5 },
              y: { duration: followCursor ? 0.2 : 0.5 },
            }}
            style={{
              width: size * 220,
              height: size * 220,
              filter: `blur(${size * 45}px)`,
              background: `radial-gradient(circle, var(--${color}) 0%, transparent 70%)`,
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              transform: "rotate(-30deg)"
            }}
          />
        </>
      )}
      
      {/* Subtle background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, var(--${color}-light) 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      
      {children}
    </motion.div>
  );
} 