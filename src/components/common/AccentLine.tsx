import React from 'react';
import { memo } from "react";
import SwissMotion from "../SwissMotion";

type AccentPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
type AccentType = 'horizontal' | 'vertical';
type AccentColor = 'primary' | 'secondary' | 'tertiary' | 'foreground';

interface AccentLineProps {
  position?: AccentPosition;
  type?: AccentType;
  width?: string | number;
  height?: string | number;
  positionClasses?: string; // Custom positioning classes when position is 'custom'
  color?: AccentColor;
  delay?: number;
  className?: string;
}

const AccentLine = memo(function AccentLine({
  position = 'top-left',
  type = 'horizontal',
  width = type === 'horizontal' ? '1/4' : '1',
  height = type === 'vertical' ? '1/4' : '1',
  positionClasses = '',
  color = 'primary',
  delay = 0,
  className = ''
}: AccentLineProps) {
  // Map color options to CSS variables
  const colorMap = {
    primary: 'bg-[var(--accent)]',
    secondary: 'bg-[var(--accent-secondary)]',
    tertiary: 'bg-[var(--accent-tertiary)]',
    foreground: 'bg-[var(--foreground)]'
  };

  // Generate positioning classes based on position prop
  const getPositionClasses = () => {
    if (position === 'custom') return positionClasses;
    
    const positions = {
      'top-left': 'left-0 top-0',
      'top-right': 'right-0 top-0',
      'bottom-left': 'left-0 bottom-0',
      'bottom-right': 'right-0 bottom-0'
    };
    
    return positions[position];
  };

  // Handle width/height values (string or number)
  const getDimension = (dimension: string | number) => {
    if (typeof dimension === 'number') return `${dimension}px`;
    if (dimension.includes('px') || dimension.includes('%') || dimension.includes('rem')) return dimension;
    return `w-${dimension}`;
  };
  
  const widthClass = type === 'horizontal' ? 
    (typeof width === 'string' && !width.includes('px') && !width.includes('%') && !width.includes('rem') ? `w-${width}` : '') : 
    '';
    
  const heightClass = type === 'vertical' ? 
    (typeof height === 'string' && !height.includes('px') && !height.includes('%') && !height.includes('rem') ? `h-${height}` : '') : 
    '';

  const inlineStyle = {
    width: type === 'horizontal' ? 
      (typeof width === 'number' || width.includes('px') || width.includes('%') || width.includes('rem') ? getDimension(width) : 'auto') : 
      (type === 'vertical' ? '1px' : 'auto'),
    height: type === 'vertical' ? 
      (typeof height === 'number' || height.includes('px') || height.includes('%') || height.includes('rem') ? getDimension(height) : 'auto') : 
      (type === 'horizontal' ? '1px' : 'auto')
  };

  return (
    <SwissMotion
      type="reveal"
      delay={delay}
      duration={0.4}
      className={`absolute ${getPositionClasses()} ${widthClass} ${heightClass} ${colorMap[color]} ${className}`}
      style={inlineStyle}
    >
      <div />
    </SwissMotion>
  );
});

export default AccentLine; 