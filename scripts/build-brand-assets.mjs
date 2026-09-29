import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const ALPHA_THRESHOLD = 128;
const wordmark = ['mlue-wordmark-light.png', 'mlue-wordmark-mask.png'];
const icons = [
  ['mlue-icon.png', 'mlue-icon-cropped.png'],
  ['mlue-icon-light.png', 'mlue-icon-light-cropped.png'],
];

async function findInkBounds(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let left = info.width;
  let top = info.height;
  let right = -1;
  let bottom = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const alpha = data[(y * info.width + x) * info.channels + info.channels - 1];
      if (alpha > ALPHA_THRESHOLD) {
        left = Math.min(left, x);
        top = Math.min(top, y);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
      }
    }
  }

  if (right < 0) throw new Error(`No opaque ink found in ${input}`);

  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

function publicPath(filename) {
  return fileURLToPath(new URL(`../public/${filename}`, import.meta.url));
}

const [wordmarkSource, wordmarkOutput] = wordmark;
const wordmarkInput = publicPath(wordmarkSource);
const wordmarkBounds = await findInkBounds(wordmarkInput);
await sharp(wordmarkInput).extract(wordmarkBounds).png().toFile(publicPath(wordmarkOutput));
console.log(`${wordmarkOutput}: ${wordmarkBounds.width}x${wordmarkBounds.height}`);

const iconJobs = await Promise.all(icons.map(async ([source, output]) => {
  const input = publicPath(source);
  return { input, output, bounds: await findInkBounds(input) };
}));
const targetRatio = Math.max(...iconJobs.map(({ bounds }) => bounds.width / bounds.height));

for (const { input, output, bounds } of iconJobs) {
  const canvasWidth = Math.max(bounds.width, Math.round(bounds.height * targetRatio));
  const leftPadding = Math.floor((canvasWidth - bounds.width) / 2);
  const rightPadding = canvasWidth - bounds.width - leftPadding;

  await sharp(input)
    .extract(bounds)
    .extend({
      left: leftPadding,
      right: rightPadding,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(publicPath(output));

  console.log(`${output}: ${canvasWidth}x${bounds.height}`);
}
