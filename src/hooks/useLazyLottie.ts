"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

// Simple cache for loaded Lottie animation URLs
const lottieCache = new Map<string, string>();
const preloadStatus = new Map<string, boolean>();

let activeLoads = 0;
const MAX_CONCURRENT_LOADS = 2;

// Mobile detection (user agent + touch points)
const isMobileDevice = typeof navigator !== 'undefined' && (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  (navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
);

type NetworkInfo = { saveData?: boolean; effectiveType?: string; };
type NavWithConn = Navigator & { connection?: NetworkInfo; };

/**
 * Lazily load a Lottie animation, with optional preloading and mobile optimizations.
 */
export function useLazyLottie(
  shouldLoad: boolean,
  source: string,
  preload: boolean = true,
  mobileOptimized: boolean = true
) {
  const [isLottieReady, setIsLottieReady] = useState(false);
  const [animationSource, setAnimationSource] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  // Compute the possibly optimized source URL
  const optimizedSource = useCallback(() => {
    if (mobileOptimized && isMobileDevice && source.includes('lottie.host')) {
      return source.includes('?') ? `${source}&quality=low` : `${source}?quality=low`;
    }
    return source;
  }, [source, mobileOptimized]);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Load the animation (with concurrency and mobile/network checks)
  const loadLottieAnimation = useCallback(() => {
    const src = optimizedSource();
    if (lottieCache.has(src)) {
      if (mountedRef.current) {
        setAnimationSource(lottieCache.get(src)!);
        setIsLottieReady(true);
      }
      return;
    }

    const mobileDelay = isMobileDevice && mobileOptimized ? 500 : 300;

    if (activeLoads >= MAX_CONCURRENT_LOADS) {
      timerRef.current = setTimeout(loadLottieAnimation, mobileDelay * (activeLoads - MAX_CONCURRENT_LOADS + 1));
      return;
    }

    activeLoads++;
    timerRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setAnimationSource(src);
        setIsLottieReady(true);
        lottieCache.set(src, src);
      }
      activeLoads = Math.max(0, activeLoads - 1);
    }, mobileDelay);
  }, [optimizedSource, mobileOptimized]);

  // Trigger load when shouldLoad becomes true
  useEffect(() => {
    if (!shouldLoad || isLottieReady) return;

    // On mobile, skip if saveData or 2g
    if (isMobileDevice && mobileOptimized && typeof navigator !== 'undefined') {
      const nav = navigator as NavWithConn;
      const conn = nav.connection;
      if (conn && (conn.saveData || (conn.effectiveType && conn.effectiveType.includes('2g')))) {
        return;
      }
    }

    loadLottieAnimation();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [shouldLoad, isLottieReady, loadLottieAnimation, mobileOptimized]);

  // Preload during idle time if enabled and not already loaded/preloading
  useEffect(() => {
    const src = optimizedSource();
    if (isLottieReady || !preload || preloadStatus.get(src) || (isMobileDevice && mobileOptimized)) return;

    preloadStatus.set(src, true);

    const requestIdle: (cb: () => void, options?: { timeout?: number }) => number =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (window as unknown as { requestIdleCallback: (cb: IdleRequestCallback, options?: { timeout?: number }) => number }).requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 1);

    const cancelIdle: (id: number) => void =
      typeof window !== 'undefined' && 'cancelIdleCallback' in window
        ? (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback
        : (id: number) => clearTimeout(id);

    const idleId = requestIdle(() => {
      if (!isLottieReady && !shouldLoad) {
        const nav = typeof navigator !== 'undefined' ? (navigator as NavWithConn) : undefined;
        const hasSaveData = nav?.connection?.saveData === true;
        if (activeLoads < MAX_CONCURRENT_LOADS && !(isMobileDevice && hasSaveData)) {
          fetch(src)
            .then(() => { if (mountedRef.current) lottieCache.set(src, src); })
            .catch(() => { preloadStatus.delete(src); });
        } else {
          preloadStatus.delete(src);
        }
      }
    }, { timeout: isMobileDevice ? 3000 : 2000 });

    return () => { cancelIdle(idleId); };
  }, [optimizedSource, preload, isLottieReady, shouldLoad, mobileOptimized]);

  return { isLottieReady, animationSource };
}