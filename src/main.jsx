import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  CalendarDays,
  Clock3,
  Megaphone,
  BarChart3,
  Code2,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/playwrite-us-modern/latin-400.css";
import "./styles.css";
import ToolMarquee from "./ToolMarquee";
import FAQs from "./FAQs";
import Curriculum from "./Curriculum";
import CourseCard from "./CourseCard";

const whatsapp =
  "https://wa.me/919860685430?text=" +
  encodeURIComponent("Hi Stalite Media, I'd like to discuss growing my brand.");
/** Same enquiry, pre-filled with the specific course the visitor clicked. */
const whatsappForCourse = (title) =>
  "https://wa.me/919860685430?text=" +
  encodeURIComponent(
    `Hi Stalite Media, I'd like to discuss growing my brand. I'm interested in the ${title} course.`,
  );
const subjects = [
  [Megaphone, "Social media", "Create content. Build a presence."],
  [BarChart3, "Performance & search", "Understand ads, SEO and AISO."],
  [Code2, "AI-powered development", "Build websites and web apps."],
];

/**
 * The three modules of the 3-month programme, shaped for CourseCard.
 * Titles and descriptions mirror src/curriculum.js. Ratings and durations
 * are sample figures — swap them for real data before launch.
 */
const courses = [
  {
    title: "Social Media Marketing",
    description:
      "Profiles, content calendars and growth across every major platform.",
    image: "/courses/social-media.webp",
    imageAlt: "3D illustration of a megaphone with floating social icons",
    tags: ["Popular", "Online"],
    rating: 4.8,
    duration: "20h",
    certificate: true,
    instructor: "Shaad Karmally",
    instructorRole: "Instructor",
    instructorAvatar:
      "https://osarasctypsjozjdslpd.supabase.co/storage/v1/object/public/Stalite%20Media/Stalite%20Agency/Team/Shaad%201.jpg",
    variant: "mint",
    ctaHref: whatsappForCourse("Social Media Marketing"),
  },
  {
    title: "Performance Marketing & Search",
    description: "Meta Ads, Google Ads, SEO and AISO for 2026 and beyond.",
    image: "/courses/performance-search.webp",
    imageAlt: "3D illustration of a bar chart, magnifying glass and target",
    tags: ["Online"],
    rating: 4.9,
    duration: "20h",
    certificate: true,
    instructor: "Owais Khan",
    instructorRole: "Instructor",
    instructorAvatar:
      "https://osarasctypsjozjdslpd.supabase.co/storage/v1/object/public/Stalite%20Media/Stalite%20Agency/Team/Owais.png",
    variant: "peach",
    ctaHref: whatsappForCourse("Performance Marketing & Search"),
  },
  {
    title: "AI Powered Web Development",
    description: "Prompt AI tools to build websites, back ends and dashboards.",
    image: "/courses/ai-development.webp",
    imageAlt: "3D illustration of a robot head beside code windows",
    tags: ["New", "Online"],
    rating: 4.8,
    duration: "20h",
    certificate: true,
    instructor: "Owais Khan",
    instructorRole: "Instructor",
    instructorAvatar:
      "https://osarasctypsjozjdslpd.supabase.co/storage/v1/object/public/Stalite%20Media/Stalite%20Agency/Team/Owais.png",
    variant: "lavender",
    ctaHref: whatsappForCourse("AI Powered Web Development"),
  },
];

