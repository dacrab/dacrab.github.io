import React from 'react';
import StaggerItem from '../StaggerItem';

interface ProjectTagProps {
  tag: string;
  projectId: number;
  index: number;
  className?: string;
}

export default function ProjectTag({ tag, projectId, index, className = '' }: ProjectTagProps) {
  return (
    <StaggerItem 
      key={`${projectId}-${tag}-${index}`}
      type="fade"
      whileHover="scale"
    >
      <span className={`text-xs px-2 py-1 bg-[var(--card-hover)] rounded-sm inline-block ${className}`}>
        {tag}
      </span>
    </StaggerItem>
  );
} 