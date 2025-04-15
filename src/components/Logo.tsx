"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface LogoProps {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  showFullName?: boolean;
}

const FIRST_NAME = "Vaggelis";
const LAST_NAME = "Kavouras";

export default function Logo({
  onClick,
  className = "",
  size = "md",
  showFullName = false,
}: LogoProps) {
  const isMobile = useIsMobile();

  // Hydration-safe: Only show full name after client-side check
  const [shouldShowFullName, setShouldShowFullName] = useState(false);
  useEffect(() => {
    if (showFullName && typeof window !== "undefined" && window.innerWidth >= 1024) {
      setShouldShowFullName(true);
    } else {
      setShouldShowFullName(false);
    }
  }, [showFullName]);

  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  // Animation variants
  const logoVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: isMobile ? 0.07 : 0.1,
          delayChildren: isMobile ? 0.15 : 0.2,
        },
      },
      hover: {
        transition: { staggerChildren: isMobile ? 0.03 : 0.05 },
      },
    }),
    [isMobile]
  );

  const letterVariants = useMemo(
    () => ({
      hidden: { y: isMobile ? 15 : 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: isMobile ? 250 : 300,
          damping: isMobile ? 25 : 20,
        },
      },
      hover: (custom: number) => ({
        y: [0, isMobile ? -3 : -5, 0],
        color: "var(--accent)",
        transition: {
          duration: isMobile ? 0.4 : 0.5,
          delay: custom * (isMobile ? 0.03 : 0.05),
        },
      }),
    }),
    [isMobile]
  );

  const accentVariants = useMemo(
    () => ({
      hidden: { scale: 0, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: isMobile ? 400 : 500,
          damping: isMobile ? 20 : 15,
          delay: isMobile ? 0.5 : 0.7,
        },
      },
      hover: {
        scale: isMobile ? 1.15 : 1.2,
        rotate: [0, isMobile ? 7 : 10, isMobile ? -7 : -10, 0],
        transition: { duration: isMobile ? 0.4 : 0.5 },
      },
    }),
    [isMobile]
  );

  const subtleGlowTransition = useMemo(
    () => ({
      duration: isMobile ? 5 : 4,
      repeat: Infinity,
      ease: "easeInOut",
    }),
    [isMobile]
  );

  // Render
  return (
    <motion.a
      href="#home"
      onClick={onClick}
      className={`font-bold relative inline-flex items-center ${sizeClasses[size]} ${className}`}
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative overflow-hidden">
        <div className="flex items-baseline">
          {/* VK letter mark with animation */}
          <motion.span
            className="text-foreground font-extrabold font-cursive text-125"
            variants={letterVariants}
            custom={0}
          >
            V
          </motion.span>
          <motion.span
            className="text-foreground font-extrabold font-cursive text-125"
            variants={letterVariants}
            custom={1}
          >
            K
          </motion.span>
          {/* Accent dot */}
          <motion.span
            className="text-accent ml-0.5 absolute -top-0.5 -right-2"
            variants={accentVariants}
          >
            .
          </motion.span>
        </div>
        {/* Subtle glow effect */}
        <motion.div
          className="absolute inset-0 bg-accent/10 blur-xl rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, isMobile ? 0.3 : 0.4, 0.2],
            scale: [0.8, isMobile ? 1.05 : 1.1, 0.8],
          }}
          transition={subtleGlowTransition}
        />
      </div>
      {/* First name with letter animation */}
      <div className="ml-2 flex items-baseline">
        <div className="flex font-cursive text-125">
          {[...FIRST_NAME].map((letter, i) => (
            <motion.span
              key={`first-${i}`}
              className="inline-block"
              variants={letterVariants}
              custom={i + 3}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        {/* Last name - only shown on larger screens if requested */}
        {shouldShowFullName && (
          <>
            <motion.span
              className="mx-1 text-accent/60"
              variants={letterVariants}
              custom={FIRST_NAME.length + 3}
            >
              &nbsp;
            </motion.span>
            <div className="flex font-cursive text-125">
              {[...LAST_NAME].map((letter, i) => (
                <motion.span
                  key={`last-${i}`}
                  className="inline-block text-foreground/70"
                  variants={letterVariants}
                  custom={i + FIRST_NAME.length + 4}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.a>
  );
}