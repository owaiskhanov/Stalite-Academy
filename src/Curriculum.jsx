import React, { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Download,
  Layers,
  Plus,
} from "lucide-react";
import { curriculum } from "./curriculum";

const previews = [
  "Profiles, content and marketing across social platforms.",
  "Meta Ads, Google Ads and the foundations of SEO.",
  "Website fundamentals, AI-assisted building and databases.",
];

export default function Curriculum({ bg = "sky" }) {
  const [open, setOpen] = useState(0);

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
              Explore the <span className="serif">curriculum.</span>
            </h2>
            <p>
              Open a module to see exactly what’s covered.
            </p>
          </div>
          <div className="learning-intro-actions">
            <a className="learning-download" href="/cid">
              <Layers size={17} /> Curriculum in depth
            </a>
            <a
              className="learning-download"
              href="/stalite-academy-syllabus.pdf"
              download="Stalite-Academy-Syllabus.pdf"
            >
              <Download size={17} /> Download full syllabus
            </a>
          </div>
        </div>

        <div className="learning-panel" id="curriculum-panel">
          <div className="learning-phase">
            <h3>Basics curriculum</h3>
            <span>
              3 modules <span aria-hidden="true">·</span> 1,800 minutes
            </span>
          </div>
          <div className="learning-modules">
            {curriculum.basics.map((module, index) => (
              <article
                className={`learning-module ${open === index ? "is-open" : ""}`}
                key={`basics-${index}`}
              >
                <h4>
                  <button
                    className="learning-module-toggle"
                    id={`module-heading-basics-${index}`}
                    aria-expanded={open === index}
                    aria-controls={`module-basics-${index}`}
                    onClick={() => setOpen(open === index ? null : index)}
                  >
                    <span className="learning-module-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="learning-module-copy">
                      <span className="learning-module-name">{module.name}</span>
                      <span className="learning-module-preview">
                        {previews[index]}
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
                  id={`module-basics-${index}`}
                  role="region"
                  aria-labelledby={`module-heading-basics-${index}`}
                  hidden={open !== index}
                >
                  {module.note ? (
                    <p className="learning-pending">{module.note}</p>
                  ) : (
                    <ul>
                      {module.topics.map((topic) => (
                        <li key={typeof topic === "string" ? topic : topic.title}>
                          <Check size={15} aria-hidden="true" />
                          {typeof topic === "string" ? (
                            <span>{topic}</span>
                          ) : (
                            <div className="learning-topic-group">
                              <strong>{topic.title}</strong>
                              <ul className="learning-subtopics">
                                {topic.subtopics.map((subtopic) => (
                                  <li key={subtopic}>{subtopic}</li>
                                ))}
                              </ul>
                            </div>
                          )}
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
            <Layers size={16} /> <strong>12 lectures</strong> in Basics
          </span>
          <span>
            <Clock3 size={16} /> 150 minutes each{" "}
            <span aria-hidden="true">·</span> 30 learning hours in total
          </span>
        </div>
      </div>
    </section>
  );
}
