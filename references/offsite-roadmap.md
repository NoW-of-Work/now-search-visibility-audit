# Off-site authority and entity roadmap (Step 3C, Phase 3: prescribe off-site)

Read this after Modules 5 and 6. Quick Audits only need the play titles (to pick 3–5 quick wins) and the sequencing rule at the end; Full Audits use every play that fits.

Off-site presence is where the strongest measured associations with AI visibility sit. Two Ahrefs studies
(vendor, correlational) found brand mentions tracked AI visibility far more than backlinks or page count; a
separate study (Moore and Dunne, vendor authors, B2B SaaS) found domain-level factors explained far more than page
features (domain alone R² 0.32 vs page features adding at most 0.13,
[arXiv 2609.35077](https://arxiv.org/pdf/2609.35077), Sep 2026). Domain-level factors include on-site quality as
well as off-site presence, so the second study supports the off-site program only indirectly. These are
correlations, mostly published by vendors, so present them that way: the work is associated with being found, not
guaranteed to cause it.

The plan is targeted from the client's Module 6 source map (OS7): the domains actually cited in answers to this
client's buyer prompts, compared with where the client appears today. That gap is the roadmap. Never hand over
generic plays; name the specific platforms, publications and communities, give numbered steps a non-specialist
can follow, and name the check IDs each play closes (from `readiness-checklist.md`). Every figure that reaches
the client report carries its source link, month and year, method and a vendor flag.

For a **Quick Audit**, produce only the top 3–5 off-site quick wins as one-liners. For a **Full Audit**, select
and fully specify the plays that apply (typically 4–6 of the seven; skip plays that don't fit, e.g. the local
stack for a non-local SaaS).

## Play 1: Retrieval access and index coverage (the gate; always first)

No off-site program matters if the engines can't see the site. Steps:
1. **Bing.** Bing feeds Copilot directly, so Bing indexation is a cheap, high-value fix. ChatGPT search uses
   OpenAI's own index (OAI-SearchBot; OpenAI documentation, A). OpenAI doesn't publish its third-party providers:
   it has a historic Bing partnership, and a single press report (Aug 2025) says it also pulled Google results (C)
   ([OpenAI](https://developers.openai.com/api/docs/bots);
   [Search Engine Land](https://searchengineland.com/openai-chatgpt-serpapi-google-search-results-461226)). Bing
   matters for Copilot; for ChatGPT, test rather than assume (Module 6). A `site:` search on Bing or DuckDuckGo is
   a proxy only (TD5, grade C); confirm coverage in Bing Webmaster Tools (G4).
   If absent or unconfirmed: verify the site in Bing Webmaster Tools (it can import the Search Console
   property), submit the XML sitemap there, and set up IndexNow (TD8).
2. **Bing AI Performance.** While in Webmaster Tools, open the AI Performance report (public preview Feb 2026):
   first-party citation counts covering "Copilot, Bing, and select partner AI experiences", no clicks
   ([Bing](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)).
   Record it as the baseline for 3B.8.
3. **Brave.** Claude's web search uses Brave as one provider (Anthropic subprocessor list), alongside
   Anthropic's own Claude-SearchBot crawler
   ([TechCrunch](https://techcrunch.com/2025/03/21/anthropic-appears-to-be-using-brave-to-power-web-searches-for-its-claude-chatbot/),
   Mar 2025). turbopuffer is also on Anthropic's subprocessor list under "Web Search" (added 6 May 2026, grade
   A); its role isn't published, and one analysis suggests it serves search
   ([Xponent21](https://xponent21.com/insights/claude-web-search-brave-turbopuffer/), Jul 2026, grade C). So Brave
   coverage is a testable proxy, not the whole story. Check `site:{domain}` on
   search.brave.com (TD5). Brave has no submission tool: never tell a client to submit a sitemap to Brave. Keep
   pages crawlable in raw HTML, linked internally and listed in a sitemap referenced from robots.txt, and expect
   slower pickup than Google.
4. **Bots and the edge.** robots.txt allows Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot and PerplexityBot
   on all public marketing pages (G1, G2); training bots are allowed or blocked on purpose (TD10). If the client
   blocks an AI search bot deliberately, record G2 as a documented choice with its visibility cost rather than a
   fail. If the site is behind Cloudflare or another CDN, edge settings can't be seen from outside. On Cloudflare,
   block AI training with **Disallow AI Training**, never **Block**: since 15 Sep 2026, Block also stops mixed-use
   crawlers, including Googlebot and Bingbot, from crawling for search (Cloudflare, Sep 2026, A). From 15 Sep 2026,
   new Cloudflare domains that show ads default to Search Allow, Training Disallow AI Training and Agent Block on
   pages with ads; existing zones that had the old "Block AI" setting moved to the same. Agent blocking can stop
   user-triggered fetchers such as ChatGPT-User on ad pages (Cloudflare, Jul and Sep 2026, A)
   ([Cloudflare](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/);
   [Cloudflare](https://blog.cloudflare.com/content-independence-day-ai-options/)). Mark G1 and G2 **verify** and
   have the client open Cloudflare Security > AI Crawl Control (or the equivalent on their CDN) and confirm the
   Training category is set to Disallow AI Training, not Block. Training set to Block is a G1 fail and a true
   threshold: fix it before anything else.
5. **Rendering.** If primary content or links need JavaScript, schedule the server-rendering or prerender fix
   before anything downstream (G3).
6. **Google AI features.** In Search Console, confirm the generative AI setting (worldwide since 31 Aug 2026) is
   not set to opt out (G5; a deliberate opt-out is a documented choice, with its cost stated), and open the Generative AI performance report (impressions
   only, no clicks or queries) as a baseline.
Effort: hours. Timeline: immediate. Expected outcome: eligibility; this is a threshold, not a lift.

## Play 2: Entity establishment ladder (climb in order; stop where notability stops)

AI engines can only recommend entities they can resolve. Climb bottom-up; each rung strengthens the next:
1. **Consistent identity**: one canonical brand name, description and NAP everywhere (OS1); valid Organization
   markup that matches the visible facts (SD1), with `sameAs` links to every real profile (OS2).
2. **Profile completeness**: a fully built LinkedIn company page and founder or leader profiles (LinkedIn was the
   most-cited domain for professional queries in [Profound](https://tryprofound.com/blog/linkedin-is-the-most-cited-domain-for-professional-queries-in-ai-search)'s
   data, Nov 2025–Feb 2026, Profound's own classification, tracking vendor); Crunchbase or equivalent; the
   category's core directories.
3. **Wikidata entry**: only with at least two independent published sources to reference; disclose the
   conflict of interest on the item's talk page. Self-created company items without independent references are
   routinely deleted. Where the sources exist, it is a public structured record of the entity (OS3).
4. **Google knowledge panel**: once one appears, claim it through Google's verification and keep it accurate.
   Check the brand-name search shows the client's own properties first (OS8).
5. **Wikipedia, only if genuinely notable.** It requires significant independent coverage. Never recommend
   self-authored or paid pages; conflict-of-interest edits get reverted and accounts banned. For most small firms
   the honest advice is: earn the press first (Play 4); Wikipedia follows notability, never precedes it.
Effort: low (rungs 1–2), low once sources exist (rung 3), earned-only (rungs 4–5). Timeline: rungs 1–2 in the
first 30 days; rung 3 when the independent sources are in hand.

## Play 3: Review-platform buildout (category-matched)

Domains on multiple review platforms averaged roughly 2.5–3.5x more ChatGPT citations than domains absent from
them ([SE Ranking](https://seranking.com/blog/chatgpt-citation-factors/), Nov 2025, 129,000 domains,
correlational, SEO-tool vendor). That doesn't show reviews cause citations; stronger brands tend to have both.
Pick the 2–3 priority platforms from the source map first (OS4, OS7), using the Module 5 category table only to
fill gaps: TripAdvisor for tourism; G2, Capterra or Clutch for B2B; Google and Yelp for local; trade directories
only where the source map shows them cited. Steps:
1. Claim and complete every field on each priority platform: categories, photos, service details, links.
2. Build a review-request habit, not a one-off ask: find the moment of peak satisfaction in the client's
   delivery (trip end, project handover, renewal), send a direct review link then, and make it a standing step.
3. Respond to every review, positive and negative.
4. **Never fake, buy, incentivize or gate reviews.** Don't offer anything in exchange for a review, disclosed or
   not, and don't screen out unhappy customers before asking. Google's review-snippet structured-data guidelines
   now name fake and undisclosed incentivized reviews (24 July 2026, [Google](https://developers.google.com/search/updates));
   review markup that breaks them scores SD3 `notmet` (it is a markup guideline, not a spam policy).
   Google bans incentivized reviews; some B2B platforms allow disclosed incentives under their own programs, but we
   don't recommend them. Fake or gated reviews can breach consumer-protection law.
Counts and velocity are **unverifiable** from outside unless a tool or login supplies them. Effort: low to
start, ongoing habit. Timeline: claim and complete in 30 days; the request habit is permanent.

## Play 4: Digital PR and earned mentions (the core recurring investment)

In Ahrefs' study of 75,000 brands, branded web mentions correlated with Google AI Overview visibility at 0.664,
against 0.326 for Domain Rating and 0.218 for backlinks
([Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/), May 2025, Spearman, DR 40+ brands with at least
one AI Overview mention, SEO-tool vendor; Ahrefs notes correlation is not causation). [Muck Rack](https://media.muckrack.com/documents/What_Is_AI_Reading__May_2026.pdf),
a PR-software vendor, finds about 84% of AI citations come from earned and third-party sources broadly defined
(academic, government, encyclopedic, social and third-party corporate content all count as "earned");
journalism alone is about a quarter (May 2026, 25M+ links across ChatGPT, Claude and Gemini), about 22% in its
October 2026 edition. University of Toronto researchers found the same earned-media bias
([arXiv 2509.08919](https://arxiv.org/html/2509.08919v1), preprint). Their shopping study is the exception: in 100
consumer-electronics shopping queries, 52–68% of AI citations went to brand sites (University of Toronto, Jan
2026, preprint, [arXiv 2601.16858](https://arxiv.org/html/2601.16858v2)); untested in other categories. Earn mentions;
don't seed them: Google says seeking inauthentic mentions "isn't as helpful as it might seem"
([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), May 2026). Steps:
1. **Build the flagship citable asset**: one original-data piece per quarter (a survey, benchmark, cost index or
   operational dataset the client uniquely holds), published as a well-structured stat page per the 3B.5 build
   spec in `content-strategy.md` (BQ4).
2. **Pitch it**: a 20–40 target list of journalists, trade publications and newsletters covering this category,
   starting with those in the source map (name candidates in the report); pitch with a ready-made chart and 2–3
   pull-quote stats.
3. **Reactive expert commentary**: register the client's spokesperson on journalist-request platforms (Qwoted,
   Featured and category equivalents); answer 2–3 relevant requests weekly.
4. **Unlinked-mention reclamation**: find existing mentions without links or with wrong details; ask for the
   link or correction.
5. **Podcast and guest circuit**: 1–2 appearances per quarter on category podcasts and publications, which
   produce transcripts, show notes and editorial mentions in one move (OS5).
Effort: the largest recurring time commitment in the plan (several hours a week, whoever does it). Timeline:
compounds over 2–6 months. Our working expectation for a small client is 0–3 quality mentions a month, scaling with effort;
that is house experience, not a benchmark. Say so in the report so the client doesn't quit at week six.

## Play 5: YouTube presence

In Ahrefs' December 2025 follow-up (75,000 brands, ChatGPT, AI Mode and AI Overviews, DR 40+ only, correlation,
SEO-tool vendor), brand mentions in YouTube video titles were the strongest correlate of AI visibility at about
0.737 ([Ahrefs](https://ahrefs.com/blog/ai-brand-visibility-correlations/)). It's a separate study from the
web-mentions figure in Play 4, so don't rank the two as one hierarchy. The study counts other people's videos,
so earned appearances come first and this play works without a video budget. OS6 is met when the brand is named
in third-party videos on buyer topics; an own channel alone is partial. Steps:
1. **Earned first**: reviewer outreach for products and experiences, podcast appearances (Play 4.5) published
   to YouTube, local and industry channels for services.
2. **Owned minimal channel** (supports OS6, but scores only partial on its own): a handful of useful videos matching the site's answer-first pages (top buyer
   questions, a facility or experience tour, a how-to per core service). Descriptive titles and accurate
   transcripts.
3. Embed the videos on the matching pages and link the channel from the site (OS2, OS6).
Effort: medium. Timeline: first videos within 60 days.

## Play 6: Community presence with hard guardrails

Which communities AI answers cite shifts fast. Reddit's share of US ChatGPT answers fell from 19.1% to 2.3%,
March to September 2026 (Ahrefs via [Search Engine Journal](https://www.searchenginejournal.com/chatgpt-most-cited-sites-primary-sources-ahrefs/592682/),
citation tracking, vendor). Wikipedia 14.1% to 2.9%. So don't assume Reddit: let the client's Module 6 source
map choose the platforms (OS7). This is
also the easiest play to do wrong. Steps:
1. Identify the 3–5 subreddits, forums or communities where the source map and the client's buyers show real
   questions being asked.
2. Participate as a named, disclosed expert: answer genuinely, and mention the brand only where it's the honest
   answer. Value first, weeks before any mention.
3. Monitor brand mentions in these communities and respond helpfully to questions about the brand.
4. **Never astroturf.** No fake accounts, seeded threads, undisclosed promotion or vote manipulation.
   Communities ban it, Google's spam policies apply to AI responses (15 May 2026), and one detected incident
   costs more trust than the play could earn.
Effort: low but steady (an hour or two a week). Timeline: ongoing from day 30.

## Play 7: Local stack (local and service-area clients only)

AI local recommendation is far more selective than the map pack. SOCi's 2026 Local Visibility Index (~350,000
locations, 2,751 brands, local-marketing vendor) found 35.9% of locations in Google's 3-pack, against 11%
recommended by Gemini, 7.4% by Perplexity and 1.2% by ChatGPT
([Search Engine Land](https://searchengineland.com/ai-local-visibility-report-2026-468085)).
[BrightLocal](https://www.brightlocal.com/resources/ai-directory-sources/) (local-SEO vendor, 26 Aug 2026,
published method: 1,355 locations in the US, UK and Australia, 60,970 checks, grade B) found Google Business
Profile was 28.5% of all citations for local queries across AI Overviews, AI Mode and ChatGPT, and Yelp appeared
as a source in 80% of ChatGPT's answers. Local SEO experts surveyed by
[Whitespark](https://whitespark.ca/local-search-ranking-factors/) (47 practitioners, 2026, opinion, not measured
data) rate on-page signals (24%) above GBP (12%) for AI visibility, so the play is broader than GBP (OS9). Steps:
1. **Google Business Profile**: complete every field, narrowest accurate primary category, regular posts and
   photos, review requests with responses (Play 3). Completeness and categories are **unverifiable** without
   access.
2. **Bing Places**: claim and sync with GBP; it feeds Bing and Copilot.
3. **Yelp, Apple Business Connect and Foursquare**: claim, complete, exact-match NAP.
4. **NAP consistency sweep**: one canonical name, address and phone across the site footer, markup and every
   directory (OS1, scored once there); wrong data means wrong or no recommendations.
5. **Local landing pages**: genuine city or service-area pages that pass the doorway test in 3B.6, within the
   quarterly cap, with LocalBusiness markup that matches the visible facts (SD1). Update them when the facts change (hours, services, staff,
   recent projects), with a changelog line; no fixed refresh cycle and no date-only updates (BQ7).
Effort: low-medium. Timeline: claims and sweep in the first 30 days; review requests permanent.

## Sequencing rule for the off-site phase

The off-site plan is targeted from the Module 6 source map (OS7). Gate first (Play 1), identity second (Play 2
rungs 1–3, plus Play 7 claims for local), then Plays 3–6 in the order the source map justifies: platforms cited
for this client's buyer prompts where the client is absent come first, platforms the client already holds come
last. A measured-tier source map counts cited domains across repeated runs; a search-proxy spot-check (Quick
Audits, or engines that can't be queried) is weaker, so combine what it showed with the Module 5 category table
and label the order provisional. Present each selected play in the report with its numbered steps, this
client's named targets, the check IDs it closes, effort, timeline, and the evidence line (source, month and
year, method, vendor flag) for why it's on the list.
