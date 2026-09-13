# Jakob Musk

Personal life-archive. Public site: **https://jakobmusk.me**

White, photo-mosaic, static Astro. GitHub Pages deploys from `main` on every push (see `.github/workflows/deploy.yml`).

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:4321/. Node 20+ (CI uses 22). `astro.config.mjs` defaults `site` to `https://jakobmusk.me` and `base` to `/`.

Scripts: `dev`, `build`, `preview`.

## Adding content

Keep the frontmatter keys; change the rest. Do not commit secrets.

### Add a photo

1. Put the image in `public/photos/` (`.jpg` or `.webp`).
2. Add a markdown file in `src/content/photos/`, named with a URL-safe slug.

Frontmatter: `title`, `date`, `caption`, `album`, `image`, `alt`.

`album` must be one of: Places, People, Odds & ends.

The filename (without `.md`) becomes the URL: `src/content/photos/morning-wall.md` → `/photos/morning-wall/`.

### Add a writing post

Create `src/content/writing/your-slug.md` with `title`, `date`, and `excerpt` in the frontmatter, then ordinary markdown. It shows up on Writing and in the Archive.

### Add an archive item

Create `src/content/archive/your-slug.md` with `title`, `date`, and `kind`.

`kind` must be one of: link, list, fragment, note.

For a link, add `url:` as well. Photos and writing posts are already pulled into Archive automatically.

## Pages

- `/` — Home (flush photo mosaic)
- `/photos/` — Mosaic gallery
- `/photos/<slug>/` — Single photograph
- `/writing/` — Notes index
- `/writing/<slug>/` — A note
- `/archive/` — Everything, filterable
- `/404.html` — Not found

## Deploy

Pushes to `main` build with `SITE=https://jakobmusk.me BASE=/` and publish to GitHub Pages. Custom domain is set via `public/CNAME` (`jakobmusk.me`).
