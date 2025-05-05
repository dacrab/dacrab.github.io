import React, { memo } from 'react';
import SwissMotion from '../SwissMotion';
import { getTagColor } from './types';

// Common animation settings
const ANIMATION = {
  duration: 0.3
};

interface ProjectTagProps {
  tag: string;
  projectId: number;
  index?: number;
  className?: string;
  useAccentColor?: boolean;
  showBorder?: boolean;
  animationVariant?: 'fade' | 'scale' | 'slide' | 'reveal';
}

const ProjectTag = memo(function ProjectTag({
  tag,
  projectId,
  index = 0,
  className = '',
  useAccentColor = false,
  showBorder = false,
  animationVariant = 'fade'
}: ProjectTagProps) {
  // Generate tag ID
  const tagId = `${projectId}-tag-${index}`;

  // Determine color classes - improved contrast
  const getColorClasses = () => {
    if (useAccentColor) {
      return 'bg-[var(--accent)] text-[var(--card)]';
    }
    // Improved background color with better contrast
    return 'bg-[var(--card-secondary)] text-[var(--foreground)]';
  };

  // Determine border classes
  const getBorderClasses = () => {
    if (showBorder) {
      return useAccentColor 
        ? 'border border-[var(--accent)]' 
        : 'border border-[var(--border)]';
    }
    // Always add a subtle border for non-accent tags to improve visibility
    return 'border border-[var(--border-subtle)]';
  };

  const tagColor = useAccentColor ? getTagColor(tag) : undefined;
  
  return (
    <SwissMotion
      type={animationVariant}
      duration={ANIMATION.duration}
      className="inline-block"
    >
      <div
        id={tagId}
        className={`
          px-2 py-1 text-xs rounded
          ${getColorClasses()}
          ${getBorderClasses()}
          ${className}
          relative overflow-hidden
        `}
        style={tagColor ? { 
          backgroundColor: useAccentColor ? `${tagColor}30` : 'var(--card-secondary)',
          color: useAccentColor ? tagColor : 'var(--foreground)',
          borderColor: tagColor 
        } : undefined}
      >
        {/* Subtle accent line */}
        <span 
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 ease-out"
          style={{ backgroundColor: tagColor || 'var(--accent)' }}
        />
        
        {tag}
      </div>
    </SwissMotion>
  );
});

export default ProjectTag; 