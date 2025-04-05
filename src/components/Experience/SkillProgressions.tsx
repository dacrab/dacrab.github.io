import { motion } from "framer-motion";
import { SKILL_PROGRESSIONS } from "./types";
import NumberCounter from "./NumberCounter";

interface SkillProgressionsProps {
  isInView: boolean;
}

export default function SkillProgressions({ isInView }: SkillProgressionsProps) {
  const fadeInAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <motion.h3 
        className="text-2xl md:text-3xl font-bold mb-6"
        {...fadeInAnimation}
      >
        <span className="text-gradient">Key Expertise</span>
      </motion.h3>
      
      <motion.p
        className="text-muted max-w-lg mb-8"
        {...fadeInAnimation}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My focus areas span across frontend development with an emphasis on modern technologies and responsive design principles.
      </motion.p>
      
      {/* Skill progression bars */}
      <div className="space-y-6 mb-8">
        {SKILL_PROGRESSIONS.map((skill, index) => {
          const delay = index * 0.1;
          
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.2 + delay }}
              className="group"
            >
              <div className="flex justify-between items-center mb-2">
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-accent mr-2"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.5
                    }}
                  />
                  <span className="text-base font-medium group-hover:text-accent transition-colors duration-300">
                    {skill.name}
                  </span>
                </motion.div>
                
                <NumberCounter
                  end={skill.percentage}
                  duration={1.2}
                  delay={0.4 + delay}
                  suffix="%"
                  isInView={isInView}
                  className="text-sm font-semibold text-accent/90"
                />
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full overflow-hidden bg-card/30 backdrop-blur-sm border border-border/20">
                <motion.div 
                  className="h-full rounded-full relative"
                  style={{
                    background: "linear-gradient(to right, var(--accent-dark), var(--accent))"
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${skill.percentage}%` : 0 }}
                  transition={{ duration: 1, delay: 0.5 + delay, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute top-0 h-full w-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                      backgroundSize: "200% 100%",
                      left: 0
                    }}
                    animate={{
                      backgroundPosition: isInView ? ["100% 0%", "0% 0%", "-100% 0%"] : "100% 0%"
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 1 + delay,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Professional approach */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-auto pt-6 border-t border-border/30"
      >
        <h4 className="text-lg font-semibold mb-3 text-gradient">Professional Approach</h4>
        <p className="text-sm text-muted">
          As a developer, I focus on creating clean, maintainable code while delivering responsive and user-friendly interfaces. 
          I approach each project with enthusiasm and a commitment to excellence, constantly expanding my skills in modern web development technologies.
        </p>
      </motion.div>
    </div>
  );
}