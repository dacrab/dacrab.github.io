"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import LottieVisualization from "./Experience/LottieVisualization";
import SkillProgressions from "./Experience/SkillProgressions";
import Timeline from "./Experience/Timeline";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";

export default function Experience() {
  const isMobile = useIsMobile();
  
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const isSkillsInView = useInView(skillsSectionRef, { once: false, amount: 0.2 });
  
  const lottieRef = useRef<HTMLDivElement>(null);
  const isLottieInView = useInView(lottieRef, { once: false, amount: 0.2 });
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: false, amount: 0.1 });
  
  // Signature Experience section animations - timeline-like staggered lines
  const lineCount = 7;
  const lines = Array.from({ length: lineCount });

  return (
    <section
      id="experience"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Swiss style accent elements with Experience-specific animations */}
      {/* Vertical timeline-like staggered lines - signature for Experience section */}
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-12 z-0 flex flex-col justify-around">
        {lines.map((_, i) => (
          <ParallaxLayer 
            key={`line-${i}`}
            speed={0.05 + (i * 0.03)} 
            direction={i % 2 === 0 ? "right" : "left"}
          >
            <ShapeAnimation 
              type="line" 
              color={`var(${i % 3 === 0 ? '--accent' : i % 3 === 1 ? '--accent-secondary' : '--accent-tertiary'})`}
              size={20 + (i * 10)}
              strokeWidth={i % 2 === 0 ? 4 : 2}
              variant="draw"
              delay={0.1 + (i * 0.1)}
              duration={0.7}
            />
          </ParallaxLayer>
        ))}
      </div>
      
      {/* Experience-specific circle pattern */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-0 flex flex-col justify-around">
        {[1, 2, 3].map((i) => (
          <ParallaxLayer 
            key={`circle-${i}`}
            speed={0.1 * i} 
            direction={i % 2 === 0 ? "left" : "right"}
          >
            <ShapeAnimation 
              type="circle" 
              color={`var(${i === 1 ? '--accent' : i === 2 ? '--accent-secondary' : '--accent-tertiary'})`}
              size={24 * i}
              variant={i % 2 === 0 ? "pulse" : "float"}
              delay={0.3 * i}
              loop={true}
            />
          </ParallaxLayer>
        ))}
      </div>

      <div className="swiss-container relative z-10">
        {/* Section header with Swiss style - Split animation unique to Experience */}
        <div className="mb-16">
          <SwissMotion type="slide" delay={0.1} duration={0.5} className="flex items-center mb-4">
            <div className="w-8 h-8 bg-[var(--accent-tertiary)] mr-4"></div>
            <h2 className="swiss-heading-2">EXPERIENCE</h2>
          </SwissMotion>
          
          <div className="grid grid-cols-1 md:grid-cols-2 ml-12 gap-8">
            <SwissMotion type="reveal" delay={0.3} duration={0.6}>
              <div className="w-24 h-1 bg-[var(--foreground)] mb-4"></div>
              <SwissMotion type="fade" delay={0.5} duration={0.6}>
                <p className="swiss-body">
                  My professional journey and skill development showcase my expertise in 
                  creating modern web solutions.
                </p>
              </SwissMotion>
            </SwissMotion>
            
            <SwissMotion type="reveal" delay={0.4} duration={0.6}>
              <div className="w-24 h-1 bg-[var(--foreground)] mb-4"></div>
              <SwissMotion type="fade" delay={0.6} duration={0.6}>
                <p className="swiss-body">
                  I&apos;ve developed the ability to solve complex technical challenges with
                  elegant, efficient solutions.
                </p>
              </SwissMotion>
            </SwissMotion>
          </div>
        </div>

        <motion.div
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="swiss-grid">
            <SwissMotion 
              type="slide"
              delay={0.3} 
              duration={0.7}
              className="swiss-asymmetric-left"
            >
              <div className="swiss-card relative" ref={lottieRef}>
                <SwissMotion type="reveal" delay={0.4} duration={0.5}>
                  <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]"></div>
                </SwissMotion>
                <h3 className="swiss-heading-3 mb-8">SKILLS VISUALIZATION</h3>
                <LottieVisualization isInView={isLottieInView} isMobile={isMobile} />
              </div>
            </SwissMotion>
            
            <SwissMotion 
              type="slide" 
              delay={0.5} 
              duration={0.7}
              className="swiss-asymmetric-right mt-12 md:mt-0"
            >
              <div className="swiss-card relative" ref={skillsSectionRef}>
                <SwissMotion type="reveal" delay={0.6} duration={0.5}>
                  <div className="absolute top-0 right-0 w-1 h-full bg-[var(--accent-secondary)]"></div>
                </SwissMotion>
                <h3 className="swiss-heading-3 mb-8">SKILL PROGRESSION</h3>
                <SkillProgressions isInView={isSkillsInView} isMobile={isMobile} />
              </div>
            </SwissMotion>
          </div>
        </motion.div>

        <SwissMotion 
          type="fade"
          delay={0.7}
          duration={0.8}
          className="mt-16 pt-16 border-t border-[var(--border)]"
        >
          <SwissMotion type="slide" delay={0.8} duration={0.5}>
            <h3 className="swiss-heading-3 mb-12 text-center">CAREER TIMELINE</h3>
          </SwissMotion>
          <div ref={timelineRef}>
            <Timeline isInView={isTimelineInView} isMobile={isMobile} />
          </div>
        </SwissMotion>
      </div>
    </section>
  );
}