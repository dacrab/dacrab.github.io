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
        className="relative w-24 h-0.5 bg-accent/70 mx-auto mb-6"
        initial={{ width: 0 }}
        animate={{ width: isInView ? "6rem" : 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            delay: 1.2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <div 
            className="w-full h-full bg-accent"
            style={{
              filter: "blur(4px)"
            }}
          />
        </motion.div>
      </motion.div>
      
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TextAnimation 
            text="Let's collaborate and create something amazing together" 
            variant="char-by-char"
            className="max-w-2xl mx-auto"
            delay={0.7}
            duration={0.02}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}