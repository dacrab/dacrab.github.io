"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionStyle } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  style?: MotionStyle;
  target?: [number, number];
}

export default function ParallaxLayer({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  style = {},
  target = [0, 1]
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create all possible transform values directly, not in a function
  const distance = 100 * speed;
  const upTransform = useTransform(scrollYProgress, target, [0, -distance]);
  const downTransform = useTransform(scrollYProgress, target, [0, distance]);
  const leftTransform = useTransform(scrollYProgress, target, [0, -distance]);
  const rightTransform = useTransform(scrollYProgress, target, [0, distance]);
  
  // Determine which transform to use based on direction
  let motionStyle: MotionStyle = {};
  
  if (direction === "up") {
    motionStyle = { y: upTransform };
  } else if (direction === "down") {
    motionStyle = { y: downTransform };
  } else if (direction === "left") {
    motionStyle = { x: leftTransform };
  } else if (direction === "right") {
    motionStyle = { x: rightTransform };
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...motionStyle,
        willChange: "transform"
      }}
    >
      {children}
    </motion.div>
  );
} 