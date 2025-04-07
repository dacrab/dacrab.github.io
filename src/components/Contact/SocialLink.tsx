"use client";

import { ReactNode, memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface SocialLinkProps {
  name: string;
  url: string;
  icon: ReactNode;
  isMobile?: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const SocialLink = memo(function SocialLink({ 
  name, 
  url, 
  icon,
  isMobile = false
}: SocialLinkProps) {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
      <motion.div
        className="w-11 h-11 rounded-xl backdrop-blur-md border border-border/20 flex items-center justify-center relative overflow-hidden hover:shadow-sm group"
        style={{ background: "rgba(var(--card-rgb), 0.4)" }}
        whileHover={{ 
          scale: isMobile ? 1.03 : 1.05,
          borderColor: "var(--accent)",
          transition: { duration: isMobile ? 0.15 : 0.2 } 
        }}
      >
        {/* Subtle glow effect */}
        <motion.div 
          className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
        
        {/* Icon */}
        <motion.div
          className="relative z-10 text-foreground group-hover:text-accent transition-colors duration-200"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: isMobile ? 0.3 : 0.4 }}
          whileHover={{ 
            rotate: isMobile ? 5 : 10,
            scale: isMobile ? 1.1 : 1.15,
            transition: { duration: isMobile ? 0.2 : 0.3 }
          }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
});

export default SocialLink; 