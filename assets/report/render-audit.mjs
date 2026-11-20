// Build the visual audit report from an audit data file.
// Usage: node render-audit.mjs audit-data.json [out-dir]
// Writes <slug>.html and, when a headless browser is available, <slug>.pdf next to it.
// The data shape is documented in references/report-spec.md; example-audit.json is a full example.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { C, md, esc, band, band10, bandPill, pillarChart, pointsBar, lenses, dots, statusBar, itemBars, gantt } from './charts.mjs';
import { page, head, section, partDivider, cover, definitionsPage, checks, steps, swimlane, rhythm, callout, signalTable, table, caveats } from './components.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const [, , dataPath, outDir] = process.argv;
if (!dataPath) { console.error('Usage: node render-audit.mjs audit-data.json [out-dir]'); process.exit(1); }
const A = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const full = A.meta.depth === 'full';
const OUT = path.resolve(outDir || path.dirname(dataPath));
fs.mkdirSync(OUT, { recursive: true });

const PILLARS = [['tc', 'Technical Crawlability', 25, 'Technical'], ['cd', 'Content Density', 25, 'Content'],
  ['oa', 'Off-Page Consensus', 25, 'Off-page'], ['se', 'Schema & Entity', 15, 'Schema'], ['pm', 'Performance', 10, 'Perf.']];
const S = A.score;
const pillarRows = PILLARS.map(([k, name, weight, short]) => ({ name, weight, short, score: S.pillars[k].score, pending: S.pillars[k].pending, finding: S.pillars[k].finding }));
const total = S.total ?? Math.round(pillarRows.reduce((a, r) => a + (r.score * r.weight) / 100, 0));
const dims = [['SEO', 'seo', 'Search'], ['AEO', 'aeo', 'Answers'], ['GEO', 'geo', 'AI assistants']].map(([k, key, name]) => ({ k, name, score: S[key].score, takeaway: S[key].takeaway }));
const counts = (rows) => rows.reduce((a, r) => ((a[r.status] = (a[r.status] || 0) + 1), a), {});
let n = 0; const num = () => String(++n).padStart(2, '0');
const parts = [];

// ---------- cover + start here ----------
parts.push(cover({
  kicker: `${full ? 'Full audit + growth roadmap' : 'Quick audit'} · SEO · AEO · GEO`, domain: A.meta.domain, score: total,
  headline: A.summary.headline, lede: A.summary.lede, dims,
  footLeft: `Audited ${A.meta.date} · Prepared by ${A.meta.preparedBy || 'The NoW of Work'}`,
}));
parts.push(definitionsPage(num()));

// ---------- executive summary ----------
parts.push(section(`${head(num(), 'Executive summary', A.summary.summaryHeadline || 'Where you stand *today*.', null)}
  <div class="prose">${A.summary.paragraphs.map((p) => `<p>${md(p)}</p>`).join('')}</div>
  ${table([{ h: 'Score', k: 'm', w: '22%' }, { h: 'Result', k: 'r', w: '12%' }, { h: 'Band', k: 'b', w: '14%', pill: (v) => v.toLowerCase().replace(/\s/g, '') }, { h: 'What it means', k: 't' }],
    [{ m: 'AI Visibility Score', r: `${total} / 100`, b: band(total), t: S.takeaway || '' }, ...dims.map((d) => ({ m: d.k, r: `${d.score} / 10`, b: band10(d.score), t: d.takeaway }))])}
  <div class="cards">
    <div class="card"><h4>Top fixes</h4><ol>${A.summary.topFixes.map((f) => `<li>${md(f)}</li>`).join('')}</ol></div>
    <div class="card" style="background:#f2f8ea;border-color:#d6e9c2"><h4>Biggest strength</h4><p style="font-size:10.5px">${md(A.summary.strength)}</p>
      ${A.summary.topContent ? `<h4 style="margin-top:12px">Top content opportunities</h4><ol>${A.summary.topContent.map((f) => `<li>${md(f)}</li>`).join('')}</ol>` : ''}</div>
  </div>`));

