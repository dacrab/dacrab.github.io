import { motion, MotionValue, AnimationControls } from "framer-motion";
import { SKILLS_BY_CATEGORY, SkillCategoryKey } from "./types";
import { useEffect, useState, memo } from "react";
import Image from "next/image";

interface BioSectionProps {
  contentY: MotionValue<number>; 
  bioRef: React.RefObject<HTMLDivElement>; 
  bioAnimate: AnimationControls; 
}

// Optimized animation variants
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeIn = (delay: number) => ({
  hidden: {
    y: 15,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.5
    }
  }
});

const cardAnimation = (delay: number) => ({
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      delay,
      ease: "easeOut"
    }
  }
});

// Highlighted keyword component - memoized for performance
const KeywordHighlight = memo(({ children }: { children: React.ReactNode }) => (
  <span className="text-accent font-medium relative group">
    {children}
    <span className="absolute bottom-0 left-0 w-full h-[0.12em] bg-accent/20 rounded-full"></span>
  </span>
));

KeywordHighlight.displayName = 'KeywordHighlight';

// Main component - memoized
const BioSection = memo(function BioSection({ contentY, bioRef, bioAnimate }: BioSectionProps) {
  // Dynamic age calculation
  const [age, setAge] = useState<number>(0);
  
  useEffect(() => {
    // Calculate age once on component mount
    const birthDate = new Date('2004-05-25');
    const today = new Date();
    
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    
    setAge(calculatedAge);
  }, []);
  
  // Optimized skill category renderer
  const renderSkillCategory = (category: SkillCategoryKey, label: string) => (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
      <span className="text-accent text-sm font-medium bg-accent/5 px-2 py-1 rounded-md border border-accent/10 w-24 flex-shrink-0 mb-2 md:mb-0">{label}:</span>
      <div className="flex flex-wrap gap-2">
        {SKILLS_BY_CATEGORY[category].map((skill, index) => (
          <motion.a
            key={skill.name}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-1 px-2 rounded-md bg-card/50 border border-border/30 hover:border-accent/30 transition-all duration-200"
            variants={cardAnimation(0.05 + (index * 0.02))}
            whileHover={{ y: -2 }}
          >
            <Image 
              src={skill.icon} 
              alt={`${skill.name} logo`}
              width={16} 
              height={16} 
              className="w-4 h-4 object-contain"
            />
            <span className="text-xs font-medium hover:text-accent transition-colors duration-200">{skill.name}</span>
          </motion.a>
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
        className="space-y-6"
      >
        <motion.div 
          variants={fadeIn(0.1)}
          className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-5 shadow-md"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-3 relative inline-block">
            <KeywordHighlight>Junior Web Developer</KeywordHighlight> 
            <span className="ml-1">with a passion for digital experiences</span>
          </h3>
          <p className="text-muted leading-relaxed">
            Hello! I&apos;m <KeywordHighlight>Vaggelis Kavouras</KeywordHighlight>, a {age}-year-old developer from <KeywordHighlight>Thessaloniki, Greece</KeywordHighlight>. With about <KeywordHighlight>1 year of experience</KeywordHighlight> in web development, I&apos;m focused on building modern, responsive, and high-performance web applications.
          </p>
        </motion.div>
        
        <motion.div 
          variants={fadeIn(0.15)}
          className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-5 shadow-md"
        >
          <p className="text-muted leading-relaxed">
            I&apos;m passionate about staying at the cutting edge of <KeywordHighlight>web technologies</KeywordHighlight> and continuously expanding my skills. My focus areas include <KeywordHighlight>frontend development</KeywordHighlight> with <KeywordHighlight>React</KeywordHighlight> and <KeywordHighlight>Next.js</KeywordHighlight>, scalable backend services, and intuitive <KeywordHighlight>UI/UX designs</KeywordHighlight>.
          </p>
        </motion.div>
        
        <motion.div 
          variants={fadeIn(0.2)}
          className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-5 shadow-md"
        >
          <h3 className="text-lg md:text-xl font-bold mb-3 relative inline-block">
            Technical Expertise
          </h3>
          
          <div className="space-y-4">
            {renderSkillCategory('frontend', 'Frontend')}
            {renderSkillCategory('backend', 'Backend')}
            {renderSkillCategory('tools', 'Tools')}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

export default BioSection;