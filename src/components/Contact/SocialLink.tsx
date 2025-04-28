"use client";

import React from 'react';
import Link from 'next/link';

export interface SocialLinkProps {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export default function SocialLink({ name, url, icon }: SocialLinkProps) {
  return (
    <div className="flex flex-col items-center">
      <Link
        href={url}
        className="w-16 h-16 swiss-border flex items-center justify-center mb-3 hover:bg-[var(--accent)]/10 transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
      >
        <span className="text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--accent)]">
          {icon}
        </span>
      </Link>
      <span className="text-sm uppercase tracking-wider">{name}</span>
    </div>
  );
} 