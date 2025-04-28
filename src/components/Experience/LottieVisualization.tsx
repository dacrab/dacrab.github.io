import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { memo, useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import NumberCounter from "./NumberCounter";

interface LottieVisualizationProps {
  isInView?: boolean;
  isMobile?: boolean;
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
  isInView: providedIsInView,
  isMobile: providedIsMobile
}: LottieVisualizationProps) {
  // Use provided values or hooks
  const defaultIsMobile = useIsMobile();
  const isMobile = providedIsMobile !== undefined ? providedIsMobile : defaultIsMobile;
  
  const visualizationRef = useRef<HTMLDivElement>(null);
  const defaultIsInView = useInView(visualizationRef, { once: false, amount: 0.3 });
  const isInView = providedIsInView !== undefined ? providedIsInView : defaultIsInView;
  
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Set loaded state after mount
  useEffect(() => {
    setHasLoaded(true);
  }, []);

  // Detect low-end device once on mount
  useEffect(() => {
    setIsLowEndDevice(detectLowEndDevice());
  }, []);

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: visualizationRef,
    offset: ["start end", "end start"]
  });
  
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.02, 0.98]);
  
  const mainAnim = {
    initial: { opacity: 0 },
    animate: { 
      opacity: hasLoaded ? 1 : 0,
      transition: { duration: 0.5 }
    }
  };

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

  // Size definitions - use even numbers
  const mainSize = isMobile ? 300 : 400;
  // Second visualization dimensions
  const secondWidth = 280;
  const secondHeight = 280;

  return (
    <motion.div 
      ref={visualizationRef}
      style={{ 
        rotateZ,
        scale,
      }}
      className="relative z-0"
      {...mainAnim}
    >
      {/* Swiss style accent elements */}
      <div className="absolute left-1/4 top-1/4 w-16 h-16 bg-[var(--accent-tertiary)] opacity-80 z-0"></div>
      <div className="absolute right-1/4 bottom-1/6 w-10 h-10 bg-[var(--accent-secondary)] opacity-70 z-0"></div>
      <div className="absolute left-10 bottom-1/4 w-1 h-16 bg-[var(--accent)] z-0"></div>
      
      <div className="relative z-10 flex justify-center">
        {/* Main Swiss Style Visualization */}
        <div 
          style={{ width: `${mainSize}px`, height: `${mainSize}px` }}
          className="relative"
        >
          {/* Background grid */}
          <div className="absolute inset-0 swiss-grid-pattern opacity-20"></div>
          
          {/* Swiss geometric elements */}
          <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)] opacity-80"></div>
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-[var(--accent-tertiary)] opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/5 h-1/5 bg-[var(--accent-secondary)] opacity-70"></div>
          
          {/* Swiss style lines */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--accent)] opacity-40"></div>
          <div className="absolute left-1/2 top-0 w-1 h-full bg-[var(--accent-secondary)] opacity-40"></div>
          
          {/* Swiss typography */}
          <div className="absolute top-8 left-8 text-xs font-bold tracking-widest uppercase">
            PROGRESS
          </div>
          <div className="absolute bottom-8 right-8 text-xs font-bold tracking-widest uppercase">
            SKILLS
          </div>
          
          {/* Abstract code representation */}
          <div className="absolute bottom-1/3 left-1/3 flex flex-col items-start gap-1 opacity-70">
            <div className="h-1 w-16 bg-[var(--text)]"></div>
            <div className="h-1 w-24 bg-[var(--text)]"></div>
            <div className="h-1 w-20 bg-[var(--text)]"></div>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col justify-between mt-8">
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

        <div className="relative w-full max-w-sm mx-auto mb-6">
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
            className="w-full"
            style={{ height: "auto" }}
          >
            {/* Second Swiss Style Visualization */}
            <div 
              style={{ width: `${secondWidth}px`, height: `${secondHeight}px`, margin: "0 auto" }}
              className="relative bg-[var(--card)]/30 rounded-sm"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 swiss-grid-pattern opacity-10"></div>
              
              {/* Swiss style visualizations */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Timeline representation */}
                <div className="relative w-4/5 h-4/5">
                  {/* Timeline line */}
                  <div className="absolute left-0 top-1/2 w-full h-1 bg-[var(--muted)] opacity-30"></div>
                  
                  {/* Timeline nodes */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-sm bg-[var(--accent)] flex items-center justify-center">
                    <NumberCounter
                      end={1}
                      duration={1}
                      delay={0.2}
                      isInView={isInView}
                      className="text-xs"
                    />
                  </div>
                  
                  <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-sm bg-[var(--accent-secondary)] flex items-center justify-center">
                    <NumberCounter
                      end={5}
                      duration={1.2}
                      delay={0.4}
                      isInView={isInView}
                      className="text-xs"
                    />
                  </div>
                  
                  <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-sm bg-[var(--accent-tertiary)] flex items-center justify-center">
                    <NumberCounter
                      end={10}
                      duration={1.5}
                      delay={0.6}
                      isInView={isInView}
                      className="text-xs"
                    />
                  </div>
                  
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-sm bg-[var(--accent)] flex items-center justify-center">
                    <NumberCounter
                      end={15}
                      duration={1.8}
                      delay={0.8}
                      isInView={isInView}
                      className="text-xs"
                    />
                  </div>
                  
                  {/* Labels */}
                  <div className="absolute left-0 bottom-1/4 text-xs uppercase tracking-wider">Start</div>
                  <div className="absolute right-0 bottom-1/4 text-xs uppercase tracking-wider">Now</div>
                </div>
              </div>
              
              {/* Swiss typography */}
              <div className="absolute top-4 left-4 text-xs font-bold tracking-widest uppercase opacity-70">
                TIMELINE
              </div>
            </div>
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
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
});

interface StatsCardProps {
  value: number;
  label: string;
  delay: number;
  isInView: boolean;
}

const StatsCard = memo(function StatsCard({
  value,
  label,
  delay,
  isInView,
}: StatsCardProps) {
  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-[var(--card)]/30 backdrop-blur-sm p-3 rounded-sm relative border-t border-[var(--accent)]/20"
    >
      <div className="relative z-10">
        <div className="text-2xl font-bold mb-1 flex justify-center">
          <NumberCounter
            end={value}
            duration={value < 10 ? 1 : 2}
            isInView={isInView}
            suffix="+"
            className="text-2xl font-bold"
          />
        </div>
        <div className="text-xs uppercase tracking-wider text-[var(--muted)] text-center">
          {label}
        </div>
      </div>
      {/* Swiss element accent */}
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--accent)]/5 z-0"></div>
    </motion.div>
  );
});

export default LottieVisualization;