// ---------- Part 1: audit ----------
parts.push(section(`${partDivider(1, 'Visibility audit', 'Where the site stands across SEO, AEO and GEO, and what is blocking visibility.')}
  ${head(num(), 'Score breakdown', A.score.headline || 'What makes up the score.', A.score.lede)}
  <h3>Five pillars, scored out of 100</h3><div class="sub">Shading shows the score bands. Weight is each pillar’s share of the overall score.</div>
  ${pillarChart(pillarRows)}
  <h3>Points earned out of the 100 available</h3><div class="sub">Each block is a pillar’s weight. Teal is what the site earns today.</div>
  ${pointsBar(pillarRows)}
  ${table([{ h: 'Pillar', k: 'name', w: '24%' }, { h: 'Score', k: 's', w: '9%' }, { h: 'Weight', k: 'w', w: '9%' }, { h: 'Finding', k: 'finding' }],
    pillarRows.map((r) => ({ ...r, s: r.pending ? `${r.score}*` : r.score, w: `${r.weight}%` })))}
  ${pillarRows.some((r) => r.pending) ? '<p class="src">* Pending verification with a measured test (for example PageSpeed Insights).</p>' : ''}
  <div class="grid2" style="margin-top:20px"><div><h3>SEO, AEO and GEO</h3><div class="sub">Out of 10.</div>${lenses(dims)}</div>
  <div><h3>Pages reviewed</h3><div class="stats three" style="margin-top:6px"><div class="stat"><div class="n">${A.meta.pagesRead}</div><div class="l">read in depth</div></div><div class="stat"><div class="n">${A.meta.pagesChecked ?? 0}</div><div class="l">status-checked</div></div><div class="stat"><div class="n">${A.meta.sitemapUrls ?? '–'}</div><div class="l">in the sitemap</div></div></div></div></div>`));

if (A.pages?.length) parts.push(section(`${head(num(), 'Pages audited', 'What we *read*.', null)}
  ${table([{ h: 'URL', k: 'url', w: '34%', mono: true }, { h: 'Page type', k: 'type', w: '18%' }, { h: 'Notes', k: 'notes' }], A.pages)}`, { flow: true }));

for (const [key, label] of [['seo', 'SEO analysis'], ['aeo', 'AEO analysis'], ['geo', 'GEO analysis']]) {
  const block = A[key];
  if (!block) continue;
  const all = block.sections.flatMap((s) => s.signals);
  parts.push(section(`${head(num(), `${label} · ${S[key].score} / 10`, block.headline, block.lede)}
    <div style="margin-top:14px">${statusBar(counts(all))}</div>
    ${block.sections.map((s) => `<h3>${esc(s.title)}</h3>${s.note ? `<div class="sub">${md(s.note)}</div>` : ''}${signalTable(s.signals)}`).join('')}
    ${block.callout ? callout(block.callout, 'teal') : ''}`));
}

if (A.crawlers?.length) parts.push(section(`${head(num(), 'AI crawler access', 'Which AI bots can *read the site*.', 'Taken from robots.txt. Search-time bots fetch pages when someone asks a question; training bots collect data for future models.')}
  ${table([{ h: 'Bot', k: 'bot', w: '22%' }, { h: 'Engine', k: 'engine', w: '20%' }, { h: 'Purpose', k: 'purpose', w: '22%' }, { h: 'Verdict', k: 'verdict', pill: (v) => /allow/i.test(v) ? 'good' : /block/i.test(v) ? 'missing' : 'needs' }], A.crawlers)}`, { flow: true }));

