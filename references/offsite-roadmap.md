# Off-site authority and entity roadmap (Step 3C, Phase 3: prescribe off-site)

Read this after Modules 5 and 6. Quick Audits only need the play titles (to pick 3–5 quick wins) and the sequencing rule at the end; Full Audits use every play that fits.

This is where AI visibility is primarily won, so it gets the same prescriptive rigour as the content plan.
Derive it from what Modules 5 and 6 actually found: the citation-source pattern from the spot-check tells you
*which platforms this category's AI answers are drawn from*, and the gap between that pattern and the client's
current footprint is the roadmap. Never hand over generic plays; name the specific platforms, publications,
and communities for this client, and give numbered steps for each play so a non-specialist can execute.

For a **Quick Audit**, produce only the top 3–5 off-site quick wins as one-liners. For a **Full Audit**, select
and fully specify the plays that apply (typically 4–6 of the seven; skip plays that genuinely don't fit, e.g.
the local stack for a non-local SaaS).

## Play 1: Retrieval access and Bing indexation (the gate; always first)

No off-site program matters if the engines cannot see the brand. Steps:
1. Verify Bing indexation (`site:{domain}` on Bing). If absent: register Bing Webmaster Tools, import the
   verified GSC property (one-click), submit the sitemap, enable IndexNow. ChatGPT search runs on the Bing
   index, so this single fix opens an entire engine.
2. Verify Brave indexation (`site:{domain}` on search.brave.com). Claude's web search runs on Brave's
   independent index. There is no submission tool; ensure Brave's crawler isn't blocked, keep clean crawlable
   HTML, and expect slower pickup than Google. A site can rank on Google and be absent from Brave.
3. Confirm robots.txt allows OAI-SearchBot, ChatGPT-User, Claude-SearchBot, and PerplexityBot on all public
   marketing pages (Module 4 findings). Fix any legacy "allow only Googlebot" rule.
4. If content is JS-rendered, schedule the SSR/prerender fix before investing in anything downstream.
Effort: hours. Timeline: immediate. Expected outcome: eligibility everywhere; this is a threshold, not a lift.

## Play 2: Entity establishment ladder (climb in order; stop where notability stops)

AI engines recommend entities they can resolve and trust. Climb this ladder bottom-up; each rung strengthens
the next:
1. **Consistent identity**: one canonical brand name, description, and NAP everywhere; Organization schema with
   `sameAs` links to every real profile (LinkedIn, socials, Crunchbase, directories).
2. **Profile completeness**: fully built LinkedIn company page and founder/leader profiles (LinkedIn is the
   top-cited domain for professional queries); Crunchbase or equivalent; the category's core directories.
3. **Wikidata entry**: create or claim, with accurate statements and references to independent sources.
   Low-effort, legitimate, and feeds every engine's entity graph.
4. **Google Knowledge Panel**: once one appears (often triggered by rungs 1–3 plus press), claim it via Google's
   verification and keep it accurate.
5. **Wikipedia, only if genuinely notable.** Requires significant independent secondary-source coverage.
   Never recommend self-authored or paid pages; conflict-of-interest edits get reverted and accounts banned.
   The honest recommendation for most SMBs: earn the press first (Play 4); Wikipedia follows notability, never
   precedes it.
Effort: low (rungs 1–3) to earned-only (rungs 4–5). Timeline: rungs 1–3 in the first 30 days.

## Play 3: Review-platform buildout (category-matched)

Presence on review platforms roughly triples ChatGPT citation odds. Use the Module 5 category table plus the
Module 6 source pattern to pick the 2–3 priority platforms (TripAdvisor for tourism; G2/Capterra/Clutch for
B2B; Angi/Houzz/HomeStars for builders and trades; Yelp/Google for local). Steps:
1. Claim and complete every field on each priority platform: categories, photos, service details, links.
2. Build a review-generation system, not a one-off ask: identify the moment of peak satisfaction in the
   client's delivery (trip end, project handover, renewal), send a direct review link at that moment, and make
   it a standing operational step. Velocity and recency beat volume.
