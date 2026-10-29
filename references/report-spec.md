# Report specification (Step 6)

Read this before writing any report code. It covers setup, output paths, the NoW brand system, the 20
report sections in order, headers and footers, and the render checks to run before delivering.

## Setup

Check whether `docx` is available and only install it if missing. Install into a scratch folder rather than
the user's working folder, so the audit doesn't leave a `node_modules` directory in their project:

```bash
node -e "require('docx')" 2>/dev/null || { mkdir -p "${TMPDIR:-/tmp}/now-audit" && npm install --prefix "${TMPDIR:-/tmp}/now-audit" docx; }
```

If you installed it into the scratch folder, run the report script with
`NODE_PATH="${TMPDIR:-/tmp}/now-audit/node_modules"` so `require('docx')` resolves.

Then write the whole report script to a file and run it in one go; building it piecemeal wastes turns and
invites inconsistencies between sections.

## Output location and paths (keeps the skill portable; never hard-code session paths)

Resolve paths at runtime so the skill works on any machine:

1. **Output directory:**
   ```javascript
   const fs = require('fs');
   const path = require('path');
   // Use a folder the user named if there is one. Otherwise the sandbox outputs folder, otherwise a
   // dedicated subfolder, so the report never lands loose in the root of someone's project.
   const OUT = process.env.AUDIT_OUT
     || (fs.existsSync('/mnt/user-data/outputs') ? '/mnt/user-data/outputs'
         : path.join(process.cwd(), 'visibility-audits'));
   fs.mkdirSync(OUT, { recursive: true });
   ```
2. **DOCX validation and PDF conversion** rely on the `docx` document skill's helper scripts, which sit in
   different places on different installs. Discover the location:
   ```bash
   SOFFICE_PY="$(find /mnt /root /home /opt "$HOME/.claude" "$HOME/Library/Application Support/Claude" -type f -name soffice.py -path '*docx*' 2>/dev/null | head -1)"
   DOCX_OFFICE="${SOFFICE_PY:+$(dirname "$SOFFICE_PY")}"
   ```
   If `DOCX_OFFICE` is non-empty and `"$DOCX_OFFICE/soffice.py"` exists, use `"$DOCX_OFFICE/validate.py"` and `"$DOCX_OFFICE/soffice.py"`. If not, skip
   validation and convert with any system LibreOffice (`soffice` or `libreoffice --headless --convert-to pdf`).
   If no converter exists, deliver the `.docx` and tell the user the PDF can be produced on request.

## Report design: NoW of Work brand

The report should look like a deliverable a client paid for. Use this design system.

**Brand palette (hex):**
- Navy (cover, headers, primary dark): `272F46`
- Teal (primary accent, subtitles, rules): `59A3B0`
- Lime (On Track and Strong bands, good findings): `8EC850`
- Orange (Needs Work band, needs attention): `D57B3C`
- Red (Critical band, blockers): `C94747`
- Purple (secondary accent, Future Operations priority): `685D7B`
- Near-black body text: `0E1316`
- Light teal tint (callout backgrounds): `EAF3F5`
- Light lime tint ("what's working" background): `F1F8E8`
- Light grey for alternating rows: `F4F6F7`
- Border grey: `DCE5E7`

**Contrast rule:** on **Red**, **Orange**, **Purple** and **Navy** fills use **white** text. On **Lime** and
**Teal** fills use **Navy** (`272F46`) text, never white: white on those two fails contrast. On white, the
light grey row fill, and the light tints, use near-black (`0E1316`) text.

Write one helper that picks the text colour from the fill using this rule, and route every shaded cell
through it. Hand-picking text colours cell by cell is how white text ends up on lime or grey.

**Status words:** Good (Lime), Needs Attention (Orange), Missing (Red), and Verify (Purple) for a signal you
could not confirm from outside, such as Bing indexation or real Core Web Vitals. Name in the finding where the
client can confirm it.