if (full && A.citation) {
  const hits = A.citation.prompts.filter((p) => p.present).length, tot = A.citation.prompts.length;
  parts.push(section(`${head(num(), 'AI citation spot-check', A.citation.headline || `Named in *${hits} of ${tot}* buyer questions.`, A.citation.lede)}
  <div class="cite"><div>${'<div class="eyebrow"><b></b>Buyer prompts tested</div>'}<div class="big">${hits}<span> of ${tot}</span></div><div style="margin-top:10px">${dots(hits, tot)}</div></div>
  <p>${md(A.citation.summary)}</p></div>
  ${table([{ h: 'Prompt', k: 'prompt', w: '32%' }, { h: 'Named?', k: 'p', pill: (v) => (v === 'Yes' ? 'yes' : 'no') }, { h: 'Who appears instead', k: 'instead' }, { h: 'Sources cited', k: 'sources' }],
    A.citation.prompts.map((p) => ({ ...p, p: p.present ? 'Yes' : 'No' })))}
  <p class="src">${md(A.citation.limits || 'A point-in-time sample, not a measurement. Re-run the same prompts monthly to track share of voice.')}</p>`));
}

const PRI = { critical: ['Critical blocker', 'critical'], quick: ['Quick win', 'quick'], high: ['High value', 'refresh'], future: ['Future operations', 'future'] };
parts.push(section(`${head(num(), 'Priority fixes', A.fixesHeadline || 'What to fix, *in order*.', 'Technical and on-page fixes from the audit. Effort bars use a log scale.')}
  ${steps(A.fixes.map((f) => ({ title: f.fix, detail: `${f.module ? `**${f.module}.** ` : ''}${f.impact}`, hours: f.hours ?? 4, effort: f.effort, tag: { text: PRI[f.priority][0], kind: PRI[f.priority][1] } })))}
  ${A.working?.length ? `<h2>What’s working</h2>${checks(A.working.map((w) => ({ title: w.what, text: w.evidence })), 'lime')}` : ''}`));

