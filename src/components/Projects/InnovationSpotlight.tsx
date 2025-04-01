import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { TECHNOLOGIES, TECH_DESCRIPTIONS } from "./types";

interface InnovationSpotlightProps {
  isInView: boolean;
  delay: number;
}

export default function InnovationSpotlight({ isInView, delay }: InnovationSpotlightProps) {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  
  return (
    <motion.div 
      className="lg:col-span-12 my-12 md:my-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="relative bg-card/10 backdrop-blur-sm border-2 border-transparent rounded-xl overflow-hidden before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-accent-light/30 before:via-accent/20 before:to-accent-dark/30 before:-z-10 before:content-['']">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px]">
          {/* Lottie Animation Section */}
          <div className="relative overflow-hidden flex items-center justify-center p-6 md:p-10">
            <motion.div 
              className="w-full max-w-md h-64 md:h-80 relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <DotLottieReact
                src="https://lottie.host/89786656-4880-42e7-9f18-82895c67895a/37mBlD7a1R.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
              
              {/* Subtle glow effect behind animation */}
              <div className="absolute inset-0 -z-10 bg-accent/5 blur-xl rounded-full transform scale-75"></div>
            </motion.div>
          </div>
          
          {/* Innovation Spotlight Content */}
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-3 text-gradient-animated">
                Innovation Spotlight
              </h3>
            </motion.div>
            
            <motion.p 
              className="text-muted mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
            >
              My projects leverage cutting-edge technology to deliver exceptional user experiences. I focus on creating responsive, accessible, and performance-optimized applications that push the boundaries of what's possible on the web.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
            >
              {TECHNOLOGIES.map(tech => (
                <motion.span 
                  key={tech} 
                  className={`text-xs bg-background/50 border px-3 py-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                    activeTech === tech 
                      ? "border-accent text-accent scale-110" 
                      : "border-accent/20 text-accent hover:border-accent/50"
                  }`}
                  onMouseEnter={() => setActiveTech(tech)}
                  onMouseLeave={() => setActiveTech(null)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Tech description that changes based on hover */}
            <motion.div
              className="min-h-[60px] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.4 }}
            >
              <AnimatePresence mode="wait">
                {activeTech ? (
                  <motion.p 
                    key={activeTech}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-muted italic"
                  >
                    {TECH_DESCRIPTIONS[activeTech]}
                  </motion.p>
                ) : (
                  <motion.p
                    key="default"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-muted italic"
                  >
                    Hover over a technology to learn more about my expertise.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: delay + 0.5 }}
            >
              <a 
                href="#contact" 
                className="inline-flex items-center bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg transition-colors"
              >
                <span>Discuss Your Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract decoration */}
        <motion.div 
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl"
          animate={isInView ? {
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          } : {}}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </motion.div>
  );
} 