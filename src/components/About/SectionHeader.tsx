import TextAnimation from "../TextAnimation";
import ScrollReveal from "../ScrollReveal";

export default function SectionHeader() {
  return (
    <ScrollReveal
      direction="up"
      className="mb-16 text-center relative"
      duration={0.5}
      distance={20}
    >
      <div className="relative inline-block mb-3">
        <TextAnimation 
          text="About Me" 
          variant="reveal" 
          className="text-3xl md:text-4xl font-bold inline-block"
          delay={0.15}
          duration={0.3}
        />
        <span className="absolute -bottom-1.5 left-0 h-3 w-full bg-accent/10 rounded-sm -z-0 transform -rotate-1"></span>
      </div>
      
      <div className="mt-5 mb-6">
        <TextAnimation 
          text="Passionate developer dedicated to crafting beautiful, functional digital experiences that combine technical excellence with creative problem-solving." 
          variant="split" 
          className="text-muted max-w-2xl mx-auto leading-relaxed"
          delay={0.3}
          duration={0.25}
        />
      </div>
    </ScrollReveal>
  );
}