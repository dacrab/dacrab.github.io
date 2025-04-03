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
      initial={{ opacity: 0, y: 15 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 15 
      }}
      transition={{ 
        duration: 0.6, 
        delay: 0.3 + (index * 0.12) 
      }}
      className="group"
    >
      <div className="flex items-center gap-5">
        {/* Icon container with hover effect */}
        <motion.div 
          className="flex-shrink-0 w-14 h-14 rounded-xl backdrop-blur-md border border-border/20 flex items-center justify-center relative overflow-hidden"
          style={{ background: "rgba(var(--card-rgb), 0.4)" }}
          whileHover={{ 
            scale: 1.05, 
            borderColor: 'var(--accent)',
            transition: { duration: 0.3 }
          }}
        >
          {/* Subtle glow effect on hover */}
          <motion.div 
            className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              boxShadow: index % 2 === 0 ? 
                ['inset 0 0 0px rgba(var(--accent-rgb), 0)', 'inset 0 0 20px rgba(var(--accent-rgb), 0.15)', 'inset 0 0 0px rgba(var(--accent-rgb), 0)'] :
                ['inset 0 0 0px rgba(var(--accent-rgb), 0)', 'inset 0 0 15px rgba(var(--accent-rgb), 0.1)', 'inset 0 0 0px rgba(var(--accent-rgb), 0)']
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 2
            }}
          />
          
          {/* Icon with subtle animation */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.4 + (index * 0.15)
            }}
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              animate={{ 
                color: ['var(--foreground)', 'var(--accent)', 'var(--foreground)']
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                repeatType: 'reverse',
                delay: index * 3
              }}
            >
              {icon}
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Text content with hover effects */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 0.8 : 0 }}
            transition={{ 
              duration: 0.5,
              delay: 0.5 + (index * 0.12)
            }}
          >
            <h4 className="text-sm text-muted mb-1 group-hover:text-accent/80 transition-colors duration-300">{title}</h4>
          </motion.div>
          
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: isInView ? 0 : -10, opacity: isInView ? 1 : 0 }}
            transition={{ 
              duration: 0.4,
              delay: 0.6 + (index * 0.12)
            }}
          >
            <p className="text-lg font-medium group-hover:text-accent transition-colors duration-300">{value}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 