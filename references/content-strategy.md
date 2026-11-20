# Content strategy (Step 3B, Phase 2: prescribe)

Read this after the audit modules. Quick Audits need 3B.1 to 3B.4 only (condensed); Full Audits use every section.

This phase turns the audit findings into a plan. A **Quick Audit** gets the condensed version (top 5–7 content
opportunities, obvious prune/refresh calls); a **Full Audit + Growth Roadmap** gets every part in full. Where a
recommendation fixes a check in `readiness-checklist.md`, name the check ID ("closes BQ1, BQ4").

The governing idea: cover the questions buyers actually ask, with pages that answer them plainly and carry proof
only this client can publish. Pages whose wording overlaps more with tracked buyer prompts were cited more (about
30% more per standard deviation; observational, a word-overlap measure, 19 B2B SaaS workspaces, vendor authors; the
authors say this is not an intervention effect, and out-of-sample prediction was weak, r² 0.018), and formatting,
schema and length explained very little once domain strength was controlled
([Moore and Dunne, arXiv 2609.35077](https://arxiv.org/pdf/2609.35077), Sep 2026). Page work is bounded: in the
same data, domain-level factors (on-site and off-site alike) explain far more than any page feature. Off-site
work (Step 3C) carries more of the index because two Ahrefs studies (vendor, correlational) found brand mentions
tracked AI visibility far more than backlinks or page count; the weights are expert judgment. A direct answer near the top helps readers and makes the passage easy to extract. Google's guide (15 May 2026) says no chunking into small pieces, llms.txt or special markup is needed,
and that optimizing for AI search "is still SEO"
([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). Never promise that
restructuring alone will win citations.

**Figures.** Every figure that reaches the client report carries its source link, month and year, method
(experiment, correlation, survey, lab) and a vendor flag. Correlations are never worded as causes.

## 3B.1: Classify the business type and confirm the funnel

Confirm (or infer from the crawl) the business type, because it dictates which content types matter:

| Business type | Highest-value content types | Notes |
|---|---|---|
| SaaS / B2B technology | Product feature pages, use-case explainers, visible pricing, disclosed criteria-based comparison and alternative pages, developer docs | Mostly non-local. Don't hide pricing behind a form (BQ8, BQ9). G2's survey of 1,076 buyers found 51% now start software research in an AI chatbot more often than Google ([G2](https://company.g2.com/news/g2-research-the-answer-economy), Apr 2026, self-reported survey by a review platform that benefits from the finding). Review-platform presence: see Play 3 |
| Professional services / B2B services | Expert commentary, methodology guides, original case studies, original research or benchmark reports, regulatory analyses, detailed bios | Dual local and topical authority. LinkedIn was the most-cited domain for professional queries in Profound's data ([Profound](https://tryprofound.com/blog/linkedin-is-the-most-cited-domain-for-professional-queries-in-ai-search), Nov 2025–Feb 2026, Profound's own query classification, tracking vendor), so senior-leader publishing there is worth planning. Quotes in business press; transparent methodology (BQ4, BQ6, OS5) |
| Tourism / hospitality / experiences | Destination and experience guides, itineraries, seasonal pages, trip-planning answers | Review platforms matter. TripAdvisor is among the most-cited travel sources: top for "things to do" queries in Google AI answers ([5WPR](https://www.5wpr.com/new/ai-travel-recommendations-what-632-542-google-answers-cite/), 632,542 answers, agency study) and, in one Cloudbeds study (hotel-software vendor, Jul 2025, 810 prompts, 145 hotels, ChatGPT, Perplexity, Gemini, grade C), the top source on Perplexity, with online travel agencies 55% of hotel citations ([Hotel Technology News](https://hoteltechnologynews.com/2025/07/research-otas-dominate-as-primary-source-in-ai-powered-hotel-discovery/)). Cloudbeds suggests TripAdvisor's partnership with Perplexity as a reason. Confirm with this client's source map (OS4, OS7) |
| E-commerce | Category pages, product spec sheets, comparison matrices, genuine user reviews | Product markup with real price and stock; feed to Merchant Center (CM1–CM3, reported outside the index); no duplicate manufacturer copy. In 100 consumer-electronics shopping queries, 52–68% of AI citations went to brand sites (University of Toronto, Jan 2026, preprint, [arXiv 2601.16858](https://arxiv.org/html/2601.16858v2)); untested in other categories, but a reason to keep owned product and pricing pages strong |
| Healthcare / wellness | Treatment guides, clinician bios, research summaries, patient stories (with consent), local clinic pages | Strong local and YMYL. Named clinical reviewers with credentials (BQ6); align to peer-reviewed consensus |
| Home services / builders | Local service pages, cost guides and transparent pricing tables, diagnostic guides, localized case studies, project galleries | Hyper-local. One consistent NAP (OS1); location pages must pass the doorway test in 3B.6; accurate LocalBusiness markup (SD1). Let the source map show which directories this client's local answers cite (OS4, OS7, OS9) |

Platform leadership in AI answers shifts within months (Play 6): use the table for candidates, then let the
client's Module 6 source map decide.

**Comparison pages, any business type**, must be disclosed (it says the client published it) and criteria-based
(published criteria, competitors described fairly, where the client is not the best fit said plainly). Never a
self-ranking "best X" list that puts the client first. Practitioner reports link these to organic visibility
losses: Sistrix visibility losses of 29–49% on six anonymized SaaS sites, Jan 2026, correlational, not confirmed
by Google ([Search Engine Journal](https://www.searchenginejournal.com/is-google-finally-cracking-down-on-self-promotional-listicles/),
grade C). In 100 B2B queries, AI Overviews cited such lists while recommending a competitor 69% of the time
([Search Engine Land](https://searchengineland.com/google-ai-overviews-cite-self-serving-listicles-recommend-competitors-69%25-of-the-time-480573),
practitioner study, grade C). No Google policy names them, so a self-ranking list scores BQ8 `notmet`, never a
spam-policy gate; the downside is still one-sided.

## 3B.2: Content inventory verdict (keep / refresh / merge / prune)

For every meaningful page found in the crawl, assign a verdict. Thin and duplicate pages split signals across
URLs, and Google says a high number of pages does not make a site higher quality
([Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), May 2026).

| Verdict | When it applies | Action |
|---|---|---|
| **Keep & monitor** | Strong content, current, clear purpose, evidence-rich | Leave as-is; re-check at the next audit |
| **Refresh & rewrite** | Useful topic but outdated facts, thin proof, or the answer buried | Reconfirm the buyer question; add sourced facts and first-hand proof (BQ4, BQ5); change the updated date only because the content changed, with a changelog line (BQ7) |
| **Merge & redirect (301)** | Several pages targeting the same question, splitting authority | Consolidate into one parent page; 301 the rest in one hop (TD1) |
| **Prune (noindex or 410)** | Negligible value, off-topic, no traffic potential, no compliance need | Noindex, or delete and return 410 |

Honest limit: a crawl flags thin, overlapping, stale or badly structured pages; the final cut list needs 12 months
of Search Console data (impressions, clicks, decay). Offer to confirm it if the client connects Search Console.

## 3B.3: Coverage gap map

Map what exists against three grids and name the holes. **Buyer-question coverage** is the main one (BQ1): each
buyer question from the Module 6 panel, plus any the sales team hears often, against the page that answers it, or
"none". **Funnel coverage**:

| Funnel stage | What the searcher wants | Page types that serve it |
|---|---|---|
| Problem aware | Naming a symptom or challenge | Problem/explainer pages, diagnostic tools, educational articles |
| Solution aware | Comparing methods and categories | Methodology pages, comparison guides, in-depth guides |
| Product aware | Evaluating specific providers | Service/product pages, disclosed comparison pages, case studies |
| Decision | Ready to buy or contact | Pricing pages, demos/trials, localized case studies, reviews |

**Content-type coverage**: which high-value types from the 3B.1 row are missing or weak? Be specific ("no
comparison page in a crowded category", "case studies lack numbers", "pricing only behind a form").

## 3B.4: Prioritized content roadmap

Turn gaps and verdicts into a ranked backlog. Each item gets: content type, buyer question, funnel stage, check
IDs it closes, the 3B.5 levers it needs, effort, an evidence grade and a plain expected-impact note.

```
Priority ≈ Buyer-question fit × Intent value × Demand ÷ Effort
```

- **Buyer-question fit** (the main driver, 1–3): 3 = answers a panel or sales-team question no page answers
  today (a BQ1 gap); 2 = strengthens a weak answer; 1 = keyword demand only, no confirmed buyer question.
- **Intent value**: decision and comparison intent ≈ 1.5; informational ≈ 1.0.
- **Demand**: impressions or search volume from Search Console or a keyword tool (otherwise judge from topic
  breadth). For refreshes, year-over-year decay raises priority.
- **Effort**: 1–5, including the work of getting proof and consent.
- **Blocked items**: if a gate or technical check (G1–G4, TD1–TD4) stops the page being crawled or indexed, that
  fix goes first and the content item waits.

**Evidence grade**, shown beside each item and never multiplied in (it breaks ties and sets the wording of the
impact note):

- **High evidence**: platform documentation or large controlled or peer-reviewed studies (answering the real
  buyer question; crawlable, indexed, snippet-eligible pages).
- **Medium evidence**: consistent large correlational studies from several sources (original data and first-hand
  proof; third-party mentions).
- **Low evidence**: lab-only, single-vendor or contradicted findings (GEO tactic word-share lifts, target word
  counts, section lengths). Never turn a lab figure into an expected citation gain: the GEO paper measured word
  share inside a fixed five-document answer, and replications mostly failed (Module 3).

Honest limit: without Search Console or a keyword tool, rank by buyer-question fit, intent and effort, and label
the roadmap "directional pending analytics". Group the backlog as **Now / Next / Later**.

## 3B.5: Page-level build specs (answer-first blueprint)

For the top recommended pieces (and as the rewrite spec for refreshes), give a concrete structure:

1. **Descriptive H1** naming the topic or service, never a slogan like "We Deliver Innovation" (TD7, BQ9).
2. **Direct answer near the top**: where it fits, an H2 phrased as the buyer's question, then a short,
   self-contained answer (house style, not a research threshold). Most ChatGPT-cited posts (72.4%) open with a
   short, self-contained answer of roughly 20–25 words
   ([Search Engine Land](https://searchengineland.com/how-to-get-cited-by-chatgpt-the-content-traits-llms-quote-most-464868),
   2025, publication analysis, sample not reviewed, grade C) (BQ2, BQ3).
3. **Supporting structure**: a table, numbered list or spec grid that backs the answer with specifics.
4. **Evidence**: at least one piece of first-hand proof only this client can publish (a named result, original
   data, a project photo), statistics linked to their primary source, and a named author with credentials and a
   bio (BQ4, BQ5, BQ6, BQ10).
5. **Markup** that matches what's visible: Article with author and dates, Service, Product, LocalBusiness,
   Organization (SD1–SD3). Don't add FAQPage or HowTo as a Google tactic: FAQ rich results were deprecated
   (announced 8 May 2026, effective 7 May), HowTo in 2023, and Google says AI features need no special markup. FAQPage matching a visible FAQ is
   harmless, not a lever (SD4).
6. **Honest dates**: visible published and updated dates. Change the updated date only when facts, data or
   advice change, and add a one-line changelog ("Updated Nov 2026: new pricing table"). No study tests changing a
   date without changing content, which makes it the riskiest freshness tactic (BQ7).
7. **In the raw HTML**: the answer, proof and links render without JavaScript (G3).

Give a short worked blueprint per priority piece (headings, direct-answer sentence, markup, proof). Slugs are
natural, 4–7 words and year-free (`/guides/crm-integration-costs`, not `/crm-integration-costs-2026`), so a page
never needs a new URL or a fake date to look current.

## 3B.6: Client-evidence content map (when a roster is available)

If the user supplied a client list or the crawl surfaced one, map it before finalizing the roadmap:

1. **Cluster by vertical** (trades, non-profit, healthcare, associations, public sector, retail, professional
   services). Three or more clients in one vertical is a defensible niche.
2. **Find the wedge**: deep evidence plus weak competition, verticals the large firms and generic listicles
   ignore. Lead the industry-page sequence with it.
3. **One page per strong vertical, only if it passes the doorway test**, anchored by a real client story, with
   Service markup. Weak clusters fold into a case-study library.
4. **Association and network clients are off-site targets too**: feed their newsletters and member-news
   channels into Play 4's coverage lists.

**The doorway test.** Every new vertical, city or service-area page must pass all three, or it folds into a
general page or the case-study library:

- At least two page-specific evidence items that appear on no other page: a named client result (with consent),
  original data, a local project or photo, a named local team member, a local regulation, price or condition.
- It would deserve to exist if search engines didn't: a buyer there would find it more useful than the general
  service page.
- It is not a find-and-replace: if swapping the city or industry name leaves the page reading as true, it fails.

**Cap** new vertical and city pages per quarter in the plan (house default: three for a small firm); raise it
only when each extra page has its evidence in hand. Google says pages made mainly to manipulate rankings or AI
responses violate its scaled content abuse policy (AI optimization guide, May 2026). A pattern at scale (for
example 10 or more near-duplicate pages) fails gate G6; one or two thin pages are a content finding, not a gate.

**Consent rule, always stated in the report.** Logos on a site suggest consent to display, not consent to
publish stories. Get written consent from each client (an email is enough) before naming them, quoting them or
publishing their results, and record who agreed and when. Without consent, anonymize by vertical and size ("a
40-person Alberta electrical contractor") and leave out any number that would identify them.

Put it in `content.evidence` (`report-spec.md`): one cluster per vertical with its clients and the page to
build. State the consent rule in `guardrail`. Record consent status per client, the doorway-test result per
page and the target questions in the working notes, not the report.

## 3B.7: Production guardrails (so the plan doesn't backfire)

Google's spam policies (scaled content abuse, site reputation policy (site reputation abuse), expired domain abuse) apply to AI responses
as well as classic results ([Google](https://developers.google.com/search/updates), 15 May 2026). Google's rater
guidelines (current edition) describe main content made with little to no effort, originality or added value,
including AI-generated content (section 4.6.6); Google's generative AI content guide points to them (1 Oct 2026)
and says ratings don't directly influence ranking ([rater guidelines](https://services.google.com/fh/files/misc/hsw-sqrg.pdf);
[Google documentation updates](https://developers.google.com/search/updates)). They still show what Google wants
its systems to reward. Check the current wording before quoting.

- **Responsible production**: use AI for scaffolding (outlines, clustering, question mapping); add the proof AI
  can't invent (client results, screenshots, internal expert quotes); edit for plain language; a subject-matter
  expert checks every draft. Each piece has a named author with a bio, primary-source links, honest dates and YMYL
  disclaimers where needed.
- **Architecture**: key pages within about three clicks of the home page with descriptive internal links (TD4);
  pillar and cluster structures with parent-child URLs; sub-topics consolidated into substantive pages, not thin
  pages for every query variation. Google's AI Mode uses query fan-out: one question is split into several
  sub-searches run at once ([Google](https://blog.google/products/search/google-search-ai-mode-update/), May 2025,
  platform documentation). That makes a cluster of genuinely useful pages a sensible structure; no study shows it
  beats one strong guide.
- **The off-site workstream is a phase of its own.** In Ahrefs' study of 75,000 brands, branded web mentions
  correlated with Google AI Overview visibility at 0.664, against 0.218 for backlinks
  ([Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/), May 2025, Spearman, DR 40+ brands with at
  least one AI Overview mention, SEO-tool vendor); page count was weak, about 0.17–0.19 ([Ahrefs](https://ahrefs.com/blog/ai-brand-visibility-correlations/),
  Dec 2025). The program is in `offsite-roadmap.md` (Step 3C), sequenced with this backlog in Step 3D. The
  original-data asset (Play 4) is what PR pitches; the answer-first pages (3B.5) are where earned mentions point.

## 3B.8: Measurement plan

Track the four separate things the report shows (`readiness-checklist.md`), without overclaiming:

- **Readiness**: re-score the AI Search Readiness Index (model 7.0) at the next audit, with both ranges (the
  unverified range and the judgment range). Compare only the checks assessed in both audits (re-audit rules in
  `readiness-checklist.md`).
- **Search (Google)**: non-branded clicks and impressions in Search Console. The Generative AI performance report
  ([Google](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports), announced 3 Jun 2026,
  all sites by 31 Aug 2026) shows impressions in AI Overviews, AI Mode and Discover only: no clicks, queries or
  position. Confirm the generative AI setting isn't opted out (G5).
- **Bing and Copilot**: connect Bing Webmaster Tools' AI Performance report
  ([Bing](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview),
  public preview Feb 2026). It counts citations across "Copilot, Bing, and select partner AI experiences", has no
  clicks, and Bing calls Citation Share "an observational metric, not a ranking system or a competitive
  scoreboard". Show it as a within-site trend (TD8).
- **Observed AI visibility**: re-run the frozen Module 6 panel (same prompts, engines and competitors, runs spread
  over at least 8 separate dates, in practice one run a day for 8 days) and report the mention rate **per engine** with its interval, and the share of runs where
  the engine searched. The baseline report states the smallest detectable change per engine, so the client knows
  in advance which moves a re-check can see. Say it plainly when you propose the plan: at 20 prompts over 8 days
  the re-check only detects large moves (at least about 16 points; each report prints its own figure). Precision
  comes from more prompts run on more separate days, not from more runs of the same prompt on the same days. For
  month-to-month tracking use 40 or more prompts, or treat monthly results as descriptive and test quarterly. If a
  tracking tool is used (Otterly.AI or Peec AI for smaller clients, Semrush or Ahrefs Brand Radar on existing
  stacks, Profound for enterprise), name the tool, version and method, and never switch tools between baseline
  and re-check: no independent accuracy benchmark between tools exists.
- **Outcomes, always a floor**: a GA4 custom channel group with a "source matches regex" AI rule placed above
  Referral, plus `utm_source=chatgpt.com`. GA4's native AI Assistant channel (13 May 2026) undercounts: it labels
  recognized referrers only, ChatGPT splits across AI Assistant, Referral and Unassigned, Perplexity lands in
  Referral, Claude was dropped from the recognized list by June, AI Overview and AI Mode clicks count as
  google / organic, and app traffic without a referrer lands in Direct
  ([Search Engine Journal](https://searchenginejournal.com/ga4s-ai-assistant-channel-undercounts-your-ai-traffic-how-to-build-one-that-doesnt/580133),
  Jul 2026, practitioner analysis). Never report the native channel alone. Google added a page on identifying
  Search traffic from the HTTP Referer header (12 Nov 2026, documentation updates); check whether it separates AI
  Mode clicks before relying on it.
- **Noise rule for counts.** Monthly counts of a few dozen sessions swing a lot at random. A change in GA4 AI
  sessions, Bing citations or Search Console AI impressions is real only if it exceeds 2 × √(2 × baseline count)
  (for 38 sessions, about 17) and holds for two consecutive months, or, when at least three pre-period months are
  available, exceeds 2 standard deviations of that series for two consecutive months. Otherwise say "within normal
  month-to-month variation".
- **Conversion quality is a hypothesis to test**, not a promise. Reports range from slightly better than organic
  ([Seer](https://www.seerinteractive.com/insights/case-study-6-learnings-about-how-traffic-from-chatgpt-converts),
  multi-client, 13.8% vs 9.3%, agency) to modelled multiples ([Semrush](https://www.semrush.com/blog/ai-search-seo-traffic-study/)
  4.4x, a value projection, not a measured conversion rate). Compare the AI channel with organic in the client's
  GA4 over the same period, show session counts, and say "too few sessions to call" when the sample is small.

Refresh cadence: review key pages quarterly; change content and dates only when facts, data or advice change,
with a changelog line. Re-audit comparisons follow the rules in `readiness-checklist.md`.
