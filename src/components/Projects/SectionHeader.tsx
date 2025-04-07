import { motion } from "framer-motion";
import TextAnimation from "../TextAnimation";
import { memo } from "react";

interface SectionHeaderProps {
  isInView: boolean;
  isMobile?: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const SectionHeader = memo(function SectionHeader({ isInView, isMobile = false }: SectionHeaderProps) {
  return (
    <div className="mb-12 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 10 : 15 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : (isMobile ? 10 : 15) }}
        transition={{ duration: isMobile ? 0.4 : 0.5 }}
      >
        <div className="relative inline-block">
          <TextAnimation 
            text="Featured Projects" 
            variant="reveal" 
            className="text-3xl md:text-4xl font-bold mb-3"
            delay={isMobile ? 0.1 : 0.15}
            duration={isMobile ? 0.25 : 0.3}
          />
          <span className="absolute -bottom-1.5 left-0 h-3 w-full bg-accent/10 rounded-sm -z-0 transform -rotate-1"></span>
        </div>
        
        <div className="mt-5 mb-6">
          <TextAnimation 
            text="A selection of my recent work spanning web applications, interactive experiences, and digital platforms."
            variant="split" 
            className="text-muted max-w-2xl mx-auto leading-relaxed"
            delay={isMobile ? 0.2 : 0.25}
            duration={isMobile ? 0.2 : 0.25}
          />
        </div>
      </motion.div>
    </div>
  );
});

export default SectionHeader; 