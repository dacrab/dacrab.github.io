"use client";

import { memo } from "react";
import SwissMotion from "../../SwissMotion";

/**
 * Accent borders for the visual grid with Swiss design style
 */
const AccentBorders = memo(function AccentBorders() {
  return (
    <>
      <SwissMotion type="reveal" delay={0.6} duration={0.4}>
        <div className="absolute left-0 top-0 w-full h-2 bg-[var(--accent)]"></div>
      </SwissMotion>
      <SwissMotion type="reveal" delay={0.8} duration={0.4}>
        <div className="absolute right-0 top-0 w-2 h-full bg-[var(--accent-secondary)]"></div>
      </SwissMotion>
      <SwissMotion type="fade" delay={1.2} duration={0.5}>
        <div className="absolute right-1/3 bottom-1/3 w-1/4 h-1/4 bg-[var(--accent-tertiary)]"></div>
      </SwissMotion>
    </>
  );
});

export default AccentBorders; 