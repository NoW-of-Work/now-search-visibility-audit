# Readiness checklist and scoring model (v7.0)

This file is the scoring contract. `assets/report/scoring.mjs` implements it exactly and refuses an audit file
that breaks it, so change both together. Every audit scores the same checks the same way, so two analysts looking
at the same site land in the same band, and a re-audit compares like with like.

The report keeps four measures apart and never blends them:

1. **Access gates**: pass / fail / verify / your choice. Eligibility, not points.
2. **AI Search Readiness Index**: a counted checklist across five pillars, shown as a point, an unverified range
   and a judgment range, with a confidence label. It measures inputs the evidence links to being found. It is an
   expert-weighted checklist, not validated against outcomes, and the report says so on the cover.
3. **Observed AI visibility**: how often AI answers actually name the brand, per engine, with a margin of error
   (Module 6). Never folded into the index.
4. **Outcomes**: AI referral sessions and conversions from the client's analytics, always a lower bound.

Record `meta.modelVersion: "7.0"` in every audit file (the renderer refuses any other value). Change weights,
checks or rules only with a new version, and rescore both audits on the same version before comparing them.

## Key pages

Many checks say "key pages". They are, and must be listed in the audit file as `keyPages`: the home page, each
primary service or product page, pricing, about, contact, and the five pages with the most search impressions
(Search Console), or, without that data, the five with the most internal links. Each entry is `{url, role}`, with
role one of `home`, `service`, `product`, `pricing`, `about`, `contact`, `top-impressions` or `top-linked`; the
renderer refuses any other role.

## How each check is scored

| Result | Points | Use it when |
|---|---|---|
| `met` | 1 | You saw it, and it meets the rule. |
| `partial` | 0.5 | It meets the partial rule given for that check. Say which part in the evidence. |
| `notmet` | 0 | You looked, and it doesn't meet even the partial rule. |
| `unverifiable` | excluded | You can't see it from outside. Name the tool or login that would confirm it. |
| `na` | excluded | It doesn't apply to this business. Give the reason in the evidence. |

**Evidence grade** for each assessed check: **A** first-party or tool-measured (Search Console, Bing Webmaster
Tools, PageSpeed Insights or CrUX, a mention-tracking tool, server logs, URL Inspection); **B** directly observed in
a fetch or a search you ran; **C** inferred or proxy (DuckDuckGo results standing in for Bing, a `site:` search, a
judgment about language quality). The client report prints these as **Measured / Observed / Inferred**; the
data keeps A / B / C. (Source grades for published figures, in `benchmarks.md`, are a separate scale.)

**Pillar score** = 100 × points earned ÷ checks assessed.
**Unverified range** = the pillar score with every `unverifiable` check counted as 0 (low) and as 1 (high).
**Judgment range** = the pillar score with every `partial` call counted as 0 (low) and as 1 (high).

**Index** = weighted mean of the pillar scores. Its unverified range and judgment range are the weighted means of
the pillar ranges. If any gate fails, the index is capped at 49 and the band is Critical. The cover says "capped
by a failed access check (N uncapped)" so the client sees what the fix is worth, and the ranges and sensitivity
values are shown as they would be once the gate is fixed (uncapped, labelled that way). A capped index never gets
a "short of the next band" note: the distance that matters is the gate fix, not a point or two.

**Dropped pillars.** Only Page experience drops out when it wasn't measured with a real tool; the other weights
renormalize, and it is never estimated. Any other pillar with no assessed checks is left out of the point
estimate but stays in the unverified range at 0–100 (the report labels it "range only"), and the index is
labelled provisional. **If that pillar carries 20 or more of the weight** (Off-site, Technical or Buyer questions),
there is **no point estimate at all**: the report prints "No point estimate (range only)" and the band comes from
the range ends and the sensitivity values. With no point estimate there is also no judgment range, and the cover's
band track shows the range only, with no point on it. A pillar whose checks are all `na` has nothing to assess, so it is left
out of both the point and the range and doesn't make the index provisional.

