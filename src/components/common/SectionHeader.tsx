import React from 'react';
import { memo } from "react";
import SwissMotion from "../SwissMotion";
import TextAnimation from "../TextAnimation";
import ShapeAnimation from "../ShapeAnimation";

interface SectionHeaderProps {
  title: string;
  description: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  textAnimationVariant?: 'split' | 'reveal' | 'typewriter' | 'gradient' | 'char-by-char';
  motionDelay?: number;
  className?: string;
  showShape?: boolean;
  shapeType?: 'square' | 'circle' | 'triangle' | 'diagonal' | 'cross';
  shapeVariant?: 'float' | 'rotate' | 'pulse' | 'draw';
}

const SectionHeader = memo(function SectionHeader({
  title,
  description,
  accentColor = 'primary',
  textAnimationVariant = 'reveal',
  motionDelay = 0.2,
  className = '',
  showShape = false,
  shapeType = 'square',
  shapeVariant = 'draw'
}: SectionHeaderProps) {
  // Map accent color to CSS class
  const accentColorClass = `bg-[var(--accent${accentColor === 'primary' ? '' : `-${accentColor}`})]`;
  
  return (
    <div className={`mb-16 relative ${className}`}>
      {/* Title row with accent square and animated text */}
      <SwissMotion 
        type="slide" 
        delay={motionDelay} 
        duration={0.6} 
        className="flex items-center mb-4 relative"
      >
        {/* Accent square with optional shape animation */}
        <div className={`w-8 h-8 ${accentColorClass} mr-4 relative overflow-hidden`}>
          {showShape && (
            <ShapeAnimation
              type={shapeType}
              variant={shapeVariant}
              color="var(--card)"
              size={24}
              strokeWidth={2}
              delay={motionDelay + 0.6}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
        
        {/* Title text animation */}
        <TextAnimation
          text={title.toUpperCase()}
          variant={textAnimationVariant}
          className="swiss-heading-2"
          delay={motionDelay + 0.2}
          duration={0.7}
        />
      </SwissMotion>
      
      {/* Description container */}
      <div className="ml-12 relative">
        {/* Accent line */}
        <SwissMotion 
          type="reveal" 
          delay={motionDelay + 0.4} 
          duration={0.7}
          className="relative"
        >
          <div className="w-24 h-1 bg-[var(--foreground)] mb-8"></div>
        </SwissMotion>
        
        {/* Background grid pattern */}
        <SwissMotion 
          type="fade" 
          delay={motionDelay + 0.6} 
          duration={0.8}
          className="absolute top-1 -left-6 opacity-10 z-0"
        >
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className={`w-1 h-1 ${accentColorClass}`}
              ></div>
            ))}
          </div>
        </SwissMotion>
        
        {/* Description text */}
        <SwissMotion 
          type="fade" 
          delay={motionDelay + 0.8} 
          duration={0.7}
          className="relative z-10"
        >
          <p className="swiss-body max-w-2xl">
            {description}
          </p>
        </SwissMotion>
      </div>
    </div>
  );
});

export default SectionHeader;