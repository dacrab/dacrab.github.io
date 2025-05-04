"use client";

import React, { useRef } from 'react';
import { motion, useInView, useTransform, useScroll } from 'framer-motion';

// Swiss style precision curves
const EASING = {
  precise: [0.17, 0.67, 0.83, 0.67],
  smooth: [0.19, 1, 0.22, 1]
};

interface StatItem {
  label: string;
  value: string | number;
  suffix?: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
}

interface StatRowProps {
  stats: StatItem[];
  title?: string;
  className?: string;
  delay?: number;
}

export default function StatRow({
  stats,
  title,
  className = '',
  delay = 0
}: StatRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  // Accent color mapping
  const accentColorMap = {
    primary: 'var(--accent)',
    secondary: 'var(--accent-secondary)',
    tertiary: 'var(--accent-tertiary)'
  };
  
  // Scroll-based parallax effect for Swiss precision
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineWidth = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "100%", "100%"]
  );
  
  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, delay, ease: EASING.precise }}
    >
      {/* Title section with Swiss typography */}
      {title && (
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
          transition={{ duration: 0.5, delay: delay + 0.1, ease: EASING.smooth }}
        >
          <h3 className="text-lg uppercase tracking-wider font-bold">{title}</h3>
          <motion.div
            className="w-12 h-1 bg-[var(--accent)]"
            style={{ scaleX: isInView ? 1 : 0, originX: 0 }}
            transition={{ duration: 0.6, delay: delay + 0.2, ease: EASING.precise }}
          />
        </motion.div>
      )}
      
      {/* Horizontal line for Swiss visual structure */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-[var(--border)]"
        style={{ width: lineWidth }}
      />
      
      <div className={`grid ${stats.length > 2 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'} gap-4`}>
        {stats.map((stat, index) => (
          <motion.div
            key={`stat-${index}`}
            className="py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ 
              duration: 0.5, 
              delay: delay + 0.2 + (index * 0.1),
              ease: EASING.smooth
            }}
          >
            {/* Stat value with Swiss precision animation */}
            <motion.div 
              className="text-2xl md:text-3xl font-bold mb-1 flex items-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                scale: isInView ? 1 : 0.9,
                transition: { 
                  duration: 0.6, 
                  delay: delay + 0.3 + (index * 0.1),
                  ease: EASING.precise
                }
              }}
            >
              <motion.span
                initial={{ y: 20 }}
                animate={{ y: isInView ? 0 : 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: delay + 0.4 + (index * 0.1),
                  ease: EASING.smooth
                }}
              >
                {stat.value}
              </motion.span>
              
              {/* Suffix with accent color */}
              {stat.suffix && (
                <motion.span
                  style={{ 
                    color: stat.accentColor ? 
                      accentColorMap[stat.accentColor] : 
                      accentColorMap.primary 
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isInView ? 1 : 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: delay + 0.5 + (index * 0.1),
                    ease: EASING.precise
                  }}
                >
                  {stat.suffix}
                </motion.span>
              )}
            </motion.div>
            
            {/* Label with Swiss design style */}
            <motion.div
              className="text-sm uppercase tracking-wider text-[var(--foreground-secondary)]"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -5 }}
              transition={{ 
                duration: 0.4, 
                delay: delay + 0.5 + (index * 0.1),
                ease: EASING.precise
              }}
            >
              {stat.label}
            </motion.div>
            
            {/* Bottom accent line - Swiss precision */}
            <motion.div
              className="w-0 h-1 mt-2"
              style={{ 
                backgroundColor: stat.accentColor ? 
                  accentColorMap[stat.accentColor] : 
                  accentColorMap.primary,
                width: isInView ? "30%" : "0%"
              }}
              transition={{ 
                duration: 0.5, 
                delay: delay + 0.6 + (index * 0.1),
                ease: EASING.precise
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Bottom horizontal line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border)]"
        style={{ width: lineWidth }}
      />
    </motion.div>
  );
} 