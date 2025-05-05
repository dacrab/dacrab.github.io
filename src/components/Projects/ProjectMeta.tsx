import React from 'react';
import { getTagColor } from './types';
import SwissMotion from '../SwissMotion';

// Animation constants
const ANIMATION = {
  duration: 0.3
};

interface ProjectMetaProps {
  stars?: number;
  language?: string;
  delay?: number;
}

export default function ProjectMeta({ stars, language, delay = 0 }: ProjectMetaProps) {
  if (!stars && !language) return null;
  
  return (
    <SwissMotion type="fade" delay={delay} duration={ANIMATION.duration}>
      <div className="flex items-center mb-4">
        {stars !== undefined && (
          <span className="flex items-center text-xs font-medium text-[var(--foreground)]">
            <span className="text-yellow-400 mr-1">★</span>
            {stars}
          </span>
        )}
        
        {language && (
          <span className="ml-4 flex items-center text-xs font-medium text-[var(--foreground)]">
            <span 
              className="inline-block w-2 h-2 rounded-full mr-1"
              style={{ 
                backgroundColor: getTagColor(language),
                boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
              }}
            />
            {language}
          </span>
        )}
      </div>
    </SwissMotion>
  );
} 