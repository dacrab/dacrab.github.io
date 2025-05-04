import { useEffect, useRef, useState, memo, useCallback } from "react";
import { motion } from "framer-motion";

// ==========================================================================
// Type Definitions
// ==========================================================================
interface NumberCounterProps {
  end: number;
  duration: number;
  delay?: number;
  suffix?: string;
  isInView?: boolean;
  className?: string;
}

// ==========================================================================
// Constants
// ==========================================================================
const DEFAULT_CLASSNAME = "text-accent text-2xl font-bold";
const EASING = [0.25, 0.1, 0.25, 1.0];

// ==========================================================================
// Animation Helpers
// ==========================================================================
const easeInOutCubic = (progress: number) => {
  return progress === 1 
    ? 1 
    : progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
};

// ==========================================================================
// Component
// ==========================================================================
const NumberCounter = memo(function NumberCounter({
  end,
  duration,
  delay = 0,
  suffix = "",
  isInView = true,
  className = DEFAULT_CLASSNAME,
}: NumberCounterProps) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const previousInViewRef = useRef<boolean>(false);

  const cleanupAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const handleOutOfView = useCallback(() => {
    setCount(0);
    previousInViewRef.current = false;
    cleanupAnimation();
  }, [cleanupAnimation]);

  const animateCount = useCallback((timestamp: number, startTime: number | null, hasStarted: boolean) => {
    if (!hasStarted) {
      startTime = timestamp + delay * 1000;
      hasStarted = true;
    }
    
    if (timestamp < (startTime ?? 0)) {
      rafRef.current = requestAnimationFrame((ts) => animateCount(ts, startTime, hasStarted));
      return;
    }
    
    const elapsed = timestamp - (startTime ?? 0);
    const progress = Math.min(elapsed / (duration * 1000), 1);
    const easedProgress = easeInOutCubic(progress);
    
    setCount(Math.floor(easedProgress * end));
    
    if (progress < 1) {
      rafRef.current = requestAnimationFrame((ts) => animateCount(ts, startTime, hasStarted));
    } else {
      setCount(end);
    }
  }, [delay, duration, end]);

  useEffect(() => {
    if (!isInView) {
      if (previousInViewRef.current) handleOutOfView();
      return;
    }

    previousInViewRef.current = true;
    setCount(0);
    cleanupAnimation();
    
    rafRef.current = requestAnimationFrame((timestamp) => 
      animateCount(timestamp, null, false)
    );

    return cleanupAnimation;
  }, [end, duration, delay, isInView, cleanupAnimation, handleOutOfView, animateCount]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 5,
      }}
      transition={{ 
        duration: 0.4,
        delay,
        ease: EASING
      }}
    >
      {count}{suffix}
    </motion.div>
  );
});

export default NumberCounter;