import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  Menu,
  X,
  Check,
  Clock3,
  CalendarDays,
  Sparkles,
  Code2,
  BarChart3,
  Megaphone,
  MapPin,
  Mail,
  Phone,
  MousePointer2,
  Layers,
  Target,
  Zap,
} from "lucide-react";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/caveat/latin-500.css";
import "./styles.css";
import ToolMarquee from "./ToolMarquee";
import FAQs from "./FAQs";
const whatsapp =
  "https://wa.me/919860685430?text=" +
  encodeURIComponent(
    "Hi Stalite Academy! I would like to know more about the 3-month Digital Marketing & AI course. Please share the fees, next batch dates and class format.",
  );
const curriculum = {
  basics: [
    {
      name: "Social Media Marketing",
      icon: Megaphone,
      topics: [
        "Google Business Profile: setup, optimisation, citations, posts, reviews",
        "Video marketing and YouTube optimisation",
        "Mobile marketing and SMS marketing",
        "Social media optimisation: profiles, content calendar, engagement, analytics",
        "Facebook marketing",
        "Instagram marketing: profile, content strategy, influencers, paid ads",
        "LinkedIn marketing",
        "X (Twitter) marketing",
        "Email marketing",
        "Affiliate marketing",
        "Online reputation management",
        "Freelancing, agency pricing, and certification prep",
      ],
    },
    {
      name: "Performance Marketing and Search",
      icon: BarChart3,
      topics: [
        "Meta Ads: account creation, connecting WhatsApp and Instagram, types of ads, creating campaigns",
        "Google Ads: account creation and campaigns",
        "SEO: what it is, how it pulls data, why it matters in 2026 and beyond, keyword research",
      ],
    },
    {
      name: "AI Powered Website and Web App Development",
      icon: Code2,
      topics: [
        "Web fundamentals and prompting AI tools",
        "Building websites with Antigravity",
      ],
    },
  ],
  advanced: [
    {
      name: "Social Media Marketing",
      icon: Megaphone,
      topics: [],
      note: "No content yet.",
    },
    {
      name: "Performance Marketing and Search",
      icon: BarChart3,
      topics: [
        "Meta Ads: campaign types, ad sets (audience and demographics), ad formats (carousel, multi, static, video)",
        "Google Ads structure and campaign setup",
        "Applying keyword research to a website (live demo), blogs and conversational blogs",
        "AISO and why it matters in 2026 and beyond",
        "Google Search Console connection and walkthrough",
        "Q&A and problem solving",
      ],
    },
    {
      name: "AI Powered Website and Web App Development",
      icon: Code2,
      topics: [
        "Front end and responsive design with prompting",
        "Back end: Google Cloud, Firebase, OAuth, storage",
        "Databases: Supabase and Firebase",
        "Dashboards and data visualisation",
      ],
    },
  ],
};
function Brand({ footer = false }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#"
      aria-label="Stalite Academy home"
    >
      <img
        className="brand-image"
        src="https://www.stalite.in/logo.png"
        alt="Stalite Media"
        width="140"
        height="48"
      />
      <span className="brand-academy">ACADEMY</span>
    </a>
  );
}
function App() {
  const [menu, setMenu] = useState(false),
    [level, setLevel] = useState("basics"),
    [open, setOpen] = useState(0);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="header">
        <div className="container nav">
          <Brand />
          <nav
            className={menu ? "nav-links mobile-open" : "nav-links"}
            aria-label="Main navigation"
          >
            {[
              ["The course", "#course"],
              ["Curriculum", "#curriculum"],
              ["Why Stalite?", "#why-stalite"],
              ["FAQs", "#faqs"],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a
            className="button nav-cta"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Let’s talk <ArrowUpRight size={16} />
          </a>
          <button
            className="mobile-toggle"
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main-content">
        <section className="hero container" id="course">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE
            </div>
            <h1>
              Don’t just scroll.
              <br />
              Learn to{" "}
              <span className="serif">
                make
                <br className="desktop-break" /> an impact.
              </span>
              <span className="headline-star">✳</span>
            </h1>
            <p className="hero-description">
              Digital marketing meets the power of AI.
              <br />A 3-month weekend course to turn your curiosity
              <br className="desktop-break" /> into skills you can actually use.
            </p>
            <div className="hero-actions">
              <a
                className="button button-dark"
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                Find your next move <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#curriculum">
                Explore the curriculum <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-note">
              <span className="tiny-spark">✧</span> Built by an agency. Designed
              for the real world.
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Illustration of digital marketing and AI learning tools"
          >
            <div className="art-grid" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="floating-label top-label">
              <span className="status-dot" /> FROM CURIOUS TO CAPABLE
            </div>
            <div className="floating-card social-card">
              <div className="card-icon">
                <Megaphone size={20} />
              </div>
              <div>
                <small>Make some noise.</small>
                <strong>Social media that connects.</strong>
              </div>
              <div className="social-icons">
                <span>in</span>
                <span>◎</span>
                <span>▶</span>
                <span>𝕏</span>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-header">
                <span>
                  <span className="mini-star">✳</span> Your growth, in motion
                </span>
                <span className="window-dots">•••</span>
              </div>
              <div className="dashboard-body">
                <div className="dashboard-title">
                  THE POSSIBILITIES?
                  <ArrowUpRight size={16} />
                </div>
                <div className="growth-title">
                  Unlimited<span>↗</span>
                </div>
                <div className="chart">
                  <div className="chart-lines" />
                  <svg viewBox="0 0 330 110" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#a6dfff"
                          stopOpacity=".65"
                        />
                        <stop
                          offset="100%"
                          stopColor="#a6dfff"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 100 C25 100 26 70 53 77 S85 100 110 63 S145 82 165 48 S200 70 225 30 S260 50 282 17 S310 25 330 2 L330 110 L0 110Z"
                      fill="url(#area)"
                    />
                    <path
                      d="M0 100 C25 100 26 70 53 77 S85 100 110 63 S145 82 165 48 S200 70 225 30 S260 50 282 17 S310 25 330 2"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="chart-bottom">
                    <span>DAY ONE</span>
                    <span>YOUR NEXT CHAPTER</span>
                  </div>
                </div>
                <div className="dashboard-bottom">
                  <span>
                    <span className="status-dot" /> Skills that compound
                  </span>
                  <span>↗</span>
                </div>
              </div>
            </div>
            <div className="floating-card ai-card">
              <div className="ai-top">
                <div className="ai-icon">
                  <Sparkles size={21} />
                </div>
                <span>YOUR IDEAS. SUPERCHARGED.</span>
              </div>
              <strong>
                Think it. Prompt it.
                <br />
                Build it.
              </strong>
              <div className="code-pill">
                <Code2 size={14} /> Powered by you + AI
                <span className="code-cursor" />
              </div>
            </div>
            <div className="cursor-label">
              <MousePointer2 size={26} fill="#0369a1" />
              <span>Future you</span>
            </div>
            <div className="art-caption">
              <span>STRATEGY</span>
              <span className="caption-plus">+</span>
              <span>CREATIVITY</span>
              <span className="caption-plus">+</span>
              <span>AI</span>
            </div>
            <span className="art-star">✳</span>
          </div>
        </section>
        <section className="facts container" aria-label="Course at a glance">
          {[
            [CalendarDays, "3 months", "A little time. A big shift."],
            [Layers, "24 lectures", "Basics to advanced."],
            [Clock3, "60 learning hours", "150 minutes per lecture."],
            [Zap, "Weekend classes", "Saturdays & Sundays."],
          ].map(([Icon, title, sub]) => (
            <div className="fact" key={title}>
              <Icon size={22} strokeWidth={1.5} />
              <div>
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
            </div>
          ))}
        </section>
        <ToolMarquee />
        <section
          className="curriculum-section container section-space"
          id="curriculum"
        >
          <div className="section-intro">
            <div>
              <div className="eyebrow">THE LEARNING ROADMAP</div>
              <h2>
                A strong foundation.
                <br />
                <span className="serif">Then, a bigger playground.</span>
              </h2>
            </div>
            <p>
              From your first campaign to your first web app.
              <br />
              Three focused modules. Two levels. One clear direction.
            </p>
          </div>
          <div className="curriculum-layout">
            <aside className="course-sidebar">
              <div
                className="level-switch"
                role="tablist"
                aria-label="Curriculum level"
              >
                <button
                  role="tab"
                  aria-selected={level === "basics"}
                  className={level === "basics" ? "active" : ""}
                  onClick={() => {
                    setLevel("basics");
                    setOpen(0);
                  }}
                >
                  01 <span>Basics</span>
                  <ArrowUpRight size={17} />
                </button>
                <button
                  role="tab"
                  aria-selected={level === "advanced"}
                  className={level === "advanced" ? "active" : ""}
                  onClick={() => {
                    setLevel("advanced");
                    setOpen(1);
                  }}
                >
                  02 <span>Advanced</span>
                  <ArrowUpRight size={17} />
                </button>
              </div>
              <div className="level-summary">
                <span className="small-caps">
                  {level === "basics"
                    ? "START WITH THE ESSENTIALS"
                    : "TAKE YOUR SKILLS FURTHER"}
                </span>
                <p>
                  {level === "basics"
                    ? "Get your fundamentals right. Build the confidence to put them to work."
                    : "Go deeper into campaigns, search and building with AI."}
                </p>
                <div>
                  <span>
                    <Layers size={15} /> 12 lectures
                  </span>
                  <span>
                    <Clock3 size={15} /> 1,800 min
                  </span>
                </div>
              </div>
              <a
                href="/stalite-academy-curriculum.txt"
                download
                className="syllabus-link"
              >
                Download full curriculum <ArrowUpRight size={16} />
              </a>
            </aside>
            <div
              className="module-list"
              role="tabpanel"
              aria-label={`${level} curriculum`}
            >
              {curriculum[level].map((mod, i) => (
                <article
                  className={`module ${open === i ? "module-open" : ""}`}
                  key={level + i}
                >
                  <button
                    className="module-toggle"
                    aria-expanded={open === i}
                    aria-controls={`module-${level}-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span className="module-number">0{i + 1}</span>
                    <span className="module-icon">
                      <mod.icon size={20} />
                    </span>
                    <span className="module-name">{mod.name}</span>
                    <span className="expand-icon">
                      {open === i ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  {open === i && (
                    <div className="module-content" id={`module-${level}-${i}`}>
                      {mod.note ? (
                        <p className="pending-note">{mod.note}</p>
                      ) : (
                        <ul>
                          {mod.topics.map((topic) => (
                            <li key={topic}>
                              <Check size={14} />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
          <div className="curriculum-note">
            <span>
              <Sparkles size={17} /> Not just what to do. How to actually do it.
            </span>
            <span>24 lectures · 3,600 minutes · Built for what’s next</span>
          </div>
        </section>
        <section className="why-section" id="why-stalite">
          <div className="container section-space">
            <div className="section-intro">
              <div>
                <div className="eyebrow">LESS FLUFF. MORE DOING.</div>
                <h2>
                  Learn the skills.
                  <br />
                  <span className="serif">Not just the buzzwords.</span>
                </h2>
              </div>
              <a
                className="text-link"
                href="https://www.stalite.in/"
                target="_blank"
                rel="noreferrer"
              >
                Meet Stalite Media <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="benefit-grid">
              {[
                [
                  Target,
                  "01",
                  "Agency perspective.",
                  "A course by Stalite Media, a Mumbai agency working across social media, performance marketing and web development.",
                ],
                [
                  Code2,
                  "02",
                  "Marketing meets building.",
                  "Understand how to reach an audience, run campaigns and create the websites and web apps behind them.",
                ],
                [
                  CalendarDays,
                  "03",
                  "Make your weekends count.",
                  "A focused Saturday and Sunday schedule. Build new skills without putting the rest of your week on hold.",
                ],
              ].map(([Icon, num, title, body]) => (
                <article className="benefit" key={num}>
                  <div className="benefit-top">
                    <Icon size={26} strokeWidth={1.5} />
                    <span>{num}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="audience-section container section-space">
          <div className="audience-copy">
            <div className="eyebrow">COME AS YOU ARE</div>
            <h2>
              Your starting point?
              <br />
              <span className="serif">Curiosity is enough.</span>
            </h2>
            <p>
              You don’t need to have it all figured out.
              <br />
              Just a reason to get started.
            </p>
          </div>
          <div className="audience-list">
            {[
              [
                "Students & fresh thinkers",
                "Explore a future in digital marketing and AI.",
              ],
              [
                "Creators & aspiring freelancers",
                "Turn your ideas into a practical skill set.",
              ],
              [
                "Business owners & professionals",
                "Understand the tools that can move your business forward.",
              ],
            ].map(([title, body]) => (
              <div key={title}>
                <span className="audience-check">
                  <Check size={16} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <ArrowUpRight size={19} />
              </div>
            ))}
          </div>
        </section>
        <FAQs whatsapp={whatsapp} />
        <section className="cta-section container">
          <div className="cta-decoration" aria-hidden="true">
            ✳
          </div>
          <div className="eyebrow">
            <span className="status-dot" /> LESS “SOMEDAY”. MORE DAY ONE.
          </div>
          <h2>
            Your next chapter
            <br />
            starts with <span className="serif">one conversation.</span>
          </h2>
          <p>Let’s talk about the course, your goals, and what comes next.</p>
          <a
            className="button button-sky"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Let’s get you started <ArrowUpRight size={19} />
          </a>
          <div className="cta-small">No pressure. Just possibilities.</div>
        </section>
      </main>
      <footer className="container footer">
        <div className="footer-main">
          <div>
            <Brand footer />
            <p>
              A new skill set. A new perspective.
              <br />
              An academy by{" "}
              <a
                href="https://www.stalite.in/"
                target="_blank"
                rel="noreferrer"
              >
                Stalite Media <ArrowUpRight size={12} />
              </a>
            </p>
          </div>
          <div className="footer-links">
            <span className="small-caps">TAKE A LOOK</span>
            <a href="#course">The course</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#faqs">FAQs</a>
          </div>
          <div className="footer-contact">
            <span className="small-caps">LET’S CONNECT</span>
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
          <span>
            © {new Date().getFullYear()} Stalite Academy. All rights reserved.
          </span>
          <span>
            Made for the next version of you.{" "}
            <span className="footer-star">✳</span>
          </span>
        </div>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
