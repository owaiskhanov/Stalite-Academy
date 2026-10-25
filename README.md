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
- White and sky-blue visual theme with responsive layouts.
- Curriculum level tabs, expandable modules, categorised FAQ accordions and mobile navigation.
- Seamless 13-platform logo marquee using locally hosted SVGs, a pause control, hover pause and reduced-motion support. Logo attribution is documented in `public/logos/README.md`.
- Downloadable full curriculum in `public/stalite-academy-curriculum.txt`.
- Enquiry CTAs open WhatsApp with a pre-filled course message. No enquiry data is stored by this page.
- Phone, email and office address sourced from https://www.stalite.in/contact on 25 October 2026.
- Fees, batch dates and class format are not invented and are directed to the admissions contact.
- Header and footer use the user-supplied Stalite logo at `https://www.stalite.in/logo.png`. The browser loads this original image directly; sandbox network restrictions prevent downloading a local copy.
- Inter provides clean, block-style main typography; Caveat provides modern handwritten cursive accents. Both fonts are bundled locally using Fontsource, with system-font fallbacks.

## Deployment context

The user manages this project at https://vercel.com/owaiskhan722-6479s-projects/stalite-academy with automatic deployments from Git. Do not manually deploy or change Vercel settings unless explicitly requested.
