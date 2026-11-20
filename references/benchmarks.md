# Benchmarks, evidence, and myths

This file holds every figure the audit is allowed to quote, the grade of evidence behind it, the reasoning behind
the v7.0 readiness weights, the myths to avoid, and the figures that were removed. When updating this skill,
update this file first; the rest of the skill points here. Figures last checked November 2026.

## How to use these figures

- **Print every figure with four things:** source (linked), month and year, method (experiment, correlation,
  survey, platform statement) and a vendor flag when the publisher sells the measurement or the remedy.
- **Executive summary: grade A or B only.** Grade C figures may appear in the body, labelled as indicative.
- **Correlation is never cause.** Write "sits with", "tracks", "is associated with". Never "drives", "boosts",
  "triples your odds" or "kills". Almost every AI-visibility figure below is a correlation published by a vendor.
- **Use the defensible wording in the table, verbatim.** Don't round up, merge two studies into one hierarchy, or
  drop the scope (engine, sample, date). A figure about Google AI Overviews is not a figure about "AI search".
  Other files copy the wording from here; if a file and this table disagree, this table wins.
- **Quotation marks only around a source's own words.** Paraphrase without them.
- **Check before quoting.** Where a number shapes a recommendation, confirm it is still current with a
  quick search. These figures move by edition; Muck Rack alone has printed 85%, 82%, 89% and 84%.
- **No figure outside this table.** `audit-modules.md`, `content-strategy.md`, `offsite-roadmap.md`, SKILL.md
  and the report must not quote a figure that is missing here. Add the row first, or delete the figure.
- **The skill's own calculations are not evidence.** The detectable-change planning tables in
  `readiness-checklist.md` (and the "at least about 16 points at 20 prompts over 8 days" line), the 1-in-6 yearly
  false-alarm figure for quarterly testing, the outcome-count threshold
  2 × √(2 × baseline count) and the design effect printed per engine are computed by `scoring.mjs` or by simple
  arithmetic from the audit's own data. Quote them as "our calculation", with their assumptions (planning rate,
  design effect, number of engines), never as a published figure.

## Evidence grades

| Grade | Means | Typical sources |
|---|---|---|
| **A** | Platform documentation, or a peer-reviewed venue | Google Search Central docs, web.dev, OpenAI / Anthropic / Perplexity / Bing documentation, KDD, NeurIPS, SIGIR papers |
| **B** | Preprints, academic surveys, large vendor studies with published methods, and self-reported platform figures (flagged "self-reported") | arXiv preprints, the Martinez survey, Ahrefs, Seer, Semrush, SE Ranking, Muck Rack, Pew, SparkToro / Gumshoe, a platform's own user counts |
| **C** | Small samples, single clients, opinion surveys, single press reports, undisclosed methods | One case study, expert-opinion surveys, agency models, practitioner analyses, one trade-press report |

`readiness-checklist.md` grades each audit *check* by how it was seen (A, B, C in the data, printed in the client
report as **Measured / Observed / Inferred**); don't mix the two scales. Source grades on the report's method page
stay A / B / C.

## Source table

Vendor? = Yes when the publisher sells SEO, AI-tracking, PR or review products, or the data came from its clients.

### Platform facts (2026)

