"use client";

import { memo } from "react";
import SwissMotion from "../SwissMotion";
import ShapeAnimation from "../ShapeAnimation";
import ParallaxLayer from "../ParallaxLayer";
import { BackgroundElementsProps } from "./types";

/**
 * Animated background elements with Swiss design style
 * Renders different sets of elements based on device type
 */
const BackgroundElements = memo(function BackgroundElements({ isMobile }: BackgroundElementsProps) {
  // Render fewer and simpler elements on mobile
  if (isMobile) {
    return (
      <>
        <SwissMotion
          type="reveal"
          delay={0.3}
          duration={0.8}
          className="absolute top-16 right-0 w-1/3 h-1/3 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-[200%] h-[2px] bg-[var(--accent)] origin-top-left rotate-45 transform -translate-x-1/4"></div>
        </SwissMotion>

        <ParallaxLayer speed={0.3} direction="up" className="absolute bottom-16 left-0 -z-10">
          <ShapeAnimation 
            type="square" 
            color="var(--accent-secondary)" 
            size={80} 
            variant="float"
            delay={0.5}
            duration={1.8}
            loop={true}
          />
        </ParallaxLayer>
        
        <ParallaxLayer speed={0.25} direction="left" className="absolute top-24 left-1/4 -z-10">
          <ShapeAnimation 
            type="triangle" 
            color="var(--accent)" 
            size={40} 
            variant="rotate"
            delay={0.3}
            duration={2.5}
            loop={true}
          />
        </ParallaxLayer>
        
        <ParallaxLayer speed={0.35} direction="right" className="absolute top-32 right-8 -z-10">
          <ShapeAnimation 
            type="circle" 
            color="var(--accent-tertiary)" 
            size={60} 
            variant="pulse"
            delay={0.7}
            duration={2.0}
            loop={true}
          />
        </ParallaxLayer>

        <ParallaxLayer speed={0.4} direction="right" className="absolute bottom-40 right-5 -z-10">
          <ShapeAnimation 
            type="diagonal" 
            color="var(--accent-secondary)" 
            size={50} 
            variant="draw"
            delay={0.9}
            duration={1.0}
            loop={true}
          />
        </ParallaxLayer>
      </>
    );
  }

  return (
    <>
      {/* Animated Swiss-style diagonal line */}
      <SwissMotion
        type="reveal"
        delay={0.3}
        duration={1.2}
        className="absolute top-0 right-0 w-1/2 h-1/2 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-[var(--accent)] origin-top-left rotate-45 transform -translate-x-1/4"></div>
      </SwissMotion>

      {/* Dynamic accent shapes */}
      <ParallaxLayer speed={0.2} direction="up" className="absolute bottom-16 left-16 -z-10">
        <ShapeAnimation 
          type="square" 
          color="var(--accent-secondary)" 
          size={160} 
          variant="float"
          delay={0.5}
          loop={true}
        />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.3} direction="down" className="absolute top-32 right-32 -z-10">
        <ShapeAnimation 
          type="circle" 
          color="var(--accent-tertiary)" 
          size={96} 
          variant="pulse"
          delay={0.7}
          loop={true}
        />
      </ParallaxLayer>
      
      {/* Additional energetic shapes */}
      <ParallaxLayer speed={0.15} direction="left" className="absolute top-40 left-1/4 -z-10">
        <ShapeAnimation 
          type="triangle" 
          color="var(--accent)" 
          size={60} 
          variant="rotate"
          delay={0.3}
          duration={3}
          loop={true}
        />
      </ParallaxLayer>
      
      <ParallaxLayer speed={0.25} direction="right" className="absolute bottom-40 right-1/3 -z-10">
        <ShapeAnimation 
          type="diagonal" 
          color="var(--accent-secondary)" 
          size={80} 
          variant="draw"
          delay={0.9}
          duration={1.2}
          loop={true}
        />
      </ParallaxLayer>
    </>
  );
});

export default BackgroundElements; 