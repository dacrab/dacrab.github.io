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
  
  // Swiss-style precision curves - simplified for mobile
  const easing = {
    precise: isMobile ? [0.2, 0.5, 0.8, 1] : [0.17, 0.67, 0.83, 0.67],
    smooth: isMobile ? [0.2, 0.7, 0.4, 1] : [0.19, 1, 0.22, 1]
  };
  
  // Accent color mapping
  const accentColorMap = {
    primary: 'var(--accent)',
    secondary: 'var(--accent-secondary)',
    tertiary: 'var(--accent-tertiary)'
  };
  
  // Optimize durations and delays for mobile
  const optimizedDuration = isMobile ? 0.4 : 0.5;
  const optimizedDelay = isMobile ? delay * 0.7 : delay;
  
  // Skip some animations on mobile
  const shouldAnimateOnHover = !isMobile;
  
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden p-5 border border-[var(--border)] rounded-sm ${className}`}
      initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : isMobile ? 10 : 20 
      }}
      transition={{ 
        duration: optimizedDuration, 
        delay: optimizedDelay, 
        ease: easing.smooth
      }}
      onHoverStart={() => shouldAnimateOnHover && setIsHovered(true)}
      onHoverEnd={() => shouldAnimateOnHover && setIsHovered(false)}
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
          duration: optimizedDuration * 1.2, 
          delay: optimizedDelay + 0.2, 
          ease: easing.precise
        }}
      />
      
      {/* Title with Swiss typography animation */}
      {title && (
        <motion.h4 
          className="text-lg font-bold mb-3 inline-flex"
          initial={{ opacity: 0, x: isMobile ? -5 : -10 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            x: isInView ? 0 : isMobile ? -5 : -10
          }}
          transition={{ 
            duration: optimizedDuration * 0.8, 
            delay: optimizedDelay + 0.3, 
            ease: easing.precise
          }}
        >
          {/* Swiss-style square accent - simplified on mobile */}
          <motion.span 
            className="inline-block mr-2 w-3 h-3"
            style={{ 
              backgroundColor: accentColorMap[accentColor],
              opacity: isHovered ? 1 : 0.7
            }}
            animate={{ 
              rotate: shouldAnimateOnHover && isHovered ? 45 : 0
            }}
            transition={{ 
              duration: 0.3, 
              ease: easing.precise
            }}
          />
          {title}
        </motion.h4>
      )}
      
      {/* Background grid pattern - disabled on mobile */}
      {!isMobile && (
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
      )}
      
      {/* Content container with staggered animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isInView ? 1 : 0
        }}
        transition={{ 
          duration: optimizedDuration, 
          delay: optimizedDelay + (isMobile ? 0.3 : 0.4), 
          ease: easing.precise
        }}
      >
        {children}
      </motion.div>
      
      {/* Side accent line - dynamic on hover, disabled on mobile */}
      {!isMobile && (
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
      )}
    </motion.div>
  );
} 