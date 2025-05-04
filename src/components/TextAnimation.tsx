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
  // Create refs for both element types
  const spanRef = useRef<HTMLSpanElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const ref = as === "span" ? spanRef : divRef;
  
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { amount: 0.2, once });
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Performance optimization detection
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.hardwareConcurrency !== undefined) {
      setIsLowEndDevice(navigator.hardwareConcurrency < 4);
    }
  }, []);

  // Skip animations for low-end mobile devices
  if (isMobile && isLowEndDevice) {
    return as === "span" ? (
      <span ref={spanRef} className={className}>{text}</span>
    ) : (
      <div ref={divRef} className={className}>{text}</div>
    );
  }

  // Animation timing optimizations
  const optimizedDuration = isMobile && mobileOptimized ? duration * 0.6 : duration;
  const optimizedDelay = isMobile && mobileOptimized ? delay * 0.5 : delay;
  
  // Common animation ease curve
  const swissEase = [0.17, 0.67, 0.83, 0.67];

  // Render the appropriate animation variant
  const renderAnimatedContent = () => {
    switch (variant) {
      case "reveal":
        return (
          <span className="overflow-hidden">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: isInView ? 0 : "100%" }}
              transition={{ 
                duration: optimizedDuration,
                delay: optimizedDelay,
                ease: swissEase
              }}
            >
              {text}
            </motion.span>
          </span>
        );
        
      case "split": {
        const words = text.split(" ");
        return (
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
                  ease: swissEase
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        );
      }
        
      case "typewriter":
        return (
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: isInView ? "100%" : 0 }}
            transition={{
              duration: optimizedDuration * 1.5,
              delay: optimizedDelay,
              ease: swissEase,
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
        );
        
      case "gradient":
        return (
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
        );
        
      case "char-by-char": {
        const chars = text.split("");
        return (
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
                  ease: swissEase
                }}
              >
                {char === " " ? <span>&nbsp;</span> : char}
              </motion.span>
            ))}
          </span>
        );
      }
        
      default:
        return text;
    }
  };

  // Render the component with the appropriate wrapper
  const wrapperClass = `${variant === "reveal" || variant === "split" || variant === "typewriter" || variant === "gradient" || variant === "char-by-char" ? "inline-flex items-center" : ""} ${className}`;
  
  return as === "span" ? (
    <span ref={spanRef} className={wrapperClass}>
      {renderAnimatedContent()}
    </span>
  ) : (
    <div ref={divRef} className={wrapperClass}>
      {renderAnimatedContent()}
    </div>
  );
}