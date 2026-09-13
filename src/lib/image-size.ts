import fs from 'node:fs';
import path from 'node:path';

export type ImageSize = { width: number; height: number };

const cache = new Map<string, ImageSize>();

/** Read pixel size of a file under `public/`. */
export function probeImage(publicPath: string): ImageSize {
  const rel = publicPath.replace(/^\//, '');
  const hit = cache.get(rel);
  if (hit) return hit;

  const abs = path.join(process.cwd(), 'public', rel);
  const buf = fs.readFileSync(abs);
  const size = parseSize(buf) ?? { width: 3, height: 2 };
  cache.set(rel, size);
  return size;
}

function parseSize(buf: Buffer): ImageSize | null {
  if (buf.length < 16) return null;

  if (buf[0] === 0xff && buf[1] === 0xd8) return jpegSize(buf);
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return {
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20),
    };
  }
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    return webpSize(buf);
  }
  return null;
}

function jpegSize(buf: Buffer): ImageSize | null {
  let i = 2;
  while (i + 8 < buf.length) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xff) {
      i += 1;
      continue;
    }
    // SOF0 / SOF1 / SOF2
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return {
        height: buf.readUInt16BE(i + 5),
        width: buf.readUInt16BE(i + 7),
      };
    }
    if (marker === 0xd9 || marker === 0xda) break;
    const len = buf.readUInt16BE(i + 2);
    if (len < 2) break;
    i += 2 + len;
  }
  return null;
}

function webpSize(buf: Buffer): ImageSize | null {
  const kind = buf.toString('ascii', 12, 16);
  if (kind === 'VP8X' && buf.length >= 30) {
    const width = 1 + buf[24] + (buf[25] << 8) + (buf[26] << 16);
    const height = 1 + buf[27] + (buf[28] << 8) + (buf[29] << 16);
    return { width, height };
  }
  if (kind === 'VP8 ' && buf.length >= 30) {
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }
  if (kind === 'VP8L' && buf.length >= 25) {
    const bits = buf.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  return null;
}
