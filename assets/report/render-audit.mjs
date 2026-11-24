// Build the visual audit report from an audit data file (scoring model v7.0).
// Usage: node render-audit.mjs audit-data.json [out-dir]
// Every score is computed here from the checks (scoring.mjs); the data file never states a total.
// The data shape is in references/report-spec.md; example-audit.json is a full example.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { C, md, esc, band, dots, itemBars, gantt, rangeChart, ciChart, disciplineBars } from './charts.mjs';
import { page, head, section, partDivider, cover, definitionsPage, glossary, checks as checkList, steps, swimlane, rhythm, callout, table, caveats } from './components.mjs';
import { score as computeScore, PILLARS, ALT_WEIGHTS, RESULT_LABEL, RESULT_PILL, GATE_LABEL } from './scoring.mjs';
const GRADE = { A: 'Measured', B: 'Observed', C: 'Inferred' };
const shortEngine = (e) => e.replace('Google ', '');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const [, , dataPath, outDir] = process.argv;
if (!dataPath) { console.error('Usage: node render-audit.mjs audit-data.json [out-dir]'); process.exit(1); }
let A;
try { A = JSON.parse(fs.readFileSync(dataPath, 'utf8')); } catch (e) { console.error(`The audit data file isn't valid JSON: ${e.message}`); process.exit(1); }
process.on('uncaughtException', (e) => { console.error(`The report couldn't be drawn: ${e.message}. Check the data file against references/report-spec.md.`); process.exit(1); });
{ // impact-to-effort ranking is all or nothing, so the page never claims an order it doesn't have
  const tagged = (A.fixes || []).filter((f) => f.impactLevel !== undefined);
  const bad = tagged.filter((f) => !['high', 'medium', 'low'].includes(f.impactLevel)).map((f) => f.fix);
  if (bad.length) { console.error(`fixes: impactLevel must be high, medium or low ("${bad[0]}")`); process.exit(1); }
  if (tagged.length && tagged.length !== A.fixes.length) { console.error(`fixes: give every fix an impactLevel, or none (${tagged.length} of ${A.fixes.length} have one)`); process.exit(1); }
  const noHours = tagged.filter((f) => typeof f.hours !== 'number').map((f) => f.fix);
  if (noHours.length) { console.error(`fixes: ranked fixes need hours (use 0 for ongoing work): "${noHours[0]}"`); process.exit(1); }
}
let R;
try { R = computeScore(A); } catch (e) { console.error(e.message); process.exit(1); }
const full = A.meta.depth === 'full';
const OUT = path.resolve(outDir || path.dirname(dataPath));
fs.mkdirSync(OUT, { recursive: true });
let n = 0; const num = () => String(++n).padStart(2, '0');
const parts = [];
const idx = R.index, V = R.visibility;
const ptxt = idx.point ?? 'No point estimate (range only)';
const gateCounts = ['pass', 'fail', 'verify', 'choice'].map((k) => R.gates.filter((g) => g.result === k).length);
const proxyHits = V ? V.engines.reduce((a, e) => a + e.mentions, 0) : 0, proxyN = V ? V.engines.reduce((a, e) => a + e.answers, 0) : 0;
const visText = !V ? 'Not checked' : V.tier === 'measured'
  ? V.engines.map((e) => `${e.engine} ${e.rate}% (${e.lo}–${e.hi}%)`).join(' · ')
  : `Named in ${proxyHits} of ${proxyN} search-proxy checks`;
const O = A.outcomes;

