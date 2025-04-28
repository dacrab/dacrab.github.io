"use client";

import React from 'react';
import { memo } from "react";

interface SectionHeadingProps {
  title: string;
  description: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
}

// Memoize the component to prevent unnecessary re-renders
const SectionHeading = memo(function SectionHeading({ 
  title, 
  description,
  accentColor = 'secondary',
}: SectionHeadingProps) {
  const accentColorMap = {
    primary: 'bg-[var(--accent)]',
    secondary: 'bg-[var(--accent-secondary)]',
    tertiary: 'bg-[var(--accent-tertiary)]'
  };
  
  return (
    <div className="mb-16">
      <div className="flex items-center mb-4">
        <div className={`w-8 h-8 ${accentColorMap[accentColor]} mr-4`}></div>
        <h2 className="swiss-heading-2">{title.toUpperCase()}</h2>
      </div>
      <div className="ml-12">
        <div className="w-24 h-1 bg-[var(--foreground)] mb-8"></div>
        <p className="swiss-body max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
});

export default SectionHeading;