// ---------- Part 2: content ----------
const K = A.content;
if (K) {
  let c = `${partDivider(2, 'On-site content strategy', 'Built from the gaps the audit found, not from a template.')}
  ${head(num(), 'Content strategy', K.headline || 'What to *start, stop and fix*.', K.overview)}`;
  if (!full && K.top) c += `<h3>Top content opportunities</h3>${steps(K.top.map((t) => ({ title: t.piece, detail: t.why, hours: t.hours ?? 8, effort: t.effort })))}`;
  if (full) {
    if (K.inventory?.length) {
      const v = K.inventory.reduce((a, r) => ((a[r.verdict] = (a[r.verdict] || 0) + 1), a), {});
      c += `<h3>Content inventory</h3><div class="sub">Keep ${v.Keep || 0} · Refresh ${v.Refresh || 0} · Merge ${v.Merge || 0} · Prune ${v.Prune || 0}. Confirm the final cut against 12 months of Search Console data.</div>
      ${table([{ h: 'URL', k: 'url', w: '30%', mono: true }, { h: 'Type', k: 'type', w: '14%' }, { h: 'Verdict', k: 'verdict', w: '11%', pill: (x) => x.toLowerCase() }, { h: 'Action', k: 'action' }], K.inventory)}`;
    }
    if (K.funnel?.length) c += `<h3>Coverage gaps</h3>${table([{ h: 'Funnel stage', k: 'stage', w: '22%' }, { h: 'Covered?', k: 'covered', w: '12%', pill: (x) => (x === 'Yes' ? 'yes' : x === 'Partly' ? 'partial' : 'no') }, { h: 'Gap and page to build', k: 'gap' }], K.funnel)}`;
    if (K.types?.length) c += table([{ h: 'Content type', k: 'type', w: '22%' }, { h: 'Present?', k: 'present', w: '12%', pill: (x) => (x === 'Yes' ? 'yes' : x === 'Partly' ? 'partial' : 'no') }, { h: 'Note', k: 'note' }], K.types);
  }
  parts.push(section(c));
  if (full && K.roadmap) {
    const rows = ['now', 'next', 'later'].flatMap((g) => (K.roadmap[g] || []).map((r) => ({ ...r, g: { now: 'Now', next: 'Next', later: 'Later' }[g] })));
    parts.push(section(`${head(num(), 'Content roadmap', 'The backlog, *Now, Next, Later*.', K.roadmapNote)}
    ${table([{ h: 'Content piece', k: 'piece', w: '26%' }, { h: 'Type', k: 'type', w: '13%' }, { h: 'Stage', k: 'stage', w: '10%' }, { h: 'GEO / AEO levers', k: 'levers' }, { h: 'Effort', k: 'effort', w: '9%' }, { h: 'Impact', k: 'impact', w: '9%' }], rows, { groupKey: 'g' })}`));
  }
  if (full && K.evidence) parts.push(section(`${head(num(), 'Where the proof is', K.evidence.headline, K.evidence.intro)}
    <h3>Named clients by industry</h3><div class="sub">From the site and any roster provided. Never invented.</div>
    ${itemBars(K.evidence.clusters.map((x) => ({ label: x.vertical, items: x.clients, note: x.page, first: x.first })))}
    ${callout(K.evidence.guardrail, 'orange')}`));
  if (full && K.specs?.length) parts.push(section(`${head(num(), 'Page build specs', 'Copy-ready blueprints for the *top pieces*.', null)}
    <div class="cards">${K.specs.map((s) => `<div class="card"><h4>${esc(s.title)}</h4>
      <div class="k">H1</div><p style="font-size:10.5px">${md(s.h1)}</p>
      <div class="k">Opening question and answer</div><p style="font-size:10.5px"><b>${md(s.question)}</b> ${md(s.answer)}</p>
      <div class="k">Structure</div><p style="font-size:10.5px">${md(s.structure)}</p>
      <div class="k">Evidence to add</div><p style="font-size:10.5px">${md(s.evidence)}</p>
      <div class="meta"><span class="pill p-teal">${esc(s.schema)}</span><span class="pill p-grey">${esc(s.slug)}</span></div></div>`).join('')}</div>`));
  if (full && K.guardrails) parts.push(section(`${head(num(), 'Guardrails and measurement', 'How to make it, *and how to tell it worked*.', null)}
    <div class="cards">${[['Responsible production', K.guardrails.production], ['Content architecture', K.guardrails.architecture], ['Measurement', K.guardrails.measurement]]
      .map(([h, l], i) => `<div class="card${i === 2 ? ' full' : ''}"><h4>${h}</h4><ul>${l.map((x) => `<li>${md(x)}</li>`).join('')}</ul></div>`).join('')}</div>`, { flow: true }));
}

// ---------- Part 3: off-site ----------
const O = A.offsite;
if (O) {
  let o = `${partDivider(3, 'Off-site authority and entity roadmap', 'AI engines trust what others say about you more than what you say about yourself.')}
  ${head(num(), 'Off-site roadmap', O.headline || 'The plays that earn *mentions*.', O.overview)}`;
  if (full) o += `<h3>The plays over six months</h3><div class="sub">Bar = when the play runs. Colour = effort.</div>${gantt(O.plays.map((p) => ({ name: p.name, sub: p.sub, effort: p.effort, start: p.start, end: p.end, ongoing: p.ongoing, marker: p.marker, note: p.note })))}`;
  o += table([{ h: 'Play', k: 'name', w: '20%' }, { h: 'Why it’s on the list', k: 'why' }, { h: 'First step', k: 'firstStep', w: '28%' }, { h: 'Effort', k: 'effortLabel', w: '9%', pill: (x) => x.toLowerCase() }],
    O.plays.map((p) => ({ ...p, effortLabel: p.effort[0].toUpperCase() + p.effort.slice(1) })));
  if (O.prNote) o += callout(O.prNote, 'red');
  parts.push(section(o));
  if (full && O.plays.some((p) => p.steps)) parts.push(section(`${head(num(), 'Off-site plays in detail', 'Step by step, *for this business*.', null)}
    <div class="cards">${O.plays.filter((p) => p.steps).map((p) => `<div class="card"><h4>${esc(p.name)}</h4><p class="src" style="margin:0 0 6px">${md(p.evidence || '')}</p>
      <ol>${p.steps.map((s) => `<li>${md(s)}</li>`).join('')}</ol>${p.expectation ? `<div class="k">What to expect</div><p style="font-size:10.5px">${md(p.expectation)}</p>` : ''}</div>`).join('')}</div>`));
}

