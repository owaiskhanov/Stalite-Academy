# Stalite Academy

A responsive React landing page for Stalite Media's 3-month Digital Marketing and AI course.

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

## Content and interactions

- Preserves the supplied Basics and Advanced structure, with three modules per phase, 12 lectures per phase, and 150 minutes per lecture.
- Minimal white and sky-blue visual theme with a useful course overview, plain-language CTAs and responsive layouts.
- Keyboard-accessible curriculum level tabs, expandable modules, categorised FAQ accordions and mobile navigation with Escape-to-close support.
- All text passes WCAG AA contrast (4.5:1 or better) on every surface it sits on, including the pastel course-card gradients and the tinted panels. Text colours come from the tokens at the top of `src/styles.css` (`--muted`, `--meta`, `--blue-text`, `--blue-dark`, `--icon`); `--blue` is reserved for brand fills, where white text would fall under 4.5:1. Links that sit inside a sentence also carry an underline, so they are not distinguished by colour alone.
- The "Learn how it comes together" and "One course. Two levels." bands echo the hero: a soft sky layer under the copy, the same `paper-grain.svg` tile and 0.1 opacity on top, and white fades at the top and bottom edges so the band dissolves into the sections either side. Four treatments are built (see below) and one is picked per page.
- Seamless 13-platform logo marquee using locally hosted SVGs, a pause control, hover pause and reduced-motion support. Logo attribution is documented in `public/logos/README.md`.
- Downloadable full curriculum in `public/stalite-academy-curriculum.txt`.
- Enquiry CTAs open WhatsApp with a pre-filled course message. No enquiry data is stored by this page.
- Phone, email and office address sourced from https://www.stalite.in/contact on 25 October 2026.
- Fees, batch dates and class format are not invented and are directed to the admissions contact.
- Header and footer use the user-supplied Stalite logo at `https://www.stalite.in/logo.png`. The header renders the full, uncropped mark white over the hero photo (with the Academy label pulled into the PNG's transparent right padding to stay close), while in the footer a CSS crop frame (`--logo-crop-zoom` in `src/styles.css`) trims that transparent padding so the original-colour mark sits flush beside the Academy label on its white background. The browser loads the original logo directly; sandbox network restrictions prevent downloading a local copy.
- A locally bundled Stalite sparkle favicon is provided as SVG, ICO and Apple touch icon. Open Graph, WhatsApp and X/Twitter share cards use the same hero photograph, served directly from the public Supabase Storage object (no Image Transformations add-on required).
- Inter provides clean, block-style main typography; Playwrite US Modern provides restrained contemporary cursive accents. Both fonts are bundled locally using Fontsource, with system-font fallbacks.

## Sky backgrounds

Two bands pick up the hero's weather: the "Learn how it comes together" band
(`.why-section`, `src/main.jsx`) and the "One course. Two levels." band
(`.curriculum-band`, `src/Curriculum.jsx`). Both are full-bleed sections whose
`data-bg` attribute selects a treatment defined in `src/styles.css`, and both
layer the hero's `paper-grain.svg` tile at the same `0.1` opacity on top.

**`.why-section` — `?bg=`**

| `data-bg` | Treatment | Assets |
| --- | --- | --- |
| `sky` | The hero sky photograph, softened. Default. | `public/backgrounds/sky-wash.jpg` |
| `gradient` | The same palette rebuilt as a CSS mesh gradient — no image request, scales to any height. | none |
| `network` | Faint linked outlines on paper white, a nod to the three connected modules. | `public/backgrounds/network-wash.jpg` |
| `sky-soft` | The sky photograph dialled back almost to white. | `public/backgrounds/sky-wash.jpg` |

**`.curriculum-band` — `?curriculum=`**

| `data-bg` | Treatment | Assets |
| --- | --- | --- |
| `sky` | The hero sky behind the whole band, softened so the white cards still separate. Default. | `public/backgrounds/sky-wash.jpg` |
| `horizon` | Sky behind the heading and level cards, dissolving to plain white before the dense module list. | `public/backgrounds/sky-wash.jpg` |
| `gradient` | The same palette as a CSS mesh gradient. No image request. | none |
| `sky-soft` | The sky photograph dialled almost to white. | `public/backgrounds/sky-wash.jpg` |

To change a shipped default, edit the matching `useState("sky")` value in
`src/main.jsx`. To compare treatments without touching code, append a query
string:

- `?bg=sky` / `?curriculum=horizon` (etc.) pin one treatment per band.
- `?bg=options` shows a small two-row switcher so you can flip both bands in
  place. It only renders for that query string and never ships on the live page.

Both background images are 1536×864 JPEGs (132 KB and 80 KB) and sit below the
fold, so they never block first paint.

## Deployment context

The user manages this project at https://vercel.com/owaiskhan722-6479s-projects/stalite-academy with automatic deployments from Git. Do not manually deploy or change Vercel settings unless explicitly requested.
