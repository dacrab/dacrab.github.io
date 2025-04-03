"use client";

import TextAnimation from "../TextAnimation";
import ScrollReveal from "../ScrollReveal";

export default function SectionHeading() {
  return (
    <ScrollReveal
      direction="up"
      className="mb-16 text-center"
      duration={0.6}
      distance={30}
    >
      <div className="mb-4">
        <TextAnimation 
          text="Contact" 
          variant="reveal" 
          className="text-3xl md:text-4xl font-bold inline-block"
          delay={0.2}
          duration={0.4}
        />
      </div>
      
      <div className="w-24 h-0.5 bg-accent mx-auto mb-6"></div>
      
      <TextAnimation 
        text="Have a project in mind or want to discuss collaboration opportunities?" 
        variant="split" 
        className="text-muted max-w-2xl mx-auto"
        delay={0.4}
        duration={0.3}
      />
    </ScrollReveal>
  );
}