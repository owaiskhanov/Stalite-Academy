import React from "react";
import { Medal, Star, Timer } from "lucide-react";

/**
 * Initials for the fallback monogram avatar, e.g. "Stalite Media" -> "SM".
 */
function initials(name = "") {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

/**
 * Pastel gradient themes for the card surface. `variant` picks one;
 * `undefined` falls back to the mint-to-lime default.
 */
const variants = {
  mint: { "--card-from": "#e2fbef", "--card-to": "#f0fbe0" },
  peach: { "--card-from": "#ffeee2", "--card-to": "#fff6e0" },
  lavender: { "--card-from": "#ece7fd", "--card-to": "#f7f0fd" },
  sky: { "--card-from": "#e2f3fd", "--card-to": "#eefaf9" },
};

/**
 * CourseCard
 *
 * Props
 * - title            string   Course name, clamped to two lines.
 * - description      string   One-line summary, clamped to a single line.
 * - image            string   Illustration shown centred in the card.
 * - imageAlt         string   Alt text for the illustration.
 * - tags             string[] Small white pills, top-left. Pass [] for none.
 * - rating           number   e.g. 4.8. Hidden when null/undefined.
 * - reviews          number   Review count, formatted with separators.
 * - duration         string   e.g. "14h 45m".
 * - certificate      boolean  Shows the medal + "Certificate" meta item.
 * - instructor       string   Instructor name.
 * - instructorRole   string   Label under the name, defaults to "Instructor".
 * - instructorAvatar string   Optional image URL; falls back to a monogram.
 * - variant          string   "mint" | "peach" | "lavender" | "sky".
 * - price            string   Optional; rendered above the CTA when provided.
 * - ctaHref          string   Destination for the CTA button.
 * - ctaLabel         string   CTA text, defaults to "Join Course".
 */
export default function CourseCard({
  title,
  description,
  image,
  imageAlt = "",
  tags = [],
  rating,
  reviews,
  duration,
  certificate = false,
  instructor,
  instructorRole = "Instructor",
  instructorAvatar,
  variant = "mint",
  price,
  ctaHref = "#",
  ctaLabel = "Join Course",
}) {
  const external = /^https?:\/\//.test(ctaHref);

  return (
    <article
      className="course-card"
      style={variants[variant] ?? variants.mint}
      aria-label={title}
    >
      {tags.length > 0 && (
        <div className="course-card-tags">
          {tags.map((tag) => (
            <span className="course-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="course-card-art">
        <img src={image} alt={imageAlt} width="220" height="220" loading="lazy" />
      </div>

      <h3 className="course-card-title">{title}</h3>
      <p className="course-card-description">{description}</p>

      <div className="course-card-meta">
        {rating != null && (
          <span className="course-meta-item">
            <Star size={14} strokeWidth={1.9} aria-hidden="true" />
            <strong>{rating.toFixed(1)}</strong>
            {reviews != null && (
              <span className="course-meta-muted">
                ({reviews.toLocaleString("en-IN")} reviews)
              </span>
            )}
          </span>
        )}
        {duration && (
          <span className="course-meta-item">
            <Timer size={14} strokeWidth={1.9} aria-hidden="true" />
            {duration}
          </span>
        )}
        {certificate && (
          <span className="course-meta-item">
            <Medal size={14} strokeWidth={1.9} aria-hidden="true" />
            Certificate
          </span>
        )}
      </div>

      <div className="course-card-divider" />

      <div className="course-card-footer">
        <div className="course-instructor">
          {instructorAvatar ? (
            <img
              className="course-avatar"
              src={instructorAvatar}
              alt=""
              width="44"
              height="44"
            />
          ) : (
            <span className="course-avatar course-avatar-mono" aria-hidden="true">
              {initials(instructor)}
            </span>
          )}
          <span className="course-instructor-text">
            <strong>{instructor}</strong>
            <span>{instructorRole}</span>
          </span>
        </div>

        <div className="course-card-action">
          {price && <span className="course-price">{price}</span>}
          <a
            className="course-cta"
            href={ctaHref}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
