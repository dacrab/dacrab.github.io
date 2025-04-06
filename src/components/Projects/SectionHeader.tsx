import { motion } from "framer-motion";
import TextAnimation from "../TextAnimation";
import { useMemo, memo } from "react";

interface SectionHeaderProps {
  isInView: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const SectionHeader = memo(function SectionHeader({ isInView }: SectionHeaderProps) {
  // Generate deterministic values for dots using useMemo - simplified for better mobile performance
  const dotStyles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => { // Reduced number of dots
      // Simple deterministic calculations based on index
      const opacity = 0.5 + ((i % 3) / 10);  // Values between 0.5 and 0.7
      const scale = 0.3 + ((i % 3) / 10);    // Values between 0.3 and 0.6
      
      return {
        opacity,
        transform: `scale(${scale})`
      };
    });
  }, []);

  return (
    <div className="mb-12 text-center relative">
      {/* Decorative dots - simplified and hidden on mobile */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 opacity-20 hidden md:block">
        <div className="w-40 h-12 grid grid-cols-8 grid-rows-3 gap-1.5">
          {dotStyles.map((style, i) => (
            <div 
              key={i} 
              className="rounded-full bg-accent/60"
              style={style}
            />
          ))}
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative inline-block">
          <TextAnimation 
            text="Featured Projects" 
            variant="reveal" 
            className="text-3xl md:text-4xl font-bold mb-3"
            delay={0.15}
            duration={0.3}
          />
          <span className="absolute -bottom-1.5 left-0 h-3 w-full bg-accent/10 rounded-sm -z-0 transform -rotate-1"></span>
        </div>
        
        <div className="mt-5 mb-6">
          <TextAnimation 
            text="A selection of my recent work spanning web applications, interactive experiences, and digital platforms."
            variant="split" 
            className="text-muted max-w-2xl mx-auto leading-relaxed"
            delay={0.25}
            duration={0.25}
          />
        </div>
      </motion.div>
    </div>
  );
});

export default SectionHeader; 