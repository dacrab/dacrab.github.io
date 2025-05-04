import React, { ReactNode } from 'react';
import { memo } from 'react';
import SwissMotion from '../SwissMotion';
import AccentLine from './AccentLine';

// Types
type MotionType = 'scale' | 'slide' | 'fade' | 'reveal' | 'stagger' | 'grid';
type HoverEffect = 'scale' | 'lift' | 'glow' | 'rotate' | 'none';
type AccentColor = 'primary' | 'secondary' | 'tertiary';
type AccentPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type AccentType = 'horizontal' | 'vertical';

interface CardContainerProps {
  children: ReactNode;
  accent?: boolean;
  accentColor?: AccentColor;
  accentPosition?: AccentPosition;
  accentType?: AccentType;
  accentWidth?: string | number;
  accentHeight?: string | number;
  delay?: number;
  motionType?: MotionType;
  whileHover?: HoverEffect;
  className?: string;
}

const DEFAULT_PROPS = {
  accent: true,
  accentColor: 'primary' as const,
  accentPosition: 'top-left' as const,
  accentType: 'horizontal' as const,
  motionType: 'scale' as const,
  whileHover: 'scale' as const,
  delay: 0,
  className: ''
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
  motionType = DEFAULT_PROPS.motionType,
  whileHover = DEFAULT_PROPS.whileHover,
  className = DEFAULT_PROPS.className
}: CardContainerProps) {
  return (
    <SwissMotion
      type={motionType}
      delay={delay}
      duration={0.6}
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
        />
      )}
      
      {children}
    </SwissMotion>
  );
});

export default CardContainer;