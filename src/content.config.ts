import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const photos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/photos' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    caption: z.string(),
    album: z.enum(['Places', 'People', 'Odds & ends']),
    image: z.string(),
    alt: z.string(),
    /** When false, omit from Home mosaic. Detail URL can remain. Default true. */
    showOnHome: z.boolean().optional().default(true),
    /** When false, omit from Images listing and Images prev/next. Default true. */
    showInImages: z.boolean().optional().default(true),
    /** When false, omit from the chronological Archive. Default true. */
    showInArchive: z.boolean().optional().default(true),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
  }),
});

const archive = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/archive' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['link', 'list', 'fragment', 'note']),
    url: z.string().url().optional(),
    /** Optional attached image under public/ (e.g. photos/foo.jpg). Reuse existing assets. */
    image: z.string().optional(),
    alt: z.string().optional(),
    /** When false, an attached image remains a plain, non-navigating thumb. Default true. */
    linkImage: z.boolean().optional().default(true),
  }),
});

const memes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/memes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    caption: z.string().optional().default(''),
    image: z.string(),
    alt: z.string(),
  }),
});

const socials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/socials' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    caption: z.string().optional().default(''),
    image: z.string(),
    alt: z.string(),
  }),
});

export const collections = { photos, writing, archive, memes, socials };
