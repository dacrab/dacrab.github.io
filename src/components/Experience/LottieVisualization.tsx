import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import NumberCounter from "./NumberCounter";

interface LottieVisualizationProps {
  isInView: boolean;
}

export default function LottieVisualization({ isInView }: LottieVisualizationProps) {
  // Common animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: (delay: number) => ({
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay }
    })
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <motion.h3 
        className="text-2xl md:text-3xl font-bold mb-4"
        variants={fadeInUp}
        custom={0}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <span className="text-gradient">Developer Journey</span>
      </motion.h3>
      
      <motion.p
        className="text-muted max-w-lg mb-6"
        variants={fadeInUp}
        custom={0.1}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        A visual representation of my growth and experience in web development
      </motion.p>
      
      {/* Lottie animation with enhanced styling */}
      <div className="relative w-full aspect-square max-w-sm mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.3
          }}
          whileHover={{ scale: 1.03 }}
          className="w-full h-full"
        >
          <DotLottieReact
            src="https://lottie.host/bf490252-846e-457c-a7db-c2dcf327442e/81l4tBdw6P.lottie"
            loop
            autoplay
            className="w-full h-full"
          />
        </motion.div>
        
        {/* Subtle glow effects */}
        <motion.div 
          className="absolute inset-0 -z-10 rounded-full bg-accent/10 blur-3xl opacity-60"
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
      </div>
      
      {/* Experience stats with number counter */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-3 gap-4"
      >
        <StatsCard value={1} label="Year" delay={0.6} isInView={isInView} />
        <StatsCard value={15} label="Projects" delay={0.7} isInView={isInView} />
        <StatsCard value={10} label="Skills" delay={0.8} isInView={isInView} />
      </motion.div>
    </div>
  );
}

interface StatsCardProps {
  value: number;
  label: string;
  delay: number;
  isInView: boolean;
}

function StatsCard({ value, label, delay, isInView }: StatsCardProps) {
  return (
    <motion.div 
      className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl py-4 px-3 text-center relative overflow-hidden group"
      whileHover={{ 
        y: -5, 
        borderColor: "rgba(var(--accent-rgb), 0.3)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Background highlight */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      
      <NumberCounter
        end={value}
        duration={1.5}
        delay={delay}
        suffix="+"
        isInView={isInView}
        className="text-xl md:text-2xl font-bold text-accent"
      />
      <motion.div 
        className="text-sm text-muted mt-1 group-hover:text-accent/80"
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
} 