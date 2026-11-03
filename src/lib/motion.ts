/**
 * Evaluated once in the browser. Motion features import this instead of
 * calling matchMedia individually so every animation honours the same
 * user preference.
 */
export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