// ---------- cover + start here ----------
parts.push(cover({
  kicker: `${full ? 'Full audit + growth roadmap' : 'Quick audit'} · SEO · AEO · GEO`, domain: A.meta.domain,
  score: idx.point, range: R.ifFixed && idx.point != null ? [R.ifFixed.lo, R.ifFixed.hi] : [idx.lo, idx.hi], jrange: R.ifFixed ? [R.ifFixed.jlo, R.ifFixed.jhi] : [idx.jlo, idx.jhi], capped: !!R.failed.length, bandLabel: R.bandLabel + (R.confidence === 'provisional' ? ' · provisional' : ''),
  scoreLabel: `AI search<br>readiness / 100<span style="display:block;color:rgba(255,255,255,.55);font-size:9px;margin-top:6px;text-transform:none;letter-spacing:.02em">Expert-weighted checklist,<br>not validated against outcomes</span>${R.failed.length ? `<span style="display:block;color:#f6b0b0;margin-top:6px;text-transform:none">Capped by a failed access check${R.uncapped != null ? ` (${R.uncapped} uncapped)` : ''}</span>` : ''}`,
  headline: A.summary.headline, lede: A.summary.lede,
  chips: [
    { k: 'Seen in AI', name: V?.tier === 'measured' ? 'measured' : 'spot-check', v: V ? (V.tier === 'measured' ? `<span style="font-size:15px;color:#fff;line-height:1.35;display:block">${V.engines.map((e) => `${shortEngine(e.engine)} ${e.rate}%`).join('<br>')}</span>` : `${proxyHits}<span> / ${proxyN}</span>`) : 'n/a', s: V ? (V.tier === 'measured' ? 'per engine; ranges inside' : 'search-proxy checks, no rate') : 'not checked' },
    ...R.disciplines.map((d) => ({ k: d.k, name: { SEO: 'Search', AEO: 'Answers', GEO: 'AI assistants' }[d.k], v: `${d.met}<span> / ${d.total - d.unverifiable}</span>`, s: `checks met${d.unverifiable ? `, ${d.unverifiable} unverifiable` : ''}` })),
  ],
  footLeft: `Audited ${A.meta.date} · Model ${R.modelVersion} · Prepared by ${A.meta.preparedBy || 'The NoW of Work'}`,
}));
parts.push(definitionsPage(num()));

// ---------- executive summary ----------
parts.push(section(`${head(num(), 'Executive summary', A.summary.summaryHeadline || 'Where you stand *today*.', null)}
  <div class="prose">${A.summary.paragraphs.map((p) => `<p>${md(p)}</p>`).join('')}</div>
  ${table([{ h: 'Measure', k: 'm', w: '24%' }, { h: 'Result', k: 'r', w: '34%' }, { h: 'What it means', k: 't' }], [
    { m: 'Access checks', r: `${gateCounts[0]} pass · ${gateCounts[1]} fail · ${gateCounts[2]} to verify${gateCounts[3] ? ` · ${gateCounts[3]} your choice` : ''}`, t: R.failed.length ? `**Critical blocker:** ${R.failed.map((g) => g.label).join('; ')}. The index is capped at 49 until it is fixed${R.uncapped != null ? ` (${R.uncapped} uncapped)` : ''}.` : 'Search engines and AI tools can reach the site, subject to the items marked verify.' },
    { m: 'AI Search Readiness Index', r: `**${ptxt}** · ${R.bandLabel}${R.ifFixed ? ` · capped at 49; once fixed: unverified range ${R.ifFixed.lo}–${R.ifFixed.hi}` : ` · unverified range ${idx.lo}–${idx.hi}${idx.jlo != null ? ` · judgment range ${idx.jlo}–${idx.jhi}` : ''}`}`, t: `${A.score.takeaway || ''} Confidence: ${R.confidence}${R.reasons.length ? ` (${R.reasons.join('; ')})` : ''}.` },
    { m: 'Observed visibility', r: visText, t: A.visibility?.takeaway || '' },
    { m: 'Results (floor)', r: O?.headline || 'Not measured', t: O?.note || 'Connect GA4 to measure visits from AI tools.' },
  ])}
  <div class="cards">
    <div class="card"><h4>Top fixes</h4><ol>${A.summary.topFixes.map((f) => `<li>${md(f)}</li>`).join('')}</ol></div>
    <div class="card" style="background:#f2f8ea;border-color:#d6e9c2"><h4>Biggest strength</h4><p style="font-size:10.5px">${md(A.summary.strength)}</p>
      ${A.summary.topContent ? `<h4 style="margin-top:12px">Top content opportunities</h4><ol>${A.summary.topContent.map((f) => `<li>${md(f)}</li>`).join('')}</ol>` : ''}</div>
  </div>`));

