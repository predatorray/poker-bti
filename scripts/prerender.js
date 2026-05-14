/* eslint-disable */
// Build-time SEO prerender. For each known route, writes a static
// <route>/index.html with route-specific <title>, meta description, canonical,
// Open Graph, and Twitter Card tags injected into <head>. Also emits sitemap.xml.
//
// The body is unchanged — React hydrates as usual. The goal here is real URLs
// on GitHub Pages (no SPA-404 fallback hack) plus per-route head metadata so
// crawlers and social previews see the right thing.

const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');
const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const HOMEPAGE = (pkg.homepage || '').replace(/\/$/, '');

const TYPES = {
  NSGI: { name: 'The Cyborg', tagline: 'Tight, aggressive, solver-pilled, dead inside.' },
  NSGT: { name: 'The Cracked Quant', tagline: 'Plays GTO until KK loses to AA. Then prints flames.' },
  NSVI: { name: 'The Sniper', tagline: 'One orbit. One read. One trigger pull.' },
  NSVT: { name: 'The Hero-Caller', tagline: 'He just knew. (Narrator: he did not.)' },
  NCGI: { name: 'The Calculator', tagline: 'Folds correctly. Loses correctly. Files taxes correctly.' },
  NCGT: { name: 'The Sad Solver', tagline: 'Right fold. Wrong vibes.' },
  NCVI: { name: 'The Monk', tagline: 'Has not blinked since 2019.' },
  NCVT: { name: 'The Whiner', tagline: 'The bad-beat story is already drafted.' },
  MSGI: { name: 'The Crusher', tagline: 'Modern LAG. HUD on. Brain on. Soul intact.' },
  MSGT: { name: 'The Heater Demon', tagline: '+12 buy-ins, -15 buy-ins, +0 regrets.' },
  MSVI: { name: 'The Gunslinger', tagline: 'Stares down the river card before it lands.' },
  MSVT: { name: 'The Maniac', tagline: 'Shoves dark. Apologizes never.' },
  MCGI: { name: 'The Station Professor', tagline: 'Calls everything. Can explain every call. Still down.' },
  MCGT: { name: 'The Galaxy-Brain Donk', tagline: 'Had a blocker. To the wrong hand.' },
  MCVI: { name: 'The Zen Fish', tagline: 'Smiles, calls, tips the dealer.' },
  MCVT: { name: 'The Action Junkie', tagline: 'Came to gamble. Is gambling. Will keep gambling.' },
};

const SITE_NAME = 'Poker BTI';
const SITE_DESC =
  "Sixteen Texas Hold'em personalities. Twelve quick questions. Discover the poker player you really are.";

const routes = [
  { path: '/', title: `${SITE_NAME} — Poker Behavior Type Indicator`, description: SITE_DESC },
  { path: '/test', title: `Take the Test — ${SITE_NAME}`, description: "Answer 12 quick questions to discover your Texas Hold'em player archetype." },
  ...Object.keys(TYPES).map((code) => ({
    path: `/result/${code}`,
    title: `${TYPES[code].name} (${code}) — ${SITE_NAME}`,
    description: `${TYPES[code].tagline} Discover the poker player archetype ${code}.`,
  })),
];

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectMeta(html, { title, description, url }) {
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
  if (/<meta\s+name="description"[^>]*>/.test(out)) {
    out = out.replace(/<meta\s+name="description"[^>]*>/, `<meta name="description" content="${d}" />`);
  }
  const block = [
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
  ].map((line) => `    ${line}`).join('\n');
  return out.replace('</head>', `${block}\n  </head>`);
}

const indexHtml = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');

for (const route of routes) {
  const url = HOMEPAGE + route.path;
  const html = injectMeta(indexHtml, { ...route, url });
  const outPath =
    route.path === '/'
      ? path.join(BUILD_DIR, 'index.html')
      : path.join(BUILD_DIR, route.path, 'index.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
}

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.map((r) => `  <url><loc>${HOMEPAGE + r.path}</loc></url>`).join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sitemap);

console.log(`prerender: wrote ${routes.length} HTML files + sitemap.xml`);
