/** Prefix a site-root-relative path with Astro's `base`. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  const rest = path.replace(/^\//, '');
  if (!rest) return prefix;
  return `${prefix}${rest}`;
}

export function photoSrc(image: string): string {
  const cleaned = image.replace(/^\//, '');
  return url(cleaned);
}

export const siteName = 'Jakob Musk';
