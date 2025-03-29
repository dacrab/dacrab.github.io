"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import TextAnimation from "./TextAnimation";
import ParallaxLayer from "./ParallaxLayer";

const skills = [
  "Next.js", "React", "TypeScript", "JavaScript", 
  "Tailwind CSS", "Node.js", "GraphQL", "REST API",
  "Responsive Design", "UX/UI", "Git", "CI/CD",
  "Performance Optimization", "SEO", "Accessibility", "Testing"
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
  const gridOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.05, 0.05, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["10%", "0%"]);
  
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
      {/* Abstract background */}
      <div className="absolute inset-0 -z-10">
        {/* Grid pattern background */}
        <motion.div 
          className="absolute inset-0 grid-pattern-lines"
          style={{ opacity: gridOpacity }}
        />
        
        {/* Abstract decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="deco-circle absolute top-[15%] right-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px]"
            animate={isInView ? {
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            } : {}}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="deco-circle absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px]"
            animate={isInView ? {
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.2, 0.1],
            } : {}}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        {/* Diagonal lines for abstract design */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-[20%] left-0 w-full h-px bg-border/20"
            style={{ 
              transform: useTransform(
                scrollYProgress,
                [0, 1],
                ["rotate(-1deg) translateY(0px)", "rotate(-1deg) translateY(50px)"]
              )
            }}
          />
          <motion.div
            className="absolute top-[60%] left-0 w-full h-px bg-border/20"
            style={{ 
              transform: useTransform(
                scrollYProgress,
                [0, 1],
                ["rotate(1deg) translateY(0px)", "rotate(1deg) translateY(-30px)"]
              )
            }}
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
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
        </motion.div>
        
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
                <motion.div 
                  className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden relative z-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
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
                </motion.div>
                
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
              
              {/* Quick stats or highlights */}
              <motion.div 
                className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg p-4 animate-border-pulse">
                  <div className="text-accent text-xl font-bold">8+</div>
                  <div className="text-sm text-muted">Years Experience</div>
                </div>
                <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg p-4 animate-border-pulse" style={{ animationDelay: '1s' }}>
                  <div className="text-accent text-xl font-bold">50+</div>
                  <div className="text-sm text-muted">Projects Completed</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right column: Bio text and skills */}
          <motion.div 
            className="lg:col-span-7 lg:col-start-6"
            style={{ y: contentY }}
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
              initial="hidden"
              animate={controls}
              className="space-y-6"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } }
                }}
              >
                <h3 className="text-2xl font-bold mb-4">
                  Senior Web Developer with a passion for creating exceptional digital experiences
                </h3>
                <p className="text-muted">
                  With over 8 years of experience in web development, I specialize in building modern, responsive, and high-performance web applications. My approach combines technical excellence with creative problem-solving to deliver solutions that exceed expectations.
                </p>
              </motion.div>
              
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } }
                }}
              >
                <p className="text-muted">
                  I'm passionate about staying at the cutting edge of web technologies and continuously expanding my skills to deliver the best possible user experiences. My focus areas include frontend development with React and Next.js, building scalable backend services, and creating smooth, intuitive UI/UX designs.
                </p>
              </motion.div>
              
              {/* Skills section with abstract layout */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } }
                }}
                className="pt-6"
              >
                <h4 className="text-lg font-semibold mb-6 flex items-center">
                  <span className="mr-3">Skills & Expertise</span>
                  <span className="deco-line flex-1"></span>
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {skills.map((skill, i) => (
                    <motion.div 
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: isInView ? 1 : 0, 
                        y: isInView ? 0 : 10 
                      }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.5 + (i * 0.05)
                      }}
                      className="relative"
                    >
                      <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg py-2 px-3 text-sm text-center">
                        {skill}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 