import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import TimelineEntry from "./TimelineEntry";
import { EXPERIENCES } from "./types";
import { memo } from "react";

interface TimelineProps {
  isInView: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const Timeline = memo(function Timeline({ isInView }: TimelineProps) {
  return (
    <motion.div
      className="max-w-6xl mx-auto rounded-xl overflow-hidden border border-border/20 shadow-md backdrop-blur-sm p-4 md:p-8"
      style={{ background: "rgba(var(--card-rgb), 0.6)" }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="text-center mb-6 md:mb-8">
        <motion.h3
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -5 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-xl md:text-2xl font-bold mb-2 inline-block text-gradient"
        >
          Career Timeline
        </motion.h3>
        
        <motion.div
          className="h-0.5 w-12 md:w-16 bg-accent/50 mx-auto mb-3 md:mb-4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: isInView ? 64 : 0, opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isInView ? 0.8 : 0, y: isInView ? 0 : 5 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-muted max-w-xl mx-auto text-sm md:text-base"
        >
          A chronological journey through my professional experience and skill development
        </motion.p>
      </div>

      {/* Timeline with cards - redesigned for desktop alignment */}
      <div className="relative max-w-5xl mx-auto mt-10 md:mt-14">
        {/* Desktop grid container to ensure proper alignment */}
        <div className="hidden md:grid md:grid-cols-[160px_1fr_160px] md:mx-auto">
          {/* Left spacer */}
          <div></div>
          
          {/* Center line container */}
          <div className="relative">
            {/* Vertical line - centered precisely */}
            <motion.div 
              className="absolute inset-0 mx-auto w-px bg-gradient-to-b from-transparent via-accent/60 to-accent/20"
              style={{ left: "50%" }}
              initial={{ height: 0 }}
              animate={{ height: isInView ? "100%" : 0 }}
              transition={{ 
                height: { duration: 0.8, delay: 0.4, ease: "easeOut" }
              }}
            />
          </div>
          
          {/* Right spacer */}
          <div></div>
        </div>
        
        {/* Mobile vertical line - visible only on small screens */}
        <motion.div 
          className="absolute md:hidden left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent/60 to-accent/20"
          initial={{ height: 0 }}
          animate={{ height: isInView ? "100%" : 0 }}
          transition={{ 
            height: { duration: 0.8, delay: 0.4, ease: "easeOut" }
          }}
        />
        
        {/* Timeline entries */}
        <div className="relative z-10">
          {EXPERIENCES.map((exp, index) => {
            // On desktop: alternate left/right
            // On mobile: all entries on right side of timeline
            const isLeft = index % 2 === 0;
            
            // Animation direction is always from right on mobile, alternates on desktop
            const direction = isLeft ? "left" : "right";
            
            // Position always right on mobile, alternates on desktop
            const position = "right"; // Mobile default
            const desktopPosition = isLeft ? "left" : "right";
            
            return (
              <ScrollReveal
                key={exp.id}
                direction={direction}
                className="mb-8 md:mb-12 relative"
                duration={0.5}
                delay={0.3 + (0.08 * Math.min(index, 3))}
                distance={20}
                threshold={0.1}
              >
                <TimelineEntry
                  position={position}
                  desktopPosition={desktopPosition}
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
        
        {/* Timeline end marker with better positioning */}
        <div className="relative">
          {/* Mobile end marker */}
          <motion.div
            className="md:hidden absolute left-4 -bottom-2 w-6 h-6 rounded-full border border-accent/50 flex items-center justify-center bg-card/30 backdrop-blur-sm shadow-md z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div 
              className="w-2 h-2 bg-accent rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
          
          {/* Desktop end marker - centered in grid */}
          <motion.div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-2 w-8 h-8 rounded-full border border-accent/50 items-center justify-center bg-card/30 backdrop-blur-sm shadow-md z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <motion.div 
              className="w-2.5 h-2.5 bg-accent rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

export default Timeline;