// ---------- action list ----------
// One checklist the client can work down: every fix, merged with its 30/60/90 plan row (matched on the check IDs
// it closes, then on wording), plus plan rows no fix covers. Nothing here is new; it re-orders fixes and plan.
const PRI = { critical: ['Critical blocker', 'critical'], quick: ['Quick win', 'quick'], high: ['High value', 'refresh'], future: ['Future operations', 'future'] };
const STATUS = { todo: ['To do', 'grey'], started: ['Started', 'needs'], done: ['Done', 'good'] };
const WHEN = [['d30', 'First 30 days'], ['d60', 'Days 31–60'], ['d90', 'Days 61–90']];
const ids = (s) => new Set(String(s || '').split(/[^A-Z0-9]+/i).filter((x) => /^[A-Z]{1,3}\d+$/i.test(x)).map((x) => x.toUpperCase()));
const STOP = new Set(['the', 'and', 'for', 'with', 'from', 'into', 'your', 'their', 'that', 'this', 'add', 'set', 'make', 'each', 'every']);
const words = (s) => new Set(String(s || '').toLowerCase().match(/[a-z0-9]{3,}/g)?.filter((w) => !STOP.has(w)) || []);
const planRows = WHEN.flatMap(([w, g], wi) => (A.plan?.[w] || []).map((r, i) => ({ ...r, g, order: wi * 1000 + i, used: false })));
const pickPlan = (f) => {
  const fi = ids(f.checks), fw = words(f.fix);
  let best = null, bestScore = 0;
  for (const r of planRows.filter((x) => !x.used)) {
    const shared = [...ids(r.checks)].filter((x) => fi.has(x)).length;
    const rw = words(r.action), common = [...rw].filter((x) => fw.has(x)).length;
    const wordFit = Math.min(rw.size, fw.size) ? common / Math.min(rw.size, fw.size) : 0;
    const s = shared ? 10 + shared + wordFit : wordFit >= 0.6 ? wordFit : 0;
    if (s > bestScore) { best = r; bestScore = s; }
  }
  if (best) best.used = true;
  return best;
};
const defaultWhen = { critical: 0, quick: 0, high: 1, future: 2 };
const actions = [
  ...A.fixes.map((f, i) => {
    const r = pickPlan(f);
    return { order: r ? r.order : defaultWhen[f.priority] * 1000 + 500 + i, g: r ? r.g : WHEN[defaultWhen[f.priority]][1], action: r?.action || f.fix, detail: r ? f.fix : null,
      pri: PRI[f.priority][0].replace('Future operations', 'Future').replace('Critical blocker', 'Critical'), effort: f.effort || r?.effort || '', done: r?.done || f.impact, checks: [...new Set([...ids(f.checks), ...ids(r?.checks)])].join(', ') || f.checks || r?.checks || '', owner: f.owner || r?.owner || '', status: f.status || r?.status || 'todo', threshold: r?.threshold };
  }),
  ...planRows.filter((r) => !r.used).map((r) => ({ order: r.order, g: r.g, action: r.action, pri: 'From the plan', effort: r.effort || '', done: r.done, checks: r.checks || '', owner: r.owner || '', status: r.status || 'todo', threshold: r.threshold })),
].sort((a, b) => a.order - b.order).map((a, i) => ({ ...a, n: `${i + 1}. ${a.threshold ? '⚑ ' : ''}${a.action}`, st: (STATUS[a.status] || STATUS.todo)[0] }));
const hasOwner = actions.some((a) => a.owner);
parts.push(section(`${head(num(), 'Your action list', A.actionsHeadline || `*${actions.length} actions*, in the order to do them.`, `Everything the audit asks for, on one list. Each action names the checks it closes; the pages after this one show the evidence behind each.${actions.some((a) => a.threshold) ? ' ⚑ marks a threshold: do it before anything else in its window.' : ''}`)}
  ${table([{ h: 'Action', k: 'n', w: hasOwner ? '30%' : '34%' }, { h: 'Type', k: 'pri', w: '12%', pill: (v) => ({ Critical: 'critical', 'Quick win': 'quick', 'High value': 'refresh', Future: 'future' })[v] || 'teal' },
    ...(hasOwner ? [{ h: 'Who', k: 'owner', w: '10%' }] : []), { h: 'Effort', k: 'effort', w: '10%' }, { h: 'Done when', k: 'done' }, { h: 'Closes', k: 'checks', w: '9%' },
    { h: 'Status', k: 'st', w: '8%', pill: (v) => Object.values(STATUS).find(([l]) => l === v)[1] }], actions, { groupKey: 'g' })}`, { flow: actions.length > 10 }));

// ---------- Part 1: access + readiness ----------
const sens = idx.point == null ? 'not computed (no point estimate; the alternative weightings would leave out the unassessed pillar)' : R.sensitivity.map((s) => `${s.name} ${s.value}`).join(', ');
const blind = [...R.gates.filter((g) => g.result === 'verify').map((g) => ({ area: `${g.id} · ${g.label}`, kind: 'Access check', detail: `Confirm with ${g.tool}.` })),
  ...R.checks.filter((c) => c.result === 'unverifiable').map((c) => ({ area: `${c.id} · ${c.label}`, kind: ['px', 'cm'].includes(c.pillar) ? 'Not scored' : 'Widens the range', detail: `Confirm with ${c.tool}.` }))];
