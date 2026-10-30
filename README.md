# Stalite Academy

A responsive React landing page for Stalite Media's Digital Marketing and AI course.

## Development

```sh
npm install
npm run dev
```

The development server binds to `0.0.0.0:5173` for Arena preview access.

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist` directory as a static website.

## Pages

| Route | Source | What it is |
| --- | --- | --- |
| `/` | `index.html` → `src/main.jsx` | The landing page: hero, course-at-a-glance, three modules, curriculum band, FAQs. |
| `/cid` | `cid.html` → `src/cid.jsx` | "Curriculum in depth": six tracks as cards — Facebook Marketing and Instagram Marketing (ten expandable modules each), then Introduction to Performance Marketing (03), Meta Ads (04), Google Ads (05) and What Works for Actual Indian Clients (06), one module each. |

`/cid` is a second Vite entry (`build.rollupOptions.input` in `vite.config.js`)
rather than a client-side route, so it ships its own title, description,
canonical URL and structured data. Vercel serves it from `cid.html` because
`vercel.json` sets `cleanUrls: true`; a small dev/preview middleware in
`vite.config.js` mirrors that rewrite locally. `cid.css` holds everything
specific to the page, and the header ("solid" variant), footer and WhatsApp
links are shared from `src/SiteChrome.jsx`.

The syllabus content lives in `src/deepCurriculum.js` — edit module titles and
pointers there; counts on the page (modules, pointers, per-module totals) are
derived, so they stay in sync automatically. Modules carry an optional
`number` (the performance tracks use 03–06 from the syllabus); without it the
card numbers modules from 01.

## Content and interactions

- Presents the Basics curriculum, with three modules, 12 lectures and 150 minutes per lecture.
- Minimal white and sky-blue visual theme with a useful course overview, plain-language CTAs and responsive layouts.
- Keyboard-accessible expandable curriculum modules, categorised FAQ accordions and mobile navigation with Escape-to-close support.
- All text passes WCAG AA contrast (4.5:1 or better) on every surface it sits on, including the pastel course-card gradients and the tinted panels. Text colours come from the tokens at the top of `src/styles.css` (`--muted`, `--meta`, `--blue-text`, `--blue-dark`, `--icon`); `--blue` is reserved for brand fills, where white text would fall under 4.5:1. Links that sit inside a sentence also carry an underline, so they are not distinguished by colour alone.
- The curriculum band echoes the hero with a soft sky layer, the `paper-grain.svg` tile and white fades. Four treatments are available (see below).
- Seamless platform logo marquee using locally hosted SVGs, a pause control, hover pause and reduced-motion support. Logo attribution is documented in `public/logos/README.md`.
- Downloadable full curriculum in `public/stalite-academy-curriculum.txt`.
- Enquiry CTAs open WhatsApp with a pre-filled course message. No enquiry data is stored by this page.
- Phone, email and office address sourced from https://www.stalite.in/contact on 25 October 2026.
- Fees, batch dates and class format are not invented and are directed to the admissions contact.
- Header and footer use the user-supplied Stalite logo at `https://www.stalite.in/logo.png`. The header renders the full, uncropped mark white over the hero photo (with the Academy label pulled into the PNG's transparent right padding to stay close), while in the footer a CSS crop frame (`--logo-crop-zoom` in `src/styles.css`) trims that transparent padding so the original-colour mark sits flush beside the Academy label on its white background. The browser loads the original logo directly; sandbox network restrictions prevent downloading a local copy.
- A locally bundled Stalite sparkle favicon is provided as SVG, ICO and Apple touch icon. Open Graph, WhatsApp and X/Twitter share cards use the same hero photograph, served directly from the public Supabase Storage object (no Image Transformations add-on required).
- Inter provides clean, block-style main typography; Playwrite US Modern provides restrained contemporary cursive accents. Both fonts are bundled locally using Fontsource, with system-font fallbacks.

## Sky backgrounds

The curriculum band (`.curriculum-band`, `src/Curriculum.jsx`) picks up the
hero's sky treatment. Its `data-bg` attribute selects a treatment defined in
`src/styles.css`, with the `paper-grain.svg` tile layered on top.

**`.curriculum-band` — `?curriculum=`**

| `data-bg` | Treatment | Assets |
| --- | --- | --- |
| `sky` | The hero sky behind the whole band, softened so the white cards still separate. Default. | `public/backgrounds/sky-wash.jpg` |
| `horizon` | Sky behind the heading and level cards, dissolving to plain white before the dense module list. | `public/backgrounds/sky-wash.jpg` |
| `gradient` | The same palette as a CSS mesh gradient. No image request. | none |
| `sky-soft` | The sky photograph dialled almost to white. | `public/backgrounds/sky-wash.jpg` |

To change the default, edit the `curriculumBg` initial state in `src/main.jsx`.
Use `?curriculum=horizon` (or another key above) to pin a treatment, or
`?bg=options` to show a preview-only background switcher.

## Deployment context

The user manages this project at https://vercel.com/owaiskhan722-6479s-projects/stalite-academy with automatic deployments from Git. Do not manually deploy or change Vercel settings unless explicitly requested.
