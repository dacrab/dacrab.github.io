"use client";

import React from 'react';
import { SocialLink as SocialLinkType } from './contactData';
import SwissMotion from '@/components/SwissMotion';
import ShapeAnimation from '@/components/ShapeAnimation';

interface SocialLinkProps {
  link: SocialLinkType;
  index: number;
}

export default function SocialLink({ link, index }: SocialLinkProps) {
  const Icon = link.icon;

  return (
    <SwissMotion
      type="scale"
      delay={0.4 + index * 0.1}
      duration={0.5}
      whileHover="scale"
      className="relative"
    >
      <a 
        href={link.url} 
        target="_blank" 
        rel="noreferrer" 
        aria-label={link.name}
        className="group relative block p-3 border border-[var(--border)] rounded-sm bg-[var(--card)] hover:bg-[var(--card-hover)] transition-colors duration-200"
      >
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ShapeAnimation
            type="square"
            size={6}
            color="var(--accent)"
            variant="pulse"
            loop={true}
            delay={0}
          />
        </div>
        <Icon className="w-5 h-5 text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200" />
      </a>
    </SwissMotion>
  );
} 