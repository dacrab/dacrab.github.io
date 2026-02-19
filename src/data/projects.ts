import type { ImageMetadata } from 'astro';

interface Project {
  title: string;
  blurb: string;
  tech: string[];
  link: string;
  cover: ImageMetadata;
}

// Single glob loads all project screenshots at build time.
const projectImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/*/home.webp',
  { eager: true },
);

function getCover(assetFolder: string): ImageMetadata | null {
  const key = Object.keys(projectImages).find((k) => k.includes(`/${assetFolder}/`));
  return key ? (projectImages[key]?.default ?? null) : null;
}

const allProjects = [
  {
    title: 'AUREUS & ARGENT',
    blurb: 'Trust-forward pawn shop website with interactive tools and a clear, compact UI.',
    tech: ['Svelte', 'SvelteKit', 'TailwindCSS', 'TypeScript'],
    link: 'https://gsm-beta.vercel.app/',
    cover: getCover('aureus'),
  },
  {
    title: 'Apex',
    blurb: 'Professional services site presenting complex projects with clarity.',
    tech: ['TypeScript', 'NextJS', 'TailwindCSS', 'React'],
    link: 'https://apex-construction-pied.vercel.app/',
    cover: getCover('apex'),
  },
  {
    title: 'DesignDASH',
    blurb: 'Showcasing construction work with structured galleries and specs.',
    tech: ['TypeScript', 'NextJS', 'TailwindCSS', 'React'],
    link: 'https://designdash.gr',
    cover: getCover('designdash'),
  },
  {
    title: 'Ioannis Lo Portfolio',
    blurb: 'Minimalist portfolio for a web enthusiast and creative professional.',
    tech: ['Astro', 'TailwindCSS', 'GSAP', 'TypeScript'],
    link: 'https://ioannislo.vercel.app',
    cover: getCover('ioannislo'),
  },
  {
    title: 'FeedbackFlow AI',
    blurb: 'Ingest public feedback, analyze with LLMs for sentiment, topics, and triage.',
    tech: ['NextJS', 'Supabase', 'TypeScript', 'TailwindCSS'],
    link: 'https://github.com/dacrab/feedbackflow-ai',
    cover: getCover('feedbackflow-ai'),
  },
  {
    title: 'ClubOS',
    blurb: 'Full-featured point-of-sale system built with SvelteKit and Supabase.',
    tech: ['Svelte', 'SvelteKit', 'Supabase', 'TypeScript'],
    link: 'https://github.com/dacrab/clubOS',
    cover: getCover('clubos'),
  },
  {
    title: 'Email Scraper',
    blurb: 'Google Maps email scraper using Playwright with config-driven CSV output.',
    tech: ['Python', 'Playwright', 'Docker', 'Railway'],
    link: 'https://github.com/dacrab/email-scraper',
    cover: getCover('email-scraper'),
  },
];

export const projects: Project[] = allProjects.filter(
  (p): p is Project => p.cover !== null,
);
