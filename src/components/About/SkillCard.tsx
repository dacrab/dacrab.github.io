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
  
  // Check if this is a white icon that might need special handling
  // This is now primarily a fallback since we're using dark/light mode adaptive colors
  const hasAdaptiveColor = skill.icon.includes("/FFFFFF") || skill.name === "Next.js" || skill.name === "GitHub" || skill.name === "Vercel";
  
  return (
    <motion.a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${className}`}
      style={{
        borderColor: isHovered ? 'rgba(var(--accent-rgb), 0.5)' : 'rgba(var(--border-rgb), 0.3)',
      }}
      variants={cardAnimation(0.1 + (index * 0.03))}
      whileHover={{ 
        y: -8,
        boxShadow: "0 10px 25px -5px rgba(var(--accent-rgb), 0.2)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ y: 0 }}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-3 relative">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 group-hover:opacity-100 blur-lg transition-all duration-300" />
        
        {/* Icon container with background for adaptive color icons */}
        <div className={`relative flex items-center justify-center ${hasAdaptiveColor ? 'p-1.5 icon-container rounded-full shadow-inner' : ''}`}>
          {!imageError ? (
            <Image 
              src={skill.icon} 
              alt={`${skill.name} logo`}
              width={32} 
              height={32} 
              className={`w-8 h-8 object-contain transition-all duration-300 group-hover:scale-125 relative z-10 ${hasAdaptiveColor ? 'theme-adaptive-icon' : ''}`}
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
          className="absolute inset-0 rounded-full border border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
      
      {/* Skill name */}
      <span className="text-sm font-medium text-center text-foreground/80 group-hover:text-accent transition-colors duration-300">
        {skill.name}
      </span>
    </motion.a>
  );
}

// Animation helper
const cardAnimation = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: "easeOut"
    }
  }
}); 