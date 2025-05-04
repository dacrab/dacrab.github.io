// Animation constants
export const ANIMATION = {
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

// Tech keywords array
export const TECH_KEYWORDS = ["REACT", "NEXTJS", "TYPESCRIPT", "NODEJS", "AWS"];

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