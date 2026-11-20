# Report specification (Step 6)

Read this before building the report. The report is a designed, chart-led PDF in The NoW of Work's visual
system. You don't write layout code: you write one **audit data file** (JSON) and run the renderer in
`assets/report/`, which draws every chart and page from it. That keeps every audit looking the same and lets the
monthly progress check compare one audit with the next.

## How it works

```
audit-data.json  ──►  node assets/report/render-audit.mjs  ──►  report .html  ──►  report .pdf
```

- `render-audit.mjs` builds the HTML (charts are drawn as inline SVG, so the PDF needs no JavaScript) and then
  calls `to-pdf.mjs`, which prints it with any headless Chromium it finds: `$CHROME`, Chrome, Chromium, Edge or
  Brave, then Python Playwright as a fallback.
- No npm installs. Node 18 or later is the only requirement.
- If no browser is available, deliver the `.html`: it prints to PDF from any browser (File, Print, Save as PDF)
  with the same layout.
- `example-audit.json` is a complete worked example on a fictional firm. Copy its shape.

## Output location (never hard-code session paths)

Use, in order: a folder the user named; `$AUDIT_OUT`; `/mnt/user-data/outputs` if it exists; otherwise
`./visibility-audits/` in the working directory. Save the data file there as
`now-visibility-audit-<domain>-<YYYY-MM-DD>.json`, then run:

```bash
node "<skill-dir>/assets/report/render-audit.mjs" "<out>/now-visibility-audit-<domain>-<date>.json" "<out>"
```

**Always keep the JSON next to the PDF.** The monthly progress check (`now-visibility-progress-check`) reads it
as the baseline for the next comparison. Without it, the next check has to re-read numbers from the PDF.

## Writing the data file

Every field is plain text. Two bits of markup work anywhere: `*text*` turns teal (use it once per headline, on
the half that carries the news) and `**text**` is bold.

**Headlines are findings, written as sentences.** "Off-page is the drag." beats "Score breakdown". Each section
has a short eyebrow label printed by the renderer, so the headline should say what the reader should take away.
Ledes are one or two plain sentences. Canadian spelling, no em dashes, no jargon the definitions page hasn't
explained.

### `meta`
`domain`, `site`, `date` (as printed, e.g. "18 November 2026"), `isoDate` (YYYY-MM-DD, used in the filename),
`depth` (`"full"` or `"quick"`), `businessType`, `local` (true/false), `pagesRead`, `pagesChecked`,
`sitemapUrls`, `preparedBy` (defaults to "The NoW of Work").

### `summary`
- `headline`: the cover headline. One or two short sentences; the *accent* on the turn.
- `lede`: one sentence under it.
- `summaryHeadline`, `paragraphs` (3–5 specific sentences: position, most urgent issue, biggest opportunity).
- `topFixes` (3), `strength` (1), `topContent` (2–3, optional).

### `score`
- `total` (0–100; computed from the pillars if omitted), `takeaway`, `headline`, `lede`.
- `pillars`: `tc`, `cd`, `oa`, `se`, `pm`, each `{score, finding, pending?}`. Set `pending: true` on
  Performance when Core Web Vitals weren't measured.
- `seo`, `geo`, `aeo`: each `{score (0–10), takeaway}`.

### `pages`
`[{url, type, notes}]`. Every page read in depth.

### `seo`, `aeo`, `geo`
Each `{headline, lede?, callout?, sections: [{title, note?, signals: [{signal, finding, status}]}]}`.
`status` is `good`, `needs`, `missing` or `verify` (a signal you couldn't confirm from outside; say in the
finding where the client can confirm it). The renderer draws a status bar from the counts. Hold the
data-density floor: about 20 or more SEO signal rows across its sections for a Full Audit, each finding citing
what you saw (the title text, the URL, the schema type).

- SEO sections: Crawlability & Rendering, Google & Bing Indexation, On-Page, Performance, Structured Data,
  Penalty Risk Screen, Sitemaps & llms.txt.
- AEO sections: Answer-First Formatting, Question Headings & FAQ/HowTo Schema, Voice & Local Answers.
- GEO sections: E-E-A-T & Entity Clarity, Content for AI Citation, Density / Length / Freshness, Off-Page
  Consensus & Brand Mentions. Add the GEO-as-equalizer `callout` for lower-authority sites.

### `crawlers`
`[{bot, engine, purpose ("Search-time" or "Training"), verdict ("Allowed", "Blocked", or a short note)}]`, from
robots.txt.