| Figure (defensible wording) | Source | Date | Sample and method | Engine / scope | Vendor? | Grade |
|---|---|---|---|---|---|---|
| Optimizing for generative AI search "is optimizing for the search experience, and thus still SEO"; no chunking, AI rewrites or special markup needed | [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide); [SEJ summary](https://www.searchenginejournal.com/googles-new-ai-search-guide-calls-aeo-and-geo-still-seo/) | 15 May 2026 | Platform documentation | Google AI Overviews, AI Mode | No | A |
| "No additional requirements" to appear in AI Overviews or AI Mode; eligibility = indexed and snippet-eligible; "no special schema.org structured data" needed | [Google Search Central: AI features](https://developers.google.com/search/docs/appearance/ai-features) | 2026 | Platform documentation | Google | No | A |
| On llms.txt and similar files, Google's guide says "Google Search ignores them" and that llms.txt "will neither harm nor help your site's visibility or rankings in Google Search" | [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) (note added 15 Jun 2026, per the [documentation updates](https://developers.google.com/search/updates)) | 15 Jun 2026 | Platform documentation | Google Search | No | A |
| Spam policies apply to generative AI responses; pages made mainly to manipulate AI responses fall under scaled content abuse | [Google documentation updates](https://developers.google.com/search/updates); [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | 15 May 2026 | Platform documentation | Google | No | A |
| Google spam-policy headings used by gate G6, exactly as Google names them: scaled content abuse, site reputation policy (the policy defines site reputation abuse; EEA enforcement adjusted 28 Aug 2026), expired domain abuse, doorway abuse, hidden text and link abuse, malicious practices (back-button hijacking added as a bullet, 13 Apr 2026). Reviews are not a spam policy | [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies); [Google documentation updates](https://developers.google.com/search/updates) | Mar 2024 to Aug 2026 | Platform documentation | Google | No | A |
| Google's review-snippet structured-data guidelines name fake reviews and undisclosed incentivized reviews (a structured-data guideline, not a spam policy; scored under SD3) | [Google documentation updates](https://developers.google.com/search/updates) | 24 Jul 2026 | Platform documentation | Google review snippets | No | A |
| FAQ rich results deprecated: announced 8 May 2026, effective 7 May; HowTo rich results went in 2023 | [Google documentation updates](https://developers.google.com/search/updates); [Search Engine Land](https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957) | May 2026 | Platform documentation | Google SERP features | No | A |
| Preferred sources extended to AI Overviews and AI Mode | [Google documentation updates](https://developers.google.com/search/updates) | 27 May 2026 | Platform documentation | Google (publishers) | No | A |
| Search Console Generative AI performance report: impressions only, no clicks, queries or position | [Search Central Blog](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports); [Help](https://support.google.com/webmasters/answer/16984139) | Announced 3 Jun 2026; all sites by 31 Aug 2026 | Platform tool | AI Overviews, AI Mode, Discover | No | A |
| Search Console toggle lets a site opt out of appearing in and grounding AI Overviews and AI Mode; Google says it is not a ranking signal | [Google blog](https://blog.google/products-and-platforms/products/search/new-controls-website-owners/) | Worldwide 31 Aug 2026 | Platform documentation | Google | No | A |
| Bing Webmaster Tools AI Performance: citations and grounding queries, no clicks, covering "Copilot, Bing, and select partner AI experiences". Citation Share is "an observational metric, not a ranking system or a competitive scoreboard" | [Bing Webmaster blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview); [Bing Search blog](https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare) | Preview 10 Feb 2026; Citation Share 16 Jun 2026 | Platform tool | Copilot, Bing, select partners | No | A |
| ChatGPT search uses OpenAI's own index (OAI-SearchBot; OpenAI documentation, A). OpenAI doesn't publish its third-party providers: it has a historic Bing partnership, and a single press report (Aug 2025) says it also pulled Google results (C). Bing matters for Copilot; for ChatGPT, test rather than assume | [OpenAI bots](https://developers.openai.com/api/docs/bots); [Search Engine Land](https://searchengineland.com/openai-chatgpt-serpapi-google-search-results-461226) (reporting The Information) | 2026 docs; Aug 2025 report | Platform documentation; single press report | ChatGPT | No | A (own index); C (Google results) |
| OpenAI says sites that opt out of OAI-SearchBot "will not be shown in ChatGPT search answers"; for ChatGPT-User, robots.txt rules "may not apply" | [OpenAI bots](https://developers.openai.com/api/docs/bots) | 2026 | Platform documentation | ChatGPT | No | A |
| Claude's web search uses Brave as one provider (Anthropic subprocessor list), alongside Anthropic's own Claude-SearchBot crawler. turbopuffer is also on Anthropic's subprocessor list under "Web Search" (added 6 May 2026); its role is not published, and one analysis suggests it serves search | [TechCrunch](https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/); [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler); [Xponent21](https://xponent21.com/insights/claude-web-search-brave-turbopuffer/) | Mar 2025; May 2026; Jul 2026 | Subprocessor list; single analysis for turbopuffer's role | Claude | No | A (Brave, own crawler, turbopuffer listed); C (turbopuffer's role) |
| Anthropic says blocking Claude-SearchBot may reduce your site's visibility and accuracy in user search results (paraphrase) | [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) | 2026 | Platform documentation | Claude | No | A |
| Perplexity builds its own index with PerplexityBot; Perplexity-User "generally ignores robots.txt rules" | [Perplexity bots](https://docs.perplexity.ai/guides/bots) | 2026 | Platform documentation | Perplexity | No | A |
| From 15 Sep 2026, new Cloudflare domains that show ads default to Search Allow, Training **Disallow AI Training** and Agent **Block on pages with ads** (the Jul post announced blocking for Training too; the Sep post changed the Training default to Disallow AI Training); existing zones with the old "Block AI" setting moved to the same. Agent blocking can stop user-triggered fetchers such as ChatGPT-User on ad pages. robots.txt can allow a bot while the edge returns 403 | [Cloudflare, Jul](https://blog.cloudflare.com/content-independence-day-ai-options/); [Cloudflare, Sep](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/) | Jul and Sep 2026 (effective 15 Sep, new domains) | Platform documentation (Cloudflare's own post) | Bots behind Cloudflare | No | A |
| On Cloudflare, the Training setting **Block** (and Block on pages with ads) also applies to mixed-use crawlers from 15 Sep 2026, so it stops Googlebot and Bingbot from crawling for search too; **Disallow AI Training** keeps them crawling for search | [Cloudflare](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/) | Sep 2026 (effective 15 Sep) | Platform documentation (Cloudflare's own post) | Googlebot, Bingbot and other mixed-use crawlers behind Cloudflare | No | A |
| OpenAI, Anthropic, Meta, ByteDance and Perplexity crawlers didn't execute JavaScript; AppleBot and Gemini (via Googlebot) do (no replication since) | [Vercel](https://vercel.com/blog/the-rise-of-the-ai-crawler) | 17 Dec 2024 | Server logs on Vercel's network | AI crawlers | Yes (Vercel) | B |
| Lighthouse has an llms.txt audit in an experimental Agentic Browsing category: it flags a server error when retrieving the file and is not applicable on a 404. It doesn't check structure or citation | [Chrome for Developers](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt) | 2026 (Lighthouse 13.3) | Platform tool | Agentic browsing | No | A |
| Core Web Vitals "good": LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at the 75th percentile of field data. Google says Core Web Vitals "aligns with what our core ranking systems seek to reward" | [web.dev: Web Vitals](https://web.dev/articles/vitals); [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) | Checked Nov 2026 | Platform documentation | Google ranking | No | A |
| "Needs improvement" upper bounds used as the partial rule: LCP ≤ 4 s, INP ≤ 500 ms, CLS ≤ 0.25 | [web.dev: LCP](https://web.dev/articles/lcp); [web.dev: INP](https://web.dev/articles/inp); [web.dev: CLS](https://web.dev/articles/cls) | Checked Nov 2026 | Platform documentation (per-metric pages) | Google | No | A |
| Pages that don't return 200 may not be rendered, so key pages should return clean 200s (practitioner guidance, not a citation statistic) | [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) | Checked Nov 2026 | Platform documentation | Google | No | A |
| AI Mode uses "query fan-out": one question is split into several sub-searches run at once | [Google blog](https://blog.google/products/search/google-search-ai-mode-update/) | May 2025 | Platform documentation | Google AI Mode | No | A |
| Google's rater guidelines (current edition) describe main content made with little to no effort, originality or added value, including AI-generated content (section 4.6.6); Google's generative AI content guide points to them (1 Oct 2026) and says ratings don't directly influence ranking. Check the current wording before quoting | [Rater guidelines](https://services.google.com/fh/files/misc/hsw-sqrg.pdf); [Google documentation updates](https://developers.google.com/search/updates) | Current edition; 1 Oct 2026 | Platform documentation | Google | No | A |
| Microsoft's Fabrice Canel said schema markup helps Copilot's models understand content | [Search Engine Land](https://searchengineland.com/microsoft-bing-copilot-use-schema-for-its-llms-453455) | SMX Munich, Mar 2025 | Platform representative, relayed second-hand (a LinkedIn post reported by trade press; no transcript) | Bing, Copilot | No | C |
| Google's Universal Commerce Protocol (UCP): an open standard for agent checkout (11 Jan 2026), with checkout in AI Mode and Gemini for eligible US retailers | [Google](https://blog.google/products/ads-commerce/agentic-commerce-ai-tools-protocol-retailers-platforms/) | 11 Jan 2026 | Platform documentation | Google commerce, US | No | A |
| ChatGPT Instant Checkout was scaled back in March 2026; OpenAI said checkout is "transitioning to apps" | [Digital Commerce 360](https://digitalcommerce360.com/2026/03/06/openai-shifts-checkout-plans-agentic-commerce-strategy/) | 6 Mar 2026 | Several trade reports quoting an OpenAI statement | ChatGPT commerce | No | B |
| GA4 added a built-in AI Assistant channel on 13 May 2026. It labels only sessions with a recognized referrer: ChatGPT traffic splits across channels, Perplexity can land in Referral, Claude was reported dropped from the recognized list by June, and app traffic without a referrer lands in Direct | [Search Engine Journal](https://searchenginejournal.com/ga4s-ai-assistant-channel-undercounts-your-ai-traffic-how-to-build-one-that-doesnt/580133) | Jul 2026 | Practitioner analysis | GA4 | No | C |

### Clicks, traffic and market share

| Figure (defensible wording) | Source | Date | Sample and method | Engine / scope | Vendor? | Grade |
|---|---|---|---|---|---|---|
| Users clicked a traditional result in 8% of visits with an AI summary vs 15% without; about 1% clicked a link inside the summary | [Pew Research Center](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/) | Jul 2025 (data Mar 2025) | Browsing panel, 900 US adults | Google AI Overviews | No | B |
| Organic CTR on AI Overview queries fell 61% (1.76% to 0.61%); 2026 update shows levelling off, not recovery | [Seer 2025](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update); [Seer 2026](https://seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update) | Sep 2025; Feb 2026 data | 3,119 queries, 42 organizations; then 5.47M queries, 53 brands | Google AI Overviews, informational | Yes (agency client data) | B |
| Brands cited inside an AI Overview got 35% more organic clicks than uncited brands; Seer says it cannot show the citation caused it | [Seer](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update) | Sep 2025 | Same Seer dataset, correlation | Google AI Overviews | Yes | B |
| Position-one CTR is 58% lower when an AI Overview appears | [Ahrefs](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/) | Feb 2026 (Dec 2025 data) | 300,000 keywords, own data, correlation | Google AI Overviews | Yes | B |
| AI Mode: 92–94% of sessions had no external click; an independent panel found 77.6% | [Semrush](https://www.semrush.com/blog/google-ai-mode-seo-impact/); [SEJ](https://www.searchenginejournal.com/the-impact-of-ai-mode-on-seo-analysis-of-10-studies/558816/) | May–Jul 2025 | Clickstream, ~69M sessions, US desktop | Google AI Mode | Yes | B |
| Zero-click: about 34% of searches without an AI Overview, about 43% with one. The 69% figure is news searches with no click to a news site | [Semrush](https://www.semrush.com/blog/google-ai-mode-seo-impact/); [Search Engine Roundtable](https://www.seroundtable.com/similarweb-google-zero-click-search-growth-39706.html) | 2025; Similarweb May 2025 | Clickstream | Google | Yes | B |
| Featured snippets fell from 15.41% of US results in January 2025 to 5.53% in June 2025 while AI Overviews spread. Ahrefs reports a strong negative correlation (−0.905) with AI Overview growth, not proven cause | [Ahrefs](https://ahrefs.com/blog/how-serp-features-have-evolved-in-the-ai-era) | Published 22 Jul 2025 | SERP tracking, 1M US desktop SERPs, observational | Google, US desktop | Yes | B |
| AI referrals are about 0.3% to 1% of site traffic (Conductor 1.08%, SE Ranking 0.32%); one agency reports up to 6% on its clients | [Search Engine Land](https://searchengineland.com/ai-1-traffic-mostly-chatgpt-464653); [SE Ranking](https://seranking.com/blog/ai-traffic-research-study/) | 2025–2026 | Multi-site analytics | All AI assistants | Yes | B |
| AI Overviews has more than 2.5 billion monthly users, AI Mode more than 1 billion (self-reported) | [Google blog](https://blog.google/products-and-platforms/products/search/new-controls-website-owners/) | Aug 2026 | Platform figure, self-reported | Google | Self-reported | B |
| Google sends about 90% of search-engine referrals (Statcounter). Estimates of ChatGPT's share of all search-like queries range from about 7% to 18% depending on method | [Statcounter](https://gs.statcounter.com/search-engine-market-share); [Ahrefs](https://ahrefs.com/blog/chatgpt-has-12-percent-of-googles-search-volume/); [First Page Sage](https://firstpagesage.com/reports/google-vs-chatgpt-market-share/) | 2026 | Referral share (Statcounter); modelled estimates (First Page Sage model undisclosed) | Search overall | Mixed | B (Google 90%); C (ChatGPT range) |
| AI-referred visitors convert anywhere from slightly better to several times better than organic (Seer multi-client 13.8% vs 9.3%). Test it in the client's analytics | [Seer](https://www.seerinteractive.com/insights/case-study-6-learnings-about-how-traffic-from-chatgpt-converts) | 2025 | Agency client data | ChatGPT referrals | Yes | B |
| Semrush's "4.4x" is a modelled value projection, not measured conversions | [Semrush](https://www.semrush.com/blog/ai-search-seo-traffic-study/) | Jun 2025 | Model | AI search visitors | Yes | C |
| One Seer B2B client saw ChatGPT referrals convert at 15.9% vs 1.76% organic, where ChatGPT was 0.07% of sessions | [Seer](https://www.seerinteractive.com/insights/case-study-6-learnings-about-how-traffic-from-chatgpt-converts) | Oct 2024–Apr 2025 | Single client | ChatGPT | Yes | C |
| 51% of B2B software buyers say they start research in an AI chatbot more often than Google (29% in 2025) | [G2](https://company.g2.com/news/g2-research-the-answer-economy) | Apr 2026 | Survey of 1,076 buyers, self-reported | B2B software | Yes (review platform) | C |

### Ranking vs citation, and answer variability

| Figure (defensible wording) | Source | Date | Sample and method | Engine / scope | Vendor? | Grade |
|---|---|---|---|---|---|---|
| Only 17–38% of AI Overview citations come from the organic top 10 (BrightEdge and Ahrefs, early 2026), so ranking helps retrieval but doesn't decide citation. Down from 76% in July 2025 (Ahrefs) | [Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10/); [SEJ on BrightEdge](https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/) | Feb–Mar 2026 | 863K SERPs (Ahrefs); different method (BrightEdge) | AI Overviews only | Yes | B |
| About 12% of URLs cited by ChatGPT, Gemini and Copilot rank in Google's top 10; Perplexity about 29% | [Ahrefs](https://ahrefs.com/blog/ai-search-overlap/) | Aug 2025 | ~15,000 prompts | ChatGPT, Gemini, Copilot, Perplexity | Yes | B |
| The same brand list came back under 1 time in 100 runs, and in the same order about 1 in 1,000; how often a brand was mentioned was far steadier than its position, which the authors judge close to random. The author recommends 60–100 runs per prompt for tracking | [SparkToro](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/); [May 2026 webinar recap](https://sparktoro.com/blog/office-hours-can-you-actually-track-ai-visibility/) | 28 Jan 2026 (data Nov–Dec 2025); 7 May 2026 webinar recap | ~600 volunteers, 12 prompts, 2,961 runs; not peer reviewed | ChatGPT, Claude, Google AI | Yes (co-run with Gumshoe, a tracker) | B |
| Prompt intent predicts consistency: comparison prompts named the same lead brand 91% of the time, education prompts 30% | [Conductor](https://www.conductor.com/academy/ai-recommendation-consistency-analysis/) | 2026 | 14,000 API calls | Several assistants | Yes | B |
| Daily source overlap of only 0.34–0.42 (Jaccard); 7–8 repetitions per prompt proposed as a floor (Schulte et al.); in one ChatGPT setup 57.8% of runs never searched the web | [Martinez survey, arXiv 2607.14035](https://arxiv.org/html/2607.14035v1) | Jul 2026 | Single-author academic survey of 45 studies, preprint | ChatGPT and others | No | B |

### Off-site presence, domain strength and sources

| Figure (defensible wording) | Source | Date | Sample and method | Engine / scope | Vendor? | Grade |
|---|---|---|---|---|---|---|
| Domain alone explains R² 0.32 of citations; all 60 features 0.45, so page features add at most 0.13; word count alone 0.004. Within-domain variance is about 14% of the total, and the authors say absolute gains from on-page work are bounded by it. Out-of-sample prediction was weak (r² 0.018). FAQ blocks, schema and Core Web Vitals reverse or fall to zero once domain is controlled | [Moore and Dunne, arXiv 2609.35077](https://arxiv.org/pdf/2609.35077) | Sep 2026 | ~2.1M citations joined to 10,042 pages, 19 B2B SaaS workspaces, domain fixed effects, nine-method consensus; correlation | ChatGPT, Claude, AI Overviews, Gemini; B2B SaaS only; no Perplexity | Yes (authors at an AEO benchmarking vendor) | B |
| Pages whose wording overlaps more with tracked buyer prompts were cited more (about 30% more per standard deviation; observational, a word-overlap measure, 19 B2B SaaS workspaces, vendor authors; the authors say this is not an intervention effect, and out-of-sample prediction was weak, r² 0.018) | [Moore and Dunne, arXiv 2609.35077](https://arxiv.org/pdf/2609.35077) | Sep 2026 | As above (β +0.37, lexical Jaccard overlap with the vendor's prompt corpus) | As above | Yes | B |
| Branded web mentions had the strongest correlation with AI Overview visibility (0.664), against branded anchors 0.527, Domain Rating 0.326 and backlinks 0.218. Ahrefs notes correlation is not causation | [Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/) | 26 May 2025 | 75,000 brands, DR 40+, brands with at least one AI Overview mention, Spearman correlation | Google AI Overviews | Yes | B |
| Brand mentions in YouTube video titles were the strongest correlate (about 0.737) across three AI surfaces. A separate study from the one above; don't merge them | [Ahrefs](https://ahrefs.com/blog/ai-brand-visibility-correlations/) | 12 Dec 2025 | 75,000 brands, DR 40+, mentions counted in video titles only, correlation | ChatGPT, AI Mode, AI Overviews | Yes | B |
| Page count had only a weak correlation with AI visibility (about 0.17–0.19), far below mentions | [Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/); [Ahrefs](https://ahrefs.com/blog/ai-brand-visibility-correlations/) | May and Dec 2025 | Correlation | AI Overviews and assistants | Yes | B |
| 84% of AI citations come from earned and third-party sources broadly defined (journalism, academic, government, encyclopedic, social, third-party corporate); journalism alone is about a quarter (~27% in May, ~22% in October) | [Muck Rack](https://media.muckrack.com/documents/What_Is_AI_Reading__May_2026.pdf); [Unite.ai](https://www.unite.ai/?p=496470) | May 2026; Oct 2026 (secondary) | 25M+ links, 17 industries | ChatGPT, Claude, Gemini | Yes (PR software) | B |
| AI search shows a "systematic and overwhelming bias towards Earned media" over brand-owned pages | [University of Toronto, arXiv 2509.08919](https://arxiv.org/html/2509.08919v1) | Sep 2025 | Academic preprint | Several AI search engines | No | B |
| In 100 consumer-electronics shopping queries, 52–68% of AI citations went to brand sites (University of Toronto, Jan 2026, preprint). Untested in other categories | [University of Toronto, arXiv 2601.16858](https://arxiv.org/html/2601.16858v2) | Jan 2026 | Academic preprint (same lab as the row above), 100 transactional queries | Several AI search engines, consumer electronics | No | B |
| In B2B SaaS, about 1,000 domains are needed to cover 80% of third-party citations; the top 10 domains carry under 20% | [arXiv 2609.35077](https://arxiv.org/pdf/2609.35077) | Sep 2026 | As above | B2B SaaS | Yes | B |
| Reddit's share of US ChatGPT answers fell from 19.1% to 2.3%, March to September 2026 (Ahrefs via Search Engine Journal). Wikipedia 14.1% to 2.9% | [SEJ on Ahrefs](https://www.searchenginejournal.com/chatgpt-most-cited-sites-primary-sources-ahrefs/592682/) | Mar–Sep 2026 | Citation tracking | ChatGPT, US | Yes | B |
| ChatGPT has shifted toward citing primary sources over summaries | [SEJ on Ahrefs](https://www.searchenginejournal.com/chatgpt-most-cited-sites-primary-sources-ahrefs/592682/) | Mar–Sep 2026 | Citation tracking | ChatGPT, US | Yes | B |
| Domains on multiple review platforms averaged roughly 2.5–3.5x more ChatGPT citations; heavy Quora and Reddit presence sat with about 4x the citations of minimal presence | [SE Ranking](https://seranking.com/blog/chatgpt-citation-factors/) | 24 Nov 2025 | 129K domains, XGBoost + SHAP, correlation | ChatGPT | Yes | B |
| ChatGPT recommended about 1.2% of locations vs 35.9% in Google's 3-pack; Gemini 11%, Perplexity 7.4% | [Search Engine Land on SOCi](https://searchengineland.com/ai-local-visibility-report-2026-468085) | 2026 | ~350,000 locations, 2,751 brands | Local, several engines | Yes | B |
| Google Business Profile was 28.5% of all citations for local queries across AI Overviews, AI Mode and ChatGPT; Yelp appeared as a source in 80% of ChatGPT's answers | [BrightLocal](https://www.brightlocal.com/resources/ai-directory-sources/) | 26 Aug 2026 | Vendor citation analysis, published method: 1,355 locations in the US, UK and Australia, 60,970 checks | Local; AI Overviews, AI Mode, ChatGPT | Yes (local-SEO vendor) | B |
| Local experts rate on-page signals (24%) above Google Business Profile (12%) for AI visibility | [Whitespark](https://whitespark.ca/local-search-ranking-factors/); [Reputation.com summary](https://reputation.com/resources/articles/whitespark-2026-three-insights-every-brand-should-know) | 2026 | Opinion survey of 47 practitioners; weights seen only in secondary summary | Local | Yes | C |
| TripAdvisor is among the most-cited travel sources: top for "things to do" in Google AI answers | [5WPR](https://www.5wpr.com/new/ai-travel-recommendations-what-632-542-google-answers-cite/); [Skift](https://skift.com/2025/02/20/tripadvisors-perplexity-deal-ai-for-customer-acquisition-is-now-a-thing-in-travel/) | 2025–2026 | 632,542 Google AI answers | Travel | Yes (agency) | B |
| Cloudbeds study (one study, not two): online travel agencies were 55% of citations for AI hotel queries; TripAdvisor was the top source on Perplexity (Cloudbeds suggests its Perplexity partnership as a reason) | [Hotel Technology News](https://hoteltechnologynews.com/2025/07/research-otas-dominate-as-primary-source-in-ai-powered-hotel-discovery/) (reporting Cloudbeds) | Jul 2025 | Vendor analysis, 810 prompts, 145 hotels in six destinations | Hotels; ChatGPT, Perplexity, Gemini | Yes (Cloudbeds, hotel-software vendor) | C |
| LinkedIn is the top-cited domain for professional queries (vendor classification) | [Profound](https://tryprofound.com/blog/linkedin-is-the-most-cited-domain-for-professional-queries-in-ai-search) | Nov 2025–Feb 2026 | Vendor dataset; method not reviewed | Several engines | Yes (AI tracker) | C |
| Self-promotional "best of" listicles: organic visibility (Sistrix) losses of 29–49% on six anonymized SaaS sites, Jan 2026, correlational, not confirmed by Google | [SEJ](https://www.searchenginejournal.com/is-google-finally-cracking-down-on-self-promotional-listicles/) | 5 Feb 2026 (data Jan 2026) | Practitioner analysis, six sites, correlational | Google organic | No | C |
| AI Overviews cited self-promotional listicles while recommending a competitor in 69% of 100 B2B queries | [Search Engine Land](https://searchengineland.com/google-ai-overviews-cite-self-serving-listicles-recommend-competitors-69%25-of-the-time-480573) | 2026 | Practitioner study, 100 B2B queries | Google AI Overviews | No | C |
| The March 2024 update deindexed 837 of 49,345 tracked sites, mostly heavy AI or thin content | [SEJ](https://www.searchenginejournal.com/googles-march-2024-core-update-impact-hundreds-of-websites-deindexed/510981/) | Mar 2024 | Third-party tracking | Google | No | B |

### On-page tactics, schema, llms.txt, length and freshness

| Figure (defensible wording) | Source | Date | Sample and method | Engine / scope | Vendor? | Grade |
|---|---|---|---|---|---|---|
| In a lab setup (GPT-3.5 over a fixed top-5 source set), quotation addition raised answer word share about 41%, statistics about 32%, cite sources about 28%, fluency about 29%, authoritative tone about 12–19%; keyword stuffing lowered it (about −9%); statistics + fluency paired best (200-example subset). Not a retrieval, citation-rate or traffic gain | [Aggarwal et al., Princeton and IIT Delhi, KDD 2024, arXiv 2311.09735](https://arxiv.org/html/2311.09735v3) | 2024 | GEO-bench (10K queries), results on the 1K test split; lab | One already-retrieved page | No | A (lab only) |
| Cite Sources lifted fifth-ranked sources 115% and cut first-ranked sources 30%, inside the same fixed five-document context. Don't use it to argue GEO is an equalizer | [arXiv 2311.09735](https://arxiv.org/html/2311.09735v3) | 2024 | Lab | As above | No | A (lab only) |
| Replications mostly fail: C-SEO Bench 3 of 54 combinations positive; E-GEO 10 of 15 heuristics neutral or negative; SAGEO Arena found body-only rewrites cut retrieval ~9% and citation ~6%. No technique shows a stable, longitudinal, cross-platform effect. In factorial trials, relevance and position are the primary determinants | [Martinez survey, arXiv 2607.14035](https://arxiv.org/abs/2607.14035) | Jul 2026 | Single-author critical survey of 45 GEO studies, preprint | Lab and live engines | No | B |
| Adding JSON-LD sat with a 4.6% fall in AI Overview citations vs matched controls; ChatGPT and AI Mode changes within noise. Treated pages all had 100+ AI Overview citations; 30-day window | [Ahrefs](https://ahrefs.com/blog/schema-ai-citations/) | 11 May 2026 | 1,885 pages vs ~4,000 matched controls, quasi-experiment | AI Overviews, ChatGPT, AI Mode | Yes | B |
| FAQPage markup is harmless where it matches visible FAQs, with no proven AI effect: pages with FAQ schema averaged fewer ChatGPT citations (3.6 vs 4.2) | [SE Ranking](https://seranking.com/blog/chatgpt-citation-factors/) | 24 Nov 2025 | Correlation | ChatGPT | Yes | B |
| Of ~38,000 valid llms.txt files, 97% received no requests from any bot (Ahrefs, published 15 June 2026, May 2026 data); SE Ranking found no clear link to citations across ~300,000 domains | [Ahrefs](https://ahrefs.com/blog/llmstxt-study/); [SEJ on SE Ranking](https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/561542/) | 15 Jun 2026; 2025 | Server logs; correlation | All bots | Yes | B |
| Length findings conflict: SE Ranking saw 59% more ChatGPT citations on average for 2,900+ word articles than for those under 800 words; AirOps found 500–2,000 words best and 5,000+ cited less | [SE Ranking](https://seranking.com/blog/chatgpt-citation-factors/); [Search Engine Land](https://searchengineland.com/chatgpt-citations-ranking-precision-length-study-474538) | Nov 2025; 2026 | Correlation | ChatGPT | Yes | B |
| Very short sections (under 50 words) were cited least; longer did better; AI Mode showed little difference | [SE Ranking](https://seranking.com/blog/chatgpt-citation-factors/) | 24 Nov 2025 | Correlation | ChatGPT, AI Mode | Yes | B |
| Genuinely updated pages: about 1.7x the ChatGPT citations for content updated within 3 months (6.0 vs 3.6); AI Mode 5.0 vs 3.9 | [SE Ranking citation factors](https://seranking.com/blog/chatgpt-citation-factors/); [SE Ranking AI Mode](https://seranking.com/blog/how-to-optimize-for-ai-mode/) | 24 Nov 2025; Dec 2025 | Correlation | ChatGPT, AI Mode | Yes | B |
| AI-cited pages averaged 25.7% fresher than organic results, strongest for ChatGPT; AI Overviews cited slightly older pages. Moore and Dunne report the opposite engine order in B2B SaaS. No study tests changing a date without changing content | [Ahrefs](https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/); [arXiv 2609.35077](https://arxiv.org/pdf/2609.35077) | 2025; Sep 2026 | ~17M cited URLs, correlation | Several engines | Yes | B |
| Most ChatGPT-cited posts (72.4%) open with a short, self-contained answer of roughly 20–25 words. Any longer "capsule" length is house style | [Search Engine Land](https://searchengineland.com/how-to-get-cited-by-chatgpt-the-content-traits-llms-quote-most-464868) | 2025 | Publication analysis; sample not reviewed | ChatGPT | No | C |
| Pages with FCP under ~0.4 s averaged about 3x the citations; fast pages likely sit on stronger domains. Score speed against Google's thresholds instead | [SE Ranking](https://seranking.com/blog/chatgpt-citation-factors/) | 24 Nov 2025 | Correlation, no domain control | ChatGPT | Yes | C |

## Why the readiness weights are ordered this way

The v7.0 weights in `readiness-checklist.md` are **expert judgment ordered by the evidence**. They are not fitted
to outcomes, no study validates them, and the report says so under the index: an expert-weighted checklist, not
validated against outcomes. No AI-visibility composite from any vendor has been validated against business
outcomes either. The old v6 AI Visibility Score weights (25 / 25 / 25 / 15 / 10) had no evidence behind the
split; they survive only as one of the sensitivity checks the renderer runs.

Order everywhere: Off-site, Technical, Buyer questions, Structured data, Page experience.

- **Off-site presence and entity, 45.** Two Ahrefs studies (vendor, correlational) found brand mentions tracked
  AI visibility far more than backlinks or page count; a separate study (Moore and Dunne, vendor authors, B2B
  SaaS) found domain-level factors explained far more than page features. The numbers: brand mentions 0.664
  (Ahrefs, May 2025) and YouTube title mentions about 0.737 (Ahrefs, Dec 2025); domain alone R² 0.32 against page
  features at most 0.13, with within-domain variance about 14% of the total (Moore and Dunne, Sep 2026). Domain
  fixed effects capture all domain-level factors, on-site and off-site; they are not a measure of off-site
  presence. Earned sources dominate citations in academic and vendor work alike (Toronto, Sep 2025; Muck Rack,
  May 2026). All correlational, and Moore and Dunne's out-of-sample r² of 0.018 says an in-sample split doesn't
  predict the next period well, so judgment sets the number. The check that matches this evidence most closely is
  OS5 (mention volume); when it can't be measured, the index is provisional ("the main off-site measure wasn't
  available").
- **Technical discoverability, 25.** A page that isn't retrieved can't be cited, and retrieval is the bigger gate
  in live engines (SAGEO Arena, via the Martinez survey). Only 17–38% of AI Overview citations come from the
  organic top 10 (BrightEdge and Ahrefs, early 2026), so ranking helps retrieval but doesn't decide citation. The
  weight rests on retrieval being a precondition, not on rank. The hard failures sit in the access gates; this
  pillar covers the hygiene beyond them.
- **Buyer-question alignment, 20.** Pages whose wording overlaps more with tracked buyer prompts were cited more
  (about 30% more per standard deviation; observational, a word-overlap measure, 19 B2B SaaS workspaces, vendor
  authors; the authors say this is not an intervention effect, and out-of-sample prediction was weak, r² 0.018).
  In factorial trials relevance and position are the primary determinants (Martinez survey, Jul 2026), and
  position isn't under the site's control. In 100 consumer-electronics shopping queries, 52–68% of AI citations
  went to brand sites (University of Toronto, Jan 2026, preprint); untested in other categories. Page features
  add little once domain is controlled, so this pillar sits below off-site.
- **Structured data, 5.** The Ahrefs matched-control test (May 2026) found no AI-citation gain, domain-controlled
  work finds it near zero, and Google says no special markup is needed. It still powers the rich results that
  remain, and Microsoft's Fabrice Canel has said it helps Copilot understand content (SMX Munich, Mar 2025,
  relayed second-hand, C), so it stays as hygiene.
- **Page experience, 5, measured only.** Null after domain control (Moore and Dunne); Google says Core Web
  Vitals "aligns with what our core ranking systems seek to reward", not that it is a dominant factor. Scored only from PageSpeed Insights or CrUX, never estimated.
  It is the only pillar that drops out when unmeasured.
- **Sensitivity is part of the contract.** Because the weights are judgment, every report recomputes the index
  under equal weights, an "on-site heavy" split (30 / 30 / 25 / 10 / 5), the v6 weights (25 / 25 / 25 / 15 / 10)
  and leave-one-pillar-out. The band is printed as a span when the point, either end of the unverified range, or
  any sensitivity value crosses a band.
- **Bands are conventional cut points, not calibrated.** Critical 0–49, Needs Work 50–69, On Track 70–84, Strong
  85–100 are round numbers chosen for readability. No study links a band to an outcome.

## Myths to avoid repeating

Each of these was wrong, or worded beyond the evidence, as of November 2026:

- **"SEO is dead" / "AI SEO is a separate discipline."** Google's May 2026 guide says optimizing for generative AI
  search "is optimizing for the search experience, and thus still SEO". Same foundations, different scoreboard.
  We separate SEO, AEO and GEO only to show where the work sits.
- **"AI search replaced traditional search."** Google sends about 90% of search-engine referrals (Statcounter); AI
  referrals are about 0.3% to 1% of traffic. Balance, don't abandon.
- **"Ranking #1 guarantees citations."** Only 17–38% of AI Overview citations come from the organic top 10
  (BrightEdge and Ahrefs, early 2026), so ranking helps retrieval but doesn't decide citation. For ChatGPT,
  Gemini and Copilot about 12% of cited URLs rank in Google's top 10.
- **"ChatGPT runs on Bing, so no Bing, no ChatGPT."** ChatGPT search uses OpenAI's own index (OAI-SearchBot).
  OpenAI doesn't publish its third-party providers: it has a historic Bing partnership, and a single press report
  (Aug 2025) says it also pulled Google results. Bing matters for Copilot; for ChatGPT, test rather than assume.
- **"Claude runs on Brave."** Brave is one provider (Anthropic subprocessor list), alongside Anthropic's own
  Claude-SearchBot crawler. Brave coverage is a testable proxy, not the whole story.
- **"Branded mentions matter 3x more than backlinks."** Correlation coefficients don't multiply like that, and
  against Domain Rating the gap is closer to 2x. Say "mentions correlated more strongly with AI Overview
  visibility (0.664) than backlinks (0.218)", with the study, date and DR 40+ scope.
- **"GEO tactics lift citations by 40%."** That is a lab word-share gain for a page already in a fixed five-page
  context. Replications mostly failed.
- **"llms.txt boosts rankings or guarantees AI visibility."** Google's guide says "Google Search ignores them" and
  that llms.txt "will neither harm nor help your site's visibility or rankings in Google Search". Of ~38,000 valid files, 97% got
  no bot requests (Ahrefs, published 15 June 2026, May 2026 data). At most it serves agentic browsing.
- **"Schema guarantees rankings or citations."** A matched-control test found no AI-citation gain. Markup must
  match visible content; it can't rescue thin pages.
- **"FAQ schema is dead" / "FAQ schema helps AI."** FAQ rich results were deprecated (announced 8 May 2026,
  effective 7 May). FAQPage that matches visible FAQs is harmless, with no proven AI effect. Don't sell it as a
  tactic either way. HowTo rich results went in 2023.
- **"Answers must be 40–60 words."** No study sets that length. Most ChatGPT-cited posts open with a short answer
  of roughly 20–25 words (grade C); any target length is house style.
- **"Optimize for voice search (Siri, Alexa)."** No public measurement of spoken search share exists, and voice
  now runs through the same assistants. Don't audit it as a separate surface.
- **"Chunk content into small pieces for AI."** Google says there is no requirement to break content into tiny
  pieces. Answer-first structure helps readers and extraction; artificial chunking doesn't.
- **"More content always helps" / "Publish more pages."** Word count alone explains almost nothing (R² 0.004) and
  page count correlates only weakly (~0.17–0.19). A page per query variation risks doorway and scaled-content
  policy. Consolidate.
- **"Update the date to look fresh."** No study tests date changes without content changes, and Google treats
  manipulation as spam. Change the date only when facts, data or advice change, and show what changed.
- **"Publish a 'best of' list with us at number one."** Practitioner reports link these to organic visibility
  losses: Sistrix visibility losses of 29–49% on six anonymized SaaS sites, Jan 2026, correlational, not confirmed
  by Google. No Google policy names them, so they are never called a spam-policy hit. Comparisons must be
  disclosed and criteria-based.
- **"Backlinks no longer matter" / "Backlinks are the main AI lever."** Both overstate it. Backlinks remain a
  ranking signal; mentions and domain strength sit with more of AI visibility.
- **"AI-generated content is penalized for being AI-generated."** Google judges quality and helpfulness, not
  authorship. Scaled, low-value content is the risk.
- **"robots.txt prevents indexing."** It blocks crawling; `noindex` prevents indexing.
- **"Blocking GPTBot hurts Google rankings or removes you from AI answers."** Training bots don't affect answers.
  Blocking OAI-SearchBot, Claude-SearchBot, PerplexityBot or Googlebot does, and so can a CDN setting: on
  Cloudflare, the Training setting Block also stops Googlebot and Bingbot from 15 Sep 2026 (use Disallow AI
  Training instead).
- **"AI traffic converts at 4x to 20x organic."** Reports range from slightly better to several times better, and
  the 4.4x figure is a model. Treat conversion as a hypothesis to test in the client's analytics, and report AI
  traffic as a floor.
- **"You can hack your way into AI answers via Reddit or Wikipedia edits."** Communities revert edits and ban
  accounts, and Google says seeking inauthentic mentions "isn't as helpful as it might seem". Platform shares also
  swing: Reddit's share of US ChatGPT answers fell from 19.1% to 2.3%, March to September 2026.
- **"We rank #2 in ChatGPT."** Position inside an answer is close to random; the same brand list repeats under 1%
  of the time. Report how often the brand is mentioned across repeated runs, per engine, with a margin of error.
- **"Local SEO is just Google Business Profile."** It spans landing pages, schema, NAP consistency, Bing Places
  and Apple, and AI local recommendation is far more selective than the 3-pack (ChatGPT about 1.2% of locations).

## Removed figures

Do not reintroduce these. Each failed verification against a primary source.

- **"Travel and local show the lowest ranking-citation overlap."** Not in any overlap study.
- **"Quora above ~1.1K mentions ≈ 3x ChatGPT citations."** No 1.1K threshold exists; use the SE Ranking ~4x row.
- **"Reddit dominates Perplexity and AI shopping discussion."** Not traced; let the client's source map decide.
- **"Gemini draws far more from Medium-style editorial than Reddit."** Not traced to any source.
- **"~30% of US travellers used ChatGPT extensively for trip planning."** No source; YouGov measured comfort only.
- **"Only ~11% of sites are cited by both ChatGPT and Perplexity."** No primary source.
- **"~87% of Claude's citations match Brave's top results."** 13 of 15 results across three queries; an
  exact-URL test found 46.6%.
- **"Easy simplification is negative."** Wrong: the GEO paper found a small positive effect (+6% to +14%).
- **"Content padding and salesy language are negative" (as GEO findings).** Never tested in the paper.
- **Speed citation thresholds** ("LCP above ~1.85 s drops sharply", "INP 0.4–0.5 s beats 1.0 s+", "500 ms is a
  drag"). No break in the LCP data (4.9 vs 4.4), INP points the other way (1.6 vs 4.5), 500 ms has no source.
- **"Local pages on a ~30-day refresh cycle see a large lift."** Not in the cited study.
- **"Two-thirds of ChatGPT's most-cited pages contain original research."** Misread of an Ahrefs headline.
- **"ChatGPT has hardened its citation behaviour against manipulation."** No source; Reddit's drop is a source shift.
- **"Aggregators (Angi, Houzz) win contractor AI answers."** Not traced; confirm per client from the source map.
- **"Fewer than half of local leaders carry over into AI answers"; "most buyers buy from their day-one list";
  "OpenAI partners with TripAdvisor."** Unverified add-ons to otherwise valid figures.
- **"Zero-click searches climbed toward 69%"** as a general figure. It is news searches only.
- **"Controlled tests (OtterlyAI, Dec 2025–Mar 2026) found schema gains."** Not verified; the Ahrefs
  matched-control result replaces it.
- **"ChatGPT draws on third-party providers, Bing among them" (graded A).** OpenAI's documentation names no
  provider, and the cited report is about Google results. Use the canonical ChatGPT row.
- **"Peec saw no AI-citation demotion" for listicles.** Not in the linked article.
- **"SOCi's 2027 preview uses a different method."** No source located.
- **"Cloudflare blocks AI crawlers by default for new domains"** (MIT Technology Review, Jul 2025). Superseded by
  Cloudflare's own posts (Jul and Sep 2026); use those rows.
- **"Fake or incentivized reviews" as a Google spam policy.** Google has no such spam policy; it is a
  review-snippet structured-data guideline (24 Jul 2026), scored under SD3.
- **"Rater guidelines (January 2025 edition) give the lowest rating…"** Stale edition and wording; use the
  section 4.6.6 row.
- **"UCP needs an active Merchant Center account."** Google's post doesn't say so.
- **"Google Search doesn't need llms.txt files and they don't affect rankings"** as a quote. Not Google's
  wording; use the guide's words.
- **"Ahrefs notes brand strength may drive both sides."** Not on the Ahrefs page; it says only that correlation
  is not causation.
- **The v6 AI Visibility Score weights (25 / 25 / 25 / 15 / 10) as "following the evidence hierarchy".** No study
  supports that split. Kept only as a sensitivity check.
- **The v7.0 draft weights (30 / 30 / 25 / 10 / 5)** with buyer questions tied to off-site "because the client
  controls it". A business reason, not an evidence reason. Kept only as the "on-site heavy" sensitivity check.
