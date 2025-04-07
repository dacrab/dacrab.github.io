import { useState, useEffect } from 'react';

/**
 * A hook that detects if the current device is a mobile device
 * @param breakpoint - Optional custom breakpoint (default: 768px)
 * @returns boolean indicating if the current device is mobile
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Handle SSR - only run on the client
    if (typeof window === 'undefined') return;
    
    // Check initial state
    const checkMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent;
      
      // Check width and common mobile userAgent patterns
      const isMobileWidth = width < breakpoint;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      setIsMobile(isMobileWidth || isMobileDevice);
    };

    // Check immediately
    checkMobile();
    
    // Simple debounce function for resize events
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(checkMobile, 150); // Debounce for 150ms
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, [breakpoint]);

  return isMobile;
} 