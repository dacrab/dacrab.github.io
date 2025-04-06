"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextAnimationProps {
  text: string;
  variant?: "split" | "reveal" | "typewriter" | "gradient" | "char-by-char";
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  color?: string;
  emoji?: string;
  emojiAnimation?: "wave" | "bounce" | "pulse" | "spin" | "none";
}

export default function TextAnimation({
  text,
  variant = "reveal",
  className = "",
  delay = 0,
  duration = 0.5,
  once = false,
  color = "gradient-1",
  emoji,
  emojiAnimation = "wave"
}: TextAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2, once });
  
  // Split text into characters and words only when needed
  const characters = text.split("");
  const wordArray = text.split(" ");
  
  // Get emoji animation properties
  const getEmojiAnimation = () => {
    switch (emojiAnimation) {
      case "wave":
        return {
          animate: { rotate: [0, 15, 5, 15, 0, -5, 0] },
          transition: {
            repeat: Infinity,
            repeatDelay: 3,
            duration: 1.5,
            delay: delay + duration + 0.5,
            ease: [0.215, 0.61, 0.355, 1],
            times: [0, 0.2, 0.3, 0.4, 0.6, 0.8, 1]
          },
          className: "inline-block origin-bottom-right"
        };
      case "bounce":
        return {
          animate: { y: [0, -10, 0] },
          transition: {
            repeat: Infinity,
            repeatDelay: 2,
            duration: 0.8,
            delay: delay + duration + 0.5,
            ease: "easeOut",
          },
          className: "inline-block"
        };
      case "pulse":
        return {
          animate: { scale: [1, 1.2, 1] },
          transition: {
            repeat: Infinity,
            repeatDelay: 2.5,
            duration: 0.7,
            delay: delay + duration + 0.5,
            ease: "easeInOut",
          },
          className: "inline-block"
        };
      case "spin":
        return {
          animate: { rotate: [0, 360] },
          transition: {
            repeat: Infinity,
            repeatDelay: 3,
            duration: 1.2,
            delay: delay + duration + 0.5,
            ease: "linear",
          },
          className: "inline-block"
        };
      default:
        return {
          animate: {},
          transition: {},
          className: "inline-block"
        };
    }
  };
  
  // Emoji component
  const EmojiComponent = emoji ? (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, ...getEmojiAnimation().animate }}
      transition={{
        opacity: { duration: 0.3, delay: delay + duration },
        scale: { duration: 0.5, delay: delay + duration, type: "spring" },
        ...getEmojiAnimation().transition
      }}
      className={`ml-1 ${getEmojiAnimation().className} text-[0.9em]`}
    >
      {emoji}
    </motion.span>
  ) : null;
  
  // Character by character animation
  if (variant === "char-by-char") {
    return (
      <motion.div
        ref={ref}
        className={`inline-flex items-center ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay }}
      >
        <div>
          {characters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={isInView ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
              transition={{
                duration: duration,
                delay: delay + index * 0.04,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              className="inline-block"
              style={{ willChange: "clip-path" }}
            >
              {char === " " ? <span>&nbsp;</span> : char}
            </motion.span>
          ))}
        </div>
        {EmojiComponent}
      </motion.div>
    );
  }

  // Split words animation
  if (variant === "split") {
    return (
      <motion.div
        ref={ref}
        className={`inline-flex items-center ${className}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <div>
          {wordArray.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 20, display: "inline-block" }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: duration,
                delay: delay + index * 0.1,
                ease: [0.215, 0.61, 0.355, 1]
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </div>
        {EmojiComponent}
      </motion.div>
    );
  }

  // Typewriter effect
  if (variant === "typewriter") {
    return (
      <div ref={ref} className={`relative inline-flex items-center ${className}`}>
        <motion.div
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={{
            duration: duration * text.length * 0.08,
            delay,
            ease: "linear"
          }}
          className="whitespace-nowrap"
        >
          {text}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className={`inline-block ml-[2px] w-[2px] h-[1.2em] bg-${color} align-middle`}
          />
        </motion.div>
        {EmojiComponent}
      </div>
    );
  }

  // Gradient text animation
  if (variant === "gradient") {
    return (
      <div ref={ref} className={`inline-flex items-center ${className}`}>
        <motion.span
          initial={{ backgroundPosition: "0% 50%" }}
          animate={
            isInView ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : { backgroundPosition: "0% 50%" }
          }
          transition={{
            duration: duration * 5,
            delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-gradient-2 to-gradient-4 bg-[size:300%]"
        >
          {text}
        </motion.span>
        {EmojiComponent}
      </div>
    );
  }

  // Default reveal
  return (
    <div ref={ref} className={`relative inline-flex items-center ${className}`}>
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{
            duration,
            delay,
            ease: [0.215, 0.61, 0.355, 1]
          }}
        >
          {text}
        </motion.div>
      </div>
      {EmojiComponent}
    </div>
  );
}