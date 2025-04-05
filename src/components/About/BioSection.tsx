import { motion, MotionValue, AnimationControls } from "framer-motion";
import { SKILLS_BY_CATEGORY } from "./types";
import { useEffect, useState } from "react";
import Image from "next/image";

interface BioSectionProps {
  contentY: MotionValue<number>; 
  bioRef: React.RefObject<HTMLDivElement>; 
  bioAnimate: AnimationControls; 
}

// Animation variants
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeIn = (delay: number) => ({
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.7
    }
  }
});

const cardAnimation = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: "easeOut"
    }
  }
});

// Highlighted keyword component
const KeywordHighlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-accent font-medium relative group">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-[0.12em] bg-accent/20 rounded-full transform origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
  </span>
);

export default function BioSection({ contentY, bioRef, bioAnimate }: BioSectionProps) {
  // Dynamic age calculation
  const [age, setAge] = useState<number>(0);
  
  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date('2004-05-25');
      const today = new Date();
      
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge);
    };
    
    calculateAge();
    return () => {}; // No cleanup needed for a one-time calculation
  }, []);
  
  // Render a skill category row
  const renderSkillCategory = (category: keyof typeof SKILLS_BY_CATEGORY, label: string) => (
    <div className="flex items-center gap-2">
      <span className="text-accent text-sm font-medium bg-accent/5 px-2 py-1 rounded-md border border-accent/10 w-28 flex-shrink-0">{label}:</span>
      <div className="flex flex-wrap gap-2">
        {SKILLS_BY_CATEGORY[category].map((skill, index) => (
          <div key={skill.name} className="inline-flex">
            <motion.a
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 py-1 px-2 rounded-md bg-card/50 border border-border/30 hover:border-accent/30 transition-all duration-300 group"
              variants={cardAnimation(0.1 + (index * 0.02))}
              whileHover={{ y: -2, boxShadow: "0 4px 10px -2px rgba(var(--accent-rgb), 0.15)" }}
            >
              <Image 
                src={skill.icon} 
                alt={`${skill.name} logo`}
                width={18} 
                height={18} 
                className="w-4 h-4 object-contain transition-all duration-300 group-hover:scale-110"
              />
              <span className="text-xs font-medium group-hover:text-accent transition-colors duration-300">{skill.name}</span>
            </motion.a>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <motion.div 
      className="lg:col-span-7 lg:col-start-6"
      style={{ y: contentY }}
    >
      <motion.div 
        ref={bioRef}
        variants={staggerContainer}
        initial="hidden"
        animate={bioAnimate}
        className="space-y-8"
      >
        <motion.div 
          variants={fadeIn(0.1)}
          className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-md"
        >
          <h3 className="text-2xl font-bold mb-4 relative inline-block">
            <KeywordHighlight>Junior Web Developer</KeywordHighlight> 
            <span className="ml-1">with a passion for creating exceptional digital experiences</span>
            <span className="absolute -bottom-1 left-0 h-1 w-24 bg-accent/10 rounded-sm"></span>
          </h3>
          <p className="text-muted leading-relaxed">
            Hello! I&apos;m <KeywordHighlight>Vaggelis Kavouras</KeywordHighlight>, a {age}-year-old developer from <KeywordHighlight>Thessaloniki, Greece</KeywordHighlight>. With about <KeywordHighlight>1 year of experience</KeywordHighlight> in web development, I&apos;m focused on building modern, responsive, and high-performance web applications. My approach combines technical knowledge with creative problem-solving to deliver effective solutions.
          </p>
        </motion.div>
        
        <motion.div 
          variants={fadeIn(0.2)}
          className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-md"
        >
          <p className="text-muted leading-relaxed">
            I&apos;m passionate about staying at the cutting edge of <KeywordHighlight>web technologies</KeywordHighlight> and continuously expanding my skills to deliver the best possible user experiences. My focus areas include <KeywordHighlight>frontend development</KeywordHighlight> with <KeywordHighlight>React</KeywordHighlight> and <KeywordHighlight>Next.js</KeywordHighlight>, learning about scalable backend services, and creating smooth, intuitive <KeywordHighlight>UI/UX designs</KeywordHighlight>.
          </p>
        </motion.div>
        
        <motion.div 
          variants={fadeIn(0.3)}
          className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-md"
        >
          <h3 className="text-xl font-bold mb-4 relative inline-block">
            Technical Expertise
            <span className="absolute -bottom-1 left-0 h-1 w-16 bg-accent/10 rounded-sm"></span>
          </h3>
          
          <div className="space-y-3">
            {renderSkillCategory('frontend', 'Frontend')}
            {renderSkillCategory('backend', 'Backend')}
            {renderSkillCategory('tools', 'Tools')}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}