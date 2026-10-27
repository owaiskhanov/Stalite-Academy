import React, { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  Download,
  Layers,
  Plus,
} from "lucide-react";
import { curriculum } from "./curriculum";

const levels = [
  {
    id: "basics",
    name: "Basics",
    number: "01",
    description: "Start with the fundamentals.",
  },
  {
    id: "advanced",
    name: "Advanced",
    number: "02",
    description: "Build on what you’ve learned.",
  },
];
const previews = {
  basics: [
    "Profiles, content and marketing across social platforms.",
    "Meta Ads, Google Ads and the foundations of SEO.",
    "Web fundamentals, AI prompting and Antigravity.",
  ],
  advanced: [
    "Content has not been added yet.",
    "Campaign setup, keyword application, AISO and Search Console.",
    "Responsive front ends, back ends, databases and dashboards.",
  ],
};

export default function Curriculum({ bg = "sky" }) {
  const [level, setLevel] = useState("basics");
  const [open, setOpen] = useState(0);
  const tabs = useRef([]);
  const selected = levels.find((item) => item.id === level);

  function selectLevel(value) {
    setLevel(value);
    setOpen(value === "basics" ? 0 : 1);
  }
  function navigateTabs(event, index) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
    selectLevel(levels[next].id);
    tabs.current[next]?.focus();
  }

  return (
    /* Full-bleed band so the sky can reach the viewport edges; the content
       stays inside .container. `data-bg` picks a treatment from styles.css. */
    <section
      className="curriculum-band"
      id="curriculum"
      data-bg={bg}
      aria-labelledby="curriculum-heading"
    >
      <div className="container curriculum-section">
        <div className="learning-intro">
          <div>
            <div className="eyebrow">WHAT YOU’LL LEARN</div>
            <h2 id="curriculum-heading">
              One course. <span className="serif">Two levels.</span>
            </h2>
            <p>
              Choose a level, then open a module to see exactly what’s covered.
            </p>
          </div>
          <a
            className="learning-download"
            href="/stalite-academy-syllabus.pdf"
            download="Stalite-Academy-Syllabus.pdf"
          >
            <Download size={17} /> Download full syllabus
          </a>
        </div>

        <div
          className="learning-tabs"
          role="tablist"
          aria-label="Curriculum level"
        >
          {levels.map((item, index) => (
            <button
              key={item.id}
              ref={(el) => (tabs.current[index] = el)}
              id={`tab-${item.id}`}
              className={`learning-tab ${level === item.id ? "is-selected" : ""}`}
              role="tab"
              aria-selected={level === item.id}
              aria-controls="curriculum-panel"
              tabIndex={level === item.id ? 0 : -1}
              onClick={() => selectLevel(item.id)}
              onKeyDown={(event) => navigateTabs(event, index)}
            >
              <span className="learning-step">{item.number}</span>
              <span className="learning-tab-copy">
                <span className="learning-tab-name">{item.name}</span>
                <span className="learning-tab-description">
                  {item.description}
                </span>
                <span className="learning-tab-duration">
                  12 lectures <span aria-hidden="true">·</span> 30 hours
                </span>
              </span>
              <span className="learning-tab-indicator" aria-hidden="true">
                {level === item.id ? (
                  <Check size={18} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </span>
            </button>
          ))}
        </div>

        <div
          className="learning-panel"
          id="curriculum-panel"
          role="tabpanel"
          aria-labelledby={`tab-${level}`}
          tabIndex={0}
        >
          <div className="learning-phase">
            <h3>{selected.name} curriculum</h3>
            <span>
              3 modules <span aria-hidden="true">·</span> 1,800 minutes
            </span>
          </div>
          <div className="learning-modules">
            {curriculum[level].map((module, index) => (
              <article
                className={`learning-module ${open === index ? "is-open" : ""}`}
                key={`${level}-${index}`}
              >
                <h4>
                  <button
                    className="learning-module-toggle"
                    id={`module-heading-${level}-${index}`}
                    aria-expanded={open === index}
                    aria-controls={`module-${level}-${index}`}
                    onClick={() => setOpen(open === index ? null : index)}
                  >
                    <span className="learning-module-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="learning-module-copy">
                      <span className="learning-module-name">{module.name}</span>
                      <span className="learning-module-preview">
                        {previews[level][index]}
                      </span>
                    </span>
                    <span className="learning-disclosure">
                      <span>
                        {open === index ? "Hide topics" : "View topics"}
                      </span>
                      <Plus size={19} />
                    </span>
                  </button>
                </h4>
                <div
                  className="learning-topics"
                  id={`module-${level}-${index}`}
                  role="region"
                  aria-labelledby={`module-heading-${level}-${index}`}
                  hidden={open !== index}
                >
                  {module.note ? (
                    <p className="learning-pending">{module.note}</p>
                  ) : (
                    <ul>
                      {module.topics.map((topic) => (
                        <li key={topic}>
                          <Check size={15} />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="learning-total">
          <span>
            <Layers size={16} /> <strong>24 lectures</strong> across both levels
          </span>
          <span>
            <Clock3 size={16} /> 150 minutes each{" "}
            <span aria-hidden="true">·</span> 60 learning hours in total
          </span>
        </div>
      </div>
    </section>
  );
}
