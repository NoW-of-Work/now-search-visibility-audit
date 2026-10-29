# Audit modules (Step 3)

Work through all six modules for every audit (Module 6 is Full Audit only), then the AEO layer. Tag each finding SEO, GEO or AEO. The figures quoted here are directional; see `benchmarks.md`.

## Contents

- Module 1: Technical and performance
- Module 2: Schema and entity graph
- Module 3: GEO content and fluency
- Module 4: AI crawler access and agentic readiness
- Module 5: Off-page consensus and brand mentions
- Module 6: AI citation spot-check
- AEO layer
- Honest limits

## Module 1: Technical and performance (SEO foundation; AIV pillars Tc + Pm)

This is the baseline. If a system has technical friction, its content cannot be ingested or cited.

**Crawlability and rendering:**
- **Raw vs rendered content**: is the primary content, internal linking, and schema present in raw HTML, or
  injected by client-side JavaScript? JS-only content is a critical risk for AI bots that don't render. Flag and
  recommend server-side rendering (SSR) or dynamic rendering.
- **Robots / indexability**: any accidental `noindex`? Misconfigured headers or firewall blocks?
- **Canonical tag**: present and self-referencing appropriately?
- **Response hygiene**: redirect chains, soft 404s, or broken links on high-priority pages? Cited URLs are
  overwhelmingly clean 200s, so redirect chains and errors on key pages are a real barrier. Flag them.

**On-page SEO:**
- **Title tag**: present? 50–60 characters? Primary keyword? Unique across the site (not duplicated)? Judge
  titles for **click-worthiness**, not just keywords: Google's leaked Content Warehouse documents and DOJ
  antitrust testimony confirmed a click-signal re-ranking system (NavBoost) that rewards results earning
  clicks and satisfying users ("long clicks") and demotes ones that don't. A technically correct but inert
  title is a real ranking liability.
- **Meta description**: present? 150–160 characters? Compelling, with a reason to click?
- **Heading hierarchy**: single logical H1? Sensible H2 / H3 nesting? Clean semantic HTML aids extraction.
- **URL structure**: clean, readable, keyword-relevant, minimal parameters?
- **Image alt text**: descriptive and relevant? (Also feeds multimodal and image search.) Check **proof
  elements specifically**: client logo walls, award badges and certification marks are routinely shipped with
  empty alt attributes, making the site's strongest trust signals invisible to crawlers and AI engines. Flag
  empty-alt proof imagery as Missing and recommend descriptive alts plus a text-based client/award line.
- **Open Graph / Twitter Card**: og:title, og:description, og:image present for social and preview surfaces?
- **Mobile viewport**: present?

**Performance (Core Web Vitals), and its honest limit:** you cannot measure real Core Web Vitals from an HTML
fetch. Do not guess scores. Instead, flag this as a required external check and give the client the citation
thresholds to aim for, drawn from 2026 data:
- **First Contentful Paint (FCP)** under ~0.4s: roughly 3x more likely to be cited in ChatGPT than pages over
  ~1.13s.
- **Largest Contentful Paint (LCP)** under ~1.85s: above that, AI Mode citation likelihood drops sharply.
- **Interaction to Next Paint (INP)** around 0.4–0.5s: meaningfully higher citation than pages over 1.0s.
- Recommendation: measure real FCP, LCP and INP with Google PageSpeed Insights (pagespeed.web.dev).

**Penalty risk screen (protects the client from being suppressed or deindexed):** while crawling, actively look
for patterns that match Google's spam policies. These are enforced both algorithmically (SpamBrain) and via
manual actions, and the March 2024 wave deindexed hundreds of sites built on mass thin content. Screen for:

| Risk pattern | What it looks like in the crawl | Policy |
|---|---|---|
| Scaled content abuse | Dozens/hundreds of near-identical thin pages, template text with swapped keywords, mass AI pages with no original value | The single biggest AI-content risk; tool-agnostic (human or AI) |
| Doorway pages | Templated city/service pages differing only by place name, funnelling to one destination | Doorway policy; consolidate into genuine local pages |
| Site reputation abuse | Third-party content (coupons, reviews, sponsored sections) piggy-backing on the domain's authority, unrelated to the core business | "Parasite SEO" enforcement, tightened 2024–2025 |
| Schema mismatch | Markup describing content that isn't visibly on the page (fake reviews/ratings, fabricated FAQs) | Structured-data manual action risk |
| Link footprint | Exact-match anchor patterns, obvious paid/reciprocal link blocks, links from irrelevant niches visible on-page | Link spam; full check needs a backlink tool, flag what's visible |
| Expired-domain signals | Content radically unrelated to the domain's evident history/name | Expired domain abuse |