**Confidence.** The index is **provisional** if any of these holds, and the report says which:
- more than a third of the assessed checks are grade C (a plain count across assessed checks);
- more than a third of applicable checks are unverifiable (page-speed and commerce checks are left out of this
  count, because page speed is unverifiable whenever it isn't measured);
- fewer than half of any pillar's applicable checks (other than Page experience) could be assessed;
- **OS5 (mention volume) is unverifiable**: "the main off-site measure (mention volume) wasn't available". OS5 is
  the off-site check that matches the evidence behind the pillar's weight, so without it the heaviest pillar rests
  on entity hygiene alone;
- a pillar weighted 20 or more has no assessed checks (no point estimate, above).

Otherwise **standard**.

**Sensitivity.** The index is also computed under equal weights, an on-site-heavy split (30 / 30 / 25 / 10 / 5),
the old v6 split (25 / 25 / 25 / 15 / 10) and with each pillar left out in turn. If the point, either end of the
unverified range, or any sensitivity value falls in a different band, the band is printed as a span ("Needs Work
to On Track"). The judgment range is shown but doesn't set the band. A capped index is always Critical, whatever
the uncapped ranges and sensitivity values say.

**Bands** (one scale for everything): Critical 0–49 · Needs Work 50–69 · On Track 70–84 · Strong 85–100. These are
conventional cut points, not calibrated against outcomes.

**SEO / AEO / GEO** are not scored out of 10. Each check is tagged with the discipline(s) it serves, and the report
shows checks met per discipline.

## Weights and why

| Pillar | Weight | Evidence for the order (details and grades in `benchmarks.md`) |
|---|---|---|
| Off-site presence and entity | 45 | Two Ahrefs studies (vendor, correlational) found brand mentions tracked AI visibility far more than backlinks or page count (web mentions 0.664 vs backlinks 0.218 for AI Overview visibility, May 2025, B); a separate study (Moore and Dunne, vendor authors, B2B SaaS) found domain-level factors explained far more than page features (R² 0.32 vs ≤ 0.13, Sep 2026, B). Domain fixed effects capture all domain-level factors, on-site and off-site; they are not a measure of off-site presence. OS5 (mention volume) is the check closest to this evidence; when it is unverifiable the index is provisional. |
| Technical discoverability | 25 | Retrieval is a precondition: a page an engine can't fetch or hasn't indexed can't be cited. Only 17–38% of AI Overview citations come from the organic top 10, so the weight rests on access and indexing, not rank. |
| Buyer-question alignment | 20 | Pages whose wording overlaps more with tracked buyer prompts were cited more, but the measure is word overlap, out-of-sample prediction was weak (r² 0.018), and the authors say it isn't an intervention effect. Lab tactics (quotes, statistics) helped only once a page was already retrieved, and replications mostly failed. |
| Structured data | 5 | A matched-control test found no AI-citation gain from adding schema (Ahrefs, 2026, B, vendor). Kept as hygiene for supported rich results and Bing. |
| Page experience | 5 | No evidence links speed to AI citation once domain strength is controlled. Google says Core Web Vitals "aligns with what our core ranking systems seek to reward", not that it is a dominant factor. |

These weights are expert judgment ordered by the evidence. They are not fitted to outcomes, which is why the
sensitivity check exists.

## Access gates

| ID | Gate | Pass rule | Fail | Verify / choice |
|---|---|---|---|---|
| G1 | Search crawlers can reach key pages | Googlebot and Bingbot aren't disallowed; every key page returns 200 and has no `noindex`. | The home page, a primary service or product page, or the pricing page is blocked, non-200 or noindexed. Other key pages with these faults score TD1, not G1. | **Verify** when the site is behind Cloudflare or another CDN/WAF and its bot settings can't be seen (tool: "Cloudflare Security > AI Crawl Control: confirm the Training category is set to Disallow AI Training, not Block"). On Cloudflare, Block stops Googlebot and Bingbot too from 15 Sep 2026. |
| G2 | AI search bots are not blocked | OAI-SearchBot, Claude-SearchBot and PerplexityBot aren't disallowed in robots.txt. | Disallowed without a documented reason. | **Verify** when the site is behind Cloudflare or another CDN/WAF (edge blocking can't be seen from outside; name the CDN's bot settings, e.g. Cloudflare AI Crawl Control). **Choice** when the block is deliberate and documented: state the visibility cost. |
| G3 | Content is in the raw HTML | Primary content, internal links and JSON-LD of key pages are present before JavaScript runs. | Key content only appears after rendering. | n/a |
| G4 | Key pages are indexed | Search Console URL Inspection and Bing Webmaster Tools confirm key pages are indexed (grade A). | Any key page confirmed not indexed in Google. A Bing-only gap fails G4 only when it covers the home page or a primary service or product page; otherwise G4 can pass and the gap is a TD8 note. | **Verify** when only `site:` or DuckDuckGo results are available (grade C proxy). |
| G5 | Not opted out of Google's AI features | The Search Console generative AI setting (worldwide since 31 Aug 2026) isn't set to opt out. | **None.** G5 has no fail state; the renderer refuses one. An opt-out is a documented choice, or it is verified. | **Verify** without Search Console access. **Choice** when the opt-out is deliberate: state the cost. |
| G6 | No Google spam-policy pattern | None of these Google spam policies, by Google's own headings, is matched: scaled content abuse, site reputation policy (site reputation abuse), expired domain abuse, doorway abuse, hidden text and link abuse, malicious practices (including back-button hijacking). | A match with evidence of scale (for example 10 or more near-duplicate city or industry pages for doorway or scaled-content abuse). Word it "matches the pattern of Google's [policy heading] policy", never "penalized". Reviews are not a spam policy: fake or undisclosed incentivized review markup scores SD3. | n/a |

Only G1 (behind a CDN or WAF), G2, G4 and G5 can be `verify`; the others are visible from outside, and the
renderer refuses `verify` on them. Only G2 and G5 can be `choice`.

A failed gate is a **Critical blocker**: its fix must be the **first** entry in `fixes`, with priority `critical`.
`critical` is reserved for fixing a failed gate; the renderer refuses it anywhere else, and refuses a file whose
failed gate isn't the first fix. A `verify` gate goes in "What we could not see" with the tool that would confirm
it; it doesn't cap the index and doesn't change the ranges. A `choice` is listed under "Choices you've made" with
its cost.

## Pillar 1: Off-site presence and entity (45)

| ID | Check | Met | Partial | Disc. |
|---|---|---|---|---|
| OS1 | Entity facts are consistent | Name, address, phone and one-line description match across the site and the main profiles. | One field differs on one profile. | GEO |
| OS2 | Official profiles are linked | sameAs or visible links to the brand's real profiles: LinkedIn, YouTube, Crunchbase, Wikidata and the category platforms. | One or two profiles linked. | GEO |
| OS3 | Knowledge graph presence | A Wikidata item and a Google knowledge panel for a brand search. | One of the two. `na` only with a written test: "no independent coverage found in two searches". | GEO |
| OS4 | Category review platforms | A profile with reviews from the last 12 months on each platform this category's answers cite (from the Module 6 source map). Counts and velocity: **unverifiable** unless a tool or login supplies them. | Present on some of those platforms, or present with no recent reviews. | GEO |
| OS5 | Third-party mention volume | A mention-tracking tool shows mentions of the brand on independent sites in the last 12 months at or above the median of the competitor control set (grade A). Scored only at grade A: without a tool (a manual search is grade B) it is **unverifiable**, never `met`, `partial` or `notmet`, and the index is provisional. | Mentions present but below the competitor median (grade A). | GEO |
| OS6 | Named in third-party videos | The brand is named in other people's videos on buyer topics (the YouTube correlation counts mentions in video titles). | Only the brand's own channel. | GEO |
| OS7 | Present where the category's answers draw from | Mentioned on at least a third of the non-review domains the visibility panel (Module 6 source map) shows are cited for this category. | On at least one of them. | GEO |
| OS8 | Clean brand search | A search for the brand name shows the brand's own properties first, and any name collision is addressed. | Own site first, but a collision or a stale profile on page one. | SEO, GEO |
| OS9 | Local listings (local businesses only) | Google Business Profile, Bing Places and Apple Business Connect claimed, with facts matching OS1. Completeness: **unverifiable** without access. `na` for non-local businesses. | One or two of the three. | SEO, GEO |

## Pillar 2: Technical discoverability (25)

| ID | Check | Met | Partial | Disc. |
|---|---|---|---|---|
| TD1 | Clean responses | Retired URLs that still get links or traffic redirect in one hop to the right page; no redirect chains or soft 404s on key pages. | A few retired URLs return 404, or one chain. | SEO |
| TD2 | One canonical site | One host; duplicate hostnames redirect; canonicals self-consistent on key pages. | Canonicals fine but a duplicate host still serves pages. | SEO |
| TD3 | Complete sitemap | The XML sitemap lists every key page and is referenced in robots.txt. | Listed but missing some key pages, or not referenced. | SEO |
| TD4 | Internal linking | Every key page is within three clicks of home, with descriptive link text; no orphaned key pages. | One key page orphaned or deeper than three clicks. | SEO |
| TD5 | Fresh index | Brave and Bing results show current pages and no retired pages that misdescribe the brand. | Mostly current, with one stale result. | GEO |
| TD6 | Titles and descriptions | Every key page has a unique, descriptive title and meta description. | Most do; a few duplicates or generic titles. | SEO |
| TD7 | Clear outline | One H1 and a logical heading structure on every key page. | Most key pages. | SEO, AEO |
| TD8 | Bing submission | Bing Webmaster Tools verified and the sitemap submitted, or IndexNow set up. `na` unless G4 passed (enforced). Usually **unverifiable** from outside. A Bing-only indexing gap on a page that isn't home or a primary service page is noted here. | Verified but no sitemap. | SEO |
| TD9 | Language versions | hreflang and content parity for each language served (French for many Canadian clients). `na` if one language. | hreflang present but content parity incomplete. | SEO |
| TD10 | Deliberate training-bot policy | Training bots (GPTBot, ClaudeBot, the Google-Extended token, CCBot) are allowed or blocked on purpose, and user-triggered fetchers (ChatGPT-User, Claude-User) aren't blocked by accident, including by a CDN default. Search bots are G2. | A policy exists but contradicts itself. | GEO |

**Cloudflare and TD10.** On Cloudflare, block AI training with **Disallow AI Training**, never **Block**: since
15 Sep 2026, Block also stops mixed-use crawlers, including Googlebot and Bingbot, from crawling for search
(Cloudflare, Sep 2026, A). From 15 Sep 2026, new Cloudflare domains that show ads default to Search Allow, Training
Disallow AI Training and Agent Block on pages with ads; existing zones that had the old "Block AI" setting moved to
the same. Agent blocking can stop user-triggered fetchers such as ChatGPT-User on ad pages (Cloudflare, Jul and
Sep 2026, A). If Training is set to Block, G1 fails once confirmed; if you can't see the setting, G1 and G2 are
`verify`.

## Pillar 3: Buyer-question alignment (20)

| ID | Check | Met | Partial | Disc. |
|---|---|---|---|---|
| BQ1 | Buyer questions have pages | Each panel prompt **not** sourced from the client's own site has a page that answers it. | Half or more. | GEO, AEO |
| BQ2 | Direct answer near the top | Every key page answers its main question in plain words in the opening lines. Length is house style (60 words at most), not a rule. | Half or more of the key pages. | AEO |
| BQ3 | Question-led structure | Pages that answer several questions use headings that state them. | Some do. | AEO |
| BQ4 | Original data or first-hand proof | Original research, or case studies with named clients and numbers, that no one else could publish. | Named results without numbers, or numbers without names. | GEO |
| BQ5 | Sourced claims | Statistics and claims on key pages link to their sources. | Some do. | GEO |
| BQ6 | Named, credible authors | Expert content has a named author with relevant credentials and an author page or profile. | Named authors without credentials or profiles. | SEO, GEO |
| BQ7 | Honest dates | Visible published and updated dates, and a Wayback Machine comparison shows updates reflect real changes. Without that comparison: **unverifiable**. | Dates shown but some unchanged pages carry new dates. | SEO, GEO |
| BQ8 | Decision content | Pricing, comparison or "how to choose" content exists, and any comparison is disclosed and criteria-based. A self-ranking "best of" list scores `notmet` (practitioner reports link these to organic visibility losses; six sites, Jan 2026, not confirmed by Google). | Some decision content, not disclosed or criteria-based. | GEO |
| BQ9 | Specific language | Commercial pages say what is offered, for whom, and at what price or scope. | Detail exists but sits below slogans. | AEO, GEO |
| BQ10 | Proof is findable | Case studies, testimonials and client names are in the sitemap and linked from navigation; logos have alt text. (Raw-HTML presence is G3.) | Present but orphaned, or logos without alt text. | SEO, GEO |

## Pillar 4: Structured data (5)

| ID | Check | Met | Partial | Disc. |
|---|---|---|---|---|
| SD1 | Organization markup is valid | Organization or LocalBusiness markup validates and its facts match the visible site. (sameAs is OS2.) | Present with an error or a mismatch. | SEO |
| SD2 | Page-type markup | Article (author, dates), Product (price, availability), Service, Event or similar on the matching key pages. | Some page types. | SEO |
| SD3 | Valid and honest markup | No validation errors; no markup for content that isn't on the page; no review markup for fake or undisclosed incentivized reviews. Review markup that breaks this scores `notmet`, worded "breaks Google's review-snippet guideline, 24 Jul 2026", with a note that fake or incentivized reviews can also breach consumer-protection law. | Warnings only. | SEO |
| SD4 | No retired tactics | The site doesn't rely on FAQ or HowTo rich results in Google (FAQ announced 8 May 2026, effective 7 May; HowTo 2023). FAQPage that matches visible FAQs is harmless and passes. | n/a | SEO, AEO |
| SD5 | Site name and breadcrumbs | WebSite (site name) and BreadcrumbList markup. | One of the two. | SEO |

## Pillar 5: Page experience (5, measured only)

Scored only from PageSpeed Insights or CrUX (grade A), mobile, field data preferred. Otherwise every PX check is
`unverifiable` and the pillar drops out. "Met" thresholds are Google's Core Web Vitals "good" values
([web.dev: Web Vitals](https://web.dev/articles/vitals)); the partial bounds are the "needs improvement" limits on
the per-metric pages ([LCP](https://web.dev/articles/lcp), [INP](https://web.dev/articles/inp),
[CLS](https://web.dev/articles/cls)).

| ID | Check | Met | Partial | Disc. |
|---|---|---|---|---|
| PX1 | Loading | Largest Contentful Paint ≤ 2.5 s. | ≤ 4 s. | SEO |
| PX2 | Responsiveness | Interaction to Next Paint ≤ 200 ms. | ≤ 500 ms. | SEO |
| PX3 | Stability | Cumulative Layout Shift ≤ 0.1. | ≤ 0.25. | SEO |

## Commerce readiness (e-commerce only, reported, not in the index)

| ID | Check | Met when |
|---|---|---|
| CM1 | Product feed health | Merchant Center feed approved, with GTIN/MPN where they exist. Usually **unverifiable** without access. |
| CM2 | Price and stock parity | Price and availability match across feed, page and Product markup. |
| CM3 | Shipping and returns | Visible policies, and shipping and return markup or Merchant Center settings. |
| CM4 | Agent checkout routes | Eligibility for Google's Universal Commerce Protocol (open standard, 11 Jan 2026; checkout in AI Mode and Gemini for eligible US retailers) or a Shopify agentic storefront, where the platform supports it. ChatGPT Instant Checkout was scaled back in March 2026; OpenAI said checkout is "transitioning to apps" (trade reporting of an OpenAI statement, B). |

Commerce checks sit outside the index: an unverifiable CM check is labelled "Not scored", never "Widens the range".

## Observed AI visibility (Module 6)

- **Measured tier**: a frozen panel of at least **20 unbranded prompts**, each run at least **8 times on each of
  at least 3 engines** (for example ChatGPT, Google AI Mode, Perplexity), queried directly, logged out, with
  location, language and dates recorded. **The runs for each prompt and engine are spread over at least 8
  separate dates** (distinct dates are counted, not `days` entries; in practice, one run a day for 8 days),
  because answers shift from day to day and the day-to-day part of the error needs enough days to estimate. At most a third of prompts may come from the client's
  own site; every prompt records its source, which must be one of `sales`, `gsc`, `keyword`, `competitor`,
  `community` or `site` (the renderer refuses anything else).
- **What each cell records** (one prompt on one engine): `runs`, `mentions` (runs that named the brand),
  `searched` (runs where the engine actually searched the web; a number, required in the measured tier),
  `days: [{date, runs, mentions}]` (at least 8 distinct dates; the day totals must add up to `runs` and
  `mentions`, or the file is refused), and `competitors: {name: mentions}` for the competitor control set, counted
  on the same answers. Record every competitor in every cell and write `0` explicitly when no answer named it: the
  renderer counts a missing name as 0 without warning, so a forgotten entry would pass as a real zero.
- **Intervals.** Repeated runs aren't independent: a prompt that names the brand once tends to name it again, and
  runs on the same day resemble each other. Each engine's rate therefore gets a 95% interval from a two-way
  cluster-robust variance (prompt and day, minus prompt × day, never below the prompt-level variance), shown as a
  Wilson interval on the effective sample size, with the design effect printed. The interval uses a t critical
  value with G − 1 degrees of freedom, where G is the smaller of the number of prompts and the number of days, so
  a panel with few days gets a wider interval. The standard error used for tests
  is floored at the simple-random-sampling variance and at an Agresti–Coull term, p̃(1 − p̃) ÷ answers with
  p̃ = (mentions + 2) ÷ (answers + 4), so an engine that never named the brand still has a non-zero error. The renderer computes all of this from the
  panel. There is **no pooled all-engines rate**: engines are reported separately, and the cover shows each
  engine's rate.
- **Smallest detectable change.** The baseline report prints, per engine, the smallest change in mention rate a
  re-check could detect with 80% power. It is planned, not read off the observed error: planning rate
  p = max(observed rate, 5%), design effect D = max(observed, 1.5), SE = √(p(1 − p) × D ÷ answers), and
  MDC = (t at 1 − 0.05 ÷ (2 × engines), with G − 1 degrees of freedom, + 0.84) × √2 × SE, where G = the smaller
  of the number of prompts and the number of days. G uses days when they are fewer because a shared day effect
  hits every prompt at once and doesn't shrink as prompts are added. The 0.05 is split across engines because the
  re-check uses a Holm correction. It is printed as "N points", never with ±.
- **What that means for the client.** At 20 prompts over 8 days the re-check only detects large moves (at least
  about 16 points; each report prints its own figure). Precision comes from more prompts run on more separate
  days, not from more runs of the same prompt on the same days. For month-to-month tracking use 40 or more
  prompts, or treat monthly results as descriptive and test quarterly.

**Planning table: smallest detectable change, in points** (our calculation with `detectableChange` in
`scoring.mjs`; 10% mention rate, design effect 1.5, 3 engines, 80% power, Holm-split α). Two designs:

*8 days fixed* (the minimum; more runs means more runs per day):

| Prompts | 8 runs | 12 runs | 16 runs |
|---|---|---|---|
| 20 | 16 | 13 | 11 |
| 30 | 13 | 11 | 9 |
| 40 | 11 | 9 | 8 |
| 60 | 9 | 8 | 7 |
| 100 | 7 | 6 | 5 |

*One run a day* (days = runs, so 12 runs means 12 days):

| Prompts | 8 runs | 12 runs | 16 runs |
|---|---|---|---|
| 20 | 16 | 12 | 10 |
| 30 | 13 | 10 | 8 |
| 40 | 11 | 9 | 7 |
| 60 | 9 | 7 | 6 |
| 100 | 7 | 5 | 5 |

Read them with three cautions. First, the tables hold the design effect at 1.5, which flatters extra runs: in
practice the design effect rises with runs per prompt (roughly 1 + (runs − 1) × ρ). A design effect of 1.5 at 8
runs implies ρ of about 0.07, and at that ρ, 20 prompts × 16 runs detects 13 points on 8 days (12 on 16 days), not
11 or 10. Second, the tables can't show a shared day effect: when every prompt runs on the same dates, a day that
shifts all answers at once doesn't average out as prompts are added, only as days are added. That is why the
degrees of freedom use the smaller of prompts and days, and why extra days help more than extra runs on the same
days. Third, the tables are a floor: the audit uses the observed design effect when it is higher. The worked
example (20 prompts, one run a day for 8 days, 7–14 Nov 2026) has design effects of 1.5 to 2.0, giving 16 to 20 points; panels
with larger day-to-day swings will show more, so check the printed figure before promising a monthly read.

**Other visibility rules.**

- **Search-proxy tier** (Quick Audit, or when engines can't be queried directly): web searches stand in for AI
  answers. No rate is printed: "named in X of N checks", labelled an illustration.
- Branded prompts are used only to check that the description of the brand is accurate.
- Rank position inside an answer is not a metric (answers repeat the same brand list less than 1% of the time;
  SparkToro, Jan 2026, B, vendor research).
- Cited sources are recorded to build the off-site target map (OS7), not as proof of influence.
- The renderer saves per-engine results (rate, standard error, interval, answers, mentions, prompts, design
  effect, detectable change) and the competitor control set per engine to `.scores.json`. A proxy-tier audit saves
  only answers and mentions per engine: no rate.

## Outcomes

AI referral sessions and conversions from a GA4 custom channel (a source regex placed above Referral) plus
`utm_source=chatgpt.com`. Always labelled a lower bound: AI Overview and AI Mode clicks sit inside google /
organic, and app traffic without a referrer lands in Direct. Search Console's generative AI report (impressions
only) and Bing Webmaster Tools' AI Performance report ("an observational metric, not a ranking system or a
competitive scoreboard") are shown as within-site trends.

## Re-audit rules

Freeze and save in the audit file at baseline: the key pages, the prompt panel with sources and intent labels, the
engines, run counts, location and language, brand-matching rules, and the model version. On a re-audit:

- **Same model.** Both audits must carry the same scoring-model version in their score data, or the comparison is
  refused. Engine model changes can't be frozen; log them as platform events.
- **Visibility.** The baseline for formal tests is always the **original audit**, not last month. Compare each
  engine with a two-proportion test on the cluster-robust standard errors, with a Holm correction across engines,
  after subtracting the median change of the competitor control set on the same engine (its variance added to the
  test). The test treats the two waves as independent samples even though they use the same frozen prompts; when
  prompt effects persist, that makes it conservative (it calls fewer changes real), never too lenient. A change is
  real only if it survives. Verdicts ("Real change" or "Within noise") are given only at the quarterly re-audit
  (`meta.formalTest: true`); monthly checks show the moves as "Descriptive". Each quarterly verdict has a 5%
  false-alarm rate, so over a year of quarterly tests there is still about a 1-in-6 chance of one false "real
  change" when nothing changed. Treat a single real-change verdict as provisional until the next quarter agrees.
  Fewer than 3 competitors makes the control "indicative". The drift adjustment is additive in points; when the
  client and competitors have very different base rates, it is approximate. Never compare a proxy result with a
  measured one.
- **Index.** The headline index is recomputed like for like, over checks assessed in both audits; the raw move is
  printed beside it as "including measurement change". List the checks whose result changed. An index move that
  comes only from checks becoming verifiable is a measurement change, not progress. The re-scorer fills in every
  check and gate before opening the baseline `.scores.json` (recorded as `meta.blindRescore: true`); the baseline
  findings may be read afterwards, for example to write the "what we fixed" story. The renderer lists every check
  that flipped; record the evidence for each partial ↔ met or not-met flip in the method caveats.
- **Outcomes.** A change in a count (sessions, citations, impressions) is real only if it exceeds
  2 × √(2 × baseline count) (about 17 for 38 sessions) and holds for two consecutive months, or exceeds 2 standard
  deviations of at least three pre-period months when those are available.
