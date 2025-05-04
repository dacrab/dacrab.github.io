"use client";

import { memo } from "react";
import SwissMotion from "../SwissMotion";
import AccentBorders from "./visual/AccentBorders";
import GridCanvas from "./visual/GridCanvas";
import { ANIMATION } from "./constants";

/**
 * Visual Swiss design grid display for the right side of the hero section
 */
const HeroVisual = memo(function HeroVisual() {
  return (
    <div className="swiss-asymmetric-right flex items-center justify-center relative">
      <SwissMotion
        type="scale"
        delay={0.5}
        duration={ANIMATION.duration.medium}
        className="relative"
      >
        {/* Swiss style grid pattern */}
        <div className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 swiss-grid-pattern relative">
          {/* Accent shapes for Swiss style */}
          <AccentBorders />
          
          {/* Dynamic Swiss-style visual elements */}
          <GridCanvas />
        </div>
      </SwissMotion>
    </div>
  );
});

export default HeroVisual; 