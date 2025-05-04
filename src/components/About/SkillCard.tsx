import React, { useState } from 'react';
import Image from 'next/image';
import { Skill } from './types';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

// Swiss style precision easing curves
const EASING = {
  precise: [0.17, 0.67, 0.83, 0.67],
  smooth: [0.19, 1, 0.22, 1]
};

interface SkillCardProps {
  skill: Skill;
  index?: number;
}

export default function SkillCard({ skill, index = 0 }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  // Motion variants for Swiss-style precise animations
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        delay: 0.1 + (index * 0.05),
        ease: EASING.smooth
      }
    }
  };

  // Grid pattern animation for background
  const gridPatternVariants = {
    initial: { opacity: 0, backgroundPosition: "0% 0%" },
    animate: { 
      opacity: isHovered ? 0.1 : 0,
      backgroundPosition: isHovered ? ["0% 0%", "2% 2%"] : "0% 0%",
      transition: { 
        duration: 3, 
        ease: "linear", 
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };

  // Accent line animation
  const accentLineVariants = {
    initial: { width: "0%", opacity: 0 },
    animate: { 
      width: isHovered ? "100%" : "0%", 
      opacity: isHovered ? 1 : 0,
      transition: { 
        duration: 0.3, 
        ease: EASING.precise
      }
    }
  };

  // Icon animation
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: isHovered ? 1.15 : 1,
      rotate: isHovered ? [0, 5, 0, -5, 0] : 0,
      transition: { 
        scale: { duration: 0.2, ease: EASING.precise },
        rotate: { 
          duration: 0.6, 
          ease: EASING.smooth,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse" as const
        }
      }
    }
  };

  // Text slide animation
  const textVariants = {
    initial: { y: 0 },
    animate: { 
      y: isHovered ? -3 : 0,
      transition: { duration: 0.2, ease: EASING.precise }
    }
  };

  return (
    <motion.a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 p-3 rounded-sm relative overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => isMobile && setIsHovered(true)}
      onTouchEnd={() => isMobile && setIsHovered(false)}
    >
      {/* Background grid pattern - Swiss design style */}
      <motion.div 
        className="absolute inset-0 swiss-grid-pattern"
        variants={gridPatternVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Accent top line - Swiss precision */}
      <motion.div 
        className="absolute top-0 left-0 h-1 bg-[var(--accent)]"
        variants={accentLineVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Icon container with precise motion */}
      <motion.div 
        className="w-10 h-10 flex items-center justify-center"
        variants={iconVariants}
        initial="initial"
        animate="animate"
      >
        <Image 
          src={skill.icon} 
          alt={`${skill.name} logo`}
          width={28} 
          height={28} 
          className="w-7 h-7 object-contain"
        />
      </motion.div>
      
      {/* Text with subtle animation */}
      <motion.span 
        className="text-sm font-medium text-center"
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        {skill.name}
      </motion.span>
      
      {/* Bottom accent line */}
      <motion.div 
        className="absolute bottom-0 right-0 h-1 w-0 bg-[var(--accent-secondary)]"
        variants={{
          ...accentLineVariants,
          animate: {
            width: isHovered ? "100%" : "0%",
            opacity: isHovered ? 1 : 0,
            transition: { 
              duration: 0.3, 
              ease: EASING.precise,
              delay: 0.1 // Slight delay for staggered effect
            }
          }
        }}
        initial="initial"
        animate="animate"
      />
    </motion.a>
  );
}