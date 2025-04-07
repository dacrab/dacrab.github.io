import { memo } from "react";

interface SectionSkeletonProps {
  id?: string;
  height?: string;
}

/**
 * SectionSkeleton component - Used as a loading placeholder for lazy-loaded sections
 * Maintains the same dimensions as the actual section to prevent layout shift
 */
const SectionSkeleton = memo(function SectionSkeleton({
  id,
  height = "py-16 md:py-28",
}: SectionSkeletonProps) {
  return (
    <section
      id={id}
      className={`${height} relative overflow-hidden`}
      aria-hidden="true"
    >
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header skeleton */}
        <div className="mb-10 md:mb-16 flex flex-col items-center">
          <div className="w-12 h-1 bg-gradient-to-r from-accent/30 to-accent/10 rounded mb-5"></div>
          <div className="h-8 w-48 bg-card/30 rounded animate-pulse"></div>
          <div className="h-3 w-64 mt-4 bg-card/20 rounded animate-pulse"></div>
        </div>

        {/* Main content skeleton */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 h-64 bg-card/20 rounded-xl animate-pulse"></div>
            <div className="lg:col-span-8 space-y-4">
              <div className="h-5 w-1/3 bg-card/30 rounded animate-pulse"></div>
              <div className="h-3 w-full bg-card/20 rounded animate-pulse"></div>
              <div className="h-3 w-5/6 bg-card/20 rounded animate-pulse"></div>
              <div className="h-3 w-4/6 bg-card/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SectionSkeleton; 