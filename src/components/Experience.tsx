"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Import extracted components
import SectionHeader from "./Experience/SectionHeader";
import LottieVisualization from "./Experience/LottieVisualization";
import SkillProgressions from "./Experience/SkillProgressions";
import Timeline from "./Experience/Timeline";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform values for animations
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);
  
  return (
    <section 
      id="experience" 
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >      
    
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <SectionHeader />

        {/* Main content with professional card layout */}
        <motion.div 
          className="max-w-6xl mx-auto mb-20"
          style={{ 
            opacity,
            scale 
          }}
        >
          <div className="backdrop-blur-sm rounded-2xl overflow-hidden border border-border/20 shadow-xl"
               style={{ background: "rgba(var(--card-rgb), 0.6)" }}>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left column: Lottie Visualization */}
              <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-border/20">
                <LottieVisualization isInView={isInView} />
              </div>
              
              {/* Right column: Skill Progressions */}
              <div className="p-8 md:p-12">
                <SkillProgressions isInView={isInView} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Section with enhanced styling */}
        <Timeline isInView={isInView} />
      </div>
    </section>
  );
} 