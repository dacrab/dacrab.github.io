import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LottieVisualizationProps {
  isInView: boolean;
}

export default function LottieVisualization({ isInView }: LottieVisualizationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-full h-full flex flex-col justify-center order-2 lg:order-1"
    >
      <div className="relative bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden p-4 md:p-6">
        {/* Visual title */}
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold text-gradient-animated">Career Visualization</h3>
          <p className="text-sm text-muted mt-1">Interactive representation of skills growth</p>
        </div>
        
        {/* Lottie animation with enhanced styling */}
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <DotLottieReact
              src="https://lottie.host/bf490252-846e-457c-a7db-c2dcf327442e/81l4tBdw6P.lottie"
              loop
              autoplay
              className="w-full h-full"
            />
          </motion.div>
          
          {/* Subtle glow effect behind animation */}
          <div className="absolute inset-0 -z-10 bg-accent/5 blur-xl rounded-full transform scale-75"></div>
        </div>
        
        {/* Experience stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 grid grid-cols-3 gap-3 text-center"
        >
          <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg py-3 px-2">
            <div className="text-accent text-2xl font-bold">8+</div>
            <div className="text-xs text-muted">Years</div>
          </div>
          <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg py-3 px-2">
            <div className="text-accent text-2xl font-bold">20+</div>
            <div className="text-xs text-muted">Projects</div>
          </div>
          <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg py-3 px-2">
            <div className="text-accent text-2xl font-bold">15+</div>
            <div className="text-xs text-muted">Skills</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 