Report any hit as a **Critical Blocker** with the specific evidence. Also teach the triage distinction in the
report: a *core update* drop is a quality recalibration (no single fix; improve content substantively), while a
*spam update* drop or Search Console manual action means a specific policy violation to find and fix. The 2026
cadence makes this triage matter more: Google shipped two core updates and two spam updates in the first half of
2026 alone, with spam rollouts now completing in under 20 hours to two days, so date-matching a traffic drop
against the Search Status Dashboard is the first diagnostic step. The
reassuring flip side, stated plainly when relevant: Google's public position is that AI-assisted content is
judged on helpfulness and value, not authorship. The line is intent, mass-produced thin pages to manipulate
rankings violate policy whether a human or a model wrote them, while AI-assisted content carrying genuine
expertise and original value is explicitly acceptable.

## Module 2: Schema and entity graph (SEO + GEO; AIV pillar Se)

Structured data is the most direct, unambiguous way to convey brand-entity facts to crawlers and LLMs. Be honest
about what the evidence supports: schema is a **machine-readability and entity-clarity foundation**, not a
proven AI-citation lever. Google states no special markup is required for AI Overviews, and controlled tests
(December 2024; OtterlyAI's December 2025–March 2026 experiment) found no clean citation lift in ChatGPT,
Gemini, or Perplexity from schema alone, though gains did show in Google AI Overviews / AI Mode, and Bing has
confirmed schema feeds its Copilot systems (which matters because ChatGPT search runs on Bing). So: recommend
clean, accurate, well-nested schema confidently, for classic rich results, entity disambiguation, Bing-powered
surfaces, and AI Mode verification, but never present it as a guaranteed citation shortcut. Parse all JSON-LD
blocks you found, map them against the right type for each page, and check nesting.

Use this page-type framework to judge what *should* be present and how it should nest:

| Page type | Target schema | Key required properties | Strong nesting move |
|---|---|---|---|
| Enterprise / SaaS homepage | Organization, WebSite | name, url, logo | Nest WebSite inside Organization; add sameAs, knowsAbout, founder |
| Local / service business | LocalBusiness (or subtype, e.g. HVACBusiness) | name, address, telephone | Add geo coordinates, openingHours, priceRange |
| B2B service page | Service | serviceType, provider | Nest Service inside LocalBusiness; add areaServed, hasOfferCatalog |
| E-commerce product | Product / ProductGroup | sku, gtin, price, priceCurrency | Nest ProductGroup for variants; add availability, aggregateRating |
| Informational article / hub | Article + FAQPage | headline, author (Person), datePublished | Nest FAQPage inside Article; add dateModified, publisher, mainEntityOfPage |

One 2026 change to state accurately: **Google deprecated FAQ rich results on May 7, 2026.** The expandable
Q&A dropdowns no longer appear in Google Search for any site, and Search Console/Rich Results Test support is
being removed through August 2026. FAQPage remains a valid schema type, causes no problems left in place, and
still aids machine comprehension for Bing-powered surfaces and AI retrieval crawlers. So: keep recommending
FAQPage for structure and AI parsing, never as a Google SERP-appearance play, and never let a client believe
the dropdowns are coming back.

Scoring intuition: configured required properties ÷ total required properties, multiplied by a nesting factor.
Flat, un-nested schema on transactional and resource pages is a missed opportunity. Schema must match visible
page content, never markup for content that isn't there (that risks a manual spam action and does not guarantee
rich results regardless).

## Module 3: GEO content and fluency (the AI citation layer; AIV pillar Cd)

GEO optimizes a page to be *cited* inside generative answers. The discipline was formalized in a 2024 Princeton
"GEO-bench" study that measured which content changes actually move citation rates. Use these as your content
diagnostics, in priority order of proven impact:

