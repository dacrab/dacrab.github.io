import React, { ReactNode } from 'react';
import { memo } from 'react';
import SwissMotion from '../SwissMotion';
import AccentLine from './AccentLine';
import ShapeAnimation from '../ShapeAnimation';

// Types
type MotionType = 'scale' | 'slide' | 'fade' | 'reveal' | 'stagger' | 'grid' | 'parallax';
type HoverEffect = 'scale' | 'lift' | 'glow' | 'rotate' | 'none';
type AccentColor = 'primary' | 'secondary' | 'tertiary';
type AccentPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type AccentType = 'horizontal' | 'vertical' | 'diagonal';
type BackgroundPattern = 'none' | 'grid' | 'dots' | 'diagonal';

interface CardContainerProps {
  children: ReactNode;
  accent?: boolean;
  accentColor?: AccentColor;
  accentPosition?: AccentPosition;
  accentType?: AccentType;
  accentWidth?: string | number;
  accentHeight?: string | number;
  delay?: number;
  duration?: number;
  motionType?: MotionType;
  whileHover?: HoverEffect;
  className?: string;
  animated?: boolean;
  animateAccentOnHover?: boolean;
  backgroundPattern?: BackgroundPattern;
  showShape?: boolean;
  shapeType?: 'square' | 'circle' | 'triangle' | 'cross';
}

const DEFAULT_PROPS = {
  accent: true,
  accentColor: 'primary' as const,
  accentPosition: 'top-left' as const,
  accentType: 'horizontal' as const,
  motionType: 'scale' as const,
  whileHover: 'scale' as const,
  delay: 0,
  duration: 0.6,
  className: '',
  animated: true,
  animateAccentOnHover: false,
  backgroundPattern: 'none' as const,
  showShape: false,
  shapeType: 'square' as const
};

const CardContainer = memo(function CardContainer({
  children,
  accent = DEFAULT_PROPS.accent,
  accentColor = DEFAULT_PROPS.accentColor,
  accentPosition = DEFAULT_PROPS.accentPosition,
  accentType = DEFAULT_PROPS.accentType,
  accentWidth = accentType === 'horizontal' ? '1/3' : '1',
  accentHeight = accentType === 'vertical' ? '1/4' : '1',
  delay = DEFAULT_PROPS.delay,
  duration = DEFAULT_PROPS.duration,
  motionType = DEFAULT_PROPS.motionType,
  whileHover = DEFAULT_PROPS.whileHover,
  className = DEFAULT_PROPS.className,
  animated = DEFAULT_PROPS.animated,
  animateAccentOnHover = DEFAULT_PROPS.animateAccentOnHover,
  backgroundPattern = DEFAULT_PROPS.backgroundPattern,
  showShape = DEFAULT_PROPS.showShape,
  shapeType = DEFAULT_PROPS.shapeType
}: CardContainerProps) {
  // Render background pattern based on type
  const renderBackgroundPattern = () => {
    if (backgroundPattern === 'none') return null;

    const colorClass = {
      primary: 'bg-[var(--accent)]',
      secondary: 'bg-[var(--accent-secondary)]',
      tertiary: 'bg-[var(--accent-tertiary)]'
    }[accentColor];
    
    switch (backgroundPattern) {
      case 'grid':
        return (
          <div className="absolute top-0 right-0 w-16 h-16 opacity-5 overflow-hidden pointer-events-none">
            <div className="grid grid-cols-4 gap-[2px]">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={`w-[3px] h-[3px] ${colorClass}`}></div>
              ))}
            </div>
          </div>
        );
      case 'dots':
        return (
          <div className="absolute top-0 right-0 w-20 h-20 opacity-5 overflow-hidden pointer-events-none">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full ${colorClass}`}></div>
              ))}
            </div>
          </div>
        );
      case 'diagonal':
        return (
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 overflow-hidden pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i} 
                className={`absolute w-12 h-[1px] ${colorClass} origin-center`}
                style={{ 
                  top: `${5 + i * 8}px`, 
                  right: 0, 
                  transform: 'rotate(-45deg)' 
                }}
              ></div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // If not animated, render a static version
  if (!animated) {
    return (
      <div className={`swiss-card relative h-full flex flex-col ${className}`}>
        {accent && (
          <div 
            className={`absolute ${accentPosition} ${
              accentType === 'horizontal' 
                ? `w-${accentWidth} h-[1px]` 
                : accentType === 'vertical' 
                  ? `w-[1px] h-${accentHeight}` 
                  : ''
            } bg-[var(--accent-${accentColor})]`}
          />
        )}
        {renderBackgroundPattern()}
        {showShape && (
          <div className="absolute top-0 right-0 opacity-10">
            <ShapeAnimation
              type={shapeType}
              variant="float"
              color={`var(--accent)`}
              size={28}
              loop
            />
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <SwissMotion
      type={motionType}
      delay={delay}
      duration={duration}
      whileHover={whileHover !== 'none' ? whileHover : undefined}
      className={`swiss-card relative h-full flex flex-col group ${className}`}
    >
      {accent && (
        <AccentLine
          position={accentPosition}
          type={accentType}
          width={accentWidth}
          height={accentHeight}
          color={accentColor}
          delay={delay + 0.1}
          animationType={motionType === 'reveal' ? 'reveal' : 'slide'}
          animateOnHover={animateAccentOnHover}
        />
      )}
      
      {renderBackgroundPattern()}
      
      {showShape && (
        <SwissMotion
          type="fade"
          delay={delay + 0.2}
          className="absolute top-4 right-4 opacity-10"
        >
          <ShapeAnimation
            type={shapeType}
            variant="float"
            color={`var(--accent)`}
            size={28}
            loop
          />
        </SwissMotion>
      )}
      
      {children}
    </SwissMotion>
  );
});

export default CardContainer;