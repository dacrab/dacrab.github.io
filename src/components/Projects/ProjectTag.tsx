import React from 'react';
import StaggerItem from '../StaggerItem';
import { getTagColor } from './types';

interface ProjectTagProps {
  tag: string;
  projectId: number;
  index: number;
  className?: string;
  useAccentColor?: boolean;
  showBorder?: boolean;
  animationVariant?: 'fade' | 'scale' | 'slide';
}

export default function ProjectTag({ 
  tag, 
  projectId, 
  index, 
  className = '',
  useAccentColor = false,
  showBorder = false,
  animationVariant = 'fade'
}: ProjectTagProps) {
  const tagColor = useAccentColor ? getTagColor(tag) : undefined;
  
  return (
    <StaggerItem 
      key={`${projectId}-${tag}-${index}`}
      type={animationVariant}
      whileHover="scale"
    >
      <span 
        className={`
          text-xs px-2 py-1 
          ${showBorder ? 'border border-[var(--card-hover-dark)]' : 'bg-[var(--card-hover)]'} 
          rounded-sm inline-block group relative overflow-hidden
          transition-colors duration-300 hover:bg-[var(--card-hover-dark)]
          ${className}
        `}
        style={tagColor ? { backgroundColor: `${tagColor}15` } : undefined}
      >
        {/* Subtle accent line */}
        <span 
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out"
          style={{ backgroundColor: tagColor || 'var(--accent)' }}
        />
        
        {tag}
      </span>
    </StaggerItem>
  );
} 