import type { ImageMetadata } from 'astro';

type Project = {
    id: number;
    slug: 'gsm' | 'argicon' | 'designdash';
    title: string;
    meta: string;
    blurb: string;
    tech: string[];
    link: string;
    cover: ImageMetadata;
    gallery: ImageMetadata[];
};

const gsmImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/gsm/*.png', { eager: true }) as Record<string, { default: ImageMetadata }>;
const argiconImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/argicon/*.png', { eager: true }) as Record<string, { default: ImageMetadata }>;
const designdashImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/designdash/*.png', { eager: true }) as Record<string, { default: ImageMetadata }>;

function toList(record: Record<string, { default: ImageMetadata }>) {
    return Object.values(record).map(v => v.default);
}

const gsmList = toList(gsmImages);
const argiconList = toList(argiconImages);
const designdashList = toList(designdashImages);

function coverOrFallback(record: ImageMetadata[], nameIncludes: string): ImageMetadata {
    if (record.length === 0) {
        throw new Error('No images found for gallery');
    }
    const match = record.find(img => (img.src as string).includes(nameIncludes));
    return match ?? record[0]!;
}

export const projects: Project[] = [
    {
        id: 1,
        slug: 'gsm',
        title: 'Silver and Gold Money',
        meta: 'Bilingual site · Calculators · SvelteKit',
        blurb: 'Trust-forward pawn shop website with interactive tools and a clear, compact UI.',
        tech: ['Svelte', 'SvelteKit', 'TailwindCSS', 'TypeScript'],
        link: 'https://gsm-beta.vercel.app/',
        cover: coverOrFallback(gsmList, 'home-en'),
        gallery: gsmList,
    },
    {
        id: 2,
        slug: 'argicon',
        title: 'Argicon',
        meta: 'Engineering · Next.js · Bilingual',
        blurb: 'Professional services site presenting complex projects with clarity.',
        tech: ['TypeScript', 'NextJS', 'TailwindCSS', 'React'],
        link: 'https://argicon.gr',
        cover: coverOrFallback(argiconList, 'home-en'),
        gallery: argiconList,
    },
    {
        id: 3,
        slug: 'designdash',
        title: 'DesignDash',
        meta: 'Construction platform · Next.js',
        blurb: 'Showcasing construction work with structured galleries and specs.',
        tech: ['TypeScript', 'NextJS', 'TailwindCSS', 'React'],
        link: 'https://designdash.gr',
        cover: coverOrFallback(designdashList, 'home-en'),
        gallery: designdashList,
    },
];


