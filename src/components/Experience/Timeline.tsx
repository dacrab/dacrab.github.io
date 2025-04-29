import { motion } from "framer-motion";
import TimelineEntry from "./TimelineEntry";
import { EXPERIENCES } from "./types";
import { memo, useMemo } from "react";

interface TimelineProps {
  isInView: boolean;
  isMobile: boolean;
}

// Animation constants
const MOBILE_ANIM_DURATION = 0.4;
const DESKTOP_ANIM_DURATION = 0.5;
const MOBILE_ANIM_DELAY = 0.2;

const Timeline = memo(function Timeline({ isInView, isMobile }: TimelineProps) {
  // Animation configs
  const animations = useMemo(() => ({
    main: {
      initial: { opacity: 0, y: isMobile ? 10 : 15 },
      animate: { 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : isMobile ? 10 : 15 
      },
      transition: { 
        duration: isMobile ? MOBILE_ANIM_DURATION : DESKTOP_ANIM_DURATION,
        delay: MOBILE_ANIM_DELAY
      },
    },
    verticalLine: {
      height: { 
        duration: isMobile ? 0.6 : 0.8, 
        delay: 0.4, 
        ease: "easeOut" 
      },
    },
    endMarker: {
      initial: { opacity: 0, scale: 0 },
      animate: { 
        opacity: isInView ? 1 : 0, 
        scale: isInView ? 1 : 0 
      },
      transition: { 
        duration: isMobile ? MOBILE_ANIM_DURATION : DESKTOP_ANIM_DURATION,
        delay: 0.8 
      },
    },
    endMarkerPulse: {
      animate: { 
        scale: [1, 1.2, 1], 
        opacity: [0.7, 1, 0.7] 
      },
      transition: { 
        duration: isMobile ? 2 : 1.5, 
        repeat: Infinity, 
        repeatType: "reverse" as const 
      },
    }
  }), [isInView, isMobile]);

  return (
    <motion.div className="swiss-container relative z-10" {...animations.main}>
      <div className="mb-12">
        <h3 className="swiss-heading-3 mb-8">CAREER TIMELINE</h3>
        
        {/* Decorative accent elements */}
        <div className="absolute left-0 top-12 w-2 h-24 bg-[var(--accent-secondary)] opacity-70" />
        <div className="absolute right-0 top-8 w-8 h-1 bg-[var(--accent)]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Vertical timeline line - responsive */}
        <div className="hidden md:grid md:grid-cols-[160px_1fr_160px] md:mx-auto">
          <div />
          <div className="relative">
            <motion.div
              className="absolute inset-0 mx-auto w-px bg-[var(--accent)]"
              style={{ left: "50%" }}
              initial={{ height: 0 }}
              animate={{ height: isInView ? "100%" : 0 }}
              transition={animations.verticalLine}
            />
          </div>
          <div />
        </div>
        <motion.div
          className="absolute md:hidden left-4 top-0 bottom-0 w-0.5 bg-[var(--accent)]"
          initial={{ height: 0 }}
          animate={{ height: isInView ? "100%" : 0 }}
          transition={animations.verticalLine}
        />

        {/* Timeline entries */}
        <div className="relative z-10">
          {EXPERIENCES.map((exp, index) => (
            <div key={exp.id} className="mb-8 md:mb-12 relative">
              <TimelineEntry
                position="right"
                desktopPosition={index % 2 === 0 ? "left" : "right"}
                date={exp.period}
                company={exp.company}
                title={exp.role}
                description={exp.description}
                technologies={exp.skills}
                isInView={isInView}
                index={index}
                isMobile={isMobile}
              />
            </div>
          ))}
        </div>

        {/* Timeline end marker - responsive */}
        <div className="relative">
          <motion.div
            className="md:hidden absolute left-4 -bottom-2 w-6 h-6 rounded-sm border border-[var(--accent)] flex items-center justify-center bg-[var(--card)] z-10"
            {...animations.endMarker}
          >
            <motion.div className="w-2 h-2 bg-[var(--accent)]" {...animations.endMarkerPulse} />
          </motion.div>
          <motion.div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-2 w-8 h-8 rounded-sm border border-[var(--accent)] items-center justify-center bg-[var(--card)] z-10"
            {...animations.endMarker}
          >
            <motion.div className="w-2.5 h-2.5 bg-[var(--accent)]" {...animations.endMarkerPulse} />
          </motion.div>
        </div>
        
        {/* Decorative accent element */}
        <div className="absolute right-1/4 bottom-10 w-12 h-12 bg-[var(--accent-tertiary)] opacity-80" />
      </div>
    </motion.div>
  );
});

export default Timeline;