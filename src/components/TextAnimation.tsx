"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getOptimizedValue, emojiAnimation, textAnimation } from "@/utils/animations";

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
  mobileOptimized?: boolean;
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
  emojiAnimation: emojiAnimationType = "wave",
  mobileOptimized = true
}: TextAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { amount: 0.2, once });
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency !== undefined) {
      setIsLowEndDevice(navigator.hardwareConcurrency < 4);
    }
  }, []);
  
  // Skip animations for low-end mobile devices
  if (isMobile && isLowEndDevice) {
    return (
      <div ref={ref} className={className}>
        {text}
        {emoji && <span className="ml-1 inline-block">{emoji}</span>}
      </div>
    );
  }
  
  // Mobile optimizations using utility function
  const optimizedDuration = getOptimizedValue(duration, isMobile && mobileOptimized, 0.6, 0.3);
  const optimizedDelay = getOptimizedValue(delay, isMobile && mobileOptimized, 0.5);
  
  // Get centralized text animation props
  const animation = textAnimation(
    variant, 
    text, 
    optimizedDelay, 
    optimizedDuration, 
    isMobile && mobileOptimized,
    isInView
  );
  
  // Use centralized emoji animation utility
  const emojiAnimationConfig = emojiAnimation(
    emojiAnimationType, 
    optimizedDelay + optimizedDuration + 0.5,
    emojiAnimationType === "wave" ? 1.5 : 0.8,
    isMobile && mobileOptimized
  );
  
  // Emoji component
  const EmojiComponent = emoji ? (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, ...emojiAnimationConfig.animate }}
      transition={{
        opacity: { duration: 0.3, delay: optimizedDelay + optimizedDuration },
        scale: { duration: 0.4, delay: optimizedDelay + optimizedDuration, type: "spring" },
        ...emojiAnimationConfig.transition
      }}
      className={`ml-1 ${emojiAnimationConfig.className} text-[0.9em]`}
      style={{ willChange: "transform" }}
    >
      {emoji}
    </motion.span>
  ) : null;
  
  // Character by character animation
  if (variant === "char-by-char") {
    const characters = text.split("");
    
    // Batched characters for mobile
    if (mobileOptimized && isMobile) {
      // Determine batch size for mobile character animations
      const getBatchSize = () => {
        const length = text.length;
        if (length <= 8) return 1;
        if (length <= 15) return 2;
        if (length <= 30) return 4;
        return 6;
      };
      
      const batchSize = getBatchSize();
      const batches = [];
      for (let i = 0; i < characters.length; i += batchSize) {
        batches.push(characters.slice(i, i + batchSize).join(''));
      }
      
      return (
        <motion.div
          ref={ref}
          className={`inline-flex items-center ${className}`}
          {...animation.containerProps}
        >
          <div>
            {batches.map((batch, index) => (
              <motion.span
                key={`batch-${index}`}
                {...animation.itemProps as Record<string, unknown>}
                transition={{
                  ...(animation.itemProps?.transition as Record<string, unknown>),
                  delay: optimizedDelay + index * 0.05,
                }}
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
        {...animation.containerProps}
      >
        <div>
          {characters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              {...animation.itemProps as Record<string, unknown>}
              transition={{
                ...(animation.itemProps?.transition as Record<string, unknown>),
                delay: optimizedDelay + index * 0.04,
              }}
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
    const wordArray = text.split(" ");
    
    // Group words for mobile with long text
    if (mobileOptimized && isMobile && wordArray.length > 8) {
      const limitedWords = wordArray.slice(0, 7);
      const remainingWords = wordArray.slice(7).join(' ');
      
      return (
        <motion.div
          ref={ref}
          className={`inline-flex items-center ${className}`}
          {...animation.containerProps}
        >
          <div>
            {limitedWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                {...animation.itemProps as Record<string, unknown>}
                transition={{
                  ...(animation.itemProps?.transition as Record<string, unknown>),
                  delay: optimizedDelay + index * 0.05,
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              key="remaining-words"
              {...animation.itemProps as Record<string, unknown>}
              transition={{
                ...(animation.itemProps?.transition as Record<string, unknown>),
                delay: optimizedDelay + 7 * 0.05,
              }}
              className="inline-block"
            >
              {remainingWords}
            </motion.span>
          </div>
          {EmojiComponent}
        </motion.div>
      );
    }
    
    // Standard implementation
    return (
      <motion.div
        ref={ref}
        className={`inline-flex items-center ${className}`}
        {...animation.containerProps}
      >
        <div>
          {wordArray.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              {...animation.itemProps as Record<string, unknown>}
              transition={{
                ...(animation.itemProps?.transition as Record<string, unknown>),
                delay: optimizedDelay + index * (isMobile ? 0.05 : 0.1),
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
    if (mobileOptimized && isMobile && text.length > 50) {
      return (
        <div ref={ref} className={`relative inline-flex items-center ${className}`}>
          <motion.div
            {...animation.containerProps}
          >
            {text}
          </motion.div>
          {EmojiComponent}
        </div>
      );
    }
    
    return (
      <div ref={ref} className={`relative inline-flex items-center ${className}`}>
        <motion.div
          {...animation.containerProps}
        >
          {text}
          <motion.span
            {...(animation.additionalProps?.cursor as Record<string, unknown>)}
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
          {...animation.containerProps}
        >
          {text}
        </motion.span>
        {EmojiComponent}
      </div>
    );
  }

  // Default reveal animation
  return (
    <div ref={ref} className={`relative inline-flex items-center ${className}`}>
      <div className="overflow-hidden">
        <motion.div
          {...animation.containerProps}
        >
          {text}
        </motion.div>
      </div>
      {EmojiComponent}
    </div>
  );
}