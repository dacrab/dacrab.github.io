import { motion } from "framer-motion";
import { memo } from "react";

export interface TimelineEntryProps {
  position: "left" | "right";
  desktopPosition?: "left" | "right";
  date: string;
  company: string;
  title: string;
  description: string[];
  technologies: string[];
  isInView: boolean;
  index: number;
  isMobile: boolean;
}

const TimelineEntry = memo(function TimelineEntry({
  position,
  desktopPosition,
  date,
  company,
  title,
  description,
  technologies,
  isInView,
  index,
  isMobile
}: TimelineEntryProps) {
  // Determine effective position (desktop overrides mobile)
  const effectivePosition = desktopPosition || position;

  // Classes
  const containerClasses = `relative grid grid-cols-[auto_1fr] md:grid-cols-[160px_auto_160px] items-start mb-2`;
  const contentGridColClass =
    effectivePosition === "left"
      ? "col-span-1 md:col-start-1 md:col-end-3"
      : "col-span-1 md:col-start-2 md:col-end-4";
  const contentClasses = [
    "swiss-card relative p-4 md:p-5 ml-6 md:ml-0 md:mr-0",
    effectivePosition === "left" ? "md:mr-6" : "md:ml-6"
  ].join(" ");
  const dotClasses =
    "absolute z-10 left-0 md:left-50% top-2 md:top-5 w-3 h-3 md:w-4 md:h-4 bg-[var(--accent)]";
  const dotStyles = {
    [effectivePosition === "left" ? "right" : "left"]: "-12px",
    transform: "translateX(-50%)"
  };
  const dateClasses = [
    "hidden md:flex items-center min-w-[130px] md:w-[160px]",
    `col-span-1 md:col-start-${effectivePosition === "left" ? "3" : "1"}`,
    effectivePosition === "left"
      ? "justify-start md:pl-6"
      : "justify-end md:pr-6",
    "text-sm md:text-base text-[var(--muted)]"
  ].join(" ");
  const mobileDateClasses =
    "inline-block md:hidden text-xs text-[var(--muted)] mb-2 bg-[var(--card-hover)] px-2 py-0.5";

  // Animation delays
  const delayBase = isMobile ? 0.15 : 0.2;
  const delayStep = Math.min(index, isMobile ? 2 : 3) * (isMobile ? 0.04 : 0.05);

  // Animation configs
  const getAnim = (extraDelay = 0) => ({
    initial: { opacity: 0, y: isMobile ? 8 : 10 },
    animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : isMobile ? 8 : 10 },
    transition: { duration: isMobile ? 0.25 : 0.3, delay: delayBase + delayStep + extraDelay }
  });
  const getFadeAnim = (extraDelay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: isInView ? 1 : 0 },
    transition: { duration: isMobile ? 0.25 : 0.3, delay: delayBase + delayStep + extraDelay }
  });

  return (
    <div className={containerClasses}>
      {/* Desktop date */}
      <div className={dateClasses}>
        <span>{date}</span>
      </div>
      {/* Content */}
      <div className={contentGridColClass}>
        <motion.div className={contentClasses} {...getAnim()}>
          {/* Swiss style accent elements on card */}
          <div className="absolute top-0 left-0 w-1/4 h-1 bg-[var(--accent)]"></div>
          <div className="absolute bottom-0 right-0 w-1 h-1/4 bg-[var(--accent-secondary)]"></div>
          
          {/* Timeline dot */}
          <div className={dotClasses} style={dotStyles}>
            <motion.div
              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white"
              initial={{ scale: 0 }}
              animate={{ scale: isInView ? 1 : 0 }}
              transition={{
                duration: isMobile ? 0.25 : 0.3,
                delay: delayBase + delayStep
              }}
            />
          </div>
          {/* Mobile date */}
          <span className={mobileDateClasses}>{date}</span>
          <motion.h4
            className="text-base md:text-lg font-bold mb-1"
            {...getFadeAnim(0.1)}
          >
            {title}
          </motion.h4>
          <motion.h5
            className="text-sm md:text-base text-[var(--accent)] mb-3"
            {...getFadeAnim(0.15)}
          >
            {company}
          </motion.h5>
          <motion.div
            className="text-[var(--muted)] text-sm space-y-2 mb-4"
            {...getFadeAnim(0.2)}
          >
            {description.map((paragraph, i) => (
              <p key={i} className="flex items-start">
                <span className="text-[var(--accent)] mr-2 text-lg leading-tight">•</span>
                <span>{paragraph}</span>
              </p>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-1.5"
            {...getFadeAnim(0.25)}
          >
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-[var(--card-hover)] rounded-sm"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

export default TimelineEntry;