"use client";

import { useRef, useEffect } from "react";
import { useInView, useAnimation, useScroll, useTransform } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// Import extracted components
import SectionHeader from "./About/SectionHeader";
import ProfileImage from "./About/ProfileImage";
import BioSection from "./About/BioSection";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["10%", "0%"]);
  
  // Bio paragraphs animation
  const bioAnimation = useScrollAnimation({
    direction: "up",
    distance: 30,
    threshold: 0.2,
    once: false
  });
  
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
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading */}
        <SectionHeader />
        
        {/* Main content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-8 relative">
          {/* Left column: Profile image and stats */}
          <ProfileImage contentY={contentY} />
          
          {/* Right column: Bio and skills */}
          <BioSection 
            contentY={contentY} 
            bioRef={bioAnimation.ref}
            bioAnimate={bioAnimation.animate}
          />
        </div>
      </div>
    </section>
  );
}