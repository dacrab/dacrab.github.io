"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

// Cache for preloaded Lottie animations to avoid redundant fetches
const lottieCache = new Map<string, string>();

// Initialize preloading status tracker
const preloadStatus = new Map<string, boolean>();

// Track active animations to limit concurrent loads
let activeLoads = 0;
const MAX_CONCURRENT_LOADS = 2;

// Add type definition for NetworkInformation API
interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

// Extended Navigator interface with connection property
interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

// Mobile detection for stricter optimizations
const isMobileDevice = typeof navigator !== 'undefined' && (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  (navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
);

/**
 * Custom hook to lazily load Lottie animations to reduce initial page load
 * @param shouldLoad Condition to start loading the animation (e.g., based on component visibility)
 * @param source Path to the Lottie animation file
 * @param preload Whether to preload the animation when idle
 * @param mobileOptimized Whether to apply extra optimizations for mobile
 * @returns Object with a boolean indicating if the animation is ready to be displayed and the animation source
 */
export function useLazyLottie(
  shouldLoad: boolean, 
  source: string, 
  preload: boolean = true,
  mobileOptimized: boolean = true
) {
  const [isLottieReady, setIsLottieReady] = useState(false);
  const [animationSource, setAnimationSource] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  // Optimize source URL for mobile if needed
  const optimizedSource = useCallback(() => {
    if (mobileOptimized && isMobileDevice) {
      // Add quality parameter to Lottie host URLs to get optimized version for mobile
      if (source.includes('lottie.host')) {
        return source.includes('?') 
          ? `${source}&quality=low` 
          : `${source}?quality=low`;
      }
    }
    return source;
  }, [source, mobileOptimized]);
  
  // Clean up function to ensure we don't update state after unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  // Function to load the animation resource, wrapped in useCallback
  const loadLottieAnimation = useCallback(() => {
    // Check if already cached
    const sourceToUse = optimizedSource();
    if (lottieCache.has(sourceToUse)) {
      if (mountedRef.current) {
        setAnimationSource(lottieCache.get(sourceToUse) || null);
        setIsLottieReady(true);
      }
      return;
    }
    
    // Further delay loading on mobile devices to prioritize critical content
    const mobileDelay = isMobileDevice && mobileOptimized ? 500 : 300;
    
    // Check if we should queue this load due to too many concurrent loads
    if (activeLoads >= MAX_CONCURRENT_LOADS) {
      timerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          loadLottieAnimation();
        }
      }, mobileDelay * (activeLoads - MAX_CONCURRENT_LOADS + 1)); // Progressive backoff
      return;
    }
    
    // Start loading with a delay to prioritize critical rendering
    activeLoads++;
    
    timerRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setAnimationSource(sourceToUse);
        setIsLottieReady(true);
        
        // Cache the animation source
        lottieCache.set(sourceToUse, sourceToUse);
      }
      
      // Decrement active loads
      activeLoads = Math.max(0, activeLoads - 1);
    }, mobileDelay);
  }, [optimizedSource, mobileOptimized]);
  
  // Load the animation when component should load
  useEffect(() => {
    if (!shouldLoad || isLottieReady) return;
    
    // For mobile, only load when network is not metered or slow
    if (isMobileDevice && mobileOptimized && typeof navigator !== 'undefined') {
      const nav = navigator as NavigatorWithConnection;
      if (nav.connection && (nav.connection.saveData || (nav.connection.effectiveType && nav.connection.effectiveType.includes('2g')))) {
        // Don't load on 2G or when saveData is enabled
        return;
      }
    }
    
    loadLottieAnimation();
    
    return () => {
      // Clean up the timer if component unmounts before loading completes
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [shouldLoad, isLottieReady, loadLottieAnimation, mobileOptimized]);
  
  // Preload animations during idle time for better perceived performance
  useEffect(() => {
    // Skip if already loaded, already preloading, preload disabled, or on mobile with optimization
    if (
      isLottieReady || 
      !preload || 
      preloadStatus.get(optimizedSource()) || 
      (isMobileDevice && mobileOptimized)
    ) return;
    
    // Mark as being preloaded to avoid duplicate work
    preloadStatus.set(optimizedSource(), true);
    
    // Use requestIdleCallback with a fallback for browsers that don't support it
    const requestIdleCallbackFunc = 
      typeof window !== 'undefined' && 'requestIdleCallback' in window 
        ? window.requestIdleCallback 
        : (cb: IdleRequestCallback) => setTimeout(cb, 1);
    
    const cancelIdleCallbackFunc = 
      typeof window !== 'undefined' && 'cancelIdleCallback' in window
        ? window.cancelIdleCallback
        : (id: number) => clearTimeout(id);
    
    const idleCallback = requestIdleCallbackFunc(
      () => {
        if (!isLottieReady && !shouldLoad) {
          // Only preload if we're under the concurrent load limit and not on a slow connection
          const nav = typeof navigator !== 'undefined' ? navigator as NavigatorWithConnection : undefined;
          const hasSaveData = nav?.connection?.saveData === true;
          
          if (
            activeLoads < MAX_CONCURRENT_LOADS && 
            !(isMobileDevice && hasSaveData)
          ) {
            // Prefetch the animation in the background
            fetch(optimizedSource())
              .then(() => {
                // Just cache the URL, the actual animation will be loaded when needed
                if (mountedRef.current) {
                  lottieCache.set(optimizedSource(), optimizedSource());
                }
              })
              .catch(() => {
                // Clear preload status on error
                preloadStatus.delete(optimizedSource());
              });
          } else {
            // Clear preload status if we're at capacity, so it can be tried again later
            preloadStatus.delete(optimizedSource());
          }
        }
      },
      { timeout: isMobileDevice ? 3000 : 2000 } // Longer timeout for mobile
    );
    
    return () => {
      cancelIdleCallbackFunc(idleCallback);
    };
  }, [optimizedSource, preload, isLottieReady, shouldLoad, mobileOptimized]);

  return { 
    isLottieReady,
    animationSource
  };
} 