# Benchmarks, evidence, and myths

This file holds the figures the audit quotes and the myths it should never repeat. Every number here comes from
a third-party study or platform statement published in 2024–2026. Treat them as directional: they will move.
Where a specific number materially drives a recommendation, run a quick web search to confirm it is still
current before stating it as fact, and attribute it to its source in the report.

When updating this skill, update the figures here first; the rest of the skill points to this file.

## Why the audit is weighted the way it is

Organic discovery is in a structural transition. The old model, indexing pages to return a ranked list of blue
links, is being replaced by conversational answer engines, real-time generative summaries, and autonomous agents
that read, synthesize, and act on a user's behalf. Five things follow from that, and they shape the whole audit:

- **Google still carries the volume.** Roughly 90% of traditional search, and about 80% of all digital queries
  once AI assistants are counted in the denominator (ChatGPT ~17%). Nobody should abandon Google. But AI is where
  discovery is growing, and AI-referred visitors convert far better: studies put the multiple between roughly 4x
  and 20x+ organic (Semrush: 4.4x average; Seer: ChatGPT referrals at 15.9% vs organic's 1.76%). The right
  posture is "optimize for Search first, AI engines close behind", with the value shifting from raw sessions to
  citation, mention, and conversion.
- **AI Overviews redistribute clicks.** The presence of a Google AI Overview correlates with roughly a 58% lower
  click-through rate for top-ranking pages, and zero-click searches have climbed toward 69% (Google AI Mode runs
  ~93% zero-click). This is redistribution, not pure loss: brands cited inside an AI Overview see materially more
  clicks, while top-10 pages that fail to earn a citation lose most of their traffic.
- **Ranking and citation are decoupled.** The overlap between the organic top 10 and AI-cited sources sits
  between roughly 17% and 38% depending on platform and study. Ranking first no longer guarantees being cited,
  and travel and local categories show the lowest overlap of all.
- **AI visibility is won substantially off-site.** Ahrefs' study of 75,000 brands found branded web mentions
  correlate with AI Overview visibility at 0.664, roughly three times the correlation of backlinks (0.218), and a
  follow-up found YouTube mentions the single strongest factor (~0.74). Muck Rack's 2026 analysis attributed ~84%
  of AI citations to earned editorial media. The same Ahrefs work found almost no relationship between page count
  and AI visibility, which kills the "publish more pages" strategy. This is why the audit weights the
  brand-mention footprint as heavily as on-site content.
- **Each engine retrieves differently.** Third-party AI crawlers (GPTBot, ClaudeBot, PerplexityBot) often read
  raw HTML rather than rendering JavaScript, so client-side-rendered content can be invisible to them. ChatGPT
  search runs on the **Bing index** (no Bing presence, no ChatGPT citation). Claude's web search runs on the
  **Brave index** (~87% of Claude's citations match Brave's top results in independent tests). Perplexity runs
  its own freshness-weighted crawler. Google's AI surfaces draw from Google's own index and E-E-A-T systems.

So visibility now means being the source AI engines cite and the brand they mention, not just ranking. The audit
measures all three layers, the technical plumbing underneath them, and the off-site mention footprint, then tells
a business what to fix first.

Module-specific figures (GEO tactic lifts, Core Web Vitals citation thresholds, content length and freshness
effects, local and review-platform data) sit next to the checks they inform in `audit-modules.md`.

## Myths to avoid repeating

When writing recommendations, don't fall for these. Each was wrong as of mid-2026:

- **"SEO is dead."** Technical SEO is repurposed to feed AI retrieval, not retired. GEO and AEO are layers on
  top of it; audit them together.
- **"AI search replaced traditional search."** Search volume is still far larger. Balance, don't abandon.
- **"Ranking #1 guarantees citations."** Organic-to-citation overlap is only ~17–38%.
- **"One engine's playbook covers them all."** ChatGPT retrieves from Bing, Claude from Brave, Gemini and AI
  Overviews from Google. A site can be visible in one and absent from the others, so indexation and testing are
  per-engine.
- **"llms.txt guarantees AI visibility."** It's an agentic operating manual, not a ranking factor.
- **"Schema guarantees rankings or citations."** Schema is packaging, not product. It defines facts and earns
  eligibility; it can't rescue thin or unoriginal content, and it must match visible content.
- **"FAQ schema is dead" / "FAQ schema matters more than ever."** Both overcorrect. The Google SERP dropdown was
  retired in May 2026; the markup remains valid and useful for machine comprehension on AI and Bing surfaces.
  Keep it for structure, drop it as a SERP-appearance tactic.
- **"FAQs alone create AEO."** AEO needs answer-first structure, direct definitions, and nested schema together.
- **"Rewrite every heading as a question."** Use question headings only where they match real user queries;
  descriptive headings still work for humans and machines.
- **"More content always helps."** Length without original data lowers fact-to-word density and citation rates.
  Favour density over word count.
- **"Publishing more pages improves AI visibility."** Page count shows almost no relationship with AI
  visibility, and a page per query variation is thin-content spam. Consolidate sub-topics into one
  comprehensive page with clear question headings.
- **"Backlinks no longer matter" / "Backlinks are the main AI lever."** Both wrong. Backlinks remain a
  prominence and validation signal, but branded mentions correlate ~3x more strongly with AI visibility. The
  link-building playbook is not the AI playbook.
- **"AI-generated content is penalized for being AI-generated."** Quality and helpfulness are judged, not
  authorship. Audit density and originality, not "AI detection".
- **"robots.txt prevents indexing."** It blocks crawling; use `noindex` to prevent indexing.
- **"Blocking GPTBot hurts Google rankings."** Training-crawler blocks don't affect Google Search. Blocking
  *retrieval* bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot) is what removes you from AI answers.
- **"AI traffic is too small to matter."** It's ~1% of referrals but converts at several times organic and is
  the fastest-growing channel. Report it as a floor, since referrer-stripping undercounts it.
- **"You can hack your way into AI answers via Reddit or Wikipedia edits."** Communities and engines detect it,
  edits get reverted, accounts get banned, and ChatGPT has hardened its citation behaviour against manipulation.
- **"Local SEO is just Google Business Profile."** It spans landing pages, schema, NAP consistency, and Bing
  Places, and AI local recommendation is far more selective than the 3-pack, with factor weightings that flip
  toward on-page content and citations.
