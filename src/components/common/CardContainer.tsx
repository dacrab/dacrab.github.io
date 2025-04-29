import React, { ReactNode } from 'react';
import { memo } from "react";
import SwissMotion from "../SwissMotion";
import AccentLine from "./AccentLine";

type MotionType = 'scale' | 'slide' | 'fade' | 'reveal' | 'stagger' | 'grid';

interface CardContainerProps {
  children: ReactNode;
  accent?: boolean;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  accentPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  accentType?: 'horizontal' | 'vertical';
  accentWidth?: string | number;
  accentHeight?: string | number;
  delay?: number;
  motionType?: MotionType;
  whileHover?: 'scale' | 'lift' | 'glow' | 'rotate' | 'none';
  className?: string;
}

const CardContainer = memo(function CardContainer({
  children,
  accent = true,
  accentColor = 'primary',
  accentPosition = 'top-left',
  accentType = 'horizontal',
  accentWidth = accentType === 'horizontal' ? '1/3' : '1',
  accentHeight = accentType === 'vertical' ? '1/4' : '1',
  delay = 0,
  motionType = 'scale',
  whileHover = 'scale',
  className = ''
}: CardContainerProps) {
  return (
    <SwissMotion
      type={motionType}
      delay={delay}
      duration={0.6}
      whileHover={whileHover !== 'none' ? whileHover : undefined}
      className={`swiss-card relative h-full flex flex-col group ${className}`}
    >
      {/* Swiss style accent elements */}
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