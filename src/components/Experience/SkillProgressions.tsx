import { motion } from "framer-motion";
import { memo, useRef } from "react";
import NumberCounter from "./NumberCounter";
import { SKILL_PROGRESSIONS } from "./types";

// ==========================================================================
// Type Definitions
// ==========================================================================
interface SkillProgressionsProps {
  isInView: boolean;
  isMobile: boolean;
}

// ==========================================================================
// Animation Constants
// ==========================================================================
const ANIMATION = {
  DURATION: {
    MOBILE: { SHORT: 0.3, MEDIUM: 0.4, LONG: 0.8 },
    DESKTOP: { SHORT: 0.4, MEDIUM: 0.5, LONG: 1.0 }
  },
  DELAY: {
    BASE: 0.2,
    INCREMENT: { MOBILE: 0.08, DESKTOP: 0.1 }
  },
  EASING: {
    SMOOTH: [0.25, 0.1, 0.25, 1.0],
    EASE_OUT: "easeOut"
  }
};

// ==========================================================================
// Component
// ==========================================================================
const SkillProgressions = memo(function SkillProgressions({ 
  isInView, 
  isMobile 
}: SkillProgressionsProps) {
  const wasInView = useRef(false);
  
  // Handle view state changes
  if (!isInView && wasInView.current) {
    wasInView.current = false;
  } else if (isInView) {
    wasInView.current = true;
  }

  // ==========================================================================
  // Animation Helpers
  // ==========================================================================
  const getFooterAnim = () => ({
    initial: { opacity: 0, y: isMobile ? 8 : 10 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : isMobile ? 8 : 10 },
    transition: { 
      duration: isMobile ? ANIMATION.DURATION.MOBILE.MEDIUM : ANIMATION.DURATION.DESKTOP.MEDIUM,
      delay: 0.6,
      ease: ANIMATION.EASING.SMOOTH
    }
  });

  const getSkillDelay = (index: number) => {
    const cappedIdx = Math.min(index, isMobile ? 3 : 4);
    return ANIMATION.DELAY.BASE + cappedIdx * 
      (isMobile ? ANIMATION.DELAY.INCREMENT.MOBILE : ANIMATION.DELAY.INCREMENT.DESKTOP);
  };

  // ==========================================================================
  // Render
  // ==========================================================================
  return (
    <div className="h-full flex flex-col justify-between relative">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 w-10 h-1 bg-[var(--accent)]" />
      <div className="absolute left-0 bottom-1/4 w-3 h-28 bg-[var(--accent-secondary)] opacity-70" />
      
      {/* Header section */}
      <div className="mb-8">
        <h3 className="swiss-heading-3 mb-6">KEY EXPERTISE</h3>
        <p className="swiss-body max-w-lg mb-10">
          My focus areas span across frontend development with an emphasis on modern technologies and responsive design principles.
        </p>
      </div>
      
      {/* Skills list */}
      <div className="space-y-5 mb-10">
        {SKILL_PROGRESSIONS.map((skill, index) => {
          const delay = getSkillDelay(index);

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: isMobile ? -8 : -10 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : isMobile ? -8 : -10 }}
              transition={{ 
                duration: isMobile ? ANIMATION.DURATION.MOBILE.MEDIUM : ANIMATION.DURATION.DESKTOP.MEDIUM,
                delay,
                ease: ANIMATION.EASING.SMOOTH
              }}
              className="group"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <motion.div
                    className="w-2 h-2 bg-[var(--accent)] mr-3"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isInView ? 1 : 0.8 }}
                    transition={{ 
                      duration: isMobile ? ANIMATION.DURATION.MOBILE.SHORT : ANIMATION.DURATION.DESKTOP.SHORT,
                      delay: delay + 0.05,
                      ease: ANIMATION.EASING.EASE_OUT
                    }}
                  />
                  <span className="text-base font-medium group-hover:text-[var(--accent)] transition-colors duration-200">
                    {skill.name}
                  </span>
                </div>
                <NumberCounter
                  end={skill.percentage}
                  duration={isMobile ? 1.0 : 1.2}
                  delay={delay + 0.15}
                  suffix="%"
                  isInView={isInView}
                  className="text-sm font-semibold text-[var(--accent)]"
                />
              </div>
              
              <div className="w-full h-2 bg-[var(--card-hover)]">
                <motion.div 
                  className="h-full"
                  style={{ background: "var(--accent)", willChange: "width", originX: 0 }}
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${skill.percentage}%` : "0%" }}
                  key={`${skill.name}-${isInView ? "visible" : "hidden"}`}
                  transition={{ 
                    duration: isMobile ? ANIMATION.DURATION.MOBILE.LONG : ANIMATION.DURATION.DESKTOP.LONG,
                    delay: delay + 0.15,
                    ease: ANIMATION.EASING.SMOOTH
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Footer section */}
      <motion.div {...getFooterAnim()} className="mt-auto swiss-card relative">
        <div className="absolute top-0 right-0 w-1/5 h-1 bg-[var(--accent-tertiary)]" />
        <h4 className="font-bold mb-3">PROFESSIONAL APPROACH</h4>
        <p className="text-sm text-[var(--muted)]">
          As a developer, I focus on creating clean, maintainable code while delivering responsive and user-friendly interfaces. 
          I approach each project with enthusiasm and a commitment to excellence.
        </p>
      </motion.div>
    </div>
  );
});

export default SkillProgressions;