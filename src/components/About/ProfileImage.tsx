import { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import NumberCounter from "../Experience/NumberCounter";

// Animation constants
const EASING = {
  swiss: [0.22, 0.9, 0.36, 0.95],
  crisp: [0.12, 0.8, 0.88, 0.58],
  explosive: [0, 0.9, 0.1, 1]
};

const ProfileImage = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });

  return (
    <div className="swiss-card relative">
      {/* Accent line */}
      <div className="absolute top-0 right-0 w-1 h-full bg-[var(--accent-tertiary)]" />

      {/* Main image container */}
      <div className="aspect-square w-full max-w-md relative overflow-hidden bg-[var(--card)] mx-auto">
        {/* Background grid pattern */}
        <motion.div 
          className="absolute inset-0 swiss-grid-pattern opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "5% 5%"] }}
          transition={{ 
            duration: 5, 
            ease: "linear", 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Main content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASING.explosive }}
          className="w-full h-full flex items-center justify-center relative"
        >
          {/* Abstract profile representation */}
          <div className="relative w-full h-full">
            {/* Background shapes */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[var(--accent-tertiary)] opacity-20 rotate-45"
              animate={{ rotate: [45, 55, 45, 35, 45], scale: [1, 1.1, 1, 0.9, 1] }}
              transition={{
                duration: 6,
                ease: EASING.explosive,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-1/4 h-1/4 bg-[var(--accent-secondary)] opacity-30"
              animate={{ x: [0, 12, 0, -12, 0], y: [0, -8, 0, 8, 0] }}
              transition={{
                duration: 7,
                ease: EASING.crisp,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />

            {/* Profile avatar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-3/4 h-3/4 flex items-center justify-center">
                <div className="relative">
                  {/* Head */}
                  <motion.div 
                    className="w-24 h-24 rounded-full bg-[var(--accent)] opacity-80 flex items-center justify-center"
                    animate={{ scale: [1, 1.15, 1, 0.92, 1], y: [0, -5, 0, 5, 0] }}
                    transition={{
                      duration: 4,
                      ease: EASING.crisp,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  >
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-[var(--card)]"
                      animate={{ scale: [1, 0.85, 1, 1.1, 1] }}
                      transition={{
                        duration: 3.5,
                        ease: EASING.swiss,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: 0.2
                      }}
                    />
                  </motion.div>

                  {/* Body */}
                  <motion.div 
                    className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-32 h-32 bg-[var(--accent-secondary)] opacity-60 rotate-45"
                    animate={{ rotate: [45, 60, 45, 30, 45], y: [0, -8, 0, 8, 0], scale: [1, 1.08, 1, 0.95, 1] }}
                    transition={{
                      duration: 5,
                      ease: EASING.explosive,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  />
                </div>

                {/* Overlay elements */}
                <motion.div 
                  className="absolute inset-0 swiss-grid-pattern opacity-30"
                  animate={{ backgroundPosition: ["0% 0%", "2% 2%"], opacity: [0.3, 0.4, 0.3, 0.2, 0.3] }}
                  transition={{ 
                    duration: 4, 
                    ease: EASING.crisp, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />

                {/* Accent lines */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-2 bg-[var(--accent)]"
                  animate={{ width: ["100%", "80%", "100%"], x: [0, 10, 0] }}
                  transition={{
                    duration: 4,
                    ease: EASING.explosive,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-2 h-full bg-[var(--accent-secondary)]"
                  animate={{ height: ["100%", "75%", "100%"], y: [0, 10, 0] }}
                  transition={{
                    duration: 4.5,
                    ease: EASING.explosive,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
              </div>
            </div>

            {/* Text labels */}
            <motion.div 
              className="absolute top-4 left-4 text-xs font-bold tracking-widest opacity-70 uppercase"
              animate={{ opacity: [0.7, 0.3, 0.7], x: [0, 3, 0] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              PORTFOLIO
            </motion.div>
            <motion.div 
              className="absolute bottom-4 right-4 text-xs font-bold tracking-widest opacity-70 uppercase"
              animate={{ opacity: [0.7, 0.3, 0.7], x: [0, -3, 0] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
                delay: 0.5
              }}
            >
              DEVELOPER
            </motion.div>
          </div>
        </motion.div>

        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)]" />
      </div>

      {/* Stats section */}
      <div ref={statsRef} className="mt-8 grid grid-cols-2 gap-6">
        <StatItem 
          end={1} 
          duration={1.5} 
          delay={0.3} 
          suffix="+" 
          label="Years Experience"
          isInView={isStatsInView}
        />
        <StatItem 
          end={15} 
          duration={2} 
          delay={0.5} 
          suffix="+" 
          label="Projects"
          isInView={isStatsInView}
        />
      </div>
    </div>
  );
};

// Stat component for better organization
const StatItem = ({ end, duration, delay, suffix, label, isInView }: {
  end: number;
  duration: number;
  delay: number;
  suffix: string;
  label: string;
  isInView: boolean;
}) => (
  <div className="text-center">
    <NumberCounter 
      end={end}
      duration={duration}
      delay={delay}
      suffix={suffix}
      isInView={isInView}
      className="text-3xl font-bold mb-1"
    />
    <div className="text-sm uppercase tracking-wider text-[var(--muted)]">{label}</div>
  </div>
);

export default ProfileImage;