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
  thickness = 3,
  position = "top",
  hideAtTop = true
}: ScrollIndicatorProps) {
  // Client-side only state
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Create spring animation for smooth scrolling
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Handle client-side only effects
  useEffect(() => {
    setMounted(true);
    
    if (hideAtTop) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      
      handleScroll(); // Initialize
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [hideAtTop]);
  
  // Return null during SSR and initial render
  if (!mounted) {
    return null;
  }
  
  // Consistent style properties to avoid hydration mismatches
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