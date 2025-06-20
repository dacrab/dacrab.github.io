type CubicBezier = [number, number, number, number];

// Animation constants
export const ANIMATION: {
  easing: {
    explosive: CubicBezier;
    crisp: CubicBezier;
    smooth: CubicBezier;
  };
  duration: {
    short: number;
    medium: number;
    long: number;
    fast: number;
  };
  delay: {
    stagger: number;
  };
} = {
  easing: {
    explosive: [0, 0.9, 0.1, 1], // Extremely sharp, explosive curve
    crisp: [0.12, 0.8, 0.88, 0.58], // More explosive Swiss-style precision curve
    smooth: [0.1, 0.9, 0.1, 1], // Smooth curve
  },
  duration: {
    short: 0.5,
    medium: 0.8,
    long: 1.2,
    fast: 0.2,
  },
  delay: {
    stagger: 0.2,
  }
};

// Tech keywords array with icons - using the same technologies from About/types.ts
export const TECH_KEYWORDS = [
  { 
    name: "NextJS", 
    icon: "https://cdn.simpleicons.org/nextdotjs/000000/FFFFFF"
  },
  { 
    name: "TYPESCRIPT", 
    icon: "https://cdn.simpleicons.org/typescript/3178C6" 
  },
  { 
    name: "TailwindCSS", 
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" 
  },
  { 
    name: "FRAMER MOTION", 
    icon: "https://cdn.simpleicons.org/framer/0055FF" 
  },
  { 
    name: "SUPABASE", 
    icon: "https://cdn.simpleicons.org/supabase/3ECF8E" 
  }
];

// Grid intersection points data
export const GRID_POINTS = [
  { top: "1/4", left: "1/4", color: "var(--accent)", delay: 2.2 },
  { top: "1/4", left: "2/4", color: "var(--accent-secondary)", delay: 2.3 },
  { top: "1/4", left: "3/4", color: "var(--accent-tertiary)", delay: 2.4 },
  { top: "2/4", left: "1/4", color: "var(--accent-tertiary)", delay: 2.5 },
  { top: "2/4", left: "2/4", color: "var(--accent)", delay: 2.6 },
  { top: "2/4", left: "3/4", color: "var(--accent-secondary)", delay: 2.7 },
  { top: "3/4", left: "1/4", color: "var(--accent-secondary)", delay: 2.8 },
  { top: "3/4", left: "2/4", color: "var(--accent-tertiary)", delay: 2.9 },
  { top: "3/4", left: "3/4", color: "var(--accent)", delay: 3.0 }
]; 