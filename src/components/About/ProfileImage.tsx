import { motion, MotionValue } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ScrollReveal from "../ScrollReveal";
import StaggerReveal from "../StaggerReveal";
import NumberCounter from "../Experience/NumberCounter";
import { memo, useRef, useState, useEffect } from "react";

// Type definitions for Navigator extensions
interface NavigatorExtended extends Navigator {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
}

interface ProfileImageProps {
  contentY: MotionValue<number>;
  isMobile?: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const ProfileImage = memo(function ProfileImage({ contentY, isMobile = false }: ProfileImageProps) {
  const [shouldLoadLottie, setShouldLoadLottie] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  // Check for low-end devices more comprehensively
  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    
    const nav = navigator as NavigatorExtended;
    
    // Detect low-end devices based on multiple factors
    const hasLowCores = nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4;
    const hasLowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4;
    const hasLowConnectivity = nav.connection && (
      nav.connection.effectiveType === '2g' || 
      nav.connection.effectiveType === '3g' ||
      nav.connection.saveData === true
    );
    
    setIsLowEndDevice(hasLowCores || hasLowMemory || hasLowConnectivity || false);
  }, []);

  // Load Lottie only when component is in viewport and device can handle it
  useEffect(() => {
    if (!lottieRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // On low-end mobile devices, don't autoload Lottie to preserve performance
          if (isLowEndDevice && isMobile) {
            hasAnimatedRef.current = true;
            return;
          }
          
          // Small delay before loading Lottie to prioritize other critical content
          setTimeout(() => {
            setShouldLoadLottie(true);
            hasAnimatedRef.current = true;
          }, isMobile ? 500 : 200);
          
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    
    observer.observe(lottieRef.current);
    
    return () => observer.disconnect();
  }, [isMobile, isLowEndDevice]);

  // Animation constants - simplified for better mobile performance
  const hoverAnimation = {
    y: isMobile ? -2 : -3, 
    boxShadow: isMobile ? 
      "0 6px 15px -5px rgba(var(--accent-rgb), 0.12)" : 
      "0 8px 20px -5px rgba(var(--accent-rgb), 0.15)",
    borderColor: "rgba(var(--accent-rgb), 0.3)",
    transition: { duration: isMobile ? 0.15 : 0.2 }
  };

  return (
    <motion.div 
      className="lg:col-span-5 lg:col-start-1 relative"
      style={{ y: contentY }}
    >
      <div className="relative">
        {/* Profile container */}
        <div className="relative w-full max-w-md mx-auto lg:mx-0">
          {/* Lottie animation profile - optimized loading strategy */}
          <ScrollReveal
            direction="left"
            duration={isMobile ? 0.5 : 0.6}
            delay={0.1}
            className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden relative z-10 shadow-md transition-shadow duration-300"
            distance={isMobile ? 20 : 30}
            mobileOptimized={true}
          >
            <div 
              ref={lottieRef}
              className="aspect-square relative overflow-hidden flex items-center justify-center"
            >
              <div className="w-full h-full">
                {/* On low-end mobile devices, use a static SVG avatar for better performance */}
                {isLowEndDevice && isMobile ? (
                  <div className="w-full h-full bg-card/50 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent/80 h-4/5 w-4/5"
                    >
                      <circle cx="12" cy="8" r="5" />
                      <path d="M20 21a8 8 0 0 0-16 0" />
                    </svg>
                  </div>
                ) : shouldLoadLottie ? (
                  <DotLottieReact
                    src="https://lottie.host/ec2681d0-ab67-4f7d-a35a-c870c0a588aa/BVfwAmcRde.lottie"
                    loop={!isMobile} // Disable loop on mobile for better performance
                    autoplay
                    className="w-full h-full"
                    speed={isMobile ? 0.8 : 1} // Slow down animation on mobile for better performance
                  />
                ) : (
                  <div className="w-full h-full bg-card/50 animate-pulse flex items-center justify-center">
                    <div 
                      className="w-10 h-10 border-t-2 border-accent/30 rounded-full animate-spin" 
                      style={{ 
                        animationDuration: isMobile ? '2s' : '1.5s',
                        opacity: 0.7
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Stats highlights - simplified for mobile */}
        <StaggerReveal
          className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0"
          duration={isMobile ? 0.4 : 0.5}
          childDelay={isMobile ? 0.15 : 0.2}
          staggerDelay={isMobile ? 0.07 : 0.1}
          childClassName="h-full"
          mobileOptimized={true}
        >
          {/* Experience stat */}
          <motion.div 
            className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
            whileHover={hoverAnimation}
          >
            <NumberCounter
              end={1}
              duration={isMobile ? 1.2 : 1.5}
              delay={isMobile ? 0.5 : 0.6}
              suffix="+"
              className="text-accent text-2xl font-bold"
            />
            <div className="text-sm text-muted mt-1">Year Experience</div>
          </motion.div>
          
          {/* Projects stat */}
          <motion.div 
            className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
            whileHover={hoverAnimation}
          >
            <NumberCounter
              end={15}
              duration={isMobile ? 1.2 : 1.5}
              delay={isMobile ? 0.6 : 0.7}
              suffix="+"
              className="text-accent text-2xl font-bold"
            />
            <div className="text-sm text-muted mt-1">Projects Completed</div>
          </motion.div>
        </StaggerReveal>
      </div>
    </motion.div>
  );
});

export default ProfileImage;