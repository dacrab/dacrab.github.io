import React from 'react';
import { ProjectData } from "./types";
import SwissMotion from "../SwissMotion";
import ProjectTag from "./ProjectTag";
import ProjectLink from "./ProjectLink";
import ProjectMeta from "./ProjectMeta";
import ShapeAnimation from "../ShapeAnimation";
import TextAnimation from "../TextAnimation";
import AccentLine from "../common/AccentLine";

interface ProjectCardProps {
  project: ProjectData;
  index?: number;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  showShapes?: boolean;
  backgroundPattern?: 'none' | 'grid' | 'dots' | 'diagonal';
  animationType?: 'scale' | 'slide' | 'fade' | 'reveal';
  textAnimationType?: 'reveal' | 'split' | 'typewriter' | 'gradient';
  hoverEffect?: 'lift' | 'scale' | 'glow' | 'none';
}

export default function ProjectCard({ 
  project, 
  index = 0,
  accentColor = 'tertiary',
  showShapes = true,
  backgroundPattern = 'none',
  animationType = 'scale',
  textAnimationType = 'reveal',
  hoverEffect = 'lift'
}: ProjectCardProps) {
  // Base delay for animations
  const baseDelay = 0.3 + (index * 0.08);
  
  // Get accent color class
  const getColorClass = () => {
    const colorMap = {
      primary: 'bg-[var(--accent)]',
      secondary: 'bg-[var(--accent-secondary)]',
      tertiary: 'bg-[var(--accent-tertiary)]'
    };
    return colorMap[accentColor];
  };
  
  // Render background pattern
  const renderBackgroundPattern = () => {
    if (backgroundPattern === 'none') return null;
    
    const colorClass = getColorClass();
    const patternClasses = "absolute top-0 right-0 opacity-5 overflow-hidden pointer-events-none";
    
    const patterns = {
      grid: (
        <div className={`${patternClasses} w-16 h-16`}>
          <div className="grid grid-cols-4 gap-[2px]">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`w-[3px] h-[3px] ${colorClass}`}></div>
            ))}
          </div>
        </div>
      ),
      dots: (
        <div className={`${patternClasses} w-16 h-16`}>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`w-1 h-1 rounded-full ${colorClass}`}></div>
            ))}
          </div>
        </div>
      ),
      diagonal: (
        <div className={`${patternClasses} w-24 h-24`}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i} 
              className={`absolute w-12 h-[1px] ${colorClass} origin-center`}
              style={{ 
                top: `${5 + i * 8}px`, 
                right: 0, 
                transform: 'rotate(-45deg)' 
              }}
            ></div>
          ))}
        </div>
      )
    };
    
    return patterns[backgroundPattern];
  };
  
  // Render decorative shapes
  const renderShapes = () => {
    if (!showShapes) return null;
    
    return (
      <>
        <div className="absolute top-4 right-4 z-0">
          <ShapeAnimation
            type="square"
            size={12}
            color="var(--accent-secondary)"
            variant="rotate"
            delay={baseDelay + 0.4}
            duration={3}
            loop={true}
          />
        </div>
        
        <div className="absolute bottom-4 left-4 opacity-30 z-0">
          <ShapeAnimation
            type="circle"
            size={10}
            color="var(--accent)"
            variant="pulse"
            delay={baseDelay + 0.6}
            duration={2.5}
            loop={true}
          />
        </div>
      </>
    );
  };
  
  return (
    <SwissMotion
      type={animationType}
      delay={baseDelay}
      duration={0.6}
      whileHover={hoverEffect !== 'none' ? hoverEffect : undefined}
      className="swiss-card relative h-full flex flex-col group"
    >
      {/* Accent line */}
      <AccentLine
        position="top-right"
        type="horizontal"
        width="1/5"
        color={accentColor}
        delay={baseDelay + 0.2}
        animationType="reveal"
        animateOnHover={true}
      />
      
      {/* Background pattern */}
      {renderBackgroundPattern()}
      
      {/* Decorative shapes */}
      {renderShapes()}
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Title */}
        <TextAnimation
          text={project.title}
          variant={textAnimationType}
          delay={baseDelay + 0.3}
          className="text-xl font-bold mb-2"
        />
        
        {/* Description */}
        <TextAnimation
          text={project.description}
          variant={textAnimationType}
          delay={baseDelay + 0.5}
          className="text-[var(--foreground-secondary)] mb-4 text-sm"
        />
        
        {/* Tags */}
        <SwissMotion 
          type="stagger" 
          staggerChildren={0.05} 
          delay={baseDelay + 0.7} 
          className="flex flex-wrap gap-2 mb-6"
        >
          {project.tags.map((tag, i) => (
            <ProjectTag
              key={`${project.id}-${tag}-${i}`}
              tag={tag}
              projectId={project.id}
              index={i}
              useAccentColor={i === 0}
              showBorder={i === 0}
              animationVariant={i % 2 === 0 ? 'fade' : 'scale'}
            />
          ))}
        </SwissMotion>
        
        {/* Bottom section */}
        <SwissMotion 
          type="stagger" 
          delay={baseDelay + 0.9} 
          duration={0.5} 
          className="mt-auto"
        >
          <SwissMotion type="fade" delay={0.2}>
            <ProjectMeta 
              stars={project.stars} 
              language={project.language}
              delay={baseDelay + 1.0}
            />
          </SwissMotion>
          
          <SwissMotion type="fade" delay={0.4}>
            <ProjectLink 
              href={project.link} 
              label="View on GitHub"
              delay={baseDelay + 1.1}
              accentColor={accentColor}
              variant="minimal"
              motionType="fade"
            />
          </SwissMotion>
        </SwissMotion>
      </div>
    </SwissMotion>
  );
}