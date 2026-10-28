import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  CalendarDays,
  Clock3,
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
/**
 * The three modules of the programme, shaped for CourseCard.
 * Titles and descriptions mirror src/curriculum.js. Ratings are sample
 * figures — swap them for real data before launch.
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

/** Curriculum background treatments, selectable with ?curriculum=<key>. */
/* The curriculum band is much taller, so it gets a horizon treatment that keeps
   the sky behind the heading and lets the white cards sit on plain white. */
const curriculumOptions = [
  { key: "sky", label: "Sky wash" },
  { key: "horizon", label: "Horizon" },
  { key: "gradient", label: "Gradient" },
  { key: "sky-soft", label: "Sky soft" },
];

/** Preview-only switcher; rendered when the URL carries ?bg=options. */
function BgChooser({ groups }) {
  return (
    <div className="bg-chooser" role="group" aria-label="Background options">
      {groups.map(({ label, value, options, onChange }) => (
        <div className="bg-chooser-row" key={label}>
          <span className="bg-chooser-label">{label}</span>
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              aria-pressed={value === option.key}
              onClick={() => onChange(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [curriculumBg, setCurriculumBg] = useState("sky");
  const [bgChooser, setBgChooser] = useState(false);
  const menuToggle = useRef(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const curriculum = params.get("curriculum");
    if (params.get("bg") === "options") setBgChooser(true);
    if (curriculumOptions.some(({ key }) => key === curriculum))
      setCurriculumBg(curriculum);
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
      {bgChooser && (
        <BgChooser
          groups={[
            {
              label: "Curriculum",
              value: curriculumBg,
              options: curriculumOptions,
              onChange: setCurriculumBg,
            },
          ]}
        />
      )}
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
                Build with AI and learn digital marketing.
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
                <span className="program-tag">Basics</span>
              </div>
              <strong>Basics</strong>
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
                <strong>12</strong>
                <span>lectures</span>
              </div>
              <div>
                <strong>30</strong>
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

        <Curriculum bg={curriculumBg} />
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
              Digital marketing & AI, by Stalite Media. A weekend
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
            <span>Weekend course</span>
            <span>12 lectures · 30 hours</span>
            <span>Basics</span>
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
            <span>Learn. Build. Grow.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
