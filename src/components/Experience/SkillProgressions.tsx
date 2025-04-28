import { motion } from "framer-motion";
import { SKILL_PROGRESSIONS } from "./types";
import NumberCounter from "./NumberCounter";
import { memo, useRef } from "react";

interface SkillProgressionsProps {
  isInView: boolean;
  isMobile: boolean;
}

const SkillProgressions = memo(function SkillProgressions({ isInView, isMobile }: SkillProgressionsProps) {
  // Track previous view state to handle reset
  const wasInView = useRef(false);
  
  // Reset animation when going out of view
  if (!isInView && wasInView.current) {
    wasInView.current = false;
  } else if (isInView) {
    wasInView.current = true;
  }
  
  // Animation helpers
  const getFooterAnim = () => ({
    initial: { opacity: 0, y: isMobile ? 8 : 10 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : isMobile ? 8 : 10 },
    transition: { 
      duration: isMobile ? 0.4 : 0.5, 
      delay: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0] // Improved easing for smoother animation
    }
  });

  return (
    <div className="h-full flex flex-col justify-between relative">
      {/* Swiss style accent elements */}
      <div className="absolute right-0 top-0 w-10 h-1 bg-[var(--accent)]"></div>
      <div className="absolute left-0 bottom-1/4 w-3 h-28 bg-[var(--accent-secondary)] opacity-70"></div>
      
      <div className="mb-8">
        <h3 className="swiss-heading-3 mb-6">KEY EXPERTISE</h3>
        
        <p className="swiss-body max-w-lg mb-10">
          My focus areas span across frontend development with an emphasis on modern technologies and responsive design principles.
        </p>
      </div>
      
      <div className="space-y-5 mb-10">
        {SKILL_PROGRESSIONS.map((skill, index) => {
          // Cap delay for better mobile performance
          const cappedIdx = Math.min(index, isMobile ? 3 : 4);
          // Slightly longer base delay to ensure proper sequence
          const delay = 0.2 + cappedIdx * (isMobile ? 0.08 : 0.1);

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: isMobile ? -8 : -10 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : isMobile ? -8 : -10 }}
              transition={{ 
                duration: isMobile ? 0.4 : 0.5, 
                delay,
                ease: [0.25, 0.1, 0.25, 1.0] // Smoother easing
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
                      duration: isMobile ? 0.3 : 0.4, 
                      delay: delay + 0.05,
                      ease: "easeOut"
                    }}
                  />
                  <span className="text-base font-medium group-hover:text-[var(--accent)] transition-colors duration-200">
                    {skill.name}
                  </span>
                </div>
                <NumberCounter
                  end={skill.percentage}
                  duration={isMobile ? 1.0 : 1.2} // Slightly longer for smoother counting
                  delay={delay + 0.15}
                  suffix="%"
                  isInView={isInView}
                  className="text-sm font-semibold text-[var(--accent)]"
                />
              </div>
              <div className="w-full h-2 bg-[var(--card-hover)]">
                <motion.div 
                  className="h-full"
                  style={{
                    background: "var(--accent)",
                    willChange: "width",
                    originX: 0 // Ensure animation starts from left
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${skill.percentage}%` : "0%" }}
                  // Always start from 0 width when not in view
                  key={`${skill.name}-${isInView ? "visible" : "hidden"}`}
                  transition={{ 
                    duration: isMobile ? 0.8 : 1.0, 
                    delay: delay + 0.15, 
                    ease: [0.25, 0.1, 0.25, 1.0] // Smoother cubic bezier curve
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <motion.div
        {...getFooterAnim()}
        className="mt-auto swiss-card relative"
      >
        {/* Swiss style accent elements for card */}
        <div className="absolute top-0 right-0 w-1/5 h-1 bg-[var(--accent-tertiary)]"></div>
        
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