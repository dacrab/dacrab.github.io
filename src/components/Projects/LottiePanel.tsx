import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LottiePanelProps {
  isInView: boolean;
  delay: number;
}

export default function LottiePanel({ isInView, delay }: LottiePanelProps) {
  return (
    <motion.div 
      className="sticky top-32 bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden h-full group hover:border-accent/30 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Lottie Animation */}
        <div className="flex-grow relative overflow-hidden flex items-center justify-center py-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <motion.div 
            className="w-full h-80 relative"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <DotLottieReact
              src="https://lottie.host/89786656-4880-42e7-9f18-82895c67895a/37mBlD7a1R.lottie"
              loop
              autoplay
              className="w-full h-full"
            />
            
            {/* Subtle glow effect behind animation */}
            <div className="absolute inset-0 -z-10 bg-accent/5 blur-xl rounded-full transform scale-75"></div>
          </motion.div>
        </div>
        
        {/* "Discuss Your Project" button */}
        <div className="mt-4 text-center">
          <motion.a
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-lg border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300"
            whileHover={{ y: -3 }}
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
} 