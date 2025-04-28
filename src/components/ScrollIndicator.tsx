"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useScroll } from "framer-motion";

interface ScrollIndicatorProps {
  className?: string;
  color?: string;
  thickness?: number;
  position?: "top" | "bottom";
  hideAtTop?: boolean;
}

export default function ScrollIndicator({
  className = "",
  color = "var(--accent)",
  thickness = 2,
  position = "top",
  hideAtTop = true
}: ScrollIndicatorProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Add smooth spring physics
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Handle top scroll check for visibility
  useEffect(() => {
    if (!hideAtTop) return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideAtTop]);
  
  return (
    <motion.div
      className={`fixed left-0 right-0 z-50 ${position === "top" ? "top-0" : "bottom-0"} ${className}`}
      style={{ 
        opacity: hideAtTop ? (isScrolled ? 1 : 0) : 1,
        transition: "opacity 0.3s ease-in-out"
      }}
    >
      <motion.div
        className="origin-left"
        style={{
          scaleX,
          height: thickness,
          backgroundColor: color
        }}
      />
    </motion.div>
  );
} 