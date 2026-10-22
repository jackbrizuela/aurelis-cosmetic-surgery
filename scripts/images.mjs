// Converts photos into the web images the site uses.
// Usage: pnpm images
// Put sources in assets/source/ or assets/originals/rebuild/, named after a key in
// images.config.json (hero.jpg, doctor-1.png, ...). When several files share a name,
// the most recently changed one wins.

import { readFile, readdir, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirs = [path.join(root, 'assets', 'source'), path.join(root, 'assets', 'originals', 'rebuild')];
const outDir = path.join(root, 'public', 'assets');
const config = JSON.parse(await readFile(path.join(root, 'scripts', 'images.config.json'), 'utf8'));
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff']);

await mkdir(outDir, { recursive: true });

const files = [];
for (const dir of sourceDirs) {
  try {
    for (const name of await readdir(dir)) files.push({ dir, name });
  } catch {
    // Folder not there yet; skip it.
  }
}

const newest = new Map();
for (const { dir, name: file } of files) {
  const ext = path.extname(file).toLowerCase();
  if (!exts.has(ext)) continue;
  const key = path.basename(file, path.extname(file)).toLowerCase();
  if (!config[key]) {
    console.warn(`Skipping ${file}: no entry named "${key}" in images.config.json`);
    continue;
  }
  const { mtimeMs } = await stat(path.join(dir, file));
  const current = newest.get(key);
  if (!current || mtimeMs > current.mtimeMs) newest.set(key, { file, dir, mtimeMs });
}

if (!newest.size) {
  console.log('Nothing to convert. Add images named like hero.jpg to assets/source/ or assets/originals/rebuild/.');
  process.exit(0);
}

for (const [key, { file, dir }] of newest) {
  const { ratio, widths, position = 'attention' } = config[key];
  const input = path.join(dir, file);
  const meta = await sharp(input).metadata();
  for (const width of widths) {
    const height = Math.round((width * ratio[1]) / ratio[0]);
    const out = path.join(outDir, `${key}-${width}.webp`);
    await sharp(input)
      .rotate()
      .resize({
        width,
        height,
        fit: 'cover',
        position: position === 'attention' ? sharp.strategy.attention : position,
        withoutEnlargement: false,
      })
      .webp({ quality: 82, effort: 6 })
      .toFile(out);
    const upscaled = meta.width && meta.width < width ? ' (source is smaller than this size; it was enlarged)' : '';
    console.log(`${file} -> public/assets/${key}-${width}.webp${upscaled}`);
  }
  if (key === 'hero' || key === 'home-art') {
    const previewName = key === 'home-art' ? 'home-art-og.jpg' : 'og.jpg';
    await sharp(input).rotate().resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
      .jpeg({ quality: 85, mozjpeg: true }).toFile(path.join(outDir, previewName));
    console.log(`${file} -> public/assets/${previewName} (social preview)`);
  }
}

console.log('Done. Run pnpm build to include them in the production bundle.');
