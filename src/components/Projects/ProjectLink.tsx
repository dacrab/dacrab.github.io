import React from 'react';
import { ArrowUpRight } from "lucide-react";
import SwissMotion from "../SwissMotion";
import ShapeAnimation from "../ShapeAnimation";

// Constants
const ANIMATION = {
  duration: 0.4
};

// Types
interface ProjectLinkProps {
  href: string;
  label?: string;
  className?: string;
  delay?: number;
  duration?: number;
  isButtonStyle?: boolean;
  variant?: 'default' | 'accent' | 'outline' | 'outline-no-hover-color' | 'minimal';
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
  // Generate button styles based on variant and accent color
  let buttonStyles = "";
  
  if (isButtonStyle) {
    buttonStyles = "swiss-button";
  } else {
    // Base styles for all variants
    const baseStyles = "inline-flex items-center text-sm gap-2 px-3 py-2 rounded-sm transition-all duration-300";
    
    // Accent color classes
    const accentColorClass = `var(--accent-${accentColor})`;
    
    switch (variant) {
      case 'accent':
        buttonStyles = `${baseStyles} bg-[${accentColorClass}] text-white`;
        break;
      case 'outline':
        buttonStyles = `${baseStyles} border border-[${accentColorClass}] text-[${accentColorClass}] hover:bg-[${accentColorClass}] hover:text-white`;
        break;
      case 'outline-no-hover-color':
        buttonStyles = `${baseStyles} border border-[${accentColorClass}] text-[${accentColorClass}] hover:bg-[var(--accent-hover)] hover:text-[${accentColorClass}]`;
        break;
      case 'minimal':
        buttonStyles = `${baseStyles} text-[${accentColorClass}] hover:underline`;
        break;
      default:
        buttonStyles = `${baseStyles} text-[${accentColorClass}] hover:underline`;
        break;
    }
  }
  
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
          ${buttonStyles}
          relative group cursor-pointer font-medium
          ${className}
        `}
      >
        {showShape && (
          <div className="absolute -top-1 -left-1 opacity-50">
            <ShapeAnimation
              type="triangle"
              variant="float"
              color={`var(--accent-${accentColor})`}
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