import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { memo, useState, useEffect } from "react";
import { useLazyLottie } from "@/hooks/useLazyLottie";

interface LottiePanelProps {
  isInView: boolean;
  delay: number;
  isMobile?: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const LottiePanel = memo(function LottiePanel({ isInView, delay, isMobile = false }: LottiePanelProps) {
  // State to check for low-end devices
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  
  // Check for low-end devices
  useEffect(() => {
    // Simple detection for low-end devices based on hardware concurrency
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency !== undefined) {
      // Devices with fewer than 4 cores are likely to have performance issues with animations
      setIsLowEndDevice(navigator.hardwareConcurrency < 4);
    }
  }, []);
  
  // Customize load behavior based on device capabilities
  const shouldLoadLottie = isInView && (!isMobile || !isLowEndDevice);
  
  // Lazy load the Lottie animation only when the component is visible and device can handle it
  const { isLottieReady, animationSource } = useLazyLottie(
    shouldLoadLottie, 
    'https://lottie.host/89786656-4880-42e7-9f18-82895c67895a/37mBlD7a1R.lottie'
  );
  
  // Simpler animation transition for mobile
  const getMotionProps = () => {
    if (isMobile) {
      return {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 },
        transition: { duration: 0.3, delay }, // Reduced duration for mobile
        whileHover: isLowEndDevice ? {} : { scale: 1.01 }, // Disable hover on low-end devices
        whileTap: isLowEndDevice ? {} : { scale: 0.99 }
      };
    }
    
    return {
      initial: { opacity: 0, y: 15 },
      animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 },
      transition: { duration: 0.5, delay },
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 }
    };
  };
  
  return (
    <motion.div 
      className="sticky top-32 bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden h-full group hover:border-accent/30 transition-all duration-300 shadow-md"
      {...getMotionProps()}
    >
      <div className="p-5 h-full flex flex-col">
        {/* Section title */}
        <h3 className="text-lg md:text-xl font-bold mb-3 text-center">
          Let&apos;s Build Something Amazing
        </h3>
        
        {/* Lottie Animation - with lazy loading and device capability detection */}
        <div className="flex-grow relative overflow-hidden flex items-center justify-center py-3">
          <motion.div 
            className="w-full h-72 relative"
            {...(isMobile && isLowEndDevice ? {} : {
              whileHover: { scale: isMobile ? 1.01 : 1.02 },
              transition: { duration: isMobile ? 0.15 : 0.2 }
            })}
          >
            {/* For low-end mobile devices, show a static image instead of Lottie */}
            {isMobile && isLowEndDevice ? (
              <div className="w-full h-full flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="160" 
                  height="160" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-accent/70"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                  <path d="m10 12 4 3-4 3" />
                </svg>
              </div>
            ) : (
              // Show Lottie for capable devices
              isLottieReady && animationSource ? (
                <DotLottieReact
                  src={animationSource}
                  loop={!isMobile} // Disable loop on mobile for better performance
                  autoplay
                  className="w-full h-full"
                />
              ) : (
                // Simplified loading spinner
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-t-2 border-accent/30 rounded-full animate-spin"></div>
                </div>
              )
            )}
          </motion.div>
        </div>
        
        {/* Description - simplified */}
        <p className="text-muted text-sm text-center mb-4">
          Have a project in mind? I&apos;d love to help bring your vision to life.
        </p>
        
        {/* "Discuss Your Project" button - simplified for mobile */}
        <div className="mt-auto text-center">
          <motion.a
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-white transition-all duration-200 font-medium"
            whileHover={isMobile && isLowEndDevice ? {} : { 
              y: isMobile ? -1 : -2, 
              boxShadow: `0 ${isMobile ? '4px' : '6px'} ${isMobile ? '10px' : '15px'} -5px rgba(var(--accent-rgb), ${isMobile ? '0.2' : '0.25'})`
            }}
            whileTap={isMobile && isLowEndDevice ? {} : { y: 0 }}
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