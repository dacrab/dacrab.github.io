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

  return (
    <motion.a
      href={url}
      variants={itemVariants}
      whileHover={{ 
        scale: 1.15,
        boxShadow: "0 0 12px rgba(var(--accent-rgb), 0.3)",
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
          duration: 0.1
        }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
          duration: 0.1
        }
      }}
      className="w-11 h-11 rounded-full bg-card/30 backdrop-blur-sm border border-border/30 flex items-center justify-center transition-colors duration-100 hover:bg-accent/10 hover:border-accent"
      aria-label={name}
    >
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ 
          rotate: [0, -5, 5, 0],
          transition: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }}
      >
        {icon}
      </motion.div>
    </motion.a>
  );
} 