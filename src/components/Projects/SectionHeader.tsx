import { motion } from "framer-motion";
import TextAnimation from "../TextAnimation";

interface SectionHeaderProps {
  isInView: boolean;
}

export default function SectionHeader({ isInView }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6 }}
      className="mb-16 text-center"
    >
      <TextAnimation 
        text="Featured Projects" 
        variant="reveal" 
        className="text-3xl md:text-4xl font-bold mb-4"
        delay={0.2}
        duration={0.4}
      />
      
      <div className="w-24 h-0.5 bg-accent mx-auto mb-6"></div>
      
      <TextAnimation 
        text="A selection of my recent work spanning web applications, interactive experiences, and digital platforms."
        variant="split" 
        className="text-muted max-w-2xl mx-auto"
        delay={0.4}
        duration={0.3}
      />
    </motion.div>
  );
} 