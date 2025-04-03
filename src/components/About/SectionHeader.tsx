import TextAnimation from "../TextAnimation";
import ScrollReveal from "../ScrollReveal";
import { useMemo } from "react";

export default function SectionHeader() {
  // Generate fixed decorative dot patterns on the client side only
  // This prevents hydration mismatch between server and client
  const decorativeDots = useMemo(() => {
    return Array.from({ length: 36 }).map((_, i) => {
      // Use deterministic values based on index
      const opacityBase = 0.5;
      const opacityVariation = ((i % 7) / 10) + 0.1;
      const scaleBase = 0.5;
      const scaleVariation = ((i % 5) / 10) + 0.1;
      
      return {
        opacity: opacityBase + opacityVariation,
        scale: scaleBase + scaleVariation
      };
    });
  }, []);
  
  return (
    <ScrollReveal
      direction="up"
      className="mb-20 text-center relative"
      duration={0.6}
      distance={30}
    >
      {/* Decorative dots */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 opacity-20">
        <div className="w-44 h-16 grid grid-cols-12 grid-rows-3 gap-1.5">
          {decorativeDots.map((dot, i) => (
            <div 
              key={i} 
              className="rounded-full bg-accent/60"
              style={{
                opacity: dot.opacity,
                transform: `scale(${dot.scale})`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative inline-block mb-4">
        <TextAnimation 
          text="About Me" 
          variant="reveal" 
          className="text-3xl md:text-4xl font-bold inline-block"
          delay={0.2}
          duration={0.4}
        />
        <span className="absolute -bottom-1.5 left-0 h-3 w-full bg-accent/10 rounded-sm -z-0 transform -rotate-1"></span>
      </div>
      
      <div className="mt-6 mb-8">
        <TextAnimation 
          text="Passionate developer dedicated to crafting beautiful, functional digital experiences that combine technical excellence with creative problem-solving." 
          variant="split" 
          className="text-muted max-w-2xl mx-auto leading-relaxed"
          delay={0.4}
          duration={0.3}
        />
      </div>
    </ScrollReveal>
  );
} 