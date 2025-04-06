"use client";

import { useRef, memo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Import extracted components
import SectionHeader from "./Experience/SectionHeader";
import LottieVisualization from "./Experience/LottieVisualization";
import SkillProgressions from "./Experience/SkillProgressions";
import Timeline from "./Experience/Timeline";

// Memoize the component to prevent unnecessary re-renders
const Experience = memo(function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 }); // Reduced threshold for earlier animation
  
  // Scroll progress for animations with simplified values
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Simplified transform values with reduced range for better mobile performance
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.2, 1, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.99, 1, 1, 0.99]);
  
  return (
    <section 
      id="experience" 
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden" // Reduced padding for mobile
    >      
    
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <SectionHeader />

        {/* Main content with professional card layout */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16" // Reduced margin for mobile
          style={{ 
            opacity,
            scale 
          }}
        >
          <div className="backdrop-blur-sm rounded-xl overflow-hidden border border-border/20 shadow-lg" // Reduced shadow and border radius for better performance
               style={{ background: "rgba(var(--card-rgb), 0.6)" }}>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left column: Lottie Visualization */}
              <div className="p-5 md:p-8 border-b lg:border-b-0 lg:border-r border-border/20"> {/* Reduced padding for mobile */}
                <LottieVisualization isInView={isInView} />
              </div>
              
              {/* Right column: Skill Progressions */}
              <div className="p-5 md:p-8"> {/* Reduced padding for mobile */}
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
});

export default Experience; 