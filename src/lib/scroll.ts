import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { reduceMotion } from './motion';

if (!reduceMotion) gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/**
 * Lazily creates the shared Lenis smooth-scroll instance, wired to the GSAP
 * ticker and ScrollTrigger. Imported by Layout (which initializes it) and any
 * component that needs to pause or resume scrolling.
 *
 * Returns null when the user prefers reduced motion, so smooth scrolling is
 * never initialized.
 */
export function getLenis(): Lenis | null {
  if (reduceMotion) return null;
  if (!lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis!.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  return lenis;
}
