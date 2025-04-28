import { motion } from "framer-motion";
import { SKILL_PROGRESSIONS } from "./types";
import NumberCounter from "./NumberCounter";
import { memo } from "react";

interface SkillProgressionsProps {
  isInView: boolean;
  isMobile: boolean;
}

const SkillProgressions = memo(function SkillProgressions({ isInView, isMobile }: SkillProgressionsProps) {
  // Animation helpers
  const getFooterAnim = () => ({
    initial: { opacity: 0, y: isMobile ? 8 : 10 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : isMobile ? 8 : 10 },
    transition: { duration: isMobile ? 0.3 : 0.4, delay: 0.6 }
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
          const delay = 0.15 + cappedIdx * (isMobile ? 0.06 : 0.08);

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: isMobile ? -8 : -10 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : isMobile ? -8 : -10 }}
              transition={{ duration: isMobile ? 0.3 : 0.4, delay }}
              className="group"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <motion.div
                    className="w-2 h-2 bg-[var(--accent)] mr-3"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isInView ? 1 : 0.8 }}
                    transition={{ duration: isMobile ? 0.25 : 0.3, delay: delay + 0.05 }}
                  />
                  <span className="text-base font-medium group-hover:text-[var(--accent)] transition-colors duration-200">
                    {skill.name}
                  </span>
                </div>
                <NumberCounter
                  end={skill.percentage}
                  duration={isMobile ? 0.8 : 1}
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
                    willChange: "width"
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${skill.percentage}%` : 0 }}
                  transition={{ 
                    duration: isMobile ? 0.6 : 0.8, 
                    delay: delay + 0.15, 
                    ease: [0.17, 0.67, 0.83, 0.67] 
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