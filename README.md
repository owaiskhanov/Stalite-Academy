# Stalite Academy

A responsive React landing page for Stalite Media's 3-month Digital Marketing and AI course.

## Development

```sh
npm install
npm run dev
```

The development server binds to `0.0.0.0:5173` for Arena preview access.

## Hero images

The hero photographs are compressed into `public/hero/` and served from this
origin. Generate (or regenerate) them with:

```sh
npm run compress:hero
```

The script downloads the two originals from Supabase Storage, caches them in
`.hero-source/` (git-ignored), and writes:

| File | Size | Used by |
| --- | --- | --- |
| `hero-desktop.webp` / `.avif` | 1920w | viewports ≥ 1024px |
| `hero-tablet.webp` / `.avif` | 1280w | 601–1023px |
| `hero-mobile.webp` / `.avif` | 900w | ≤ 600px |
| `og-cover.jpg` | 1200×630 | optional social share card |

`src/HeroPhoto.jsx` renders this set through `<picture>`, so each visitor
downloads one image at the right size and format (AVIF where supported, WebP
otherwise) instead of two multi-megabyte PNGs. Commit only the generated files;
the source PNGs never enter git history.

To change a photo, replace it in Supabase and run `npm run compress:hero --
--refresh`, or skip the download entirely with local files:

```sh
HERO_DESKTOP=~/Desktop/hero.png HERO_MOBILE=~/Desktop/hero-mobile.png npm run compress:hero
```

If `public/hero/` is ever missing, `HeroPhoto` falls back to the uncompressed
Supabase originals so the hero never renders blank. `og:image`, `twitter:image`
and the Course schema image still point at the Supabase PNGs; after generating
`og-cover.jpg` those three URLs can be switched to
`https://stalite-academy.vercel.app/hero/og-cover.jpg` with `og:image:width`
1200 and `og:image:height` 630.

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist` directory as a static website.

## Content and interactions

- Preserves the supplied Basics and Advanced structure, with three modules per phase, 12 lectures per phase, and 150 minutes per lecture.
- Minimal white and sky-blue visual theme with a useful course overview, plain-language CTAs and responsive layouts.
- Keyboard-accessible curriculum level tabs, expandable modules, categorised FAQ accordions and mobile navigation with Escape-to-close support.
- Seamless 13-platform logo marquee using locally hosted SVGs, a pause control, hover pause and reduced-motion support. Logo attribution is documented in `public/logos/README.md`.
- Downloadable full curriculum in `public/stalite-academy-curriculum.txt`.
- Enquiry CTAs open WhatsApp with a pre-filled course message. No enquiry data is stored by this page.
- Phone, email and office address sourced from https://www.stalite.in/contact on 25 October 2026.
- Fees, batch dates and class format are not invented and are directed to the admissions contact.
- Header and footer use the user-supplied Stalite logo at `https://www.stalite.in/logo.png`. Their Academy label is intentionally pulled close to the mark across desktop and mobile layouts. The browser loads the original logo directly; sandbox network restrictions prevent downloading a local copy.
- A locally bundled Stalite sparkle favicon is provided as SVG, ICO and Apple touch icon. Open Graph, WhatsApp and X/Twitter share cards use the same hero photograph, served directly from the public Supabase Storage object (no Image Transformations add-on required).
- Inter provides clean, block-style main typography; Playwrite US Modern provides restrained contemporary cursive accents. Both fonts are bundled locally using Fontsource, with system-font fallbacks.

## Deployment context

The user manages this project at https://vercel.com/owaiskhan722-6479s-projects/stalite-academy with automatic deployments from Git. Do not manually deploy or change Vercel settings unless explicitly requested.
