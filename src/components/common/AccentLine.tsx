import React from 'react';
import { memo } from "react";
import SwissMotion from "../SwissMotion";

// Types
type AccentPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
type AccentType = 'horizontal' | 'vertical' | 'diagonal';
type AccentColor = 'primary' | 'secondary' | 'tertiary' | 'foreground';
type AccentAnimation = 'reveal' | 'slide' | 'fade' | 'draw';

interface AccentLineProps {
  position?: AccentPosition;
  type?: AccentType;
  width?: string | number;
  height?: string | number;
  positionClasses?: string;
  color?: AccentColor;
  delay?: number;
  duration?: number;
  className?: string;
  animationType?: AccentAnimation;
  rotate?: number;
  animateOnHover?: boolean;
}

// Constants
const COLOR_MAP = {
  primary: 'bg-[var(--accent)]',
  secondary: 'bg-[var(--accent-secondary)]',
  tertiary: 'bg-[var(--accent-tertiary)]',
  foreground: 'bg-[var(--foreground)]'
};

const POSITION_MAP = {
  'top-left': 'left-0 top-0',
  'top-right': 'right-0 top-0',
  'bottom-left': 'left-0 bottom-0',
  'bottom-right': 'right-0 bottom-0'
};

const AccentLine = memo(function AccentLine({
  position = 'top-left',
  type = 'horizontal',
  width = type === 'horizontal' ? '1/4' : '1',
  height = type === 'vertical' ? '1/4' : '1',
  positionClasses = '',
  color = 'primary',
  delay = 0,
  duration = 0.4,
  className = '',
  animationType = 'reveal',
  rotate = 0,
  animateOnHover = false
}: AccentLineProps) {
  // Helpers
  const getPositionClasses = () => 
    position === 'custom' ? positionClasses : POSITION_MAP[position];

  const getDimensionValue = (dimension: string | number) => {
    if (typeof dimension === 'number') return `${dimension}px`;
    if (['px', '%', 'rem'].some(unit => dimension.includes(unit))) return dimension;
    return '';
  };

  const getDimensionClass = (dimension: string | number, dimensionType: 'width' | 'height') => {
    if (typeof dimension === 'string' && !['px', '%', 'rem'].some(unit => dimension.includes(unit))) {
      return `${dimensionType === 'width' ? 'w' : 'h'}-${dimension}`;
    }
    return '';
  };

  // Derived values
  const widthClass = type === 'horizontal' || type === 'diagonal' ? getDimensionClass(width, 'width') : '';
  const heightClass = type === 'vertical' || type === 'diagonal' ? getDimensionClass(height, 'height') : '';

  const inlineStyle = {
    width: type === 'horizontal' || type === 'diagonal' ? getDimensionValue(width) : '1px',
    height: type === 'vertical' || type === 'diagonal' ? getDimensionValue(height) : '1px',
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    transformOrigin: 'center',
  };
  
  // Get motion animation type based on the animationType
  const getMotionType = () => {
    switch (animationType) {
      case 'slide': return 'slide';
      case 'fade': return 'fade';
      case 'draw': return 'scale'; // Use scale for draw-like effect
      default: return 'reveal';
    }
  };
  
  // Get hover animation
  const getHoverAnimation = () => {
    if (!animateOnHover) return undefined;
    
    if (type === 'horizontal') {
      return 'scale'; // Scale horizontally
    } else if (type === 'vertical') {
      return 'lift'; // Lift vertically
    } else {
      return 'glow'; // Glow for diagonal
    }
  };

  return (
    <SwissMotion
      type={getMotionType()}
      delay={delay}
      duration={duration}
      whileHover={getHoverAnimation()}
      className={`absolute ${getPositionClasses()} ${widthClass} ${heightClass} ${COLOR_MAP[color]} ${className}`}
      style={inlineStyle}
    >
      <div className={type === 'diagonal' ? 'h-full w-full' : ''} />
    </SwissMotion>
  );
});

export default AccentLine;