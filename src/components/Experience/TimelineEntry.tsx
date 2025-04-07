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
  isMobile: boolean;
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
  index,
  isMobile
}: TimelineEntryProps) {
  // Use desktop position (if provided) for md+ screens, otherwise use position
  const effectivePosition = desktopPosition || position;
  
  // Base styling for responsive approach with grid for better alignment
  // Simplified to avoid flex alignment issues on desktop
  const containerClasses = `
    relative 
    grid grid-cols-[auto_1fr] md:grid-cols-[160px_auto_160px]
    ${effectivePosition === "left" ? "md:grid-cols-[160px_auto_160px]" : ""}
    items-start
    mb-2
  `;

  // Content position based on side (left/right)
  const contentGridColClass = effectivePosition === "left" 
    ? "col-span-1 md:col-start-1 md:col-end-3" 
    : "col-span-1 md:col-start-2 md:col-end-4";

  const contentClasses = `
    bg-card/40 backdrop-blur-sm rounded-lg border border-border/20
    shadow-sm p-4 md:p-5
    ml-6 md:ml-0 md:mr-0
    ${effectivePosition === "left" ? "md:mr-6" : "md:ml-6"}
    relative
  `;

  // Center dot in timeline with explicit positioning
  const dotClasses = `
    absolute z-10
    left-0 
    md:left-50%
    top-2 md:top-5
    w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent/20 border border-accent/50
    flex items-center justify-center
  `;

  // Updated styles with better centered dot
  const dotStyles = {
    [effectivePosition === "left" ? "right" : "left"]: "-12px",
    transform: "translateX(-50%)"
  };

  // Date indicator styles with explicit positioning
  const dateClasses = `
    hidden md:flex items-center
    min-w-[130px] md:w-[160px] 
    col-span-1 md:col-start-${effectivePosition === "left" ? "3" : "1"}
    ${effectivePosition === "left" ? "justify-start md:pl-6" : "justify-end md:pr-6"}
    text-sm md:text-base text-muted
  `;
  
  // Mobile date display - visible only on mobile at the top of the card
  const mobileDateClasses = `
    inline-block md:hidden 
    text-xs text-muted
    mb-2 bg-card/50 px-2 py-0.5 rounded
  `;

  // Simplified delay calculation for better mobile performance
  const delayBase = isMobile ? 0.15 : 0.2;
  const delayStep = Math.min(index, isMobile ? 2 : 3) * (isMobile ? 0.04 : 0.05);
  
  return (
    <div className={containerClasses}>
      {/* Desktop date display - properly aligned */}
      <div className={dateClasses}>
        <span>{date}</span>
      </div>

      {/* Content card - with improved alignment */}
      <div className={contentGridColClass}>
        <motion.div 
          className={contentClasses}
          initial={{ opacity: 0, y: isMobile ? 8 : 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : isMobile ? 8 : 10 }}
          transition={{ duration: isMobile ? 0.25 : 0.3, delay: delayBase + delayStep }}
        >
          {/* Timeline entry dot/marker with absolute positioning */}
          <div className={dotClasses} style={dotStyles}>
            <motion.div
              className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent"
              initial={{ scale: 0 }}
              animate={{ scale: isInView ? 1 : 0 }}
              transition={{ duration: isMobile ? 0.25 : 0.3, delay: delayBase + delayStep }}
            />
          </div>
          
          {/* Mobile date display */}
          <span className={mobileDateClasses}>{date}</span>
          
          <motion.h4
            className="text-base md:text-lg font-bold mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: isMobile ? 0.25 : 0.3, delay: delayBase + 0.1 + delayStep }}
          >
            {title}
          </motion.h4>

          <motion.h5
            className="text-sm md:text-base text-accent mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: isMobile ? 0.25 : 0.3, delay: delayBase + 0.15 + delayStep }}
          >
            {company}
          </motion.h5>

          <motion.div
            className="text-muted text-sm space-y-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: isMobile ? 0.25 : 0.3, delay: delayBase + 0.2 + delayStep }}
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
            transition={{ duration: isMobile ? 0.25 : 0.3, delay: delayBase + 0.25 + delayStep }}
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
        </motion.div>
      </div>
    </div>
  );
});

export default TimelineEntry;