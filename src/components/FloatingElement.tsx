"use client";

import React, { ReactNode, useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface FloatingElementProps {
  children: ReactNode;
  intensity?: number; // 0.5 = subtle, 1 = medium, 2 = strong
  speed?: number; // 1 = normal, 2 = fast, 0.5 = slow
  hoverEffect?: boolean;
  className?: string;
}

export default function FloatingElement({
  children,
  intensity = 1,
  speed = 1,
  hoverEffect = true,
  className = "",
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoothed values for more natural movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  // Transform mouse position to rotation angles
  const rotateX = useTransform(
    smoothMouseY, 
    [0, elementSize.height],
    [intensity * 10, intensity * -10]
  );
  
  const rotateY = useTransform(
    smoothMouseX,
    [0, elementSize.width],
    [intensity * -10, intensity * 10]
  );
  
  useEffect(() => {
    if (!ref.current) return;
    
    // Update element size when component mounts or window resizes
    const updateSize = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setElementSize({ width, height });
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hoverEffect) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    if (!hoverEffect) return;
    
    mouseX.set(elementSize.width / 2);
    mouseY.set(elementSize.height / 2);
    setIsHovered(false);
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  return (
    <motion.div
      ref={ref}
      className={`relative will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{
        y: [0, intensity * 5, 0],
        x: [0, intensity * 2, 0],
        rotateZ: [0, intensity * 0.5, 0],
      }}
      transition={{
        duration: 6 / speed,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: hoverEffect ? rotateX : 0,
          rotateY: hoverEffect ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        {children}
        
        {/* Reflection/shadow effect for 3D depth */}
        {hoverEffect && isHovered && (
          <motion.div 
            className="absolute inset-0 rounded-inherit bg-accent/5 -z-10"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.2,
              y: intensity * 5,
              scale: 0.98,
            }}
            transition={{ duration: 0.2 }}
            style={{
              filter: "blur(10px)",
              borderRadius: "inherit",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
} 