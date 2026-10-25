import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Download,
  Plus,
  Menu,
  X,
  Check,
  CalendarDays,
  Clock3,
  Layers,
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
import { curriculum } from "./curriculum";

const whatsapp =
  "https://wa.me/919860685430?text=" +
  encodeURIComponent(
    "Hi Stalite Academy! I’m interested in the 3-month Digital Marketing & AI course. Please share the fees, next batch dates and class format.",
  );
const subjects = [
  [Megaphone, "Social media", "Create content. Build a presence."],
  [BarChart3, "Performance & search", "Understand ads, SEO and AISO."],
  [Code2, "AI-powered development", "Build websites and web apps."],
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
        <img
          className="brand-image"
          src="https://www.stalite.in/logo.png"
          alt="Stalite Media"
          width="132"
          height="42"
          onError={() => setFailed(true)}
        />
      )}
      <span className="brand-academy">ACADEMY</span>
    </a>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [level, setLevel] = useState("basics");
  const [open, setOpen] = useState(0);
  const menuToggle = useRef(null);
  const tabs = useRef([]);
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
  function selectLevel(value) {
    setLevel(value);
    setOpen(value === "basics" ? 0 : 1);
  }
  function navigateTabs(event, index) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
    selectLevel(next === 0 ? "basics" : "advanced");
    tabs.current[next]?.focus();
  }
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
                Digital marketing.
                <br />
                AI, <span className="serif">made simple.</span>
              </h1>
              <p className="hero-description">
                Learn to market, run campaigns and build with AI.
                <br className="desktop-break" /> Start with the basics. Grow
                into the advanced.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask about the next batch <ArrowUpRight size={17} />
                </a>
                <a className="text-link" href="#curriculum">
                  See what you’ll learn <ArrowRight size={16} />
                </a>
              </div>
              <p className="hero-note">
                For students, creators, professionals and business owners.
              </p>
            </div>
            <aside className="program-card" aria-label="Course overview">
              <div className="program-card-top">
                <span className="eyebrow">YOUR COURSE AT A GLANCE</span>
                <span className="program-tag">Basics → Advanced</span>
              </div>
              <div className="program-duration">
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
            </aside>
          </div>
        </section>
        <ToolMarquee />
        <section
          className="curriculum-section container section-space"
          id="curriculum"
          aria-labelledby="curriculum-heading"
        >
          <div className="section-intro">
            <div>
              <div className="eyebrow">WHAT YOU’LL LEARN</div>
              <h2 id="curriculum-heading">
                One course. <span className="serif">Two levels.</span>
              </h2>
              <p>
                Three modules in each phase, from foundations to advanced
                skills.
              </p>
            </div>
            <a
              className="download-link"
              href="/stalite-academy-curriculum.txt"
              download
            >
              <Download size={16} /> Download syllabus
            </a>
          </div>
          <div className="curriculum-layout">
            <aside className="course-sidebar">
              <div
                className="level-switch"
                role="tablist"
                aria-label="Curriculum level"
              >
                {[
                  ["basics", "Basics", "01"],
                  ["advanced", "Advanced", "02"],
                ].map(([value, label, number], i) => (
                  <button
                    key={value}
                    ref={(el) => (tabs.current[i] = el)}
                    id={`tab-${value}`}
                    role="tab"
                    aria-selected={level === value}
                    aria-controls="curriculum-panel"
                    tabIndex={level === value ? 0 : -1}
                    className={level === value ? "active" : ""}
                    onClick={() => selectLevel(value)}
                    onKeyDown={(e) => navigateTabs(e, i)}
                  >
                    <span className="level-number">{number}</span>
                    <span>{label}</span>
                    <ArrowRight size={16} />
                  </button>
                ))}
              </div>
              <div className="level-summary">
                <h3>
                  {level === "basics"
                    ? "Start with the essentials."
                    : "Take your skills further."}
                </h3>
                <p>
                  {level === "basics"
                    ? "Understand the tools and build a strong foundation across all three modules."
                    : "Go deeper into campaigns, search and AI-powered development."}
                </p>
                <div>
                  <span>
                    <Layers size={15} /> 12 lectures
                  </span>
                  <span>
                    <Clock3 size={15} /> 30 hours
                  </span>
                </div>
                <small>1,800 minutes per phase</small>
              </div>
            </aside>
            <div
              id="curriculum-panel"
              className="module-list"
              role="tabpanel"
              aria-labelledby={`tab-${level}`}
              tabIndex={0}
            >
              {curriculum[level].map((module, i) => (
                <article
                  className={`module ${open === i ? "module-open" : ""}`}
                  key={`${level}-${i}`}
                >
                  <h3>
                    <button
                      className="module-toggle"
                      id={`module-heading-${level}-${i}`}
                      aria-expanded={open === i}
                      aria-controls={`module-${level}-${i}`}
                      onClick={() => setOpen(open === i ? null : i)}
                    >
                      <span className="module-icon">
                        <module.icon size={20} />
                      </span>
                      <span className="module-name">{module.name}</span>
                      <Plus className="module-plus" size={18} />
                    </button>
                  </h3>
                  <div
                    className="module-content"
                    id={`module-${level}-${i}`}
                    role="region"
                    aria-labelledby={`module-heading-${level}-${i}`}
                    hidden={open !== i}
                  >
                    {module.note ? (
                      <p className="pending-note">{module.note}</p>
                    ) : (
                      <ul>
                        {module.topics.map((topic) => (
                          <li key={topic}>
                            <Check size={14} />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
              <p className="curriculum-note">
                24 lectures in total · 150 minutes each · 3,600 minutes of
                learning
              </p>
            </div>
          </div>
        </section>
        <section className="why-section" id="why-stalite">
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
      <footer className="container footer">
        <div className="footer-main">
          <div>
            <Brand footer />
            <p>Digital marketing & AI, by Stalite Media.</p>
            <a
              className="text-link footer-agency"
              href="https://www.stalite.in/"
              target="_blank"
              rel="noreferrer"
            >
              Visit Stalite Media <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="footer-links">
            <span className="eyebrow">EXPLORE</span>
            <a href="#course">The course</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#faqs">FAQs</a>
          </div>
          <div className="footer-contact">
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
          <span>© {new Date().getFullYear()} Stalite Academy.</span>
          <span>3 months. New possibilities.</span>
        </div>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
