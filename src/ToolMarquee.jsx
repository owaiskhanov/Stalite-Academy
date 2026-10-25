import React, { useState } from "react";
import { Pause, Play } from "lucide-react";

const tools = [
  ["Meta", "meta", "Performance marketing"],
  ["Google Ads", "googleads", "Search campaigns"],
  ["Instagram", "instagram", "Content & paid ads"],
  ["YouTube", "youtube", "Video marketing"],
  ["LinkedIn", "linkedin", "Professional marketing"],
  ["Facebook", "facebook", "Social media marketing"],
  ["Google Search Console", "googlesearchconsole", "Search insights"],
  ["Google Cloud", "googlecloud", "Back-end development"],
  ["Firebase", "firebase", "Back end & databases"],
  ["Supabase", "supabase", "Databases"],
  ["GitHub", "github", "Code & collaboration"],
  ["WhatsApp", "whatsapp", "Meta account connections"],
  ["X", "x", "Social media marketing"],
];

export default function ToolMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="tool-strip" aria-labelledby="tools-heading">
      <div className="container">
        <div className="tools-heading-row">
          <div>
            <div className="eyebrow">GET FAMILIAR WITH</div>
            <h2 id="tools-heading">Tools you’ll get to know.</h2>
          </div>
          <div className="tools-heading-end">
            <p>Familiar platforms. Practical skills.</p>
            <button
              className="marquee-control"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Play tool marquee" : "Pause tool marquee"}
              aria-pressed={paused}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </button>
          </div>
        </div>
        <div className={`marquee-window ${paused ? "is-paused" : ""}`}>
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul
                className="marquee-group"
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                aria-label={
                  copy === 0 ? "Marketing and development platforms" : undefined
                }
              >
                {tools.map(([name, slug]) => (
                  <li className="tool-tile" key={slug}>
                    <span className="tool-logo">
                      <img
                        src={`/logos/${slug}.svg`}
                        alt=""
                        width="32"
                        height="32"
                      />
                    </span>
                    <div>
                      <strong>{name}</strong>
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <p className="tools-disclaimer">
          Marketing and development tools. Logos belong to their respective
          owners; no affiliation or endorsement implied.
        </p>
      </div>
    </section>
  );
}
