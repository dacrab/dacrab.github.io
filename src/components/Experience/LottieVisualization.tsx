import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import NumberCounter from "./NumberCounter";
import { memo, useState, useEffect, useRef } from "react";

interface LottieVisualizationProps {
  isInView: boolean;
  isMobile: boolean;
}

// Utility: detect low-end device (cores, memory, connection)
function detectLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as unknown as {
    hardwareConcurrency?: number;
    deviceMemory?: number;
    connection?: {
      effectiveType?: string;
      saveData?: boolean;
    };
  };
  const lowCores = nav.hardwareConcurrency && nav.hardwareConcurrency < 4;
  const lowMem = nav.deviceMemory && nav.deviceMemory < 4;
  const conn = nav.connection;
  const lowConn =
    conn &&
    (conn.effectiveType === "2g" ||
      conn.effectiveType === "3g" ||
      conn.saveData === true);
  return !!(lowCores || lowMem || lowConn);
}

const STATS = [
  { value: 1, label: "Year", delay: 0.5 },
  { value: 15, label: "Projects", delay: 0.55 },
  { value: 10, label: "Skills", delay: 0.6 },
];

const LottieVisualization = memo(function LottieVisualization({
  isInView,
  isMobile,
}: LottieVisualizationProps) {
  const [shouldRenderLottie, setShouldRenderLottie] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const hasRenderedOnce = useRef(false);

  // Detect low-end device once on mount
  useEffect(() => {
    setIsLowEndDevice(detectLowEndDevice());
  }, []);

  // Only load Lottie when in view and not on low-end mobile
  useEffect(() => {
    if (
      isInView &&
      !hasRenderedOnce.current &&
      !(isMobile && isLowEndDevice)
    ) {
      const timer = setTimeout(() => {
        setShouldRenderLottie(true);
        hasRenderedOnce.current = true;
      }, isMobile ? 300 : 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, isMobile, isLowEndDevice]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: isMobile ? 5 : 8 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile
          ? isLowEndDevice
            ? 0.2
            : 0.3
          : 0.4,
        delay: isMobile && isLowEndDevice ? delay * 0.7 : delay,
      },
    }),
  };

  // Lottie or fallback
  let animationContent;
  if (isMobile && isLowEndDevice) {
    animationContent = (
      <div className="w-full h-full bg-card/30 rounded-lg flex items-center justify-center p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent/80 h-4/5 w-4/5"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M7 9h.01" />
          <path d="M12 9h.01" />
          <path d="M17 9h.01" />
        </svg>
      </div>
    );
  } else if (shouldRenderLottie) {
    animationContent = (
      <DotLottieReact
        src="https://lottie.host/bf490252-846e-457c-a7db-c2dcf327442e/81l4tBdw6P.lottie"
        loop={!isMobile}
        autoplay
        className="w-full h-full"
        speed={isMobile ? 0.8 : 1}
      />
    );
  } else {
    animationContent = (
      <div className="w-full h-full bg-card/40 rounded-lg animate-pulse flex items-center justify-center">
        <div
          className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin"
          style={{
            animationDuration: isMobile ? "2s" : "1.5s",
            opacity: 0.7,
          }}
        ></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <motion.h3
        className="text-2xl md:text-3xl font-bold mb-3"
        variants={fadeInUp}
        custom={0}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <span className="text-gradient">Developer Journey</span>
      </motion.h3>

      <motion.p
        className="text-muted max-w-lg mb-5"
        variants={fadeInUp}
        custom={0.1}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        A visual representation of my growth and experience in web development
      </motion.p>

      <div className="relative w-full aspect-square max-w-sm mx-auto mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{
            duration: isMobile
              ? isLowEndDevice
                ? 0.3
                : 0.4
              : 0.5,
            delay: 0.2,
          }}
          whileHover={{
            scale: isMobile
              ? isLowEndDevice
                ? 1
                : 1.01
              : 1.02,
          }}
          className="w-full h-full"
        >
          {animationContent}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: isMobile ? 8 : 10 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: isMobile ? 8 : 10 }
        }
        transition={{
          duration: isMobile
            ? isLowEndDevice
              ? 0.3
              : 0.4
            : 0.5,
          delay: isMobile && isLowEndDevice ? 0.3 : 0.4,
        }}
        className="grid grid-cols-3 gap-3"
      >
        {STATS.map((stat) => (
          <StatsCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            delay={stat.delay}
            isInView={isInView}
            isMobile={isMobile}
            isLowEndDevice={isLowEndDevice}
          />
        ))}
      </motion.div>
    </div>
  );
});

interface StatsCardProps {
  value: number;
  label: string;
  delay: number;
  isInView: boolean;
  isMobile: boolean;
  isLowEndDevice: boolean;
}

const StatsCard = memo(function StatsCard({
  value,
  label,
  delay,
  isInView,
  isMobile,
  isLowEndDevice,
}: StatsCardProps) {
  return (
    <motion.div
      className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl py-3 px-2 text-center relative overflow-hidden group"
      whileHover={
        isMobile && isLowEndDevice
          ? undefined
          : {
              y: isMobile ? -1 : -2,
              borderColor: "rgba(var(--accent-rgb), 0.3)",
            }
      }
      transition={{ duration: 0.2 }}
    >
      <NumberCounter
        end={value}
        duration={isMobile ? (isLowEndDevice ? 0.6 : 0.8) : 1}
        delay={isMobile && isLowEndDevice ? delay * 0.7 : delay}
        suffix="+"
        isInView={isInView}
        className="text-xl font-bold text-accent"
      />
      <div className="text-xs md:text-sm text-muted mt-1 group-hover:text-accent/80 transition-colors duration-200">
        {label}
      </div>
    </motion.div>
  );
});

export default LottieVisualization;