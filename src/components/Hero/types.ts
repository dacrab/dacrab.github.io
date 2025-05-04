// Common prop types for Hero components
export interface HeroCommonProps {
  isMobile: boolean;
}

// Hero content component props
export interface HeroContentProps extends HeroCommonProps {
  showCVDropdown: boolean;
  setShowCVDropdown: (show: boolean) => void;
  handleCVDownload: (lang: string) => void;
}

// Button group component props
// Using type alias instead of empty interface to avoid TypeScript warnings
export type ButtonGroupProps = HeroContentProps;

// Tech keywords component props
export interface TechKeywordsProps {
  className?: string;
}

// Background elements component props
// Using type alias instead of empty interface to avoid TypeScript warnings
export type BackgroundElementsProps = HeroCommonProps;

// Hero heading component props
// Using type alias instead of empty interface to avoid TypeScript warnings
export type HeroHeadingProps = HeroCommonProps;

// Grid point object interface
export interface GridPoint {
  top: string;
  left: string;
  color: string;
  delay: number;
} 