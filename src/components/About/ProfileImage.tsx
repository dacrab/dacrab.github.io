import { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import NumberCounter from "../Experience/NumberCounter";

export default function ProfileImage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });
  
  // Swiss style easing functions
  const swissEase = [0.19, 1, 0.22, 1]; // Smooth Swiss-style precision curve
  const swissEaseCrisp = [0.17, 0.67, 0.83, 0.67]; // Crisp Swiss-style precision curve

  return (
    <div className="swiss-card relative">
      <div className="absolute top-0 right-0 w-1 h-full bg-[var(--accent-tertiary)]"></div>
      
      <div className="aspect-square w-full max-w-md relative overflow-hidden bg-[var(--card)] mx-auto">
        <motion.div 
          className="absolute inset-0 swiss-grid-pattern opacity-10"
          animate={{ 
            backgroundPosition: ["0% 0%", "2% 2%"],
          }}
          transition={{ 
            duration: 8, 
            ease: "linear", 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center relative"
        >
          {/* Swiss-style geometric abstract profile representation */}
          <div className="relative w-full h-full">
            {/* Background geometric shapes */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[var(--accent-tertiary)] opacity-20 rotate-45"
              animate={{ 
                rotate: [45, 47, 45, 43, 45],
                scale: [1, 1.02, 1, 0.98, 1]
              }}
              transition={{
                duration: 10,
                ease: swissEase,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-1/4 h-1/4 bg-[var(--accent-secondary)] opacity-30"
              animate={{ 
                x: [0, 4, 0, -4, 0],
                y: [0, -3, 0, 3, 0]
              }}
              transition={{
                duration: 12,
                ease: swissEase,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            
            {/* Abstract profile representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-3/4 h-3/4 flex items-center justify-center">
                {/* Abstract person representation with geometric shapes */}
                <div className="relative">
                  {/* Head */}
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-[var(--accent)] opacity-80 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.03, 1, 0.98, 1]
                    }}
                    transition={{
                      duration: 6,
                      ease: swissEaseCrisp,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  >
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-[var(--card)]"
                      animate={{ 
                        scale: [1, 0.97, 1, 1.02, 1]
                      }}
                      transition={{
                        duration: 6,
                        ease: swissEaseCrisp,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: 0.5
                      }}
                    />
                  </motion.div>
                  
                  {/* Body */}
                  <motion.div 
                    className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-32 h-32 bg-[var(--accent-secondary)] opacity-60 rotate-45"
                    animate={{ 
                      rotate: [45, 46, 45, 44, 45],
                      y: [0, -2, 0, 2, 0]
                    }}
                    transition={{
                      duration: 8,
                      ease: swissEase,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  />
                </div>
                
                {/* Swiss-style grid overlay */}
                <motion.div 
                  className="absolute inset-0 swiss-grid-pattern opacity-30"
                  animate={{ 
                    backgroundPosition: ["0% 0%", "1% 1%"],
                  }}
                  transition={{ 
                    duration: 6, 
                    ease: "linear", 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Accent lines */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-2 bg-[var(--accent)]"
                  animate={{ 
                    width: ["100%", "95%", "100%"]
                  }}
                  transition={{
                    duration: 7,
                    ease: swissEaseCrisp,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-2 h-full bg-[var(--accent-secondary)]"
                  animate={{ 
                    height: ["100%", "95%", "100%"]
                  }}
                  transition={{
                    duration: 8,
                    ease: swissEaseCrisp,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
              </div>
            </div>
            
            {/* Swiss typography elements */}
            <motion.div 
              className="absolute top-4 left-4 text-xs font-bold tracking-widest opacity-70 uppercase"
              animate={{ 
                opacity: [0.7, 0.5, 0.7]
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              PORTFOLIO
            </motion.div>
            <motion.div 
              className="absolute bottom-4 right-4 text-xs font-bold tracking-widest opacity-70 uppercase"
              animate={{ 
                opacity: [0.7, 0.5, 0.7]
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
                delay: 1
              }}
            >
              DEVELOPER
            </motion.div>
          </div>
        </motion.div>
        
        {/* Swiss style accent elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)]"></div>
      </div>
      
      {/* Stats */}
      <div ref={statsRef} className="mt-8 grid grid-cols-2 gap-6">
        <div className="text-center">
          <NumberCounter 
            end={1} 
            duration={1.5} 
            delay={0.3} 
            suffix="+" 
            isInView={isStatsInView}
            className="text-3xl font-bold mb-1"
          />
          <div className="text-sm uppercase tracking-wider text-[var(--muted)]">Years Experience</div>
        </div>
        <div className="text-center">
          <NumberCounter 
            end={15} 
            duration={2} 
            delay={0.5} 
            suffix="+" 
            isInView={isStatsInView}
            className="text-3xl font-bold mb-1"
          />
          <div className="text-sm uppercase tracking-wider text-[var(--muted)]">Projects</div>
        </div>
      </div>
    </div>
  );
}