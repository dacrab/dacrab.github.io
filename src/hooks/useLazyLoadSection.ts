"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to lazily load components when they approach the viewport
 * @param rootMargin Distance from the viewport to start loading (default: "200px")
 * @returns An object with a ref to attach to the container element and a boolean indicating if the component should be loaded
 */
export function useLazyLoadSection(rootMargin = "200px") {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section is approaching the viewport
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin, // Start loading when element is this distance from viewport
        threshold: 0, // Trigger as soon as any part is visible
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad, rootMargin]);

  return { containerRef, shouldLoad };
} 