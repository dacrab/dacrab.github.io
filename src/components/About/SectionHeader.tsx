import React from 'react';
import TextAnimation from '@/components/TextAnimation';
import SwissMotion from '@/components/SwissMotion';

interface SectionHeaderProps {
  title: string;
  description: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
}

export default function SectionHeader({ 
  title, 
  description,
  accentColor = 'tertiary'
}: SectionHeaderProps) {
  const accentColorMap = {
    primary: 'bg-[var(--accent)]',
    secondary: 'bg-[var(--accent-secondary)]',
    tertiary: 'bg-[var(--accent-tertiary)]'
  };
  
  return (
    <div className="mb-16">
      <div className="flex items-center mb-4">
        <SwissMotion 
          type="slide" 
          delay={0.1} 
          duration={0.5} 
          className="mr-4"
        >
          <div className={`w-8 h-8 ${accentColorMap[accentColor]}`}></div>
        </SwissMotion>
        <TextAnimation 
          text={title.toUpperCase()} 
          variant="split" 
          delay={0.3} 
          className="swiss-heading-2"
        />
      </div>
      <SwissMotion type="fade" delay={0.4} className="ml-12">
        <SwissMotion type="reveal" delay={0.5} duration={0.4}>
          <div className="w-24 h-1 bg-[var(--foreground)] mb-8"></div>
        </SwissMotion>
        <TextAnimation
          text={description}
          variant="reveal"
          delay={0.6}
          className="swiss-body max-w-2xl"
        />
      </SwissMotion>
    </div>
  );
}