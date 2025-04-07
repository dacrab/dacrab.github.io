"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

// Cache for preloaded Lottie animations to avoid redundant fetches
const lottieCache = new Map<string, string>();

// Initialize preloading status tracker
const preloadStatus = new Map<string, boolean>();

// Track active animations to limit concurrent loads
let activeLoads = 0;
const MAX_CONCURRENT_LOADS = 2;

/**
 * Custom hook to lazily load Lottie animations to reduce initial page load
 * @param shouldLoad Condition to start loading the animation (e.g., based on component visibility)
 * @param source Path to the Lottie animation file
 * @param preload Whether to preload the animation when idle
 * @returns Object with a boolean indicating if the animation is ready to be displayed and the animation source
 */
export function useLazyLottie(shouldLoad: boolean, source: string, preload: boolean = true) {
  const [isLottieReady, setIsLottieReady] = useState(false);
  const [animationSource, setAnimationSource] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);
  
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
    if (lottieCache.has(source)) {
      if (mountedRef.current) {
        setAnimationSource(lottieCache.get(source) || null);
        setIsLottieReady(true);
      }
      return;
    }
    
    // Check if we should queue this load due to too many concurrent loads
    if (activeLoads >= MAX_CONCURRENT_LOADS) {
      timerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          loadLottieAnimation();
        }
      }, 300 * (activeLoads - MAX_CONCURRENT_LOADS + 1)); // Progressive backoff
      return;
    }
    
    // Start loading with a small delay to prioritize critical rendering
    activeLoads++;
    
    timerRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setAnimationSource(source);
        setIsLottieReady(true);
        
        // Cache the animation source
        lottieCache.set(source, source);
      }
      
      // Decrement active loads
      activeLoads = Math.max(0, activeLoads - 1);
    }, 300);
  }, [source]);
  
  // Load the animation when component should load
  useEffect(() => {
    if (!shouldLoad || isLottieReady) return;
    
    loadLottieAnimation();
    
    return () => {
      // Clean up the timer if component unmounts before loading completes
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [shouldLoad, source, isLottieReady, loadLottieAnimation]);
  
  // Preload animations during idle time for better perceived performance
  useEffect(() => {
    // Skip if already loaded, already preloading, or preload disabled
    if (isLottieReady || !preload || preloadStatus.get(source)) return;
    
    // Mark as being preloaded to avoid duplicate work
    preloadStatus.set(source, true);
    
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
          // Only preload if we're under the concurrent load limit
          if (activeLoads < MAX_CONCURRENT_LOADS) {
            // Prefetch the animation in the background
            fetch(source)
              .then(() => {
                // Just cache the URL, the actual animation will be loaded when needed
                if (mountedRef.current) {
                  lottieCache.set(source, source);
                }
              })
              .catch(() => {
                // Clear preload status on error
                preloadStatus.delete(source);
              });
          } else {
            // Clear preload status if we're at capacity, so it can be tried again later
            preloadStatus.delete(source);
          }
        }
      },
      { timeout: 2000 } // 2 second timeout
    );
    
    return () => {
      cancelIdleCallbackFunc(idleCallback);
    };
  }, [source, preload, isLottieReady, shouldLoad]);

  return { 
    isLottieReady,
    animationSource
  };
} 