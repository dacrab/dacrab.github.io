import { motion, useInView, useScroll, useTransform, TargetAndTransition } from "framer-motion";
import { memo, useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import NumberCounter from "./NumberCounter";

// Constants and types
interface LottieVisualizationProps {
  isInView?: boolean;
  isMobile?: boolean;
}

// Animation constants
const ANIMATION_EASING = {
  swissEaseExplosive: [0, 0.9, 0.1, 1], // Extremely sharp, explosive curve
  swissEaseCrisp: [0.12, 0.8, 0.88, 0.58], // More explosive Swiss-style precision curve
};

// Stats data
const STATS = [
  { value: 1, label: "Year", delay: 0.3 },
  { value: 15, label: "Projects", delay: 0.4 },
  { value: 10, label: "Skills", delay: 0.5 },
];

/**
 * Utility: detect low-end device (cores, memory, connection)
 */
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

/**
 * Creates a Swiss-style visualization with explosive animations
 */
const LottieVisualization = memo(function LottieVisualization({ 
  isInView: providedIsInView,
  isMobile: providedIsMobile
}: LottieVisualizationProps) {
  // Device detection
  const defaultIsMobile = useIsMobile();
  const isMobile = providedIsMobile !== undefined ? providedIsMobile : defaultIsMobile;
  
  // References and viewport detection
  const visualizationRef = useRef<HTMLDivElement>(null);
  const defaultIsInView = useInView(visualizationRef, { once: false, amount: 0.3 });
  const isInView = providedIsInView !== undefined ? providedIsInView : defaultIsInView;
  
  // State
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Effects
  useEffect(() => {
    setHasLoaded(true);
    setIsLowEndDevice(detectLowEndDevice());
  }, []);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: visualizationRef,
    offset: ["start end", "end start"]
  });
  
  const rotateZ = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-3, 0, 5, 0, -3]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.95, 1, 1.05, 1, 0.95]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, 5]);
  
  // Animation variants
  const mainAnim = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: hasLoaded ? 1 : 0,
      scale: hasLoaded ? 1 : 0.9,
      transition: { 
        duration: 0.6, 
        ease: ANIMATION_EASING.swissEaseExplosive
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: isMobile ? 10 : 15 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile
          ? isLowEndDevice
            ? 0.3
            : 0.4
          : 0.5,
        delay: isMobile && isLowEndDevice ? delay * 0.7 : delay,
        ease: ANIMATION_EASING.swissEaseExplosive
      },
    }),
  };

  // Size definitions
  const mainSize = isMobile ? 300 : 400;
  const secondWidth = 280;
  const secondHeight = 280;

  return (
    <motion.div 
      ref={visualizationRef}
      style={{ 
        rotateZ,
        scale,
        y: translateY
      }}
      className="relative z-0"
      {...mainAnim}
    >
      {/* Floating accent elements */}
      <AccentElements />
      
      <div className="relative z-10 flex justify-center">
        {/* Main Swiss Style Visualization */}
        <MainVisualization size={mainSize} />
      </div>

      <div className="h-full flex flex-col justify-between mt-8">
        {/* Heading */}
        <motion.h3
          className="text-2xl md:text-3xl font-bold mb-3"
          variants={fadeInUp}
          custom={0}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span className="text-gradient">Developer Journey</span>
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-muted max-w-lg mb-5"
          variants={fadeInUp}
          custom={0.1}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          A visual representation of my growth and experience in web development
        </motion.p>

        {/* Timeline visualization */}
        <div className="relative w-full max-w-sm mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{
              duration: isMobile
                ? isLowEndDevice
                  ? 0.4
                  : 0.5
                : 0.6,
              delay: 0.2,
              ease: ANIMATION_EASING.swissEaseExplosive
            }}
            whileHover={{
              scale: isMobile
                ? isLowEndDevice
                  ? 1
                  : 1.03
                : 1.05,
              transition: { duration: 0.3, ease: ANIMATION_EASING.swissEaseExplosive }
            }}
            className="w-full"
            style={{ height: "auto" }}
          >
            <TimelineVisualization 
              width={secondWidth} 
              height={secondHeight} 
              isInView={isInView} 
            />
          </motion.div>
        </div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 10 : 15 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: isMobile ? 10 : 15 }
          }
          transition={{
            duration: isMobile
              ? isLowEndDevice
                ? 0.4
                : 0.5
              : 0.6,
            delay: isMobile && isLowEndDevice ? 0.2 : 0.3,
            ease: ANIMATION_EASING.swissEaseExplosive
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

/**
 * Animated floating accent elements
 */
function AccentElements() {
  return (
    <>
      <motion.div 
        className="absolute left-1/4 top-1/4 w-16 h-16 bg-[var(--accent-tertiary)] opacity-80 z-0"
        animate={{
          rotate: [0, 15, 0, -15, 0],
          scale: [1, 1.1, 1, 0.9, 1],
          x: [0, 5, 0, -5, 0]
        }}
        transition={{
          duration: 5,
          ease: ANIMATION_EASING.swissEaseCrisp,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div 
        className="absolute right-1/4 bottom-1/6 w-10 h-10 bg-[var(--accent-secondary)] opacity-70 z-0"
        animate={{
          rotate: [0, -15, 0, 15, 0],
          scale: [1, 0.9, 1, 1.1, 1],
          y: [0, 8, 0, -8, 0]
        }}
        transition={{
          duration: 6,
          ease: ANIMATION_EASING.swissEaseCrisp,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.5
        }}
      />
      <motion.div 
        className="absolute left-10 bottom-1/4 w-1 h-16 bg-[var(--accent)] z-0"
        animate={{
          height: ["4rem", "5rem", "4rem", "3rem", "4rem"],
          y: [0, -5, 0, 5, 0]
        }}
        transition={{
          duration: 4,
          ease: ANIMATION_EASING.swissEaseExplosive,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.2
        }}
      />
    </>
  );
}

/**
 * Main animated geometric visualization
 */
function MainVisualization({ size }: { size: number }) {
  return (
    <motion.div 
      style={{ width: `${size}px`, height: `${size}px` }}
      className="relative"
      animate={{
        rotate: [0, 0.5, 0, -0.5, 0],
        scale: [1, 1.01, 1, 0.99, 1]
      }}
      transition={{
        duration: 7,
        ease: ANIMATION_EASING.swissEaseCrisp,
        repeat: Infinity,
        repeatType: "mirror"
      }}
    >
      {/* Background grid */}
      <motion.div 
        className="absolute inset-0 swiss-grid-pattern opacity-20"
        animate={{ 
          opacity: [0.2, 0.3, 0.2, 0.1, 0.2],
          backgroundPosition: ["0% 0%", "2% 2%"]
        }}
        transition={{ 
          duration: 5, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Geometric elements */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-1/3 h-1/3 -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)] opacity-80"
        animate={{ 
          rotate: [0, 15, 0, -15, 0],
          scale: [1, 1.1, 1, 0.9, 1]
        }}
        transition={{
          duration: 5,
          ease: ANIMATION_EASING.swissEaseExplosive,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div 
        className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-[var(--accent-tertiary)] opacity-60"
        animate={{ 
          x: [0, 8, 0, -8, 0],
          y: [0, -8, 0, 8, 0]
        }}
        transition={{
          duration: 6,
          ease: ANIMATION_EASING.swissEaseCrisp,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.3
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-1/5 h-1/5 bg-[var(--accent-secondary)] opacity-70"
        animate={{ 
          rotate: [0, -20, 0, 20, 0],
          x: [0, -10, 0, 10, 0]
        }}
        transition={{
          duration: 5.5,
          ease: ANIMATION_EASING.swissEaseCrisp,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.7
        }}
      />
      
      {/* Swiss style lines */}
      <motion.div 
        className="absolute top-1/2 left-0 w-full h-1 bg-[var(--accent)] opacity-40"
        animate={{ 
          scaleX: [1, 0.8, 1, 0.9, 1],
          y: [0, 5, 0, -5, 0]
        }}
        transition={{
          duration: 4,
          ease: ANIMATION_EASING.swissEaseExplosive,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div 
        className="absolute left-1/2 top-0 w-1 h-full bg-[var(--accent-secondary)] opacity-40"
        animate={{ 
          scaleY: [1, 0.85, 1, 0.9, 1],
          x: [0, -5, 0, 5, 0]
        }}
        transition={{
          duration: 4.5,
          ease: ANIMATION_EASING.swissEaseExplosive,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.2
        }}
      />
      
      {/* Typography */}
      <motion.div 
        className="absolute top-8 left-8 text-xs font-bold tracking-widest uppercase"
        animate={{ 
          opacity: [1, 0.5, 1],
          x: [0, 3, 0]
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        PROGRESS
      </motion.div>
      <motion.div 
        className="absolute bottom-8 right-8 text-xs font-bold tracking-widest uppercase"
        animate={{ 
          opacity: [1, 0.5, 1],
          x: [0, -3, 0]
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.5
        }}
      >
        SKILLS
      </motion.div>
      
      {/* Abstract code representation */}
      <motion.div 
        className="absolute bottom-1/3 left-1/3 flex flex-col items-start gap-1 opacity-70"
        animate={{ 
          x: [0, 5, 0, -5, 0],
          opacity: [0.7, 0.9, 0.7, 0.5, 0.7]
        }}
        transition={{
          duration: 5,
          ease: ANIMATION_EASING.swissEaseCrisp,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        <motion.div 
          className="h-1 w-16 bg-[var(--text)]"
          animate={{ 
            width: ["4rem", "5rem", "4rem", "3.5rem", "4rem"]
          }}
          transition={{
            duration: 4,
            ease: ANIMATION_EASING.swissEaseExplosive,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        <motion.div 
          className="h-1 w-24 bg-[var(--text)]"
          animate={{ 
            width: ["6rem", "4.5rem", "6rem", "5rem", "6rem"] 
          }}
          transition={{
            duration: 4.5,
            ease: ANIMATION_EASING.swissEaseExplosive,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.2
          }}
        />
        <motion.div 
          className="h-1 w-20 bg-[var(--text)]"
          animate={{ 
            width: ["5rem", "6rem", "5rem", "4rem", "5rem"]
          }}
          transition={{
            duration: 4.2,
            ease: ANIMATION_EASING.swissEaseExplosive,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.4
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Timeline visualization component
 */
interface TimelineProps {
  width: number;
  height: number;
  isInView: boolean;
}

function TimelineVisualization({ width, height, isInView }: TimelineProps) {
  return (
    <motion.div 
      style={{ width: `${width}px`, height: `${height}px`, margin: "0 auto" }}
      className="relative bg-[var(--card)]/30 rounded-sm"
      animate={{
        rotate: [0, 0.5, 0, -0.5, 0],
        scale: [1, 1.02, 1, 0.98, 1]
      }}
      transition={{
        duration: 5,
        ease: ANIMATION_EASING.swissEaseCrisp,
        repeat: Infinity,
        repeatType: "mirror"
      }}
    >
      {/* Background pattern */}
      <motion.div 
        className="absolute inset-0 swiss-grid-pattern opacity-10"
        animate={{ 
          opacity: [0.1, 0.2, 0.1, 0.05, 0.1],
          backgroundPosition: ["0% 0%", "3% 3%"]
        }}
        transition={{ 
          duration: 6, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Timeline visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-4/5 h-4/5">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-0 top-1/2 w-full h-1 bg-[var(--muted)] opacity-30"
            animate={{ 
              scaleX: [1, 1.05, 1, 0.95, 1],
              opacity: [0.3, 0.4, 0.3, 0.2, 0.3]
            }}
            transition={{
              duration: 4,
              ease: ANIMATION_EASING.swissEaseCrisp,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          />
          
          {/* Timeline nodes */}
          <TimelineNode 
            position="left-0" 
            value={1} 
            delay={0.2} 
            duration={0.8}
            isInView={isInView} 
            animationPattern={{
              scale: [1, 1.2, 1, 0.9, 1],
              y: ["-50%", "-60%", "-50%", "-40%", "-50%"]
            }}
            transitionDuration={3}
          />
          
          <TimelineNode 
            position="left-1/3" 
            value={5} 
            delay={0.4} 
            duration={1}
            isInView={isInView} 
            animationPattern={{
              scale: [1, 1.2, 1, 0.9, 1],
              y: ["-50%", "-40%", "-50%", "-60%", "-50%"]
            }}
            transitionDuration={3.5}
            transitionDelay={0.3}
            color="bg-[var(--accent-secondary)]"
          />
          
          <TimelineNode 
            position="left-2/3" 
            value={10} 
            delay={0.6} 
            duration={1.2}
            isInView={isInView} 
            animationPattern={{
              scale: [1, 0.9, 1, 1.2, 1],
              y: ["-50%", "-60%", "-50%", "-40%", "-50%"]
            }}
            transitionDuration={4}
            transitionDelay={0.1}
            color="bg-[var(--accent-tertiary)]"
          />
          
          <TimelineNode 
            position="right-0" 
            value={15} 
            delay={0.8} 
            duration={1.4}
            isInView={isInView} 
            animationPattern={{
              scale: [1, 1.2, 1, 0.9, 1],
              y: ["-50%", "-40%", "-50%", "-60%", "-50%"]
            }}
            transitionDuration={3.3}
            transitionDelay={0.4}
          />
          
          {/* Labels */}
          <motion.div 
            className="absolute left-0 bottom-1/4 text-xs uppercase tracking-wider"
            animate={{
              x: [0, 3, 0, -3, 0],
              opacity: [1, 0.7, 1, 0.7, 1]
            }}
            transition={{
              duration: 3,
              ease: ANIMATION_EASING.swissEaseCrisp,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            Start
          </motion.div>
          <motion.div 
            className="absolute right-0 bottom-1/4 text-xs uppercase tracking-wider"
            animate={{
              x: [0, -3, 0, 3, 0],
              opacity: [1, 0.7, 1, 0.7, 1]
            }}
            transition={{
              duration: 3,
              ease: ANIMATION_EASING.swissEaseCrisp,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 0.5
            }}
          >
            Now
          </motion.div>
        </div>
      </div>
      
      {/* Typography */}
      <motion.div 
        className="absolute top-4 left-4 text-xs font-bold tracking-widest uppercase opacity-70"
        animate={{
          opacity: [0.7, 0.4, 0.7],
          x: [0, 2, 0, -2, 0]
        }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        TIMELINE
      </motion.div>
    </motion.div>
  );
}

/**
 * Timeline node component
 */
interface TimelineNodeProps {
  position: string;
  value: number;
  delay: number;
  duration: number;
  isInView: boolean;
  animationPattern: TargetAndTransition;
  transitionDuration: number;
  transitionDelay?: number;
  color?: string;
}

function TimelineNode({ 
  position, 
  value, 
  delay, 
  duration, 
  isInView,
  animationPattern,
  transitionDuration,
  transitionDelay = 0,
  color = "bg-[var(--accent)]"
}: TimelineNodeProps) {
  return (
    <motion.div 
      className={`absolute ${position} top-1/2 -translate-y-1/2 w-6 h-6 rounded-sm ${color} flex items-center justify-center`}
      animate={animationPattern}
      transition={{
        duration: transitionDuration,
        ease: ANIMATION_EASING.swissEaseExplosive,
        repeat: Infinity,
        repeatType: "mirror",
        delay: transitionDelay
      }}
    >
      <NumberCounter
        end={value}
        duration={duration}
        delay={delay}
        isInView={isInView}
        className="text-xs"
      />
    </motion.div>
  );
}

/**
 * Stats card component
 */
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
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay,
        ease: ANIMATION_EASING.swissEaseExplosive
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2, ease: ANIMATION_EASING.swissEaseExplosive }
      }}
      className="bg-[var(--card)]/30 backdrop-blur-sm p-3 rounded-sm relative border-t border-[var(--accent)]/20"
    >
      <div className="relative z-10">
        <div className="text-2xl font-bold mb-1 flex justify-center">
          <NumberCounter
            end={value}
            duration={value < 10 ? 0.8 : 1.2}
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
      <motion.div 
        className="absolute bottom-0 right-0 w-8 h-8 bg-[var(--accent)]/5 z-0"
        animate={{
          scale: [1, 1.2, 1, 0.9, 1],
          rotate: [0, 10, 0, -10, 0]
        }}
        transition={{
          duration: 4,
          ease: ANIMATION_EASING.swissEaseCrisp,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
    </motion.div>
  );
});

export default LottieVisualization;