// ---------- Part 4: plan ----------
const P = A.plan;
if (P) {
  const lanes = [['Technical', C.slate], ['Content', C.teal], ['Off-site', C.orange], ['Measurement', C.green]].map(([name, colour]) => ({
    name, colour, cells: ['d30', 'd60', 'd90'].map((w) => (P[w] || []).filter((r) => r.lane === name).map((r) => (r.threshold ? '!' : '') + (r.short || r.action))),
  })).filter((l) => l.cells.some((c) => c.length));
  let p = `${partDivider(4, '30/60/90 implementation plan', 'Everything above, in one order you can run.')}
  ${head(num(), '30/60/90 plan', P.headline || 'Technical first. *Then content and off-site.*', P.lede)}${swimlane(lanes)}`;
  if (P.ongoing?.length) p += `<h3>After day 90: a quarterly rhythm</h3>${rhythm(P.ongoing)}`;
  parts.push(section(p));
  const rows = [['d30', 'First 30 days'], ['d60', 'Days 31–60'], ['d90', 'Days 61–90']].flatMap(([w, g]) => (P[w] || []).map((r) => ({ ...r, g, action: (r.threshold ? '⚑ ' : '') + r.action })));
  parts.push(section(`${head(num(), 'The full plan', 'Every action, *with what done looks like*.', null)}
    ${table([{ h: 'Action', k: 'action', w: '28%' }, { h: 'Lane', k: 'lane', w: '11%' }, { h: 'What done looks like', k: 'done' }, { h: 'Effort', k: 'effort', w: '10%' }, { h: 'Impact', k: 'impact', w: '9%' }], rows, { groupKey: 'g' })}
    ${P.resourcing ? callout(P.resourcing, 'teal') : ''}`));
}

// ---------- method ----------
parts.push(section(`${head(num(), 'How this was scored', 'Method, limits and *the numbers behind it*.', A.method?.lede || 'Five weighted pillars roll into one score out of 100: Technical 25%, Content 25%, Off-page 25%, Schema 15%, Performance 10%.')}
  ${caveats(A.method?.caveats || [])}
  ${A.method?.benchmarks?.length ? `<h3>Benchmarks used</h3>${table([{ h: 'Figure', k: 'figure' }, { h: 'Source', k: 'source', w: '32%' }], A.method.benchmarks)}<p class="src">Third-party figures, directional, as of the audit date. Re-check before quoting in client material.</p>` : ''}
  <div class="callout navy" style="margin-top:24px"><b>Next check-in.</b> ${md(A.method?.next || 'Re-run this audit monthly with the progress check to see what moved.')}</div>`));

const slug = `now-visibility-audit-${A.meta.domain.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${A.meta.isoDate || 'report'}`;
const htmlPath = path.join(OUT, `${slug}.html`);
fs.writeFileSync(htmlPath, page({ title: `${A.meta.domain} search visibility audit`, footer: `${A.meta.domain} · Search visibility audit · ${A.meta.date}`, body: parts.join('\n') }));
console.log(htmlPath);
try { console.log(execFileSync('node', [path.join(HERE, 'to-pdf.mjs'), htmlPath], { encoding: 'utf8' }).trim()); }
catch { console.error('PDF step skipped: no headless browser. The HTML prints to PDF from any browser.'); }
