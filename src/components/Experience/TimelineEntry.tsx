import { motion } from "framer-motion";
import { memo } from "react";

export interface TimelineEntryProps {
  position: "left" | "right";
  desktopPosition?: "left" | "right"; // Added for responsive positioning
  date: string;
  company: string;
  title: string;
  description: string[];
  technologies: string[];
  isInView: boolean;
  index: number;
}

// Memoize the component to prevent unnecessary re-renders
const TimelineEntry = memo(function TimelineEntry({
  position,
  desktopPosition,
  date,
  company,
  title,
  description,
  technologies,
  isInView,
  index
}: TimelineEntryProps) {
  // Use desktop position (if provided) for md+ screens, otherwise use position
  const effectivePosition = desktopPosition || position;
  
  // Base styling for responsive approach - always right aligned on mobile
  // Only use left/right positioning on desktop screens
  const containerClasses = `relative flex flex-row items-start
    ${effectivePosition === "left" ? "md:flex-row-reverse" : ""}
    mb-2
  `;

  const contentClasses = `
    bg-card/40 backdrop-blur-sm rounded-lg border border-border/20
    shadow-sm p-4 md:p-5 flex-grow 
    ml-6 md:ml-0 md:mr-0
    ${effectivePosition === "left" ? "md:ml-6" : "md:mr-6"}
    relative
  `;

  // Dot indicator styles - adaptive for mobile
  const dotClasses = `
    absolute z-10
    left-0 md:left-auto
    ${effectivePosition === "left" ? "md:right-0" : "md:left-0"}
    top-2 md:top-5
    w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent/20 border border-accent/50
    flex items-center justify-center
    transform md:translate-x-0
    ${effectivePosition === "left" ? "md:translate-x-1/2" : "md:translate-x-[-50%]"}
  `;

  // Date indicator styles - hidden on mobile, visible in desktop
  const dateClasses = `
    hidden md:flex items-center
    min-w-[130px] md:w-[160px]
    ${effectivePosition === "left" ? "justify-start" : "justify-end"}
    text-sm md:text-base text-muted
  `;
  
  // Mobile date display - visible only on mobile at the top of the card
  const mobileDateClasses = `
    inline-block md:hidden 
    text-xs text-muted
    mb-2 bg-card/50 px-2 py-0.5 rounded
  `;

  // Simplified delay calculation for better mobile performance
  const delayBase = 0.2;
  const delayStep = Math.min(index, 3) * 0.05;
  
  return (
    <motion.div className={containerClasses}>
      {/* Timeline entry dot/marker */}
      <div className={dotClasses}>
        <motion.div
          className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent"
          initial={{ scale: 0 }}
          animate={{ scale: isInView ? 1 : 0 }}
          transition={{ duration: 0.3, delay: delayBase + delayStep }}
        />
      </div>

      {/* Desktop date display */}
      <div className={dateClasses}>
        <span>{date}</span>
      </div>

      {/* Content card */}
      <div className={contentClasses}>
        {/* Mobile date display */}
        <span className={mobileDateClasses}>{date}</span>
        
        <motion.h4
          className="text-base md:text-lg font-bold mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.3, delay: delayBase + 0.1 + delayStep }}
        >
          {title}
        </motion.h4>

        <motion.h5
          className="text-sm md:text-base text-accent mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.3, delay: delayBase + 0.15 + delayStep }}
        >
          {company}
        </motion.h5>

        <motion.div
          className="text-muted text-sm space-y-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.3, delay: delayBase + 0.2 + delayStep }}
        >
          {description.map((paragraph, i) => (
            <p key={i} className="flex items-start">
              <span className="text-accent mr-2 text-lg leading-tight">•</span>
              <span>{paragraph}</span>
            </p>
          ))}
        </motion.div>

        {/* Technology tags */}
        <motion.div
          className="flex flex-wrap gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.3, delay: delayBase + 0.25 + delayStep }}
        >
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-md border border-border/20 bg-card/40 text-muted"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
});

export default TimelineEntry;