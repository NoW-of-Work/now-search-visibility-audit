// NoW visual report system: page-level building blocks shared by the audit and progress reports.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { C, esc, md, band, band10, bandTrack, BANDS } from './charts.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const b64 = (f) => `data:image/png;base64,${fs.readFileSync(path.join(HERE, f)).toString('base64')}`;
export const LOGO_DARK = () => b64('now-logo-darkbg.png');

const checkSvg = '<svg viewBox="0 0 12 12"><path d="M2 6.5l2.6 2.5L10 3.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** The whole document. footer: left-hand running footer text. */
export function page({ title, footer, body }) {
  const css = fs.readFileSync(path.join(HERE, 'report.css'), 'utf8');
  const f = footer.replace(/"/g, "'");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=block" rel="stylesheet">
<style>${css}
@page{@bottom-left{content:"${f}";font:500 8px 'IBM Plex Mono',monospace;letter-spacing:.06em;text-transform:uppercase;color:#808c9e}
@bottom-right{content:counter(page);font:500 8px 'IBM Plex Mono',monospace;color:#808c9e}}</style></head>
<body>${body}</body></html>`;
}

export const eyebrow = (n, label) => `<div class="eyebrow"><b></b>${n ? `${esc(n)} · ` : ''}${esc(label)}</div>`;
export const head = (n, label, h1, lede) =>
  `${eyebrow(n, label)}<h1>${md(h1)}</h1>${lede ? `<p class="lede">${md(lede)}</p>` : ''}`;
export const section = (inner, { flow = false } = {}) => `<section class="section${flow ? ' flow' : ''}">${inner}</section>`;
export const partDivider = (n, title, desc) =>
  `<div class="part"><div class="n">Part ${esc(n)}</div><div class="t">${esc(title)}</div>${desc ? `<div class="d">${md(desc)}</div>` : ''}</div>`;

/** Cover. score/prev on 100; dims: [{k, score, prev?}] */
export function cover({ kicker, domain, score, prev = null, headline, lede, dims, footLeft, footRight = 'The NoW of Work' }) {
  const big = prev != null
    ? `<div class="from">${prev}</div><div class="arrow">→</div><div class="to">${score}</div><div class="of">AI visibility<br>score / 100</div>`
    : `<div class="to">${score}</div><div class="of">AI visibility<br>score / 100<b>${band(score)}</b></div>`;
  const chips = dims.map((d) => {
    const v = d.prev != null ? `<span>${d.prev} →</span> ${d.score}` : `${d.score}<span style="font-size:18px"> / 10</span>`;
    let s = band10(d.score);
    if (d.prev != null && band10(d.prev) !== s) s = `${band10(d.prev)} to ${s}`;
    else if (d.prev != null && d.prev === d.score) s += ', no change';
    return `<div class="chip"><div class="k">${esc(d.k)}<i>${esc(d.name || '')}</i></div><div class="v">${v}</div><div class="s">${esc(s)}</div></div>`;
  }).join('');
  return `<section class="cover"><img class="logo" src="${LOGO_DARK()}" alt="The NoW of Work">
  ${eyebrow('', kicker)}<div class="domain">${esc(domain)}</div>
  <div class="bigscore">${big}</div>
  <div style="margin-top:22px">${bandTrack({ score, prev, width: 680 })}</div>
  <h1>${md(headline)}</h1>${lede ? `<p class="lede">${md(lede)}</p>` : ''}
  <div class="chips">${chips}</div>
  <div class="foot"><span>${esc(footLeft)}</span><span>${esc(footRight)}</span></div></section>`;
}

/** The explainer page every report opens with: SEO, AEO and GEO in plain words. */
export function definitionsPage(n = '00') {
  const defs = [
    { ab: 'SEO', nm: 'Search Engine Optimization', c: C.slate, c2: C.slate,
      q: 'Can people find you when they search?',
      where: 'The list of results on Google and Bing, including maps.',
      what: 'Whether search engines can read your pages, understand them, and rank them for the words buyers type.',
      biz: '<b>Traffic you don’t pay for.</b> People searching for what you sell land on your site.',
      moves: 'Fast pages that search engines can read, clear titles, links from other sites.' },
    { ab: 'AEO', nm: 'Answer Engine Optimization', c: C.orange, c2: '#9a5121',
      q: 'Are you the answer?',
      where: 'Featured snippets, “People also ask” boxes, and voice assistants such as Siri and Alexa.',
      what: 'Whether your pages give a short, direct answer that a search engine can lift and show on its own.',
      biz: '<b>You’re the name in the answer, even when nobody clicks.</b> It builds trust on the questions buyers ask early.',
      moves: 'Question headings, a 40–60 word answer under each, FAQ markup.' },
    { ab: 'GEO', nm: 'Generative Engine Optimization', c: C.teal, c2: C.tealD,
      q: 'Do AI assistants recommend you?',
      where: 'ChatGPT, Claude, Perplexity, Gemini, Copilot, and Google’s AI Overviews and AI Mode.',
      what: 'Whether AI tools name and cite you when someone asks them for advice or a shortlist.',
      biz: '<b>The shortlist now forms inside the AI answer.</b> If you aren’t named, you aren’t considered, and the buyer may never visit your site.',
      moves: 'Original data, clear facts about who you are, and mentions on trusted sites: reviews, press, YouTube, Reddit.' },
  ];
  const cards = defs.map((d) => `<div class="def" style="--c:${d.c};--c2:${d.c2}">
    <div class="ab">${d.ab}</div><div class="nm">${d.nm}</div><div class="q">${d.q}</div>
    <div class="k">Where it shows up</div><p>${d.where}</p>
    <div class="k">What it measures</div><p>${d.what}</p>
    <div class="biz">${d.biz}</div>
    <div class="k">What moves it</div><p>${d.moves}</p></div>`).join('');
  // Stack diagram: SEO is the foundation the other two sit on.
  const stack = `<svg width="150" height="150" viewBox="0 0 150 150">
    <rect x="0" y="0" width="72" height="62" rx="8" fill="${C.orange}"/><text x="36" y="37" text-anchor="middle" font-size="16" font-weight="900" fill="#fff">AEO</text>
    <rect x="78" y="0" width="72" height="62" rx="8" fill="${C.teal}"/><text x="114" y="37" text-anchor="middle" font-size="16" font-weight="900" fill="#fff">GEO</text>
    <rect x="0" y="70" width="150" height="62" rx="8" fill="${C.slate}"/><text x="75" y="99" text-anchor="middle" font-size="16" font-weight="900" fill="#fff">SEO</text>
    <text x="75" y="116" text-anchor="middle" font-size="9" fill="rgba(255,255,255,.8)">the foundation</text></svg>`;
  const engines = [['Google', 'Google results, AI Overviews, AI Mode, Gemini'], ['Bing', 'Bing results, ChatGPT search, Copilot'], ['Brave', 'Claude’s web search']];
  const bandsRow = BANDS.map((b) => `<span><i style="background:${b.fill};border:1px solid ${C.line}"></i>${b.name} ${b.lo}–${b.hi === 100 ? 100 : b.hi - 1}</span>`).join('');
  return `<section class="section">${head(n, 'Start here', 'Three ways buyers find you. *Each one is scored here.*',
    'Search has split into three places a buyer can meet your business. They overlap, but each needs different work, and a site can be strong in one and invisible in another.')}
  <div class="defs">${cards}</div>
  <div class="stack">${stack}<div>
    <h3 style="margin-top:0">How they fit together</h3>
    <p style="font-size:11px;line-height:1.5">SEO is the foundation: if search engines can’t read and trust your site, nothing else works. AEO and GEO are built on top of it. Ranking first no longer guarantees you’re the one an AI tool names, so all three are measured separately.</p>
    <table class="data" style="margin-top:8px"><thead><tr><th>Index</th><th>Who reads from it</th></tr></thead><tbody>
    ${engines.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table>
  </div></div>
  <h3>How to read the scores</h3>
  <p style="font-size:11px">The <b>AI Visibility Score</b> (out of 100) rolls five weighted pillars into one number. SEO, AEO and GEO are each scored out of 10. All scores use the same four bands:</p>
  <div class="legend">${bandsRow}</div></section>`;
}

export const checks = (items, cls = '') => `<div class="checks">${items.map((i) =>
  `<div class="chk ${cls}"><div class="ic">${checkSvg}</div><div><h4>${esc(i.title)}</h4><p>${md(i.text)}</p></div></div>`).join('')}</div>`;

export const statStrip = (stats) => `<div class="stats${stats.length === 3 ? ' three' : ''}">${stats.map((s) =>
  `<div class="stat"><div class="n">${s.from != null ? `<span>${esc(s.from)}</span><i>→</i>` : ''}${esc(s.to)}</div><div class="l">${md(s.label)}</div></div>`).join('')}</div>`;

/** Waffle of finding counts. groups: [{n, label, colour}] */
export function waffle(groups) {
  const total = groups.reduce((a, g) => a + g.n, 0);
  const cols = Math.min(Math.max(total, 24), 40);
  return `<div class="waffle" style="grid-template-columns:repeat(${cols},1fr)">${groups.map((g) => `<i style="background:${g.colour}"></i>`.repeat(g.n)).join('')}</div>
  <div class="wleg" style="grid-template-columns:repeat(${groups.length},1fr)">${groups.map((g) =>
    `<div style="border-color:${g.colour}"><div class="n">${g.n}</div><div class="l">${esc(g.label)}</div></div>`).join('')}</div>`;
}

export const progRows = (rows) => rows.map((r) => `<div class="prog"><div><h4>${esc(r.area)}</h4><div class="bar2"><i style="width:${r.progress}%"></i></div></div>
  <div class="two"><div><b style="color:${C.tealD}">Done</b>${md(r.done)}</div><div><b style="color:#9a5121">Left</b>${md(r.left)}</div></div></div>`).join('');

export const dotList = (items, colour) => `<ul class="ol" style="--c:${colour}">${items.map((i) =>
  `<li><div><b>${esc(i.area)}</b><br>${md(i.detail)}</div></li>`).join('')}</ul>`;

/** Numbered steps with an effort bar on a log scale. step: {title, detail, hours (0 = ongoing), effort, tag?: {text, kind}} */
export function steps(list) {
  const lg = (h) => (h ? Math.min(100, (Math.log(h + 1) / Math.log(33)) * 100) : 100);
  return list.map((s, i) => `<div class="step"><div class="no">${String(i + 1).padStart(2, '0')}</div>
    <div><h4>${esc(s.title)} ${s.tag ? `<span class="pill p-${s.tag.kind || 'teal'}">${esc(s.tag.text)}</span>` : ''}</h4><p>${md(s.detail)}</p></div>
    <div><div class="eff">${esc(s.effort)}</div><div class="effbar"><i class="${s.hours ? '' : 'ongoing'}" style="width:${lg(s.hours)}%"></i></div></div></div>`).join('');
}

/** 30/60/90 swimlane. lanes: [{name, colour, cells: [[items]|null x3]}]; an item starting with "!" is a threshold fix. */
export function swimlane(lanes) {
  let h = '<div></div>' + [['Days 1–30', 'Foundation'], ['Days 31–60', 'Build'], ['Days 61–90', 'Compound']]
    .map(([d, k]) => `<div class="ph"><span>${k}</span><b>${d}</b></div>`).join('');
  lanes.forEach((l) => {
    h += `<div class="ln" style="--c:${l.colour}">${esc(l.name)}</div>`;
    l.cells.forEach((cell) => {
      h += cell && cell.length
        ? `<div class="cell" style="--c:${l.colour}"><ul>${cell.map((it) => it.startsWith('!') ? `<li class="key">${esc(it.slice(1))}</li>` : `<li>${esc(it)}</li>`).join('')}</ul></div>`
        : `<div class="cell empty" style="--c:${C.line}">Nothing new planned</div>`;
    });
  });
  return `<div class="swim">${h}</div><p class="src"><span style="display:inline-block;width:7px;height:7px;background:${C.lime};border-radius:50%;margin-right:5px"></span>Threshold fixes. Everything downstream waits on them.</p>`;
}

export const rhythm = (items) => `<div class="rhythm">${items.map((i) => `<div><div class="n">${esc(i.n)}</div><div class="l">${esc(i.l)}</div></div>`).join('')}</div>`;

export const caveats = (items) => items.map((c) => `<div class="caveat"><div class="ic">!</div><div><b>${esc(c.title)}</b> ${md(c.text)}</div></div>`).join('');

export const callout = (text, kind = '') => `<div class="callout ${kind}">${md(text)}</div>`;

/** Signal table with status pills. rows: {signal, finding, status: good|needs|missing|verify} */
export function signalTable(rows) {
  const lab = { good: 'Good', needs: 'Needs attention', missing: 'Missing', verify: 'Verify' };
  return `<table class="data"><thead><tr><th style="width:26%">Signal</th><th>What we found</th><th style="text-align:right">Status</th></tr></thead><tbody>
  ${rows.map((r) => `<tr><td>${esc(r.signal)}</td><td>${md(r.finding)}</td><td class="st"><span class="pill p-${r.status}">${lab[r.status] || esc(r.status)}</span></td></tr>`).join('')}</tbody></table>`;
}

/** Generic table. cols: [{h, k, w?, pill?: (v)=>class}] */
export function table(cols, rows, { groupKey = null } = {}) {
  let last = null;
  const body = rows.map((r) => {
    let g = '';
    if (groupKey && r[groupKey] !== last) { last = r[groupKey]; g = `<tr class="group"><td colspan="${cols.length}">${esc(last)}</td></tr>`; }
    return g + `<tr>${cols.map((c) => {
      const v = r[c.k];
      if (c.pill) return `<td class="st" style="text-align:left"><span class="pill p-${c.pill(v)}">${esc(v)}</span></td>`;
      return `<td${c.mono ? ' class="mono"' : ''}>${md(v)}</td>`;
    }).join('')}</tr>`;
  }).join('');
  return `<table class="data"><thead><tr>${cols.map((c) => `<th${c.w ? ` style="width:${c.w}"` : ''}>${esc(c.h)}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table>`;
}
