#!/usr/bin/env python3
"""Build the Stalite Academy syllabus PDF.

Reads public/stalite-academy-curriculum.txt (the single source of truth for
syllabus copy) and renders public/stalite-academy-syllabus.pdf in the brand
style: ink navy type, Stalite blue accents, hairline rules.

Usage (from the repo root):
    ./.venv/bin/python scripts/build_syllabus_pdf.py
"""

import re
import sys
from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "public" / "stalite-academy-curriculum.txt"
OUTPUT = ROOT / "public" / "stalite-academy-syllabus.pdf"

INK = HexColor("#172e40")
MUTED = HexColor("#617281")
BLUE = HexColor("#0787c9")
BLUE_DARK = HexColor("#03699e")
PALE = HexColor("#f2faff")
LINE = HexColor("#dce9f2")

PAGE_W, PAGE_H = A4
MARGIN = 20 * mm


# ---------------------------------------------------------------- source ----
def parse_syllabus(text):
    """Turn the plain-text syllabus into structured sections."""
    header = []
    sections = []
    contact = []
    current_section = None
    current_module = None
    mode = "header"

    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        if line.startswith("CONTACT STALITE MEDIA"):
            mode = "contact"
            continue
        if mode == "contact":
            contact.append(line)
            continue
        level = re.match(r"^(BASICS|ADVANCED)\s*\(([^)]*)\)\s*$", line)
        if level:
            mode = "body"
            current_section = {"name": level.group(1).title(), "meta": level.group(2), "modules": []}
            sections.append(current_section)
            current_module = None
            continue
        module = re.match(r"^(\d+)\.\s*(.+)$", line)
        if module and mode == "body":
            note = None
            name = module.group(2)
            if ": no content yet" in name:
                name = name.replace(": no content yet", "").strip()
                note = "Content has not been added yet."
            current_module = {"number": module.group(1), "name": name, "topics": [], "note": note}
            current_section["modules"].append(current_module)
            continue
        if line.startswith("- ") and current_module is not None:
            if raw.startswith("  ") and current_module["topics"]:
                current_module["topics"][-1]["subtopics"].append(line[2:].strip())
            else:
                current_module["topics"].append({"text": line[2:].strip(), "subtopics": []})
            continue
        if mode == "header":
            header.append(line)

    return header, sections, contact


# ---------------------------------------------------------------- styles ----
styles = {
    "title": ParagraphStyle(
        "title",
        fontName="Helvetica-Bold",
        fontSize=27,
        leading=31,
        textColor=INK,
        spaceAfter=2 * mm,
    ),
    "subtitle": ParagraphStyle(
        "subtitle", fontName="Helvetica", fontSize=11, leading=16, textColor=MUTED
    ),
    "wordmark": ParagraphStyle(
        "wordmark",
        fontName="Helvetica-Bold",
        fontSize=15,
        leading=16,
        textColor=INK,
        spaceAfter=0,
    ),
    "wordmark_academy": ParagraphStyle(
        "wordmark_academy",
        fontName="Helvetica-Bold",
        fontSize=7,
        leading=10,
        textColor=BLUE,
    ),
    "level": ParagraphStyle(
        "level",
        fontName="Helvetica-Bold",
        fontSize=15,
        leading=18,
        textColor=BLUE_DARK,
        spaceBefore=8 * mm,
        spaceAfter=1.5 * mm,
    ),
    "level_meta": ParagraphStyle(
        "level_meta", fontName="Helvetica", fontSize=9, leading=12, textColor=MUTED
    ),
    "module": ParagraphStyle(
        "module",
        fontName="Helvetica-Bold",
        fontSize=12.5,
        leading=16,
        textColor=INK,
        spaceBefore=6 * mm,
        spaceAfter=2 * mm,
    ),
    "topic": ParagraphStyle(
        "topic",
        fontName="Helvetica",
        fontSize=9.6,
        leading=13,
        textColor=MUTED,
        leftIndent=6 * mm,
        bulletIndent=1 * mm,
        spaceAfter=0.6 * mm,
    ),
    "subtopic": ParagraphStyle(
        "subtopic",
        fontName="Helvetica",
        fontSize=9.6,
        leading=13,
        textColor=MUTED,
        leftIndent=12 * mm,
        bulletIndent=7 * mm,
        spaceAfter=0.6 * mm,
    ),
    "note": ParagraphStyle(
        "note",
        fontName="Helvetica-Oblique",
        fontSize=9.2,
        leading=13,
        textColor=MUTED,
        leftIndent=6 * mm,
    ),
    "contact_head": ParagraphStyle(
        "contact_head",
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=INK,
        spaceAfter=2 * mm,
    ),
    "contact": ParagraphStyle(
        "contact", fontName="Helvetica", fontSize=9.4, leading=14, textColor=MUTED
    ),
    "stat_value": ParagraphStyle(
        "stat_value", fontName="Helvetica-Bold", fontSize=15, leading=18, textColor=INK
    ),
    "stat_label": ParagraphStyle(
        "stat_label", fontName="Helvetica", fontSize=7.6, leading=10, textColor=MUTED
    ),
}


