"use client";

import { memo } from "react";
import SwissMotion from "../SwissMotion";
import { TechKeywordsProps } from "./types";
import { TECH_KEYWORDS } from "./constants";

/**
 * Displays a list of animated technology keywords with Swiss design style
 */
const TechKeywords = memo(function TechKeywords({ className = "" }: TechKeywordsProps) {
  return (
    <SwissMotion 
      type="stagger"
      delay={1.2}
      staggerChildren={0.08}
      className={`flex flex-wrap gap-2 text-xs ${className}`}
    >
      {TECH_KEYWORDS.map((tech) => (
        <SwissMotion
          key={tech}
          type="fade"
          whileHover="scale"
        >
          <span className="text-xs uppercase tracking-wider px-2 py-1 swiss-border">
            {tech}
          </span>
        </SwissMotion>
      ))}
    </SwissMotion>
  );
});

export default TechKeywords; 