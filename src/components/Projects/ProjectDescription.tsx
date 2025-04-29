import React from 'react';
import SwissMotion from '../SwissMotion';

interface ProjectDescriptionProps {
  description: string;
  delay?: number;
  isFeatured?: boolean; 
}

export default function ProjectDescription({ 
  description, 
  delay = 0, 
  isFeatured = false 
}: ProjectDescriptionProps) {
  return (
    <SwissMotion type="fade" delay={delay} duration={0.5}>
      <p className={`
        text-[var(--muted)] 
        ${isFeatured ? 'mb-6' : 'mb-4 text-sm line-clamp-3'}
      `}>
        {description}
      </p>
    </SwissMotion>
  );
} 