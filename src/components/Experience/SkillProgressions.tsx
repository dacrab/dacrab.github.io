import { motion } from "framer-motion";
import { SKILL_PROGRESSIONS } from "./types";

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
      <div className="bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden p-6 md:p-8">
        <h3 className="text-xl font-bold text-gradient-animated mb-4">Key Expertise</h3>
        
        {/* Skill progression bars */}
        <div className="space-y-6">
          {SKILL_PROGRESSIONS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="text-xs text-accent">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-card/30 rounded-full h-2.5 overflow-hidden">
                <motion.div 
                  className="bg-accent h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isInView ? `${skill.percentage}%` : 0 }}
                  transition={{ duration: 1, delay: 0.7 + (index * 0.1) }}
                />
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
            My career trajectory reflects a continuous commitment to technical excellence, collaborative innovation, 
            and delivering exceptional user experiences. Specializing in modern frontend architecture with React and 
            Next.js, I combine creative problem-solving with meticulous attention to detail.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
} 