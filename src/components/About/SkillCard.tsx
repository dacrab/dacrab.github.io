import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Skill } from "./types";

interface SkillCardProps {
  skill: Skill; 
  index: number; 
  className?: string;
}

export default function SkillCard({ skill, index, className = "" }: SkillCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if this is a light-colored icon that needs special handling
  const hasAdaptiveColor = skill.icon.includes("/FFFFFF") || 
                          ["Next.js", "GitHub", "Vercel"].includes(skill.name);
  
  // Animation variants
  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 + (index * 0.03),
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center p-4 rounded-lg backdrop-blur-sm border bg-card/30 transition-all duration-300 group ${className}`}
      style={{
        borderColor: isHovered ? 'rgba(var(--accent-rgb), 0.5)' : 'rgba(var(--border-rgb), 0.3)',
      }}
      variants={cardAnimation}
      whileHover={{ 
        y: -5,
        boxShadow: "0 8px 20px -4px rgba(var(--accent-rgb), 0.2)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ y: 0 }}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-3 relative">
        {/* Glow effect on hover */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-accent/10 blur-lg transition-all duration-300" 
          animate={{ 
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1.2 : 0.8 
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Icon container */}
        <div className={`relative flex items-center justify-center ${hasAdaptiveColor ? 'p-1.5 icon-container rounded-full shadow-inner' : ''}`}>
          {!imageError ? (
            <Image 
              src={skill.icon} 
              alt={`${skill.name} logo`}
              width={32} 
              height={32} 
              className={`w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110 relative z-10 ${hasAdaptiveColor ? 'theme-adaptive-icon' : ''}`}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-accent/20 text-foreground rounded-full">
              {skill.name.slice(0, 2)}
            </div>
          )}
        </div>
        
        {/* Animated ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border border-accent/40"
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? [0.8, 1.2, 0.8] : 0.6 
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          transition={{ 
            opacity: { duration: 0.3 },
            scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        />
      </div>
      
      {/* Skill name */}
      <motion.span 
        className="text-sm font-medium text-center transition-colors duration-300"
        animate={{ 
          color: isHovered ? 'rgba(var(--accent-rgb), 1)' : 'rgba(var(--foreground-rgb), 0.8)'
        }}
        transition={{ duration: 0.3 }}
      >
        {skill.name}
      </motion.span>
    </motion.a>
  );
}