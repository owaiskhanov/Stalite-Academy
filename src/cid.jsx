import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Layers,
  Plus,
  Target,
} from "lucide-react";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/playwrite-us-modern/latin-400.css";
import "./styles.css";
import "./cid.css";
import { SiteHeader, SiteFooter, whatsapp } from "./SiteChrome";
import { deepCurricula, pointerCount } from "./deepCurriculum";

const pad = (n) => String(n).padStart(2, "0");

/**
 * One curriculum card: a big bold platform title, the objective, and ten
 * dropdowns that hold every pointer in the module. Each card keeps its own
 * open set, so opening a Facebook module never closes an Instagram one.
 */
function CurriculumCard({ curriculum }) {
  const [open, setOpen] = useState(() => new Set([0]));
  const allOpen = open.size === curriculum.modules.length;
  const headingId = `cid-${curriculum.id}-title`;
  const total = pointerCount(curriculum);

  function toggle(index) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section
      className="cid-card"
      id={curriculum.id}
      data-platform={curriculum.id}
      aria-labelledby={headingId}
    >
      <header className="cid-card-head">
        <div className="cid-card-kicker">
          <span className="cid-index">{curriculum.index}</span>
          <span className="eyebrow">{curriculum.platform.toUpperCase()} TRACK</span>
          <span className="cid-kicker-rule" aria-hidden="true" />
          <span className="cid-kicker-meta">{curriculum.level}</span>
        </div>

        <h2 className="cid-card-title" id={headingId}>
          {curriculum.title}
        </h2>
        <p className="cid-card-subtitle">{curriculum.subtitle}</p>

        <p className="cid-objective">
          <Target size={16} aria-hidden="true" />
          <span>{curriculum.objective}</span>
        </p>

        <div className="cid-card-meta">
          <span className="cid-chip">
            <strong>{curriculum.modules.length}</strong> modules
          </span>
          <span className="cid-chip">
            <strong>{total}</strong> learning pointers
          </span>
          <span className="cid-chip">{curriculum.level}</span>
          <span className="cid-chip cid-chip-plain">{curriculum.provider}</span>
        </div>
      </header>

      <div className="cid-modules-head">
        <span className="eyebrow">MODULE BY MODULE</span>
        <button
          type="button"
          className="cid-expand-all"
          onClick={() =>
            setOpen(
              allOpen
                ? new Set()
                : new Set(curriculum.modules.map((_, index) => index)),
            )
          }
        >
          {allOpen ? "Collapse all" : "Expand all details"}
        </button>
      </div>

      <ol className="cid-modules">
        {curriculum.modules.map((module, index) => {
          const isOpen = open.has(index);
          const panelId = `cid-${curriculum.id}-panel-${index}`;
          const buttonId = `cid-${curriculum.id}-module-${index}`;
          return (
            <li
              className={`cid-module ${isOpen ? "is-open" : ""}`}
              key={module.title}
            >
              <h3 className="cid-module-heading">
                <button
                  type="button"
                  className="cid-module-toggle"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                >
                  <span className="cid-module-num" aria-hidden="true">
                    {module.number ?? pad(index + 1)}
                  </span>
                  <span className="cid-module-copy">
                    <span className="cid-module-title">{module.title}</span>
                    <span className="cid-module-count">
                      {module.pointers.length} pointers
                    </span>
                  </span>
                  <span className="cid-module-sign" aria-hidden="true">
                    <Plus size={17} />
                  </span>
                </button>
              </h3>
              <div
                className="cid-module-panel"
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
              >
                <ul>
                  {module.pointers.map((pointer) => (
                    <li key={pointer}>
                      <Check size={14} aria-hidden="true" />
                      <span>{pointer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <a className="cid-card-cta" href={whatsapp} target="_blank" rel="noreferrer">
        Ask about the {curriculum.platform} modules
        <ArrowUpRight size={16} />
      </a>
    </section>
  );
}

function CidPage() {
  const moduleTotal = deepCurricula.reduce(
    (sum, curriculum) => sum + curriculum.modules.length,
    0,
  );
  const pointerTotal = deepCurricula.reduce(
    (sum, curriculum) => sum + pointerCount(curriculum),
    0,
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader page="cid" />
      <main id="main-content">
        <section className="cid-hero" aria-labelledby="cid-heading">
          <div className="container">
            <a className="cid-back" href="/">
              <ArrowLeft size={15} /> Back to the course
            </a>
            <div className="eyebrow">
              <span className="status-dot" /> CURRICULUM IN DEPTH · STALITE
              ACADEMY
            </div>
            <h1 id="cid-heading">
              Everything the{" "}
              <span className="serif">curriculum</span> covers.
            </h1>
            <p className="cid-hero-copy">
              Three tracks — Facebook, Instagram and performance marketing with
              Meta Ads, Google Ads and ChatGPT-assisted creative — laid out
              module by module. Open any card to read the complete pointer list
              for that module, from account setup through to the final project.
            </p>
            <div className="cid-hero-stats">
              <span>
                <Layers size={15} aria-hidden="true" />
                <strong>{deepCurricula.length}</strong> tracks
              </span>
              <span>
                <strong>{moduleTotal}</strong> modules
              </span>
              <span>
                <strong>{pointerTotal}</strong> pointers
              </span>
            </div>

            <nav className="cid-jump" aria-label="Jump to a curriculum">
              {deepCurricula.map((curriculum) => (
                <a key={curriculum.id} href={`#${curriculum.id}`}>
                  <span className="cid-jump-index">{curriculum.index}</span>
                  <span className="cid-jump-name">
                    {curriculum.short ?? curriculum.platform}
                  </span>
                  <span className="cid-jump-count">
                    {curriculum.modules.length} modules
                  </span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="container cid-cards">
          {deepCurricula.map((curriculum) => (
            <CurriculumCard key={curriculum.id} curriculum={curriculum} />
          ))}
        </div>

        <section className="cta-section container">
          <div>
            <div className="eyebrow">READY TO START</div>
            <h2>
              Pick a track and{" "}
              <span className="serif">build the page.</span>
            </h2>
            <p>Ask us about fees, batch dates and the Weekend format.</p>
          </div>
          <a
            className="button button-primary"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Talk to Stalite Academy <ArrowUpRight size={17} />
          </a>
        </section>
      </main>
      <SiteFooter page="cid" />
    </>
  );
}

export { CidPage };

/* Guarded so the page can also be rendered outside the browser (build-time
   checks and tests); in the browser it mounts as usual. */
if (typeof document !== "undefined") {
  const mount = document.getElementById("root");
  if (mount) createRoot(mount).render(<CidPage />);
}
