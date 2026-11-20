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

**The renderer refuses an invalid file.** Before it draws anything, it checks the file against this spec and the
scoring contract and prints every problem in one list ("Audit data breaks the scoring contract: …"), then stops.
Fix the data and run it again. Fields marked **required** below are checked; a missing or malformed one is
refused, not drawn as a blank.

### `meta`
- **Required:** `domain`, `date` (as printed, e.g. "18 November 2026"), `isoDate` (YYYY-MM-DD, used in the
  filename), `depth` (`"full"` or `"quick"`).
- `modelVersion` (`"7.0"`; any other value is refused, and the computed scores carry the version the renderer
  actually used), `preparedBy` (defaults to "The NoW of Work").
- Recorded for the progress check, not printed: `site`, `businessType`, `local` (true/false), `pagesRead`,
  `pagesChecked`, `sitemapUrls`.

### `keyPages` (required)
The pages the access gates and page-level checks are judged on, listed so two analysts check the same set:
home, each primary service or product page, pricing, about, contact, and the five pages with most search
impressions (without Search Console data, the five with most internal links). At least three entries, each
`{url, role}` where `role` says why it is on the list and must be one of `home`, `service`, `product`,
`pricing`, `about`, `contact`, `top-impressions` or `top-linked` (anything else is refused). G1, G3, G4, TD1,
TD4, TD6, TD7 and BQ2 are scored on this list; G1 fails only on the home, primary service or product, and pricing
pages (other key pages fall to TD1).

### `pages`
Optional: `[{url, type, notes}]`, every page read in depth. Drives the "Pages audited" table.

### `summary` (required)
- **Required:** `headline` (the cover headline: one or two short sentences, the *accent* on the turn),
  `paragraphs[]` (3–5 specific sentences: access, readiness band, observed visibility, the most urgent issue, the
  biggest opportunity), `topFixes[]` (3, each naming the check IDs it closes), `strength` (1).
