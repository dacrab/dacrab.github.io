"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LogoProps {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  showFullName?: boolean;
}

const FIRST_NAME = "VAGGELIS";
const LAST_NAME = "KAVOURAS";

export default function Logo({
  onClick,
  className = "",
  size = "md",
  showFullName = false,
}: LogoProps) {
  // Hydration-safe: Only show full name after client-side check
  const [shouldShowFullName, setShouldShowFullName] = useState(false);
  useEffect(() => {
    if (showFullName && typeof window !== "undefined" && window.innerWidth >= 1024) {
      setShouldShowFullName(true);
    } else {
      setShouldShowFullName(false);
    }
  }, [showFullName]);

  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  // Animation variants - simplified for Swiss style
  const logoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <motion.a
      href="#home"
      onClick={onClick}
      className={`font-bold inline-flex items-center ${sizeClasses[size]} ${className}`}
      variants={logoVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Swiss style logo with square and circle */}
      <div className="relative mr-3">
        <div className="h-8 w-8 bg-[var(--accent)] flex items-center justify-center">
          <div className="h-4 w-4 bg-[var(--background)]" />
        </div>
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-[var(--accent-secondary)]" />
      </div>
      
      {/* Name in uppercase Swiss style */}
      <div className="flex flex-col">
        <span className="font-bold uppercase tracking-wide text-[var(--foreground)]">
          {FIRST_NAME}
        </span>
        
        {shouldShowFullName && (
          <span className="font-medium uppercase tracking-wide text-[var(--foreground)]/70 text-sm">
            {LAST_NAME}
          </span>
        )}
      </div>
    </motion.a>
  );
}