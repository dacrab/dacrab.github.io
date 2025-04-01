import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ScrollReveal from "../ScrollReveal";
import StaggerReveal from "../StaggerReveal";

interface ProfileImageProps {
  contentY: any; // motion value
}

export default function ProfileImage({ contentY }: ProfileImageProps) {
  return (
    <motion.div 
      className="lg:col-span-5 lg:col-start-1 relative"
      style={{ y: contentY }}
    >
      <div className="relative">
        {/* Profile container */}
        <div className="relative w-full max-w-md mx-auto lg:mx-0">
          {/* Abstract frame */}
          <motion.div 
            className="absolute inset-0 border border-border/40 rounded-xl -m-3 z-0"
            animate={{ 
              borderColor: ['rgba(var(--accent-rgb), 0.1)', 'rgba(var(--accent-rgb), 0.3)', 'rgba(var(--accent-rgb), 0.1)'] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
          ></motion.div>
          
          {/* Lottie animation profile */}
          <ScrollReveal
            direction="left"
            duration={0.7}
            delay={0.1}
            className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden relative z-10"
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
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-60"></div>
              
              {/* Grid pattern */}
              <div className="absolute inset-0 grid-pattern-dots opacity-20"></div>
            </div>
          </ScrollReveal>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full border border-border"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          ></motion.div>
          <motion.div 
            className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-accent/10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          ></motion.div>
        </div>
        
        {/* Stats highlights */}
        <StaggerReveal
          className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0"
          duration={0.6}
          childDelay={0.3}
          staggerDelay={0.15}
          childClassName="h-full"
        >
          <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg p-4 animate-border-pulse">
            <div className="text-accent text-xl font-bold">8+</div>
            <div className="text-sm text-muted">Years Experience</div>
          </div>
          <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg p-4 animate-border-pulse" style={{ animationDelay: '1s' }}>
            <div className="text-accent text-xl font-bold">50+</div>
            <div className="text-sm text-muted">Projects Completed</div>
          </div>
        </StaggerReveal>
      </div>
    </motion.div>
  );
} 