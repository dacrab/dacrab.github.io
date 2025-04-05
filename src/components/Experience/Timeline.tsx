import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import TimelineEntry from "./TimelineEntry";
import { EXPERIENCES } from "./types";

interface TimelineProps {
  isInView: boolean;
}

export default function Timeline({ isInView }: TimelineProps) {
  return (
    <motion.div
      className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-border/20 shadow-xl backdrop-blur-sm p-8 md:p-12"
      style={{ background: "rgba(var(--card-rgb), 0.6)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="text-center mb-12">
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -10 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold mb-4 inline-block text-gradient"
        >
          Career Timeline
        </motion.h3>
        
        <motion.div
          className="h-0.5 w-20 bg-accent/50 mx-auto mb-6"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isInView ? 80 : 0, opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 0.8 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-muted max-w-xl mx-auto"
        >
          A chronological journey through my professional experience and skill development in web development
        </motion.p>
      </div>

      {/* Timeline with cards */}
      <div className="relative max-w-5xl mx-auto mt-20">
        {/* Vertical line */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/60 to-accent/20"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isInView ? "100%" : 0, opacity: isInView ? 1 : 0 }}
          transition={{ 
            height: { duration: 1.2, delay: 0.6, ease: "easeOut" },
            opacity: { duration: 0.6, delay: 0.6 }
          }}
        />
        
        {/* Timeline entries */}
        <div className="relative z-10">
          {EXPERIENCES.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const direction = isLeft ? "left" : "right";
            const position = isLeft ? "left" : "right";
            
            return (
              <ScrollReveal
                key={exp.id}
                direction={direction}
                className="mb-16 md:mb-20 relative"
                duration={0.7}
                delay={0.6 + (0.15 * index)}
                distance={40}
                threshold={0.1}
              >
                <TimelineEntry
                  position={position}
                  date={exp.period}
                  company={exp.company}
                  title={exp.role}
                  description={exp.description}
                  technologies={exp.skills}
                  isInView={isInView}
                  index={index}
                />
              </ScrollReveal>
            );
          })}
        </div>
        
        {/* Timeline end marker */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-10 h-10 rounded-full border border-accent/50 flex items-center justify-center bg-card/30 backdrop-blur-sm shadow-lg z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: "backOut" }}
        >
          <motion.div 
            className="w-3 h-3 bg-accent rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}