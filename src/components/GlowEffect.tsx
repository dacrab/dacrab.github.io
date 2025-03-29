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
}

export default function GlowEffect({
  children,
  color = "accent",
  size = 1,
  intensity = 0.5,
  pulseEffect = false,
  followCursor = true,
  className = "",
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
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
          borderRadius: "50%",
          background: `radial-gradient(circle, var(--${color}) 0%, transparent 70%)`,
          filter: `blur(${size * 30}px)`,
          willChange: "opacity, transform",
        }}
      />
      
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