import TextAnimation from "../TextAnimation";
import ScrollReveal from "../ScrollReveal";

export default function SectionHeader() {
  return (
    <ScrollReveal
      direction="up"
      className="mb-20 text-center relative"
      duration={0.6}
      distance={30}
    >
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