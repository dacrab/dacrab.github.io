"use client";

import { useRef } from "react";
import { useInView, useScroll, useTransform } from "framer-motion";

// Import extracted components
import SectionHeader from "./Experience/SectionHeader";
import LottieVisualization from "./Experience/LottieVisualization";
import SkillProgressions from "./Experience/SkillProgressions";
import Timeline from "./Experience/Timeline";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const timelineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const timelineHeight = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["20px", "0px"]);
  
  return (
    <section 
      id="experience" 
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <SectionHeader />

        {/* Two-column layout - Career visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 mb-16">
          {/* Left column: Lottie Animation */}
          <LottieVisualization isInView={isInView} />
          
          {/* Right column: Key skill highlights */}
          <SkillProgressions isInView={isInView} />
        </div>

        {/* Timeline Section */}
        <Timeline isInView={isInView} />
      </div>
    </section>
  );
} 