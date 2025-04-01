import { motion } from "framer-motion";
import { SKILLS_BY_CATEGORY } from "./types";
import SkillCard from "./SkillCard";

interface BioSectionProps {
  contentY: any; // motion value
  bioRef: any; // reference
  bioAnimate: any; // animation controls
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

export default function BioSection({ contentY, bioRef, bioAnimate }: BioSectionProps) {
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