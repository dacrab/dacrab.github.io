import { motion } from "framer-motion";
import TextAnimation from "../TextAnimation";
import { useMemo } from "react";

interface SectionHeaderProps {
  isInView: boolean;
}

export default function SectionHeader({ isInView }: SectionHeaderProps) {
  // Generate deterministic values for dots using useMemo
  const dotStyles = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      // Simple deterministic calculations based on index
      const opacity = 0.5 + ((i % 5) / 10);  // Values between 0.5 and 0.9
      const scale = 0.3 + ((i % 4) / 10);    // Values between 0.3 and 0.7
      
      return {
        opacity,
        transform: `scale(${scale})`
      };
    });
  }, []);

  return (
    <div className="mb-16 text-center relative">
      {/* Decorative dots */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 opacity-20">
        <div className="w-44 h-16 grid grid-cols-12 grid-rows-3 gap-1.5">
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative inline-block">
          <TextAnimation 
            text="Featured Projects" 
            variant="reveal" 
            className="text-3xl md:text-4xl font-bold mb-4"
            delay={0.2}
            duration={0.4}
          />
          <span className="absolute -bottom-1.5 left-0 h-3 w-full bg-accent/10 rounded-sm -z-0 transform -rotate-1"></span>
        </div>
        
        <div className="mt-6 mb-8">
          <TextAnimation 
            text="A selection of my recent work spanning web applications, interactive experiences, and digital platforms."
            variant="split" 
            className="text-muted max-w-2xl mx-auto leading-relaxed"
            delay={0.4}
            duration={0.3}
          />
        </div>
      </motion.div>
    </div>
  );
} 