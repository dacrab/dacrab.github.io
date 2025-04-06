"use client";

import { ReactNode, memo } from "react";
import { motion } from "framer-motion";

interface SocialLinkProps {
  name: string;
  url: string;
  icon: ReactNode;
}

// Memoize the component to prevent unnecessary re-renders
const SocialLink = memo(function SocialLink({
  name,
  url,
  icon,
}: SocialLinkProps) {
  // Item variants for staggered animation from parent - simplified for mobile
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 8 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.3
      }
    }
  };

  // Simplified spring transition for mobile
  const springTransition = {
    type: "spring",
    stiffness: 350,
    damping: 15,
    duration: 0.2
  };

  return (
    <motion.a
      href={url}
      variants={itemVariants}
      whileHover={{ scale: 1.08, transition: springTransition }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 rounded-full backdrop-blur-md border border-border/30 flex items-center justify-center relative overflow-hidden group"
      style={{ background: "rgba(var(--card-rgb), 0.3)" }}
      aria-label={name}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Background hover effect - simplified */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-accent/15 to-accent-dark/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ borderRadius: 'inherit' }}
      />
      
      {/* Icon with animated hover - simplified for mobile */}
      <motion.div
        className="relative z-10 text-foreground group-hover:text-accent transition-colors duration-200"
        whileHover={{ scale: 1.1 }}
      >
        {icon}
      </motion.div>
    </motion.a>
  );
});

export default SocialLink; 