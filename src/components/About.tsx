"use client";

import { useRef, useEffect, memo, useState } from "react";
import { useInView, useAnimation, useScroll, useTransform, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./About/SectionHeader";
import ProfileImage from "./About/ProfileImage";
import BioSection from "./About/BioSection";

const About = memo(function About() {
  const ref = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: isMobile ? 0.05 : 0.1 });
  const controls = useAnimation();
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  // Scroll-based Y transform for parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const contentY = useTransform(scrollYProgress, [0, 0.5], [isMobile ? 3 : 5, 0]);

  // Track first visibility for lazy effects
  useEffect(() => {
    if (isInView && !hasBeenVisible) setHasBeenVisible(true);
  }, [isInView, hasBeenVisible]);

  // Animate bio section in/out
  useEffect(() => {
    const state = isInView ? "visible" : (!hasBeenVisible ? "hidden" : undefined);
    if (state !== undefined) {
      controls.start(state);
    }
  }, [isInView, controls, hasBeenVisible]);

  // Background glow animation configs
  const leftGlow = {
    animate: {
      opacity: isInView ? (isMobile ? 0.3 : 0.5) : 0,
      scale: isInView ? [1, 1.1, 1] : 0.8,
    },
    transition: {
      opacity: { duration: isMobile ? 1.2 : 1.5 },
      scale: {
        repeat: Infinity,
        duration: isMobile ? 18 : 15,
        ease: "easeInOut",
        repeatType: "mirror"
      }
    }
  };

  const rightGlow = {
    animate: {
      opacity: isInView ? (isMobile ? 0.25 : 0.4) : 0,
      scale: isInView ? [1, 0.95, 1] : 0.8,
    },
    transition: {
      opacity: { duration: isMobile ? 1.2 : 1.5, delay: isMobile ? 0.2 : 0.3 },
      scale: {
        repeat: Infinity,
        duration: isMobile ? 15 : 12,
        ease: "easeInOut",
        repeatType: "mirror"
      }
    }
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden"
    >
      {/* Render background effects only after first visibility and only on desktop */}
      {!isMobile && hasBeenVisible && (
        <>
          <motion.div
            className="absolute top-1/4 -left-[10%] w-[35%] h-[40%] rounded-full bg-accent/20 blur-[120px] opacity-0"
            animate={leftGlow.animate}
            transition={leftGlow.transition}
          />
          <motion.div
            className="absolute bottom-1/4 -right-[5%] w-[25%] h-[30%] rounded-full bg-accent/15 blur-[100px] opacity-0"
            animate={rightGlow.animate}
            transition={rightGlow.transition}
          />
        </>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeader isMobile={isMobile} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8 relative">
          <ProfileImage contentY={contentY} isMobile={isMobile} />
          <BioSection
            contentY={contentY}
            bioRef={bioRef}
            bioAnimate={controls}
            isMobile={isMobile}
          />
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;