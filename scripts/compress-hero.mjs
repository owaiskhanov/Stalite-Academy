#!/usr/bin/env node
/**
 * Compress the hero photographs into lean, responsive assets in public/hero/.
 *
 * The two originals live in Supabase Storage and are large PNGs. This script
 * downloads them once (cached in .hero-source/, which is git-ignored), then
 * writes WebP + AVIF crops sized for each breakpoint, plus a social share card.
 * Only the generated files in public/hero/ are committed — the huge PNGs never
 * enter git history.
 *
 * Usage:
 *   npm run compress:hero
 *
 * Point it at local files instead of the bucket:
 *   HERO_DESKTOP=~/Desktop/hero-desktop.png HERO_MOBILE=~/Desktop/hero-mobile.png \
 *     npm run compress:hero
 *
 * Re-download after replacing the photos in Supabase:
 *   npm run compress:hero -- --refresh
 */
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "hero");
const CACHE_DIR = path.join(ROOT, ".hero-source");
const REFRESH = process.argv.includes("--refresh");

const BUCKET =
  "https://osarasctypsjozjdslpd.supabase.co/storage/v1/object/public/Academy";

/** Source photographs. Override either with an env var pointing at a local file. */
const SOURCES = {
  desktop:
    process.env.HERO_DESKTOP ||
    `${BUCKET}/Joyful%20Student%20Selfie%20Under%20Blue%20Skies.png`,
  mobile:
    process.env.HERO_MOBILE ||
    `${BUCKET}/Cheerful%20Skyward%20Group%20Selfie.png`,
};

/**
 * Responsive hero crops. Widths match the breakpoints used in src/styles.css:
 * <=600px mobile, 601-1023px tablet, >=1024px desktop.
 * Quality dialled per size — smaller images carry more quality without cost.
 */
const VARIANTS = [
  { name: "hero-desktop", source: "desktop", width: 1920, webp: 76, avif: 52 },
  { name: "hero-tablet", source: "desktop", width: 1280, webp: 74, avif: 50 },
  { name: "hero-mobile", source: "mobile", width: 900, webp: 74, avif: 50 },
];

const EXTRA_LIMIT = 400 * 1024; // warn above this per file

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

function log(msg) {
  process.stdout.write(`${msg}\n`);
}

/** Download to .hero-source/ (or read a local file) and return its bytes. */
async function loadSource(key) {
  const ref = SOURCES[key];
  if (!ref) throw new Error(`No source configured for "${key}"`);

  if (!/^https?:\/\//i.test(ref)) {
    const bytes = await readFile(ref);
    log(`  ${key}: read local file ${ref} (${kb(bytes.length)})`);
    return { bytes, label: path.basename(ref) };
  }

  const url = new URL(ref);
  const cachedPath = path.join(
    CACHE_DIR,
    `${key}${path.extname(decodeURIComponent(url.pathname)) || ".png"}`,
  );

  if (existsSync(cachedPath) && !REFRESH) {
    const bytes = await readFile(cachedPath);
    log(`  ${key}: using cached ${path.relative(ROOT, cachedPath)} (${kb(bytes.length)})`);
    return { bytes, label: path.basename(decodeURIComponent(url.pathname)) };
  }

  log(`  ${key}: downloading ${decodeURIComponent(url.pathname)}`);
  const hint =
    `Pass HERO_${key.toUpperCase()}=/path/to/file.png to use a local copy instead ` +
    `(or check the object is still public in the Academy bucket).`;
  let res;
  try {
    res = await fetch(url, { redirect: "follow" });
  } catch (cause) {
    throw new Error(
      `Could not reach ${url.host} for "${key}" (${cause.message}). ${hint}`,
    );
  }
  if (!res.ok) {
    throw new Error(`Download failed for "${key}": HTTP ${res.status}. ${hint}`);
  }
  const bytes = Buffer.from(await res.arrayBuffer());
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cachedPath, bytes);
  log(`  ${key}: saved ${path.relative(ROOT, cachedPath)} (${kb(bytes.length)})`);
  return { bytes, label: path.basename(decodeURIComponent(url.pathname)) };
}

async function main() {
  log("Compressing hero photographs\n");

  const sources = {
    desktop: await loadSource("desktop"),
    mobile: await loadSource("mobile"),
  };

  await mkdir(OUT_DIR, { recursive: true });
  const written = [];

  for (const variant of VARIANTS) {
    const { bytes, label } = sources[variant.source];
    const base = sharp(bytes, { failOn: "error" })
      .rotate() // honour EXIF orientation before resizing
      .resize({ width: variant.width, withoutEnlargement: true });

    const meta = await base.metadata();

    const webpPath = path.join(OUT_DIR, `${variant.name}.webp`);
    await base
      .clone()
      .webp({ quality: variant.webp, effort: 6, smartSubsample: true })
      .toFile(webpPath);

    const avifPath = path.join(OUT_DIR, `${variant.name}.avif`);
    await base
      .clone()
      .avif({ quality: variant.avif, effort: 4, chromaSubsampling: "4:2:0" })
      .toFile(avifPath);

    for (const [file, format] of [
      [webpPath, "webp"],
      [avifPath, "avif"],
    ]) {
      const { size } = await stat(file);
      written.push({ file, size, format, source: label, meta, width: variant.width });
    }
  }

  // Social share card: 1200x630 centre-cropped JPEG (WhatsApp/X/LinkedIn safe).
  const ogPath = path.join(OUT_DIR, "og-cover.jpg");
  await sharp(sources.desktop.bytes)
    .rotate()
    .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(ogPath);
  written.push({
    file: ogPath,
    size: (await stat(ogPath)).size,
    format: "jpg",
    source: sources.desktop.label,
    width: 1200,
  });

  // Report
  log("\nOutput:");
  let total = 0;
  for (const item of written) {
    total += item.size;
    const over = item.size > EXTRA_LIMIT ? "  ⚠ over 400 KB" : "";
    log(
      `  ${path.relative(ROOT, item.file).padEnd(34)} ${kb(item.size).padStart(9)}${over}`,
    );
  }
  log(`  ${"total".padEnd(34)} ${kb(total).padStart(9)}`);

  const originals = Object.values(sources).reduce((n, s) => n + s.bytes.length, 0);
  log(
    `\nOriginals: ${kb(originals)}  →  generated: ${kb(total)}  ` +
      `(${(100 - (total / originals) * 100).toFixed(1)}% smaller per full set)`,
  );
  log(
    "\nA visitor downloads one hero image, not the whole set: " +
      "~" +
      kb(
        written.find((w) => w.file.endsWith("hero-desktop.avif"))?.size ??
          written.find((w) => w.file.endsWith("hero-desktop.webp"))?.size ??
          0,
      ) +
      " on desktop.",
  );
  log("\nNext: `npm run build` and commit public/hero/.");
}

main().catch((err) => {
  process.stderr.write(`\n${err.message}\n`);
  process.exit(1);
});
