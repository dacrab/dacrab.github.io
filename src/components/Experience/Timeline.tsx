import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import TimelineEntry from "./TimelineEntry";
import { EXPERIENCES } from "./types";

interface TimelineProps {
  isInView: boolean;
}

export default function Timeline({ isInView }: TimelineProps) {
  // Section title animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Line underscore animation variants
  const lineVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: {
      opacity: 1,
      width: "4rem",
      transition: {
        duration: 0.6,
        ease: [0.65, 0, 0.35, 1]
      }
    }
  };

  // Timeline dots animation variants
  const dotsVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: (delay: number) => ({
      opacity: [0, 1, 0.7],
      scale: [0, 1.3, 1],
      transition: {
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <div className="my-12 text-center">
        <motion.h3
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-2xl font-bold mb-2 relative inline-block"
        >
          Career Timeline
          <motion.span 
            className="absolute -z-10 inset-0 bg-accent/5 blur-xl rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isInView ? [0, 0.6, 0.3] : 0,
              scale: isInView ? [0.5, 1.2, 1] : 0.5,
            }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
        </motion.h3>
        <motion.div
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-4"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 0.7 : 0, y: isInView ? 0 : 10 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-muted max-w-md mx-auto"
        >
          A chronological journey through my professional experience
        </motion.p>
      </div>

      {/* Timeline with cards */}
      <div className="relative max-w-5xl mx-auto mt-24">
        {/* Vertical line */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/50 to-accent/20 z-0"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isInView ? "100%" : 0,
            opacity: isInView ? 1 : 0
          }}
          transition={{ 
            height: { duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.6, delay: 0.4 }
          }}
        />
        
        {/* Main timeline dots (fixed positions) */}
        {EXPERIENCES.map((_, i) => (
          <motion.div
            key={`main-dot-${i}`}
            custom={0.4 + (i * 0.15)}
            variants={dotsVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent z-0"
            style={{ 
              top: `${(i / (EXPERIENCES.length - 1)) * 100}%`,
              boxShadow: "0 0 10px rgba(var(--accent-rgb), 0.5)"
            }}
          />
        ))}
        
        {/* Animated floating dots along the timeline */}
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((position, i) => (
          <motion.div
            key={`floating-dot-${i}`}
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent/70 z-0"
            style={{ top: `${position * 100}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: isInView ? [0, 0.7, 0] : 0, 
              scale: isInView ? [0, 1, 0] : 0,
              y: isInView ? [0, -30] : 0
            }}
            transition={{ 
              duration: 3, 
              delay: 1.5 + (i * 0.3),
              repeat: Infinity,
              repeatDelay: 3 + (i * 0.5)
            }}
          />
        ))}
        
        {/* Timeline entries */}
        <div className="relative z-10">
          {EXPERIENCES.map((exp, index) => (
            <ScrollReveal
              key={exp.id}
              direction={index % 2 === 0 ? "left" : "right"}
              className="mb-20 relative"
              duration={0.7}
              delay={0.3 + (0.15 * index)}
              distance={60}
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
        
        {/* Timeline end marker */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-8 rounded-full border-2 border-accent/50 flex items-center justify-center z-10 bg-card/30 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0, y: -20 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            scale: isInView ? 1 : 0,
            y: isInView ? 0 : -20
          }}
          transition={{ 
            duration: 0.7, 
            delay: 1.5,
            ease: "backOut"
          }}
        >
          <motion.div 
            className="w-3 h-3 bg-accent rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
              boxShadow: [
                "0 0 0 rgba(var(--accent-rgb), 0)",
                "0 0 15px rgba(var(--accent-rgb), 0.5)",
                "0 0 0 rgba(var(--accent-rgb), 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Radiating pulse effects */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30"
              initial={{ width: 8, height: 8, opacity: 0 }}
              animate={{ 
                width: ["8px", "50px"],
                height: ["8px", "50px"],
                opacity: [0, 0.5, 0],
                x: "-50%",
                y: "-50%"
              }}
              transition={{
                duration: 2,
                delay: i * 0.7,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
} 