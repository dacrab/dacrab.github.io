import { memo } from "react";
import { ProjectBaseProps } from "./types";
import SwissMotion from "../SwissMotion";
import ProjectTag from "./ProjectTag";
import ProjectLink from "./ProjectLink";
import ProjectTitle from "./ProjectTitle";
import ProjectDescription from "./ProjectDescription";
import ShapeAnimation from "../ShapeAnimation";
import AccentLine from "../common/AccentLine";

// Animation constants
const ANIMATION = {
  baseDelay: 0.1,
  duration: 0.5
};

interface FeaturedProjectProps extends ProjectBaseProps {
  reversed?: boolean;
  index?: number;
  accentColor?: 'primary' | 'secondary' | 'tertiary';
  backgroundPattern?: 'none' | 'grid' | 'dots' | 'diagonal';
}

const FeaturedProject = memo(function FeaturedProject({ 
  project, 
  reversed = false,
  accentColor = 'primary',
  backgroundPattern = 'grid'
}: FeaturedProjectProps) {
  
  // Render background pattern based on type
  const renderBackgroundPattern = () => {
    if (backgroundPattern === 'none') return null;

    const colorClass = {
      primary: 'bg-[var(--accent)]',
      secondary: 'bg-[var(--accent-secondary)]',
      tertiary: 'bg-[var(--accent-tertiary)]'
    }[accentColor];
    
    switch (backgroundPattern) {
      case 'grid':
        return (
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 overflow-hidden pointer-events-none">
            <div className="grid grid-cols-4 gap-[2px]">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={`w-[3px] h-[3px] ${colorClass}`}></div>
              ))}
            </div>
          </div>
        );
      case 'dots':
        return (
          <div className="absolute top-0 right-0 w-20 h-20 opacity-5 overflow-hidden pointer-events-none">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full ${colorClass}`}></div>
              ))}
            </div>
          </div>
        );
      case 'diagonal':
        return (
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 overflow-hidden pointer-events-none">
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
        );
      default:
        return null;
    }
  };
  
  return (
    <SwissMotion
      type="scale"
      delay={ANIMATION.baseDelay}
      duration={ANIMATION.duration}
      whileHover="lift"
      className={`swiss-card relative ${reversed ? 'swiss-grid-reversed' : ''}`}
    >
      {/* Swiss style accent elements */}
      <AccentLine 
        position={reversed ? 'top-right' : 'top-left'}
        type="horizontal"
        width="1/3"
        color={accentColor}
        delay={ANIMATION.baseDelay}
        animationType="reveal"
        animateOnHover={true}
      />
      
      <AccentLine 
        position={reversed ? 'bottom-left' : 'top-right'}
        type="vertical"
        height="1/4"
        color={accentColor === 'primary' ? 'secondary' : 'primary'}
        delay={ANIMATION.baseDelay}
        animationType="reveal"
      />
      
      {/* Background pattern */}
      {renderBackgroundPattern()}
      
      {/* Decorative Swiss-style shape element - simplified animation */}
      <SwissMotion
        type="fade"
        delay={ANIMATION.baseDelay}
        duration={ANIMATION.duration}
        className={`absolute ${reversed ? 'left-4 bottom-4' : 'right-4 top-4'} opacity-10`}
      >
        <ShapeAnimation
          type="square"
          variant="rotate"
          color={`var(--accent-${accentColor})`}
          size={20}
          delay={0}
          duration={3}
          loop={true}
        />
      </SwissMotion>
      
      <div className="mb-6 relative z-10">
        <ProjectTitle 
          title={project.title}
          delay={ANIMATION.baseDelay}
          isFeatured={true}
        />
        
        <ProjectDescription
          description={project.description}
          delay={ANIMATION.baseDelay}
          isFeatured={true}
        />
        
        <SwissMotion 
          type="stagger" 
          delay={ANIMATION.baseDelay} 
          className="flex flex-wrap gap-2 mb-6"
        >
          {project.tags.map((tag, tagIndex) => (
            <ProjectTag
              key={`${project.id}-${tag}-${tagIndex}`}
              tag={tag}
              projectId={project.id}
              index={tagIndex}
              useAccentColor={true}
              showBorder={tagIndex === 0}
              animationVariant="fade"
            />
          ))}
        </SwissMotion>
        
        <ProjectLink 
          href={project.link} 
          delay={ANIMATION.baseDelay}
          isButtonStyle={true}
          accentColor={accentColor}
          showShape={true}
        />
      </div>
    </SwissMotion>
  );
});

export default FeaturedProject;