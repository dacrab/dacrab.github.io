import { motion } from "framer-motion";
import { SKILL_PROGRESSIONS } from "./types";
import NumberCounter from "./NumberCounter";
import { memo } from "react";

interface SkillProgressionsProps {
  isInView: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const SkillProgressions = memo(function SkillProgressions({ isInView }: SkillProgressionsProps) {
  // Simplified animation for better mobile performance
  const fadeInAnimation = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 8 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <motion.h3 
        className="text-2xl md:text-3xl font-bold mb-5"
        {...fadeInAnimation}
      >
        <span className="text-gradient">Key Expertise</span>
      </motion.h3>
      
      <motion.p
        className="text-muted max-w-lg mb-6"
        {...fadeInAnimation}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        My focus areas span across frontend development with an emphasis on modern technologies and responsive design principles.
      </motion.p>
      
      {/* Skill progression bars - simplified for mobile */}
      <div className="space-y-5 mb-6">
        {SKILL_PROGRESSIONS.map((skill, index) => {
          // Cap delay for better mobile performance
          const delay = Math.min(index, 4) * 0.08;
          
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
              transition={{ duration: 0.4, delay: 0.15 + delay }}
              className="group"
            >
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-accent mr-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isInView ? 1 : 0.8 }}
                    transition={{ duration: 0.3, delay: 0.2 + delay }}
                  />
                  <span className="text-base font-medium group-hover:text-accent transition-colors duration-200">
                    {skill.name}
                  </span>
                </div>
                
                <NumberCounter
                  end={skill.percentage}
                  duration={1}
                  delay={0.3 + delay}
                  suffix="%"
                  isInView={isInView}
                  className="text-sm font-semibold text-accent/90"
                />
              </div>
              
              {/* Simplified progress bar for better mobile performance */}
              <div className="w-full h-2 rounded-full overflow-hidden bg-card/30 backdrop-blur-sm border border-border/20">
                <motion.div 
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(to right, var(--accent-dark), var(--accent))"
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${skill.percentage}%` : 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + delay, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Professional approach - simplified */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-auto pt-5 border-t border-border/30"
      >
        <h4 className="text-lg font-semibold mb-2 text-gradient">Professional Approach</h4>
        <p className="text-sm text-muted">
          As a developer, I focus on creating clean, maintainable code while delivering responsive and user-friendly interfaces. 
          I approach each project with enthusiasm and a commitment to excellence.
        </p>
      </motion.div>
    </div>
  );
});

export default SkillProgressions;