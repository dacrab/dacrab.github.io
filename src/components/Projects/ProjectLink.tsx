import React from 'react';
import { ArrowUpRight } from "lucide-react";
import SwissMotion from "../SwissMotion";

interface ProjectLinkProps {
  href: string;
  label?: string;
  className?: string;
  delay?: number;
  isButtonStyle?: boolean;
}

export default function ProjectLink({ 
  href, 
  label = "View Project", 
  className = "",
  delay = 0,
  isButtonStyle = false
}: ProjectLinkProps) {
  return (
    <SwissMotion 
      type="reveal" 
      delay={delay} 
      duration={0.5}
      whileHover="scale"
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`
          ${isButtonStyle ? 'swiss-button' : 'text-[var(--accent)] hover:underline'} 
          inline-flex items-center text-sm gap-2
          ${className}
        `}
      >
        {label}
        <ArrowUpRight 
          size={14} 
          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" 
        />
      </a>
    </SwissMotion>
  );
} 