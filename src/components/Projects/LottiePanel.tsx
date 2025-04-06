import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { memo } from "react";

interface LottiePanelProps {
  isInView: boolean;
  delay: number;
}

// Memoize the component to prevent unnecessary re-renders
const LottiePanel = memo(function LottiePanel({ isInView, delay }: LottiePanelProps) {
  return (
    <motion.div 
      className="sticky top-32 bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden h-full group hover:border-accent/30 transition-all duration-300 shadow-md"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="p-5 h-full flex flex-col">
        {/* Section title */}
        <h3 className="text-lg md:text-xl font-bold mb-3 text-center">
          Let&apos;s Build Something Amazing
        </h3>
        
        {/* Lottie Animation - simplified for mobile */}
        <div className="flex-grow relative overflow-hidden flex items-center justify-center py-3">
          <motion.div 
            className="w-full h-72 relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <DotLottieReact
              src="https://lottie.host/89786656-4880-42e7-9f18-82895c67895a/37mBlD7a1R.lottie"
              loop
              autoplay
              className="w-full h-full"
            />
          </motion.div>
        </div>
        
        {/* Description - simplified */}
        <p className="text-muted text-sm text-center mb-4">
          Have a project in mind? I&apos;d love to help bring your vision to life.
        </p>
        
        {/* "Discuss Your Project" button - simplified */}
        <div className="mt-auto text-center">
          <motion.a
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-white transition-all duration-200 font-medium"
            whileHover={{ y: -2, boxShadow: "0 6px 15px -5px rgba(var(--accent-rgb), 0.25)" }}
            whileTap={{ y: 0 }}
          >
            <span>Discuss Your Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
});

export default LottiePanel; 