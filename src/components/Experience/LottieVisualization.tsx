import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import NumberCounter from "./NumberCounter";
import { memo, useState, useEffect, useRef } from "react";

interface LottieVisualizationProps {
  isInView: boolean;
  isMobile: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const LottieVisualization = memo(function LottieVisualization({ isInView, isMobile }: LottieVisualizationProps) {
  const [shouldRenderLottie, setShouldRenderLottie] = useState(false);
  const hasRenderedOnce = useRef(false);
  
  // Only load Lottie when component comes into view and track if it has rendered at least once
  useEffect(() => {
    if (isInView && !hasRenderedOnce.current) {
      // Small delay to prioritize other UI elements
      const timer = setTimeout(() => {
        setShouldRenderLottie(true);
        hasRenderedOnce.current = true;
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Simplified animation variants for better mobile performance
  const fadeInUp = {
    hidden: { opacity: 0, y: isMobile ? 5 : 8 },
    visible: (delay: number) => ({
      opacity: 1, 
      y: 0,
      transition: { duration: isMobile ? 0.3 : 0.4, delay }
    })
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <motion.h3 
        className="text-2xl md:text-3xl font-bold mb-3"
        variants={fadeInUp}
        custom={0}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <span className="text-gradient">Developer Journey</span>
      </motion.h3>
      
      <motion.p
        className="text-muted max-w-lg mb-5"
        variants={fadeInUp}
        custom={0.1}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        A visual representation of my growth and experience in web development
      </motion.p>
      
      {/* Lottie animation - optimized loading */}
      <div className="relative w-full aspect-square max-w-sm mx-auto mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: isMobile ? 0.4 : 0.5,
            delay: 0.2
          }}
          whileHover={{ scale: isMobile ? 1.01 : 1.02 }}
          className="w-full h-full"
        >
          {shouldRenderLottie ? (
            <DotLottieReact
              src="https://lottie.host/bf490252-846e-457c-a7db-c2dcf327442e/81l4tBdw6P.lottie"
              loop={!isMobile} // Disable looping on mobile to reduce CPU usage
              autoplay
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-card/40 rounded-lg animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Experience stats with number counter - simplified */}
      <motion.div 
        initial={{ opacity: 0, y: isMobile ? 8 : 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 8 : 10 }}
        transition={{ duration: isMobile ? 0.4 : 0.5, delay: 0.4 }}
        className="grid grid-cols-3 gap-3"
      >
        <StatsCard value={1} label="Year" delay={0.5} isInView={isInView} isMobile={isMobile} />
        <StatsCard value={15} label="Projects" delay={0.55} isInView={isInView} isMobile={isMobile} />
        <StatsCard value={10} label="Skills" delay={0.6} isInView={isInView} isMobile={isMobile} />
      </motion.div>
    </div>
  );
});

interface StatsCardProps {
  value: number;
  label: string;
  delay: number;
  isInView: boolean;
  isMobile: boolean;
}

// Memoize StatsCard for better performance
const StatsCard = memo(function StatsCard({ value, label, delay, isInView, isMobile }: StatsCardProps) {
  return (
    <motion.div 
      className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl py-3 px-2 text-center relative overflow-hidden group"
      whileHover={{ 
        y: isMobile ? -1 : -2, 
        borderColor: "rgba(var(--accent-rgb), 0.3)"
      }}
      transition={{ duration: 0.2 }}
    >
      <NumberCounter
        end={value}
        duration={isMobile ? 0.8 : 1}
        delay={delay}
        suffix="+"
        isInView={isInView}
        className="text-xl font-bold text-accent"
      />
      <div className="text-xs md:text-sm text-muted mt-1 group-hover:text-accent/80 transition-colors duration-200">
        {label}
      </div>
    </motion.div>
  );
});

export default LottieVisualization; 