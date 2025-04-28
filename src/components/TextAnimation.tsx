"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface TextAnimationProps {
  text: string;
  variant?: "split" | "reveal" | "typewriter" | "gradient" | "char-by-char";
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  mobileOptimized?: boolean;
}

export default function TextAnimation({
  text,
  variant = "reveal",
  className = "",
  delay = 0,
  duration = 0.5,
  once = false,
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
      </div>
    );
  }

  // Optimize animation values for mobile
  const optimizedDuration = isMobile && mobileOptimized ? duration * 0.6 : duration;
  const optimizedDelay = isMobile && mobileOptimized ? delay * 0.5 : delay;

  // Swiss style reveal animation (default)
  if (variant === "reveal") {
    return (
      <div ref={ref} className={`relative inline-flex items-center ${className}`}>
        <div className="overflow-hidden">
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: isInView ? 0 : "100%" }}
            transition={{ 
              duration: optimizedDuration,
              delay: optimizedDelay,
              ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style crisp animation
            }}
          >
            {text}
          </motion.div>
        </div>
      </div>
    );
  }

  // Split words animation
  if (variant === "split") {
    const words = text.split(" ");
    return (
      <motion.div
        ref={ref}
        className={`inline-flex items-center ${className}`}
      >
        <div>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 10 
              }}
              transition={{
                duration: optimizedDuration,
                delay: optimizedDelay + i * (isMobile ? 0.05 : 0.1),
                ease: [0.17, 0.67, 0.83, 0.67]
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  }

  // Typewriter effect
  if (variant === "typewriter") {
    return (
      <div ref={ref} className={`relative inline-flex items-center ${className}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isInView ? "100%" : 0 }}
          transition={{
            duration: optimizedDuration * 1.5,
            delay: optimizedDelay,
            ease: [0.17, 0.67, 0.83, 0.67],
            // Create a stepped animation effect without using "steps()"
            times: Array.from({ length: 20 }).map((_, i) => i / 19)
          }}
          style={{ whiteSpace: "nowrap", overflow: "hidden" }}
        >
          {text}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? [0, 1, 0] : 0 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 0.2,
              delay: optimizedDelay + optimizedDuration
            }}
            className="inline-block ml-[2px] w-[2px] h-[1.2em] bg-[var(--accent)] align-middle"
          />
        </motion.div>
      </div>
    );
  }

  // Gradient animation - Swiss style shimmer effect
  if (variant === "gradient") {
    return (
      <div ref={ref} className={`inline-flex items-center ${className}`}>
        <motion.span 
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ 
            backgroundPosition: isInView ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%"
          }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: Infinity,
            delay: optimizedDelay
          }}
          style={{
            background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 50%, var(--accent) 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent"
          }}
        >
          {text}
        </motion.span>
      </div>
    );
  }

  // Character by character animation
  if (variant === "char-by-char") {
    const chars = text.split("");
    return (
      <motion.div
        ref={ref}
        className={`inline-flex items-center ${className}`}
      >
        <div>
          {chars.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ 
                opacity: isInView ? 1 : 0, 
                y: isInView ? 0 : 5 
              }}
              transition={{
                duration: 0.2,
                delay: optimizedDelay + i * 0.03,
                ease: [0.17, 0.67, 0.83, 0.67]
              }}
            >
              {char === " " ? <span>&nbsp;</span> : char}
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  }

  // Fallback
  return (
    <div ref={ref} className={className}>
      {text}
    </div>
  );
}