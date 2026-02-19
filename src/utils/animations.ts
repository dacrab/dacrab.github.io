import gsap from 'gsap';

// True on touch/stylus-only devices — used to skip parallax and hover animations.
export const isMobile = window.matchMedia('(hover: none)').matches;

export const DURATION = {
  FAST: 0.15,
  DEFAULT: 0.3,
  MEDIUM: 0.4,
  SLOW: 0.6,
  SLOWER: 0.8,
} as const;

export const EASE = {
  DEFAULT: 'power2.out',
  SMOOTH: 'power3.out',
  STRONG: 'power4.out',
  STRONG_IN_OUT: 'power4.inOut',
  EXPO: 'expo.out',
  EXPO_IN: 'expo.in',
  EXPO_IN_OUT: 'expo.inOut',
  BACK: 'back.out(1.7)',
  BACK_MILD: 'back.out(1)',
} as const;

export const COLOR = {
  WHITE: '#ffffff',
  ZINC_400: '#a1a1aa',
  ZINC_800: '#27272a',
  ZINC_900: '#18181b',
} as const;

interface HoverTarget {
  target: Element | string;
  enter: gsap.TweenVars;
  leave: gsap.TweenVars;
}

export function addHoverAnimation(trigger: Element, targets: HoverTarget[]): void {
  trigger.addEventListener('mouseenter', () => {
    for (const { target, enter } of targets) gsap.to(target, { ...enter, overwrite: 'auto' });
  });
  trigger.addEventListener('mouseleave', () => {
    for (const { target, leave } of targets) gsap.to(target, { ...leave, overwrite: 'auto' });
  });
}
