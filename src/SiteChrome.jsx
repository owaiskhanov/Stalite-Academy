import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

/* ---------------------------------------------------------------------------
   Shared site chrome.

   The header, the footer and the WhatsApp links are identical on the landing
   page and on /cid, so they live here and both pages render the same markup.
   `page` tells the chrome where it is: "home" keeps the in-page anchors
   (#course), "cid" points those same links back at "/#course" so they still
   work from the curriculum page.
--------------------------------------------------------------------------- */

export const whatsapp =
  "https://wa.me/919860685430?text=" +
  encodeURIComponent("Hi Stalite Media, I'd like to discuss growing my brand.");

/** Same enquiry, pre-filled with the specific course the visitor clicked. */
export const whatsappForCourse = (title) =>
  "https://wa.me/919860685430?text=" +
  encodeURIComponent(
    `Hi Stalite Media, I'd like to discuss growing my brand. I'm interested in the ${title} course.`,
  );

export function Brand({ footer = false, href = "#course" }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href={href}
      aria-label="Stalite Academy home"
    >
      {failed ? (
        <span className="brand-fallback">
          stalite<span>.</span>
        </span>
      ) : (
        /* Crop frame: in the footer this clips the transparent padding
           baked into logo.png so the mark sits flush to the lockup edges;
           the header bypasses the crop in CSS (see .brand-media / .nav). */
        <span className="brand-media">
          <img
            className="brand-image"
            src="https://www.stalite.in/logo.png"
            alt="Stalite Media"
            width="132"
            height="42"
            onError={() => setFailed(true)}
          />
        </span>
      )}
      <span className="brand-academy">ACADEMY</span>
    </a>
  );
}

/**
 * Navigation, in order. "Curriculum in depth" sits first — ahead of the
 * landing-page links — and points at /cid.
 */
const navItems = (page) => [
  { name: "Curriculum in depth", href: "/cid", route: "cid" },
  { name: "The course", href: page === "home" ? "#course" : "/#course" },
  { name: "Curriculum", href: page === "home" ? "#curriculum" : "/#curriculum" },
  { name: "FAQs", href: page === "home" ? "#faqs" : "/#faqs" },
];

export function SiteHeader({ page = "home" }) {
  const [menu, setMenu] = useState(false);
  const menuToggle = useRef(null);

  useEffect(() => {
    function dismiss(e) {
      if (e.key === "Escape" && menu) {
        setMenu(false);
        menuToggle.current?.focus();
      }
    }
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [menu]);

  return (
    <header className={`header ${page === "cid" ? "header-solid" : ""}`}>
      <div className="container nav">
        <Brand href={page === "home" ? "#course" : "/"} />
        <nav
          id="main-navigation"
          className={`nav-links ${menu ? "mobile-open" : ""}`}
          aria-label="Main navigation"
        >
          {navItems(page).map(({ name, href, route }) => (
            <a
              href={href}
              key={href}
              onClick={() => setMenu(false)}
              aria-current={route === page ? "page" : undefined}
            >
              {name}
            </a>
          ))}
        </nav>
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="button button-small nav-cta"
        >
          Enquire now <ArrowUpRight size={15} />
        </a>
        <button
          ref={menuToggle}
          className="mobile-toggle"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          aria-controls="main-navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

export function SiteFooter({ page = "home" }) {
  const anchor = (hash) => (page === "home" ? hash : `/${hash}`);
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand footer href={page === "home" ? "#course" : "/"} />
          <p>
            Digital marketing & AI, by Stalite Media. A weekend course built by
            the agency that runs the campaigns.
          </p>
          <a
            className="text-link footer-agency"
            href="https://www.stalite.in/"
            target="_blank"
            rel="noreferrer"
          >
            Visit Stalite Media <ArrowUpRight size={14} />
          </a>
        </div>
        <nav className="footer-col" aria-label="Footer">
          <span className="eyebrow">EXPLORE</span>
          <a href={anchor("#course")}>The course</a>
          <a href={anchor("#courses")}>The modules</a>
          <a href={anchor("#curriculum")}>Curriculum</a>
          <a href="/cid">Curriculum in depth</a>
          <a href={anchor("#faqs")}>FAQs</a>
        </nav>
        <div className="footer-col">
          <span className="eyebrow">THE PROGRAMME</span>
          <span>Weekend course</span>
          <span>12 lectures · 30 hours</span>
          <span>Basics</span>
          <a href={anchor("#program")}>Course at a glance</a>
        </div>
        <div className="footer-col footer-contact">
          <span className="eyebrow">GET IN TOUCH</span>
          <a href="tel:+919860685430">
            <Phone size={14} /> +91 98606 85430
          </a>
          <a href="mailto:stalitemedia@gmail.com">
            <Mail size={14} /> stalitemedia@gmail.com
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Stalite+Media+Office+No.+305+Reliable+Business+Centre+Oshiwara+Andheri+West+Mumbai+Maharashtra+400102"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={15} />
            <span>
              Office No. 305, Reliable Business Centre,
              <br />
              Oshiwara, Andheri West, Mumbai,
              <br />
              Maharashtra 400102
            </span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-row">
          <span>© {new Date().getFullYear()} Stalite Academy.</span>
          <span>Learn. Build. Grow.</span>
        </div>
      </div>
    </footer>
  );
}
