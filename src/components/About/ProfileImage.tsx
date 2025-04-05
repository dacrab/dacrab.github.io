import { motion, MotionValue } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ScrollReveal from "../ScrollReveal";
import StaggerReveal from "../StaggerReveal";
import NumberCounter from "../Experience/NumberCounter";

interface ProfileImageProps {
  contentY: MotionValue<number>;
}

export default function ProfileImage({ contentY }: ProfileImageProps) {
  // Animation constants
  const frameAnimation = {
    borderColor: ['rgba(var(--accent-rgb), 0.1)', 'rgba(var(--accent-rgb), 0.3)', 'rgba(var(--accent-rgb), 0.1)']
  };
  
  const hoverAnimation = {
    y: -5, 
    boxShadow: "0 10px 25px -5px rgba(var(--accent-rgb), 0.15)",
    borderColor: "rgba(var(--accent-rgb), 0.3)"
  };

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
            animate={frameAnimation}
            transition={{ duration: 4, repeat: Infinity }}
          ></motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute -top-6 -right-6 w-16 h-16 rounded-full border border-border/40 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          ></motion.div>
          
          <motion.div 
            className="absolute -bottom-5 -left-5 w-12 h-12 rounded-full bg-accent/10 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          ></motion.div>
          
          {/* Lottie animation profile */}
          <ScrollReveal
            direction="left"
            duration={0.7}
            delay={0.1}
            className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden relative z-10 shadow-lg hover:shadow-xl transition-all duration-500"
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
              
              {/* Subtle glow effect behind animation */}
              <div className="absolute inset-0 -z-10 bg-accent/5 blur-2xl rounded-full transform scale-90"></div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Stats highlights */}
        <StaggerReveal
          className="mt-8 grid grid-cols-2 gap-6 max-w-md mx-auto lg:mx-0"
          duration={0.6}
          childDelay={0.3}
          staggerDelay={0.15}
          childClassName="h-full"
        >
          {/* Experience stat */}
          <motion.div 
            className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={hoverAnimation}
            transition={{ duration: 0.2 }}
          >
            <NumberCounter
              end={1}
              duration={2}
              delay={0.7}
              suffix="+"
              className="text-accent text-2xl font-bold"
            />
            <div className="text-sm text-muted mt-1">Year Experience</div>
          </motion.div>
          
          {/* Projects stat */}
          <motion.div 
            className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={hoverAnimation}
            transition={{ duration: 0.2 }}
          >
            <NumberCounter
              end={15}
              duration={2}
              delay={0.9}
              suffix="+"
              className="text-accent text-2xl font-bold"
            />
            <div className="text-sm text-muted mt-1">Projects Completed</div>
          </motion.div>
        </StaggerReveal>
      </div>
    </motion.div>
  );
}