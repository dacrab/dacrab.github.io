"use client";

import { ReactNode, useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollSceneProps {
  children: ReactNode;
  depth?: number; // How intense the 3D effect should be (0-1)
  perspective?: number; // CSS perspective value
  className?: string;
  rotate?: boolean; // Whether to add rotation effects
  mouseTracking?: boolean; // Whether to track mouse for additional effects
}

export default function ScrollScene({
  children,
  depth = 0.5,
  perspective = 800,
  className = "",
  rotate = true,
  mouseTracking = true,
}: ScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Get scroll progress for transform effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  // Rotation values based on scroll
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    rotate ? [depth * 10, 0, -depth * 10] : [0, 0, 0]
  );
  
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    rotate ? [depth * -5, 0, depth * 5] : [0, 0, 0]
  );
  
  const translateZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [depth * -50, 0, depth * -50]
  );
  
  // Update dimensions on resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseTracking || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position as a percentage of the element's dimensions
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Normalize to range of -0.5 to 0.5 for rotation calculations
    setMousePosition({
      x: x - 0.5,
      y: y - 0.5,
    });
    
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  // Calculate combined rotation from scroll and mouse position
  const finalRotateX = isHovered && mouseTracking
    ? Number(rotateX.get()) - mousePosition.y * depth * 20
    : rotateX;
    
  const finalRotateY = isHovered && mouseTracking
    ? Number(rotateY.get()) + mousePosition.x * depth * 20
    : rotateY;
  
  return (
    <div
      ref={containerRef}
      className={`${className} relative`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: finalRotateX,
          rotateY: finalRotateY,
          translateZ,
          transformStyle: "preserve-3d",
          transition: isHovered ? "none" : "all 0.3s ease",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
} 