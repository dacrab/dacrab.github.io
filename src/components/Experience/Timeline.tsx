import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";
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

  const headingAnim = useMemo(
    () => ({
      initial: { opacity: 0, y: isMobile ? -3 : -5 },
      animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : isMobile ? -3 : -5 },
      transition: { duration: isMobile ? 0.3 : 0.4, delay: 0.3 },
    }),
    [isInView, isMobile]
  );

  const lineAnim = useMemo(
    () => ({
      initial: { width: 0, opacity: 0 },
      animate: { width: isInView ? (isMobile ? 48 : 64) : 0, opacity: isInView ? 1 : 0 },
      transition: { duration: isMobile ? 0.4 : 0.5, delay: 0.4 },
    }),
    [isInView, isMobile]
  );

  const paraAnim = useMemo(
    () => ({
      initial: { opacity: 0, y: isMobile ? 3 : 5 },
      animate: { opacity: isInView ? 0.8 : 0, y: isInView ? 0 : isMobile ? 3 : 5 },
      transition: { duration: isMobile ? 0.3 : 0.4, delay: 0.5 },
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
      className="max-w-6xl mx-auto rounded-xl overflow-hidden border border-border/20 shadow-md backdrop-blur-sm p-4 md:p-8"
      style={{ background: "rgba(var(--card-rgb), 0.6)" }}
      {...mainAnim}
    >
      <div className="text-center mb-6 md:mb-8">
        <motion.h3
          {...headingAnim}
          className="text-xl md:text-2xl font-bold mb-2 inline-block text-gradient"
        >
          Career Timeline
        </motion.h3>
        <motion.div
          className="h-0.5 w-12 md:w-16 bg-accent/50 mx-auto mb-3 md:mb-4"
          {...lineAnim}
        />
        <motion.p
          {...paraAnim}
          className="text-muted max-w-xl mx-auto text-sm md:text-base"
        >
          A chronological journey through my professional experience and skill development
        </motion.p>
      </div>

      <div className="relative max-w-5xl mx-auto mt-10 md:mt-14">
        {/* Desktop vertical line */}
        <div className="hidden md:grid md:grid-cols-[160px_1fr_160px] md:mx-auto">
          <div />
          <div className="relative">
            <motion.div
              className="absolute inset-0 mx-auto w-px bg-gradient-to-b from-transparent via-accent/60 to-accent/20"
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
          className="absolute md:hidden left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent/60 to-accent/20"
          initial={{ height: 0 }}
          animate={{ height: isInView ? "100%" : 0 }}
          transition={verticalLineTrans}
        />

        {/* Timeline entries */}
        <div className="relative z-10">
          {EXPERIENCES.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const direction = isLeft ? "left" : "right";
            // Always right on mobile, alternate on desktop
            return (
              <ScrollReveal
                key={exp.id}
                direction={direction}
                className="mb-8 md:mb-12 relative"
                duration={isMobile ? 0.4 : 0.5}
                delay={0.3 + 0.08 * Math.min(index, isMobile ? 2 : 3)}
                distance={isMobile ? 15 : 20}
                threshold={0.1}
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
              </ScrollReveal>
            );
          })}
        </div>

        {/* Timeline end marker */}
        <div className="relative">
          <motion.div
            className="md:hidden absolute left-4 -bottom-2 w-6 h-6 rounded-full border border-accent/50 flex items-center justify-center bg-card/30 backdrop-blur-sm shadow-md z-10"
            {...endMarkerAnim}
          >
            <motion.div
              className="w-2 h-2 bg-accent rounded-full"
              {...endMarkerPulse}
            />
          </motion.div>
          <motion.div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-2 w-8 h-8 rounded-full border border-accent/50 items-center justify-center bg-card/30 backdrop-blur-sm shadow-md z-10"
            {...endMarkerAnim}
          >
            <motion.div
              className="w-2.5 h-2.5 bg-accent rounded-full"
              {...endMarkerPulse}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

export default Timeline;