// Type definitions for Experience components
export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

// Timeline entry props interface
export interface TimelineEntryProps {
  position: 'left' | 'right';
  date: string;
  company: string;
  title: string;
  description: string[];
  technologies: string[];
  isInView: boolean;
  index: number;
}

// Skill data interface
export interface SkillProgression {
  name: string;
  percentage: number;
}

// Sample experience data
export const EXPERIENCES: ExperienceItem[] = [
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

// Sample skill progression data
export const SKILL_PROGRESSIONS: SkillProgression[] = [
  { name: "Frontend Development", percentage: 95 },
  { name: "UI/UX Design Implementation", percentage: 90 },
  { name: "Performance Optimization", percentage: 85 },
  { name: "Team Leadership", percentage: 80 },
  { name: "Backend Integration", percentage: 75 }
]; 