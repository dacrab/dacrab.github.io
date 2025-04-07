"use client";

import React, { ReactNode, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface GlowEffectProps {
  children: ReactNode;
  color?: string;
  size?: number; // 1 = normal, 2 = large, 0.5 = small
  intensity?: number; // 0-1 value for opacity
  pulseEffect?: boolean;
  followCursor?: boolean;
  className?: string;
  shape?: "circle" | "square" | "blob";
  mobileOptimized?: boolean; // Allow disabling optimization if needed
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
  mobileOptimized = true,
}: GlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  // Optimize for mobile - smaller size, reduced intensity & faster animations
  const optimizedSize = mobileOptimized && isMobile ? size * 0.7 : size;
  const optimizedIntensity = mobileOptimized && isMobile ? Math.min(intensity * 0.8, 0.4) : intensity;
  
  // Handle mouse move for glow effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !followCursor) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };
  
  // Set glow to center when not following cursor
  useEffect(() => {
    if (!followCursor && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({ 
        x: rect.width / 2, 
        y: rect.height / 2 
      });
    }
  }, [followCursor]);
  
  // Get shape styles based on the shape prop
  const getShapeStyles = () => {
    const baseStyle = {
      background: `radial-gradient(circle, var(--${color}) 0%, transparent 70%)`
    };
    
    switch (shape) {
      case "square":
        return { ...baseStyle, borderRadius: "10%" };
      case "blob":
        return baseStyle; // No border-radius - using SVG mask instead
      case "circle":
      default:
        return { ...baseStyle, borderRadius: "50%" };
    }
  };
  
  // Calculate optimized blur amount based on device
  const blurAmount = (mobileOptimized && isMobile) 
    ? Math.min(optimizedSize * 20, 30) // Cap blur at 30px on mobile
    : (shape === "blob" ? size * 40 : size * 30);
  
  // Skip complex blob shapes on mobile if optimized
  const shouldSkipBlob = mobileOptimized && isMobile && shape === "blob";
  const effectiveShape = shouldSkipBlob ? "circle" : shape;
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG for blob shape with animated morphing path - only on desktop */}
      {effectiveShape === "blob" && (
        <svg 
          width="0" 
          height="0" 
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <filter id="glow-blur">
              <feGaussianBlur stdDeviation={optimizedSize * 20} result="blur" />
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
                  duration: isMobile ? 15 : 12, // Slower on mobile to reduce CPU usage
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </mask>
          </defs>
        </svg>
      )}
      
      {/* Main glow effect */}
      <motion.div
        className="pointer-events-none absolute -z-10"
        animate={{
          opacity: isHovered ? optimizedIntensity : 0,
          scale: isHovered ? (pulseEffect ? [1, 1.1, 1] : 1) : 0.8,
          x: position.x - (optimizedSize * 100),
          y: position.y - (optimizedSize * 100),
        }}
        transition={{
          opacity: { duration: isMobile ? 0.4 : 0.3 },
          scale: {
            duration: pulseEffect ? (isMobile ? 3 : 2) : 0.3, // Slower pulse on mobile
            repeat: pulseEffect ? Infinity : 0,
            repeatType: "reverse",
          },
          x: { duration: followCursor ? (isMobile ? 0.2 : 0.1) : 0.3, ease: "easeOut" },
          y: { duration: followCursor ? (isMobile ? 0.2 : 0.1) : 0.3, ease: "easeOut" },
        }}
        style={{
          width: optimizedSize * 200,
          height: optimizedSize * 200,
          willChange: "transform, opacity",
          ...getShapeStyles(),
          filter: `blur(${blurAmount}px)`,
          maskImage: effectiveShape === "blob" ? "url(#blob-mask)" : "none",
          WebkitMaskImage: effectiveShape === "blob" ? "url(#blob-mask)" : "none",
        }}
      />
      
      {/* Extra blob layers for more organic feel - only rendered when needed */}
      {effectiveShape === "blob" && isHovered && (
        <>
          <motion.div
            className="pointer-events-none absolute -z-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: optimizedIntensity * 0.7,
              scale: pulseEffect ? [0.9, 1, 0.9] : 0.9,
              x: position.x - (optimizedSize * 90),
              y: position.y - (optimizedSize * 90),
            }}
            transition={{
              opacity: { duration: 0.4 },
              scale: {
                duration: pulseEffect ? (isMobile ? 4 : 3) : 0.3,
                repeat: pulseEffect ? Infinity : 0,
                repeatType: "reverse",
                delay: 0.1
              },
              x: { duration: followCursor ? (isMobile ? 0.25 : 0.15) : 0.4 },
              y: { duration: followCursor ? (isMobile ? 0.25 : 0.15) : 0.4 },
            }}
            style={{
              width: optimizedSize * 180,
              height: optimizedSize * 180,
              willChange: "transform, opacity",
              filter: `blur(${optimizedSize * 25}px)`,
              background: `radial-gradient(circle, var(--${color}) 0%, transparent 70%)`,
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              transform: "rotate(45deg)"
            }}
          />
          
          {/* Skip the third layer on mobile for performance */}
          {!isMobile && (
            <motion.div
              className="pointer-events-none absolute -z-10"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: optimizedIntensity * 0.5,
                scale: pulseEffect ? [1.1, 0.9, 1.1] : 1.1,
                x: position.x - (optimizedSize * 110),
                y: position.y - (optimizedSize * 110),
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
                width: optimizedSize * 220,
                height: optimizedSize * 220,
                willChange: "transform, opacity",
                filter: `blur(${optimizedSize * 35}px)`,
                background: `radial-gradient(circle, var(--${color}) 0%, transparent 70%)`,
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                transform: "rotate(-30deg)"
              }}
            />
          )}
        </>
      )}
      
      {/* Subtle background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        animate={{
          opacity: isHovered ? (isMobile ? 0.05 : 0.1) : 0,
        }}
        transition={{ duration: isMobile ? 0.6 : 0.5 }}
        style={{
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, var(--${color}-light) 0%, transparent 70%)`,
          filter: `blur(${isMobile ? 10 : 20}px)`,
        }}
      />
      
      {children}
    </motion.div>
  );
}