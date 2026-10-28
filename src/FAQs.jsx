import React, { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

const questions = [
  {
    id: "schedule",
    category: "Course & schedule",
    question: "How does the weekend schedule work?",
    answer:
      "Classes run on Saturdays and Sundays. The Basics curriculum lists 12 lectures of 2 hours 30 minutes each, for 30 learning hours. Contact the team to confirm the current schedule, batch dates and exact timings.",
  },
  {
    id: "experience",
    category: "Learning",
    question: "I’m new to digital marketing. Where will I start?",
    answer:
      "The Basics curriculum starts with foundational topics: social media profiles, ad account creation, keyword research, web fundamentals and prompting AI tools. If you’re unsure whether the course matches your experience, talk to the team before enrolling.",
  },
  {
    id: "platforms",
    category: "Learning",
    question: "Which marketing platforms will I learn about?",
    answer:
      "The curriculum covers Google Business Profile, YouTube, Facebook, Instagram, LinkedIn, X, email, SMS and affiliate marketing. You’ll also learn Meta Ads, Google Ads, SEO and AISO. The full curriculum lists exactly what is included.",
  },
  {
    id: "ai",
    category: "Learning",
    question: "Will I actually learn to build with AI?",
    answer:
      "Yes. Basics includes website fundamentals, prompt engineering, building websites with Antigravity or AI agents, databases, deployment and hosting.",
  },
  {
    id: "fees",
    category: "Admissions",
    question: "What are the fees and how do I enrol?",
    answer:
      "Message Stalite Academy on WhatsApp or call +91 98606 85430 for the current fees, enrolment process and available batches. These details are confirmed directly by the team, so you can make an informed decision before joining.",
  },
  {
    id: "format",
    category: "Admissions",
    question: "Are classes online or in person?",
    answer:
      "Please confirm the class format with the team for your chosen batch. The published schedule is Saturdays and Sundays, but the delivery format and exact timings have not been announced on this page.",
  },
  {
    id: "certificate",
    category: "Admissions",
    question: "Does the course include certification or placement?",
    answer:
      "The curriculum includes certification prep, freelancing and agency pricing. Please confirm certificate eligibility, any external exam fees and career support directly with the team before enrolling. No placement guarantee is advertised.",
  },
];
const categories = [
  "All questions",
  "Course & schedule",
  "Learning",
  "Admissions",
];

export default function FAQs({ whatsapp }) {
  const [category, setCategory] = useState("All questions");
  const [open, setOpen] = useState("schedule");
  const filtered = questions.filter(
    (item) => category === "All questions" || item.category === category,
  );
  function selectCategory(value) {
    setCategory(value);
    setOpen(
      questions.find(
        (item) => value === "All questions" || item.category === value,
      )?.id ?? null,
    );
  }
  return (
    <section
      className="faq-section container section-space"
      id="faqs"
      aria-labelledby="faq-heading"
    >
      <div className="faq-sidebar">
        <div className="eyebrow">A FEW COMMON QUESTIONS</div>
        <h2 id="faq-heading">Before you get started.</h2>
        <p>Clear answers about the course, schedule and joining.</p>
        <div className="faq-help-card">
          <p>Can’t find your answer?</p>
          <a href={whatsapp} target="_blank" rel="noreferrer">
            Ask us on WhatsApp <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="faq-content">
        <div
          className="faq-filters"
          role="group"
          aria-label="Filter frequently asked questions"
        >
          {categories.map((item) => (
            <button
              key={item}
              aria-pressed={item === category}
              onClick={() => selectCategory(item)}
              className={item === category ? "active" : ""}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="faq-list">
          {filtered.map((item) => {
            const expanded = open === item.id;
            return (
              <article
                className={`faq-item ${expanded ? "faq-open" : ""}`}
                key={item.id}
              >
                <h3>
                  <button
                    id={`faq-question-${item.id}`}
                    onClick={() => setOpen(expanded ? null : item.id)}
                    aria-expanded={expanded}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span className="faq-question-copy">
                      <span className="faq-category">{item.category}</span>
                      <span>{item.question}</span>
                    </span>
                    <span className="faq-expand">
                      <Plus size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  hidden={!expanded}
                >
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="faq-bottom-note">
          Prefer email?{" "}
          <a href="mailto:stalitemedia@gmail.com">
            Email the team <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
