"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SectionHeader } from "./common";

// Components
import LottieVisualization from "./Experience/LottieVisualization";
import SkillProgressions from "./Experience/SkillProgressions";
import Timeline from "./Experience/Timeline";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";

// Constants
const LINE_COUNT = 7;
const CIRCLE_COUNTS = [1, 2, 3];

export default function Experience() {
  const isMobile = useIsMobile();
  
  // Refs for scroll animations
  const refs = {
    skills: useRef<HTMLDivElement>(null),
    lottie: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null)
  };

  // View state for animations
  const inView = {
    skills: useInView(refs.skills, { once: false, amount: 0.2 }),
    lottie: useInView(refs.lottie, { once: false, amount: 0.2 }),
    timeline: useInView(refs.timeline, { once: false, amount: 0.1 })
  };

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute left-4 md:left-12 top-0 bottom-0 w-12 z-0 flex flex-col justify-around">
        {Array.from({ length: LINE_COUNT }).map((_, i) => (
          <ParallaxLayer key={`line-${i}`} speed={0.05 + (i * 0.03)} direction={i % 2 ? "left" : "right"}>
            <ShapeAnimation 
              type="line"
              color={`var(--accent${i % 3 ? i % 3 === 1 ? '-secondary' : '-tertiary' : ''})`}
              size={20 + (i * 10)}
              strokeWidth={i % 2 ? 2 : 4}
              variant="draw"
              delay={0.1 + (i * 0.1)}
              duration={0.7}
            />
          </ParallaxLayer>
        ))}
      </div>
      
      <div className="absolute right-0 top-0 bottom-0 w-24 z-0 flex flex-col justify-around">
        {CIRCLE_COUNTS.map((i) => (
          <ParallaxLayer key={`circle-${i}`} speed={0.1 * i} direction={i % 2 ? "right" : "left"}>
            <ShapeAnimation 
              type="circle"
              color={`var(--accent${i === 2 ? '-secondary' : i === 3 ? '-tertiary' : ''})`}
              size={24 * i}
              variant={i % 2 ? "float" : "pulse"}
              delay={0.3 * i}
              loop
            />
          </ParallaxLayer>
        ))}
      </div>

      {/* Main content */}
      <div className="swiss-container relative z-10">
        <SectionHeader 
          title="EXPERIENCE"
          description="My professional journey and skill development showcase my expertise in creating modern web solutions and solving complex technical challenges with elegant, efficient implementations."
          accentColor="secondary"
          textAnimationVariant="split"
          motionDelay={0.1}
        />

        <motion.div className="max-w-6xl mx-auto mb-16">
          <div className="swiss-grid">
            <SwissMotion type="slide" delay={0.3} duration={0.7} className="swiss-asymmetric-left">
              <div className="swiss-card relative" ref={refs.lottie}>
                <SwissMotion type="reveal" delay={0.4} duration={0.5}>
                  <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]" />
                </SwissMotion>
                <h3 className="swiss-heading-3 mb-8">SKILLS VISUALIZATION</h3>
                <LottieVisualization isInView={inView.lottie} isMobile={isMobile} />
              </div>
            </SwissMotion>
            
            <SwissMotion type="slide" delay={0.5} duration={0.7} className="swiss-asymmetric-right mt-12 md:mt-0">
              <div className="swiss-card relative" ref={refs.skills}>
                <SwissMotion type="reveal" delay={0.6} duration={0.5}>
                  <div className="absolute top-0 right-0 w-1 h-full bg-[var(--accent-secondary)]" />
                </SwissMotion>
                <h3 className="swiss-heading-3 mb-8">SKILL PROGRESSION</h3>
                <SkillProgressions isInView={inView.skills} isMobile={isMobile} />
              </div>
            </SwissMotion>
          </div>
        </motion.div>

        <SwissMotion type="fade" delay={0.7} duration={0.8} className="mt-16 pt-16 border-t border-[var(--border)]">
          <SwissMotion type="slide" delay={0.8} duration={0.5}>
            <h3 className="swiss-heading-3 mb-12 text-center">CAREER TIMELINE</h3>
          </SwissMotion>
          <div ref={refs.timeline}>
            <Timeline isInView={inView.timeline} isMobile={isMobile} />
          </div>
        </SwissMotion>
      </div>
    </section>
  );
}