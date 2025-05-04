// ==========================================================================
// Type Definitions
// ==========================================================================
export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface TimelineEntryProps {
  position: 'left' | 'right';
  desktopPosition?: 'left' | 'right';
  date: string;
  company: string;
  title: string;
  description: string[];
  technologies: string[];
  isInView: boolean;
  index: number;
  isMobile: boolean;
}

export interface SkillProgression {
  name: string;
  percentage: number;
}

// ==========================================================================
// Constants
// ==========================================================================
export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 1,
    role: "Web Development Intern",
    company: "Digital Creations",
    period: "October 1st, 2023 - March 31st, 2024",
    description: [
      "Developed three custom WordPress sites with responsive design and custom functionality",
      "Built two modern websites (Argicon.gr and DesignDash.gr) for architecture and construction firms using Next.js, TypeScript, and TailwindCSS",
      "Created Proteas - a comprehensive warehouse management system for sports facilities with role-based access control, using Next.js, Supabase, and TypeScript",
      "Implemented responsive designs, multi-language support, and modern UI components across all projects",
      "Applied version control with Git and followed collaborative development workflows"
    ],
    skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "WordPress", "Supabase", "Git", "Framer Motion", "i18n", "Responsive Design"]
  }
];

export const SKILL_PROGRESSIONS: SkillProgression[] = [
  { name: "Next.js & React", percentage: 85 },
  { name: "TypeScript", percentage: 80 },
  { name: "TailwindCSS", percentage: 85 },
  { name: "Responsive Design", percentage: 85 },
  { name: "WordPress", percentage: 75 }
];