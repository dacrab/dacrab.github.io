"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

// Swiss style precision curves
const EASING = {
  precise: [0.17, 0.67, 0.83, 0.67],
  smooth: [0.19, 1, 0.22, 1]
};

export interface TimelineEvent {
  year: string | number;
  title: string;
  description: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
}

interface TimelineBoxProps {
  events: TimelineEvent[];
  title?: string;
  className?: string;
  delay?: number;
}

/**
 * A specialized timeline component for the About section
 * with Swiss-style precision animations
 */
export default function TimelineBox({
  events,
  title,
  className = '',
  delay = 0
}: TimelineBoxProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const isMobile = useIsMobile();
  
  // Accent color mapping
  const accentColorMap = {
    primary: 'var(--accent)',
    secondary: 'var(--accent-secondary)',
    tertiary: 'var(--accent-tertiary)'
  };
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5, delay, ease: EASING.precise }}
    >
      {/* Title with Swiss typography animation */}
      {title && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
          transition={{ duration: 0.5, delay: delay + 0.1, ease: EASING.smooth }}
        >
          <h3 className="text-lg uppercase tracking-wider font-bold">{title}</h3>
          <motion.div
            className="w-12 h-1 bg-[var(--accent)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.2, ease: EASING.precise }}
          />
        </motion.div>
      )}
      
      {/* Main timeline container */}
      <div className="relative pl-8 border-l border-[var(--border)]">
        {/* Vertical line animation - Swiss style */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-px bg-[var(--accent)]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          style={{ originY: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.3, ease: EASING.smooth }}
        />
        
        {/* Timeline events */}
        {events.map((event, index) => (
          <motion.div
            key={`timeline-${index}`}
            className="relative mb-10 last:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
            transition={{ 
              duration: 0.5, 
              delay: delay + 0.4 + (index * (isMobile ? 0.1 : 0.15)), 
              ease: EASING.smooth
            }}
          >
            {/* Timeline dot - Swiss precision */}
            <motion.div
              className="absolute -left-[25px] w-6 h-6 rounded-sm flex items-center justify-center"
              style={{ 
                backgroundColor: "var(--card)",
                border: `1px solid ${event.accentColor ? accentColorMap[event.accentColor] : accentColorMap.primary}`
              }}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: isInView ? 1 : 0, rotate: isInView ? 0 : -45 }}
              transition={{ 
                duration: 0.4, 
                delay: delay + 0.5 + (index * 0.15), 
                ease: EASING.precise
              }}
            >
              <motion.div
                className="w-2 h-2"
                style={{ 
                  backgroundColor: event.accentColor ? 
                    accentColorMap[event.accentColor] : 
                    accentColorMap.primary
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: delay + 0.6 + (index * 0.15), 
                  ease: EASING.precise
                }}
              />
            </motion.div>
            
            {/* Year - Swiss typography */}
            <motion.div
              className="text-xl font-bold mb-1"
              style={{ 
                color: event.accentColor ? 
                  accentColorMap[event.accentColor] : 
                  accentColorMap.primary
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ 
                duration: 0.4, 
                delay: delay + 0.5 + (index * 0.15), 
                ease: EASING.precise
              }}
            >
              {event.year}
            </motion.div>
            
            {/* Title - Swiss typography */}
            <motion.h4
              className="text-lg font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ 
                duration: 0.4, 
                delay: delay + 0.6 + (index * 0.15), 
                ease: EASING.precise
              }}
            >
              {event.title}
            </motion.h4>
            
            {/* Description with reveal animation */}
            <motion.p
              className="text-[var(--foreground-secondary)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ 
                duration: 0.4, 
                delay: delay + 0.7 + (index * 0.15), 
                ease: EASING.precise
              }}
            >
              {event.description}
            </motion.p>
            
            {/* Horizontal connecting line - Swiss design element */}
            <motion.div
              className="absolute top-3 -left-[19px] h-px bg-[var(--accent)]"
              initial={{ width: 0 }}
              animate={{ width: isInView ? 20 : 0 }}
              style={{ 
                backgroundColor: event.accentColor ? 
                  accentColorMap[event.accentColor] : 
                  accentColorMap.primary
              }}
              transition={{ 
                duration: 0.4, 
                delay: delay + 0.5 + (index * 0.15), 
                ease: EASING.precise
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 