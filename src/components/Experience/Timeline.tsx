import { motion } from "framer-motion";
import TimelineEntry from "./TimelineEntry";
import { EXPERIENCES } from "./types";
import { memo, useMemo } from "react";

interface TimelineProps {
  isInView: boolean;
  isMobile: boolean;
}

const Timeline = memo(function Timeline({ isInView, isMobile }: TimelineProps) {
  // Animation configs
  const mainAnim = useMemo(
    () => ({
      initial: { opacity: 0, y: isMobile ? 10 : 15 },
      animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : isMobile ? 10 : 15 },
      transition: { duration: isMobile ? 0.4 : 0.5, delay: 0.2 },
    }),
    [isInView, isMobile]
  );

  const verticalLineTrans = useMemo(
    () => ({
      height: { duration: isMobile ? 0.6 : 0.8, delay: 0.4, ease: "easeOut" },
    }),
    [isMobile]
  );

  const endMarkerAnim = useMemo(
    () => ({
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 },
      transition: { duration: isMobile ? 0.4 : 0.5, delay: 0.8 },
    }),
    [isInView, isMobile]
  );

  const endMarkerPulse = useMemo(
    () => ({
      animate: { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] },
      transition: { duration: isMobile ? 2 : 1.5, repeat: Infinity, repeatType: "reverse" as const },
    }),
    [isMobile]
  );

  return (
    <motion.div
      className="swiss-container relative z-10"
      {...mainAnim}
    >
      <div className="mb-12">
        <h3 className="swiss-heading-3 mb-8">CAREER TIMELINE</h3>
        
        {/* Swiss style accent elements */}
        <div className="absolute left-0 top-12 w-2 h-24 bg-[var(--accent-secondary)] opacity-70"></div>
        <div className="absolute right-0 top-8 w-8 h-1 bg-[var(--accent)]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Desktop vertical line */}
        <div className="hidden md:grid md:grid-cols-[160px_1fr_160px] md:mx-auto">
          <div />
          <div className="relative">
            <motion.div
              className="absolute inset-0 mx-auto w-px bg-[var(--accent)]"
              style={{ left: "50%" }}
              initial={{ height: 0 }}
              animate={{ height: isInView ? "100%" : 0 }}
              transition={verticalLineTrans}
            />
          </div>
          <div />
        </div>
        {/* Mobile vertical line */}
        <motion.div
          className="absolute md:hidden left-4 top-0 bottom-0 w-0.5 bg-[var(--accent)]"
          initial={{ height: 0 }}
          animate={{ height: isInView ? "100%" : 0 }}
          transition={verticalLineTrans}
        />

        {/* Timeline entries */}
        <div className="relative z-10">
          {EXPERIENCES.map((exp, index) => {
            const isLeft = index % 2 === 0;
            // Always right on mobile, alternate on desktop
            return (
              <div
                key={exp.id}
                className="mb-8 md:mb-12 relative"
              >
                <TimelineEntry
                  position="right"
                  desktopPosition={isLeft ? "left" : "right"}
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
            );
          })}
        </div>

        {/* Timeline end marker */}
        <div className="relative">
          <motion.div
            className="md:hidden absolute left-4 -bottom-2 w-6 h-6 rounded-sm border border-[var(--accent)] flex items-center justify-center bg-[var(--card)] z-10"
            {...endMarkerAnim}
          >
            <motion.div
              className="w-2 h-2 bg-[var(--accent)]"
              {...endMarkerPulse}
            />
          </motion.div>
          <motion.div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-2 w-8 h-8 rounded-sm border border-[var(--accent)] items-center justify-center bg-[var(--card)] z-10"
            {...endMarkerAnim}
          >
            <motion.div
              className="w-2.5 h-2.5 bg-[var(--accent)]"
              {...endMarkerPulse}
            />
          </motion.div>
        </div>
        
        {/* Swiss style accent element at bottom */}
        <div className="absolute right-1/4 bottom-10 w-12 h-12 bg-[var(--accent-tertiary)] opacity-80"></div>
      </div>
    </motion.div>
  );
});

export default Timeline;