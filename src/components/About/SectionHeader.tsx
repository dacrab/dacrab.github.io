import TextAnimation from "../TextAnimation";
import ScrollReveal from "../ScrollReveal";

interface SectionHeaderProps {
  isMobile?: boolean;
}

export default function SectionHeader({ isMobile = false }: SectionHeaderProps) {
  return (
    <ScrollReveal
      direction="up"
      className="mb-16 text-center relative"
      duration={isMobile ? 0.4 : 0.5}
      distance={isMobile ? 15 : 20}
      mobileOptimized={true}
    >
      <div className="relative inline-block mb-3">
        <TextAnimation 
          text="About Me" 
          variant="reveal" 
          className="text-3xl md:text-4xl font-bold inline-block"
          delay={0.15}
          duration={isMobile ? 0.25 : 0.3}
          mobileOptimized={true}
        />
        <span className="absolute -bottom-1.5 left-0 h-3 w-full bg-accent/10 rounded-sm -z-0 transform -rotate-1"></span>
      </div>
      
      <div className="mt-5 mb-6">
        <TextAnimation 
          text="Passionate developer dedicated to crafting beautiful, functional digital experiences that combine technical excellence with creative problem-solving." 
          variant="split" 
          className="text-muted max-w-2xl mx-auto leading-relaxed"
          delay={isMobile ? 0.25 : 0.3}
          duration={isMobile ? 0.2 : 0.25}
          mobileOptimized={true}
        />
      </div>
    </ScrollReveal>
  );
}