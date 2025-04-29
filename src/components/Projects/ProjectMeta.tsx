import React from 'react';
import { getTagColor } from './types';
import SwissMotion from '../SwissMotion';

interface ProjectMetaProps {
  stars?: number;
  language?: string;
  delay?: number;
}

export default function ProjectMeta({ stars, language, delay = 0 }: ProjectMetaProps) {
  if (!stars && !language) return null;
  
  return (
    <div className="flex items-center mb-4">
      {stars !== undefined && (
        <span className="flex items-center text-xs text-[var(--muted)]">
          <SwissMotion type="scale" delay={delay} duration={0.3}>
            ★ {stars}
          </SwissMotion>
        </span>
      )}
      
      {language && (
        <span className="ml-4 flex items-center text-xs text-[var(--muted)]">
          <span 
            className="inline-block w-2 h-2 rounded-full mr-1"
            style={{ backgroundColor: getTagColor(language) }}
          />
          {language}
        </span>
      )}
    </div>
  );
} 