| GEO tactic | Citation impact | What to look for / recommend |
|---|---|---|
| Add expert quotes | +41% | Named, attributed quotes from credible people, ideally with author schema |
| Add statistics | +32% | Replace vague claims with "metric + source + year" (e.g. "73% efficiency, EPA 2025") |
| Cite sources | +30% | Inline links to authoritative reports, journals, official statistics |
| Fluency optimization | +15–30% | Clear, active, grammatically fluid prose; reduce passive constructions |
| Authoritative voice | +10–20% | Confident, objective, evidence-backed assertions over hedging |
| Keyword stuffing | 0 / negative | Flag and recommend removal; keep density natural |
| Easy simplification | negative | Don't strip technical terminology; it's the context engines cite |
| Content padding | negative | Prune thin, repetitive paragraphs; raise fact-to-word density |
| Persuasive / salesy language | negative | Rewrite subjective marketing copy into verifiable facts and specs |

These figures come from the foundational GEO research (presented at ACM SIGKDD 2024, tested across ~10,000
queries). The three on-page tactics with the largest, most reliable lift are expert quotes, statistics, and
source citations.

Key insight to apply: **GEO is an equalizer.** Lower-ranked sites benefit far more than already-dominant ones.
Adding citations to evidence-dense content has been shown to lift visibility for a #5-ranked site by ~115%. So
for a smaller or lower-authority client, lead with the GEO quick wins, not a multi-year link-building plan. The
documented best pairing is **statistics + fluency** together.

Two further evidence-backed diagnostics:
- **Original data is the strongest citation magnet.** Ahrefs found roughly two-thirds of ChatGPT's most-cited
  pages contain original research, first-hand data, or academic sourcing. When a site has proprietary numbers
  anywhere (case study results, survey data, operational stats), flag them as unexploited citation assets and
  recommend a definitive, well-structured stat or research page. If it has none, recommending one original data
  asset usually belongs near the top of the roadmap.
- **Answer capsules.** ChatGPT-cited pages disproportionately open sections with self-contained 40–60 word
  direct answers. Check whether key sections lead with an extractable capsule before elaborating, and flag
  sections that bury the answer.

**Content density, length, and freshness benchmarks (2026, directional):**
- **Length**: long-form is cited more. ChatGPT citations skew toward articles over ~2,900 words (roughly 59%
  more likely than sub-800-word posts); AI Mode favours >2,300 words. Do not pad to hit this; only flag thin
  pages on topics that warrant depth.
- **Section sizing**: ChatGPT citations run higher on sections of ~120–180 words between headings; AI Mode
  optimal is ~100–150 words. Check for giant wall-of-text sections and over-fragmented ones.
- **Freshness**: ChatGPT roughly doubles citation likelihood for content updated within 3 months; AI Mode favours
  updates within 2 months; local landing pages updated on a ~30-day cycle see a large lift. Check for visible
  publish/update dates and stale content.

**E-E-A-T and entity clarity (Experience, Expertise, Authoritativeness, Trust):**
- Named authors with visible credentials? Author schema?
- A real About page explaining who runs the site and why they're credible?
- Accessible contact information (phone, address, email)?
- Trust signals: testimonials, awards, certifications, press?
- Consistent, clear naming of the brand entity so engines can resolve it?

## Module 4: AI crawler access and agentic readiness (SEO + GEO; affects Tc)

This module is high-value and fully assessable from the files you fetched. It is also where many sites
accidentally make themselves invisible.

**Per-engine retrieval map: audit against how each engine actually retrieves.** "AI visibility" is not one
target; each engine has its own pipeline, so a site can be visible in one and absent from another (only ~11% of
sites are cited by both ChatGPT and Perplexity):

| Engine | Retrieval source | What it favours | Audit implication |
|---|---|---|---|
| ChatGPT search | **Bing index** + training data | High-authority, encyclopedic sources; original data; least correlated with classic authority metrics, so most open to smaller brands | **Bing indexation is a hard prerequisite.** Check `site:{domain}` presence on Bing. If you can't get a reliable result (Bing often blocks or garbles automated queries), don't guess: mark it **Verify** and make "confirm in Bing Webmaster Tools" a threshold action. Recommend Bing Webmaster Tools + IndexNow |
| Perplexity | Own continuous crawler, multi-stage RAG | Freshness (weighted heavier than anywhere else), extractability, Reddit consensus | Allow PerplexityBot; visible update dates; clean answer-first structure |
| Google AI Overviews / AI Mode | Google index + ranking systems | E-E-A-T, pages already ranking well organically | Classic Google SEO remains the entry ticket for these surfaces |
| Gemini | Google index (no separate crawler) + YouTube | Entity clarity, Google Business Profile data for local | GBP accuracy and YouTube presence feed Gemini directly |
| Claude | **Brave Search index** + training data | Brave's organic top results (~87% citation overlap per independent tests); analytical, well-sourced long-form; selective, favours third-party corroboration of brand claims | **Brave indexation is the prerequisite.** Check `site:{domain}` on search.brave.com (curl with a normal browser user-agent usually works, and the snippets show which version of each page Brave holds); Brave has no submission tool and indexes slower than Google, so allow its crawler and be patient. Google/Bing rank ≠ Brave rank |

