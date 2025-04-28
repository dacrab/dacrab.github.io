import { memo } from "react";

interface SectionSkeletonProps {
  id?: string;
  height?: string;
}

/**
 * SectionSkeleton component - Used as a loading placeholder for lazy-loaded sections
 * Maintains the same dimensions as the actual section to prevent layout shift
 * Now updated with Swiss style design elements
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
      <div className="swiss-container mx-auto relative z-10">
        {/* Swiss style section header skeleton */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-[var(--accent-secondary)] opacity-30 mr-4 animate-pulse"></div>
            <div className="h-8 w-48 bg-[var(--card-hover)] animate-pulse"></div>
          </div>
          <div className="ml-12">
            <div className="w-24 h-1 bg-[var(--foreground)] opacity-30 mb-8"></div>
            <div className="h-4 w-64 bg-[var(--card-hover)] animate-pulse"></div>
          </div>
        </div>

        {/* Main content skeleton with Swiss style */}
        <div className="max-w-6xl mx-auto">
          {/* Swiss style accent elements */}
          <div className="absolute left-0 top-1/3 w-2 h-16 bg-[var(--accent-secondary)] opacity-20"></div>
          <div className="absolute right-0 top-16 w-8 h-1 bg-[var(--accent)] opacity-20"></div>
          
          <div className="swiss-grid">
            <div className="swiss-asymmetric-left">
              <div className="swiss-card relative h-64 animate-pulse bg-[var(--card-hover)]">
                <div className="absolute top-0 left-0 w-1/3 h-1 bg-[var(--accent)] opacity-30"></div>
              </div>
            </div>
            
            <div className="swiss-asymmetric-right mt-12 md:mt-0">
              <div className="swiss-card relative animate-pulse">
                <div className="absolute top-0 right-0 w-1 h-16 bg-[var(--accent-secondary)] opacity-30"></div>
                <div className="space-y-4">
                  <div className="h-4 w-1/3 bg-[var(--card-hover)]"></div>
                  <div className="h-3 w-full bg-[var(--card-hover)]"></div>
                  <div className="h-3 w-5/6 bg-[var(--card-hover)]"></div>
                  <div className="h-3 w-4/6 bg-[var(--card-hover)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SectionSkeleton; 