const choices = R.gates.filter((g) => g.result === 'choice');
parts.push(section(`${partDivider(1, 'Visibility audit', 'Can engines reach you, how ready is the site, and how often are you actually named?')}
  ${head(num(), 'Access checks and readiness', A.score.headline || 'What makes up the score.', A.score.lede)}
  <h3>Access checks</h3><div class="sub">Pass or fail, not points. A failed check caps the index at 49 and leads the plan.</div>
  ${table([{ h: 'Check', k: 'l', w: '32%' }, { h: 'What we found', k: 'evidence' }, { h: 'Result', k: 'r', w: '12%', pill: (v) => Object.values(GATE_LABEL).find(([l]) => l === v)[1] }],
    R.gates.map((g) => ({ ...g, l: `${g.id} · ${g.label}`, r: GATE_LABEL[g.result][0], evidence: g.result === 'choice' ? `${g.evidence} **Cost:** ${g.cost}` : g.evidence })))}
  <h3>AI Search Readiness Index by pillar</h3><div class="sub">Dot = score from the checks we could assess. Whisker = the range if every unverifiable check went either way. Orange dot = more than a third of the evidence is inferred.</div>
  ${rangeChart(R.pillars.map((p) => ({ ...p, weight: R.effective[p.key] ?? 0 })))}
  <p class="src">Overall ${ptxt}, ${R.bandLabel}, confidence ${R.confidence}. ${R.ifFixed ? `Capped at 49 by a failed access check; once it is fixed, unverified range ${R.ifFixed.lo}–${R.ifFixed.hi}${R.ifFixed.jlo != null ? `, judgment range ${R.ifFixed.jlo}–${R.ifFixed.jhi}` : ''}.` : `Unverified range ${idx.lo}–${idx.hi}${idx.jlo != null ? `; judgment range ${idx.jlo}–${idx.jhi} (if every partial call went the other way)` : ''}.`} Under other weightings${R.ifFixed ? ' (uncapped)' : ''}: ${sens}. Weights are expert judgment ordered by the evidence, not validated against outcomes (model ${R.modelVersion}).</p>
  <h3>SEO, AEO and GEO checks</h3><div class="sub">Each check is tagged with the discipline it serves; some serve two. Green met · orange partial · red not met · purple unverifiable.</div>
  ${disciplineBars(R.disciplines)}`));
if (blind.length) parts.push(section(`${head(num(), 'What we could not see', `*${blind.length} things* need a login or a tool to confirm.`, 'Scored as unknown, not as a pass or a fail. Unverifiable checks widen the unverified range; access checks marked verify don’t change the score but must be confirmed; page-speed checks are left out until measured.')}
  ${table([{ h: 'Item', k: 'area', w: '36%' }, { h: 'Effect', k: 'kind', w: '16%' }, { h: 'How to confirm it', k: 'detail' }], blind)}`, { flow: blind.length > 8 }));
if (choices.length) parts.push(section(`${head(num(), 'Choices you’ve made', 'Deliberate settings, *and what they cost*.', 'These are business decisions, not faults. They don’t lower the index, but they limit where you can be found.')}
  ${table([{ h: 'Setting', k: 'l', w: '32%' }, { h: 'What it is', k: 'evidence' }, { h: 'Visibility cost', k: 'cost', w: '34%' }], choices.map((g) => ({ ...g, l: `${g.id} · ${g.label}` })))}`, { flow: true }));

if (A.pages?.length) parts.push(section(`${head(num(), 'Pages audited', 'What we *read*.', `${A.keyPages.length} key pages, ${A.meta.pagesRead} pages read in depth.`)}
  ${table([{ h: 'URL', k: 'url', w: '34%', mono: true }, { h: 'Page type', k: 'type', w: '18%' }, { h: 'Notes', k: 'notes' }], A.pages)}`, { flow: true }));

