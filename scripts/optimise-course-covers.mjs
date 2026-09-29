/* Normalises the AI-generated course covers for the web.

   The generator emits ~1.8MB PNGs at whatever size it likes. Shipping 42 of
   those would add ~75MB to the repo and push multi-megabyte images down to
   every catalogue visitor, for a card that renders at roughly 300x170 CSS
   pixels. This converts each one to a 1200x675 (16:9) JPEG — 2x the largest
   rendered size, so it still looks sharp on a HiDPI screen — and deletes the
   PNG source.

   Idempotent: a PNG that has already been converted is simply gone, so
   re-running only picks up newly generated files.

   Usage: node scripts/optimise-course-covers.mjs */

import { readdir, unlink, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const DIR = fileURLToPath(new URL('../public/course-covers/', import.meta.url));
const WIDTH = 1200;
const HEIGHT = 675;

const entries = await readdir(DIR);
const pngs = entries.filter((f) => f.toLowerCase().endsWith('.png'));

if (pngs.length === 0) {
  console.log('No PNGs left to convert.');
}

let totalBefore = 0;
let totalAfter = 0;

for (const file of pngs) {
  const src = path.join(DIR, file);
  const dest = path.join(DIR, `${path.basename(file, path.extname(file))}.jpg`);

  const before = (await stat(src)).size;
  await sharp(src)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  const after = (await stat(dest)).size;

  await unlink(src);

  totalBefore += before;
  totalAfter += after;
  console.log(
    `${path.basename(dest).padEnd(50)} ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB`
  );
}

if (pngs.length > 0) {
  console.log(
    `\n${pngs.length} covers: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
  );
}

const jpgs = (await readdir(DIR)).filter((f) => f.endsWith('.jpg'));
console.log(`${jpgs.length} cover(s) present.`);
