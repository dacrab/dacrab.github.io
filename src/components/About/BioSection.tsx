import { motion, MotionValue, AnimationControls } from "framer-motion";
import { SKILLS_BY_CATEGORY } from "./types";
import SkillCard from "./SkillCard";
import { useEffect, useState } from "react";

interface BioSectionProps {
  contentY: MotionValue<number>; // motion value
  bioRef: React.RefObject<HTMLDivElement>; // reference
  bioAnimate: AnimationControls; // animation controls
}

// Animation variants
const staggerContainer = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay
    }
  }
});

const fadeIn = (direction: "up" | "down", delay: number, duration: number) => ({
  hidden: {
    y: direction === "up" ? 20 : -20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration
    }
  }
});

// Highlighted keyword component
const KeywordHighlight = ({ children }: { children: React.ReactNode }) => (
  <span className="text-accent font-medium">{children}</span>
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
    // Recalculate on birthday if component stays mounted across dates
    const intervalId = setInterval(calculateAge, 1000 * 60 * 60 * 24); // Check daily
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <motion.div 
      className="lg:col-span-7 lg:col-start-6"
      style={{ y: contentY }}
    >
      {/* Bio section */}
      <motion.div 
        ref={bioRef}
        variants={staggerContainer(0.15)}
        initial="hidden"
        animate={bioAnimate}
        className="space-y-6"
      >
        <motion.div variants={fadeIn("up", 0.1, 0.7)}>
          <h3 className="text-2xl font-bold mb-4">
            <KeywordHighlight>Junior Web Developer</KeywordHighlight> with a passion for creating exceptional digital experiences
          </h3>
          <p className="text-muted">
            Hello! I&apos;m <KeywordHighlight>Vaggelis Kavouras</KeywordHighlight>, a {age}-year-old developer from <KeywordHighlight>Thessaloniki, Greece</KeywordHighlight>. With about <KeywordHighlight>1 year of experience</KeywordHighlight> in web development, I&apos;m focused on building modern, responsive, and high-performance web applications. My approach combines technical knowledge with creative problem-solving to deliver effective solutions.
          </p>
        </motion.div>
        
        <motion.div variants={fadeIn("up", 0.2, 0.7)}>
          <p className="text-muted">
            I&apos;m passionate about staying at the cutting edge of <KeywordHighlight>web technologies</KeywordHighlight> and continuously expanding my skills to deliver the best possible user experiences. My focus areas include <KeywordHighlight>frontend development</KeywordHighlight> with <KeywordHighlight>React</KeywordHighlight> and <KeywordHighlight>Next.js</KeywordHighlight>, learning about scalable backend services, and creating smooth, intuitive <KeywordHighlight>UI/UX designs</KeywordHighlight>.
          </p>
        </motion.div>
        
        {/* Skills section */}
        <motion.div variants={fadeIn("up", 0.3, 0.7)}>
          <h3 className="text-xl font-bold mb-6">
            Technical Expertise
          </h3>
          
          <div className="space-y-8">
            {/* Frontend skills */}
            <div>
              <h4 className="text-lg font-medium text-accent mb-4">Frontend Development</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {SKILLS_BY_CATEGORY.frontend.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} className="skill-card-bg" />
                ))}
              </div>
            </div>
            
            {/* Backend skills */}
            <div>
              <h4 className="text-lg font-medium text-accent mb-4">Backend & Database</h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {SKILLS_BY_CATEGORY.backend.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} className="skill-card-bg" />
                ))}
              </div>
            </div>
            
            {/* Tools skills */}
            <div>
              <h4 className="text-lg font-medium text-accent mb-4">Tools & Platforms</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {SKILLS_BY_CATEGORY.tools.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} className="skill-card-bg" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 