3. Respond to every review, positive and negative; response behaviour is a visible trust signal.
4. Never fake, incentivize against platform rules, or gate reviews (screening out negatives violates most
   platforms' terms and, in several jurisdictions, consumer law).
Effort: low to start, ongoing habit. Timeline: claim/complete in 30 days; velocity is permanent. Expected
outcome: presence in the exact sources AI cites for "best [category]" queries.

## Play 4: Digital PR and brand-mention engine (the highest-leverage investment)

Branded mentions correlate with AI visibility ~3x more strongly than backlinks, and ~84% of AI citations come
from earned editorial media. This play is the core recurring investment. Steps:
1. **Build the flagship citable asset**: one original-data piece per quarter: a survey, benchmark, price/cost
   index, or proprietary operational dataset the client uniquely holds, published as a definitive, well-
   structured stat page (the 3B.5 build spec in `content-strategy.md`). Original data is what journalists and LLMs both cite.
2. **Pitch it**: build a 20–40 target list of the journalists, trade publications, and newsletters that cover
   this category (name candidates in the report); pitch the data with a ready-made chart and 2–3 pull-quote
   stats.
3. **Reactive expert commentary**: register the client's spokesperson on journalist-request platforms
   (Qwoted, Featured, and category equivalents); answer 2–3 relevant requests weekly. This compounds into
   exactly the earned editorial mentions the engines weight.
4. **Unlinked-mention reclamation**: search for existing brand mentions without links or with wrong details;
   request the link/correction. Cheap wins from work already earned.
5. **Podcast and guest circuit**: 1–2 appearances per quarter on category podcasts and publications; these
   produce YouTube transcripts, show notes, and editorial mentions in one move.
Effort: the largest recurring line item (several hours/week or an outsourced retainer). Timeline: compounds
over 2–6 months; expect roughly 0–3 quality mentions/links per month for a small client, scaling with effort.
Set this expectation explicitly in the report so the client doesn't abandon the play at week six.

## Play 5: YouTube presence

YouTube mentions are the single strongest measured correlate of AI visibility (~0.74), and mention frequency
matters more than view counts, so this play is accessible even without a video budget. Steps:
1. **Earned first**: get the brand mentioned in others' videos through reviewer outreach for products/experiences,
   podcast appearances (Play 4.5) published to YouTube, local/industry channels for services.
2. **Owned minimal channel**: a handful of genuinely useful videos matching the site's answer-first pages
   (the top FAQ answers, a facility/experience tour, a how-to per core service). Descriptive titles and
   accurate transcripts; engines read the text.
3. Embed the videos on the matching pages to reinforce the entity link.
Effort: medium. Timeline: first videos within 60 days. Expected outcome: presence in the highest-correlation
mention channel plus Gemini's native surface.

## Play 6: Community presence with hard guardrails

Reddit dominates Perplexity citations and AI shopping discussion; Quora presence correlates with ChatGPT
citation. But this is the easiest play to do wrong. Steps:
1. Identify the 3–5 subreddits/forums/communities where the client's buyers actually ask questions (the Module
   6 source pattern usually reveals them).
2. Participate as a named, disclosed expert: answer questions genuinely, mention the brand only where it's the
   honest answer. Value first, weeks before any mention.
3. Monitor brand mentions in these communities and respond helpfully to questions about the brand.
4. **Never astroturf.** No fake accounts, no seeded threads, no undisclosed promotion, no vote manipulation.
   Communities and engines detect it, accounts get banned, and ChatGPT has hardened citation behaviour
   specifically against manipulation. One detected astroturf incident costs more trust than the play could
   ever earn.
Effort: low but steady (an hour or two weekly). Timeline: ongoing from day 30.

## Play 7: Local stack (local and service-area clients only)

AI local recommendation is far more selective than the map pack (ChatGPT recommends ~1.2% of locations vs ~36%
appearing in Google's 3-pack), and the factor weightings flip toward on-page content and citations, so the
local play is broader than GBP. Steps:
1. **Google Business Profile**: complete every field, narrowest accurate primary category, weekly posts,
   fresh photos, review velocity with responses (feeds Ask Maps/Gemini directly).
2. **Bing Places**: claim and sync with GBP, since ChatGPT sources local data from Bing. A concrete, underused win.
3. **Apple Maps (Apple Business Connect)** and Yelp and Foursquare: claim, complete, exact-match NAP.
4. **NAP consistency sweep**: one canonical Name/Address/Phone across the site footer, schema, and every
   directory; fix mismatches (data accuracy is a gatekeeper: third-party-fed engines show materially worse
   profile accuracy than Google-grounded ones, and wrong data means wrong or no recommendations).
5. **Local landing pages**: genuine, unique city/service pages (never templated doorways) with LocalBusiness
   schema and geo coordinates, refreshed on a roughly monthly cycle.
Effort: low-medium. Timeline: claims and sweep in the first 30 days; posting/review velocity permanent.

## Sequencing rule for the off-site phase

Gate first (Play 1), identity second (Play 2 rungs 1–3, plus Play 7 claims for local), then the compounding
engines (Plays 3–6) in the order the Module 6 source pattern justifies. A Quick Audit has no spot-check, so
order those plays by the category table in Module 5 instead, and say so. Present each selected play in the
report with its numbered steps, this client's named targets, effort, timeline, and the evidence line for why
it's on the list.
