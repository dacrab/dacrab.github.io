import { useRef } from 'react';
import { motion } from 'framer-motion';
import SwissMotion from '../SwissMotion';
import ShapeAnimation from '../ShapeAnimation';
import { ArrowUpRight } from "lucide-react";

interface LottiePanelProps {
  title: string;
  description: string;
  delay?: number;
  index?: number;
}

// Animation configuration constants
const ANIMATION_CONFIG = {
  BASE_DELAY: 0.3,
  DELAY_INCREMENT: 0.2,
  DURATION: 0.7,
  ACCENT_DELAY: 0.4,
  CONTENT_DELAY: 0.4,
  SHAPE_DELAYS: {
    SQUARE: 0.6,
    CIRCLE: 0.7,
    TRIANGLE: 0.8,
    LINE: 0.9,
    DIAGONAL: 1.0,
    TYPOGRAPHY: {
      COLLABORATE: 1.1,
      CREATE: 1.2
    }
  }
};

export default function LottiePanel({ 
  title, 
  description, 
  delay = 0,
  index = 0
}: LottiePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalDelay = ANIMATION_CONFIG.BASE_DELAY + delay + (index * ANIMATION_CONFIG.DELAY_INCREMENT);

  return (
    <SwissMotion 
      type="scale" 
      delay={totalDelay}
      duration={ANIMATION_CONFIG.DURATION}
      className="swiss-card relative h-full flex flex-col group overflow-hidden"
    >
      {/* Accent elements */}
      <SwissMotion type="reveal" delay={ANIMATION_CONFIG.ACCENT_DELAY + delay} duration={0.5}>
        <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]" />
      </SwissMotion>
      
      <SwissMotion type="reveal" delay={ANIMATION_CONFIG.ACCENT_DELAY + 0.1 + delay} duration={0.5}>
        <div className="absolute bottom-0 right-0 w-1 h-1/4 bg-[var(--accent-secondary)]" />
      </SwissMotion>
      
      {/* Content section */}
      <div className="p-6">
        <SwissMotion type="slide" delay={ANIMATION_CONFIG.CONTENT_DELAY + delay} duration={0.5}>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
        </SwissMotion>
        
        <SwissMotion type="fade" delay={ANIMATION_CONFIG.CONTENT_DELAY + 0.1 + delay} duration={0.5}>
          <p className="text-[var(--muted)] mb-6">{description}</p>
        </SwissMotion>
      </div>
      
      {/* Animation canvas */}
      <div className="relative h-64 w-full bg-[var(--card-hover)] overflow-hidden" ref={containerRef}>
        <SwissMotion type="fade" delay={totalDelay} duration={0.8} className="absolute inset-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Background grid */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 opacity-5">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div key={i} className="border border-[var(--foreground)]" />
                ))}
              </div>
              
              {/* Animated shapes */}
              <ShapeAnimation 
                type="square" 
                color="var(--accent)" 
                size={40}
                variant="rotate"
                delay={ANIMATION_CONFIG.SHAPE_DELAYS.SQUARE + delay}
                loop={true}
                className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
              />
              
              <ShapeAnimation 
                type="circle" 
                color="var(--accent-secondary)" 
                size={56}
                variant="pulse"
                delay={ANIMATION_CONFIG.SHAPE_DELAYS.CIRCLE + delay}
                loop={true}
                className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2"
              />
              
              <ShapeAnimation 
                type="triangle" 
                color="var(--accent-tertiary)" 
                size={48}
                variant="float"
                delay={ANIMATION_CONFIG.SHAPE_DELAYS.TRIANGLE + delay}
                loop={true}
                className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2"
              />
              
              {/* Connecting lines */}
              <ShapeAnimation 
                type="line" 
                color="var(--foreground)" 
                size={120}
                strokeWidth={1}
                variant="draw"
                delay={ANIMATION_CONFIG.SHAPE_DELAYS.LINE + delay}
                className="absolute top-1/3 left-2/3"
              />
              
              <ShapeAnimation 
                type="diagonal" 
                color="var(--foreground)" 
                size={80}
                strokeWidth={1}
                variant="draw"
                delay={ANIMATION_CONFIG.SHAPE_DELAYS.DIAGONAL + delay}
                className="absolute bottom-1/3 right-1/3"
              />
              
              {/* Typography elements */}
              <motion.div 
                className="absolute top-6 left-6 text-xs font-bold tracking-widest uppercase opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ 
                  delay: ANIMATION_CONFIG.SHAPE_DELAYS.TYPOGRAPHY.COLLABORATE + delay, 
                  duration: 0.5 
                }}
              >
                COLLABORATE
              </motion.div>
              
              <motion.div 
                className="absolute bottom-6 right-6 text-xs font-bold tracking-widest uppercase opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ 
                  delay: ANIMATION_CONFIG.SHAPE_DELAYS.TYPOGRAPHY.CREATE + delay, 
                  duration: 0.5 
                }}
              >
                CREATE
              </motion.div>
            </div>
          </div>
        </SwissMotion>
      </div>
      
      {/* CTA section */}
      <SwissMotion type="fade" delay={ANIMATION_CONFIG.SHAPE_DELAYS.SQUARE + delay} duration={0.5} className="p-6 pt-0 mt-auto">
        <a href="#contact" className="swiss-button inline-flex items-center gap-2 group">
          Discuss Your Project
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </SwissMotion>
    </SwissMotion>
  );
}