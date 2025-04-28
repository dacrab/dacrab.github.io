import { useRef } from 'react';
import { motion } from 'framer-motion';
import SwissMotion from '../SwissMotion';
import ShapeAnimation from '../ShapeAnimation';
import { ArrowUpRight } from "lucide-react";

interface LottiePanelProps {
  title: string;
  description: string;
  delay?: number;
  index?: number;
}

export default function LottiePanel({ 
  title, 
  description, 
  delay = 0,
  index = 0
}: LottiePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <SwissMotion 
      type="scale" 
      delay={0.3 + delay + (index * 0.2)}
      duration={0.7}
      className="swiss-card relative h-full flex flex-col group overflow-hidden"
    >
      {/* Swiss style accent elements */}
      <SwissMotion type="reveal" delay={0.4 + delay} duration={0.5}>
        <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]"></div>
      </SwissMotion>
      
      <SwissMotion type="reveal" delay={0.5 + delay} duration={0.5}>
        <div className="absolute bottom-0 right-0 w-1 h-1/4 bg-[var(--accent-secondary)]"></div>
      </SwissMotion>
      
      <div className="p-6">
        <SwissMotion type="slide" delay={0.4 + delay} duration={0.5}>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
        </SwissMotion>
        
        <SwissMotion type="fade" delay={0.5 + delay} duration={0.5}>
          <p className="text-[var(--muted)] mb-6">{description}</p>
        </SwissMotion>
      </div>
      
      <div className="relative h-64 w-full bg-[var(--card-hover)] overflow-hidden" ref={containerRef}>
        <SwissMotion type="fade" delay={0.3 + delay} duration={0.8} className="absolute inset-0">
          {/* Swiss-style abstract animation with geometric shapes */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Grid pattern */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 opacity-5">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div key={i} className="border border-[var(--foreground)]"></div>
                ))}
              </div>
              
              {/* Animated shapes */}
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <ShapeAnimation 
                  type="square" 
                  color="var(--accent)" 
                  size={40}
                  variant="rotate"
                  delay={0.6 + delay}
                  loop={true}
                />
              </div>
              
              <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                <ShapeAnimation 
                  type="circle" 
                  color="var(--accent-secondary)" 
                  size={56}
                  variant="pulse"
                  delay={0.7 + delay}
                  loop={true}
                />
              </div>
              
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <ShapeAnimation 
                  type="triangle" 
                  color="var(--accent-tertiary)" 
                  size={48}
                  variant="float"
                  delay={0.8 + delay}
                  loop={true}
                />
              </div>
              
              {/* Connecting lines */}
              <div className="absolute top-1/3 left-2/3">
                <ShapeAnimation 
                  type="line" 
                  color="var(--foreground)" 
                  size={120}
                  strokeWidth={1}
                  variant="draw"
                  delay={0.9 + delay}
                />
              </div>
              
              <div className="absolute bottom-1/3 right-1/3">
                <ShapeAnimation 
                  type="diagonal" 
                  color="var(--foreground)" 
                  size={80}
                  strokeWidth={1}
                  variant="draw"
                  delay={1 + delay}
                />
              </div>
              
              {/* Swiss typography */}
              <motion.div 
                className="absolute top-6 left-6 text-xs font-bold tracking-widest uppercase opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.1 + delay, duration: 0.5 }}
              >
                COLLABORATE
              </motion.div>
              
              <motion.div 
                className="absolute bottom-6 right-6 text-xs font-bold tracking-widest uppercase opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.2 + delay, duration: 0.5 }}
              >
                CREATE
              </motion.div>
            </div>
          </div>
        </SwissMotion>
      </div>
      
      <SwissMotion type="fade" delay={0.6 + delay} duration={0.5} className="p-6 pt-0 mt-auto">
        <a 
          href="#contact" 
          className="swiss-button inline-flex items-center gap-2 group"
        >
          Discuss Your Project
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </SwissMotion>
    </SwissMotion>
  );
}