**Band colours:** use the four bands defined in SKILL.md Step 4 everywhere. Critical is Red, Needs Work is
Orange, On Track and Strong are both Lime. The band word, not the colour, separates On Track from Strong.

**Colour-coding is mandatory, not optional.** Every score, status, verdict, and priority cell in the report
must carry its band colour (lime / orange / red / purple) per the rules above. A report of plain black-on-white
tables is a failure. The cover score panel, the pillar table, every signal Status cell, the inventory Verdict
cells, the coverage Present?/Covered? cells, and the Priority cells are all colour-filled.

**Data-density floor (make it detailed).** This is a premium deliverable, not a summary. Hold the report to this
minimum:
- The five-pillar table shows a numeric score per pillar (0–100), its weight, and a specific one-line finding.
- Every audit module renders a per-signal table (Signal | Finding | Status), with one row per signal checked,
  not a paragraph. The SEO section alone should have on the order of 20+ signal rows across its sub-sections.
- Findings cite the specific evidence observed (the actual title text, the page missing an H1, the schema types
  detected) and, where relevant, the empirical benchmark as data (e.g. "FCP target < 0.4s; pages over ~1.13s
  are ~3x less likely to be cited in ChatGPT").
- The AI crawler access matrix is reproduced with the site's actual robots.txt verdict per bot.
- The content roadmap lists real, named pieces (not categories), each with type, funnel stage, GEO/AEO levers,
  effort, and impact.
- Tables are the default; prose is the exception. When in doubt, add the row, show the number, name the page.

**Writing style in the report:** Canadian spelling, plain sentences, and em dashes only where no comma, colon,
or full stop works. Section labels use colons ("Part 1: Visibility Audit").

**Typography:** Arial throughout (safe default; swap for a NoW brand font if installed). Title 36pt bold, H1
24pt, H2 18pt, H3 14pt, body 11pt, footer 9pt.

**Page setup:** US Letter (12240 × 15840 DXA), 1-inch margins, content width 9360 DXA.

## Report structure

The report has four parts: **Part 1: Visibility Audit** (diagnose), **Part 2: On-Site Content Strategy &
Roadmap** (prescribe), **Part 3: Off-Site Authority & Entity Roadmap** (prescribe), and **Part 4: 30/60/90
Implementation Plan** (schedule). For a Quick Audit, Part 2 collapses to a "Top content opportunities" list,
Part 3 to a "Top off-site quick wins" list, and Part 4 to a condensed first-30-days list. Part 1 stays
full-size in both depths (the data-density floor applies), except section 8, which is Full Audit only. For a
Full Audit, build all four parts in full. Use a full-width navy section divider (a single-cell table with `272F46`
background, white text) to introduce each part.

### 1. Cover page (its own section, without header or footer)

Navy card (`272F46`) filling the page inside an even 0.5-inch white frame on all sides. Do **not** attempt
full-bleed: LibreOffice reserves header/footer distance even for empty headers, which breaks full-bleed
asymmetrically. The verified recipe: cover section with margins 720 on all sides (including header/footer
distances), a single-cell Table with `layout: FIXED`, width 10800 DXA, one row with
`height: {value: 14400, rule: EXACT}`, cell shaded navy with left/right margins ~1000. The three-dimension
score table inside the card must also be `layout: FIXED` with explicit column widths (3×2900, total 8700,
centred) or the third cell clips on conversion. Content vertically centred with a leading spacer paragraph
(~2000 twips `spaceBefore`).

1. Site domain in white, 36pt bold (hero)
2. "Search Visibility Audit & Growth Roadmap: SEO / GEO / AEO" in teal (`59A3B0`), 18pt
3. "QUICK AUDIT" or "FULL AUDIT + GROWTH ROADMAP" in white, 11pt
4. **AI Visibility Score**: this is the hero of page one and the single largest element on the cover. Render
   "XX / 100" centred in white 54pt bold (larger than the domain), with the band word ("Strong" / "On Track" /
   "Needs Work" / "Critical") directly beneath in its band colour (lime / lime / orange / red) at 16pt bold. The eye
   should land on the score first. Put it above the three-dimension table.
5. The three-dimension score table (3 columns, full width, no outer border): each cell coloured by band (lime
   7–10, orange 5–6, red 1–4), with the dimension label (10pt bold), the score (36pt bold), and the status word
   (9pt italic), applying the contrast rule
6. Bottom attribution in teal-grey (`93B4BC`), 9pt, centred: audit date / "Prepared by The NoW of Work" /
   "nowofwork.com"

Page break after cover.

### 2. Executive summary

Heading 1: "Executive Summary". A light-teal box (single-cell table, `EAF3F5`) with a specific 3–5 sentence
summary: overall position, the most urgent issue, the biggest opportunity. Then the scores table:

| Metric | Score | Status | Key takeaway |
|---|---|---|---|
| AI Visibility Score | XX/100 | [band] | [one line] |
| SEO | X/10 | ... | ... |
| GEO | X/10 | ... | ... |
| AEO | X/10 | ... | ... |

### 3. AI Visibility Score breakdown

Precede this section with the **Part 1: Visibility Audit** navy divider.

Heading 1. A table of the five pillars (Technical Crawlability, Content Density, Off-Page Consensus & Brand
Mentions, Schema & Entity, Performance) with each pillar's score, weight, and a one-line finding. Note any
pillar marked "pending verification" (for example Performance, until PageSpeed is run).

### 4. Pages audited

Heading 1. Table: URL | Page Type | Notes. Alternating row shading (`F4F6F7`).

### 5. SEO analysis (Modules 1, 2, 4)

Heading 1 with the SEO score. Heading 2 sub-sections: Crawlability & Rendering, Google & Bing Indexation,
On-Page, Performance (with the PageSpeed recommendation and thresholds), Structured Data, AI Crawler Access
(robots.txt matrix findings, per-engine retrieval implications), Penalty Risk Screen (the six risk patterns with
a pass/flag verdict each), Sitemaps & llms.txt. Present findings in a three-column table (Signal, what you found, Status)
(colour-coded Good / Needs Attention / Missing, following the contrast rule).

### 6. GEO analysis (Module 3 + entity)

Heading 1 with the GEO score. Sub-sections: E-E-A-T & Entity Clarity, Content for AI Citation (run the page
against the GEO tactic table: citations, quotes, statistics, original data, answer capsules, fluency), Density /
Length / Freshness, Off-Page Consensus & Brand Mentions (Module 5, including the category's priority AI citation
sources and the mention-evidence hierarchy so the client understands *why* off-site work is weighted so
heavily). Where the site is lower-authority, explicitly flag the GEO-as-equalizer opportunity.

### 7. AEO analysis

Heading 1 with the AEO score. Sub-sections: Answer-First Formatting, Question-Phrased Headings & FAQ/HowTo
Schema, Voice & Local Answer Readiness. Use the query-pattern matrix to show specific gaps.

### 8. AI citation spot-check (Full Audit)

Heading 1. The Module 6 baseline. A table of the buyer-intent prompts tested: Prompt | Brand present? | Who
appears instead | Sources cited for this query space. Then three short callouts: presence rate, the dominant
competitors in the answer space, and the source pattern (which platforms this category's answers are drawn
from, cross-referenced to the off-site recommendations). Close with the honest-limits line (point-in-time
approximation) and the named tracking-tool tier for ongoing measurement. For a Quick Audit, omit this section
and note it as part of the Full Audit.

### 9. Priority fixes (audit recommendations)

Heading 1. Full-width table: Priority | Fix | Module | Effort | Expected impact. These are the technical and
on-page fixes from the audit. Colour-code the Priority cell:
Priority labels are plain text in the document (no emoji; LibreOffice may not have the font):

- **Critical Blocker** (Red `C94747`, white text): robots.txt blocking search-time bots, absent from the
  Bing index, JS-rendered content hidden from AI crawlers, any penalty-risk-screen hit, LCP > 1.85s, broken
  canonical/indexability.
- **Quick Win** (Lime `8EC850`, navy text): add inline citations and statistics to top pages, restructure
  key sections answer-first with 40–60 word capsules, nest FAQPage inside Article, claim and sync Bing Places (local businesses),
  submit sitemaps to Bing Webmaster Tools / enable IndexNow.
- **High Value** (Orange `D57B3C`, white text): the off-site mention program (digital PR, review-platform
  presence on the category's priority sources, YouTube presence, original-data asset), schema completion and
  nesting, content density and freshness.
- **Future Operations** (Purple `685D7B`, white text): agentic llms.txt for docs/transactional sites,
  measurement instrumentation (GA4 AI channel with the undercount caveat, GSC AI Mode segment, AI
  share-of-voice tool by tier).

Close Part 1 by noting that these fixes are prescribed in full in Parts 2–3 and scheduled, alongside
everything else, in the Part 4 implementation plan.

### 10. What's working well

Heading 1. Light-lime table (`F1F8E8`) naming what the site already does well, each with the evidence you saw.

### 11. Content strategy overview (open Part 2)

Precede this section with the **Part 2: On-Site Content Strategy & Roadmap** navy divider.

Heading 1. A light-teal box (`EAF3F5`) with 3–4 sentences: the business type assumed, the core content thesis
for this site (what to stop, what to start), and the single biggest content opportunity. State plainly that the
roadmap is derived from the audit gaps.

For a **Quick Audit**, give a short "Top content opportunities" list (5–7 prioritized items, each one line),
skip sections 12–16, then a "Top off-site quick wins" list (3–5 one-liners) in place of sections 17–18, and a
condensed first-30-days list in place of section 19.

### 12. Content inventory verdict

Heading 1. Table: URL | Page Type | Verdict | Action. Colour-code the Verdict cell: Keep (Lime, navy text),
Refresh (Orange, white text), Merge & Redirect (Purple, white text), Prune (Red, white text). Add a one-line note
that the final cut should be confirmed against 12-month Search Console data.

### 13. Coverage gap map

Heading 1. Two compact tables. First, funnel coverage: Funnel Stage | Covered? | Gap / recommended page type.
Second, content-type coverage for the business type: Recommended Type | Present? | Note. Colour-code the
Covered?/Present? cells (Lime present, Orange weak/partial, Red missing).

### 14. Prioritized content roadmap

Heading 1. The backlog, grouped **Now / Next / Later** (use a navy sub-heading row per group). Table columns:
Priority | Content Piece | Type | Funnel Stage | GEO/AEO Levers | Effort | Expected Impact. If demand/decay data
isn't available, add a one-line "directional pending analytics" note.

### 14b. Client-evidence content map (only when a roster is available)

Heading 1. The 3B.6 output: a short framing paragraph (roster breadth, the invisible-proof finding if logos
lack alt text, the wedge vertical), the cluster table (Vertical | Client evidence | Page to build | Target
query space), and a light-teal guardrail box (permission-first, alt-text fix, association reclamation targets,
sequencing). Skip this section entirely when no roster exists, and never fabricate client evidence.

### 15. Page build specs

Heading 1. For each of the top 3–5 roadmap pieces, a compact blueprint block: the page type, the H1, the
answer-first H2 (the real user question) with the direct-answer sentence, the supporting structure (table/list),
the evidence to add (a statistic with source, an expert quote), the schema type, and the suggested slug. Present
each as a small bordered box so it's copy-ready for the client's writers.

### 16. Production guardrails, architecture & measurement

Heading 1. Three short sub-sections (Heading 2):
- **Responsible production**: the 3-step protocol (AI scaffolding → inject original data/proof → humanize and
  expert-review) and the E-E-A-T checklist as a bulleted list.
- **Content architecture**: pillar/cluster structure, ~3-click depth, descriptive internal links, natural 4–7
  word slugs, and consolidating fan-out into comprehensive pages.
- **Measurement**: the four-layer dashboard (traditional SEO, AEO, GEO/citation, conversion/ROI) and the GA4 AI
  channel + UTM setup, tied back to re-measuring the AI Visibility Score on the next audit.

### 17. Off-site roadmap overview (open Part 3)

Precede this section with the **Part 3: Off-Site Authority & Entity Roadmap** navy divider.

Heading 1. A light-teal box (`EAF3F5`) with 3–4 sentences making the case in this client's terms: the evidence
hierarchy (mentions ~3x backlinks, YouTube strongest, ~84% of citations from earned editorial), what the Module
6 source pattern showed for this category, and the client's biggest off-site gap. Then the plays-selected
table: **Play | Why it's on the list (evidence + observed gap) | First step | Effort | Timeline**. One row per
selected play from Step 3C, colour-coding Effort (Lime low / Orange medium / Red high).

### 18. Off-site plays in detail

Heading 1. For each selected play, a compact bordered block (mirroring the build-spec format so the whole
report feels like one system): the play name as a Heading 2, one evidence line, then the **numbered steps from
Step 3C written for this client**: the actual platforms to claim, the named publication/journalist target
candidates, the communities identified from the spot-check, the review link mechanics, the data asset concept
proposed. Close each block with the expectation line (effort, timeline, what compounding looks like). Generic
steps are a failure here; every block should read like it was written for exactly this business.

### 19. 30/60/90 implementation plan (open Part 4)

Precede this section with the **Part 4: 30/60/90 Implementation Plan** navy divider.

Heading 1. Four sub-tables under navy sub-heading rows (**First 30 Days**, **Days 31–60**, **Days 61–90**,
**Ongoing (Quarterly Rhythm)**), each with columns: Action | Workstream | What done looks like | Effort |
Impact. Colour-code the Workstream cell (Technical = Red band actions where blocking, otherwise Teal; Content =
Orange; Off-site = Purple; Measurement = Lime, following the contrast rule) so the client can scan lanes at a
glance. Bold and flag the threshold rows (Bing indexation, retrieval-bot access, JS rendering, penalty hits)
with a "⚑ Threshold" marker in the Action cell. Close with the honest resourcing paragraph: days of specialist
work for the fixes, an ongoing content-and-PR investment for the differentiator, results compounding over
months, and the quarterly re-audit as the checkpoint.

### 20. Tailoring note & glossary (Full Audit)

Heading 1. A short paragraph reinforcing the business-type priorities, then plain-English definitions of SEO,
GEO, AEO, GEO vs AEO, and the key 2026 benchmarks used, each marked as a directional third-party figure.

## Running header and footer (every page after the cover)

**Header:** domain left, "Search Visibility Audit & Growth Roadmap" right, teal bottom border (`59A3B0`).
**Footer:** "Prepared by The NoW of Work" left, page number right, grey top border (`DCE5E7`).

## Generate, validate, convert, deliver

Build with `docx`, write to `OUT`, filename like `now-visibility-audit-example-com-2026-06-05.docx`. Validate
with the discovered `validate.py` if present, fix and regenerate on failure. Convert to PDF via the discovered
`soffice.py` or a system LibreOffice.

**Verify the rendering before delivering.** Rasterize at least the cover and one table-heavy page
(`pdftoppm -jpeg -r 80`) and inspect them. If image viewing is unavailable or unreliable, verify
programmatically instead: with PIL, sample the cover for the navy frame extent (a 0.5-inch frame on US Letter is ~6%
of the width on left and right and ~4.5% of the height on top and bottom; check each pair is symmetric) and confirm the dimension-panel colour bands render in a 1:2-style ratio matching the
score colours; use `pdftotext` to confirm every expected section heading is present. Fix and regenerate on any
failure: a clipped cover or overflowing table is not deliverable.

Hand both files to the user with whatever file-delivery tool the environment provides (for example
`present_files`); if there is none, give the full paths. Keep the confirmation short and plain.
