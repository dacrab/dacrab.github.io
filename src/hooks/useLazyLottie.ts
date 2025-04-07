"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

// Cache for preloaded Lottie animations to avoid redundant fetches
const lottieCache = new Map<string, string>();

// Initialize preloading status tracker
const preloadStatus = new Map<string, boolean>();

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
  
  // Function to load the animation resource, wrapped in useCallback
  const loadLottieAnimation = useCallback(() => {
    // Check if already cached
    if (lottieCache.has(source)) {
      setAnimationSource(lottieCache.get(source) || null);
      setIsLottieReady(true);
      return;
    }
    
    // Start loading with a small delay to prioritize critical rendering
    timerRef.current = setTimeout(() => {
      setAnimationSource(source);
      setIsLottieReady(true);
      
      // Cache the animation source
      lottieCache.set(source, source);
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
          // Prefetch the animation in the background
          fetch(source)
            .then(() => {
              // Just cache the URL, the actual animation will be loaded when needed
              lottieCache.set(source, source);
            })
            .catch(() => {
              // Clear preload status on error
              preloadStatus.delete(source);
            });
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