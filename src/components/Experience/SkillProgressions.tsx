import { motion } from "framer-motion";
import { memo, useRef, useMemo } from "react";
import NumberCounter from "./NumberCounter";
import { SKILL_PROGRESSIONS } from "./types";
import SwissMotion from "@/components/SwissMotion";

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
    MOBILE: { SHORT: 0.2, MEDIUM: 0.3, LONG: 0.5 },
    DESKTOP: { SHORT: 0.4, MEDIUM: 0.5, LONG: 1.0 }
  },
  DELAY: {
    BASE: { MOBILE: 0.15, DESKTOP: 0.2 },
    INCREMENT: { MOBILE: 0.05, DESKTOP: 0.1 }
  },
  EASING: {
    SMOOTH: { MOBILE: [0.2, 0.2, 0.4, 1.0], DESKTOP: [0.25, 0.1, 0.25, 1.0] },
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

  // Limit visible skills on mobile for better performance
  const visibleSkills = useMemo(() => {
    return isMobile ? 
      SKILL_PROGRESSIONS.slice(0, Math.min(SKILL_PROGRESSIONS.length, 5)) : 
      SKILL_PROGRESSIONS;
  }, [isMobile]);

  // ==========================================================================
  // Animation Helpers
  // ==========================================================================
  const getFooterAnim = () => ({
    initial: { opacity: 0, y: isMobile ? 5 : 10 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : isMobile ? 5 : 10 },
    transition: { 
      duration: isMobile ? ANIMATION.DURATION.MOBILE.MEDIUM : ANIMATION.DURATION.DESKTOP.MEDIUM,
      delay: isMobile ? 0.5 : 0.6,
      ease: isMobile ? ANIMATION.EASING.SMOOTH.MOBILE : ANIMATION.EASING.SMOOTH.DESKTOP
    }
  });

  const getSkillDelay = (index: number) => {
    const cappedIdx = Math.min(index, isMobile ? 2 : 4);
    return (isMobile ? ANIMATION.DELAY.BASE.MOBILE : ANIMATION.DELAY.BASE.DESKTOP) + 
      cappedIdx * (isMobile ? ANIMATION.DELAY.INCREMENT.MOBILE : ANIMATION.DELAY.INCREMENT.DESKTOP);
  };

  // ==========================================================================
  // Render
  // ==========================================================================
  return (
    <div className="h-full flex flex-col justify-between relative">
      {/* Decorative elements - simplified for mobile */}
      {isMobile ? (
        <div className="absolute right-0 top-0 w-8 h-1 bg-[var(--accent)]" />
      ) : (
        <>
          <div className="absolute right-0 top-0 w-10 h-1 bg-[var(--accent)]" />
          <div className="absolute left-0 bottom-1/4 w-3 h-28 bg-[var(--accent-secondary)] opacity-70" />
        </>
      )}
      
      {/* Header section */}
      <SwissMotion
        type="fade"
        delay={isMobile ? 0.1 : 0.2}
        className="mb-8"
        mobileOptimized={true}
      >
        <h3 className="swiss-heading-3 mb-6">KEY EXPERTISE</h3>
        <p className="swiss-body max-w-lg mb-10">
          My focus areas span across frontend development with an emphasis on modern technologies and responsive design principles.
        </p>
      </SwissMotion>
      
      {/* Skills list */}
      <div className="space-y-5 mb-10">
        {visibleSkills.map((skill, index) => {
          const delay = getSkillDelay(index);

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: isMobile ? -5 : -10 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : isMobile ? -5 : -10 }}
              transition={{ 
                duration: isMobile ? ANIMATION.DURATION.MOBILE.MEDIUM : ANIMATION.DURATION.DESKTOP.MEDIUM,
                delay,
                ease: isMobile ? ANIMATION.EASING.SMOOTH.MOBILE : ANIMATION.EASING.SMOOTH.DESKTOP
              }}
              className="group"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {/* Static square for mobile, animated for desktop */}
                  {isMobile ? (
                    <div className="w-2 h-2 bg-[var(--accent)] mr-3" />
                  ) : (
                    <motion.div
                      className="w-2 h-2 bg-[var(--accent)] mr-3"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: isInView ? 1 : 0.8 }}
                      transition={{ 
                        duration: ANIMATION.DURATION.DESKTOP.SHORT,
                        delay: delay + 0.05,
                        ease: ANIMATION.EASING.EASE_OUT
                      }}
                    />
                  )}
                  <span className={`text-base font-medium ${!isMobile && 'group-hover:text-[var(--accent)]'} transition-colors duration-200`}>
                    {skill.name}
                  </span>
                </div>
                <NumberCounter
                  end={skill.percentage}
                  duration={isMobile ? 0.8 : 1.2}
                  delay={delay + (isMobile ? 0.1 : 0.15)}
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
                    delay: delay + (isMobile ? 0.1 : 0.15),
                    ease: isMobile ? ANIMATION.EASING.SMOOTH.MOBILE : ANIMATION.EASING.SMOOTH.DESKTOP
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Show a "View All Skills" button on mobile if content is limited */}
      {isMobile && visibleSkills.length < SKILL_PROGRESSIONS.length && (
        <SwissMotion
          type="fade"
          delay={0.4}
          duration={0.3}
          className="mb-6 flex justify-center"
          mobileOptimized={true}
        >
          <button className="px-4 py-2 text-sm bg-[var(--card-hover)] border border-[var(--border)] rounded-sm">
            View All Skills
          </button>
        </SwissMotion>
      )}
      
      {/* Footer section */}
      <motion.div {...getFooterAnim()} className="mt-auto swiss-card relative">
        {/* Decorative accent - simplified for mobile */}
        <div className={`absolute top-0 right-0 ${isMobile ? 'w-1/6' : 'w-1/5'} h-1 bg-[var(--accent-tertiary)]`} />
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