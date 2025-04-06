import { motion, MotionValue } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ScrollReveal from "../ScrollReveal";
import StaggerReveal from "../StaggerReveal";
import NumberCounter from "../Experience/NumberCounter";
import { memo } from "react";

interface ProfileImageProps {
  contentY: MotionValue<number>;
}

// Memoize the component to prevent unnecessary re-renders
const ProfileImage = memo(function ProfileImage({ contentY }: ProfileImageProps) {
  // Animation constants - simplified for better mobile performance
  
  const hoverAnimation = {
    y: -3, 
    boxShadow: "0 8px 20px -5px rgba(var(--accent-rgb), 0.15)",
    borderColor: "rgba(var(--accent-rgb), 0.3)",
    transition: { duration: 0.2 }
  };

  return (
    <motion.div 
      className="lg:col-span-5 lg:col-start-1 relative"
      style={{ y: contentY }}
    >
      <div className="relative">
        {/* Profile container */}
        <div className="relative w-full max-w-md mx-auto lg:mx-0">
          {/* Lottie animation profile */}
          <ScrollReveal
            direction="left"
            duration={0.6}
            delay={0.1}
            className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden relative z-10 shadow-md transition-shadow duration-300"
          >
            <div className="aspect-square relative overflow-hidden flex items-center justify-center">
              <div className="w-full h-full">
                <DotLottieReact
                  src="https://lottie.host/ec2681d0-ab67-4f7d-a35a-c870c0a588aa/BVfwAmcRde.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Stats highlights - simplified for mobile */}
        <StaggerReveal
          className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0"
          duration={0.5}
          childDelay={0.2}
          staggerDelay={0.1}
          childClassName="h-full"
        >
          {/* Experience stat */}
          <motion.div 
            className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
            whileHover={hoverAnimation}
          >
            <NumberCounter
              end={1}
              duration={1.5}
              delay={0.6}
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
              duration={1.5}
              delay={0.7}
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