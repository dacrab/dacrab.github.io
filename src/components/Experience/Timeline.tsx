import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import TimelineEntry from "./TimelineEntry";
import { EXPERIENCES } from "./types";

interface TimelineProps {
  isInView: boolean;
}

export default function Timeline({ isInView }: TimelineProps) {
  return (
    <>
      <div className="my-12 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl font-bold mb-2"
        >
          Career Timeline
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-16 h-0.5 bg-accent/70 mx-auto mb-4"
        />
      </div>

      {/* Timeline with cards */}
      <div className="relative max-w-5xl mx-auto mt-24">
        {/* Vertical line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/50 z-0"></div>
        
        {/* Timeline entries */}
        <div className="relative z-10">
          {EXPERIENCES.map((exp, index) => (
            <ScrollReveal
              key={exp.id}
              direction={index % 2 === 0 ? "left" : "right"}
              className="mb-20 relative"
              duration={0.7}
              delay={0.1 * index}
              distance={50}
              threshold={0.1}
            >
              <TimelineEntry
                position={index % 2 === 0 ? 'left' : 'right'}
                date={exp.period}
                company={exp.company}
                title={exp.role}
                description={exp.description}
                technologies={exp.skills}
                isInView={isInView}
                index={index}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </>
  );
} 