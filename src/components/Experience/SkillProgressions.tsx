import { motion } from "framer-motion";
import { SKILL_PROGRESSIONS } from "./types";
import NumberCounter from "./NumberCounter";

interface SkillProgressionsProps {
  isInView: boolean;
}

export default function SkillProgressions({ isInView }: SkillProgressionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full h-full flex flex-col justify-center order-1 lg:order-2"
    >
      <div className="bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden p-6 md:p-8 relative">
        {/* Background decoration */}
        <motion.div 
          className="absolute -z-10 top-0 right-0 w-32 h-32 rounded-full bg-accent/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        <motion.h3 
          className="text-xl font-bold text-gradient-animated mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Key Expertise
        </motion.h3>
        
        {/* Skill progression bars */}
        <div className="space-y-6">
          {SKILL_PROGRESSIONS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
              whileHover={{ 
                x: 5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium flex items-center gap-1">
                  <motion.span
                    animate={{
                      rotate: isInView ? [0, 5, 0, -5, 0] : 0
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 1.2 + (index * 0.2),
                      ease: "easeInOut"
                    }}
                    className="inline-block"
                  >
                    ✦
                  </motion.span>
                  {skill.name}
                </span>
                <NumberCounter
                  end={skill.percentage}
                  duration={1.5}
                  delay={0.7 + (index * 0.1)}
                  suffix="%"
                  isInView={isInView}
                  className="text-xs text-accent font-semibold"
                />
              </div>
              <div className="w-full bg-card/30 rounded-full h-2.5 overflow-hidden">
                <motion.div 
                  className="bg-accent h-full rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${skill.percentage}%` : 0 }}
                  transition={{ duration: 1, delay: 0.7 + (index * 0.1) }}
                >
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute right-0 top-0 h-full w-4 bg-white/20 blur-[1px]"
                    animate={{
                      x: isInView ? [-20, 0] : -20
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 1.5 + (index * 0.1)
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Professional approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-6 pt-6 border-t border-border/30"
        >
          <p className="text-sm text-muted">
            As a junior developer, I&apos;m passionate about expanding my technical skills and growing in the field of web development. 
            I&apos;m enthusiastic about learning modern frontend technologies like React and Next.js, and I approach each project as an opportunity 
            to improve my abilities. My focus is on writing clean, maintainable code while developing responsive and user-friendly interfaces.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
} 