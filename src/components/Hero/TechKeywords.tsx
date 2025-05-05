"use client";

import { memo } from "react";
import Image from 'next/image';
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
      className={`flex flex-wrap gap-3 text-xs ${className}`}
    >
      {TECH_KEYWORDS.map((tech) => (
        <SwissMotion
          key={tech.name}
          type="fade"
          whileHover="scale"
        >
          <div className="flex items-center">
            <div className="relative mr-2">
              {/* Icon container with Swiss style border */}
              <div className="w-8 h-8 border border-[var(--border)] bg-[var(--card-secondary)] flex items-center justify-center p-1">
                <Image 
                  src={tech.icon} 
                  alt={tech.name} 
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              {/* Small accent square in corner - Swiss style */}
              <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-[var(--accent)]" />
            </div>
            <span className="text-xs uppercase tracking-wider px-1.5 py-1 swiss-border whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        </SwissMotion>
      ))}
    </SwissMotion>
  );
});

export default TechKeywords; 