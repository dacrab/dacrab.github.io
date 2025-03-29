"use client";

import { motion } from "framer-motion";
import TextAnimation from "../TextAnimation";
import ScrollScene from "../ScrollScene";

interface SectionHeadingProps {
  isInView: boolean;
}

export default function SectionHeading({ isInView }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6 }}
      className="mb-20 text-center"
    >
      <ScrollScene depth={0.25} className="mb-4 inline-block">
        <TextAnimation 
          text="Connect With Me" 
          variant="reveal" 
          className="text-3xl md:text-4xl font-bold inline-block text-gradient-animated"
          delay={0.2}
          duration={0.4}
        />
      </ScrollScene>
      
      <motion.div 
        className="relative w-24 h-0.5 bg-accent mx-auto mb-6 overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: isInView ? "6rem" : 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {/* Animated shimmer effect */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-white/70"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          style={{ filter: "blur(8px)" }}
        />
      </motion.div>
      
      <TextAnimation 
        text="Let's collaborate and create something amazing together" 
        variant="split" 
        className="text-muted max-w-2xl mx-auto"
        delay={0.4}
        duration={0.3}
      />
    </motion.div>
  );
} 