"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
  type?: "fade" | "slide" | "scale" | "rotate" | "reveal";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  whileHover?: "lift" | "glow" | "scale" | "rotate" | "none";
  whileTap?: "press" | "none";
}

export default function StaggerItem({
  children,
  className = "",
  type = "fade",
  direction = "up",
  delay = 0,
  duration = 0.5,
  whileHover = "none",
  whileTap = "none"
}: StaggerItemProps) {
  // Calculate initial and animate values based on type and direction
  const getVariants = (): Variants => {
    // Animation type variants
    switch (type) {
      case "slide": {
        if (direction === "up") {
          return {
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration, 
                delay,
                ease: [0.19, 1, 0.22, 1] // Swiss-style precision curve
              }
            }
          };
        } else if (direction === "down") {
          return {
            hidden: { opacity: 0, y: -20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration, 
                delay,
                ease: [0.19, 1, 0.22, 1] 
              }
            }
          };
        } else if (direction === "left") {
          return {
            hidden: { opacity: 0, x: 20 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration, 
                delay,
                ease: [0.19, 1, 0.22, 1] 
              }
            }
          };
        } else { // right
          return {
            hidden: { opacity: 0, x: -20 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration, 
                delay,
                ease: [0.19, 1, 0.22, 1] 
              }
            }
          };
        }
      }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration, 
              delay,
              ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style precision curve 
            }
          }
        };
      case "rotate":
        return {
          hidden: { opacity: 0, rotate: -3 },
          visible: { 
            opacity: 1, 
            rotate: 0,
            transition: { 
              duration, 
              delay,
              ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style precision curve 
            }
          }
        };
      case "reveal":
        return {
          hidden: { clipPath: "inset(0 100% 0 0)" },
          visible: { 
            clipPath: "inset(0 0% 0 0)",
            transition: { 
              duration, 
              delay,
              ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style precision curve 
            }
          }
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              duration, 
              delay,
              ease: [0.17, 0.67, 0.83, 0.67] // Swiss-style precision curve 
            }
          }
        };
    }
  };
  
  // Swiss style hover variants
  const hoverVariants = {
    lift: { y: -8, transition: { duration: 0.3, ease: "easeOut" } },
    glow: { 
      boxShadow: "0 0 10px 2px rgba(var(--accent-rgb), 0.3)", 
      transition: { duration: 0.3 } 
    },
    scale: { scale: 1.03, transition: { duration: 0.3, ease: "easeOut" } },
    rotate: { rotate: 1, transition: { duration: 0.3, ease: "easeOut" } },
    none: {}
  };

  // Swiss style tap variants
  const tapVariants = {
    press: { scale: 0.98, transition: { duration: 0.1 } },
    none: {}
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      whileHover={hoverVariants[whileHover]}
      whileTap={tapVariants[whileTap]}
    >
      {children}
    </motion.div>
  );
} 