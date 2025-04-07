"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  mobileOptimized?: boolean; // Allow disabling optimization
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
  emojiAnimation = "wave",
  mobileOptimized = true
}: TextAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { amount: 0.2, once });
  
  // Mobile optimizations
  const optimizedDuration = mobileOptimized && isMobile ? Math.min(duration * 0.8, 0.4) : duration;
  const optimizedDelay = mobileOptimized && isMobile ? Math.min(delay * 0.7, delay) : delay;
  
  // Split text into characters and words only when needed
  const characters = text.split("");
  const wordArray = text.split(" ");
  
  // Determine optimal character batch size for mobile animations
  const getBatchSize = () => {
    if (!mobileOptimized || !isMobile) return 1;
    
    const length = text.length;
    if (length <= 10) return 1;  // Still animate each character for short texts
    if (length <= 20) return 2;  // Batch 2 at a time
    return 3;                    // Batch 3 at a time for longer texts
  };
  
  const batchSize = getBatchSize();
  
  // Get emoji animation properties - simplified for mobile
  const getEmojiAnimation = () => {
    // Simple or no animations on mobile if optimized
    if (mobileOptimized && isMobile) {
      switch (emojiAnimation) {
        case "wave":
          return {
            animate: { rotate: [0, 10, 0] },
            transition: {
              repeat: Infinity,
              repeatDelay: 4,
              duration: 1,
              delay: optimizedDelay + optimizedDuration + 0.5,
              ease: "easeInOut",
            },
            className: "inline-block origin-bottom-right"
          };
        case "bounce":
          return {
            animate: { y: [0, -5, 0] },
            transition: {
              repeat: Infinity,
              repeatDelay: 3,
              duration: 0.6,
              delay: optimizedDelay + optimizedDuration + 0.5,
              ease: "easeOut",
            },
            className: "inline-block"
          };
        default:
          // Skip complex animations on mobile
          return {
            animate: {},
            transition: {},
            className: "inline-block"
          };
      }
    }
    
    // Regular animations for desktop
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
  
  // Emoji component with mobile optimizations
  const EmojiComponent = emoji ? (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, ...getEmojiAnimation().animate }}
      transition={{
        opacity: { duration: 0.3, delay: optimizedDelay + optimizedDuration },
        scale: { duration: 0.5, delay: optimizedDelay + optimizedDuration, type: "spring" },
        ...getEmojiAnimation().transition
      }}
      className={`ml-1 ${getEmojiAnimation().className} text-[0.9em]`}
      style={{ 
        willChange: emojiAnimation !== "none" ? "transform" : "opacity" 
      }}
    >
      {emoji}
    </motion.span>
  ) : null;
  
  // Character by character animation - batched for mobile
  if (variant === "char-by-char") {
    // For mobile, we either batch characters or simplify to word-by-word
    if (mobileOptimized && isMobile && batchSize > 1) {
      // Create batched characters for mobile
      const batches = [];
      for (let i = 0; i < characters.length; i += batchSize) {
        batches.push(characters.slice(i, i + batchSize).join(''));
      }
      
      return (
        <motion.div
          ref={ref}
          className={`inline-flex items-center ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: optimizedDelay }}
        >
          <div>
            {batches.map((batch, index) => (
              <motion.span
                key={`batch-${index}`}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={isInView ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
                transition={{
                  duration: optimizedDuration,
                  delay: optimizedDelay + index * 0.08,
                  ease: "easeOut"
                }}
                className="inline-block"
                style={{ willChange: "clip-path" }}
              >
                {batch}
              </motion.span>
            ))}
          </div>
          {EmojiComponent}
        </motion.div>
      );
    }
    
    // Regular character-by-character for desktop
    return (
      <motion.div
        ref={ref}
        className={`inline-flex items-center ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: optimizedDelay }}
      >
        <div>
          {characters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={isInView ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
              transition={{
                duration: optimizedDuration,
                delay: optimizedDelay + index * 0.04,
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
                duration: optimizedDuration,
                delay: optimizedDelay + index * (isMobile ? 0.07 : 0.1),
                ease: [0.215, 0.61, 0.355, 1]
              }}
              className="inline-block mr-[0.25em]"
              style={{ willChange: "transform, opacity" }}
            >
              {word}
            </motion.span>
          ))}
        </div>
        {EmojiComponent}
      </motion.div>
    );
  }

  // Typewriter effect - optimized for mobile
  if (variant === "typewriter") {
    // Simplified typewriter for mobile
    const typingSpeed = mobileOptimized && isMobile 
      ? optimizedDuration * text.length * 0.05 // Faster typing on mobile
      : duration * text.length * 0.08;
    
    return (
      <div ref={ref} className={`relative inline-flex items-center ${className}`}>
        <motion.div
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={{
            duration: typingSpeed,
            delay: optimizedDelay,
            ease: "linear"
          }}
          className="whitespace-nowrap"
          style={{ willChange: "width" }}
        >
          {text}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ 
              repeat: Infinity, 
              duration: isMobile ? 1 : 0.8 
            }}
            className={`inline-block ml-[2px] w-[2px] h-[1.2em] bg-${color} align-middle`}
            style={{ willChange: "opacity" }}
          />
        </motion.div>
        {EmojiComponent}
      </div>
    );
  }

  // Gradient text animation - simplified for mobile
  if (variant === "gradient") {
    const gradientDuration = mobileOptimized && isMobile ? optimizedDuration * 3 : duration * 5;
    
    return (
      <div ref={ref} className={`inline-flex items-center ${className}`}>
        <motion.span
          initial={{ backgroundPosition: "0% 50%" }}
          animate={
            isInView ? { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } : { backgroundPosition: "0% 50%" }
          }
          transition={{
            duration: gradientDuration,
            delay: optimizedDelay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-gradient-2 to-gradient-4 bg-[size:300%]"
          style={{ willChange: "background-position" }}
        >
          {text}
        </motion.span>
        {EmojiComponent}
      </div>
    );
  }

  // Default reveal - optimized for mobile
  return (
    <div ref={ref} className={`relative inline-flex items-center ${className}`}>
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
          transition={{
            duration: optimizedDuration,
            delay: optimizedDelay,
            ease: [0.215, 0.61, 0.355, 1]
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {text}
        </motion.div>
      </div>
      {EmojiComponent}
    </div>
  );
}