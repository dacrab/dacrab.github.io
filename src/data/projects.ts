import type { ImageMetadata } from 'astro';

type ProjectSlug = 'aureus' | 'argicon' | 'designdash' | 'ioannislo' | 'feedbackflow' | 'clubos' | 'email-scraper';

interface ProjectBase {
  id: number;
  slug: ProjectSlug;
  title: string;
  meta: string;
  blurb: string;
  tech: string[];
  link: string;
  gallery: ImageMetadata[];
}

interface ProjectWithCover extends ProjectBase {
  cover: ImageMetadata;
}

interface ProjectMaybeCover extends ProjectBase {
  cover: ImageMetadata | null;
}

const aureusImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/aureus/home.webp',
  {
    eager: true,
  }
) as Record<string, { default: ImageMetadata }>;
const argiconImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/argicon/home.webp',
  {
    eager: true,
  }
) as Record<string, { default: ImageMetadata }>;
const designdashImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/designdash/home.webp',
  { eager: true }
) as Record<string, { default: ImageMetadata }>;
const ioannisloImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/ioannislo/home.webp',
  { eager: true }
) as Record<string, { default: ImageMetadata }>;
const feedbackflowImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/feedbackflow-ai/home.webp',
  { eager: true }
) as Record<string, { default: ImageMetadata }>;
const clubosImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/clubos/home.webp',
  { eager: true }
) as Record<string, { default: ImageMetadata }>;
const emailScraperImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/email-scraper/home.webp',
  { eager: true }
) as Record<string, { default: ImageMetadata }>;

function toList(record: Record<string, { default: ImageMetadata }>) {
  return Object.values(record).map((v) => v.default);
}

const aureusList = toList(aureusImages);
const argiconList = toList(argiconImages);
const designdashList = toList(designdashImages);
const ioannisloList = toList(ioannisloImages);
const feedbackflowList = toList(feedbackflowImages);
const clubosList = toList(clubosImages);
const emailScraperList = toList(emailScraperImages);

function coverOrFallback(record: ImageMetadata[], nameIncludes: string): ImageMetadata | null {
  if (record.length === 0) {
    return null;
  }
  const match = record.find((img) => (img.src as string).includes(nameIncludes));
  const fallback = record[0];
  return match ?? fallback ?? null;
}

const allProjects: ProjectMaybeCover[] = [
  {
    id: 1,
    slug: 'aureus',
    title: 'AUREUS & ARGENT',
    meta: 'Bilingual site · Calculators · SvelteKit',
    blurb: 'Trust-forward pawn shop website with interactive tools and a clear, compact UI.',
    tech: ['Svelte', 'SvelteKit', 'TailwindCSS', 'TypeScript'],
    link: 'https://gsm-beta.vercel.app/',
    cover: coverOrFallback(aureusList, 'home'),
    gallery: aureusList,
  },
  {
    id: 2,
    slug: 'argicon',
    title: 'Argicon',
    meta: 'Engineering · Next.js · Bilingual',
    blurb: 'Professional services site presenting complex projects with clarity.',
    tech: ['TypeScript', 'NextJS', 'TailwindCSS', 'React'],
    link: 'https://argicon.gr',
    cover: coverOrFallback(argiconList, 'home'),
    gallery: argiconList,
  },
  {
    id: 3,
    slug: 'designdash',
    title: 'DesignDASH',
    meta: 'Construction platform · Next.js',
    blurb: 'Showcasing construction work with structured galleries and specs.',
    tech: ['TypeScript', 'NextJS', 'TailwindCSS', 'React'],
    link: 'https://designdash.gr',
    cover: coverOrFallback(designdashList, 'home'),
    gallery: designdashList,
  },
  {
    id: 4,
    slug: 'ioannislo',
    title: 'Ioannis Lo Portfolio',
    meta: 'Client work · Astro · Minimalist',
    blurb: 'Minimalist portfolio for a web enthusiast and creative professional.',
    tech: ['Astro', 'TailwindCSS', 'GSAP', 'TypeScript'],
    link: 'https://ioannislo.vercel.app',
    cover: coverOrFallback(ioannisloList, 'home'),
    gallery: ioannisloList,
  },
  {
    id: 5,
    slug: 'feedbackflow',
    title: 'FeedbackFlow AI',
    meta: 'Micro-SaaS · AI · Next.js',
    blurb: 'Ingest public feedback, analyze with LLMs for sentiment, topics, and triage.',
    tech: ['NextJS', 'Supabase', 'TypeScript', 'TailwindCSS'],
    link: 'https://github.com/dacrab/feedbackflow-ai',
    cover: coverOrFallback(feedbackflowList, 'home'),
    gallery: feedbackflowList,
  },
  {
    id: 6,
    slug: 'clubos',
    title: 'ClubOS',
    meta: 'POS System · SvelteKit · Supabase',
    blurb: 'Full-featured point-of-sale system built with SvelteKit and Supabase.',
    tech: ['Svelte', 'SvelteKit', 'Supabase', 'TypeScript'],
    link: 'https://github.com/dacrab/clubOS',
    cover: coverOrFallback(clubosList, 'home'),
    gallery: clubosList,
  },
  {
    id: 7,
    slug: 'email-scraper',
    title: 'Email Scraper',
    meta: 'Automation · Python · Docker',
    blurb: 'Google Maps email scraper using Playwright with config-driven CSV output.',
    tech: ['Python', 'Playwright', 'Docker', 'Railway'],
    link: 'https://github.com/dacrab/email-scraper',
    cover: coverOrFallback(emailScraperList, 'home'),
    gallery: emailScraperList,
  },
];

export const projects: ProjectWithCover[] = allProjects.filter(
  (p): p is ProjectWithCover => p.cover !== null
);
