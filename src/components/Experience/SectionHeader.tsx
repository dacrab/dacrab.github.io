import TextAnimation from "../TextAnimation";
import ScrollReveal from "../ScrollReveal";
import { memo } from "react";

// Memoize the component to prevent unnecessary re-renders
const SectionHeader = memo(function SectionHeader() {
  return (
    <ScrollReveal
      direction="up"
      className="mb-12 text-center"
      duration={0.5}
      distance={20}
    >
      <div className="mb-3">
        <TextAnimation 
          text="Professional Experience" 
          variant="reveal" 
          className="text-3xl md:text-4xl font-bold inline-block"
          delay={0.15}
          duration={0.3}
        />
      </div>
      
      <div className="w-20 h-0.5 bg-accent/80 mx-auto mb-5"></div>
      
      <TextAnimation 
        text="A chronological view of my professional journey in web development"
        variant="split" 
        className="text-muted max-w-2xl mx-auto"
        delay={0.25}
        duration={0.25}
      />
    </ScrollReveal>
  );
});

export default SectionHeader; 