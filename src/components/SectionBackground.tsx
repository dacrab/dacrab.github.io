"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, useAnimation } from "framer-motion";

interface SectionBackgroundProps {
  variant?: "code" | "tech" | "grid" | "blueprint";
  intensity?: number; // 0-1 scale for opacity/intensity
  color?: string; // Primary color (accepts tailwind color or hex)
  isInView?: boolean; // Passed from parent component
}

export default function SectionBackground({
  variant = "code",
  intensity = 0.5,
  color = "accent",
  isInView = true,
}: SectionBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const localIsInView = useInView(containerRef, { once: false, amount: 0.2 });
  const effectiveIsInView = isInView || localIsInView;
  const controls = useAnimation();
  
  // Normalize intensity value for better visibility (0.2 to 0.8)
  const normalizedIntensity = 0.2 + (intensity * 0.6);

  // Get scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values based on scroll for parallax movement
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -3]);

  // Animate elements when they come into view
  useEffect(() => {
    if (effectiveIsInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [effectiveIsInView, controls]);
  
  // Shared animation variants for elements
  const elementVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };
  
  // Render different background patterns based on variant
  const renderBackgroundElements = () => {
    switch (variant) {
      case "code":
        return (
          <>
            {/* Abstract code-like patterns */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Code brackets and symbols */}
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div 
                  key={`code-symbol-${i}`}
                  className="absolute text-border/30 font-mono"
                  style={{
                    fontSize: `${Math.floor(Math.random() * 140 + 80)}px`,
                    top: `${Math.floor(Math.random() * 80 + 5)}%`,
                    left: `${Math.floor(Math.random() * 80 + 5)}%`,
                    opacity: normalizedIntensity * 2,
                    rotate: Math.floor(Math.random() * 45 - 22.5),
                  }}
                  variants={elementVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{
                    delay: 0.1 * i,
                  }}
                >
                  {['{', '}', '()', '[]', '<>', '//', '/*', '*/', '=>', '&&', '||', '++', '=='][i % 13]}
                </motion.div>
              ))}
              
              {/* Code lines */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <motion.div
                  key={`code-line-${i}`}
                  className="absolute h-6 left-0 rounded-r-full"
                  style={{
                    width: `${Math.floor(Math.random() * 30 + 15)}%`,
                    top: `${Math.floor(Math.random() * 80 + 10)}%`,
                    background: `linear-gradient(to right, var(--${color})/40, transparent)`,
                    opacity: normalizedIntensity * 1.5,
                  }}
                  variants={elementVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{
                    delay: 0.1 * i,
                  }}
                />
              ))}
            </div>
            
            {/* Gradient orbs with smoother transitions */}
            <motion.div 
              className="absolute top-[20%] right-[10%] w-[35%] h-[40%] rounded-full blur-[100px]"
              style={{ 
                y: y1, 
                opacity: normalizedIntensity * 3,
                background: `radial-gradient(circle at center, var(--${color})/30 0%, transparent 70%)` 
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.3 }}
            />
            <motion.div 
              className="absolute bottom-[15%] left-[20%] w-[40%] h-[35%] rounded-full blur-[100px]"
              style={{ 
                y: y2, 
                opacity: normalizedIntensity * 3,
                background: `radial-gradient(circle at center, var(--${color}-light)/25 0%, transparent 70%)` 
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.5 }}
            />
          </>
        );
      
      case "tech":
        return (
          <>
            {/* Tech-related SVG icons and elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Tech icons */}
              {['</>','{}','#','$','@','&&','//','*','+','-','%','JS','TS','<>'].map((icon, i) => (
                <motion.div 
                  key={`tech-icon-${i}`}
                  className="absolute font-mono font-bold"
                  style={{
                    fontSize: `${Math.floor(Math.random() * 60 + 30)}px`,
                    top: `${Math.floor(Math.random() * 80 + 10)}%`,
                    left: `${Math.floor(Math.random() * 80 + 10)}%`,
                    color: `var(--${color})`,
                    opacity: normalizedIntensity * 0.6,
                  }}
                  variants={elementVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{
                    delay: 0.07 * i,
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
            
            {/* Connection lines like a circuit board */}
            <div className="absolute inset-0">
              {[15, 35, 55, 75].map((top, i) => (
                <motion.div
                  key={`circuit-${i}`}
                  className="absolute h-[2px] left-0 w-full"
                  style={{ 
                    top: `${top}%`,
                    background: `linear-gradient(to right, transparent 0%, var(--${color})/40 20%, var(--${color})/40 80%, transparent 100%)`,
                    opacity: normalizedIntensity * 1.2,
                    rotate: i % 2 === 0 ? 1 : -1,
                  }}
                  variants={elementVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{
                    delay: 0.2 + (i * 0.1),
                  }}
                />
              ))}
              
              {[20, 40, 60, 80].map((left, i) => (
                <motion.div
                  key={`circuit-v-${i}`}
                  className="absolute w-[2px] top-0 h-full"
                  style={{ 
                    left: `${left}%`,
                    background: `linear-gradient(to bottom, transparent 0%, var(--${color})/30 30%, var(--${color})/30 70%, transparent 100%)`,
                    opacity: normalizedIntensity * 1,
                  }}
                  variants={elementVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{
                    delay: 0.3 + (i * 0.1),
                  }}
                />
              ))}
              
              {/* Connection nodes */}
              {[
                { top: 15, left: 20 },
                { top: 15, left: 60 },
                { top: 35, left: 40 },
                { top: 55, left: 40 },
                { top: 55, left: 80 },
                { top: 75, left: 20 },
                { top: 75, left: 60 },
              ].map((pos, i) => (
                <motion.div
                  key={`node-${i}`}
                  className="absolute w-4 h-4 rounded-full"
                  style={{ 
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                    opacity: normalizedIntensity * 2,
                    backgroundColor: `var(--${color})/50`,
                    boxShadow: `0 0 15px 2px var(--${color})/30`
                  }}
                  variants={elementVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{
                    delay: 0.4 + (i * 0.08),
                  }}
                />
              ))}
            </div>
            
            {/* Gradient blobs for visual appeal */}
            <motion.div 
              className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full blur-[80px]"
              style={{
                background: `radial-gradient(circle at center, var(--${color})/20 0%, transparent 70%)`,
                opacity: normalizedIntensity * 2,
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.6 }}
            />
            <motion.div 
              className="absolute bottom-[20%] left-[25%] w-[25%] h-[25%] rounded-full blur-[80px]"
              style={{
                background: `radial-gradient(circle at center, var(--${color}-light)/15 0%, transparent 70%)`,
                opacity: normalizedIntensity * 2,
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.7 }}
            />
          </>
        );
        
      case "grid":
        return (
          <>
            {/* Abstract grid pattern */}
            <motion.div
              className="absolute inset-0"
              style={{ 
                opacity: normalizedIntensity * 0.7,
                rotate: rotate1,
                backgroundImage: `linear-gradient(var(--border)/20 0.5px, transparent 0.5px), linear-gradient(to right, var(--border)/20 0.5px, transparent 0.5px)`,
                backgroundSize: '30px 30px',
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
            />
            
            <motion.div
              className="absolute inset-0"
              style={{ 
                opacity: normalizedIntensity * 0.5,
                rotate: rotate2,
                backgroundImage: `radial-gradient(circle at 1px 1px, var(--border)/30 1px, transparent 0)`,
                backgroundSize: '25px 25px'
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.2 }}
            />
            
            {/* Accent floating elements */}
            <motion.div 
              className="absolute top-[30%] right-[20%] w-[20vw] h-[20vw] max-w-[300px] max-h-[300px] rounded-full border-2"
              style={{ 
                opacity: normalizedIntensity * 1.2,
                rotate: rotate1,
                y: y1,
                borderColor: `var(--${color})/30`,
                boxShadow: `0 0 30px 5px var(--${color})/10`,
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.3 }}
            />
            
            <motion.div 
              className="absolute bottom-[20%] left-[15%] w-[15vw] h-[15vw] max-w-[250px] max-h-[250px] border-3"
              style={{ 
                opacity: normalizedIntensity * 1.1,
                rotate: rotate2,
                y: y2,
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                borderColor: `var(--${color})/20`,
                boxShadow: `0 0 25px 3px var(--${color})/15`,
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.4 }}
            />
            
            {/* Gradient background blob */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full blur-[120px]"
              style={{
                background: `radial-gradient(circle at center, var(--${color})/15 0%, transparent 70%)`,
                opacity: normalizedIntensity * 2,
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.5 }}
            />
          </>
        );
        
      case "blueprint":
        return (
          <>
            {/* Blueprint-style background with grid */}
            <motion.div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(var(--border)/20 0.5px, transparent 0.5px), linear-gradient(to right, var(--border)/20 0.5px, transparent 0.5px)`,
                backgroundSize: '20px 20px',
                opacity: normalizedIntensity * 0.8,
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
            />
            
            {/* Circular elements like gears */}
            {[1, 2, 3, 4, 5].map((i) => {
              const size = 50 + (i * 30);
              const top = Math.floor(Math.random() * 70 + 10);
              const left = Math.floor(Math.random() * 70 + 10);
              
              return (
                <motion.div
                  key={`gear-${i}`}
                  className="absolute border-2 rounded-full"
                  style={{
                    width: size,
                    height: size,
                    top: `${top}%`,
                    left: `${left}%`,
                    opacity: normalizedIntensity * 1.2,
                    borderColor: `var(--${color})/30`,
                    boxShadow: `0 0 20px 2px var(--${color})/15`
                  }}
                  variants={elementVariants}
                  initial="hidden"
                  animate={controls}
                  transition={{ delay: 0.1 * i }}
                >
                  <div className="absolute inset-4 border rounded-full" style={{ borderColor: `var(--${color})/40` }}></div>
                  <div className="absolute inset-8 border rounded-full" style={{ borderColor: `var(--${color})/30` }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `var(--${color})/30` }}></div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Technical measurement lines */}
            {[20, 50, 80].map((pos, i) => (
              <motion.div
                key={`measure-h-${i}`}
                className="absolute h-[2px] left-0 w-full flex items-center justify-around"
                style={{ 
                  top: `${pos}%`,
                  opacity: normalizedIntensity * 1,
                  backgroundColor: `var(--${color})/20`,
                }}
                variants={elementVariants}
                initial="hidden"
                animate={controls}
                transition={{ delay: 0.3 + (i * 0.1) }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((tick) => (
                  <motion.div
                    key={`tick-h-${i}-${tick}`}
                    className="w-[2px] h-3"
                    style={{
                      opacity: normalizedIntensity * 1.2,
                      backgroundColor: `var(--${color})/40`,
                    }}
                  />
                ))}
              </motion.div>
            ))}
            
            {/* Gradient blob for depth */}
            <motion.div 
              className="absolute top-1/3 right-1/4 w-[35%] h-[35%] rounded-full blur-[100px]"
              style={{
                background: `radial-gradient(circle at center, var(--${color})/20 0%, transparent 70%)`,
                opacity: normalizedIntensity * 2,
              }}
              variants={elementVariants}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.7 }}
            />
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Base gradient layer */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1 }}
      />
      
      {/* Render background elements based on variant */}
      {effectiveIsInView && renderBackgroundElements()}
    </motion.div>
  );
}