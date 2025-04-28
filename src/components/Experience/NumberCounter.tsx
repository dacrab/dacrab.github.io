import { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";

interface NumberCounterProps {
  end: number;
  duration: number;
  delay?: number;
  suffix?: string;
  isInView?: boolean;
  className?: string;
}

const NumberCounter = memo(function NumberCounter({
  end,
  duration,
  delay = 0,
  suffix = "",
  isInView = true,
  className = "text-accent text-2xl font-bold",
}: NumberCounterProps) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);
  const previousInView = useRef<boolean>(false);

  useEffect(() => {
    // Reset to 0 when element goes out of view
    if (!isInView && previousInView.current) {
      setCount(0);
      previousInView.current = false;
      return;
    }

    // Skip if not in view
    if (!isInView) {
      return;
    }

    // Update reference
    previousInView.current = true;
    
    // Always start from 0 when animation begins
    setCount(0);
    
    let start: number | null = null;
    let started = false;

    const animate = (timestamp: number) => {
      if (!started) {
        start = timestamp + delay * 1000;
        started = true;
      }
      
      if (timestamp < (start ?? 0)) {
        raf.current = requestAnimationFrame(animate);
        return;
      }
      
      const elapsed = timestamp - (start ?? 0);
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Improved easing function for smoother animation
      // Using cubic bezier-like easing for a more natural feel
      const eased = progress === 1 
        ? 1 
        : progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const val = Math.floor(eased * end);
      setCount(val);
      
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    raf.current = requestAnimationFrame(animate);
    
    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, [end, duration, delay, isInView]);

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
        ease: [0.25, 0.1, 0.25, 1.0] // Improved easing curve
      }}
    >
      {count}
      {suffix}
    </motion.div>
  );
});

export default NumberCounter;