import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import NumberCounter from "./NumberCounter";

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
        <motion.div 
          className="mb-4 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -10 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gradient-animated">Developer Journey</h3>
          <p className="text-sm text-muted mt-1">Visual overview of my growing skills</p>
        </motion.div>
        
        {/* Lottie animation with enhanced styling */}
        <div className="relative w-full aspect-square max-w-md mx-auto">
          <motion.div
            whileHover={{ scale: 1.03, rotate: 1 }}
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
          
          {/* Animated particles */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-accent/50"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-gradient-2/60"
            animate={{
              y: [0, 10, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-gradient-4/40"
            animate={{
              x: [0, 12, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Subtle glow effect behind animation */}
          <div className="absolute inset-0 -z-10 bg-accent/5 blur-xl rounded-full transform scale-75"></div>
        </div>
        
        {/* Experience stats with number counter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 grid grid-cols-3 gap-3 text-center"
        >
          <motion.div 
            className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg py-3 px-2"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(var(--accent-rgb), 0.15)",
              borderColor: "rgba(var(--accent-rgb), 0.3)"
            }}
            transition={{ duration: 0.2 }}
          >
            <NumberCounter
              end={1}
              duration={2}
              delay={0.7}
              suffix="+"
              isInView={isInView}
            />
            <div className="text-xs text-muted">Year</div>
          </motion.div>
          <motion.div 
            className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg py-3 px-2"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(var(--accent-rgb), 0.15)",
              borderColor: "rgba(var(--accent-rgb), 0.3)"
            }}
            transition={{ duration: 0.2 }}
          >
            <NumberCounter
              end={15}
              duration={2}
              delay={0.9}
              suffix="+"
              isInView={isInView}
            />
            <div className="text-xs text-muted">Projects</div>
          </motion.div>
          <motion.div 
            className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg py-3 px-2"
            whileHover={{ 
              y: -5, 
              boxShadow: "0 10px 25px -5px rgba(var(--accent-rgb), 0.15)",
              borderColor: "rgba(var(--accent-rgb), 0.3)"
            }}
            transition={{ duration: 0.2 }}
          >
            <NumberCounter
              end={10}
              duration={2}
              delay={1.1}
              suffix="+"
              isInView={isInView}
            />
            <div className="text-xs text-muted">Skills</div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
} 