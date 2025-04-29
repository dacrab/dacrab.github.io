import React from 'react';
import { memo } from "react";
import SwissMotion from "../SwissMotion";
import { LucideIcon } from 'lucide-react';

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  delay?: number;
  iconSize?: number;
  variant?: 'default' | 'footer' | 'minimal';
  className?: string;
}

const SocialLink = memo(function SocialLink({
  href,
  icon: Icon,
  label,
  delay = 0,
  iconSize = 20,
  variant = 'default',
  className = ''
}: SocialLinkProps) {
  // Styles for different variants
  const variantStyles = {
    default: 'flex items-center gap-3 px-4 py-3 rounded-sm bg-[var(--card-hover)] hover:bg-[var(--card-hover-dark)] transition-colors duration-300 group',
    footer: 'flex items-center justify-center w-10 h-10 rounded-full bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-colors duration-300 text-[var(--foreground)] hover:text-[var(--card)] group',
    minimal: 'flex items-center gap-2 hover:text-[var(--accent)] transition-colors duration-300 group'
  };

  return (
    <SwissMotion
      type="scale"
      delay={delay}
      duration={0.4}
      whileHover="scale"
      className={className}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={variantStyles[variant]}
        aria-label={label}
      >
        <Icon size={iconSize} className="transition-transform group-hover:scale-110" />
        {variant !== 'footer' && <span>{label}</span>}
      </a>
    </SwissMotion>
  );
});

export default SocialLink; 