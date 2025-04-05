"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SocialLinkProps {
  name: string;
  url: string;
  icon: ReactNode;
}

export default function SocialLink({
  name,
  url,
  icon,
}: SocialLinkProps) {
  // Item variants for staggered animation from parent
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Common spring transition
  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 10,
    duration: 0.1
  };

  return (
    <motion.a
      href={url}
      variants={itemVariants}
      whileHover={{ scale: 1.1, transition: springTransition }}
      whileTap={{ scale: 0.95, transition: springTransition }}
      className="w-14 h-14 rounded-full backdrop-blur-md border border-border/30 flex items-center justify-center relative overflow-hidden group"
      style={{ background: "rgba(var(--card-rgb), 0.3)" }}
      aria-label={name}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Background hover effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderRadius: 'inherit' }}
      />
      
      {/* Radial gradient glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: "radial-gradient(circle at center, rgba(var(--accent-rgb), 0.15) 0%, transparent 70%)",
          borderRadius: 'inherit'
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      {/* Icon with animated hover */}
      <motion.div
        className="relative z-10 text-foreground group-hover:text-accent transition-colors"
        whileHover={{ 
          rotate: [0, -5, 5, 0],
          scale: 1.1,
          transition: {
            duration: 0.5,
            ease: "easeInOut"
          }
        }}
      >
        {icon}
      </motion.div>
    </motion.a>
  );
} 