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
  as?: "span" | "div";
}

export default function TextAnimation({
  text,
  variant = "reveal",
  className = "",
  delay = 0,
  duration = 0.5,
  once = false,
  mobileOptimized = true,
  as = "span"
}: TextAnimationProps) {
  // Create separate refs for spans and divs
  const spanRef = useRef<HTMLSpanElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  // Determine which ref to use based on the "as" prop
  const ref = as === "span" ? spanRef : divRef;
  
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
    return as === "span" ? (
      <span ref={spanRef} className={className}>
        {text}
      </span>
    ) : (
      <div ref={divRef} className={className}>
        {text}
      </div>
    );
  }

  // Optimize animation values for mobile
  const optimizedDuration = isMobile && mobileOptimized ? duration * 0.6 : duration;
  const optimizedDelay = isMobile && mobileOptimized ? delay * 0.5 : delay;

  // Swiss style reveal animation (default)
  if (variant === "reveal") {
    return as === "span" ? (
      <span ref={spanRef} className={`relative inline-flex items-center ${className}`}>
        <span className="overflow-hidden">
          <motion.span 
            initial={{ y: "100%" }}
            animate={{ y: isInView ? 0 : "100%" }}
            transition={{ 
              duration: optimizedDuration,
              delay: optimizedDelay,
              ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style crisp animation
            }}
          >
            {text}
          </motion.span>
        </span>
      </span>
    ) : (
      <div ref={divRef} className={`relative inline-flex items-center ${className}`}>
        <span className="overflow-hidden">
          <motion.span 
            initial={{ y: "100%" }}
            animate={{ y: isInView ? 0 : "100%" }}
            transition={{ 
              duration: optimizedDuration,
              delay: optimizedDelay,
              ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style crisp animation
            }}
          >
            {text}
          </motion.span>
        </span>
      </div>
    );
  }

  // Split words animation
  if (variant === "split") {
    const words = text.split(" ");
    
    if (as === "span") {
      return (
        <motion.span
          ref={spanRef}
          className={`inline-flex items-center ${className}`}
        >
          <span>
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
          </span>
        </motion.span>
      );
    } else {
      return (
        <motion.div
          ref={divRef}
          className={`inline-flex items-center ${className}`}
        >
          <span>
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
          </span>
        </motion.div>
      );
    }
  }

  // Typewriter effect
  if (variant === "typewriter") {
    return as === "span" ? (
      <span ref={spanRef} className={`relative inline-flex items-center ${className}`}>
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: isInView ? "100%" : 0 }}
          transition={{
            duration: optimizedDuration * 1.5,
            delay: optimizedDelay,
            ease: [0.17, 0.67, 0.83, 0.67],
            times: Array.from({ length: 20 }).map((_, i) => i / 19)
          }}
          style={{ whiteSpace: "nowrap", overflow: "hidden", display: "inline-block" }}
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
        </motion.span>
      </span>
    ) : (
      <div ref={divRef} className={`relative inline-flex items-center ${className}`}>
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: isInView ? "100%" : 0 }}
          transition={{
            duration: optimizedDuration * 1.5,
            delay: optimizedDelay,
            ease: [0.17, 0.67, 0.83, 0.67],
            times: Array.from({ length: 20 }).map((_, i) => i / 19)
          }}
          style={{ whiteSpace: "nowrap", overflow: "hidden", display: "inline-block" }}
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
        </motion.span>
      </div>
    );
  }

  // Gradient animation - Swiss style shimmer effect
  if (variant === "gradient") {
    return as === "span" ? (
      <span ref={spanRef} className={`inline-flex items-center ${className}`}>
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
      </span>
    ) : (
      <div ref={divRef} className={`inline-flex items-center ${className}`}>
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
    
    if (as === "span") {
      return (
        <motion.span
          ref={spanRef}
          className={`inline-flex items-center ${className}`}
        >
          <span>
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
          </span>
        </motion.span>
      );
    } else {
      return (
        <motion.div
          ref={divRef}
          className={`inline-flex items-center ${className}`}
        >
          <span>
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
          </span>
        </motion.div>
      );
    }
  }

  // Fallback
  return as === "span" ? (
    <span ref={spanRef} className={className}>
      {text}
    </span>
  ) : (
    <div ref={divRef} className={className}>
      {text}
    </div>
  );
}