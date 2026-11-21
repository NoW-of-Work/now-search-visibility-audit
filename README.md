# NoW Search Visibility Audit & Growth Roadmap: SEO · GEO · AEO

**A Claude skill from [The NoW of Work](https://nowofwork.com).**

Give Claude a URL and it audits the site across the three layers of modern search, then builds a growth roadmap
from what it finds. You get a short recap in the chat and a designed, chart-led PDF report with four separate
measures: access checks, an **AI Search Readiness Index** shown with a range, how often AI answers actually name
the brand (per engine, with a margin of error), and AI visits from your analytics.

- **SEO**: traditional search (Google, Bing). Crawlability, raw-vs-rendered content, titles, meta, headings,
  canonicals, response codes, internal links, indexation.
- **AEO** (Answer Engine Optimization): being the answer shown above the links, in AI Overviews, AI Mode,
  assistants and the featured snippets that remain. Plain answers near the top of the page and question-led
  headings. No special markup is required.
- **GEO** (Generative Engine Optimization): whether AI engines such as ChatGPT, Perplexity, Google AI Overviews
  and AI Mode, Gemini, Claude and Copilot *name and cite* you. Buyer-question coverage, original proof, entity
  clarity, and the off-site presence (mentions, reviews, videos, directories) that tracks AI visibility most
  closely.

For Google AI Overviews, only 17% to 38% of citations come from the organic top 10 (early 2026, vendor studies),
so ranking well doesn't guarantee being named. Two Ahrefs studies (vendor, correlational) found brand mentions
tracked AI visibility far more than backlinks or page count; a separate study (Moore and Dunne, vendor authors,
B2B SaaS) found domain-level factors explained far more than page features. So much of the work is off-site. This audit
checks all of it, says what it couldn't see, and tells you what to fix first.

Most readers don't know the difference between the three, so every report opens with a one-page explainer:
where each shows up, what it measures, and what it does for the business.

---

## What it does

The audit runs in four phases, and each one feeds the next:

1. **Audit (diagnose).** Six modules: technical, performance and penalty screen; schema and entity markup;
   content and buyer-question alignment; AI crawler access and first-party AI controls (OAI-SearchBot,
   Claude-SearchBot, PerplexityBot, training bots, CDN blocking, Google's AI opt-out setting); off-site presence
   and entity; and observed AI visibility, a frozen panel of buyer questions run repeatedly on several AI engines.
   It screens for Google's named spam-policy patterns.
2. **On-site content strategy (prescribe).** A keep / refresh / merge / prune verdict for every page, a
   buyer-question, funnel and content-type gap map, a Now / Next / Later backlog, and answer-first build specs for
   the top pieces.
3. **Off-site authority roadmap (prescribe).** The plays most associated with being named in AI answers (Bing
   and Brave indexation, entity building, review platforms, digital PR, YouTube, community, local), each with
   numbered steps and the specific platforms for your category.
4. **30/60/90-day plan (schedule).** Everything above in one dependency-ordered plan across technical, content,
   off-site and measurement work, with the blocking items flagged.

There are two depths. A **Quick Audit** gives the access checks, the readiness index with its range, a
search-proxy spot-check of whether AI answers name you, the top fixes, and short lists of content and off-site
opportunities. A **Full Audit + Growth Roadmap** adds a measured AI visibility test (20 or more buyer questions,
each run at least eight times on three AI engines, spread over at least eight separate days, in practice one run
a day for eight days) and produces the complete four-part report. Claude asks which you want before it starts.
One honest limit up front: at 20 prompts over 8 days a re-check only detects large moves (at least about 16
points; each report prints its own figure; our calculation). Precision comes from more prompts run on more
separate days, not from more runs of the same prompt on the same days. For month-to-month tracking use 40 or more
prompts, or treat monthly results as descriptive and test quarterly.

---

## Using it

Once installed, give Claude a URL and ask:

> "Audit example.com and build me a content plan."
>
> "Why isn't my site getting cited by ChatGPT, and what should I write?"
>
> "Run a full SEO, GEO and AEO audit on example.com."

Claude confirms the audit depth, your business type, and whether you're a local business, then crawls the site
and delivers the recap and the report.

**Tracking progress.** For monthly re-checks against this audit, install the companion skill,
[NoW Visibility Progress Check](https://github.com/NoW-of-Work/now-visibility-progress-check). It re-scores the
site on the same model, compares like for like, and shows what moved beyond the noise in the same report format.

---

## Installation

**Claude desktop app or claude.ai**

1. Download `now-search-visibility-audit.zip` from the
   [latest release](https://github.com/NoW-of-Work/now-search-visibility-audit/releases/latest).
2. In Claude, open **Settings → Capabilities → Skills** (or **Customize → Skills**) and click **+**.
3. Upload the ZIP. No unzipping needed.

**Claude Code**

```bash
git clone https://github.com/NoW-of-Work/now-search-visibility-audit.git ~/.claude/skills/now-search-visibility-audit
```

### Requirements

- Web fetch and web search tools (built in on claude.ai and in Claude Code).
- To build the report: Node.js 18 or later (no packages to install) and any headless Chromium for the PDF:
  Chrome, Edge, Chromium, Brave, or Python Playwright. Without one you get a print-ready HTML file that saves to
  PDF from any browser.
- Optional: a shell with `curl`, `pdftoppm` and `pdftotext` for sharper technical checks and render
  verification.

On claude.ai the report lands in your downloads. In Claude Code it's saved to a `visibility-audits/` folder in
the directory you're working in (set `AUDIT_OUT` to choose another). The audit's data file (`.json`) is saved
next to the PDF so a later [progress check](https://github.com/NoW-of-Work/now-visibility-progress-check) can
compare against it.

---

## What's in the report

A designed, chart-led PDF: a navy cover with the readiness index on a band track, labelled with both its
unverified range and its judgment range, and each AI engine's mention rate, a **Start here** page that explains SEO, AEO and GEO in plain words, and a chart or visual on
every section (gate checks, pillar ranges, checks met per discipline, mention rates with intervals per engine,
client-evidence bars, a six-month off-site timeline, a 30/60/90 swimlane).

The four measures are kept apart, because blending them would hide what's known:

1. **Access checks** (pass, fail, verify, or a documented choice). A failed check is a Critical blocker.
2. **AI Search Readiness Index** (0–100): 37 checks across five pillars, weighted Off-site 45, Technical 25,
   Buyer questions 20, Structured data 5, Page experience 5. Shown with two ranges (what unverifiable checks and
   judgment calls could change), a confidence label and a sensitivity check under other weightings. It is an
   expert-weighted checklist, not validated against outcomes, and the report says so.
3. **Observed AI visibility**: how often AI answers name the brand, per engine, with a 95% interval that allows
   for repeated runs of the same question and day-to-day variation, plus the smallest change a re-check could
   detect.
4. **Outcomes**: AI referral sessions and conversions from your analytics, always a lower bound.

SEO, AEO and GEO are shown as checks met, not as scores out of 10, so each word maps to concrete work.

**Part 1, Visibility Audit:** executive summary, access checks, the index by pillar, choices you've made, what
we could not see, pages audited, every check with its evidence and grade, AI crawler access, observed AI
visibility, prioritized fixes, and what's working well.

**Part 2, On-Site Content Strategy & Roadmap:** inventory verdicts, coverage gap map, the content backlog, page
build specs, production guardrails, and a measurement plan.

**Part 3, Off-Site Authority & Entity Roadmap:** the plays selected for this site, why each made the list, and
step-by-step detail with named platforms and targets.

**Part 4, 30/60/90 Implementation Plan:** the full sequence with blocking items flagged and an honest resourcing
note.

The report uses The NoW of Work's brand and is signed "Prepared by The NoW of Work". See `sample/` for a full
example on a fictional firm, built from `assets/report/example-audit.json`.

---

## How it's built

```
now-search-visibility-audit/
├── SKILL.md                      ← the workflow Claude follows and its principles
├── references/
│   ├── audit-modules.md          ← the six audit modules, AEO layer, honest limits
│   ├── readiness-checklist.md    ← the scoring contract: gates, 37 checks, weights, visibility and re-audit rules
│   ├── content-strategy.md       ← Phase 2: inventory, gaps, backlog, build specs
│   ├── offsite-roadmap.md        ← Phase 3: the seven off-site plays
│   ├── report-spec.md            ← the audit data file, field by field, and render checks
│   └── benchmarks.md             ← every figure the audit may quote, graded, plus myths to avoid
├── assets/report/
│   ├── render-audit.mjs          ← builds the report from the audit data file
│   ├── scoring.mjs               ← computes and validates every score; refuses files that break the contract
│   ├── charts.mjs, components.mjs, report.css   ← the shared visual system
│   ├── to-pdf.mjs                ← prints the HTML with any headless Chromium
│   └── example-audit.json        ← a complete worked example
├── sample/
│   └── SAMPLE-visibility-audit.pdf
├── LICENSE
└── README.md
```

Claude loads `SKILL.md` when the skill triggers and reads each reference file only when it reaches that step.

**A note on the numbers.** Every figure the report may quote lives in `references/benchmarks.md` with its
source, date, method, a vendor flag and an evidence grade (A: platform documentation or peer-reviewed; B:
preprints, large studies with published methods and self-reported platform figures; C: small, single-client,
opinion, single press reports or undisclosed methods). Each check in the report carries its own evidence label:
Measured, Observed or Inferred.
Almost all AI-visibility figures are correlations published by vendors, and the report words them that way. The
skill never invents measured data: where an HTML fetch can't measure something (real Core Web Vitals, Search
Console data, review counts, mention volume), the check is marked unverifiable and the report names the tool to
use instead. The weights are expert judgment, not fitted to outcomes. Findings are expert guidance, not a
guarantee of ranking outcomes.

---

## Version history

**7.0.1**: Report layout fixes. Long labels in tables, cards and pills wrap instead of shrinking the whole PDF; the resourcing note and next check-in box sit above their tables so they no longer spill onto a page of their own. Scoring unchanged.

**7.0.0**: Evidence-based rebuild.
- Scoring model 7.0. The single AI Visibility Score is replaced by four separate measures: access gates, an
  AI Search Readiness Index, observed AI visibility and outcomes
- The index is a published checklist of 37 checks across five pillars, with weights ordered by the evidence
  (expert judgment, not fitted: Off-site 45,
  Technical 25, Buyer questions 20, Structured data 5, Page experience 5), shown with an unverified range, a
  judgment range, a confidence label and a sensitivity check. The renderer computes every number and refuses a
  data file that breaks the contract. When a heavily weighted pillar can't be assessed at all, there is no point
  estimate and no judgment range, only a range. A failed access check caps the index at 49 (Critical) and the
  report shows the uncapped ranges as "once the gate is fixed"
- Access gates can be a documented choice (deliberately blocking AI search bots, or opting out of Google's AI
  features), shown with its cost instead of being scored as a failure. The spam-policy gate uses Google's own
  policy headings only. Sites behind Cloudflare are checked for the Training "Block" setting, which since
  15 Sep 2026 also stops Googlebot and Bingbot
- Observed AI visibility: a frozen panel of at least 20 buyer questions, each run at least eight times on at
  least three engines over at least eight separate dates, with prompt sources and competitor mentions recorded,
  per-engine rates with intervals that allow for repeated runs and day-to-day variation (t critical values from
  the smaller of the number of prompts and days), and an honestly planned smallest detectable change. No pooled
  rate
- SEO, AEO and GEO are shown as checks met, not scores out of 10
- Every quoted figure is graded in `benchmarks.md` with source, date, method and vendor flag; claims that failed
  verification are listed so they aren't reused
- Page speed is scored only from a real measurement, never estimated
- The progress check compares audits only on the same scoring model, like for like on checks assessed both times,
  against the original audit, with formal verdicts at the quarterly re-audit

**6.0.0**: Visual report.
- The Word report is replaced by a designed, chart-led PDF built from a single audit data file, so every audit
  looks the same and can be compared month to month
- New opening page explains SEO, AEO and GEO in plain words, with what each means for the business
- Charts: score band track, five-pillar chart, points earned, status bars per analysis, citation dots,
  client-evidence bars, six-month off-site timeline, 30/60/90 swimlane
- No npm installs or LibreOffice: Node.js plus any headless Chromium, with a print-ready HTML fallback
- The data file is saved next to the report as the baseline for the monthly progress check

**5.2.0**: Public release.
- Restructured for progressive loading: a ~330-line `SKILL.md` plus five reference files, down from one
  1,300-line file, so Claude reads only what each step needs
- One band scale (Critical / Needs Work / On Track / Strong) used consistently across scores, recap, and report
  colours; contrast rules cover every fill colour
- Content-strategy sections renumbered into reading order; benchmark figures consolidated into one file;
  duplicate myths merged
- `docx` installs to a scratch folder instead of the user's project; report delivery works without
  Cowork-specific tools
- Fixes from a live test run: reliable Bing and Brave checks (with a Verify status when Bing can't be confirmed
  from outside), pillar-score anchors, a single text-contrast helper for every shaded cell, correct llms.txt link
  syntax, a working docx-helper lookup on macOS, and reports saved to a `visibility-audits/` folder rather than
  the project root
- Licensed CC BY 4.0

**5.1.0**: Field-tested release. Client-evidence content map, stale-index check, proof-element alt-text check,
shell-based fetching, and a verified cover-rendering recipe.

**5.0.0**: Off-site authority roadmap (seven plays) and the 30/60/90 implementation plan; four-part report.

**4.0.0**: AI citation spot-check, re-weighted AI Visibility Score, per-engine retrieval map, penalty risk
screen, category citation-source map.

**3.0.0**: Content strategy and roadmap.

**2.0.0**: AI Visibility Score with five weighted pillars, AI crawler access matrix, research-based rebuild.

**1.0.0**: First NoW of Work release.

---

## Credits and licence

Originally inspired by Alex Labat's [SEO-GEO-AEO-Skill](https://github.com/SNLabat/SEO-GEO-AEO-Skill).

© 2026 The NoW of Work. Licensed under [Creative Commons Attribution 4.0 International (CC BY
4.0)](https://creativecommons.org/licenses/by/4.0/). You can use, share and adapt it, including commercially, as
long as you credit The NoW of Work and link to the licence. See `LICENSE`.

The licence covers the skill's text, not The NoW of Work's name or logo. "The NoW of Work" and "The Future is
NoW" are marks of The NoW of Work. If you publish a modified version, remove the NoW branding from the report or
make clear it isn't an official NoW of Work release.

Questions or client work: [ai@nowofwork.com](mailto:ai@nowofwork.com)
