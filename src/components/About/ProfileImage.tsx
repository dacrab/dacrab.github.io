import { motion, MotionValue } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ScrollReveal from "../ScrollReveal";
import StaggerReveal from "../StaggerReveal";
import NumberCounter from "../Experience/NumberCounter";
import { memo, useRef, useState, useEffect } from "react";

interface ProfileImageProps {
  contentY: MotionValue<number>;
  isMobile?: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const ProfileImage = memo(function ProfileImage({ contentY, isMobile = false }: ProfileImageProps) {
  const [shouldLoadLottie, setShouldLoadLottie] = useState(false);
  const lottieRef = useRef<HTMLDivElement>(null);

  // Load Lottie only when component is in viewport
  useEffect(() => {
    if (!lottieRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadLottie(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    
    observer.observe(lottieRef.current);
    
    return () => observer.disconnect();
  }, []);

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
                {shouldLoadLottie ? (
                  <DotLottieReact
                    src="https://lottie.host/ec2681d0-ab67-4f7d-a35a-c870c0a588aa/BVfwAmcRde.lottie"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-card/50 animate-pulse"></div>
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