function Brand({ footer = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#course"
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
 * Background treatments for the "Learn how it comes together" band. Each key
 * maps to a `data-bg` rule in styles.css. Append ?bg=<key> to the URL to pin
 * one, or ?bg=options to get a switcher and flip between them in place.
 */
const backgroundOptions = [
  { key: "sky", label: "Sky wash" },
  { key: "gradient", label: "Gradient" },
  { key: "network", label: "Network" },
  { key: "sky-soft", label: "Sky soft" },
];

function App() {
  const [menu, setMenu] = useState(false);
  const [whyBg, setWhyBg] = useState("sky");
  const [bgChooser, setBgChooser] = useState(false);
  const menuToggle = useRef(null);
  useEffect(() => {
    const choice = new URLSearchParams(window.location.search).get("bg");
    if (!choice) return;
    if (choice === "options") setBgChooser(true);
    else if (backgroundOptions.some(({ key }) => key === choice))
      setWhyBg(choice);
  }, []);
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
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="header">
        <div className="container nav">
          <Brand />
          <nav
            id="main-navigation"
            className={`nav-links ${menu ? "mobile-open" : ""}`}
            aria-label="Main navigation"
          >
            {[
              ["The course", "#course"],
              ["Curriculum", "#curriculum"],
              ["FAQs", "#faqs"],
            ].map(([name, href]) => (
              <a href={href} key={href} onClick={() => setMenu(false)}>
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
      <main id="main-content">
        <section
          className="hero-section"
          id="course"
          aria-labelledby="course-heading"
        >
          <div className="hero container">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" /> A WEEKEND COURSE BY STALITE
                MEDIA
              </div>
              <h1 id="course-heading">
                Digital marketing. AI, <span className="serif">made simple.</span>
              </h1>
              {/* Hidden on desktop; mobile centres the hero and shows this CTA. */}
              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask about the next batch <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="program-section container" id="program" aria-label="Course overview">
          <div className="program-overview">
            <div className="program-duration">
              <div className="program-card-top">
                <span className="eyebrow">YOUR COURSE AT A GLANCE</span>
                <span className="program-tag">Basics → Advanced</span>
              </div>
              <strong>3 months</strong>
              <span>Built around your weekends.</span>
            </div>
            <div className="program-facts">
              <span>
                <CalendarDays size={17} /> Saturdays & Sundays
              </span>
              <span>
                <Clock3 size={17} /> 2 hr 30 min per lecture
              </span>
            </div>
            <div className="program-totals">
              <div>
                <strong>24</strong>
                <span>lectures</span>
              </div>
              <div>
                <strong>60</strong>
                <span>learning hours</span>
              </div>
              <div>
                <strong>3</strong>
                <span>focused modules</span>
              </div>
            </div>
            <a className="program-link" href="#curriculum">
              Explore the full curriculum <ArrowRight size={16} />
            </a>
          </div>
        </section>
        <section className="courses-section container" id="courses" aria-labelledby="courses-heading">
          <h2 id="courses-heading" className="courses-heading">
            The three <span className="serif">modules.</span>
          </h2>
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </section>
        <ToolMarquee />

        <Curriculum />
        <section
          className="why-section"
          id="why-stalite"
          data-bg={whyBg}
        >
          {bgChooser && (
            <div
              className="bg-chooser"
              role="group"
              aria-label="Background options"
            >
              <span className="bg-chooser-label">Background</span>
              {backgroundOptions.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={whyBg === key}
                  onClick={() => setWhyBg(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <div className="container section-space">
            <div className="section-intro">
              <div>
                <div className="eyebrow">BUILT BY STALITE MEDIA</div>
                <h2>
                  Learn how it <span className="serif">comes together.</span>
                </h2>
                <p>
                  Social media, paid campaigns and development. Connected in one
                  course.
                </p>
              </div>
              <a
                className="text-link"
                href="https://www.stalite.in/"
                target="_blank"
                rel="noreferrer"
              >
                Meet the agency <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="benefit-grid">
              {subjects.map(([Icon, title, text]) => (
                <article className="benefit" key={title}>
                  <Icon size={23} strokeWidth={1.6} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <FAQs whatsapp={whatsapp} />
        <section className="cta-section container">
          <div>
            <div className="eyebrow">YOUR NEXT STEP</div>
            <h2>
              Let’s find your <span className="serif">starting point.</span>
            </h2>
            <p>Ask us about course fees, batch dates and class format.</p>
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
      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Brand footer />
            <p>
              Digital marketing & AI, by Stalite Media. A 3-month weekend
              course built by the agency that runs the campaigns.
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
            <a href="#course">The course</a>
            <a href="#courses">The modules</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#faqs">FAQs</a>
          </nav>
          <div className="footer-col">
            <span className="eyebrow">THE PROGRAMME</span>
            <span>3 months · weekends</span>
            <span>24 lectures · 60 hours</span>
            <span>Basics → Advanced</span>
            <a href="#program">Course at a glance</a>
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
            <span>3 months. New possibilities.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
