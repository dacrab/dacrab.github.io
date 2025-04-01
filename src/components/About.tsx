"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import TextAnimation from "./TextAnimation";
import ScrollReveal from "./ScrollReveal";
import StaggerReveal from "./StaggerReveal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { fadeIn, staggerContainer, cardAnimation } from "../utils/animations";
import SectionBackground from "./SectionBackground";

interface Skill {
  name: string;
  icon: string;
  url: string;
}

// SkillCard component definition moved here before it's used
function SkillCard({ skill, index, className = "" }: { skill: Skill; index: number; className?: string }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if this is a white icon that needs special handling
  const isWhiteIcon = skill.name === "Next.js" || skill.name === "GitHub" || skill.icon.includes("FFFFFF");
  
  return (
    <motion.a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 group ${className}`}
      style={{
        borderColor: isHovered ? 'rgba(var(--accent-rgb), 0.5)' : 'rgba(var(--border-rgb), 0.3)',
      }}
      variants={cardAnimation(0.1 + (index * 0.03))}
      whileHover={{ 
        y: -8,
        boxShadow: "0 10px 25px -5px rgba(var(--accent-rgb), 0.2)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ y: 0 }}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-3 relative">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-accent/10 opacity-0 group-hover:opacity-100 blur-lg transition-all duration-300" />
        
        {/* Icon container with background for white icons */}
        <div className={`relative flex items-center justify-center ${isWhiteIcon ? 'p-1.5 icon-container rounded-full shadow-inner' : ''}`}>
          {/* Icon or fallback */}
          {!imageError ? (
            <img 
              src={skill.icon} 
              alt={`${skill.name} logo`}
              width={32} 
              height={32} 
              className={`w-8 h-8 object-contain transition-all duration-300 group-hover:scale-125 relative z-10 ${isWhiteIcon ? 'white-icon' : ''}`}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-accent/20 text-foreground rounded-full">
              {skill.name.slice(0, 2)}
            </div>
          )}
        </div>
        
        {/* Animated ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
      
      {/* Skill name with improved visibility */}
      <span className="text-sm font-medium text-center text-foreground/80 group-hover:text-accent transition-colors duration-300">
        {skill.name}
      </span>
    </motion.a>
  );
}

// Group skills by category
const skillsByCategory = {
  frontend: [
    {
      name: "Next.js",
      icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
      url: "https://nextjs.org/"
    },
    {
      name: "TypeScript",
      icon: "https://cdn.simpleicons.org/typescript/3178C6",
      url: "https://www.typescriptlang.org/"
    },
    {
      name: "JavaScript",
      icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      url: "https://tailwindcss.com/"
    },
    {
      name: "Framer Motion",
      icon: "https://cdn.simpleicons.org/framer/0055FF",
      url: "https://www.framer.com/motion/"
    }
  ],
  backend: [
    {
      name: "Supabase",
      icon: "https://cdn.simpleicons.org/supabase/3ECF8E",
      url: "https://supabase.io/"
    },
    {
      name: "Firebase",
      icon: "https://cdn.simpleicons.org/firebase/FFCA28",
      url: "https://firebase.google.com/"
    }
  ],
  tools: [
    {
      name: "Git",
      icon: "https://cdn.simpleicons.org/git/F05032",
      url: "https://git-scm.com/"
    },
    {
      name: "GitHub",
      icon: "https://cdn.simpleicons.org/github/FFFFFF",
      url: "https://github.com/"
    },
    {
      name: "VS Code",
      icon: "https://cdn.simpleicons.org/visualstudiocode/007ACC",
      url: "https://code.visualstudio.com/"
    },
    {
      name: "Unreal Engine",
      icon: "https://cdn.simpleicons.org/unrealengine/0E1128",
      url: "https://www.unrealengine.com/"
    },
    {
      name: "Docker",
      icon: "https://cdn.simpleicons.org/docker/2496ED",
      url: "https://www.docker.com/"
    },
    {
      name: "Vercel",
      icon: "https://cdn.simpleicons.org/vercel/000000",
      url: "https://vercel.com/"
    }
  ]
};

// For simplicity in the component, concatenate all skills
const skills: Skill[] = [
  ...skillsByCategory.frontend,
  ...skillsByCategory.backend,
  ...skillsByCategory.tools
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Transform values based on scroll
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["10%", "0%"]);
  
  // Animation for bio paragraphs using hook
  const bioAnimation = useScrollAnimation({
    direction: "up",
    distance: 30,
    threshold: 0.2,
    once: false
  });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);
  
  return (
    <section 
      id="about"
      ref={ref}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Tech-themed background for About section */}
      <SectionBackground 
        variant="tech" 
        intensity={0.7} 
        color="accent" 
        isInView={isInView}
      />
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading - Using ScrollReveal */}
        <ScrollReveal
          direction="up"
          className="mb-20 text-center"
          duration={0.6}
          distance={30}
        >
          <div className="mb-4">
            <TextAnimation 
              text="About Me" 
              variant="reveal" 
              className="text-3xl md:text-4xl font-bold inline-block"
              delay={0.2}
              duration={0.4}
            />
          </div>
          
          <div className="w-24 h-0.5 bg-accent mx-auto mb-6"></div>
          
          <TextAnimation 
            text="Passionate developer dedicated to crafting beautiful, functional digital experiences that combine technical excellence with creative problem-solving." 
            variant="split" 
            className="text-muted max-w-2xl mx-auto"
            delay={0.4}
            duration={0.3}
          />
        </ScrollReveal>
        
        {/* Abstract asymmetrical layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-8 relative">
          {/* Left column: Profile image and decorative elements */}
          <motion.div 
            className="lg:col-span-5 lg:col-start-1 relative"
            style={{ y: contentY }}
          >
            <div className="relative">
              {/* Profile container with geometric accents */}
              <div className="relative w-full max-w-md mx-auto lg:mx-0">
                {/* Abstract frame */}
                <motion.div 
                  className="absolute inset-0 border border-border/40 rounded-xl -m-3 z-0"
                  animate={isInView ? { 
                    borderColor: ['rgba(var(--accent-rgb), 0.1)', 'rgba(var(--accent-rgb), 0.3)', 'rgba(var(--accent-rgb), 0.1)'] 
                  } : {}}
                  transition={{ duration: 4, repeat: Infinity }}
                ></motion.div>
                
                {/* Actual profile image - replaced with Lottie animation */}
                <ScrollReveal
                  direction="left"
                  duration={0.7}
                  delay={0.1}
                  className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden relative z-10"
                >
                  <div className="aspect-square relative overflow-hidden flex items-center justify-center">
                    <div className="w-full h-full">
                      <DotLottieReact
                        src="https://lottie.host/ec2681d0-ab67-4f7d-a35a-c870c0a588aa/BVfwAmcRde.lottie"
                        loop
                        autoplay
                        className="w-full h-full"
                      />
                    </div>
                    
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-60"></div>
                    
                    {/* Semi-transparent grid pattern */}
                    <div className="absolute inset-0 grid-pattern-dots opacity-20"></div>
                  </div>
                </ScrollReveal>
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full border border-border"
                  initial={{ scale: 0 }}
                  animate={{ scale: isInView ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                ></motion.div>
                <motion.div 
                  className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-accent/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: isInView ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                ></motion.div>
              </div>
              
              {/* Quick stats or highlights - Using StaggerReveal */}
              <StaggerReveal
                className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0"
                duration={0.6}
                childDelay={0.3}
                staggerDelay={0.15}
                childClassName="h-full"
              >
                <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg p-4 animate-border-pulse">
                  <div className="text-accent text-xl font-bold">8+</div>
                  <div className="text-sm text-muted">Years Experience</div>
                </div>
                <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg p-4 animate-border-pulse" style={{ animationDelay: '1s' }}>
                  <div className="text-accent text-xl font-bold">50+</div>
                  <div className="text-sm text-muted">Projects Completed</div>
                </div>
              </StaggerReveal>
            </div>
          </motion.div>
          
          {/* Right column: Bio text and skills - Using our motion variants */}
          <motion.div 
            className="lg:col-span-7 lg:col-start-6"
            style={{ y: contentY }}
          >
            {/* Bio section using our useScrollAnimation hook */}
            <motion.div 
              ref={bioAnimation.ref}
              variants={staggerContainer(0.15)}
              initial="hidden"
              animate={bioAnimation.animate}
              className="space-y-6"
            >
              <motion.div variants={fadeIn("up", 0.1, 0.7)}>
                <h3 className="text-2xl font-bold mb-4">
                  Senior Web Developer with a passion for creating exceptional digital experiences
                </h3>
                <p className="text-muted">
                  With over 8 years of experience in web development, I specialize in building modern, responsive, and high-performance web applications. My approach combines technical excellence with creative problem-solving to deliver solutions that exceed expectations.
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn("up", 0.2, 0.7)}>
                <p className="text-muted">
                  I'm passionate about staying at the cutting edge of web technologies and continuously expanding my skills to deliver the best possible user experiences. My focus areas include frontend development with React and Next.js, building scalable backend services, and creating smooth, intuitive UI/UX designs.
                </p>
              </motion.div>
              
              {/* Skills section - Using our utility functions */}
              <motion.div variants={fadeIn("up", 0.3, 0.7)}>
                <h3 className="text-xl font-bold mb-6">
                  Technical Expertise
                </h3>
                
                <div className="space-y-8">
                  {/* Frontend */}
                  <div>
                    <h4 className="text-lg font-medium text-accent mb-4">Frontend Development</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {skillsByCategory.frontend.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} className="skill-card-bg" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Backend */}
                  <div>
                    <h4 className="text-lg font-medium text-accent mb-4">Backend & Database</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {skillsByCategory.backend.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} className="skill-card-bg" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Tools */}
                  <div>
                    <h4 className="text-lg font-medium text-accent mb-4">Tools & Platforms</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {skillsByCategory.tools.map((skill, index) => (
                        <SkillCard key={skill.name} skill={skill} index={index} className="skill-card-bg" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 