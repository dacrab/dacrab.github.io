"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import BioSection from "./About/BioSection";
import ProfileImage from "./About/ProfileImage";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";
import StaggerItem from "./StaggerItem";
import { SectionHeader } from "./common";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  
  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bioY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const profileY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  
  // Signature "About" section animations - multiple diagonal lines
  const diagonalCount = 5;
  const diagonals = Array.from({ length: diagonalCount });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Swiss style accent elements with unique About section animations */}
      <ParallaxLayer speed={0.35} direction="left" className="absolute right-0 top-1/4 z-0">
        <ShapeAnimation 
          type="line" 
          color="var(--accent)" 
          size={150} 
          strokeWidth={16}
          variant="draw"
          delay={0.3}
          duration={1.2}
        />
      </ParallaxLayer>
      
      {/* Multiple diagonal lines with staggered animations - unique to About */}
      {diagonals.map((_, i) => (
        <ParallaxLayer 
          key={`diagonal-${i}`} 
          speed={0.1 + (i * 0.04)} 
          direction="right" 
          className={`absolute left-1/4 z-0`}
          style={{ top: `${20 + (i * 12)}%` }}
        >
          <ShapeAnimation 
            type="diagonal" 
            color="var(--accent-secondary)" 
            size={80 - (i * 10)} 
            strokeWidth={2}
            variant="draw"
            delay={0.2 + (i * 0.1)}
            duration={0.8}
          />
        </ParallaxLayer>
      ))}
      
      <ParallaxLayer speed={0.4} direction="up" className="absolute left-16 top-16 z-0">
        <ShapeAnimation 
          type="square" 
          color="var(--accent-tertiary)" 
          size={48} 
          variant="rotate"
          delay={0.2}
          loop={true}
        />
      </ParallaxLayer>

      <div className="swiss-container relative z-10">
        {/* Section header with common component */}
        <SectionHeader 
          title="ABOUT"
          description="I'm a full-stack developer with a passion for creating elegant, user-centered digital experiences with clean and efficient code."
          accentColor="tertiary"
          textAnimationVariant="reveal"
          motionDelay={0.2}
        />

        {/* Content with Swiss style grid and alternating animations */}
        <div className="swiss-grid">
          <SwissMotion 
            type="slide" 
            delay={0.3} 
            duration={0.7}
            className="swiss-asymmetric-left"
            style={{ y: bioY }}
          >
            <BioSection />
          </SwissMotion>
          
          <SwissMotion 
            type="scale" 
            delay={0.5} 
            duration={0.8}
            className="swiss-asymmetric-right mt-12 md:mt-0"
            style={{ y: profileY }}
          >
            <ProfileImage />
          </SwissMotion>
        </div>
        
        {/* About section signature: Staggered grid of squares at the bottom */}
        <SwissMotion type="stagger" staggerChildren={0.05} delay={0.7} className="mt-16 grid grid-cols-6 md:grid-cols-12 gap-2 max-w-4xl mx-auto">
          {Array.from({ length: 12 }).map((_, i) => (
            <StaggerItem key={`square-${i}`} type="scale" whileHover="scale">
              <div className={`aspect-square ${i % 3 === 0 ? 'bg-[var(--accent)]' : i % 3 === 1 ? 'bg-[var(--accent-secondary)]' : 'bg-[var(--accent-tertiary)]'} opacity-${20 + (i * 5)}`}></div>
            </StaggerItem>
          ))}
        </SwissMotion>
      </div>
    </section>
  );
}