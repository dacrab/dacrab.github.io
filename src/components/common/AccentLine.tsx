import React from 'react';
import { memo } from "react";
import SwissMotion from "../SwissMotion";

// Types
type AccentPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
type AccentType = 'horizontal' | 'vertical';
type AccentColor = 'primary' | 'secondary' | 'tertiary' | 'foreground';

interface AccentLineProps {
  position?: AccentPosition;
  type?: AccentType;
  width?: string | number;
  height?: string | number;
  positionClasses?: string;
  color?: AccentColor;
  delay?: number;
  className?: string;
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
  className = ''
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
  const widthClass = type === 'horizontal' ? getDimensionClass(width, 'width') : '';
  const heightClass = type === 'vertical' ? getDimensionClass(height, 'height') : '';

  const inlineStyle = {
    width: type === 'horizontal' ? getDimensionValue(width) : '1px',
    height: type === 'vertical' ? getDimensionValue(height) : '1px'
  };

  return (
    <SwissMotion
      type="reveal"
      delay={delay}
      duration={0.4}
      className={`absolute ${getPositionClasses()} ${widthClass} ${heightClass} ${COLOR_MAP[color]} ${className}`}
      style={inlineStyle}
    >
      <div />
    </SwissMotion>
  );
});

export default AccentLine;