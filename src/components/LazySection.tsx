import React, { memo, Suspense } from 'react';
import { useLazyLoadSection } from '@/hooks/useLazyLoadSection';
import SectionSkeleton from './SectionSkeleton';

interface LazySectionProps {
  component: React.ComponentType;
  id: string;
  preloadMargin?: string;
}

/**
 * LazySection - A component that lazily loads a section when it's about to enter the viewport
 * This improves initial page load performance by deferring non-visible sections
 */
const LazySection = memo(function LazySection({
  component: Component,
  id,
  preloadMargin = "300px"
}: LazySectionProps) {
  const { containerRef, shouldLoad } = useLazyLoadSection(preloadMargin);

  return (
    <div ref={containerRef} id={id}>
      {shouldLoad ? (
        <Suspense fallback={<SectionSkeleton id={id} />}>
          <Component />
        </Suspense>
      ) : (
        <SectionSkeleton id={id} />
      )}
    </div>
  );
});

export default LazySection; 