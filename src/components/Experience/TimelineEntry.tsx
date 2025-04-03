import { motion } from "framer-motion";
import { TimelineEntryProps } from "./types";
import NumberCounter from "./NumberCounter";

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
      {/* Timeline center point */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-center z-10">
        <motion.div 
          className="w-10 h-10 rounded-full bg-card backdrop-blur-sm border border-accent/40 flex items-center justify-center shadow-md"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isInView ? 1 : 0, 
            opacity: isInView ? 1 : 0,
          }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.2 + (index * 0.1)
          }}
        >
          <NumberCounter
            end={index + 1}
            duration={1}
            delay={0.3 + (index * 0.15)}
            isInView={isInView}
            className="text-accent font-bold"
          />
        </motion.div>

        {/* Date display */}
        <motion.div
          className="mt-3 text-xs font-medium bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full px-3 py-1 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 10
          }}
          transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
        >
          {date}
        </motion.div>
      </div>

      {/* Content card */}
      <div className={`pl-16 md:pl-0 ${position === 'left' ? 'md:pr-16 md:text-right md:self-end md:items-end md:w-1/2' : 'md:pl-16 md:w-1/2 md:ml-auto'}`}>
        <motion.div 
          className="bg-card/40 backdrop-blur-sm border border-border/30 rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden group"
          initial={{ opacity: 0, x: position === 'left' ? 20 : -20 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            x: isInView ? 0 : (position === 'left' ? 20 : -20)
          }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.3 + (index * 0.1)
          }}
          whileHover={{ 
            y: -5,
            boxShadow: "0 15px 30px -10px rgba(var(--accent-rgb), 0.15)",
            borderColor: "rgba(var(--accent-rgb), 0.3)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Card content */}
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
              className="mb-4"
            >
              <h3 className="text-xl font-bold text-gradient mb-1">{title}</h3>
              <p className="text-accent/90 font-medium">{company}</p>
            </motion.div>
            
            {/* Description points */}
            <ul className={`list-none space-y-2 mb-6 text-muted`}>
              {description.map((item, i) => (
                <motion.li 
                  key={i}
                  className="relative pl-6 md:pl-6 text-sm group"
                  initial={{ opacity: 0, x: position === 'left' ? 10 : -10 }}
                  animate={{ 
                    opacity: isInView ? 1 : 0, 
                    x: isInView ? 0 : (position === 'left' ? 10 : -10) 
                  }}
                  transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) + (i * 0.08) }}
                >
                  <motion.div 
                    className="absolute left-0 top-[0.45em] w-3 h-3 rounded-full bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors duration-300"
                    initial={{ scale: 0 }}
                    animate={{ scale: isInView ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) + (i * 0.1) }}
                  >
                    <motion.div 
                      className="absolute inset-1 rounded-full bg-accent/40"
                      initial={{ scale: 0 }}
                      animate={{ scale: isInView ? 1 : 0 }}
                      transition={{ duration: 0.4, delay: 0.55 + (index * 0.1) + (i * 0.1) }}
                    />
                  </motion.div>
                  <span className="group-hover:text-foreground transition-colors duration-300">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Technologies */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
              className={`flex flex-wrap gap-2 ${position === 'left' ? 'md:justify-end' : ''}`}
            >
              {technologies.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1 bg-accent/10 backdrop-blur-sm border border-accent/20 rounded-full text-xs font-medium shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
                  transition={{ duration: 0.3, delay: 0.7 + (i * 0.05) }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(var(--accent-rgb), 0.2)",
                    y: -2
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
          
          {/* Background gradient effect */}
          <motion.div 
            className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent to-accent/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </div>
  );
} 