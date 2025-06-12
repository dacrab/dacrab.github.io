"use client";

import { useRef, useMemo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SectionHeader } from "./common";

// Components
import LottieVisualization from "./Experience/LottieVisualization";
import SkillProgressions from "./Experience/SkillProgressions";
import Timeline from "./Experience/Timeline";
import SwissMotion from "./SwissMotion";
import ShapeAnimation from "./ShapeAnimation";
import ParallaxLayer from "./ParallaxLayer";

// Constants - Reduced for mobile
const getLineCount = (isMobile: boolean) => isMobile ? 4 : 7;
const getCircleCounts = (isMobile: boolean) => isMobile ? [1, 2] : [1, 2, 3];

export default function Experience() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Memoized constants based on device
  const LINE_COUNT = useMemo(() => getLineCount(isMobile), [isMobile]);
  const CIRCLE_COUNTS = useMemo(() => getCircleCounts(isMobile), [isMobile]);
  
  // Helper functions for optimized animations
  const getOptimizedDelay = (baseDelay: number) => isMobile ? baseDelay * 0.7 : baseDelay;
  const getOptimizedDuration = (baseDuration: number) => isMobile ? baseDuration * 0.6 : baseDuration;
  
  const lottieAndSkillsY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const timelineY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  // Refs for scroll animations
  const refs = {
    skills: useRef<HTMLDivElement>(null),
    lottie: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null)
  };

  // View state for animations
  const inView = {
    skills: useInView(refs.skills, { once: true, amount: isMobile ? 0.1 : 0.2 }),
    lottie: useInView(refs.lottie, { once: true, amount: isMobile ? 0.1 : 0.2 }),
    timeline: useInView(refs.timeline, { once: true, amount: 0.1 })
  };

  return (
    <section id="experience" ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background elements - conditionally rendered and simplified for mobile */}
      {(!isMobile || (isMobile && LINE_COUNT > 0)) && (
        <div className="absolute left-4 md:left-12 top-0 bottom-0 w-12 z-0 flex flex-col justify-around">
          {Array.from({ length: LINE_COUNT }).map((_, i) => (
            <ParallaxLayer 
              key={`line-${i}`} 
              speed={isMobile ? 0.1 : 0.2 + (i * 0.05)} 
              direction={i % 2 ? "left" : "right"}
            >
              <ShapeAnimation 
                type="line"
                color={`var(--accent${i % 3 ? i % 3 === 1 ? '-secondary' : '-tertiary' : ''})`}
                size={isMobile ? (20 + (i * 5)) : (20 + (i * 10))}
                strokeWidth={isMobile ? 1 : (i % 2 ? 2 : 4)}
                variant={isMobile ? "draw" : "draw"}
                delay={getOptimizedDelay(0.1 + (i * 0.1))}
                duration={getOptimizedDuration(0.7)}
                mobileOptimized={true}
              />
            </ParallaxLayer>
          ))}
        </div>
      )}
      
      {/* Circles - reduced and simplified for mobile */}
      {(!isMobile || (isMobile && CIRCLE_COUNTS.length > 0)) && (
        <div className="absolute right-0 top-0 bottom-0 w-24 z-0 flex flex-col justify-around">
          {CIRCLE_COUNTS.map((i) => (
            <ParallaxLayer 
              key={`circle-${i}`} 
              speed={isMobile ? 0.15 * i : 0.25 * i} 
              direction={i % 2 ? "right" : "left"}
            >
              <ShapeAnimation 
                type="circle"
                color={`var(--accent${i === 2 ? '-secondary' : i === 3 ? '-tertiary' : ''})`}
                size={isMobile ? 20 * i : 24 * i}
                variant={isMobile ? "pulse" : (i % 2 ? "float" : "pulse")}
                delay={getOptimizedDelay(0.3 * i)}
                loop={!isMobile}
                duration={isMobile ? 1.5 : undefined}
                mobileOptimized={true}
              />
            </ParallaxLayer>
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="swiss-container relative z-10">
        <SectionHeader 
          title="EXPERIENCE"
          description="My professional journey and skill development showcase my expertise in creating modern web solutions and solving complex technical challenges with elegant, efficient implementations."
          accentColor="secondary"
          textAnimationVariant={isMobile ? "reveal" : "split"}
          motionDelay={getOptimizedDelay(0.1)}
        />

        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          style={{ y: lottieAndSkillsY, willChange: 'transform' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: getOptimizedDuration(0.5), 
            delay: getOptimizedDelay(0.2) 
          }}
        >
          <div className="swiss-grid">
            <SwissMotion 
              type={isMobile ? "fade" : "slide"} 
              delay={getOptimizedDelay(0.3)} 
              duration={getOptimizedDuration(0.7)} 
              className="swiss-asymmetric-left"
              mobileOptimized={true}
            >
              <div className="swiss-card relative" ref={refs.lottie}>
                <SwissMotion 
                  type="reveal" 
                  delay={getOptimizedDelay(0.4)} 
                  duration={getOptimizedDuration(0.5)}
                  mobileOptimized={true}
                >
                  <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)]" />
                </SwissMotion>
                <h3 className="swiss-heading-3 mb-8">SKILLS VISUALIZATION</h3>
                <LottieVisualization isInView={inView.lottie} isMobile={isMobile} />
              </div>
            </SwissMotion>
            
            <SwissMotion 
              type={isMobile ? "fade" : "slide"} 
              delay={getOptimizedDelay(0.5)} 
              duration={getOptimizedDuration(0.7)} 
              className="swiss-asymmetric-right mt-12 md:mt-0"
              mobileOptimized={true}
            >
              <div className="swiss-card relative" ref={refs.skills}>
                <SwissMotion 
                  type="reveal" 
                  delay={getOptimizedDelay(0.6)} 
                  duration={getOptimizedDuration(0.5)}
                  mobileOptimized={true}
                >
                  <div className="absolute top-0 right-0 w-1 h-full bg-[var(--accent-secondary)]" />
                </SwissMotion>
                <h3 className="swiss-heading-3 mb-8">SKILL PROGRESSION</h3>
                <SkillProgressions isInView={inView.skills} isMobile={isMobile} />
              </div>
            </SwissMotion>
          </div>
        </motion.div>

        <SwissMotion 
          type="fade" 
          delay={getOptimizedDelay(0.7)} 
          duration={getOptimizedDuration(0.8)} 
          className="mt-16 pt-16 border-t border-[var(--border)]"
          mobileOptimized={true}
          style={{ y: timelineY, willChange: 'transform' }}
        >
          <SwissMotion 
            type={isMobile ? "fade" : "slide"} 
            delay={getOptimizedDelay(0.8)} 
            duration={getOptimizedDuration(0.5)}
            mobileOptimized={true}
          >
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