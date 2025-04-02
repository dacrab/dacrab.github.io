"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LogoProps {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  showFullName?: boolean;
}

export default function Logo({ onClick, className = "", size = "md", showFullName = false }: LogoProps) {
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    setMounted(true);
    // Get initial window width
    setWindowWidth(window.innerWidth);
    
    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine if we should show the full name
  const shouldShowFullName = showFullName && windowWidth >= 1024; // Only on large screens
  
  // Size mapping
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };
  
  const logoVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    hover: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: (custom: number) => ({
      y: [0, -5, 0],
      color: "var(--accent)",
      transition: {
        duration: 0.5,
        delay: custom * 0.05
      }
    })
  };
  
  const accentVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        delay: 0.7
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5
      }
    }
  };
  
  if (!mounted) return null;
  
  return (
    <motion.a 
      href="#home" 
      onClick={onClick}
      className={`font-bold relative inline-flex items-center ${sizeClasses[size]} ${className}`}
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative overflow-hidden">
        <div className="flex items-baseline">
          {/* VK letter mark with animation */}
          <motion.span 
            className="text-foreground font-extrabold"
            variants={letterVariants}
            custom={0}
          >
            V
          </motion.span>
          <motion.span 
            className="text-foreground font-extrabold"
            variants={letterVariants}
            custom={1}
          >
            K
          </motion.span>
          
          {/* Accent dot */}
          <motion.span 
            className="text-accent ml-0.5 absolute -top-0.5 -right-2"
            variants={accentVariants}
          >
            .
          </motion.span>
        </div>
        
        {/* Subtle glow effect */}
        <motion.div 
          className="absolute inset-0 bg-accent/10 blur-xl rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* First name with letter animation */}
      <div className="ml-2 flex items-baseline">
        <div className="flex">
          {['V', 'a', 'g', 'g', 'e', 'l', 'i', 's'].map((letter, i) => (
            <motion.span
              key={`first-${letter}-${i}`}
              className="inline-block"
              variants={letterVariants}
              custom={i + 3}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        
        {/* Last name - only shown on larger screens if requested */}
        {shouldShowFullName && (
          <>
            <motion.span
              className="mx-1 text-accent/60"
              variants={letterVariants}
              custom={11}
            >
              &nbsp;
            </motion.span>
            <div className="flex">
              {['K', 'a', 'v', 'o', 'u', 'r', 'a', 's'].map((letter, i) => (
                <motion.span
                  key={`last-${letter}-${i}`}
                  className="inline-block text-foreground/70"
                  variants={letterVariants}
                  custom={i + 12}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.a>
  );
} 