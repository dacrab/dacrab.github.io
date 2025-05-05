import React from 'react';
import { ArrowUpRight } from "lucide-react";
import SwissMotion from "../SwissMotion";
import ShapeAnimation from "../ShapeAnimation";

// Common animation settings
const ANIMATION = {
  duration: 0.4
};

interface ProjectLinkProps {
  href: string;
  label?: string;
  className?: string;
  delay?: number;
  duration?: number;
  isButtonStyle?: boolean;
  variant?: 'default' | 'accent' | 'outline' | 'minimal';
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  motionType?: 'scale' | 'reveal' | 'slide' | 'fade';
  showShape?: boolean;
  iconSize?: number;
}

export default function ProjectLink({ 
  href, 
  label = "View Project", 
  className = "",
  delay = 0,
  duration = ANIMATION.duration,
  isButtonStyle = false,
  variant = 'default',
  accentColor = 'primary',
  motionType = 'fade',
  showShape = false,
  iconSize = 14
}: ProjectLinkProps) {
  // Color mapping based on accent color
  const colorVarMap = {
    primary: 'var(--accent)',
    secondary: 'var(--accent-secondary)',
    tertiary: 'var(--accent-tertiary)'
  };
  
  // Style variants
  const getVariantStyles = () => {
    if (isButtonStyle) return 'swiss-button';
    
    switch (variant) {
      case 'accent':
        return `bg-[${colorVarMap[accentColor]}] text-[var(--card)] px-3 py-2 rounded-sm`;
      case 'outline':
        return `border border-[${colorVarMap[accentColor]}] text-[${colorVarMap[accentColor]}] px-3 py-2 rounded-sm hover:bg-[${colorVarMap[accentColor]}] hover:text-[var(--card)]`;
      case 'minimal':
        return `text-[${colorVarMap[accentColor]}] hover:underline`;
      default:
        return `text-[${colorVarMap[accentColor]}] hover:underline`;
    }
  };
  
  return (
    <SwissMotion 
      type={motionType} 
      delay={delay} 
      duration={duration}
      whileHover="scale"
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`
          ${getVariantStyles()} 
          inline-flex items-center text-sm gap-2
          transition-all duration-300 relative group
          ${className}
        `}
      >
        {showShape && (
          <div className="absolute -top-1 -left-1 opacity-50">
            <ShapeAnimation
              type="triangle"
              variant="float"
              color={colorVarMap[accentColor]}
              size={8}
              delay={0}
              duration={2}
              loop
            />
          </div>
        )}
        
        {label}
        
        <ArrowUpRight 
          size={iconSize} 
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
        />
      </a>
    </SwissMotion>
  );
} 