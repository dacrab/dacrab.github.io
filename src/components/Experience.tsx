"use client";

import { useRef, useState, useEffect, memo } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "./Experience/SectionHeader";
import LottieVisualization from "./Experience/LottieVisualization";
import SkillProgressions from "./Experience/SkillProgressions";
import Timeline from "./Experience/Timeline";

const Experience = memo(function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: false, amount: isMobile ? 0.05 : 0.1 });
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    if (isInView) setHasBeenVisible(true);
  }, [isInView]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    isMobile ? [0.6, 1, 1, 0.6] : [0.3, 1, 1, 0.3]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    isMobile ? [0.998, 1, 1, 0.998] : [0.995, 1, 1, 0.995]
  );

  return (
    <section
      id="experience"
      ref={ref}
      className="py-16 md:py-28 relative overflow-hidden"
    >
      {/* Background effects (desktop only, after first view) */}
      {!isMobile && hasBeenVisible && (
        <>
          <motion.div
            className="absolute top-[15%] left-[50%] w-[40%] h-[35%] rounded-full bg-accent/15 blur-[150px] opacity-0"
            animate={{
              opacity: isInView ? 0.5 : 0,
              x: isInView ? [-50, -55, -50] : -50
            }}
            transition={{
              opacity: { duration: 1.8 },
              x: {
                repeat: Infinity,
                duration: 20,
                ease: "easeInOut",
                repeatType: "mirror"
              }
            }}
          />
          <motion.div
            className="absolute bottom-[25%] right-[10%] w-[30%] h-[40%] rounded-full bg-accent/20 blur-[120px] opacity-0"
            animate={{
              opacity: isInView ? 0.6 : 0,
              scale: isInView ? [1, 1.1, 1] : 0.9
            }}
            transition={{
              opacity: { duration: 1.5, delay: 0.5 },
              scale: {
                repeat: Infinity,
                duration: 18,
                ease: "easeInOut",
                repeatType: "mirror"
              }
            }}
          />
        </>
      )}

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <SectionHeader isMobile={isMobile} />

        <motion.div
          className="max-w-6xl mx-auto mb-16"
          style={{ opacity, scale }}
          layout="position"
        >
          <div
            className="backdrop-blur-sm rounded-xl overflow-hidden border border-border/20 shadow-lg relative"
            style={{ background: "rgba(var(--card-rgb), 0.6)" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
              <div className="p-5 md:p-8 border-b lg:border-b-0 lg:border-r border-border/20">
                <LottieVisualization isInView={isInView} isMobile={isMobile} />
              </div>
              <div className="p-5 md:p-8">
                <SkillProgressions isInView={isInView} isMobile={isMobile} />
              </div>
            </div>
          </div>
        </motion.div>

        <Timeline isInView={isInView} isMobile={isMobile} />
      </div>
    </section>
  );
});

Experience.displayName = "Experience";

export default Experience;