Two cross-cutting facts to carry into recommendations: brand presence in **training data and live retrieval
both matter**, a brand mentioned widely across the web gets generated in answers even without a live citation;
and absence compounds, because engines keep omitting brands they have never seen, so the visibility gap widens
over time. Citation optimization on-page cannot overcome a weak brand footprint (Module 5).

**robots.txt: AI crawler directives.** Evaluate the rules against these user-agents. The cardinal rule: do not
block *search-time retrieval* bots, that is the fastest way to vanish from AI answers. Blocking *training*
crawlers is a legitimate business choice and a different decision.

| Crawler | Operator | Function | Guidance |
|---|---|---|---|
| OAI-SearchBot | OpenAI | ChatGPT search-time retrieval | **Allow.** Blocking removes you from ChatGPT search. Does not train models. |
| ChatGPT-User | OpenAI | User-initiated session fetches | **Allow** across user-facing content. |
| GPTBot | OpenAI | Foundation-model training | Business choice. Block on gated/proprietary paths if you don't want training ingestion. |
| PerplexityBot | Perplexity | Real-time search indexing | **Allow** for public resources; manage rate limits. Blocking de-indexes you from Perplexity. |
| ClaudeBot | Anthropic | Model training | Business choice, like GPTBot; allow on marketing resources; disallow IP-sensitive paths. |
| Claude-SearchBot | Anthropic | Claude search indexing | **Allow.** Blocking removes you from Claude's search results. |
| Claude-User | Anthropic | User-initiated fetches | **Allow** across user-facing content. |
| Google-Extended | Google | Gemini training | Business choice. Disallowing does not affect AI Overviews or normal Search. |
| CCBot | Common Crawl | Bulk public crawl | Often disallowed for proprietary databases. |

Flag as a **critical blocker** any robots.txt rule that blocks search-time retrieval bots (OAI-SearchBot,
Claude-SearchBot, PerplexityBot) on public marketing, product, or pricing pages. Also note: robots.txt blocks crawling, not
indexing, so to keep a page out of the index recommend a `noindex` tag, not just a robots disallow.

**Preview directives:** check for `nosnippet` (strips the page from both blue-link snippets and AI features, a
heavy penalty), `max-snippet`, and `data-nosnippet` on important content. Note that Google now offers a
generative-AI opt-out toggle in Search Console for businesses that want to leave AI features while keeping normal
organic snippets.

**llms.txt: get the framing right.** llms.txt is **not** a search ranking factor. Google has said outright it
does not support it and has no plans to (Gary Illyes, mid-2025; John Mueller compared it to the defunct keywords
meta tag), and Ahrefs' analysis of 137,000 sites found ~97% of llms.txt files are never fetched by AI crawlers.
Stuffing it with marketing copy does nothing. Its real value is as an *agentic operating manual*: when an AI
agent has already decided to act on a site, a clean llms.txt tells it how to construct canonical URLs, parse
normalization rules, and route tasks. Google added a Lighthouse "agentic browsing" audit for it in 2026. It is
low-effort and harmless to ship, so never score its absence as a meaningful gap, and never let a client believe
it is an AI-visibility fix.
- **Recommend implementing** for API/developer-documentation sites and transactional platforms / marketplaces.
- **Recommend postponing** for standard blogs and brochure sites; the effort outweighs the benefit today.
- If present, validate structure: a single H1 with the literal brand name; a blockquote summary of what the site
  is for and what tasks can be executed; H2 category groupings; and Markdown link lines (`- [Title](URL): optional description`).

**Sitemaps:** present, referenced in robots.txt, and covering the real content set? For Bing/Copilot visibility,
recommend submitting sitemaps to Bing Webmaster Tools.

