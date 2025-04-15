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

  // Detect low-end device (mobile only)
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.hardwareConcurrency !== undefined) {
      setIsLowEndDevice(navigator.hardwareConcurrency < 4);
    }
  }, []);

  // Skip animation for low-end mobile devices
  if (isMobile && isLowEndDevice) {
    return (
      <div ref={ref} className={className}>
        {text}
        {emoji && <span className="ml-1 inline-block">{emoji}</span>}
      </div>
    );
  }

  // Optimize animation values for mobile
  const optimizedDuration = getOptimizedValue(duration, isMobile && mobileOptimized, 0.6, 0.3);
  const optimizedDelay = getOptimizedValue(delay, isMobile && mobileOptimized, 0.5);

  // Centralized animation configs
  const animation = textAnimation(
    variant,
    text,
    optimizedDelay,
    optimizedDuration,
    isMobile && mobileOptimized,
    isInView
  );

  const emojiConfig = emojiAnimation(
    emojiAnimationType,
    optimizedDelay + optimizedDuration + 0.5,
    emojiAnimationType === "wave" ? 1.5 : 0.8,
    isMobile && mobileOptimized
  );

  // Emoji component
  const Emoji = emoji ? (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, ...emojiConfig.animate }}
      transition={{
        opacity: { duration: 0.3, delay: optimizedDelay + optimizedDuration },
        scale: { duration: 0.4, delay: optimizedDelay + optimizedDuration, type: "spring" },
        ...emojiConfig.transition
      }}
      className={`ml-1 ${emojiConfig.className} text-[0.9em]`}
      style={{ willChange: "transform" }}
    >
      {emoji}
    </motion.span>
  ) : null;

  // Helper for batching (used in char-by-char and split)
  const batchArray = <T,>(arr: T[], batchSize: number) => {
    const batches: T[][] = [];
    for (let i = 0; i < arr.length; i += batchSize) {
      batches.push(arr.slice(i, i + batchSize));
    }
    return batches;
  };

  // Char-by-char animation
  if (variant === "char-by-char") {
    const chars = text.split("");
    if (mobileOptimized && isMobile) {
      // Batch chars for mobile
      let batchSize = 1;
      if (chars.length > 30) batchSize = 6;
      else if (chars.length > 15) batchSize = 4;
      else if (chars.length > 8) batchSize = 2;
      const batches = batchArray(chars, batchSize).map(b => b.join(""));
      return (
        <motion.div
          ref={ref}
          className={`inline-flex items-center ${className}`}
          {...animation.containerProps}
        >
          <div>
            {batches.map((batch, i) => (
              <motion.span
                key={i}
                {...animation.itemProps}
                transition={{
                  ...(animation.itemProps?.transition as Record<string, unknown>),
                  delay: optimizedDelay + i * 0.05,
                }}
              >
                {batch}
              </motion.span>
            ))}
          </div>
          {Emoji}
        </motion.div>
      );
    }
    // Desktop: animate each char
    return (
      <motion.div
        ref={ref}
        className={`inline-flex items-center ${className}`}
        {...animation.containerProps}
      >
        <div>
          {chars.map((char, i) => (
            <motion.span
              key={i}
              {...animation.itemProps}
              transition={{
                ...(animation.itemProps?.transition as Record<string, unknown>),
                delay: optimizedDelay + i * 0.04,
              }}
            >
              {char === " " ? <span>&nbsp;</span> : char}
            </motion.span>
          ))}
        </div>
        {Emoji}
      </motion.div>
    );
  }

  // Split (word-by-word) animation
  if (variant === "split") {
    const words = text.split(" ");
    if (mobileOptimized && isMobile && words.length > 8) {
      // Batch after 7 words for mobile
      const limited = words.slice(0, 7);
      const remaining = words.slice(7).join(" ");
      return (
        <motion.div
          ref={ref}
          className={`inline-flex items-center ${className}`}
          {...animation.containerProps}
        >
          <div>
            {limited.map((word, i) => (
              <motion.span
                key={i}
                {...animation.itemProps}
                transition={{
                  ...(animation.itemProps?.transition as Record<string, unknown>),
                  delay: optimizedDelay + i * 0.05,
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              key="remaining"
              {...animation.itemProps}
              transition={{
                ...(animation.itemProps?.transition as Record<string, unknown>),
                delay: optimizedDelay + 7 * 0.05,
              }}
              className="inline-block"
            >
              {remaining}
            </motion.span>
          </div>
          {Emoji}
        </motion.div>
      );
    }
    // Standard: animate each word
    return (
      <motion.div
        ref={ref}
        className={`inline-flex items-center ${className}`}
        {...animation.containerProps}
      >
        <div>
          {words.map((word, i) => (
            <motion.span
              key={i}
              {...animation.itemProps}
              transition={{
                ...(animation.itemProps?.transition as Record<string, unknown>),
                delay: optimizedDelay + i * (isMobile ? 0.05 : 0.1),
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </div>
        {Emoji}
      </motion.div>
    );
  }

  // Typewriter effect
  if (variant === "typewriter") {
    if (mobileOptimized && isMobile && text.length > 50) {
      // Skip cursor for long mobile text
      return (
        <div ref={ref} className={`relative inline-flex items-center ${className}`}>
          <motion.div {...animation.containerProps}>{text}</motion.div>
          {Emoji}
        </div>
      );
    }
    return (
      <div ref={ref} className={`relative inline-flex items-center ${className}`}>
        <motion.div {...animation.containerProps}>
          {text}
          {(() => {
            const cursor = animation.additionalProps?.cursor;
            if (
              cursor &&
              typeof cursor === 'object' &&
              !Array.isArray(cursor) &&
              cursor !== null
            ) {
              return (
                <motion.span
                  {...(cursor as Record<string, unknown>)}
                  className={`inline-block ml-[2px] w-[2px] h-[1.2em] bg-${color} align-middle`}
                />
              );
            }
            return null;
          })()}
        </motion.div>
        {Emoji}
      </div>
    );
  }

  // Gradient text animation
  if (variant === "gradient") {
    return (
      <div ref={ref} className={`inline-flex items-center ${className}`}>
        <motion.span {...animation.containerProps}>{text}</motion.span>
        {Emoji}
      </div>
    );
  }

  // Default: reveal animation
  return (
    <div ref={ref} className={`relative inline-flex items-center ${className}`}>
      <div className="overflow-hidden">
        <motion.div {...animation.containerProps}>{text}</motion.div>
      </div>
      {Emoji}
    </div>
  );
}