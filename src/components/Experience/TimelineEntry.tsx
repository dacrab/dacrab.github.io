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
  // Animated line variants for description list items
  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: "5px" }
  };

  // New card hover animations
  const cardVariants = {
    initial: { y: 0, boxShadow: "0 0 0 rgba(var(--accent-rgb), 0)" },
    hover: { 
      y: -8, 
      boxShadow: "0 15px 30px -10px rgba(var(--accent-rgb), 0.15)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Animated background gradient
  const gradientVariants = {
    initial: { 
      backgroundPosition: "0% 50%",
    },
    animate: { 
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: { 
        duration: 15, 
        ease: "linear", 
        repeat: Infinity 
      }
    }
  };

  // Content stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.3 + (index * 0.1)
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className={`relative flex flex-col md:flex-row items-start gap-x-8`}>
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-center z-10">
        <motion.div 
          className="w-8 h-8 rounded-full bg-card/40 backdrop-blur-sm border border-accent/30 flex items-center justify-center"
          style={{ animationDelay: `${index * 0.7}s` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isInView ? [0, 1.2, 1] : 0, 
            opacity: isInView ? 1 : 0,
          }}
          transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
          whileHover={{ 
            scale: 1.15, 
            boxShadow: "0 0 20px rgba(var(--accent-rgb), 0.3)",
            borderColor: "rgba(var(--accent-rgb), 0.5)"
          }}
        >
          <NumberCounter
            end={index + 1}
            duration={1}
            delay={0.5 + (index * 0.2)}
            isInView={isInView}
            className="text-accent text-sm font-bold"
          />
        </motion.div>

        {/* Time period indicator */}
        <motion.div
          className="mt-3 text-xs text-accent font-mono bg-card/20 backdrop-blur-sm border border-accent/10 rounded-full px-3 py-1"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 10,
            scale: isInView ? 1 : 0.9
          }}
          transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 5px 15px -5px rgba(var(--accent-rgb), 0.3)",
            backgroundColor: "rgba(var(--accent-rgb), 0.1)"
          }}
        >
          {date}
        </motion.div>
      </div>

      {/* Content card */}
      <div className={`pl-16 md:pl-0 ${position === 'left' ? 'md:pr-16 md:text-right md:self-end md:items-end md:w-1/2' : 'md:pl-16 md:w-1/2 md:ml-auto'}`}>
        <motion.div 
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
          className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-6 hover:border-accent/20 transition-colors duration-300 relative overflow-hidden group"
        >
          {/* Background decoration for cards */}
          <div className="absolute -z-10 inset-0 overflow-hidden">
            <motion.div 
              className={`absolute ${position === 'left' ? '-top-20 -right-20' : '-bottom-20 -left-20'} w-40 h-40 rounded-full bg-accent/5 blur-3xl group-hover:bg-accent/10 transition-colors duration-500`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute inset-0 grid-pattern-dots opacity-10 group-hover:opacity-20 transition-opacity duration-500"
              initial={{ backgroundSize: "30px 30px" }}
              animate={{ backgroundSize: ["30px 30px", "32px 32px", "30px 30px"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* New: animated gradient border effect */}
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ backgroundSize: "400% 100%" }}
              variants={gradientVariants}
              initial="initial"
              animate="animate"
            />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <h3 className="text-xl font-bold text-gradient-animated mb-1">{title}</h3>
              <p className="text-accent/90">{company}</p>
            </motion.div>
            
            <ul className={`list-none space-y-2 mb-4 text-muted ${position === 'left' ? 'md:ml-auto' : ''}`}>
              {description.map((item, i) => (
                <motion.li 
                  key={i}
                  className="text-sm relative pl-5 md:pl-5"
                  variants={itemVariants}
                  whileHover={{ 
                    x: position === 'left' ? -5 : 5,
                    color: "rgba(var(--accent-rgb), 0.9)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span 
                    className="absolute left-0 top-[0.6em] h-1 bg-accent/70 rounded-full"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={lineVariants}
                    transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) + (i * 0.1) }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
            
            <motion.div 
              variants={itemVariants}
              className={`flex flex-wrap gap-2 mt-4 ${position === 'left' ? 'md:justify-end' : ''}`}
            >
              {technologies.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-2 py-1 bg-card/20 backdrop-blur-sm border border-border/30 rounded-full text-xs"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
                  transition={{ duration: 0.3, delay: 0.8 + (index * 0.1) + (i * 0.05) }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(var(--accent-rgb), 0.15)",
                    color: "var(--accent)",
                    borderColor: "rgba(var(--accent-rgb), 0.3)",
                    y: -2
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 