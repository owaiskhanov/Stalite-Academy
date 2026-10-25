import React, { useState } from "react";
import { ArrowUpRight, Check, MessageCircle, Plus } from "lucide-react";

const questions = [
  {
    id: "schedule",
    category: "Course & schedule",
    question: "How does the weekend schedule work?",
    answer:
      "Classes run on Saturdays and Sundays over 3 months. Each lecture is 2 hours 30 minutes (150 minutes), with 24 lectures in total. That adds up to 60 learning hours. Contact the team for the next batch dates and exact class timings.",
  },
  {
    id: "levels",
    category: "Course & schedule",
    question: "What is the difference between Basics and Advanced?",
    answer:
      "Each phase has 12 lectures and 1,800 minutes of learning across the same three modules: Social Media Marketing, Performance Marketing and Search, and AI Powered Website and Web App Development. Basics establishes the foundations; Advanced goes deeper into campaigns, search and development. Advanced Social Media Marketing has no content yet.",
  },
  {
    id: "experience",
    category: "Learning",
    question: "I’m new to digital marketing. Where will I start?",
    answer:
      "The Basics phase starts with foundational topics: social media profiles, ad account creation, keyword research, web fundamentals and prompting AI tools. If you’re unsure whether the course matches your experience, talk to the team before enrolling.",
  },
  {
    id: "platforms",
    category: "Learning",
    question: "Which marketing platforms will I learn about?",
    answer:
      "The curriculum covers Google Business Profile, YouTube, Facebook, Instagram, LinkedIn, X, email, SMS and affiliate marketing. You’ll also learn Meta Ads, Google Ads, SEO, AISO and Google Search Console. The full curriculum lists exactly what is included in each phase.",
  },
  {
    id: "ai",
    category: "Learning",
    question: "Will I actually learn to build with AI?",
    answer:
      "Yes. Basics includes web fundamentals, prompting AI tools and building websites with Antigravity. Advanced covers responsive front ends, Google Cloud, Firebase, OAuth, storage, Supabase, dashboards and data visualisation.",
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
      "Certification prep, freelancing and agency pricing are part of Basics Social Media Marketing. A course certificate, external exam fees and placement support have not been confirmed here. Ask the team what is included before enrolling; this page does not promise a certificate or a job.",
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
        <div className="eyebrow">A LITTLE MORE CLARITY</div>
        <h2 id="faq-heading">
          Big decisions.
          <br />
          <span className="serif">Clear answers.</span>
        </h2>
        <p>
          Everything you need to know before
          <br className="desktop-break" /> your next chapter begins.
        </p>
        <div className="faq-help-card">
          <span className="faq-help-icon">
            <MessageCircle size={22} />
          </span>
          <h3>Let’s make it personal.</h3>
          <p>
            Questions about your goals, the next batch or joining the course?
            Talk to the Stalite team.
          </p>
          <a href={whatsapp} target="_blank" rel="noreferrer">
            Ask us on WhatsApp <ArrowUpRight size={17} />
          </a>
          <span className="faq-help-note">
            <Check size={12} /> A conversation, not a commitment.
          </span>
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
          No hidden details. Need something clarified?{" "}
          <a href="mailto:stalitemedia@gmail.com">
            Email the team <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
