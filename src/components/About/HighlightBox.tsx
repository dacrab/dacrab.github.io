"use client";

import React, { ReactNode, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

interface HighlightBoxProps {
  children: ReactNode;
  title?: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  delay?: number;
}

/**
 * A Swiss-style animated highlight box specific to the About section
 * It combines precision animation with functional highlighting
 */
export default function HighlightBox({
  children,
  title,
  accentColor = 'primary',
  className = '',
  delay = 0
}: HighlightBoxProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  
  // Swiss-style precision curves
  const easing = {
    precise: [0.17, 0.67, 0.83, 0.67],
    smooth: [0.19, 1, 0.22, 1]
  };
  
  // Accent color mapping
  const accentColorMap = {
    primary: 'var(--accent)',
    secondary: 'var(--accent-secondary)',
    tertiary: 'var(--accent-tertiary)'
  };
  
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden p-5 border border-[var(--border)] rounded-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 20 
      }}
      transition={{ 
        duration: 0.5, 
        delay, 
        ease: easing.smooth
      }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
    >
      {/* Top accent line - classic Swiss design element */}
      <motion.div 
        className="absolute top-0 left-0 h-1 w-full origin-left"
        style={{ backgroundColor: accentColorMap[accentColor] }}
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: isInView ? 1 : 0
        }}
        transition={{ 
          duration: 0.6, 
          delay: delay + 0.2, 
          ease: easing.precise
        }}
      />
      
      {/* Title with Swiss typography animation */}
      {title && (
        <motion.h4 
          className="text-lg font-bold mb-3 inline-flex"
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            x: isInView ? 0 : -10
          }}
          transition={{ 
            duration: 0.4, 
            delay: delay + 0.3, 
            ease: easing.precise
          }}
        >
          {/* Swiss-style square accent */}
          <motion.span 
            className="inline-block mr-2 w-3 h-3"
            style={{ 
              backgroundColor: accentColorMap[accentColor],
              opacity: isHovered ? 1 : 0.7
            }}
            animate={{ 
              rotate: isHovered ? 45 : 0
            }}
            transition={{ 
              duration: 0.3, 
              ease: easing.precise
            }}
          />
          {title}
        </motion.h4>
      )}
      
      {/* Background grid pattern - Swiss style */}
      <motion.div 
        className="absolute inset-0 swiss-grid-pattern"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0.05 : 0,
          backgroundPosition: isHovered ? ["0% 0%", "2% 2%"] : "0% 0%"
        }}
        transition={{ 
          opacity: { duration: 0.3, ease: easing.precise },
          backgroundPosition: { 
            duration: 5, 
            ease: "linear", 
            repeat: Infinity, 
            repeatType: "mirror" as const
          }
        }}
      />
      
      {/* Content container with staggered animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isInView ? 1 : 0
        }}
        transition={{ 
          duration: 0.5, 
          delay: delay + 0.4, 
          ease: easing.precise
        }}
      >
        {children}
      </motion.div>
      
      {/* Side accent line - dynamic on hover */}
      <motion.div 
        className="absolute right-0 top-0 w-1 h-full"
        style={{ backgroundColor: accentColorMap[accentColor] }}
        initial={{ scaleY: 0 }}
        animate={{ 
          scaleY: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ 
          duration: 0.4, 
          ease: easing.precise
        }}
      />
    </motion.div>
  );
} 