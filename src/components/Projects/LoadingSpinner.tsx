import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export default function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  const sizeClass = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };
  
  return (
    <div className="flex justify-center">
      <div className={`${sizeClass[size]} animate-spin rounded-full border-2 border-solid border-[var(--accent)] border-t-transparent`}></div>
    </div>
  );
} 