for (const p of R.pillars) {
  const note = A.notes?.[p.key];
  parts.push(section(`${head(num(), `${p.name} · ${p.measured ? `${Math.round(p.score)}${p.hi > p.lo ? ` (${Math.round(p.lo)}–${Math.round(p.hi)})` : ''}` : 'not measured'}`, note?.headline || p.name, note?.lede)}
    ${table([{ h: 'Check', k: 'l', w: '24%' }, { h: 'What we found', k: 'evidence' }, { h: 'Evidence', k: 'grade', w: '10%' }, { h: 'Result', k: 'r', w: '12%', pill: (v) => RESULT_PILL[Object.keys(RESULT_LABEL).find((k) => RESULT_LABEL[k] === v)] }],
      p.checks.map((c) => ({ ...c, l: `${c.id} · ${c.label}`, grade: GRADE[c.grade] || 'n/a', r: RESULT_LABEL[c.result], evidence: c.result === 'unverifiable' ? `${c.evidence || ''} Confirm with ${c.tool}.` : c.evidence })))}
    ${note?.callout ? callout(note.callout, 'teal') : ''}`, { flow: p.key === 'sd' || p.key === 'px' }));
}
if (R.commerce.length) parts.push(section(`${head(num(), 'Commerce readiness', 'Can shopping tools and agents *buy from you*?', 'Reported separately, not part of the index, so scores stay comparable across business types.')}
  ${table([{ h: 'Check', k: 'l', w: '24%' }, { h: 'What we found', k: 'evidence' }, { h: 'Evidence', k: 'grade', w: '10%' }, { h: 'Result', k: 'r', w: '12%', pill: (v) => RESULT_PILL[Object.keys(RESULT_LABEL).find((k) => RESULT_LABEL[k] === v)] }],
    R.commerce.map((c) => ({ ...c, l: `${c.id} · ${c.label}`, grade: GRADE[c.grade] || 'n/a', r: RESULT_LABEL[c.result], evidence: c.result === 'unverifiable' ? `${c.evidence || ''} Confirm with ${c.tool}.` : c.evidence })))}`, { flow: true }));

if (A.crawlers?.length) parts.push(section(`${head(num(), 'AI crawler access', 'Which bots can *read the site*.', 'From robots.txt. Edge blocking by a CDN such as Cloudflare is not visible from outside and is listed under What we could not see.')}
  ${table([{ h: 'Bot', k: 'bot', w: '20%' }, { h: 'Operator', k: 'engine', w: '16%' }, { h: 'What blocking it does', k: 'purpose' }, { h: 'robots.txt', k: 'verdict', w: '12%', pill: (v) => /allow/i.test(v) ? 'good' : /block/i.test(v) ? 'missing' : 'needs' }], A.crawlers)}`, { flow: true }));

if (V) {
  const measured = V.tier === 'measured';
  const shown = (V.panel || []).filter((p) => !p.branded).slice(0, V.showPrompts || 6);
  const engs = V.engines.map((e) => e.engine);
  parts.push(section(`${head(num(), measured ? 'Observed AI visibility' : 'Search-proxy spot-check', V.headline || (measured ? `Named in *${V.rateSpan[0]}% to ${V.rateSpan[1]}%* of answers, depending on the engine.` : `Named in *${proxyHits} of ${proxyN}* checks.`), V.lede)}
  ${measured ? `<h3>Mention rate by engine</h3><div class="sub">Share of answers that name the brand, with a 95% range that allows for repeated runs of the same prompt and for day-to-day variation. Unbranded buyer prompts only; engines reported separately, never pooled.</div>${ciChart(V.engines)}
    ${table([{ h: 'Engine', k: 'engine', w: '22%' }, { h: 'Answers', k: 'answers' }, { h: 'Searched the web', k: 'srch' }, { h: 'Design effect', k: 'deff' }, { h: 'Smallest change we can detect', k: 'mdc' }],
      V.engines.map((e) => ({ ...e, answers: `${e.mentions} of ${e.answers} named`, srch: e.hasSearched ? `${e.searched} of ${e.answers}` : 'not recorded', deff: `${e.deff} (effective sample ${e.effN})`, mdc: `${e.mdc} points` })))}
    <p class="src">The smallest detectable change is planned from the rate (at least 5%), the design effect (at least 1.5) and a test across ${V.engines.length} engines. At this panel size a re-check only detects large moves. Precision comes from more prompts run on more separate days, not from more runs of the same prompt on the same days.</p>`
    : `<div class="cite"><div><div class="eyebrow"><b></b>Search-proxy checks</div><div class="big">${proxyHits}<span> of ${proxyN}</span></div><div style="margin-top:10px">${dots(proxyHits, proxyN)}</div></div>
       <p>${md(V.summary)} <b>This is an illustration, not a rate:</b> with this few checks the true rate could be far higher or lower.</p></div>`}
  ${measured && V.summary ? callout(V.summary, 'teal') : ''}
  ${shown.length ? `<h3>Sample of the prompt panel</h3>${table([{ h: 'Prompt', k: 'prompt', w: '30%' }, { h: 'Source', k: 'source', w: '11%' }, { h: 'Named', k: 'named', w: '22%' }, { h: 'Who appears instead', k: 'instead' }, { h: 'Sources cited', k: 'sources' }],
    shown.map((p) => ({ ...p, named: engs.map((e) => p.results?.[e] ? `${shortEngine(e)} ${p.results[e].mentions}/${p.results[e].runs}` : '').filter(Boolean).join(' · ') })))}` : ''}
  <p class="src">${md(V.protocol || '')} Rank position inside an answer is not reported: answers repeat the same brand list less than 1% of the time (SparkToro, Jan 2026, vendor research).</p>
`));
}
if (O) parts.push(section(`${head(num(), 'Results from your analytics', O.headline ? md(O.headline) : 'Visits from AI tools.', null)}
  ${table([{ h: 'Measure', k: 'label', w: '40%' }, { h: 'Value', k: 'value' }], O.items || [])}<p class="src">${md(O.note || '')} Always a lower bound: AI Overview and AI Mode clicks sit inside Google organic, and app traffic without a referrer lands in Direct.</p>`, { flow: true }));

