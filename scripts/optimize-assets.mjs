// One-off asset pipeline: converts the original v1 photos and certificates into
// web-sized WebP files. Usage:
//   node scripts/optimize-assets.mjs <path-to-v1-repo>/src/assets
// Output lands in src/assets/{gallery,certs,photo}. The originals are not committed.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/optimize-assets.mjs <v1 src/assets dir>');
  process.exit(1);
}
const out = path.resolve('src/assets');

export const slug = (name) =>
  name
    .replace(/\.[^.]+$/, '')
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '-');

async function convert(file, destDir, sizes) {
  const base = slug(path.basename(file));
  for (const [suffix, width, quality] of sizes) {
    const dest = path.join(destDir, `${base}${suffix}.webp`);
    await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(dest);
  }
  return base;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  );
  return files.flat().filter((f) => /\.(jpe?g|png)$/i.test(f));
}

const jobs = [
  ['gallery', 'gallery', [['', 1600, 72], ['-sm', 600, 70]]],
  ['certificates', 'certs', [['', 1400, 70], ['-sm', 480, 65]]],
  ['photo', 'photo', [['', 1000, 78]]],
];

for (const [from, to, sizes] of jobs) {
  const destDir = path.join(out, to);
  await fs.mkdir(destDir, { recursive: true });
  for (const file of await walk(path.join(src, from))) {
    const base = await convert(file, destDir, sizes);
    console.log(`${to}/${base}`);
  }
}
