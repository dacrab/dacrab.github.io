import type { ImageMetadata } from 'astro';

interface Project {
  id: number;
  slug: 'aureus' | 'argicon' | 'designdash';
  title: string;
  meta: string;
  blurb: string;
  tech: string[];
  link: string;
  cover: ImageMetadata;
  gallery: ImageMetadata[];
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

function toList(record: Record<string, { default: ImageMetadata }>) {
  return Object.values(record).map((v) => v.default);
}

const aureusList = toList(aureusImages);
const argiconList = toList(argiconImages);
const designdashList = toList(designdashImages);

function coverOrFallback(record: ImageMetadata[], nameIncludes: string): ImageMetadata {
  if (record.length === 0) {
    throw new Error('No images found for gallery');
  }
  const match = record.find((img) => (img.src as string).includes(nameIncludes));
  const fallback = record[0];
  if (!fallback) {
    // Should be unreachable due to the earlier length check; added for type safety
    throw new Error('Unexpected empty gallery');
  }
  return match ?? fallback;
}

export const projects: Project[] = [
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
];