// Impact-to-effort ranking (v7.2). When every fix carries `impactLevel`, the page is ordered by impact relative
// to effort and says so. Effort bands come from hours: Low = 16 hours or less AND no new content, so "every
// low-effort item can be done in a week without writing new content" is true by construction.
const LEVEL = { high: 3, medium: 2, low: 1 }, EFFORT = { low: 1, medium: 2, high: 3 };
const ranked = A.fixes.length && A.fixes.every((f) => LEVEL[f.impactLevel]);
const effortBand = (f) => (f.hours > 0 && f.hours <= 16 && !f.newContent ? 'low' : f.hours > 0 && f.hours <= 80 ? 'medium' : 'high');
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const fixOrder = ranked
  ? [...A.fixes.filter((f) => f.priority === 'critical'), ...A.fixes.filter((f) => f.priority !== 'critical')
      .map((f, i) => ({ f, i, s: LEVEL[f.impactLevel] / EFFORT[effortBand(f)] }))
      .sort((a, b) => b.s - a.s || LEVEL[b.f.impactLevel] - LEVEL[a.f.impactLevel] || (a.f.hours ?? 0) - (b.f.hours ?? 0) || a.i - b.i).map((x) => x.f)]
  : A.fixes;
const fixesNote = ranked
  ? `Ordered by impact relative to effort${R.failed.length ? ', after the access fix that has to come first' : ''}. Every low-effort item can be done in a week without writing new content.`
  : 'Each fix names the check it closes. Effort bars use a log scale.';
parts.push(section(`${head(num(), 'Priority fixes', A.fixesHeadline || 'What to fix, *in order*.', fixesNote)}
  ${steps(fixOrder.map((f) => ({ title: f.fix, detail: `${f.checks ? `**${f.checks}.** ` : ''}${f.impact}`, hours: f.hours ?? 4,
    effort: ranked ? `${cap(effortBand(f))} effort · ${cap(f.impactLevel)} impact${f.effort ? ` · ${f.effort}` : ''}` : f.effort, tag: { text: PRI[f.priority][0], kind: PRI[f.priority][1] } })))}
  ${A.working?.length ? `<h2>What’s working</h2>${checkList(A.working.map((w) => ({ title: w.what, text: w.evidence })), 'lime')}` : ''}`, { flow: !!O }));

