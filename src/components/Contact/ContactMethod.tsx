"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ContactMethodProps {
  title: string;
  value: string;
  icon: ReactNode;
  index: number;
  isInView: boolean;
}

export default function ContactMethod({
  title,
  value,
  icon,
  index,
  isInView,
}: ContactMethodProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        x: isInView ? 0 : -20 
      }}
      transition={{ 
        duration: 0.5, 
        delay: isInView ? 0.3 + (index * 0.1) : 0 
      }}
      className="flex items-center gap-4"
      whileHover={{ x: 3 }}
    >
      <motion.div 
        className="flex-shrink-0 w-12 h-12 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 flex items-center justify-center"
        whileHover={{ scale: 1.05, borderColor: 'var(--accent-light)' }}
        animate={{
          boxShadow: ['0 0 0px rgba(var(--accent-rgb), 0)', '0 0 10px rgba(var(--accent-rgb), 0.2)', '0 0 0px rgba(var(--accent-rgb), 0)']
        }}
        transition={{ 
          duration: 0.2,
          boxShadow: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 3
          }
        }}
      >
        <motion.div
          animate={{ 
            color: ['var(--foreground)', 'var(--accent)', 'var(--foreground)']
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 1.5 
          }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <div>
        <h4 className="text-sm text-muted">{title}</h4>
        <motion.p 
          className="text-lg"
          whileHover={{ 
            color: 'var(--accent)'
          }}
          transition={{ duration: 0.2 }}
        >
          {value}
        </motion.p>
      </div>
    </motion.div>
  );
} 