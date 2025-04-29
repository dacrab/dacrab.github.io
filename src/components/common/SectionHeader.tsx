import React from 'react';
import { memo } from "react";
import SwissMotion from "../SwissMotion";
import TextAnimation from "../TextAnimation";

interface SectionHeaderProps {
  title: string;
  description: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  textAnimationVariant?: 'split' | 'reveal' | 'typewriter' | 'gradient' | 'char-by-char';
  motionDelay?: number;
  className?: string;
}

const SectionHeader = memo(function SectionHeader({ 
  title, 
  description,
  accentColor = 'primary',
  textAnimationVariant = 'reveal',
  motionDelay = 0.2,
  className = ''
}: SectionHeaderProps) {
  const accentColorMap = {
    primary: 'bg-[var(--accent)]',
    secondary: 'bg-[var(--accent-secondary)]',
    tertiary: 'bg-[var(--accent-tertiary)]'
  };
  
  return (
    <div className={`mb-16 ${className}`}>
      <SwissMotion type="slide" delay={motionDelay} duration={0.5} className="flex items-center mb-4">
        <div className={`w-8 h-8 ${accentColorMap[accentColor]} mr-4`}></div>
        <TextAnimation
          text={title.toUpperCase()}
          variant={textAnimationVariant}
          className="swiss-heading-2"
          delay={motionDelay + 0.1}
          duration={0.6}
        />
      </SwissMotion>
      <div className="ml-12">
        <SwissMotion type="reveal" delay={motionDelay + 0.3} duration={0.6}>
          <div className="w-24 h-1 bg-[var(--foreground)] mb-8"></div>
        </SwissMotion>
        <SwissMotion type="fade" delay={motionDelay + 0.5} duration={0.6}>
          <p className="swiss-body max-w-2xl">
            {description}
          </p>
        </SwissMotion>
      </div>
    </div>
  );
});

export default SectionHeader; 