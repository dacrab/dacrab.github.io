import React from 'react';
import SwissMotion from '@/components/SwissMotion';
import TextAnimation from '@/components/TextAnimation';
import ShapeAnimation from '@/components/ShapeAnimation';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  textAnimationVariant?: 'split' | 'reveal' | 'typewriter' | 'gradient' | 'char-by-char';
  motionDelay?: number;
  className?: string;
  showShape?: boolean;
  shapeType?: 'square' | 'circle' | 'triangle' | 'diagonal' | 'cross';
  shapeVariant?: 'float' | 'rotate' | 'pulse' | 'draw';
}

export default function SectionHeader({ 
  title, 
  subtitle,
  accentColor = 'primary',
  textAnimationVariant = 'split',
  motionDelay = 0.2,
  className = '',
  showShape = true,
  shapeType = 'square',
  shapeVariant = 'rotate'
}: SectionHeaderProps) {
  const accentColorMap = {
    primary: 'bg-[var(--accent)]',
    secondary: 'bg-[var(--accent-secondary)]',
    tertiary: 'bg-[var(--accent-tertiary)]'
  };
  
  const colorVarMap = {
    primary: 'var(--accent)',
    secondary: 'var(--accent-secondary)',
    tertiary: 'var(--accent-tertiary)'
  };
  
  return (
    <div className={`mb-16 relative ${className}`}>
      {/* Title row with animated text */}
      <SwissMotion 
        type="slide" 
        delay={motionDelay} 
        duration={0.5} 
        className="relative"
      >
        <SwissMotion type="reveal" delay={motionDelay + 0.1} duration={0.6}>
          <div className={`absolute left-0 w-1/4 h-1 ${accentColorMap[accentColor]}`} />
        </SwissMotion>
        
        {showShape && (
          <div className="absolute -left-4 -top-4">
            <ShapeAnimation
              type={shapeType}
              size={16}
              color={colorVarMap[accentColor === 'primary' ? 'tertiary' : 'secondary']}
              variant={shapeVariant}
              delay={motionDelay + 0.3}
              duration={3}
              loop={true}
            />
          </div>
        )}
        
        <div className="ml-8 mt-8">
          <TextAnimation
            text={title}
            variant={textAnimationVariant}
            delay={motionDelay + 0.2}
            className="swiss-heading-2 mb-4"
          />
          
          {/* Grid pattern (Swiss style) as a background element */}
          <SwissMotion 
            type="fade" 
            delay={motionDelay + 0.4} 
            duration={0.8}
            className="absolute top-1 -left-6 opacity-10 z-0"
          >
            <div className="grid grid-cols-4 gap-1">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-1 ${accentColorMap[accentColor]}`}
                ></div>
              ))}
            </div>
          </SwissMotion>
          
          {subtitle && (
            <SwissMotion type="fade" delay={motionDelay + 0.5} duration={0.7} className="relative z-10">
              <p className="swiss-body max-w-2xl">
                {subtitle}
              </p>
            </SwissMotion>
          )}
        </div>
      </SwissMotion>
    </div>
  );
} 