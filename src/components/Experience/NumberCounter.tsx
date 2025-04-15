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

  useEffect(() => {
    if (!isInView) {
      setCount(0);
      return;
    }

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
      // Ease out
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
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
      transition={{ duration: 0.3, delay }}
    >
      {count}
      {suffix}
    </motion.div>
  );
});

export default NumberCounter;