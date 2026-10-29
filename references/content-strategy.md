# Content strategy (Step 3B, Phase 2: prescribe)

Read this after the audit modules. Quick Audits need 3B.1 to 3B.4 only (condensed); Full Audits use every section.

The audit told you where the site stands. This phase turns the findings into a plan. Do this analysis after the
six modules, using everything you found in the crawl. For a **Quick Audit**, produce the condensed version (the
top 5–7 content opportunities and any obvious prune/refresh calls). For a **Full Audit + Growth Roadmap**,
produce all of the parts below in full.

The governing idea, from current best practice: stop mass-producing shallow pages that recycle web consensus,
and shift content capital toward proprietary, authoritative, answer-first pages with original data. RAG-based
engines retrieve and score *passage-level chunks*, not whole documents, so structure and information density
decide whether you get extracted and cited.

## 3B.1: Classify the business type and confirm the funnel

Confirm (or infer from the crawl) the business type, because it dictates which content types matter:

| Business type | Highest-value content types | Notes |
|---|---|---|
| SaaS / B2B technology | Product feature pages, use-case explainers, comparison & alternative pages, developer docs, FAQ clusters | Mostly non-local; G2/Capterra presence ~triples citation odds; don't hide pricing behind a form. Over half of B2B software buyers now start research in an AI chatbot, and most buy from their day-one list, so being in the AI consideration set is commercially decisive |
| Professional services / B2B services | Expert commentary, methodology guides, original case studies, original research/benchmark reports, regulatory analyses, detailed bios | Dual local + topical authority; LinkedIn is the top-cited domain for professional queries, so senior-leader publishing matters; quotes in business press; transparent methodology |
| Tourism / hospitality / experiences | Destination and experience guides, itinerary content, seasonal pages, FAQ clusters, trip-planning answers | Review-platform flywheel is essential: TripAdvisor is the #1 AI travel citation source; travel shows the *lowest* overlap between organic rank and AI citation, so ranking alone is least sufficient here; ~30% of US travellers used ChatGPT extensively for trip planning in 2025 |
| E-commerce | Category pages, product spec sheets, comparison matrices, user reviews | Complete Product schema, real stock status, feed to Merchant Center; avoid duplicate manufacturer copy; Reddit and YouTube reviews dominate AI shopping discussion |
| Healthcare / wellness | Treatment guides, clinician bios, research summaries, patient stories, local clinic pages | Strong local + YMYL; medical reviewer credentials; align to peer-reviewed consensus |
| Home services / builders | Local service pages, cost guides and transparent pricing tables, diagnostic guides, localized case studies, project galleries | Hyper-local; uniform NAP; unique geographic copy per location, never templated doorways; aggregators (Angi, Houzz) currently win contractor AI answers, so directory presence + reviews + contractor-subtype schema are how independents claw in |

## 3B.2: Content inventory verdict (keep / refresh / merge / prune)

For every meaningful page found in the crawl, assign a verdict. A clean, well-pruned site is favoured by RAG
systems; thin and duplicate pages dilute crawl budget and authority.

| Verdict | When it applies | Action |
|---|---|---|
| **Keep & monitor** | Strong content, current, clear purpose, evidence-rich | Leave as-is; re-check periodically |
| **Refresh & rewrite** | Useful topic but outdated facts, thin density, stale dates, or weak answer-first structure | Reconfirm intent; add statistics/quotes/citations; update visuals and dates |
| **Merge & redirect (301)** | Multiple pages targeting the same query, splitting authority | Consolidate into one parent guide; 301 the rest |
| **Prune (noindex or 410)** | Negligible value, off-topic, no traffic potential, no compliance need | Noindex, or delete and return 410 |

Honest limit: a full keep/refresh/merge/prune call ideally uses 12-month Google Search Console performance data
(impressions, clicks, decay). From an HTML crawl alone you can reliably flag thin pages, duplicate/overlapping
topics, stale dates, and weak structure. State that the final cut list should be confirmed against GSC data, and
offer to incorporate it if the client connects Search Console.

## 3B.3: Coverage gap map

Map what exists against two grids and name the holes.

**Funnel coverage** (does the site serve each stage?):

| Funnel stage | What the searcher wants | Page types that serve it |
|---|---|---|
| Problem aware | Naming a symptom or challenge | Problem/explainer pages, diagnostic tools, educational articles |
| Solution aware | Comparing methods and categories | Methodology pages, comparison guides, ultimate guides |
| Product aware | Evaluating specific providers | Service/product pages, alternative pages, case studies |
| Decision | Ready to buy or contact | Pricing pages, demos/trials, localized case studies, reviews |

