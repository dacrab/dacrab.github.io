"use client";

import { MotionValue, motion, useTransform } from "framer-motion";
import ParallaxLayer from "../ParallaxLayer";

interface ContactBackgroundProps {
  scrollYProgress: MotionValue<number>;
}

export default function ContactBackground({ scrollYProgress }: ContactBackgroundProps) {
  // Derived motion values for background elements
  const gridOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.08, 0.08, 0]);
  const pathLength = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const pathOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 0.3, 0.3, 0]);

  return (
    <div className="absolute inset-0 -z-10">
      {/* Gradient background with animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-card/5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
      
      {/* Radial gradient orbs with subtle movement */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 rounded-full bg-gradient-to-br from-accent/10 to-transparent"
          style={{ width: '40vw', height: '40vw', filter: 'blur(80px)' }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 rounded-full bg-gradient-to-tr from-accent-light/10 to-transparent"
          style={{ width: '35vw', height: '35vw', filter: 'blur(70px)' }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>
      
      {/* Floating particles - subtle background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent/5"
            style={{
              width: Math.random() * 8 + 2 + "px",
              height: Math.random() * 8 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              filter: "blur(1px)"
            }}
            animate={{
              y: [0, Math.random() * 80 - 40],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern */}
      <motion.div 
        className="absolute inset-0 grid-pattern-lines"
        style={{ opacity: gridOpacity }}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Abstract decorative elements */}
      <ParallaxLayer speed={-0.3}>
        <motion.div 
          className="deco-circle absolute top-[10%] right-[15%] w-[25vw] h-[25vw] max-w-[350px] max-h-[350px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 10, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.2}>
        <motion.div 
          className="deco-circle absolute bottom-[15%] left-[10%] w-[20vw] h-[20vw] max-w-[300px] max-h-[300px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, -20, 0],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </ParallaxLayer>
      
      {/* Diagonal lines with animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[30, 60, 80].map((top, i) => (
          <motion.div
            key={i}
            className="absolute left-0 w-full h-px"
            style={{ 
              top: `${top}%`,
              background: i === 1 ? 'var(--accent)/5' : i === 2 ? 'var(--border)/20' : 'var(--accent)/10',
              transform: `rotate(${i === 1 ? 3 : -2 - i}deg)`,
            }}
            animate={{
              opacity: [0.05 + (i * 0.05), 0.15 + (i * 0.05), 0.05 + (i * 0.05)],
              y: [0, i === 1 ? -50 : i === 0 ? 80 : 30, 0]
            }}
            transition={{
              duration: 8 + (i * 2),
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 1.5
            }}
          />
        ))}
      </div>
      
      {/* SVG path animation */}
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        style={{ zIndex: -1 }}
      >
        {[
          { path: "M0,40 C20,35 50,70 100,40", stroke: "var(--accent)", width: 0.2, dash: "1 3", yAnim: [0, 5, 0], duration: 15 },
          { path: "M0,60 C40,90 60,30 100,60", stroke: "var(--accent-light)", width: 0.15, dash: "1 4", yAnim: [0, -8, 0], duration: 18, delay: 2 },
          { path: "M0,20 C30,50 70,10 100,30", stroke: "var(--accent-foreground)", width: 0.1, dash: "2 4", yAnim: [0, 10, 0], duration: 20, delay: 5 }
        ].map((item, i) => (
          <motion.path
            key={i}
            d={item.path}
            stroke={item.stroke}
            strokeWidth={item.width}
            strokeDasharray={item.dash}
            style={{ 
              pathLength,
              opacity: pathOpacity,
            }}
            animate={{
              y: item.yAnim,
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: item.delay || 0
            }}
          />
        ))}
      </svg>
    </div>
  );
} 