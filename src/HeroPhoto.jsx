import { useState } from "react";

/**
 * Hero photograph, art-directed per breakpoint.
 *
 * The compressed originals live in public/hero/ and are produced by
 * `npm run compress:hero` (see scripts/compress-hero.mjs). A <picture> element
 * — rather than a CSS background — is what lets the browser download exactly
 * one file: AVIF where supported, WebP everywhere else, with a separate crop
 * for phones so faces stay in frame.
 *
 * The three breakpoints mirror src/styles.css: <=600px, 601-1023px, >=1024px.
 */

const BUCKET =
  "https://osarasctypsjozjdslpd.supabase.co/storage/v1/object/public/Academy";

/**
 * Until `npm run compress:hero` has been run (or if public/hero/ is ever
 * missing from a deploy), fall back to the uncompressed Supabase originals so
 * the hero never renders blank. Same crops as before the compression work.
 */
const REMOTE = {
  desktop: `${BUCKET}/Joyful%20Student%20Selfie%20Under%20Blue%20Skies.png`,
  mobile: `${BUCKET}/Cheerful%20Skyward%20Group%20Selfie.png`,
};

export default function HeroPhoto() {
  const [useRemote, setUseRemote] = useState(false);

  if (useRemote) {
    return (
      <picture>
        <source media="(max-width: 600px)" srcSet={REMOTE.mobile} />
        <img
          className="hero-photo"
          src={REMOTE.desktop}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    );
  }

  return (
    <picture>
      <source
        media="(max-width: 600px)"
        type="image/avif"
        srcSet="/hero/hero-mobile.avif"
      />
      <source
        media="(max-width: 600px)"
        type="image/webp"
        srcSet="/hero/hero-mobile.webp"
      />
      <source
        media="(max-width: 1023px)"
        type="image/avif"
        srcSet="/hero/hero-tablet.avif"
      />
      <source
        media="(max-width: 1023px)"
        type="image/webp"
        srcSet="/hero/hero-tablet.webp"
      />
      <source type="image/avif" srcSet="/hero/hero-desktop.avif" />
      <img
        className="hero-photo"
        src="/hero/hero-desktop.webp"
        alt=""
        aria-hidden="true"
        width="1920"
        height="1280"
        decoding="async"
        fetchPriority="high"
        onError={() => setUseRemote(true)}
      />
    </picture>
  );
}
