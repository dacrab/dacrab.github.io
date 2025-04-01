"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";

// Import modular components
import SectionHeading from "./SectionHeading";
import InfoCard from "./InfoCard";
import DecoElements from "./DecoElements";
import SectionBackground from "../SectionBackground";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform values for animations
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["10%", "0%"]);
  const rotateLeft = useTransform(scrollYProgress, [0, 1], ["0deg", "-5deg"]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], ["0deg", "5deg"]);
  
  // Spring animations for smoother effects
  const springRotateLeft = useSpring(rotateLeft, { stiffness: 80, damping: 20 });
  const springRotateRight = useSpring(rotateRight, { stiffness: 80, damping: 20 });
  
  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Blueprint-style background for Contact section */}
      <SectionBackground 
        variant="blueprint" 
        intensity={0.8} 
        color="accent-light" 
        isInView={isInView} 
      />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading with animations */}
        <SectionHeading isInView={isInView} />
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left decorative element that rotates with scroll */}
          <motion.div 
            className="hidden md:block md:col-span-1"
            style={{ rotate: springRotateLeft }}
          >
            <div className="h-full flex flex-col items-center justify-center">
              <motion.div 
                className="w-px h-[30vh] bg-gradient-to-b from-transparent via-accent/20 to-transparent"
                initial={{ height: 0 }}
                animate={{ 
                  height: isInView ? "30vh" : 0,
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ 
                  height: { duration: 1, delay: 0.6 },
                  opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                }}
              />
            </div>
          </motion.div>
          
          {/* Contact info card */}
          <InfoCard isInView={isInView} contentY={contentY} />
          
          {/* Right side decorative elements */}
          <DecoElements isInView={isInView} springRotateRight={springRotateRight} />
        </div>
        
        {/* Footer indicator */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.7 : 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <p className="text-sm text-muted">Thanks for viewing my portfolio</p>
          <motion.div
            className="w-2 h-2 bg-accent/30 rounded-full mx-auto mt-4"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      </div>
    </section>
  );
} 