## Module 5: Off-page consensus and brand mentions (GEO trust; AIV pillar Oa), the highest-leverage module

AI engines validate claims against consensus across the wider web, partly to avoid hallucination, and the
evidence says this is where AI visibility is primarily won. The hierarchy, from strongest correlation down:
**YouTube mentions (~0.74)**, **branded web mentions (0.664)**, then backlinks (0.218), with earned editorial
media supplying ~84% of AI citations (Muck Rack) and review-platform presence roughly tripling ChatGPT citation
odds (SE Ranking: Trustpilot, G2, Capterra, Sitejabber, Yelp). Weight your recommendations accordingly: for most
clients, a digital-PR and mention-building program beats both a link-building program and more blog posts.
Much of this needs tools beyond an HTML fetch, so assess what you can from the site and recommend the rest
honestly.

**Match the off-site targets to the category.** The specific third-party sources AI cites vary sharply by
business type; recommend presence where the client's category's answers are actually sourced (and confirm with
the Module 6 spot-check, competitors' citations reveal the target list):

| Category | Priority AI citation sources |
|---|---|
| Travel / tourism / experiences | **TripAdvisor is the #1 travel citation source across engines** (and has Perplexity/OpenAI partnerships); Google reviews, Trustpilot, editorial travel press; Reddit secondary |
| SaaS / B2B tech | G2, Capterra, Trustpilot; **LinkedIn is the top-cited domain for professional queries**; industry publications |
| Professional / B2B services | LinkedIn thought leadership, industry press quotes, original research/benchmark reports, G2/Clutch |
| Home services / builders / trades | Angi, HomeAdvisor, Houzz (aggregators currently dominate contractor AI answers), trade-association directories, local-news "best of" roundups, Google/Yelp reviews |
| Local (all) | Google Business Profile, Bing Places, Apple Maps, Yelp, Foursquare, NAP-consistent directories |
| E-commerce / consumer | Reddit (dominant in AI shopping discussion), YouTube reviews, Trustpilot, category review sites |

**From the site (assessable now):**
- `sameAs` / social profile links forming a coherent entity graph (site → LinkedIn, Crunchbase, Wikipedia,
  socials)?
- For local: NAP (Name, Address, Phone) present and internally consistent across pages? LocalBusiness schema
  with geo coordinates? Dedicated, current local landing pages with city + service in the H1/title?

**Off-site (recommend, with the right tool and benchmark):**
- **Forum consensus**: ChatGPT is markedly more likely to cite brands with strong presence on Quora (>~1.1K
  mentions ≈ 3x) and Reddit. In AI Mode shopping, Reddit dominates discussion sources. Recommend a digital PR /
  community strategy, not keyword pages. Note the platform variance: Google AI Overviews and AI Mode lean
  heavily on Reddit for social citations, while Gemini draws far more from expert long-form editorial (e.g.
  Medium) than from Reddit, so a community play and an editorial-publishing play cover different engines, and
  clients targeting Gemini need the editorial lane, not just threads.
- **NAP across directories**: recommend exact-match consistency across Google Business Profile, Apple, and Bing.
- **Bing Places**: because ChatGPT sources local recommendations from the Bing index, claiming and syncing Bing
  Places with the Google Business Profile is a concrete local quick win.
- **Google Business Profile**: completeness, correct primary category, review velocity, and review keyword
  sentiment now feed Google's Ask Maps (Gemini-in-Maps) conversational recommendations. Warn local clients that
  AI recommendation is far more selective than the local pack: SOCi's 2026 index found ChatGPT recommended only
  ~1.2% of locations versus ~36% appearing in Google's 3-pack, and fewer than half of Google-local leaders carry
  over to AI answers. Whitespark's 2026 factors survey found the weightings flip for AI visibility, on-page
  content rises to the top while GBP's weight drops sharply, so a local client cannot rely on GBP alone.
- **YouTube presence**: the strongest single correlate of AI visibility. Mention frequency matters more than
  view counts, so earned mentions in others' videos, review videos, and a modest owned channel all count.
  Recommend it explicitly for clients with none.
- **Editorial backlinks** from authoritative publications still function as validation. Backlinks are not dead.
- **Earned-media bias**: research (University of Toronto, 2025) found AI search engines systematically favour
  earned media (third-party reviews, independent mentions, press) over a brand's own pages. This is why off-site
  validation, not just on-site copy, is central to GEO. Weight your recommendations toward third-party presence
  (G2, Capterra, Trustpilot, industry publications, Reddit, Quora) where it's relevant to the business.

## Module 6: AI citation spot-check (share of voice; Full Audit, reported unscored)

The most direct measure of AI visibility is simply asking: when a buyer poses the questions this business should
win, does it appear? Run this for every Full Audit. It is an approximation, not tool-grade tracking, and the
report must say so, but it grounds the whole engagement in observed reality and gives the client a baseline to
re-measure against.

**Method:**
1. Draft 8–12 buyer-intent prompts from what you learned in the crawl: category queries ("best [category] in
   [region]"), problem queries ("how do I [problem the client solves]"), comparison queries ("[client] vs
   [competitor]", "[category] alternatives"), and a direct brand query ("what is [brand]?", which also tests
   how accurately AI describes them).
2. Run each as a web search and inspect what the answer surfaces and top-cited sources look like for that query
   space. Where the environment allows, check AI-surfaced results directly. Record: does the brand appear, who
   appears instead, and which third-party sources those competitors are being cited from.
3. Build the finding set: **presence rate** (queries where the brand appears / total), **competitor share** (who
   owns the answers), **source pattern** (which platforms the engines cite for this category, this feeds the
   Module 5 target list directly), and **description accuracy** (does AI describe the brand correctly, or
   confuse/misstate it).

**Honest limits:** state clearly this is a point-in-time approximation via search, not multi-engine prompt
tracking. For ongoing measurement, name the tool tier: Otterly.AI or Peec AI for SMB/agency budgets, Semrush AI
Toolkit or Ahrefs Brand Radar if the client already runs those stacks, Profound for enterprise. Do not fold this
into the AI Visibility Score (the sample is too small to score honestly); report it as its own observed-baseline
section.

## AEO layer (cuts across Modules 2 and 3)

AEO is about being the extracted answer in featured snippets, People Also Ask, and voice. It rewards
"answer-first" formatting and high information density. Check content against this matrix:

| Query pattern | Trigger language | Best format | Schema |
|---|---|---|---|
| Definition | "what is", "define" | Concise 200–250 char definition, lead with it | FAQPage or Article |
| Step-by-step | "how to", "steps to" | Explicit numbered `<ol>` with descriptive H3s | HowTo |
| Comparison | "best X vs", "difference between" | Clean comparison `<table>` with headers | (table markup) |
| Direct Q&A | "why is", "can you" | Question in an H2, answer first in the paragraph | FAQPage nested in Article |
| Local / near-me | "[service] near me" | Map-pack-aligned content, geographic markers | LocalBusiness + geo |

Also check: question-phrased H2/H3 headings, FAQ schema present and correctly structured, HowTo schema on
process content, conversational phrasing for voice, and coverage of the specific questions buyers ask (who, what, when, where, why, how)
questions.

## Honest limits: name the tool, don't guess

Some signals cannot be assessed from an HTML fetch. Never fabricate a number. When these come up, state the
limit and name the tool:
- **Real Core Web Vitals / page speed** → Google PageSpeed Insights (pagespeed.web.dev).
- **AI Overviews / AI Mode impressions and citation position** → Google Search Console, AI Overviews / AI Mode
  search-type segments.
- **Copilot grounding queries** → Bing Webmaster Tools.
- **Whether the brand is actually cited by ChatGPT / Perplexity / Gemini** → Module 6 gives the approximation;
  for continuous tracking name the tool tier (Otterly.AI / Peec AI for SMB, Semrush AI Toolkit / Ahrefs Brand
  Radar on existing stacks, Profound for enterprise).
- **AI referral traffic** → GA4 with a custom "AI Referrals" channel (regex matching chatgpt.com, openai.com,
  perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com) placed above the default Referral group,
  plus text-fragment (`#:~:text=`) tracking. Teach the two caveats: measured AI traffic is a **floor, not a
  total** (mobile apps and some surfaces strip referrers into Direct), and Google's own AI Overviews / AI Mode
  clicks land in *organic*, not the AI channel (use the Search Console AI Mode filter for that slice).
- **Leading indicator** → server-log hits from retrieval crawlers (OAI-SearchBot, PerplexityBot) precede
  citations; recommend a log check where the client's host allows it.