// ---------- Part 2: content ----------
const K = A.content;
if (K) {
  let c = `${partDivider(2, 'On-site content strategy', 'Built from the gaps the audit found, not from a template.')}
  ${head(num(), 'Content strategy', K.headline || 'What to *start, stop and fix*.', K.overview)}`;
  if (!full && K.top) c += `<h3>Top content opportunities</h3>${steps(K.top.map((x) => ({ title: x.piece, detail: x.why, hours: x.hours ?? 8, effort: x.effort })))}`;
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
    ${table([{ h: 'Content piece', k: 'piece', w: '26%' }, { h: 'Type', k: 'type', w: '12%' }, { h: 'Closes', k: 'checks', w: '9%' }, { h: 'Why it matters', k: 'levers' }, { h: 'Effort', k: 'effort', w: '9%' }, { h: 'Evidence', k: 'evidence', w: '9%' }], rows, { groupKey: 'g' })}`, { flow: true }));
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
const OF = A.offsite;
if (OF) {
  let o = `${partDivider(3, 'Off-site authority and entity roadmap', 'Built from the sources this category’s AI answers actually cite.')}
  ${head(num(), 'Off-site roadmap', OF.headline || 'The plays that earn *mentions*.', OF.overview)}`;
  if (full) o += `<h3>The plays over six months</h3><div class="sub">Bar = when the play runs. Colour = effort.</div>${gantt(OF.plays.map((p) => ({ name: p.name, sub: p.sub, effort: p.effort, start: p.start, end: p.end, ongoing: p.ongoing, marker: p.marker, note: p.note })))}`;
  o += table([{ h: 'Play', k: 'name', w: '20%' }, { h: 'Why it’s on the list', k: 'why' }, { h: 'First step', k: 'firstStep', w: '28%' }, { h: 'Effort', k: 'effortLabel', w: '9%', pill: (x) => x.toLowerCase() }],
    OF.plays.map((p) => ({ ...p, effortLabel: p.effort[0].toUpperCase() + p.effort.slice(1) })));
  if (OF.prNote) o += callout(OF.prNote, 'red');
  parts.push(section(o));
  if (full && OF.plays.some((p) => p.steps)) parts.push(section(`${head(num(), 'Off-site plays in detail', 'Step by step, *for this business*.', null)}
    <div class="cards">${OF.plays.filter((p) => p.steps).map((p) => `<div class="card"><h4>${esc(p.name)}</h4><p class="src" style="margin:0 0 6px">${md(p.evidence || '')}</p>
      <ol>${p.steps.map((s) => `<li>${md(s)}</li>`).join('')}</ol>${p.expectation ? `<div class="k">What to expect</div><p style="font-size:10.5px">${md(p.expectation)}</p>` : ''}</div>`).join('')}</div>`));
}

// ---------- Part 4: plan ----------
const P = A.plan;
if (P) {
  const lanes = [['Technical', C.slate], ['Content', C.teal], ['Off-site', C.orange], ['Measurement', C.green]].map(([name, colour]) => ({
    name, colour, cells: ['d30', 'd60', 'd90'].map((w) => (P[w] || []).filter((r) => r.lane === name).map((r) => (r.threshold ? '!' : '') + (r.short || r.action))),
  })).filter((l) => l.cells.some((c) => c.length));
  let p = `${partDivider(4, '30/60/90 implementation plan', 'Everything above, in one order you can run.')}
  ${head(num(), '30/60/90 plan', P.headline || 'Access first. *Then content and off-site.*', P.lede)}${swimlane(lanes)}`;
  if (P.ongoing?.length) p += `<h3>After day 90: a quarterly rhythm</h3>${rhythm(P.ongoing)}`;
  parts.push(section(p));
  const rows = [['d30', 'First 30 days'], ['d60', 'Days 31–60'], ['d90', 'Days 61–90']].flatMap(([w, g]) => (P[w] || []).map((r) => ({ ...r, g, action: (r.threshold ? '⚑ ' : '') + r.action })));
  parts.push(section(`${head(num(), 'The full plan', 'Every action, *with what done looks like*.', null)}
    ${P.resourcing ? callout(P.resourcing, 'teal') : ''}
    ${table([{ h: 'Action', k: 'action', w: '28%' }, { h: 'Lane', k: 'lane', w: '11%' }, { h: 'What done looks like', k: 'done' }, { h: 'Effort', k: 'effort', w: '10%' }, { h: 'Closes', k: 'checks', w: '9%' }], rows, { groupKey: 'g' })}`));
}

// ---------- method ----------
const wRows = PILLARS.map((p) => ({ p: p.name, w: `${p.weight}%`, e: R.effective[p.key] != null ? `${R.effective[p.key]}%` : p.key === 'px' ? 'dropped (not measured)' : 'range only (no checks assessed)', eq: `${ALT_WEIGHTS['equal weights'][p.key]}%`, on: `${ALT_WEIGHTS['on-site heavy'][p.key]}%`, v6: `${ALT_WEIGHTS['v6 weights'][p.key]}%` }));
parts.push(section(`${head(num(), 'How this was scored', 'Method, limits and *the numbers behind it*.', `Scoring model ${R.modelVersion}. Every check is scored met (1), partial (0.5) or not met (0); unverifiable checks are left out of the score and widen the range. Weights are expert judgment ordered by the evidence, not fitted to outcomes, so the index is also shown under three other weightings and with each pillar left out.`)}
  <div class="callout navy" style="margin:14px 0 6px"><b>Next check-in.</b> ${md(A.method?.next || 'Run the progress check in about 30 days; re-audit in full each quarter on the same scoring model.')}</div>
  ${table([{ h: 'Pillar', k: 'p', w: '30%' }, { h: 'Weight', k: 'w' }, { h: 'Used this audit', k: 'e' }, { h: 'Equal', k: 'eq' }, { h: 'On-site heavy', k: 'on' }, { h: 'v6', k: 'v6' }], wRows)}
  <p class="src">Index ${ptxt}${R.ifFixed && R.uncapped != null ? ` (capped; ${R.uncapped} uncapped)` : ''}; unverified range ${(R.ifFixed || idx).lo}–${(R.ifFixed || idx).hi}${(R.ifFixed || idx).jlo != null ? `; judgment range ${(R.ifFixed || idx).jlo}–${(R.ifFixed || idx).jhi}` : ''}. Under ${sens}${R.ifFixed ? ' (uncapped)' : ''}. Band: ${R.bandLabel}. Confidence: ${R.confidence}${R.reasons.length ? ` (${R.reasons.join('; ')})` : ''}. Bands are conventional cut points, not calibrated against outcomes.</p>
  ${caveats(A.method?.caveats || [])}
  ${A.method?.benchmarks?.length ? `<h3>Evidence used in this report</h3>${table([{ h: 'Figure', k: 'figure' }, { h: 'Source', k: 'source', w: '26%' }, { h: 'Method', k: 'method', w: '13%' }, { h: 'Grade', k: 'grade', w: '7%' }], A.method.benchmarks)}<p class="src">Source grades. A: platform documentation or a peer-reviewed venue. B: preprints, academic surveys, large studies with a published method (vendor studies flagged) and self-reported platform figures. C: small, single-client, opinion surveys, single press reports or undisclosed methods. Figures are as of the audit date.</p>` : ''}
`));

parts.push(glossary());

const slug = `now-visibility-audit-${A.meta.domain.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${A.meta.isoDate || 'report'}`;
const htmlPath = path.join(OUT, `${slug}.html`);
// Computed scores, saved for the monthly progress check (its baseline and history read this file).
fs.writeFileSync(path.join(OUT, `${slug}.scores.json`), JSON.stringify({
  domain: A.meta.domain, date: A.meta.date, isoDate: A.meta.isoDate, modelVersion: R.modelVersion, depth: A.meta.depth,
  total: idx.point, uncapped: R.uncapped, range: [idx.lo, idx.hi], jrange: [idx.jlo, idx.jhi], band: R.bandLabel, confidence: R.confidence,
  pillars: Object.fromEntries(R.pillars.filter((p) => p.measured).map((p) => [p.key, Math.round(p.score)])),
  disciplines: Object.fromEntries(R.disciplines.map((d) => [d.k, [d.met, d.total - d.unverifiable]])),
  gates: Object.fromEntries(R.gates.map((g) => [g.id, g.result])),
  checks: Object.fromEntries(R.checks.map((c) => [c.id, c.result])),
  visibility: V ? (V.tier === 'measured'
    ? { tier: V.tier, engines: V.engines.map((e) => ({ engine: e.engine, rate: e.rate, se: e.se, lo: e.lo, hi: e.hi, answers: e.answers, mentions: e.mentions, prompts: e.prompts, clusters: e.clusters, deff: e.deff, mdc: e.mdc })),
        controls: V.controls.map((c) => ({ name: c.name, engines: c.engines.map((e) => ({ engine: e.engine, rate: e.rate, se: e.se, answers: e.answers, mentions: e.mentions })) })) }
    : { tier: V.tier, engines: V.engines.map((e) => ({ engine: e.engine, answers: e.answers, mentions: e.mentions })) }) : null,
  disciplinesDetail: Object.fromEntries(R.disciplines.map((d) => [d.k, { met: d.met, partial: d.partial, notmet: d.notmet, unverifiable: d.unverifiable, total: d.total }])),
}, null, 2));
fs.writeFileSync(htmlPath, page({ title: `${A.meta.domain} search visibility audit`, footer: `${A.meta.domain} · Search visibility audit · ${A.meta.date}`, body: parts.join('\n') }));
console.log(htmlPath);
try { console.log(execFileSync('node', [path.join(HERE, 'to-pdf.mjs'), htmlPath], { encoding: 'utf8' }).trim()); }
catch { console.error('PDF step skipped: no headless browser. The HTML prints to PDF from any browser.'); }