### `citation` (Full Audit only)
`{headline?, lede?, summary, prompts: [{prompt, present, instead, sources}], limits?}`. The renderer counts hits.

### `fixes`
`[{priority, fix, module, effort, hours, impact}]`. `priority` is `critical` (Critical blocker), `quick`
(Quick win), `high` (High value) or `future` (Future operations); use the definitions in SKILL.md Step 4 and the
module notes. `hours` drives the effort bar (log scale); use 0 for ongoing work.

### `working`
`[{what, evidence}]`. Real strengths with the evidence seen.

### `content`
- Both depths: `headline?`, `overview` (business type assumed, what to stop, what to start, biggest opportunity).
- Quick Audit: `top: [{piece, why, effort, hours}]` (5–7).
- Full Audit: `inventory: [{url, type, verdict (Keep / Refresh / Merge / Prune), action}]`;
  `funnel: [{stage, covered (Yes / Partly / No), gap}]`; `types: [{type, present, note}]`;
  `roadmap: {now: [], next: [], later: []}` with items `{piece, type, stage, levers, effort, impact}` and
  `roadmapNote` ("directional pending analytics" when there's no demand data);
  `evidence` (only with a client roster or a clear proof base; never invent clients):
  `{headline, intro, clusters: [{vertical, clients[], page, first?}], guardrail}`;
  `specs: [{title, h1, question, answer, structure, evidence, schema, slug}]` (top 3–5);
  `guardrails: {production[], architecture[], measurement[]}`.

### `offsite`
`{headline?, overview, prNote?, plays: [...]}`. Each play: `name` (numbered, "1. Index hygiene"), `sub` (one
line for the timeline), `effort` (`low` / `medium` / `high`), `start` and `end` in weeks (0–26; 4.3 = day 30,
8.6 = day 60, 13 = day 90), `ongoing?`, `marker? {week, label}`, `note?`, `why`, `firstStep`, and for a Full
Audit `evidence`, `steps[]` (numbered, named platforms and targets) and `expectation`. Quick Audit: 3–5 plays,
no steps.

### `plan`
`{headline?, lede, d30: [], d60: [], d90: [], ongoing: [{n, l}], resourcing}`. Each row:
`{action, short (≤ 30 characters, for the swimlane), lane (Technical / Content / Off-site / Measurement), done,
effort, impact, threshold?}`. Mark the 3–5 true thresholds (Bing indexation, retrieval-bot access, JS
rendering, penalty hits, a stale index that misdescribes the brand). Quick Audit: `d30` only.

### `method`
`{lede?, caveats: [{title, text}], benchmarks: [{figure, source}], next}`. `next` names the date for the first
monthly progress check (about 30 days out).

## What the renderer produces

In order: cover (score, band track, SEO / AEO / GEO chips) · **Start here: SEO, AEO and GEO explained**, with
what each means for the business (fixed text, every report) · executive summary · Part 1 divider, five-pillar
chart and points bar · pages audited · SEO, AEO and GEO analyses · AI crawler access · AI citation spot-check
(Full) · priority fixes and what's working · Part 2: content strategy, inventory, gap map, roadmap, client
evidence, build specs, guardrails (Full) · Part 3: off-site timeline, plays table, plays in detail (Full) ·
Part 4: 30/60/90 swimlane, quarterly rhythm, full plan table · method and benchmarks.

Sections with no data are skipped, so a Quick Audit comes out at roughly 10 pages and a Full Audit at 18–30.

## Design rules (already built in; don't override)

The system follows the NoW Chart System: navy cover, Archivo type, teal for the story and grey for context,
band colours only for score bands (Critical red, Needs Work orange, On Track teal, Strong green), status pills
for Good / Needs attention / Missing / Verify. If you add a chart, add it to `charts.mjs` so every report gets
it; don't hand-style a one-off.

## Render check before delivering

1. Rasterize the cover, the definitions page, one analysis page and the 30/60/90 page
   (`pdftoppm -r 60 -png`) and look at them. If you can't view images, use `pdftotext` to confirm each section
   heading is present and that the page count is in the expected range.
2. Check for: text running off a chart, a headline split awkwardly, a table row cut across pages, an empty
   section that should have been skipped, and any made-up number.
3. Fix the data (shorter `short` labels, fewer words in a headline) and render again. Don't deliver a report
   with a visible layout fault.

Then hand over the PDF and the JSON with whatever file-delivery tool the environment has (or give full paths).
Keep the confirmation short.