- Optional: `lede` (one sentence under the headline), `summaryHeadline`, `topContent[]` (2–3).
- Describe the gates as the data has them ("passes three of six access checks; three need a login"), and say what
  the range comes from (unverifiable checks only; verify gates and dropped page-speed checks don't widen it).
- Describe visibility per engine or as the span of engine rates ("named in 8% to 14% of answers, by engine"),
  never as one pooled figure. Word off-site claims to match the evidence: if OS5 is unverifiable, say mentions
  "seem" low and that a tracker would confirm, and keep correlations as correlations ("in large studies mentions
  track AI visibility closely", not "AI answers lean on mentions").

### `score` (the scoring contract is `readiness-checklist.md`)
- `headline`, `lede`, `takeaway` (one line for the summary table).
- `gates`: all six, once each, `[{id: "G1"…"G6", result, evidence, grade, tool, cost}]`.
  - `result` is `"pass"`, `"fail"`, `"verify"` or `"choice"`.
  - `verify` must name the `tool` that would confirm it. It is allowed only where outside evidence can't settle
    the gate: G1 when the site is behind Cloudflare or another CDN/WAF (tool: "Cloudflare Security > AI Crawl
    Control: confirm the Training category is set to Disallow AI Training, not Block"), G2 edge blocking, G4
    indexation without Search Console or Bing Webmaster Tools, G5 the Search Console setting. The renderer refuses
    `verify` on G3 and G6. Leave `grade` null for a verify gate: there is no evidence to grade.
  - G5 has no `fail` state (refused): an opt-out is a `choice` or it is `verify`.
  - `choice` is allowed only for G2 (deliberately blocking AI search bots) and G5 (deliberately opting out of
    Google's AI features). It must state `cost` (what visibility the client gives up, in one plain sentence). It
    doesn't cap the index and is printed under "Choices you've made".
  - G6 uses Google's own spam-policy headings only (scaled content abuse, site reputation policy (site reputation
    abuse), expired domain
    abuse, doorway abuse, hidden text and link abuse, malicious practices including back-button hijacking), and a
    doorway or scaled-content fail needs evidence of scale in `evidence` (for example the 10 or more near-duplicate
    URLs). A self-ranking "best of" list is never a G6 fail; it scores BQ8 `notmet`. Fake or undisclosed
    incentivized review markup is never a G6 fail either; it scores SD3 `notmet` ("breaks Google's review-snippet
    guideline, 24 Jul 2026").
  - G4 fails if any key page isn't indexed in Google; a Bing-only gap fails it only for the home page or a primary
    service or product page, otherwise it is a TD8 note.
- `checks`: every check from the contract, once each: OS1–OS9, TD1–TD10, BQ1–BQ10, SD1–SD5, PX1–PX3 (37), plus
  CM1–CM4 when the client sells online:
  `[{id, result: "met" | "partial" | "notmet" | "unverifiable" | "na", grade: "A" | "B" | "C", evidence, tool}]`.
  - `evidence` cites what you saw (the URL, the count, the schema type) and, for `partial`, which part fails.
  - `unverifiable` needs `tool`. `na` needs the reason in `evidence` (for OS3, the written test: "no
    independent coverage found in two searches").
  - Page experience checks (PX) are scored only from PageSpeed Insights or CrUX (grade A); otherwise
    `unverifiable`.
  - OS5 is scored only at grade A (a mention-tracking tool); otherwise it must be `unverifiable`, and the index is
    then provisional. TD8 must be `na` unless G4 passes (refused otherwise). BQ7 without a Wayback Machine
    comparison is `unverifiable`.
  - `label` (optional) overrides the contract's check name on the findings page. Use it only to fit a narrow
    column; never to change what the check means.
- **Never** supply a total, a pillar score, a range or a band. The renderer computes them all and refuses a file
  that skips or repeats a check or a gate.

### `notes`
Optional, per pillar (`os`, `td`, `bq`, `sd`, `px`): `{headline, lede?, callout?}`. The headline for each
pillar's findings page.

### `crawlers`
`[{bot, engine, purpose, verdict}]` from robots.txt. `purpose` says what blocking it does ("Removes the site
from ChatGPT search answers", "Training only"). Include Googlebot, Bingbot, OAI-SearchBot, GPTBot,
Claude-SearchBot, ClaudeBot and PerplexityBot at minimum.

### `visibility` (Module 6)
- `tier`: `"measured"` or `"proxy"`.
- `panel`: the full frozen prompt list. Each prompt:
  `{prompt, intent, branded, source, results: {<engine>: {runs, mentions, searched, days, competitors}}, instead?, sources?}`.
  - `intent`: Recommendation, Comparison, Pricing or Problem. `branded`: true for prompts containing the brand
    name (checked for accuracy, never counted in a rate).
  - `source`: where the prompt came from, one of `sales`, `gsc`, `keyword`, `competitor`, `community` or `site`
    (anything else is refused in the measured tier).
  - `results` is keyed by engine name ("ChatGPT", "Google AI Mode", "Perplexity"). Per engine:
    - `runs` (how many times the prompt was run on that engine) and `mentions` (runs that named the brand, never
      more than `runs`), both numbers;
    - `searched` (runs where the engine actually searched the web; a number, never more than `runs`, required in
      the measured tier);
    - `days: [{date, runs, mentions}]`, the same runs split by the day they were run: at least 8 distinct dates
      in the measured tier (the renderer counts distinct `date` values, not entries), and the day totals must
      equal `runs` and `mentions`;
    - `competitors: {"Competitor A": 3, …}`: how many of the same runs named each competitor in the control set.
      The renderer turns these into the per-engine control set the progress check subtracts. List every
      competitor in every cell and write `0` explicitly when none of the runs named it: a missing name is counted
      as 0 without warning. Use the same competitor names on every cell and in every later audit.
  - `instead` (competitors named instead) and `sources` (third-party domains cited) feed OS7 and Module 5.
- **Measured tier minimums**, all enforced: at least **20 unbranded prompts × 8 runs per prompt per engine × 3
  engines**, with each prompt and engine's runs spread over at least 8 separate dates (in practice one run a day
  for 8 days), queried directly, logged out. Every
  unbranded prompt needs a valid `source`, and at most a third may be `site`. Below any minimum, the renderer
  refuses the file: use the proxy tier.
- **Proxy tier**: one engine key, `"Search proxy"`, with `runs: 1` and `mentions: 0` or `1` per check. The report
  prints "named in X of N checks" and no rate.
- **Don't type engine totals or rates.** There is no `engines` field to fill in: the renderer computes each
  engine's answers, mentions, rate, 95% interval (two-way cluster-robust by prompt and day, with the Agresti–Coull
  floor, and a Wilson interval on the effective sample using a t critical value with G − 1 degrees of freedom,
  G = the smaller of the number of prompts and the number of days), design effect, searched share and smallest
  detectable change from the panel, so totals always reconcile. There is no pooled all-engines rate. The
  detectable change is planned from a rate of at least 5% and a design effect of at least 1.5, with α split
  across engines and the same G for its degrees of freedom, and printed as "N points" (no ±).
- `showPrompts` (optional, default 6): how many unbranded panel rows to print, in panel order.
- `summary`, `takeaway`, `protocol` (engines, runs, logged-out, location, language, dates, tool and version),
  `headline?`, `lede?`. Word the summary per engine or as the span of engine rates ("named in 9% to 14% of
  answers, by engine"), never as one pooled figure.

### `outcomes`
Optional: `{headline, items: [{label, value}], note}` from the client's GA4 custom AI channel or Bing / Search
Console reports. Leave it out when you have no first-party data; never estimate it. Label analytics counts a
lower bound.

### `fixes` (required)
`[{priority, fix, checks, effort, hours, impact}]`, where `checks` names the IDs it closes ("TD1, TD5").
- **Required:** `fix` and `impact` (text), and `priority`, one of `critical` (Critical blocker), `quick` (Quick
  win), `high` (High value) or `future` (Future operations). Anything else is refused.
- `critical` is only for fixing a failed gate, and a failed gate's fix must be the first entry, marked
  `critical`. The renderer refuses `critical` when no gate failed, and refuses a file whose first fix isn't the
  failed gate's.
- `hours` drives the effort bar (log scale); use 0 for ongoing work.
- `fixesHeadline` (top level, optional): the Priority fixes page headline.

### `working`
`[{what, evidence}]`. Real strengths with the evidence seen.

### `content`
- Both depths: `headline?`, `overview` (business type assumed, what to stop, what to start, biggest opportunity).
- Quick Audit: `top: [{piece, why, effort, hours}]` (5–7).
- Full Audit: `inventory: [{url, type, verdict (Keep / Refresh / Merge / Prune), action}]`;
  `funnel: [{stage, covered (Yes / Partly / No), gap}]`; `types: [{type, present, note}]`;
  `roadmap: {now: [], next: [], later: []}` with items `{piece, type, checks, levers, effort, evidence}`
  (`evidence` is High / Medium / Low: how strong the evidence is that this kind of piece moves the checks) and
  `roadmapNote` ("directional pending analytics" when there's no demand data);
  `evidence` (only with a client roster or a clear proof base; never invent clients):
  `{headline, intro, clusters: [{vertical, clients[], page, first?}], guardrail}` (the consent rule goes in
  `guardrail`; consent status per client stays in the working notes);
  `specs: [{title, h1, question, answer, structure, evidence, schema, slug}]` (top 3–5; all eight fields
  required);
  `guardrails: {production[], architecture[], measurement[]}` (all three arrays required).
- `content.evidence`, when present, needs `clusters[]`, each with `vertical`, `clients[]` and `page`.

### `offsite`
`{headline?, overview, prNote?, plays: [...]}` (`plays` must be an array). Each play: `name` (numbered, "1. Index hygiene"), `sub` (one
line for the timeline), **`effort` (required: `low` / `medium` / `high`)**, `start` and `end` in weeks (0–26;
4.3 = day 30, 8.6 = day 60, 13 = day 90), `ongoing?`, `marker? {week, label}`, `note?`, `why`, `firstStep`, and
for a Full Audit `evidence`, `steps[]` (numbered, named platforms and targets) and `expectation`. Quick Audit:
3–5 plays, no steps.

### `plan`
`{headline?, lede, d30: [], d60: [], d90: [], ongoing: [{n, l}], resourcing}`. Each row:
`{action, short (≤ 30 characters, for the swimlane), lane (Technical / Content / Off-site / Measurement), done,
effort, checks, threshold?}`. The report prints Action, Lane, What done looks like, Effort and Closes (from
`checks`); there is no impact column. Mark the 3–5 true thresholds: search-crawler access (including a CDN
setting that blocks Googlebot or Bingbot at the edge, such as Cloudflare's Training "Block"), AI search bot
access (robots.txt and the CDN edge), JavaScript rendering, a named spam-policy hit (G6), and a stale index that
misdescribes the brand. Bing indexation belongs in the first 30 days but is a threshold only when Copilot is a
priority channel for the client. Quick Audit: `d30` only.

### `method`
`{caveats: [{title, text}], benchmarks: [{figure, source, method, grade}], next}`. `benchmarks` lists every
figure quoted in the report, worded and graded exactly as in `benchmarks.md`. `next` says when to run the
progress check (about 30 days out) and that the full re-audit is quarterly, on the same scoring model.

## What the renderer writes

Next to the PDF and HTML, the renderer saves `<slug>.scores.json`, the computed scores the progress check copies.
Its shape:

```
{
  domain, date, isoDate, modelVersion, depth,
  total,                      // the point estimate (capped at 49 when a gate failed), or null when there is none (range only)
  uncapped,                   // the index before any failed-gate cap (null when there is no point estimate)
  range: [lo, hi],            // unverified range, as reported (capped when a gate failed)
  jrange: [lo, hi],           // judgment range; [null, null] when there is no point estimate
  band, confidence,
  pillars: {os, td, bq, sd, px},          // measured pillars only; an unmeasured pillar is absent
  disciplines: {SEO: [met, assessed], AEO: [met, assessed], GEO: [met, assessed]},
  gates: {G1: "pass", …}, checks: {OS1: "met", …},
  visibility: {
    tier: "measured",
    engines: [{engine, rate, se, lo, hi, answers, mentions, prompts, deff, mdc}],
    controls: [{name, engines: [{engine, rate, se, answers, mentions}]}]
  },
  disciplinesDetail: {SEO: {met, partial, notmet, unverifiable, total}, …}
}
```

In the proxy tier, `visibility` is `{tier: "proxy", engines: [{engine, answers, mentions}]}`: no rate, interval
or error. Never edit the file by hand, and never type one. The progress check refuses a v7 score block without
`modelVersion`, `pillars`, `disciplines`, `checks` and `gates`. It accepts a range-only block (`total: null`,
some pillars absent), and it detects a cap from `gates` (any `fail`), not from comparing `total` with `uncapped`.

## What the renderer produces

In order: cover (the index, or "No point estimate (range only)", labelled "unverified range a–b · judgment
range c–d", the band or band span, the confidence label and the line "expert-weighted checklist, not validated
against outcomes"; a capped index also says "Capped by a failed access check (N uncapped)", its band is Critical,
its ranges are the uncapped ones, labelled as what they would be once the gate is fixed, and its band track has
no "short of the next band" note; with no point estimate the cover shows no judgment range and the band track
shows the range only, with no point on it; the Seen-in-AI chip
shows each engine's rate, e.g. "ChatGPT 14 · AI Mode 8 · Perplexity 11 %", with "per engine; ranges inside";
checks met for SEO / AEO / GEO) · **Start here: SEO, AEO and GEO explained**, with what each means for the business
(fixed text, every report) · executive summary (the four measures side by side) · Part 1: access gates, the index
by pillar in the order Off-site, Technical, Buyer questions, Structured data, Page experience, with the unverified
range and the judgment range (a non-speed pillar with no assessed checks is labelled "range only", never
"dropped") · checks met per discipline · **What we could not see** · **Choices you've made** (any `choice` gate,
with its cost) · pages audited · one findings page per pillar (every check, its evidence, its evidence grade
printed as Measured / Observed / Inferred, and result) · commerce readiness (e-commerce) · AI crawler access ·
observed AI visibility per engine with intervals, design effect, searched share and smallest detectable change, or
the search-proxy spot-check · results from your analytics · priority fixes and what's working · Part 2 content ·
Part 3 off-site · Part 4 plan · method (weights, sensitivity under equal, on-site heavy and v6 weights plus
leave-one-pillar-out, evidence table with source grades A / B / C) · glossary.

**Two ranges, two jobs.** The *unverified range* scores every unverifiable check at 0 and at 1: it shows what
the missing logins and tools could change, and it sets the band span. The *judgment range* scores every partial
call at 0 and at 1: it shows how much rests on the analyst's judgment. It is printed, not used for the band, and
it isn't printed at all when there is no point estimate. Neither is a confidence interval. When a gate fails,
both ranges and the sensitivity values in the summary, the pillar section and the method page are the uncapped
ones, labelled "once the gate is fixed" (or "uncapped").

Sections with no data are skipped, so a Quick Audit comes out at about 15–17 pages and a Full Audit at 20–30.

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
