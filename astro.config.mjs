import { defineConfig } from 'astro/config';

const site = process.env.SITE || 'https://jakobmusk.me';
const base = process.env.BASE ?? '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
});
