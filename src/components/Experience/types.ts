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
    role: "Junior Frontend Developer",
    company: "WebTech Solutions",
    period: "2023 - Present",
    description: [
      "Developing modern web applications using Next.js, React, and TypeScript",
      "Implementing responsive designs with Tailwind CSS for optimal user experience across devices",
      "Collaborating with senior developers to improve code quality and learn best practices",
      "Participating in code reviews and contributing to project planning discussions"
    ],
    skills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Responsive Design"]
  },
  {
    id: 2,
    role: "Web Development Intern",
    company: "Digital Creations",
    period: "2023 (3 months)",
    description: [
      "Assisted in building and maintaining client websites",
      "Gained hands-on experience with modern frontend technologies",
      "Created and styled UI components according to design specifications",
      "Learned version control workflows and collaborative development processes"
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Git", "UI Components"]
  }
];

// Sample skill progression data
export const SKILL_PROGRESSIONS: SkillProgression[] = [
  { name: "Frontend Development", percentage: 75 },
  { name: "UI Implementation", percentage: 70 },
  { name: "Next.js & React", percentage: 65 },
  { name: "TypeScript", percentage: 60 },
  { name: "Responsive Design", percentage: 80 }
]; 