import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { memo, useState, useEffect, useRef } from "react";
import { useLazyLottie } from "@/hooks/useLazyLottie";

interface LottiePanelProps {
  isInView: boolean;
  delay: number;
  isMobile?: boolean;
}

const LOW_END_CORE = 4;
const LOW_END_MEMORY = 4;

const isLowEnd = (): boolean => {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as unknown as {
    hardwareConcurrency?: number;
    deviceMemory?: number;
    connection?: {
      effectiveType?: string;
      saveData?: boolean;
    };
  };
  return Boolean(
    (nav.hardwareConcurrency && nav.hardwareConcurrency < LOW_END_CORE) ||
    (nav.deviceMemory && nav.deviceMemory < LOW_END_MEMORY) ||
    (nav.connection &&
      (nav.connection.effectiveType === "2g" ||
        nav.connection.effectiveType === "3g" ||
        nav.connection.saveData === true))
  );
};

const LOTTIE_URL =
  "https://lottie.host/89786656-4880-42e7-9f18-82895c67895a/37mBlD7a1R.lottie";

const LottiePanel = memo(function LottiePanel({
  isInView,
  delay,
  isMobile = false,
}: LottiePanelProps) {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    setIsLowEndDevice(isLowEnd());
  }, []);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
    }
  }, [isInView]);

  // Only load Lottie if visible and not on low-end mobile
  const shouldLoadLottie = isInView && !(isMobile && isLowEndDevice);

  const { isLottieReady, animationSource } = useLazyLottie(
    shouldLoadLottie,
    LOTTIE_URL,
    false,
    true
  );

  // Animation props
  const motionProps = isMobile
    ? {
        initial: { opacity: 0, y: isLowEndDevice ? 5 : 10 },
        animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : isLowEndDevice ? 5 : 10 },
        transition: {
          duration: isLowEndDevice ? 0.2 : 0.3,
          delay: isLowEndDevice ? delay * 0.7 : delay,
        },
        whileHover: isLowEndDevice ? undefined : { scale: 1.01 },
        whileTap: isLowEndDevice ? undefined : { scale: 0.99 },
      }
    : {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 },
        transition: { duration: 0.5, delay },
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
      };

  // Lottie or fallback
  let lottieContent;
  if (isMobile && isLowEndDevice) {
    lottieContent = (
      <div className="w-full h-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          height="160"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent/70"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
          <path d="m10 12 4 3-4 3" />
        </svg>
      </div>
    );
  } else if (isLottieReady && animationSource) {
    lottieContent = (
      <DotLottieReact
        src={animationSource}
        loop={!isMobile}
        autoplay={!hasAnimated.current || !isMobile}
        className="w-full h-full"
        speed={isMobile ? 0.8 : 1}
      />
    );
  } else {
    lottieContent = (
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-8 h-8 border-t-2 border-accent/30 rounded-full animate-spin"
          style={{
            animationDuration: isMobile ? "2s" : "1.5s",
            opacity: 0.7,
          }}
        ></div>
      </div>
    );
  }

  // Button hover/tap
  const buttonHover =
    isMobile && isLowEndDevice
      ? undefined
      : {
          y: isMobile ? -1 : -2,
          boxShadow: `0 ${isMobile ? "4px" : "6px"} ${
            isMobile ? "8px" : "15px"
          } -5px rgba(var(--accent-rgb), ${isMobile ? "0.15" : "0.25"})`,
        };

  return (
    <motion.div
      className="sticky top-32 bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden h-full group hover:border-accent/30 transition-all duration-300 shadow-md"
      {...motionProps}
    >
      <div className="p-5 h-full flex flex-col">
        <h3 className="text-lg md:text-xl font-bold mb-3 text-center">
          Let&apos;s Build Something Amazing
        </h3>
        <div className="flex-grow relative overflow-hidden flex items-center justify-center py-3">
          <motion.div
            className="w-full h-72 relative"
            layoutId="project-lottie-container"
            {...(isMobile && isLowEndDevice
              ? {}
              : {
                  whileHover: { scale: isMobile ? 1.01 : 1.02 },
                  transition: { duration: isMobile ? 0.15 : 0.2 },
                })}
          >
            {lottieContent}
          </motion.div>
        </div>
        {(!isMobile || !isLowEndDevice || isInView) && (
          <p className="text-muted text-sm text-center mb-4">
            Have a project in mind? I&apos;d love to help bring your vision to life.
          </p>
        )}
        <div className="mt-auto text-center">
          <motion.a
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-white transition-all duration-200 font-medium"
            whileHover={buttonHover}
            whileTap={isMobile && isLowEndDevice ? undefined : { y: 0 }}
          >
            <span>Discuss Your Project</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
});

export default LottiePanel;