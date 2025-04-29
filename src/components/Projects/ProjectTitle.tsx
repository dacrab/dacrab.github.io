import React from 'react';
import SwissMotion from '../SwissMotion';

interface ProjectTitleProps {
  title: string;
  delay?: number;
  isFeatured?: boolean;
}

export default function ProjectTitle({ title, delay = 0, isFeatured = false }: ProjectTitleProps) {
  return (
    <SwissMotion type="slide" delay={delay} duration={0.5}>
      <h3 className={`${isFeatured ? 'text-xl' : ''} font-bold mb-3`}>
        {title}
      </h3>
    </SwissMotion>
  );
} 