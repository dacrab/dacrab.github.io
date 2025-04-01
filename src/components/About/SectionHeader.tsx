import TextAnimation from "../TextAnimation";
import ScrollReveal from "../ScrollReveal";

export default function SectionHeader() {
  return (
    <ScrollReveal
      direction="up"
      className="mb-20 text-center"
      duration={0.6}
      distance={30}
    >
      <div className="mb-4">
        <TextAnimation 
          text="About Me" 
          variant="reveal" 
          className="text-3xl md:text-4xl font-bold inline-block"
          delay={0.2}
          duration={0.4}
        />
      </div>
      
      <div className="w-24 h-0.5 bg-accent mx-auto mb-6"></div>
      
      <TextAnimation 
        text="Passionate developer dedicated to crafting beautiful, functional digital experiences that combine technical excellence with creative problem-solving." 
        variant="split" 
        className="text-muted max-w-2xl mx-auto"
        delay={0.4}
        duration={0.3}
      />
    </ScrollReveal>
  );
} 