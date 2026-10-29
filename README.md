# NoW Search Visibility Audit & Growth Roadmap: SEO · GEO · AEO

**A Claude skill from [The NoW of Work](https://nowofwork.com).**

Give Claude a URL and it audits the site across the three layers of modern search, then builds a growth roadmap
from what it finds. You get a short recap in the chat and a branded, client-ready report as a Word document and
a PDF, headlined by a single **AI Visibility Score out of 100**.

- **SEO**: traditional search (Google, Bing). Crawlability, raw-vs-rendered content, titles, meta, headings,
  canonicals, response codes, schema, internal links.
- **GEO** (Generative Engine Optimization): whether AI engines such as ChatGPT, Perplexity, Google AI Overviews
  and AI Mode, Gemini, Claude and Copilot *cite* you. Expert quotes, statistics, source citations, E-E-A-T, entity
  clarity, content density, freshness, and the earned-media bias of AI engines.
- **AEO** (Answer Engine Optimization): featured snippets, People Also Ask, and voice. Answer-first formatting,
  question-phrased headings, FAQ and HowTo schema.

Ranking first no longer guarantees being cited in an AI answer: the overlap between Google's top 10 and the
sources AI engines cite runs roughly 17–38%. A site can rank well and still be invisible to the engines buyers now
use, and much of AI visibility is won off-site through brand mentions. This audit measures all of it and tells
you what to fix first.

---

## What it does

The audit runs in four phases, and each one feeds the next:

1. **Audit (diagnose).** Six modules: technical and performance, schema and entity graph, GEO content, AI
   crawler access (GPTBot, OAI-SearchBot, Claude-SearchBot, PerplexityBot and others), off-page brand mentions,
   and an AI citation spot-check that tests which brands show up for your buyers' questions. Also screens for
   Google spam-policy risks.
2. **On-site content strategy (prescribe).** A keep / refresh / merge / prune verdict for every page, a funnel
   and content-type gap map, a Now / Next / Later backlog, and answer-first build specs for the top pieces.
3. **Off-site authority roadmap (prescribe).** The plays that earn AI citations off the site (Bing and Brave
   indexation, entity building, review platforms, digital PR, YouTube, community, local), each with numbered
   steps and the specific platforms for your category.
4. **30/60/90-day plan (schedule).** Everything above in one dependency-ordered plan across technical, content,
   off-site and measurement work, with the blocking items flagged.

There are two depths. A **Quick Audit** gives the scores, the top fixes, and short lists of content and off-site
opportunities. A **Full Audit + Growth Roadmap** runs all six modules and produces the complete four-part report.
Claude asks which you want before it starts.

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
- To build the report: Node.js with the `docx` package (the skill installs it if missing) and LibreOffice for
  the PDF. Without LibreOffice you still get the Word document.
- Optional: a shell with `curl`, `pdftoppm` and `pdftotext` for sharper technical checks and render
  verification.

On claude.ai the report lands in your downloads. In Claude Code it's saved to a `visibility-audits/` folder in
the directory you're working in (set `AUDIT_OUT` to choose another).

---

## What's in the report

**Part 1, Visibility Audit:** cover with the AI Visibility Score and colour-coded SEO / GEO / AEO scores,
executive summary, five-pillar score breakdown, pages audited, module-by-module findings, the AI citation
spot-check, prioritized fixes, and what's working well.

**Part 2, On-Site Content Strategy & Roadmap:** inventory verdicts, coverage gap map, the content backlog, page
build specs, production guardrails, and a measurement plan.

**Part 3, Off-Site Authority & Entity Roadmap:** the plays selected for this site, why each made the list, and
step-by-step detail with named platforms and targets.

**Part 4, 30/60/90 Implementation Plan:** the full sequence with blocking items flagged and an honest resourcing
note.

The report uses The NoW of Work's brand and is signed "Prepared by The NoW of Work". See `sample/` for an
example on a fictional company. The sample was produced by an earlier version and shows the first two parts
only.

---

## How it's built

```
now-search-visibility-audit/
├── SKILL.md                      ← the workflow Claude follows, scoring, and principles
├── references/
│   ├── audit-modules.md          ← the six audit modules, AEO layer, honest limits
│   ├── content-strategy.md       ← Phase 2: inventory, gaps, backlog, build specs
│   ├── offsite-roadmap.md        ← Phase 3: the seven off-site plays
│   ├── report-spec.md            ← brand system, report layout, render checks
│   └── benchmarks.md             ← the evidence behind the weighting, and myths to avoid
├── sample/
│   └── SAMPLE-visibility-audit-and-content-roadmap.pdf
├── LICENSE
└── README.md
```

Claude loads `SKILL.md` when the skill triggers and reads each reference file only when it reaches that step.

**A note on the numbers.** The benchmarks (citation-lift figures, Core Web Vitals thresholds, mention
correlations and so on) come from third-party studies published in 2024–2026. They are directional and will
change. The skill tells Claude to treat them that way and to check current figures with a web search when a
number drives a recommendation. It also never invents measured data: where an HTML fetch can't measure something
(real Core Web Vitals, Search Console data), the report names the tool to use instead. Findings are expert
guidance, not a guarantee of ranking outcomes.

---

## Version history

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
