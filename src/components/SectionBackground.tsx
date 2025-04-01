"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

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
  
  // Normalize intensity value to allow higher visibility (0.1 to 0.5)
  const normalizedIntensity = 0.1 + (intensity * 0.4);

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
                  animate={{
                    opacity: [
                      normalizedIntensity * 1.5, 
                      normalizedIntensity * 3,
                      normalizedIntensity * 1.5
                    ],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    repeatType: "reverse",
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
                  animate={{
                    width: [
                      `${Math.floor(Math.random() * 20 + 15)}%`, 
                      `${Math.floor(Math.random() * 40 + 20)}%`,
                      `${Math.floor(Math.random() * 20 + 15)}%`
                    ],
                    opacity: [
                      normalizedIntensity * 1, 
                      normalizedIntensity * 2,
                      normalizedIntensity * 1
                    ],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>
            
            {/* Gradient orbs */}
            <motion.div 
              className={`absolute top-[20%] right-[10%] w-[35%] h-[40%] rounded-full bg-${color}/20 blur-[100px]`}
              style={{ y: y1, opacity: normalizedIntensity * 3 }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className={`absolute bottom-[15%] left-[20%] w-[40%] h-[35%] rounded-full bg-${color}-light/20 blur-[100px]`}
              style={{ y: y2, opacity: normalizedIntensity * 3 }}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
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
                    opacity: normalizedIntensity * 0.5,
                  }}
                  animate={{
                    y: [0, Math.random() * 30 - 15, 0],
                    opacity: [
                      normalizedIntensity * 0.5, 
                      normalizedIntensity * 0.8,
                      normalizedIntensity * 0.5
                    ],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
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
                  animate={{
                    opacity: [
                      normalizedIntensity * 0.8, 
                      normalizedIntensity * 1.5,
                      normalizedIntensity * 0.8
                    ],
                  }}
                  transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.5,
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
                  animate={{
                    opacity: [
                      normalizedIntensity * 0.7, 
                      normalizedIntensity * 1.3,
                      normalizedIntensity * 0.7
                    ],
                  }}
                  transition={{
                    duration: 10 + i,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.7,
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
                  className={`absolute w-4 h-4 rounded-full bg-${color}/50`}
                  style={{ 
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                    opacity: normalizedIntensity * 2,
                    boxShadow: `0 0 15px 2px var(--${color})/30`
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [
                      normalizedIntensity * 2, 
                      normalizedIntensity * 4,
                      normalizedIntensity * 2
                    ],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>
            
            {/* Add some gradient blobs for more visual appeal */}
            <motion.div 
              className={`absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-${color}/15 blur-[80px]`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className={`absolute bottom-[20%] left-[25%] w-[25%] h-[25%] rounded-full bg-${color}-light/15 blur-[80px]`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </>
        );
        
      case "grid":
        return (
          <>
            {/* Abstract grid pattern */}
            <motion.div
              className="absolute inset-0 grid-pattern-lines"
              style={{ 
                opacity: normalizedIntensity * 0.7,
                rotate: rotate1,
                backgroundSize: '30px 30px',
              }}
              animate={{
                scale: [1, 1.05, 0.98, 1],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div
              className="absolute inset-0 grid-pattern-dots"
              style={{ 
                opacity: normalizedIntensity * 0.5,
                rotate: rotate2,
                backgroundSize: '25px 25px'
              }}
              animate={{
                scale: [1, 1.03, 0.99, 1],
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Accent floating elements */}
            <motion.div 
              className={`absolute top-[30%] right-[20%] w-[20vw] h-[20vw] max-w-[300px] max-h-[300px] rounded-full border-2 border-${color}/30`}
              style={{ 
                opacity: normalizedIntensity * 1.2,
                rotate: rotate1,
                y: y1,
                boxShadow: `0 0 30px 5px var(--${color})/10`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                borderColor: [`var(--${color})/20`, `var(--${color})/40`, `var(--${color})/20`],
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div 
              className={`absolute bottom-[20%] left-[15%] w-[15vw] h-[15vw] max-w-[250px] max-h-[250px] border-3 border-${color}/20`}
              style={{ 
                opacity: normalizedIntensity * 1.1,
                rotate: rotate2,
                y: y2,
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                boxShadow: `0 0 25px 3px var(--${color})/15`,
              }}
              animate={{
                borderRadius: [
                  '30% 70% 70% 30% / 30% 30% 70% 70%',
                  '50% 50% 20% 80% / 25% 80% 20% 75%',
                  '30% 70% 70% 30% / 30% 30% 70% 70%'
                ],
                borderColor: [`var(--${color})/20`, `var(--${color})/40`, `var(--${color})/20`],
              }}
              transition={{ 
                duration: 18, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Add a gradient background blob */}
            <motion.div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full bg-${color}/10 blur-[120px]`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </>
        );
        
      case "blueprint":
        return (
          <>
            {/* Blueprint-style background with grid and technical elements */}
            <motion.div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(var(--border)/20 0.5px, transparent 0.5px), 
                                linear-gradient(to right, var(--border)/20 0.5px, transparent 0.5px)`,
                backgroundSize: '20px 20px',
                opacity: normalizedIntensity * 0.8,
              }}
            />
            
            {/* Circular elements like gears */}
            {[1, 2, 3, 4, 5].map((i) => {
              const size = 50 + (i * 30);
              const top = Math.floor(Math.random() * 70 + 10);
              const left = Math.floor(Math.random() * 70 + 10);
              
              return (
                <motion.div
                  key={`gear-${i}`}
                  className={`absolute border-2 border-${color}/30 rounded-full`}
                  style={{
                    width: size,
                    height: size,
                    top: `${top}%`,
                    left: `${left}%`,
                    opacity: normalizedIntensity * 1.2,
                    boxShadow: `0 0 20px 2px var(--${color})/15`
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 0.98, 1],
                    borderColor: [`var(--${color})/20`, `var(--${color})/40`, `var(--${color})/20`],
                  }}
                  transition={{
                    rotate: { duration: 40 + (i * 10), repeat: Infinity, ease: "linear" },
                    scale: { duration: 20, repeat: Infinity, repeatType: "reverse" },
                    borderColor: { duration: 8, repeat: Infinity, repeatType: "reverse" }
                  }}
                >
                  <div className={`absolute inset-4 border border-${color}/40 rounded-full`}></div>
                  <div className={`absolute inset-8 border border-${color}/30 rounded-full`}></div>
                  <div className={`absolute inset-0 flex items-center justify-center`}>
                    <div className={`w-4 h-4 rounded-full bg-${color}/30`}></div>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Technical measurement lines */}
            {[20, 50, 80].map((pos, i) => (
              <motion.div
                key={`measure-h-${i}`}
                className={`absolute h-[2px] left-0 w-full flex items-center justify-around bg-${color}/20`}
                style={{ 
                  top: `${pos}%`,
                  opacity: normalizedIntensity * 1,
                }}
                animate={{
                  opacity: [normalizedIntensity * 0.7, normalizedIntensity * 1.3, normalizedIntensity * 0.7]
                }}
                transition={{
                  duration: 10 + (i * 2),
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((tick) => (
                  <motion.div
                    key={`tick-h-${i}-${tick}`}
                    className={`w-[2px] h-3 bg-${color}/40`}
                    style={{
                      opacity: normalizedIntensity * 1.2,
                    }}
                  />
                ))}
              </motion.div>
            ))}
            
            {[30, 70].map((pos, i) => (
              <motion.div
                key={`measure-v-${i}`}
                className={`absolute w-[2px] top-0 h-full flex flex-col items-center justify-around bg-${color}/20`}
                style={{ 
                  left: `${pos}%`,
                  opacity: normalizedIntensity * 1,
                }}
                animate={{
                  opacity: [normalizedIntensity * 0.7, normalizedIntensity * 1.3, normalizedIntensity * 0.7]
                }}
                transition={{
                  duration: 12 + (i * 2),
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((tick) => (
                  <motion.div
                    key={`tick-v-${i}-${tick}`}
                    className={`h-[2px] w-3 bg-${color}/40`}
                    style={{
                      opacity: normalizedIntensity * 1.2,
                    }}
                  />
                ))}
              </motion.div>
            ))}
            
            {/* Add some gradient blobs for more depth */}
            <motion.div 
              className={`absolute top-1/3 right-1/4 w-[35%] h-[35%] rounded-full bg-${color}/15 blur-[100px]`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{ 
                duration: 18, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
      
      {/* Render background elements based on variant */}
      {effectiveIsInView && renderBackgroundElements()}
    </div>
  );
} 