"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  variant?: "default" | "subtle" | "particles";
  color?: string;
  intensity?: number;
}

export default function AnimatedBackground({
  variant = "default",
  color = "accent",
  intensity = 1,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Particle animation effect
  useEffect(() => {
    if (variant !== "particles" || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000) * intensity;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get computed style from CSS variables
      const computedStyle = getComputedStyle(document.documentElement);
      const colorValue = computedStyle.getPropertyValue(`--${color}`).trim() || "#6366f1";
      
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(colorValue)}, ${particle.opacity})`;
        ctx.fill();
        
        // Connect particles within a certain distance
        connectParticles(particle, particles.slice(i));
      });
      
      requestAnimationFrame(drawParticles);
    };
    
    const connectParticles = (p1: any, particles: any[]) => {
      const proximityRadius = 150;
      
      particles.forEach((p2) => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < proximityRadius) {
          const computedStyle = getComputedStyle(document.documentElement);
          const colorValue = computedStyle.getPropertyValue(`--${color}`).trim() || "#6366f1";
          const opacity = 1 - distance / proximityRadius;
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${hexToRgb(colorValue)}, ${opacity * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    };
    
    // Hex to RGB converter for canvas colors
    const hexToRgb = (hex: string): string => {
      // Remove # if present
      hex = hex.replace('#', '');
      
      if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
      }
      
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `${r}, ${g}, ${b}`;
    };
    
    resize();
    window.addEventListener('resize', resize);
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [variant, color, intensity]);
  
  if (variant === "particles") {
    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
        style={{ mixBlendMode: "screen" }}
      />
    );
  }
  
  // Default and subtle variants use framer-motion
  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
      {variant === "default" && (
        <>
          <motion.div
            className={`absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-${color}/20 blur-3xl`}
            animate={{
              x: [0, 20, 0],
              y: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className={`absolute top-[60%] -right-[5%] w-[30%] h-[40%] rounded-full bg-${color}-light/15 blur-3xl`}
            animate={{
              x: [0, -20, 0],
              y: [0, -15, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className={`absolute top-[30%] left-[60%] w-[25%] h-[25%] rounded-full bg-${color}-dark/20 blur-3xl`}
            animate={{
              x: [0, 10, 0],
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </>
      )}
      
      {variant === "subtle" && (
        <>
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
              opacity: 0.1,
            }}
          />
          <motion.div
            className={`absolute top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-${color}/10 blur-3xl`}
            animate={{
              x: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className={`absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-${color}-light/5 blur-3xl`}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </>
      )}
    </div>
  );
} 