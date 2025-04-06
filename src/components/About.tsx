"use client";

import { useRef, useEffect, RefObject, memo } from "react";
import { useInView, useAnimation, useScroll, useTransform } from "framer-motion";

// Import extracted components
import SectionHeader from "./About/SectionHeader";
import ProfileImage from "./About/ProfileImage";
import BioSection from "./About/BioSection";

// Memoize the component to prevent unnecessary re-renders
const About = memo(function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 }); // Reduced threshold for earlier animation
  const controls = useAnimation();
  
  // Simplified scroll animation 
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Reduced transform value for better mobile performance
  const contentY = useTransform(scrollYProgress, [0, 0.5], [5, 0]);
  
  // Bio paragraphs animation
  const bioRef = useRef<HTMLDivElement>(null);
  
  // Control animations based on view state
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);
  
  return (
    <section 
      id="about"
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden" // Reduced padding for mobile
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading */}
        <SectionHeader />
        
        {/* Main content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 relative"> {/* Reduced gap for mobile */}
          {/* Left column: Profile image and stats */}
          <ProfileImage contentY={contentY} />
          
          {/* Right column: Bio and skills */}
          <BioSection 
            contentY={contentY} 
            bioRef={bioRef as RefObject<HTMLDivElement>}
            bioAnimate={controls}
          />
        </div>
      </div>
    </section>
  );
});

export default About;