"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import TextAnimation from "./TextAnimation";
import ParallaxLayer from "./ParallaxLayer";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ScrollReveal from "./ScrollReveal";
import SectionBackground from "./SectionBackground";

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

interface TimelineEntryProps {
  position: 'left' | 'right';
  date: string;
  company: string;
  title: string;
  description: string[];
  technologies: string[];
  isInView: boolean;
  index: number;
}

const TimelineEntry = ({ 
  position, 
  date, 
  company, 
  title, 
  description, 
  technologies, 
  isInView, 
  index 
}: TimelineEntryProps) => {
  return (
    <div className={`relative flex flex-col md:flex-row items-start gap-x-8`}>
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-center z-10">
        <motion.div 
          className="w-8 h-8 rounded-full bg-card/40 backdrop-blur-sm border border-accent/30 flex items-center justify-center animate-border-pulse"
          style={{ animationDelay: `${index * 0.7}s` }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-3 h-3 rounded-full bg-accent"></div>
        </motion.div>

        {/* Time period indicator */}
        <motion.div
          className="mt-3 text-xs text-accent font-mono bg-card/20 backdrop-blur-sm border border-accent/10 rounded-full px-3 py-1"
        >
          {date}
        </motion.div>
      </div>

      {/* Content card */}
      <div className={`pl-16 md:pl-0 ${position === 'left' ? 'md:pr-16 md:text-right md:self-end md:items-end md:w-1/2' : 'md:pl-16 md:w-1/2 md:ml-auto'}`}>
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
          className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-6 hover:border-accent/20 transition-colors duration-300 relative overflow-hidden"
        >
          {/* Background decoration for cards */}
          <div className="absolute -z-10 inset-0 overflow-hidden">
            <div className={`absolute ${position === 'left' ? '-top-20 -right-20' : '-bottom-20 -left-20'} w-40 h-40 rounded-full bg-accent/5 blur-3xl`}></div>
            <div className="absolute inset-0 grid-pattern-dots opacity-10"></div>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-gradient-animated mb-1">{title}</h3>
            <p className="text-accent/90">{company}</p>
          </div>
          
          <ul className={`list-none space-y-2 mb-4 text-muted ${position === 'left' ? 'md:ml-auto' : ''}`}>
            {description.map((item, i) => (
              <li 
                key={i}
                className="text-sm relative pl-5 md:pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent/70"
              >
                {item}
              </li>
            ))}
          </ul>
          
          <div className={`flex flex-wrap gap-2 mt-4 ${position === 'left' ? 'md:justify-end' : ''}`}>
            {technologies.map((skill) => (
              <motion.span
                key={skill}
                className="px-2 py-1 bg-card/20 backdrop-blur-sm border border-border/30 rounded-full text-xs"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(var(--accent-rgb), 0.1)",
                  color: "var(--accent)"
                }}
                transition={{ duration: 0.2 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    period: "2021 - Present",
    description: [
      "Led a team of 5 developers in building a complex SaaS platform using Next.js and TypeScript",
      "Improved application performance by 45% through code optimization and lazy loading techniques",
      "Implemented CI/CD pipelines that reduced deployment time by 60%",
      "Mentored junior developers and conducted code reviews to maintain high code quality"
    ],
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "CI/CD", "Team Leadership"]
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Digital Innovations",
    period: "2018 - 2021",
    description: [
      "Developed responsive web applications for clients in finance and healthcare sectors",
      "Created reusable component libraries that improved development efficiency by 35%",
      "Collaborated with UX/UI designers to implement pixel-perfect interfaces",
      "Integrated third-party APIs and services into web applications"
    ],
    skills: ["React", "JavaScript", "SCSS", "RESTful APIs", "Responsive Design"]
  },
  {
    id: 3,
    role: "Web Developer",
    company: "Creative Solutions Agency",
    period: "2016 - 2018",
    description: [
      "Built and maintained websites for clients across various industries",
      "Implemented responsive designs that worked across all device sizes",
      "Optimized website performance and SEO",
      "Collaborated with creative teams to deliver projects on tight deadlines"
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "WordPress", "SEO"]
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const timelineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const timelineHeight = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["20px", "0px"]);
  
  return (
    <section 
      id="experience" 
      ref={ref}
      className="py-20 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Grid-style background with tech theme */}
      <SectionBackground 
        variant="grid" 
        intensity={0.8} 
        color="gradient-2" 
        isInView={isInView}
      />
      
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal
          direction="up"
          className="mb-16 text-center"
          duration={0.6}
          distance={30}
        >
          <div className="mb-4">
            <TextAnimation 
              text="Professional Experience" 
              variant="reveal" 
              className="text-3xl md:text-4xl font-bold inline-block"
              delay={0.2}
              duration={0.4}
            />
          </div>
          
          <div className="w-24 h-0.5 bg-accent mx-auto mb-6"></div>
          
          <TextAnimation 
            text="A chronological view of my professional journey in web development"
            variant="split" 
            className="text-muted max-w-2xl mx-auto"
            delay={0.4}
            duration={0.3}
          />
        </ScrollReveal>

        {/* Two-column layout - Career visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 mb-16">
          {/* Left column: Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full flex flex-col justify-center order-2 lg:order-1"
          >
            <div className="relative bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden p-4 md:p-6">
              {/* Visual title */}
              <div className="mb-4 text-center">
                <h3 className="text-xl font-bold text-gradient-animated">Career Visualization</h3>
                <p className="text-sm text-muted mt-1">Interactive representation of skills growth</p>
              </div>
              
              {/* Lottie animation with enhanced styling */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <DotLottieReact
                    src="https://lottie.host/bf490252-846e-457c-a7db-c2dcf327442e/81l4tBdw6P.lottie"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </motion.div>
                
                {/* Subtle glow effect behind animation */}
                <div className="absolute inset-0 -z-10 bg-accent/5 blur-xl rounded-full transform scale-75"></div>
              </div>
              
              {/* Experience stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6 grid grid-cols-3 gap-3 text-center"
              >
                <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg py-3 px-2">
                  <div className="text-accent text-2xl font-bold">8+</div>
                  <div className="text-xs text-muted">Years</div>
                </div>
                <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg py-3 px-2">
                  <div className="text-accent text-2xl font-bold">20+</div>
                  <div className="text-xs text-muted">Projects</div>
                </div>
                <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg py-3 px-2">
                  <div className="text-accent text-2xl font-bold">15+</div>
                  <div className="text-xs text-muted">Skills</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right column: Key skill highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full h-full flex flex-col justify-center order-1 lg:order-2"
          >
            <div className="bg-card/10 backdrop-blur-sm border border-border/40 rounded-xl overflow-hidden p-6 md:p-8">
              <h3 className="text-xl font-bold text-gradient-animated mb-4">Key Expertise</h3>
              
              {/* Skill progression bars */}
              <div className="space-y-6">
                {[
                  { name: "Frontend Development", percentage: 95 },
                  { name: "UI/UX Design Implementation", percentage: 90 },
                  { name: "Performance Optimization", percentage: 85 },
                  { name: "Team Leadership", percentage: 80 },
                  { name: "Backend Integration", percentage: 75 }
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-accent">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-card/30 rounded-full h-2.5 overflow-hidden">
                      <motion.div 
                        className="bg-accent h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: isInView ? `${skill.percentage}%` : 0 }}
                        transition={{ duration: 1, delay: 0.7 + (index * 0.1) }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Professional approach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-6 pt-6 border-t border-border/30"
              >
                <p className="text-sm text-muted">
                  My career trajectory reflects a continuous commitment to technical excellence, collaborative innovation, 
                  and delivering exceptional user experiences. Specializing in modern frontend architecture with React and 
                  Next.js, I combine creative problem-solving with meticulous attention to detail.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="my-12 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl font-bold mb-2"
          >
            Career Timeline
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-0.5 bg-accent/70 mx-auto mb-4"
          />
        </div>

        {/* Timeline with cards - implement scroll reveal for the timeline container */}
        <div className="relative max-w-5xl mx-auto mt-24">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/50 z-0"></div>
          
          {/* Timeline entries */}
          <div className="relative z-10">
            {experiences.map((exp, index) => (
              <ScrollReveal
                key={exp.id}
                direction={index % 2 === 0 ? "left" : "right"}
                className="mb-20 relative"
                duration={0.7}
                delay={0.1 * index}
                distance={50}
                threshold={0.1}
              >
                <TimelineEntry
                  position={index % 2 === 0 ? 'left' : 'right'}
                  date={exp.period}
                  company={exp.company}
                  title={exp.role}
                  description={exp.description}
                  technologies={exp.skills}
                  isInView={isInView}
                  index={index}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 