**Content-type coverage**: against the business-type row in 3B.1, which high-value types are missing or weak?
Be specific and evidence-based (e.g. "no comparison page despite competing in a crowded category", "case studies
exist at /work but lack quantified results", "FAQ present but no FAQPage schema").

## 3B.4: Prioritized content roadmap

Turn the gaps and verdicts into a ranked backlog. Each item gets: the content type, target query/intent, funnel
stage, the specific GEO/AEO levers it must include (answer-first block, statistics, expert quote, schema type),
an effort estimate, and an expected-impact note.

Prioritize using this opportunity logic:

```
Priority ≈ (Demand × Intent value × (1 + Citation lift) × Decay) ÷ (Effort × Technical friction)
```

- **Demand**: organic impressions / search volume for the topic (needs GSC or a keyword tool; if unavailable,
  estimate qualitatively from topic breadth).
- **Intent value**: commercial weight (transactional ≈ 1.5, informational ≈ 1.0).
- **Citation lift**: the GEO tactic uplift the piece will carry (e.g. +0.41 expert quote, +0.32 statistics).
- **Decay**: year-over-year drop for an existing page (needs GSC; new pieces skip this).
- **Effort**: build difficulty, 1–5.
- **Technical friction**: page-speed / rendering penalty (e.g. >500ms load is a drag).

Honest limit: Demand and Decay need GSC/GA4 or a keyword tool. Without them, rank qualitatively by intent value,
citation lift, and effort, and label the roadmap "directional pending analytics." Group the backlog as **Now /
Next / Later** (or numbered priority) so the client has a clear sequence, not just a list.

## 3B.5: Page-level build specs (answer-first blueprint)

For the top recommended pieces (and as the rewrite spec for refreshes), give a concrete structure. Every page
follows the same answer-first pattern, because that is what gets extracted:

1. **Descriptive H1** naming the entity/topic (never vague slogans like "We Deliver Innovation").
2. **Answer-first block**: an H2 written as the real user question, immediately followed by a direct, standalone
   answer in the first ~60 words ("Direct Answer: ...").
3. **Supporting structure**: a table, numbered list, or spec grid that backs the answer with specifics.
4. **Evidence**: at least one verifiable statistic with source, and/or a named expert quote.
5. **Schema**: the right type for the page (see Module 2 framework), e.g. FAQPage nested in Article, Service,
   Product, LocalBusiness.
6. **Freshness**: visible publish/updated date.

Provide a short worked blueprint for each priority piece (headings + the answer-first sentence + which schema +
which evidence to add). Use the page-type that fits: service, local service, product, comparison, case study,
FAQ, pricing, about, ultimate guide, and so on. Keep slugs natural and 4–7 words
(`/category/crm-integration-costs-2026`, not `/p=123`).


## 3B.6: Client-Evidence Content Map (when a roster is available)

If the user supplied a client list or the crawl surfaced one, map it before finalizing the roadmap:

1. **Cluster by vertical.** Group clients into industry clusters (trades, non-profit, healthcare, associations,
   public sector, retail, professional services, and so on). Note cluster depth: three or more clients in one
   vertical is a defensible niche.
2. **Find the wedge.** The best cluster is deep evidence + weak competition: verticals the Big-4 and generic
   listicles ignore. Lead the industry-page sequence with it.
3. **One page per strong vertical**, each anchored by a real client story with numbers and quotes, targeting
   the "[industry] + AI" query space, with Service schema. Weak clusters fold into a case-study library
   instead. **Never templated doorways**: each page carries its own evidence or doesn't ship.
4. **Association and network clients are also off-site targets**: member organizations have newsletters and
   member-news channels; feed them into the Play 4 reclamation and coverage lists.
5. **Permission guardrail, always stated in the report**: logos on a site suggest consent to display, not
   consent to publish stories. Confirm per client before naming them in page copy; anonymize by vertical
   where consent is limited.

Render this as its own report section (14b) with the cluster table (Vertical | Client evidence | Page to
build | Target query space) and the guardrail bullets.

## 3B.7: Production guardrails (so the plan doesn't backfire)

Google's 2025 Quality Rater Guidelines explicitly target scaled content abuse and filler, regardless of whether
a human or AI produced it. The 2026 core updates were highly volatile. So the roadmap must come with guardrails:

- **The 3-step responsible production protocol**: (1) use AI for scaffolding (outlines, clustering, intent
  mapping); (2) inject original data and proof: proprietary stats, customer stories, screenshots, internal
  expert quotes (the E-E-A-T layer AI cannot invent); (3) humanize: cut empty AI phrasing, make it direct and
  active, and have a subject-matter expert review every draft for facts and voice before publishing.
- **E-E-A-T checklist** for each piece: first-hand experience (original screenshots/data), named expert author
  with a linked bio, transparent sourcing (link primary sources), a visible "last updated" date, disclaimers on
  YMYL topics, and easy access to contact/about.
- **Architecture**: keep content within ~3 clicks of the homepage; build pillar/cluster structures with
  parent-child URLs and descriptive internal links; consolidate sub-topics into comprehensive pages rather than
  spinning up thin "fan-out" pages for every query variation. Note the flip side: Google's AI surfaces now run
  *query fan-out* (a user prompt spawns multiple sub-queries, each retrieving separately), which rewards a
  genuine topical cluster of substantive pages over one mega-guide. Depth across a cluster,, never thin
  page-per-keyword volume.
- **The off-site workstream is a phase of its own, not an afterthought.** Since mentions out-correlate both
  backlinks and page count for AI visibility, the off-site program is prescribed in full in `offsite-roadmap.md` (Step 3C), with its
  own plays and steps, and sequenced alongside the content backlog in the Step 3D implementation plan. On-site
  content and off-site authority are designed to feed each other: the original-data asset (3C Play 4) is what
  the digital-PR outreach pitches, and the answer-first pages (3B.5) are what earned mentions land on.

## 3B.8: Measurement plan

Recommend tracking across all four layers so the client can prove the work: traditional SEO (non-branded clicks,
core rankings via GSC/keyword tool, plus the GSC AI Mode segment), AEO (featured-snippet and People-Also-Ask
ownership), GEO (citation share and brand mentions across ChatGPT, Perplexity, Gemini, via a share-of-voice
tool matched to the client's size: Otterly.AI or Peec AI for SMB/agency, Semrush AI Toolkit or Ahrefs Brand
Radar on existing stacks, Profound for enterprise, or at minimum a monthly manual re-run of the Module 6
prompt set), and conversion/ROI (AI-referral sessions and pipeline via the GA4 custom channel and UTMs, always
reported as a floor given referrer-stripping, and always paired with the conversion-quality story since AI
visitors convert at multiples of organic). Tie it back to the AI Visibility Score and the spot-check baseline so
progress is re-measurable on the next audit.
