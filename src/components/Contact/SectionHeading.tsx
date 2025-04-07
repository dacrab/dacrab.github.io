"use client";

import TextAnimation from "../TextAnimation";
import ScrollReveal from "../ScrollReveal";
import { memo } from "react";

interface SectionHeadingProps {
  isMobile?: boolean;
}

// Memoize the component to prevent unnecessary re-renders
const SectionHeading = memo(function SectionHeading({ isMobile = false }: SectionHeadingProps) {
  return (
    <ScrollReveal
      direction="up"
      className="mb-12 text-center"
      duration={isMobile ? 0.4 : 0.5}
      distance={isMobile ? 15 : 20}
      mobileOptimized={true}
    >
      <div className="mb-3">
        <TextAnimation 
          text="Contact" 
          variant="reveal" 
          className="text-3xl md:text-4xl font-bold inline-block"
          delay={isMobile ? 0.12 : 0.15}
          duration={isMobile ? 0.25 : 0.3}
          mobileOptimized={true}
        />
      </div>
      
      <div className="w-20 h-0.5 bg-accent/80 mx-auto mb-5"></div>
      
      <TextAnimation 
        text="Have a project in mind or want to discuss collaboration opportunities?" 
        variant="split" 
        className="text-muted max-w-2xl mx-auto"
        delay={isMobile ? 0.2 : 0.25}
        duration={isMobile ? 0.2 : 0.25}
        mobileOptimized={true}
      />
    </ScrollReveal>
  );
});

export default SectionHeading;