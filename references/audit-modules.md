# Audit modules (Step 3)

These modules describe **how to investigate**. `readiness-checklist.md` decides **how to score**: every finding lands on a check ID there (gates G1–G6, pillars OS, TD, BQ, SD, PX, and the CM commerce checks), and only the checklist turns findings into points. Work through all six modules for every audit (Module 6's measured tier is Full Audit only), then the AEO layer, and the e-commerce section when the client sells online.

Discipline tags (SEO, GEO, AEO) live on each check in the checklist. As a rough map: SEO is Modules 1, 2 and the search-crawler half of Module 4; GEO is Modules 3, 5 and the AI-bot half of Module 4; AEO is the answer layer. Google treats all three as SEO ("Good SEO is good GEO"; [Search Engine Land](https://searchengineland.com/google-danny-sullivan-good-seo-good-geo-461464)). We separate them to show the client where the work is.

**Rule for every figure in this file and in the report:** it carries its source (linked), month and year, method (experiment, correlation, survey, or platform statement) and a vendor flag when the publisher sells SEO, PR or AI-tracking products. A figure without those does not go in a client report.

## Contents

- Module 1: Technical, performance and penalty screen
- Module 2: Schema and entity markup
- Module 3: Content and buyer-question alignment
- Module 4: AI crawler access and first-party AI controls
- Module 5: Off-site presence and entity
- Module 6: Observed AI visibility
- AEO layer
- E-commerce (optional)
- Honest limits

## Module 1: Technical, performance and penalty screen

Feeds **G1, G3, G6, TD1, TD2, TD4, TD6, TD7, TD9, BQ10, PX1–PX3**.

If a page can't be crawled, rendered and indexed, nothing else in the audit matters for that page.

**Crawlability and rendering**
- **Raw vs rendered content (G3)**: are primary content, internal links, proof (testimonials, client names, case-study text) and JSON-LD in the raw HTML, or injected by client-side JavaScript? In the most recent public test, OpenAI, Anthropic, Meta, ByteDance and Perplexity crawlers didn't execute JavaScript; AppleBot and Gemini (via Googlebot) do ([Vercel and MERJ](https://vercel.com/blog/the-rise-of-the-ai-crawler), Dec 2024, log analysis, hosting vendor; not replicated since). Flag JS-only content and recommend server-side rendering.
- **Key pages first.** List the key pages in the audit file (`keyPages`) before scoring: home, each primary service or product page, pricing, about, contact, and the five pages with most search impressions (without Search Console data, the five with most internal links). G1, G3, G4, TD1, TD4, TD6, TD7 and BQ2 are all judged on this list, so two analysts check the same pages.
- **Robots and indexability (G1)**: any accidental `noindex`, blocking header, or robots.txt rule against Googlebot or Bingbot on key pages? G1 fails only for the home page, primary service or product pages and pricing; the same fault on other key pages scores TD1. Behind Cloudflare or another CDN, the edge can block Googlebot even when robots.txt is clean (Module 4): G1 is then **verify** unless the owner confirms the bot settings.
- **Canonicals and hosts (TD2)**: self-consistent canonicals, one host, duplicate hostnames redirecting.
- **Response hygiene (TD1)**: key pages return 200; retired URLs redirect in one hop. This is practitioner guidance rather than a measured citation factor, but Google's documentation says pages that don't return 200 may not be rendered ([Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), platform documentation).
- **Internal linking (TD4)**: key pages within about three clicks of the home page, descriptive link text, no orphaned key pages.
- **Language versions (TD9)**: hreflang and content parity for each language served. For Canadian clients, check that French pages carry the same facts, proof and pricing as the English ones, not a thinner copy.

**On-page basics (TD6, TD7, BQ10)**
- **Titles and meta descriptions**: unique, descriptive, not truncated in results, and written to earn the click (say what the page offers and for whom). Judge click-worthiness, not keyword placement.
- **Heading outline**: one H1 and a logical H2 / H3 structure.
- **URLs**: readable, minimal parameters.
- **Proof imagery (BQ10)**: client logo walls, award badges and certification marks often ship with empty alt text, so the site's strongest trust signals are invisible to crawlers. Flag empty-alt proof imagery and recommend descriptive alts plus a text line naming the clients or awards. BQ10 asks whether proof is findable (alt text, linked, in the sitemap); whether it is in the raw HTML is G3, so don't score the same defect twice.
- **Open Graph and viewport**: og:title, og:description, og:image and a mobile viewport present. Hygiene; not scored.
- **Accessibility basics**: labelled form fields and buttons, alt text, real links rather than script-only clicks. Agents that browse sites use the same cues. Report as a note; it isn't a scored check. Lighthouse 13.3 has an experimental Agentic Browsing category that tests some of this ([Chrome for Developers](https://developer.chrome.com/docs/lighthouse/agentic-browsing)).

**Performance (PX1–PX3)**: you can't measure Core Web Vitals from an HTML fetch, so never estimate them. Score only from PageSpeed Insights (pagespeed.web.dev) or CrUX field data, against Google's thresholds at the 75th percentile: **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1** ([web.dev](https://web.dev/articles/vitals); [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals), platform documentation, checked Nov 2026). If not measured, the page experience pillar is dropped, not guessed. It is the only pillar that can drop out. There are no separate "citation speed" thresholds: claims that faster pages get cited more come from correlational vendor data that doesn't survive domain controls ([Moore and Dunne, arXiv 2609.35077](https://arxiv.org/pdf/2609.35077), Sept 2026, correlation with domain fixed effects, authors at an AEO benchmarking vendor).

**Penalty screen (G6)**: look for patterns that match Google's **named** spam policies, using Google's own headings. Google enforces them through automated systems and manual actions, and since **15 May 2026** has said they apply to its generative AI responses too ([Google documentation updates](https://developers.google.com/search/updates), platform statement). Its AI optimization guide adds that creating pages mainly to manipulate rankings or AI responses violates the scaled content abuse policy ([Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), May 2026). For scale: after the March 2024 update, third-party tracking found 837 of 49,345 monitored sites deindexed, mostly heavy AI or thin content ([Search Engine Journal](https://www.searchenginejournal.com/googles-march-2024-core-update-impact-hundreds-of-websites-deindexed/510981/), Mar 2024, independent tracking).

| Risk pattern | What it looks like in the crawl | Policy and date |
|---|---|---|
| Scaled content abuse | Near-identical thin pages, template text with swapped keywords, mass pages with no original value, by a human or a model. **Fail only with evidence of scale** (for example 10 or more near-duplicate pages, listed) | Spam policy (Mar 2024); applies to AI responses (15 May 2026) |
| Doorway abuse | City or service pages that differ only by place name and funnel to one destination. **Fail only with evidence of scale** (for example 10 or more near-duplicate pages, listed); one or two thin location pages score under BQ and the content plan instead | Doorway policy. **Test:** each new location or vertical page needs at least two page-specific evidence items (a named local project, local staff, local reviews, a local price, rule or condition) and must deserve to exist if search didn't |
| Site reputation policy (site reputation abuse) | Third-party content (coupons, partner or sponsored sections) riding the domain's authority, unrelated to the core business | Spam policy (Mar 2024); policy updated, EEA enforcement adjusted (28 Aug 2026) |
| Expired domain abuse | Content unrelated to the domain's evident history or name | Spam policy (Mar 2024) |
| Hidden text and link abuse | Text or links styled to be invisible to users | Spam policy |
| Malicious practices | Includes back-button hijacking: scripts that stop users returning to the results page or redirect them on Back | Spam policy; back-button hijacking added 13 Apr 2026 |

Dates in this table are from [Google documentation updates](https://developers.google.com/search/updates) unless noted. Word any hit as **"matches the pattern of policy X"** (naming one of the headings above), never "penalized", and give the evidence. A hit fails gate G6 and is a Critical blocker.

**Not G6 (score elsewhere, never as a spam-policy hit):**
- **Self-ranking "best of" lists** (the brand's own list ranking itself first, no disclosed criteria). No Google policy names them. Score BQ8 `notmet`, worded: "practitioner reports link these to organic visibility losses (six sites, Jan 2026, not confirmed by Google)" ([Search Engine Journal](https://www.searchenginejournal.com/is-google-finally-cracking-down-on-self-promotional-listicles/), practitioner analysis, grade C).
- **Fake or undisclosed incentivized reviews** in review markup: not a spam policy. Google's 24 Jul 2026 change is a review-snippet structured-data guideline ([Google documentation updates](https://developers.google.com/search/updates)). Score SD3 `notmet`, worded "breaks Google's review-snippet guideline, 24 Jul 2026", and add a note that fake or incentivized reviews can breach consumer-protection law.
- **Schema mismatch** (markup for content not on the page): score SD3.
- **Link footprint** (exact-match anchor blocks, obvious paid links visible on-page): a note; a full check needs a backlink tool.

**Triage to teach in the report**: a core update drop is a quality recalibration with no single fix; a spam update drop or a Search Console manual action means a specific policy issue to find and fix. Google lists each confirmed core and spam update with start and end dates on the [Search Status Dashboard](https://status.search.google.com/), so date-matching a traffic drop against it is the first diagnostic step. Google's position is that AI-assisted content is judged on its value, not who wrote it; mass-produced thin pages break policy either way ([Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

## Module 2: Schema and entity markup

Feeds **SD1–SD5**, and supports **OS1–OS3**.

Structured data is a machine-readability and entity-clarity foundation, not a proven AI-citation lever. Google says there is "no special schema.org structured data that you need to add" for AI Overviews or AI Mode ([Google: AI features](https://developers.google.com/search/docs/appearance/ai-features), platform statement). Ahrefs' matched-control test of 1,885 pages that added JSON-LD found AI Overview citations fell 4.6% against about 4,000 controls, with ChatGPT and AI Mode changes inside noise ([Ahrefs](https://ahrefs.com/blog/schema-ai-citations/), May 2026, quasi-experiment, vendor; treated pages already had AI presence). Microsoft's Fabrice Canel has said schema helps Copilot's models understand content ([Search Engine Land](https://searchengineland.com/microsoft-bing-copilot-use-schema-for-its-llms-453455), SMX Munich, Mar 2025, platform representative relayed second-hand, grade C). So recommend clean, accurate markup confidently for the Google rich results that remain and for Bing, and never present it as a citation shortcut.

Rich results that remain worth supporting: Product and merchant listings, review snippets, Organization, LocalBusiness, BreadcrumbList, Article, Video and Event ([Google documentation updates](https://developers.google.com/search/updates)). Parse every JSON-LD block, map it to the page type, and check nesting and accuracy.

| Page type | Target schema | Key properties | Useful additions |
|---|---|---|---|
| Company homepage | Organization (or LocalBusiness), WebSite | name, url, logo, contact | sameAs to real profiles (scored in OS2, not SD1); WebSite site name (SD5) |
| Local or service business | LocalBusiness or a subtype | name, address, telephone | geo, openingHours, areaServed |
| B2B service page | Service | serviceType, provider | areaServed, provider linked to the Organization |
| E-commerce product | Product / ProductGroup | price, priceCurrency, availability, GTIN or MPN where they exist | variants via ProductGroup; shipping and return details (see E-commerce) |
| Article or guide | Article | headline, author (Person), datePublished, dateModified | publisher, mainEntityOfPage |
| Any page | BreadcrumbList | itemListElement | (SD5) |

**Retired Google tactics (SD4)**: HowTo rich results went in 2023. FAQ rich results were deprecated: **announced 8 May 2026, effective 7 May** ([Google documentation updates](https://developers.google.com/search/updates); [Search Engine Land](https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957)). FAQPage that matches a visible FAQ is harmless and passes SD4, but has no proven AI effect: pages with FAQ schema averaged fewer ChatGPT citations than pages without, 3.6 against 4.2 ([SE Ranking](https://seranking.com/blog/chatgpt-citation-factors/), Nov 2025, correlation, vendor). Never recommend FAQ or HowTo markup as a Google appearance play.

Schema must match visible content (SD3). Markup for content that isn't there risks a manual action.

**One fact, one check.** SD1 asks only whether the Organization or LocalBusiness markup is valid and matches the visible facts on the site. Whether those facts agree with outside profiles is OS1; whether sameAs links to real profiles is OS2. A wrong phone number costs points once, in OS1.

**Entity review (OS1–OS3, OS8)**: while in the markup, check that the brand name, address, phone and one-line description match the visible site and the main profiles. Search the brand name and note whether a knowledge panel appears, whether the brand's own properties lead, and whether any name collision needs addressing.

## Module 3: Content and buyer-question alignment

Feeds **BQ1–BQ10**.

In the best-controlled study so far, pages whose wording overlaps more with tracked buyer prompts were cited more (about 30% more per standard deviation; observational, a word-overlap measure, 19 B2B SaaS workspaces, vendor authors; the authors say this is not an intervention effect, and out-of-sample prediction was weak, r² 0.018), while domain alone explained far more of the variance (R² 0.32) than all page features (at most 0.13) ([Moore and Dunne, arXiv 2609.35077](https://arxiv.org/pdf/2609.35077), Sep 2026). So start here, but keep it in proportion: list the buyer questions from Module 6's panel and check that each has a page that answers it (BQ1). **Score BQ1 only against prompts not taken from the client's own site**, otherwise the check scores itself.

**The GEO paper's tactics, read correctly.** Princeton and IIT Delhi researchers (Aggarwal et al., KDD 2024) built GEO-bench (10K queries) and, on its 1K test split, rewrote one of the top five Google results for each query, then measured that source's share of words in a GPT-3.5 answer generated over those same five documents ([arXiv 2311.09735](https://arxiv.org/html/2311.09735v3), 2024, lab experiment). The page was already in the model's context. Nothing here measures retrieval, ranking, citation rate or traffic.

| GEO tactic | Answer word-share lift in a lab setup (GPT-3.5 over a fixed top-5 source set, 2024) | What to look for |
|---|---|---|
| Quotation addition | about +41% | Attributed quotes from credible, named people (the paper inserted quotes; it didn't test author schema) |
| Statistics addition | about +32% | Specific figures with source and year (BQ5) |
| Cite sources | about +28% | Inline links to the primary report, standard or data set (BQ5) |
| Fluency optimization | about +29% | Clear, plain, grammatical prose |
| Authoritative tone | about +12–19% | Confident, evidence-backed statements rather than hedging |
| Keyword stuffing | about −9% | Flag and remove |

Figures from the paper's Table 1 ([arXiv 2311.09735](https://arxiv.org/html/2311.09735v3)). Its best pairing was statistics plus fluency, on a 200-example subset. Its "Cite Sources" result lifted fifth-ranked sources 115% and cut first-ranked sources 30%, inside the same fixed five-document context; don't use that to argue that rewrites let small sites leapfrog big ones.

**Caveat that goes with the table every time**: later replications mostly failed. C-SEO Bench found only 3 of 54 method-domain combinations significantly positive, none in question answering; E-GEO found 10 of 15 heuristics neutral or negative in e-commerce; SAGEO Arena, which let retrieval vary, found body-only rewrites *reduced* retrieval and citation. A July 2026 survey of 45 GEO studies found no technique with a stable, cross-platform effect, and in factorial trials relevance and position were the primary determinants; position isn't under the site's control ([Martinez, arXiv 2607.14035](https://arxiv.org/html/2607.14035v1), Jul 2026, single-author academic survey, preprint). Treat these tactics as plausible, small and conditional on already being retrieved. Padding and salesy copy are worth fixing as editorial judgment, but no study measured them, so don't attach a number.

**For smaller clients**, lead with answering the buyer's real questions on the pages that matter and earning third-party presence (Module 5). Rewrites alone rarely lift live citations.

**Direct answers (BQ2, BQ3)**: check whether key pages answer their main question in the opening lines and whether multi-question pages use question headings. Most ChatGPT-cited blog posts (72.4%) open with a short, self-contained answer of roughly 20–25 words ([Search Engine Land](https://searchengineland.com/how-to-get-cited-by-chatgpt-the-content-traits-llms-quote-most-464868), 2025, publication analysis, grade C). A short direct answer is our house style; no word count is a rule.

**Original data and proof (BQ4, BQ10)**: ChatGPT has shifted toward citing primary sources over summaries ([Search Engine Journal on Ahrefs data](https://www.searchenginejournal.com/chatgpt-most-cited-sites-primary-sources-ahrefs/592682/), March to September 2026, citation tracking, vendor). Where the site holds proprietary numbers (case study results, survey data, operational stats), flag them as unused assets and recommend a well-structured stat or research page. For BQ10, check that proof pages are linked and in the sitemap and that logos carry alt text (raw-HTML presence is G3).

**Length, sections and freshness (BQ7)**: the evidence conflicts, so don't prescribe targets.
- **Length**: SE Ranking found pages over 2,900 words averaged 59% more ChatGPT citations than pages under 800 ([SE Ranking](https://seranking.com/blog/chatgpt-citation-factors/), Nov 2025, correlation, vendor). AirOps found 500–2,000 words performed best and pages over 5,000 were cited less ([Search Engine Land](https://searchengineland.com/chatgpt-citations-ranking-precision-length-study-474538), 2026, correlation, vendor). Flag only thin pages on topics that need depth. Word count alone explained almost nothing once domain was controlled (R² 0.004, Moore and Dunne).
- **Sections**: very short sections (under about 50 words) were cited least for ChatGPT; AI Mode showed little difference (SE Ranking, as above). Flag walls of text and over-fragmented pages for readability.
- **Freshness**: pages updated within three months averaged about 1.7x the ChatGPT citations (6.0 against 3.6), and AI Mode 5.0 against 3.9 for pages untouched over two years ([SE Ranking citation factors](https://seranking.com/blog/chatgpt-citation-factors/), Nov 2025; [SE Ranking AI Mode](https://seranking.com/blog/how-to-optimize-for-ai-mode/), Dec 2025, correlation, vendor). Across about 17M cited URLs, AI-cited pages averaged 25.7% fresher than organic results, though AI Overviews cited slightly older pages ([Ahrefs](https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/), 2025, correlation, vendor). No study tests changing a date without changing content. **Rule: change the date only when facts, data or advice change, and show a changelog line.** Date bumping fails BQ7, but it can't be seen in one fetch: compare key pages against a Wayback Machine snapshot. Without that comparison, BQ7 is **unverifiable** (tool: Wayback Machine).

**Experience, expertise and trust (BQ6, BQ8, BQ9)**
- Named authors with relevant credentials and an author page or profile (BQ6).
- A real About page, accessible contact details, and visible proof (testimonials, awards, certifications, press).
- Decision content: pricing, comparison or "how to choose" pages, with any comparison disclosed and criteria-based, not a self-ranking list (BQ8).
- Commercial pages that say what is offered, for whom, and at what price or scope, rather than slogans (BQ9).
- Owned pages still matter at the bottom of the funnel: in 100 consumer-electronics shopping queries, 52–68% of AI citations went to brand sites (University of Toronto, Jan 2026, preprint, [arXiv 2601.16858](https://arxiv.org/html/2601.16858v2)). Untested in other categories, so treat it as a reason to keep product and pricing pages specific, not as a figure for this client.

## Module 4: AI crawler access and first-party AI controls

Feeds **G1, G2, G4, G5, TD3, TD5, TD8, TD10**, and SD3 for review markup.

Fully assessable from robots.txt, headers and search results, and the module where sites most often make themselves invisible by accident.

**Per-engine retrieval map.** Each engine has its own pipeline, so a site can be visible in one and absent from another.

| Engine | Retrieval source | Audit check |
|---|---|---|
| Google AI Overviews / AI Mode / Gemini app | Googlebot and the Google index; no separate AI index ([Google blog](https://blog.google/products-and-platforms/products/search/new-controls-website-owners/), 2026, platform statement) | Classic Google indexing (G1, G4) and the Search Console generative AI setting (G5) |
| ChatGPT search | ChatGPT search uses OpenAI's own index (OAI-SearchBot; OpenAI documentation, A). OpenAI doesn't publish its third-party providers: it has a historic Bing partnership, and a single press report (Aug 2025) says it also pulled Google results (C). Bing matters for Copilot; for ChatGPT, test rather than assume ([OpenAI](https://developers.openai.com/api/docs/bots); [Search Engine Land](https://searchengineland.com/openai-chatgpt-serpapi-google-search-results-461226)). OpenAI says sites that opt out of OAI-SearchBot "will not be shown in ChatGPT search answers" | OAI-SearchBot allowed (G2). Test ChatGPT directly in Module 6 rather than inferring it from Bing |
| Microsoft Copilot | Bing index | Bingbot allowed (G1); Bing indexation confirmed in Bing Webmaster Tools (G4). Bing often blocks or garbles automated `site:` queries, so mark G4 **verify** rather than guess. Then Bing Webmaster Tools and IndexNow (TD8, scored only when G4 passes) |
| Claude | Claude's web search uses Brave as one provider (Anthropic subprocessor list), alongside Anthropic's own Claude-SearchBot crawler ([TechCrunch](https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/); [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)). turbopuffer is also on Anthropic's subprocessor list under "Web Search" (added 6 May 2026, grade A); its role isn't published, and one analysis suggests it serves search ([Xponent21](https://xponent21.com/insights/claude-web-search-brave-turbopuffer/), Jul 2026, grade C) | Check `site:{domain}` on search.brave.com (curl with a normal browser user agent usually works; snippets show which version of each page Brave holds). Brave has no submission tool. Brave coverage is a testable proxy, not the whole story (TD5) |
| Perplexity | Its own index built by PerplexityBot ([Perplexity](https://docs.perplexity.ai/guides/bots), platform statement) | PerplexityBot allowed (G2) |

Training data and live retrieval are separate paths, and robots rules affect them differently (see the next table). On-page work can't overcome a weak off-site footprint (Module 5).

**robots.txt.** The default rule: don't block search crawlers or AI search bots on public pages. Blocking training crawlers is a legitimate business choice and a separate decision (TD10), but **how** it is blocked matters: On Cloudflare, block AI training with **Disallow AI Training**, never **Block**: since 15 Sep 2026, Block also stops mixed-use crawlers, including Googlebot and Bingbot, from crawling for search (Cloudflare, Sep 2026, A). From 15 Sep 2026, new Cloudflare domains that show ads default to Search Allow, Training Disallow AI Training and Agent Block on pages with ads; existing zones that had the old "Block AI" setting moved to the same. Agent blocking can stop user-triggered fetchers such as ChatGPT-User on ad pages (Cloudflare, Jul and Sep 2026, A). Blocking an AI search bot can also be a legitimate choice (publishers, regulated firms): see the `choice` result below.

| Crawler / token | Operator | Function | Guidance |
|---|---|---|---|
| Googlebot | Google | Search, AI Overviews, AI Mode | **Must be allowed (G1).** The only crawler that controls Google's AI surfaces |
| Bingbot | Microsoft | Bing and Copilot (a historic ChatGPT partner) | **Must be allowed (G1)** |
| OAI-SearchBot | OpenAI | ChatGPT search index | **Allow (G2).** Doesn't train models |
| GPTBot | OpenAI | Model training | Business choice (TD10) |
| ChatGPT-User | OpenAI | User-initiated fetches | Don't block by accident (TD10). OpenAI says robots.txt rules "may not apply" ([OpenAI](https://developers.openai.com/api/docs/bots)); only a WAF rule enforces a block |
| ClaudeBot | Anthropic | Model training | Business choice (TD10) |
| Claude-SearchBot | Anthropic | Claude search quality indexing | **Allow (G2).** Anthropic says blocking it may reduce your site's visibility and accuracy in user search results ([Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)) |
| Claude-User | Anthropic | User-initiated fetches | Don't block by accident (TD10); blocking stops Claude retrieving the page for a user's question |
| PerplexityBot | Perplexity | Perplexity index | **Allow (G2)** |
| Perplexity-User | Perplexity | User-initiated fetches | Perplexity says it "generally ignores robots.txt rules" ([Perplexity](https://docs.perplexity.ai/guides/bots)); don't rely on robots.txt either way |
| Google-Extended | Google | A robots.txt token, not a crawler: controls use in Gemini training and grounding outside Search | Business choice (TD10). Doesn't affect AI Overviews or AI Mode |
| Applebot-Extended | Apple | Training opt-out token | Business choice (TD10) ([Apple](https://support.apple.com/en-us/119829)) |
| Meta-ExternalAgent | Meta | Crawler seen at scale in Cloudflare data, used for AI ([Cloudflare](https://blog.cloudflare.com/ai-crawler-traffic-by-purpose-and-industry), Aug 2025, network data, CDN vendor) | Business choice (TD10) |
| CCBot | Common Crawl | Bulk public crawl, widely used for training | Business choice |

A rule that blocks Googlebot or Bingbot on public marketing, product or pricing pages fails G1 and is a Critical blocker. A rule that blocks OAI-SearchBot, Claude-SearchBot or PerplexityBot fails G2, **unless the client tells you it is deliberate**: then G2 is `choice`. A `choice` must state its visibility cost in the evidence ("ChatGPT search won't show the site"), doesn't cap the index, and is listed in the report under "Choices you've made". Ask before assuming either way. robots.txt blocks crawling, not indexing: to keep a page out of the index, use `noindex`.

**TD10 covers training bots only** (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, CCBot) and user-triggered fetchers blocked by accident. Search bots are G2; don't score them twice.

**CDN and WAF check (G1, G2, TD10).** Read the response headers. `server: cloudflare` or a `cf-ray` header means Cloudflare. On Cloudflare, block AI training with **Disallow AI Training**, never **Block**: since 15 Sep 2026, Block also stops mixed-use crawlers, including Googlebot and Bingbot, from crawling for search (Cloudflare, Sep 2026, A). From 15 Sep 2026, new Cloudflare domains that show ads default to Search Allow, Training Disallow AI Training and Agent Block on pages with ads; existing zones that had the old "Block AI" setting moved to the same. Agent blocking can stop user-triggered fetchers such as ChatGPT-User on ad pages (Cloudflare, Jul and Sep 2026, A). Sources: [Cloudflare, Sep 2026](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/); [Cloudflare, Jul 2026](https://blog.cloudflare.com/content-independence-day-ai-options/) (platform documentation). So a site can allow Googlebot and OAI-SearchBot in robots.txt while its edge returns 403 to both. Edge settings can't be seen from outside:
- **G1 verify** (tool: "Cloudflare Security > AI Crawl Control: confirm the Training category is set to Disallow AI Training, not Block"). If the owner confirms Block, G1 fails; it is a true threshold in the plan (SKILL.md Step 3D).
- **G2 verify** for the AI search bots, pointing to the same screen (or the equivalent setting on another CDN).
- **TD10**: note whether user-triggered fetchers (ChatGPT-User, Claude-User) could be caught by the Agent default (Block on pages with ads) on a site that shows ads.
A curl with a spoofed bot user agent does not reproduce verified-bot handling, so don't treat it as proof either way.

**Preview directives and Google's AI controls (G5).** Check for `nosnippet` (removes the page from snippets and AI features), `max-snippet` and `data-nosnippet` on important content ([Google: AI features](https://developers.google.com/search/docs/appearance/ai-features)). Since **31 August 2026**, Search Console has a worldwide setting that lets a site opt out of appearing in, and grounding, AI Overviews, AI Mode and AI Overviews in Discover; Google says it won't be used as a ranking signal ([Google blog](https://blog.google/products-and-platforms/products/search/new-controls-website-owners/), platform statement). With Search Console access, confirm it isn't set to opt out. If the client opted out on purpose, G5 is `choice`, with its cost stated ("the site won't appear in or ground AI Overviews and AI Mode"), and it goes under "Choices you've made". Without access, mark G5 **verify**. The setting doesn't cover training; Google-Extended still does.

**First-party AI reports (day-one measurement actions).**
- **Search Console generative AI performance report**: announced 3 June 2026, on all sites by 31 August 2026; impressions only, no clicks, queries or position ([Google Search Central Blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)).
- **Bing Webmaster Tools AI Performance report**: public preview since 10 February 2026; citations and grounding queries, no clicks, covering "Copilot, Bing, and select partner AI experiences" ([Bing Webmaster blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview); [Bing Search blog](https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare)). Bing calls its Citation Share "an observational metric, not a ranking system or a competitive scoreboard". It is the only free first-party citation count for a major engine. Connect it in the first 30 days.

**llms.txt: get the framing right.** No major engine says it reads llms.txt for search or answers. Google's guide says "Google Search ignores them" and that llms.txt "will neither harm nor help your site's visibility or rankings in Google Search" ([Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), note added 15 June 2026, platform documentation). Of about 38,000 valid files, 97% received no requests from any bot ([Ahrefs](https://ahrefs.com/blog/llmstxt-study/), published 15 June 2026, May 2026 data, log analysis, vendor). Lighthouse 13.3 has an llms.txt audit in an experimental Agentic Browsing category (Chrome Canary): it flags a server error when retrieving the file and is not applicable on a 404; it doesn't check structure or citation ([Chrome for Developers](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)). Never score its absence and never present it as a visibility fix. It is optional for developer documentation and transactional platforms where agents act on the site; skip it for brochure sites. If present, check for a single H1 with the brand name, a short blockquote summary, H2 groupings and Markdown link lines.

**Sitemaps (TD3, TD8)**: present, referenced in robots.txt, covering every key page, and submitted to Bing Webmaster Tools (or IndexNow set up). TD8 is `na` unless G4 passes: if Bing indexation itself is failed or unconfirmed, the gate carries it.

**Index check (G4)**: for Google, Search Console URL Inspection on the key pages is grade A; a `site:` search is a proxy only (grade C), because it is not a reliable index count. For Bing, Bing Webmaster Tools data is grade A; Bing or DuckDuckGo results alone are a proxy, so G4 stays **verify** without it. G4 fails if any key page isn't indexed in Google. A Bing-only gap fails G4 only when it covers the home page or a primary service or product page; otherwise G4 can pass and the gap is a TD8 note. Don't claim URL Inspection results without Search Console access; if you have no access, G4 and G5 are both `verify`.

**Fresh index (TD5)**: check what Brave and Bing hold for the brand's key pages. Retired pages that misdescribe the brand are a finding.

## Module 5: Off-site presence and entity

Feeds **OS1–OS9**.

Two Ahrefs studies (vendor, correlational) found brand mentions tracked AI visibility far more than backlinks or page count; a separate study (Moore and Dunne, vendor authors, B2B SaaS) found domain-level factors explained far more than page features. That is why this pillar carries the largest weight (45, expert judgment). Domain fixed effects capture all domain-level factors, on-site and off-site; they are not a measure of off-site presence. The check that matches the mention evidence is OS5 (mention volume), so when OS5 is unverifiable the index is provisional ("the main off-site measure wasn't available"); the other OS checks are mostly entity hygiene, which no cited study measures directly. All of the evidence below is correlational and most of it is vendor-published. It tells you where to look, not what will cause a citation. Much of it needs tools beyond an HTML fetch: assess what you can and grade the rest.

**What the studies say (keep them separate; they measure different things)**
- **Web mentions (Ahrefs, May 2025)**: across 75,000 brands with DR above 40 and at least one AI Overview mention, branded web mentions had the strongest Spearman correlation with Google AI Overview visibility (0.664), against branded anchors 0.527, Domain Rating 0.326 and backlinks 0.218 ([Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/), correlation, vendor; Ahrefs notes correlation is not causation). Page count correlated only weakly (about 0.17).
- **YouTube mentions (Ahrefs, Dec 2025)**: a follow-up across 75,000 brands on ChatGPT, AI Mode and AI Overviews found brand mentions in YouTube video titles the strongest correlate, about 0.737 ([Ahrefs](https://ahrefs.com/blog/ai-brand-visibility-correlations/), correlation, vendor, DR 40+ only). It counts other people's videos, not owning a channel. A different study and different engines from the first: don't merge them into one ranking.
- **Earned and third-party sources (Muck Rack, May 2026)**: about 84% of AI citations come from earned and third-party sources broadly defined (including academic, government and encyclopedic); journalism alone is about a quarter ([Muck Rack](https://media.muckrack.com/documents/What_Is_AI_Reading__May_2026.pdf), observational, PR-software vendor).
- **Earned-media bias (University of Toronto, Sep 2025)**: AI search shows a systematic bias toward earned media over brand-owned pages ([arXiv 2509.08919](https://arxiv.org/html/2509.08919v1), preprint, academic). The same lab's shopping exception is in Module 3 (consumer electronics only).
- **Review platforms (SE Ranking, Nov 2025)**: domains on multiple review platforms averaged roughly 2.5–3.5x more ChatGPT citations ([SE Ranking](https://seranking.com/blog/chatgpt-citation-factors/), correlation, vendor).
- **Forums (SE Ranking, Nov 2025)**: brands with heavy Quora and Reddit presence averaged about 4x the ChatGPT citations of minimal-presence brands (same source, correlation, vendor).

Platform shares move fast: Reddit's share of US ChatGPT answers fell from 19.1% to 2.3%, March to September 2026 (Ahrefs via [Search Engine Journal](https://www.searchenginejournal.com/chatgpt-most-cited-sites-primary-sources-ahrefs/592682/), citation tracking, vendor); Wikipedia 14.1% to 2.9%. So the target list comes from this client's own source map (Module 6, OS7), not a fixed rule.

**Starting hypotheses by category**, to confirm against the source map:

| Category | Where to look first |
|---|---|
| Travel and experiences | TripAdvisor is among the most-cited travel sources: top for "things to do" in Google AI answers ([5WPR](https://www.5wpr.com/new/ai-travel-recommendations-what-632-542-google-answers-cite/), 632,542 answers, observational, PR agency); one Cloudbeds study (hotel-software vendor, Jul 2025, 810 prompts, 145 hotels, ChatGPT, Perplexity, Gemini, grade C) found online travel agencies were 55% of hotel citations and TripAdvisor top on Perplexity, which Cloudbeds suggests reflects TripAdvisor's partnership with Perplexity ([Hotel Technology News](https://hoteltechnologynews.com/2025/07/research-otas-dominate-as-primary-source-in-ai-powered-hotel-discovery/)). Google reviews and travel press |
| SaaS and B2B tech | G2, Capterra, Trustpilot; LinkedIn, the top-cited domain for professional queries ([Profound](https://tryprofound.com/blog/linkedin-is-the-most-cited-domain-for-professional-queries-in-ai-search), Nov 2025 to Feb 2026, observational, AI-tracking vendor); industry publications |
| Professional and B2B services | LinkedIn, industry press, original research, Clutch or G2 |
| Home services and trades | Google and Yelp reviews, trade-association directories, local news roundups; check which aggregators the source map shows |
| Local (all) | Google Business Profile, Bing Places, Apple Business Connect, Yelp, consistent directories |
| E-commerce and consumer | YouTube reviews, Trustpilot, category review sites; check forum share in the source map |

**From the site (assessable now)**
- **Entity consistency (OS1)**: name, address, phone and description match across pages, schema and profiles.
- **Linked profiles (OS2)**: sameAs markup or visible links to LinkedIn, YouTube, Crunchbase, Wikidata and category platforms. sameAs is scored here only, not in SD1.
- **Knowledge graph and brand search (OS3, OS8)**: Wikidata item or knowledge panel; a clean brand search. OS3 is `na` only with a written test in the evidence ("no independent coverage found in two searches"); otherwise score it, because `na` removes it from the count.
- **Third-party videos (OS6)**: the brand named in other people's videos on buyer topics (reviews, podcasts on YouTube, industry channels). An own channel alone is `partial`.
- **Preferred sources (publishers only)**: Google extended preferred sources to AI Overviews and AI Mode on 27 May 2026 ([Google documentation updates](https://developers.google.com/search/updates)). For clients that publish regularly, note whether the preferred-sources button is set up. A note, not a scored check.

**Off-site (grade honestly)**
- **Review platforms (OS4)**: confirm a profile exists on the category's cited platforms. Review counts, ratings and velocity are **unverifiable** unless a tool or login supplies them.
- **Third-party mention volume (OS5)**: editorial, industry, podcast or partner mentions in the last 12 months, measured with a mention-tracking tool (grade A). OS5 is scored only at grade A. Without a tool, OS5 is **unverifiable**, never `met`, `partial` or `notmet` (a manual search is grade B, so it can't score OS5), and the index is provisional: a manual search that finds nothing is absence of evidence, not evidence of absence. Note what manual search did find in the evidence.
- **Cited domains (OS7)**: the brand appears on the third-party domains Module 6 shows are cited for this category, **excluding review platforms already counted in OS4**.
- **Editorial backlinks** still work as validation; they are not dead, just weaker than mentions in the data.
- Google's AI optimization guide warns that seeking inauthentic mentions "isn't as helpful as it might seem" ([Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). Recommend earning mentions, never manufacturing them.

**Local businesses (OS9)**
- **Google Business Profile** was 28.5% of all citations for local queries across AI Overviews, AI Mode and ChatGPT, and Yelp appeared as a source in 80% of ChatGPT's answers ([BrightLocal](https://www.brightlocal.com/resources/ai-directory-sources/), 26 Aug 2026, 1,355 locations in the US, UK and Australia, 60,970 checks, published method, local-SEO vendor, grade B). Confirm the profile is claimed with matching facts. Completeness, categories, review counts and velocity are **unverifiable** without access.
- **Bing Places and Apple Business Connect**: claimed and synced with the Google profile. Bing Places feeds Bing and Copilot.
- OS9 checks the listings exist and are claimed; whether their facts match is OS1. Score a wrong phone number once.
- **AI recommends far fewer locations than the map pack**: across about 350,000 locations, 35.9% appeared in Google's 3-pack against 1.2% recommended by ChatGPT, 11% by Gemini and 7.4% by Perplexity ([Search Engine Land on SOCi](https://searchengineland.com/ai-local-visibility-report-2026-468085), 2026, observational, local-marketing vendor).
- **Expert view on what matters**: in Whitespark's survey of 47 practitioners, experts rate on-page content (24%) above Google Business Profile (12%) for AI visibility ([Whitespark](https://whitespark.ca/local-search-ranking-factors/), 2026, expert survey, local-SEO vendor). Opinion, not measurement; a local client still can't rely on the profile alone.
- **Local landing pages** must pass the doorway test in Module 1.

## Module 6: Observed AI visibility

Reported as its own headline, never inside the index. Feeds **OS7** (source map) and **BQ1** (buyer questions). The scoring rules are in `readiness-checklist.md` ("Observed AI visibility"); this is the method.

**Why the method is strict**: AI answers change from run to run and from day to day. In SparkToro's study (28 Jan 2026, discussed again in a May 2026 webinar recap; ~600 volunteers, 12 prompts, 2,961 runs; co-run with a tracking vendor, not peer reviewed), the same brand list came back under 1 time in 100, and how often a brand appeared was much steadier than where it appeared ([SparkToro](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/)). The author recommends 60–100 runs per prompt for tracking; an academic survey proposes 7–8 repetitions as a floor ([Martinez, arXiv 2607.14035](https://arxiv.org/html/2607.14035v1), preprint). Our floor is 8. Small samples can't carry a rate: 1 mention in 9 answers has a 95% Wilson interval of about 2% to 44% ([Agresti and Coull](https://math.unm.edu/~james/Agresti1998.pdf)). And repeated runs are not independent answers: a brand named on one prompt tends to be named on every run of it, and the cited sources overlap only 0.34–0.42 from one day to the next (Martinez survey, as above), so runs on the same day resemble each other. The effective sample is smaller than the answer count, and the renderer widens the interval to match.

**1. Build the panel and freeze it.**
- At least **20 unbranded buyer prompts**, each labelled by intent: recommendation ("best [category] in [region]"), comparison ("[category] alternatives"), pricing, and problem ("how do I [problem]").
- **Source the prompts from outside the site first**: sales and support conversations (`sales`), Search Console queries (`gsc`), keyword tools (`keyword`), competitor pages (`competitor`), and community threads (`community`). **At most a third may come from the client's own site** (`site`). Record the source of every prompt. A panel drawn from the client's own pages asks questions the site already answers, which inflates the mention rate and makes BQ1 score itself.
- Branded prompts ("what is [brand]?") are kept separate and used **only** to check that the brand is described accurately. A prompt containing the brand name almost always returns the brand, so never count it toward a rate.
- Save the panel, intent labels, sources, engines, location, language, dates, tool and version, and brand-matching rules in the audit file. A re-audit reuses them unchanged.

**2. Measured tier (Full Audit, when engines can be queried directly).** Run each prompt **at least 8 times on each of at least 3 engines** (for example ChatGPT, Google AI Mode or AI Overviews, and Perplexity or Claude), queried directly, logged out, with location and language recorded, and **spread the runs for each prompt and engine over at least 8 separate dates** (in practice one run a day for 8 days; the renderer counts distinct dates, not `days` entries). Days matter because a day that shifts answers hits every prompt at once, and that part of the error shrinks only with more days. For each prompt and engine record `runs`, `mentions`, `searched` (the runs where the engine actually searched the web; in one ChatGPT setup 57.8% of runs never did, per the Martinez survey), `days: [{date, runs, mentions}]`, and `competitors: {name: mentions}` for the two to five competitors in the control set, counted on the same answers, with every competitor listed in every cell and `0` written explicitly when none of the runs named it (a missing name is counted as 0 without warning). The renderer refuses a cell without a numeric `searched`, with fewer than 8 distinct dates, or whose day totals don't add up. A mention rate that mixes training-data recall with live retrieval can't show whether site fixes did anything, so report the searched share beside each rate.

The renderer computes everything from the panel: **per-engine** rates, each with a 95% interval from a two-way cluster-robust variance (prompt and day, with an Agresti–Coull floor), shown as a Wilson interval on the effective sample size with a t critical value on G − 1 degrees of freedom, where G is the smaller of the number of prompts and the number of days, with the design effect printed; the per-engine competitor control set; and the **smallest detectable change** per engine, planned from a rate of at least 5% and a design effect of at least 1.5, with the 5% error rate split across engines and the same G − 1 degrees of freedom, because a shared day effect doesn't shrink as prompts are added (formula in `readiness-checklist.md`). It is printed as "N points". There is **no pooled all-engines rate**: a pooled figure is weighted by however many runs the analyst chose, not a number any buyer experiences. The cover shows each engine's rate. Never type engine totals; they are computed from the panel, so they always reconcile.

**Tell the client what the re-check can see, before they buy monthly tracking.** At 20 prompts over 8 days the re-check only detects large moves (at least about 16 points; each report prints its own figure). Precision comes from more prompts run on more separate days, not from more runs of the same prompt on the same days. For month-to-month tracking use 40 or more prompts, or treat monthly results as descriptive and test quarterly. (Our calculation; see the planning tables in `readiness-checklist.md`.)

**3. Search-proxy tier (Quick Audit, or when engines block direct queries).** Web searches stand in for AI answers. Print **no rate**. Say "named in X of N checks", label the section "search-proxy spot-check", treat it as an illustration, and use "not observed in N checks", never "invisible".

**4. Record, for each answer:** whether the brand is named, which competitors are named, and which third-party domains are cited. Cited sources build the off-site target map for OS7 and Module 5; report them descriptively, not as proof of what influenced the answer.

**5. Don't report:** rank position inside an answer (not a stable metric, per SparkToro above), a pooled rate across engines, or a share-of-voice figure from branded prompts.

**Tools for ongoing tracking**: Otterly.AI or Peec AI for smaller budgets, Semrush AI Toolkit or Ahrefs Brand Radar on existing stacks, Profound for larger programs. They collect differently (scraping consumer front ends or running keyword-derived prompt sets), and no independent accuracy benchmark between them exists, so numbers from two tools aren't comparable. Name the tool, version and method, and never switch tools between a baseline and a re-check.

## AEO layer

Feeds **BQ2, BQ3, TD7, SD4**.

AEO here means **being the extracted answer wherever one answer is shown**: AI Overviews, AI Mode, assistants, and the featured snippets that remain. Featured snippets fell from 15.41% of US results in January 2025 to 5.53% in June 2025 while AI Overviews spread ([Ahrefs](https://ahrefs.com/blog/how-serp-features-have-evolved-in-the-ai-era), published 22 Jul 2025, 1M US desktop SERPs, SERP tracking, vendor; Ahrefs reports a strong negative correlation (−0.905) with AI Overview growth, not proven cause), so the same content patterns now serve snippets and AI passages alike.

| Query pattern | Trigger language | Best format |
|---|---|---|
| Definition | "what is", "define" | A one- or two-sentence plain definition first, then detail |
| Step-by-step | "how to", "steps to" | A numbered `<ol>` with descriptive step headings |
| Comparison | "X vs Y", "difference between" | A comparison `<table>` with clear headers and disclosed criteria |
| Direct question | "why is", "can you" | The question as a heading, the answer in the first sentence below it |
| Local | "[service] near me" | Location facts in text, consistent NAP, LocalBusiness markup |

No markup is required for any of these (Module 2). Don't recommend FAQ or HowTo schema as a Google tactic (SD4). Also check that the specific questions buyers ask (who, what, when, where, why, how, how much) have answers on the site.

## E-commerce (optional)

Run when the client sells online. Feeds **CM1–CM4**, which are reported separately and kept out of the index so scores stay comparable across business types.

- **Feed health (CM1)**: Merchant Center feed approved, with GTIN or MPN where they exist. Usually **unverifiable** without access ([Google Merchant Center](https://support.google.com/merchants/answer/16837055)).
- **Price and stock parity (CM2)**: price and availability match across the feed, the page and Product markup. Spot-check three to five products.
- **Shipping and returns (CM3)**: visible policies, plus shipping and return markup or Merchant Center settings.
- **Agent checkout routes (CM4)**: eligibility for Google's Universal Commerce Protocol (open standard, 11 Jan 2026; checkout in AI Mode and Gemini for eligible US retailers) or a Shopify agentic storefront where the platform supports it ([Google](https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/), platform statement). ChatGPT Instant Checkout was scaled back in March 2026; OpenAI said checkout is "transitioning to apps" ([Digital Commerce 360](https://digitalcommerce360.com/2026/03/06/openai-shifts-checkout-plans-agentic-commerce-strategy/), 6 Mar 2026, trade reporting of an OpenAI statement, B), so don't build a recommendation on it. Commerce checks are outside the index; an unverifiable one is "Not scored". Also check that checkout forms work for an automated browser (labelled fields, no script-only buttons).

## Honest limits: name the tool, don't guess

Some signals can't be seen from an HTML fetch. Never fabricate a number. State the limit and name the tool:

- **Core Web Vitals** → PageSpeed Insights (pagespeed.web.dev) or CrUX. Not measured means the pillar is dropped.
- **Google AI impressions** → Search Console's **generative AI performance report**: impressions only, no clicks, queries or position ([Google Search Central Blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports)). AI Mode traffic is otherwise mixed into the normal Web totals.
- **Google AI opt-out state** → Search Console generative AI setting (G5).
- **Copilot and Bing AI citations** → Bing Webmaster Tools **AI Performance** report: citations and grounding queries, no clicks, covering "Copilot, Bing, and select partner AI experiences".
- **Whether ChatGPT, Perplexity, Gemini or Claude name the brand** → Module 6; for continuous tracking, a named tool with its method recorded.
- **Edge bot blocking** → Cloudflare Security > AI Crawl Control (confirm Training is set to Disallow AI Training, not Block) or the CDN's bot settings. Feeds G1 and G2 as `verify` until confirmed.
- **AI referral traffic** → GA4. The built-in **AI Assistant** channel (13 May 2026) only labels sessions with a recognized referrer: ChatGPT traffic splits across channels, Perplexity can land in Referral, Claude was reported dropped from the recognized list by June, and app traffic without a referrer lands in Direct ([Search Engine Journal](https://searchenginejournal.com/ga4s-ai-assistant-channel-undercounts-your-ai-traffic-how-to-build-one-that-doesnt/580133), Jul 2026, practitioner analysis, grade C). Use a **custom AI channel** (a source regex for chatgpt.com, openai.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com, placed above Referral) plus `utm_source=chatgpt.com` as the floor. Always label it a **lower bound**: AI Overview and AI Mode clicks sit in google / organic. Google added a documentation page on identifying Search traffic from the HTTP Referer header on 12 Nov 2026 ([Google documentation updates](https://developers.google.com/search/updates)); check whether it separates AI Mode clicks before saying it does.
- **Leading indicator** → server logs. ChatGPT-User and Claude-User hits mean a user's question caused a fetch; OAI-SearchBot and PerplexityBot hits mean index eligibility; GPTBot hits say nothing about visibility. Verify bots against their published IP ranges ([OpenAI](https://developers.openai.com/api/docs/bots); [Perplexity](https://docs.perplexity.ai/guides/bots)), because user agents are easy to spoof.
- **Backlink profile, mention volume, review counts** → a backlink or mention-tracking tool, or the client's logins. Until then, mark the check **unverifiable** and name the tool.
- **Date bumping (BQ7)** → a Wayback Machine comparison of key pages. Without it, unverifiable.
