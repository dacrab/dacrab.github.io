import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface RevealStep {
  targets: gsap.TweenTarget;
  /** Hidden state, applied immediately via `gsap.set`. */
  set: gsap.TweenVars;
  /** Reveal tween vars: opacity, y, scale, duration, ease, stagger... */
  to: gsap.TweenVars;
  /** Timeline position for this step (e.g. `'-=0.5'`). */
  at?: gsap.Position;
}

export interface RevealOptions {
  /** ScrollTrigger config. Omit for a load-time reveal. */
  scrollTrigger?: {
    trigger: gsap.DOMTarget;
    start: string;
    once?: boolean;
  };
  /** Delay in seconds before the reveal starts (load-time reveals only). */
  delay?: number;
  /** Shared timeline defaults (e.g. `ease`). Per-step vars take priority. */
  defaults?: gsap.TweenVars;
}

/**
 * Shared reveal animation: hides targets immediately, then animates them in
 * — either on scroll (`scrollTrigger`) or after `delay` on page load.
 * Replaces the per-component gsap.set(...) + gsap.to(...) boilerplate while
 * keeping identical triggers, staggers, and easing.
 */
export function reveal(
  steps: RevealStep[],
  { scrollTrigger, delay = 0, defaults }: RevealOptions = {},
): gsap.core.Timeline {
  const tl = gsap.timeline({
    delay,
    defaults,
    ...(scrollTrigger && {
      scrollTrigger: { once: true, ...scrollTrigger },
    }),
  });
  for (const { targets, set, to, at } of steps) {
    gsap.set(targets, set);
    tl.to(targets, to, at);
  }
  return tl;
}

/**
 * Per-element variant for heterogeneous targets (e.g. rows that each reveal
 * as they enter the viewport). Each element gets its own scrollTrigger.
 * Equivalent to `gsap.fromTo(el, set, to)` per element.
 */
export function revealEach(
  targets: gsap.DOMTarget,
  { set, to, scrollTrigger }: {
    set: gsap.TweenVars;
    to: gsap.TweenVars;
    /** Per-element trigger is applied automatically; only `start`/`once` are configurable. */
    scrollTrigger: Omit<NonNullable<RevealOptions['scrollTrigger']>, 'trigger'>;
  },
): gsap.core.Tween[] {
  const els: Element[] =
    typeof targets === 'string' ? [...document.querySelectorAll(targets)] : [targets as Element];
  return els.map((el) =>
    gsap.fromTo(el, set, {
      ...to,
      scrollTrigger: { once: true, ...scrollTrigger, trigger: el },
    }),
  );
}
