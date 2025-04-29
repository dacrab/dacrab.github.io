// Type definitions for About components
export interface Skill {
  name: string;
  icon: string;
  url: string;
}

export type SkillCategoryKey = 'frontend' | 'backend' | 'tools';

export interface SkillCategory {
  [key: string]: Skill[];
}

// Skill data organized by category
export const SKILLS_BY_CATEGORY: SkillCategory = {
  frontend: [
    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000/FFFFFF", url: "https://nextjs.org/" },
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", url: "https://www.typescriptlang.org/" },
    { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", url: "https://tailwindcss.com/" },
    { name: "Framer Motion", icon: "https://cdn.simpleicons.org/framer/0055FF", url: "https://www.framer.com/motion/" }
  ],
  backend: [
    { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E", url: "https://supabase.io/" },
    { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28", url: "https://firebase.google.com/" }
  ],
  tools: [
    { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", url: "https://git-scm.com/" },
    { name: "GitHub", icon: "https://cdn.simpleicons.org/github/000000/FFFFFF", url: "https://github.com/" },
    { name: "VS Code", icon: "https://cdn.simpleicons.org/vscodium/007ACC", url: "https://code.visualstudio.com/" },
    { name: "Unreal Engine", icon: "https://cdn.simpleicons.org/unrealengine/0E1128", url: "https://www.unrealengine.com/" },
    { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED", url: "https://www.docker.com/" },
    { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/000000/FFFFFF", url: "https://vercel.com/" }
  ]
};

// Light icons that need special treatment in dark/light mode
export const ADAPTIVE_COLOR_ICONS = ["Next.js", "GitHub", "Vercel"];