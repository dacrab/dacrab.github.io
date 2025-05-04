import React from 'react';
import { memo } from "react";
import SwissMotion from "../SwissMotion";
import { LucideIcon } from 'lucide-react';
import ShapeAnimation from "../ShapeAnimation";
import { motion } from "framer-motion";

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  delay?: number;
  iconSize?: number;
  variant?: 'default' | 'footer' | 'minimal' | 'bordered' | 'accent';
  className?: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  showBackground?: boolean;
  motionType?: 'scale' | 'slide' | 'fade';
  iconMotion?: boolean;
}

const SocialLink = memo(function SocialLink({
  href,
  icon: Icon,
  label,
  delay = 0,
  iconSize = 20,
  variant = 'default',
  className = '',
  accentColor = 'primary',
  showBackground = false,
  motionType = 'scale',
  iconMotion = false
}: SocialLinkProps) {
  // Colors based on accent
  const accentColors = {
    primary: 'var(--accent)',
    secondary: 'var(--accent-secondary)',
    tertiary: 'var(--accent-tertiary)'
  };
  
  // Styles for different variants
  const variantStyles = {
    default: 'flex items-center gap-3 px-4 py-3 rounded-sm bg-[var(--card-hover)] hover:bg-[var(--card-hover-dark)] transition-colors duration-300 group',
    footer: 'flex items-center justify-center w-10 h-10 rounded-full bg-[var(--card-hover)] hover:bg-[var(--accent)] transition-colors duration-300 text-[var(--foreground)] hover:text-[var(--card)] group',
    minimal: 'flex items-center gap-2 hover:text-[var(--accent)] transition-colors duration-300 group',
    bordered: `flex items-center gap-3 px-4 py-3 border border-[${accentColors[accentColor]}] hover:bg-[${accentColors[accentColor]}] hover:text-[var(--card)] transition-all duration-300 group`,
    accent: `flex items-center gap-3 px-4 py-3 bg-[${accentColors[accentColor]}] text-[var(--card)] hover:opacity-90 transition-all duration-300 group`
  };

  return (
    <SwissMotion
      type={motionType}
      delay={delay}
      duration={0.4}
      whileHover="scale"
      className={className}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative ${variantStyles[variant]}`}
        aria-label={label}
      >
        {/* Background pattern for Swiss design flair */}
        {showBackground && variant !== 'minimal' && (
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
            <div className="grid grid-cols-3 gap-[2px]">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-1 h-1 bg-current`}></div>
              ))}
            </div>
          </div>
        )}
        
        {/* Icon with optional animations - using Framer Motion directly */}
        {iconMotion ? (
          <motion.div 
            className="relative z-10"
            whileHover={{ 
              rotate: variant === 'footer' ? 360 : 0,
              scale: variant !== 'footer' ? 1.1 : 1,
              transition: { duration: 0.5, ease: "easeOut" } 
            }}
          >
            <Icon size={iconSize} />
          </motion.div>
        ) : (
          <div className="relative z-10">
            <Icon size={iconSize} className="transition-transform group-hover:scale-110" />
          </div>
        )}
        
        {/* Label text */}
        {variant !== 'footer' && (
          <span className="relative z-10 transition-transform group-hover:translate-x-0.5">
            {label}
          </span>
        )}
        
        {/* Accent decorator for bordered variant */}
        {variant === 'bordered' && (
          <ShapeAnimation
            type="line"
            variant="draw"
            color={accentColors[accentColor]}
            size={5}
            delay={0.1}
            className="absolute bottom-0 left-0"
          />
        )}
      </a>
    </SwissMotion>
  );
});

export default SocialLink; 