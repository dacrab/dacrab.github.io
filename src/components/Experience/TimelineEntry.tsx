import { motion } from "framer-motion";
import { TimelineEntryProps } from "./types";

export default function TimelineEntry({ 
  position, 
  date, 
  company, 
  title, 
  description, 
  technologies, 
  isInView, 
  index 
}: TimelineEntryProps) {
  return (
    <div className={`relative flex flex-col md:flex-row items-start gap-x-8`}>
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-center z-10">
        <motion.div 
          className="w-8 h-8 rounded-full bg-card/40 backdrop-blur-sm border border-accent/30 flex items-center justify-center animate-border-pulse"
          style={{ animationDelay: `${index * 0.7}s` }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-3 h-3 rounded-full bg-accent"></div>
        </motion.div>

        {/* Time period indicator */}
        <motion.div
          className="mt-3 text-xs text-accent font-mono bg-card/20 backdrop-blur-sm border border-accent/10 rounded-full px-3 py-1"
        >
          {date}
        </motion.div>
      </div>

      {/* Content card */}
      <div className={`pl-16 md:pl-0 ${position === 'left' ? 'md:pr-16 md:text-right md:self-end md:items-end md:w-1/2' : 'md:pl-16 md:w-1/2 md:ml-auto'}`}>
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
          className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-6 hover:border-accent/20 transition-colors duration-300 relative overflow-hidden"
        >
          {/* Background decoration for cards */}
          <div className="absolute -z-10 inset-0 overflow-hidden">
            <div className={`absolute ${position === 'left' ? '-top-20 -right-20' : '-bottom-20 -left-20'} w-40 h-40 rounded-full bg-accent/5 blur-3xl`}></div>
            <div className="absolute inset-0 grid-pattern-dots opacity-10"></div>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-gradient-animated mb-1">{title}</h3>
            <p className="text-accent/90">{company}</p>
          </div>
          
          <ul className={`list-none space-y-2 mb-4 text-muted ${position === 'left' ? 'md:ml-auto' : ''}`}>
            {description.map((item, i) => (
              <li 
                key={i}
                className="text-sm relative pl-5 md:pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent/70"
              >
                {item}
              </li>
            ))}
          </ul>
          
          <div className={`flex flex-wrap gap-2 mt-4 ${position === 'left' ? 'md:justify-end' : ''}`}>
            {technologies.map((skill) => (
              <motion.span
                key={skill}
                className="px-2 py-1 bg-card/20 backdrop-blur-sm border border-border/30 rounded-full text-xs"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                  color: "var(--accent)"
                }}
                transition={{ duration: 0.2 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 