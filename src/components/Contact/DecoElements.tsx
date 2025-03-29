"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface DecoElementsProps {
  isInView: boolean;
  springRotateRight: any;
}

export default function DecoElements({ isInView, springRotateRight }: DecoElementsProps) {
  // Random values for particle positions to prevent regeneration on each render
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; delay: number; duration: number }>>([]);
  
  // Generate random particles once on mount
  useEffect(() => {
    const particleCount = 8;
    const newParticles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15
    }));
    setParticles(newParticles);
  }, []);

  return (
    <motion.div 
      className="md:col-span-5 hidden md:flex items-center justify-center"
      style={{ rotate: springRotateRight }}
    >
      <div className="relative h-[60vh] w-full">
        {/* Interactive geometric shape with morphing animation */}
        <motion.div 
          className="absolute top-[20%] right-[10%] w-32 h-32 md:w-40 md:h-40 backdrop-blur-sm border border-border/30 overflow-hidden"
          style={{ 
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--card)/20 0%, var(--card)/10 100%)'
          }}
          initial={{ opacity: 0, rotate: -10, borderRadius: '16px' }}
          animate={{ 
            opacity: isInView ? 0.8 : 0,
            rotate: isInView ? [5, 0, 3, -2, 5] : -10,
            x: [0, 15, 5, 20, 0],
            y: [0, -10, -5, -15, 0],
            borderRadius: isInView ? ['16px', '30% 70% 70% 30% / 30% 30% 70% 70%', '40% 60% 60% 40% / 40% 30% 70% 60%', '16px'] : '16px',
            boxShadow: [
              '0 0 0 rgba(var(--accent-rgb), 0)',
              '0 0 15px rgba(var(--accent-rgb), 0.15)',
              '0 0 5px rgba(var(--accent-rgb), 0.1)',
              '0 0 20px rgba(var(--accent-rgb), 0.2)',
              '0 0 0 rgba(var(--accent-rgb), 0)'
            ]
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.3 },
            rotate: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            x: { duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            y: { duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            borderRadius: { duration: 30, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            boxShadow: { duration: 10, repeat: Infinity, repeatType: "reverse" }
          }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 0 20px rgba(var(--accent-rgb), 0.3)',
            borderRadius: '30% 70% 50% 50% / 40% 40% 60% 60%',
            transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } 
          }}
        >
          <motion.div 
            className="absolute inset-0 grid-pattern-dots opacity-20"
            animate={{
              opacity: [0.15, 0.3, 0.15],
              backgroundPosition: ["0% 0%", "100% 100%"],
              scale: [1, 1.05, 0.98, 1]
            }}
            transition={{
              opacity: { duration: 5, repeat: Infinity, repeatType: "reverse" },
              backgroundPosition: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
            }}
          />
          
          {/* Glowing orb with pulsating effect */}
          <motion.div
            className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-accent/30 to-accent/10"
            style={{ 
              top: '25%', 
              left: '20%',
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, 8, -5, 8, 0],
              x: [0, 5, 10, 2, 0],
              scale: [1, 1.2, 0.9, 1.1, 1],
              opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
              boxShadow: [
                '0 0 0px rgba(var(--accent-rgb), 0)',
                '0 0 10px rgba(var(--accent-rgb), 0.3)',
                '0 0 3px rgba(var(--accent-rgb), 0.1)',
                '0 0 8px rgba(var(--accent-rgb), 0.2)',
                '0 0 0px rgba(var(--accent-rgb), 0)'
              ]
            }}
            transition={{
              y: { duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              x: { duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              scale: { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              opacity: { duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              boxShadow: { duration: 8, repeat: Infinity, repeatType: "reverse" }
            }}
          />
          
          {/* Smaller floating element with independent movement */}
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-gradient-1/20"
            style={{ bottom: '30%', right: '25%' }}
            animate={{
              y: [0, -10, -5, -12, 0],
              x: [0, 4, 8, 2, 0],
              rotate: [0, 45, 90, 180, 360],
              opacity: [0.1, 0.4, 0.2, 0.5, 0.1],
              scale: [1, 1.2, 0.8, 1.1, 1]
            }}
            transition={{
              y: { duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              x: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              opacity: { duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              scale: { duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
            }}
          />
          
          {/* Dynamic flowing liquid-like shape */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ opacity: 0.1 }}
          >
            <motion.div
              className="absolute"
              style={{
                width: '150%',
                height: '150%',
                top: '-25%',
                left: '-25%',
                background: 'radial-gradient(circle at center, var(--accent)/15 0%, transparent 70%)',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 0.9, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                scale: { duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Interactive Cosmic Orb */}
        <motion.div 
          className="absolute top-[40%] left-[5%] w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 30% 30%, var(--accent)/8 0%, var(--background) 90%)',
            backdropFilter: 'blur(3px)'
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ 
            opacity: isInView ? [0.8, 0.9, 0.75, 0.85, 0.8] : 0,
            scale: isInView ? [1, 1.02, 0.98, 1.01, 1] : 0.6,
            x: [0, -15, -10, -18, 0],
            y: [0, 10, 15, 5, 0],
            boxShadow: [
              '0 0 0px rgba(var(--accent-rgb), 0)',
              '0 0 20px rgba(var(--accent-rgb), 0.15)',
              '0 0 10px rgba(var(--accent-rgb), 0.05)',
              '0 0 25px rgba(var(--accent-rgb), 0.1)',
              '0 0 0px rgba(var(--accent-rgb), 0)'
            ]
          }}
          transition={{ 
            opacity: { duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            scale: { duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            x: { duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            y: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 },
            boxShadow: { duration: 15, repeat: Infinity, repeatType: "reverse" }
          }}
          whileHover={{ 
            borderColor: 'var(--accent)', 
            scale: 1.05, 
            boxShadow: '0 0 30px rgba(var(--accent-rgb), 0.25)',
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } 
          }}
        >
          {/* Cosmic swirl effect */}
          <motion.div 
            className="absolute inset-0 origin-center"
            style={{
              background: 'conic-gradient(from 0deg at 50% 50%, transparent 0%, var(--accent)/10 20%, var(--accent-light)/15 40%, transparent 60%, var(--accent)/10 80%, transparent 100%)',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Pulsing center dot */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-accent/40"
            style={{ 
              marginLeft: '-6px', 
              marginTop: '-6px',
              filter: 'blur(1px)' 
            }}
            animate={{
              scale: [1, 2, 1.5, 2.2, 1],
              opacity: [0.2, 0.6, 0.4, 0.7, 0.2],
              boxShadow: [
                '0 0 0px rgba(var(--accent-rgb), 0)',
                '0 0 15px rgba(var(--accent-rgb), 0.4)',
                '0 0 5px rgba(var(--accent-rgb), 0.2)',
                '0 0 20px rgba(var(--accent-rgb), 0.3)',
                '0 0 0px rgba(var(--accent-rgb), 0)'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          {/* Orbiting particles */}
          {[0, 1, 2, 3].map((i) => {
            const angle = (i * Math.PI) / 2; // Evenly space particles
            const radius = 40 + (i * 5); // Vary the orbit radius
            const offsetX = Math.cos(angle) * radius;
            const offsetY = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-accent/30"
                style={{ 
                  width: 3 + (i % 2) * 2 + 'px',
                  height: 3 + (i % 2) * 2 + 'px',
                  top: `calc(50% + ${offsetY}%)`,
                  left: `calc(50% + ${offsetX}%)`,
                  marginLeft: '-2px',
                  marginTop: '-2px',
                  filter: 'blur(1px)'
                }}
                animate={{
                  rotate: [0, 360],
                  opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
                  scale: [1, 1.2, 0.9, 1.3, 1]
                }}
                transition={{
                  rotate: { 
                    duration: 15 + i * 5, 
                    repeat: Infinity, 
                    ease: "linear" 
                  },
                  opacity: { 
                    duration: 8 + i * 2, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut"
                  },
                  scale: { 
                    duration: 6 + i * 3, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }}
              />
            );
          })}
          
          {/* Expanding rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full border border-accent/10"
              style={{ 
                width: `${(i+1) * 25}%`, 
                height: `${(i+1) * 25}%`,
                marginLeft: `-${(i+1) * 12.5}%`,
                marginTop: `-${(i+1) * 12.5}%`,
              }}
              animate={{
                opacity: [0.05, 0.2, 0.1, 0.25, 0.05],
                scale: [1, 1.2, 0.95, 1.15, 1],
                rotate: [0, 10, -5, 15, 0]
              }}
              transition={{
                duration: 10 + i * 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Floating crystal/gem element */}
        <motion.div 
          className="absolute bottom-[15%] right-[20%] w-24 h-24 md:w-32 md:h-32 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--gradient-1)/10 0%, var(--background) 100%)',
            backdropFilter: 'blur(5px)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: isInView ? [0.9, 0.95, 0.85, 0.9] : 0,
            y: isInView ? [0, 5, -3, 8, 0] : 50,
            x: [0, 10, 5, 12, 0],
            rotate: [12, 6, 10, 4, 12],
            scale: [1, 1.03, 0.98, 1.02, 1],
            boxShadow: [
              '0 0 0 rgba(var(--accent-rgb), 0)',
              '0 0 20px rgba(var(--accent-rgb), 0.15)',
              '0 0 10px rgba(var(--accent-rgb), 0.08)',
              '0 0 25px rgba(var(--accent-rgb), 0.12)',
              '0 0 0 rgba(var(--accent-rgb), 0)'
            ]
          }}
          transition={{ 
            opacity: { duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            y: { duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            x: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 },
            rotate: { duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            scale: { duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            boxShadow: { duration: 10, repeat: Infinity, repeatType: "reverse" }
          }}
          whileHover={{ 
            rotate: 0, 
            scale: 1.08,
            boxShadow: '0 0 30px rgba(var(--accent-rgb), 0.2)',
            transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } 
          }}
        >
          {/* Shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/30 to-transparent"
            style={{ opacity: 0.2 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              backgroundPosition: ["200% 200%", "-100% -100%"],
              x: ['-100%', '100%']
            }}
            transition={{
              opacity: { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              backgroundPosition: { duration: 30, repeat: Infinity, ease: "linear" },
              x: { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Inner facets */}
          {[0, 1, 2].map((i) => {
            const scale = 0.8 - (i * 0.2);
            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: '100%',
                  height: '100%',
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  background: i === 0 
                    ? 'linear-gradient(135deg, var(--gradient-1)/15 0%, transparent 100%)' 
                    : i === 1 
                      ? 'linear-gradient(225deg, var(--accent)/10 0%, transparent 100%)'
                      : 'linear-gradient(315deg, var(--accent-light)/5 0%, transparent 100%)',
                }}
                animate={{
                  rotate: [0, i === 0 ? 5 : i === 1 ? -8 : 12, 0],
                  scale: [scale, scale * 1.1, scale * 0.95, scale],
                  opacity: [0.5, 0.8, 0.6, 0.5]
                }}
                transition={{
                  rotate: { duration: 10 + (i * 3), repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                  scale: { duration: 8 + (i * 2), repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                  opacity: { duration: 6 + (i * 2), repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                }}
              />
            );
          })}
          
          {/* Gleaming light point */}
          <motion.div
            className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm"
            style={{ top: '25%', left: '25%' }}
            animate={{
              opacity: [0.1, 0.5, 0.2, 0.4, 0.1],
              scale: [1, 1.3, 0.9, 1.2, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Dynamic connection lines with energy particles */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" style={{ pointerEvents: 'none' }}>
          {/* Primary connections */}
          {[
            { path: "M30,40 C40,45 60,65 70,70", dash: "3 3", color: "var(--border)", width: 0.5, offset: -10, duration: 20 },
            { path: "M60,30 C50,45 40,65 30,80", dash: "3 3", color: "var(--border)", width: 0.5, offset: 10, duration: 30 },
            { path: "M35,60 Q50,40 70,50", dash: "2 4", color: "var(--accent)", width: 0.3, offset: -15, duration: 25 }
          ].map((line, i) => (
            <motion.path
              key={i}
              d={line.path}
              stroke={line.color}
              strokeWidth={line.width}
              strokeDasharray={line.dash}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: isInView ? [0.3, 0.7, 0.5, 0.9, 0.3] : 0,
                opacity: isInView ? [0.15, 0.4, 0.25, 0.5, 0.15] : 0,
                strokeDashoffset: [0, line.offset]
              }}
              transition={{ 
                pathLength: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                opacity: { duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                strokeDashoffset: { duration: line.duration, repeat: Infinity, ease: "linear" }
              }}
            />
          ))}
          
          {/* Energy particles along paths */}
          {particles.map((particle, i) => (
            <motion.circle
              key={i}
              r={particle.size / 10}
              fill={i % 2 === 0 ? "var(--accent)" : "var(--accent-light)"}
              filter="blur(1px)"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isInView ? [0.1, 0.7, 0.3, 0.6, 0.1] : 0,
                scale: [0.7, 1.3, 1, 1.5, 0.7],
                cx: [particle.x, particle.x + (Math.random() * 10 - 5), particle.x - (Math.random() * 6 - 3), particle.x + (Math.random() * 8 - 4), particle.x],
                cy: [particle.y, particle.y - (Math.random() * 10 - 5), particle.y + (Math.random() * 6 - 3), particle.y - (Math.random() * 8 - 4), particle.y]
              }}
              transition={{ 
                opacity: { duration: 10 + Math.random() * 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: particle.delay },
                scale: { duration: 8 + Math.random() * 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: particle.delay },
                cx: { duration: particle.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: particle.delay },
                cy: { duration: particle.duration - 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: particle.delay }
              }}
            />
          ))}
          
          {/* Pulsing glow points at connections */}
          {[
            { cx: 30, cy: 40, color: "var(--accent)" },
            { cx: 70, cy: 70, color: "var(--border)" },
            { cx: 60, cy: 30, color: "var(--border)" },
            { cx: 30, cy: 80, color: "var(--accent-light)" },
            { cx: 70, cy: 50, color: "var(--accent)" }
          ].map((point, i) => (
            <motion.circle
              key={i}
              cx={point.cx}
              cy={point.cy}
              r={0.8}
              fill={point.color}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isInView ? [0.2, 0.8, 0.4, 0.7, 0.2] : 0,
                r: [0.8, 2, 1.2, 1.8, 0.8],
                filter: [
                  'blur(0.5px) brightness(1)',
                  'blur(3px) brightness(1.5)',
                  'blur(1px) brightness(1.2)',
                  'blur(2px) brightness(1.3)',
                  'blur(0.5px) brightness(1)'
                ]
              }}
              transition={{ 
                opacity: { duration: 6 + i, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.5 },
                r: { duration: 8 + i, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.7 },
                filter: { duration: 7 + i, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.3 }
              }}
            />
          ))}
        </svg>
      </div>
    </motion.div>
  );
}