# ------------------------------------------------------------------ page ----
def decorate(canvas, doc):
    canvas.saveState()
    # Thin brand rule across the top of every page.
    canvas.setStrokeColor(BLUE)
    canvas.setLineWidth(2.4)
    canvas.line(MARGIN, PAGE_H - 12 * mm, PAGE_W - MARGIN, PAGE_H - 12 * mm)
    # Footer line + meta.
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.7)
    canvas.line(MARGIN, 14 * mm, PAGE_W - MARGIN, 14 * mm)
    canvas.setFont("Helvetica", 7.6)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, 10.4 * mm, "Stalite Academy  ·  stalite.in  ·  +91 98606 85430")
    canvas.drawRightString(PAGE_W - MARGIN, 10.4 * mm, f"Page {doc.page}")
    canvas.restoreState()


def stat_cell(value, label):
    return Table(
        [[Paragraph(value, styles["stat_value"])], [Paragraph(label, styles["stat_label"])]],
        colWidths=[38 * mm],
        style=TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        ),
    )


def build(header, sections, contact):
    story = []

    story.append(
        Table(
            [
                [
                    Paragraph("stalite<font color='#0787c9'>.</font>", styles["wordmark"]),
                    Paragraph("ACADEMY", styles["wordmark_academy"]),
                ]
            ],
            colWidths=[30 * mm, 20 * mm],
            hAlign="LEFT",
            style=TableStyle(
                [
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                    ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ]
            ),
        )
    )
    story.append(Spacer(1, 7 * mm))
    story.append(Paragraph("Digital Marketing &amp; AI", styles["title"]))
    story.append(
        Paragraph("Basics curriculum: a weekend programme by Stalite Media.", styles["subtitle"])
    )
    story.append(Spacer(1, 6 * mm))

    facts = [line.split(":", 1) for line in header if ":" in line]
    stats = [
        ("3", "focused modules"),
        ("12", "lectures"),
        ("30 hrs", "of learning"),
        ("Sat & Sun", "2 h 30 m each"),
    ]
    for line in header:
        if line.lower().startswith("classes:"):
            days = line.split(":", 1)[1].strip().replace("Saturdays and Sundays", "Sat & Sun")
            stats[3] = (days, "2 h 30 m each")
    band = Table(
        [[stat_cell(v, l) for v, l in stats]],
        colWidths=[(PAGE_W - 2 * MARGIN) / 4.0] * 4,
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE),
                ("BOX", (0, 0), (-1, -1), 0.7, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.7, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ]
        ),
    )
    story.append(band)
    _ = facts  # kept for future use; stats band carries the headline numbers

    for section in sections:
        story.append(
            Paragraph(f"{section['name'].upper()}", styles["level"])
        )
        story.append(Paragraph(section["meta"], styles["level_meta"]))
        story.append(Spacer(1, 1.5 * mm))
        story.append(HRFlowable(width="100%", thickness=0.7, color=LINE))
        for module in section["modules"]:
            story.append(
                Paragraph(
                    f"<font color='#0787c9'>{module['number'].zfill(2)}</font>"
                    f"&nbsp;&nbsp;{module['name']}",
                    styles["module"],
                )
            )
            if module["note"]:
                story.append(Paragraph(module["note"], styles["note"]))
            for topic in module["topics"]:
                text = topic["text"]
                if topic["subtopics"]:
                    text = f"<b>{text}</b>"
                paragraphs = [Paragraph(text, styles["topic"], bulletText="\u2022")]
                for subtopic in topic["subtopics"]:
                    paragraphs.append(Paragraph(subtopic, styles["subtopic"], bulletText="\u2022"))
                story.append(KeepTogether(paragraphs) if topic["subtopics"] else paragraphs[0])

    story.append(Spacer(1, 9 * mm))
    story.append(HRFlowable(width="100%", thickness=0.7, color=LINE))
    story.append(Spacer(1, 5 * mm))
    story.append(Paragraph("Contact Stalite Media", styles["contact_head"]))
    for line in contact:
        story.append(Paragraph(line, styles["contact"]))

    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=20 * mm,
        bottomMargin=20 * mm,
        title="Stalite Academy: Digital Marketing & AI Syllabus",
        author="Stalite Media",
    )
    frame = Frame(
        MARGIN, 20 * mm, PAGE_W - 2 * MARGIN, PAGE_H - 40 * mm, id="body", showBoundary=0
    )
    doc.addPageTemplates([PageTemplate(id="page", frames=[frame], onPage=decorate)])
    doc.build(story)


def main():
    if not SOURCE.exists():
        sys.exit(f"Syllabus source not found: {SOURCE}")
    header, sections, contact = parse_syllabus(SOURCE.read_text(encoding="utf-8"))
    if not sections:
        sys.exit("Parsed no sections. Has the source format changed?")
    build(header, sections, contact)
    topics = sum(len(m["topics"]) for s in sections for m in s["modules"])
    print(f"Wrote {OUTPUT.relative_to(ROOT)}: {len(sections)} levels, {topics} topics")


if __name__ == "__main__":
    main()
