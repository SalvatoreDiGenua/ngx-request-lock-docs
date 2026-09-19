#!/usr/bin/env node
/**
 * SEO regression check on the *prerendered* build output (what crawlers get
 * before running any JavaScript).
 *
 * Run `npm run build` first, then `npm run check:seo`.
 * Exits with code 1 if any check fails.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://ngx-request-lock-docs.netlify.app';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist/ngx-request-lock-docs/browser');

const TITLE_MAX = 65;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 170;

let failures = 0;
const pass = (msg) => console.log(`  ok   ${msg}`);
const fail = (msg) => {
  failures++;
  console.log(`  FAIL ${msg}`);
};
const check = (condition, okMsg, failMsg) =>
  condition ? pass(okMsg) : fail(failMsg ?? okMsg);

if (!existsSync(DIST)) {
  console.error(`Build output not found: ${DIST}\nRun "npm run build" first.`);
  process.exit(1);
}

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const attr = (html, tagRegex, name) => {
  const tag = html.match(tagRegex)?.[0];
  const value = tag?.match(new RegExp(`${name}="([^"]*)"`))?.[1];
  return value === undefined ? null : decode(value);
};

// ---- sitemap --------------------------------------------------------------
console.log('sitemap.xml');
const sitemap = readFileSync(resolve(DIST, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: m[1].match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '',
  lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? null,
}));
const locs = new Set(urls.map((u) => u.loc));

check(urls.length > 0, `${urls.length} URLs listed`, 'no URLs found');
check(locs.size === urls.length, 'no duplicate <loc>');
for (const { loc, lastmod } of urls) {
  check(
    loc.startsWith(ORIGIN) && loc.endsWith('/'),
    `canonical form: ${loc}`,
    `not slash-terminated / wrong origin: ${loc}`,
  );
  if (lastmod) {
    check(
      /^\d{4}-\d{2}-\d{2}$/.test(lastmod) && !Number.isNaN(Date.parse(lastmod)),
      `lastmod valid (${lastmod}) for ${loc}`,
      `invalid lastmod "${lastmod}" for ${loc}`,
    );
  }
}

// ---- per-page checks --------------------------------------------------------
const titles = new Map();
const descriptions = new Map();

for (const { loc } of urls) {
  const path = loc.slice(ORIGIN.length); // "/" or "/problem/"
  const file = resolve(DIST, path.replace(/^\/|\/$/g, ''), 'index.html');
  console.log(`\n${loc}`);
  if (!existsSync(file)) {
    fail(`prerendered file missing: ${file.replace(`${DIST}/`, '')}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');

  const titleTags = html.match(/<title>[^<]*<\/title>/g) ?? [];
  const title = decode(titleTags[0]?.replace(/<\/?title>/g, '') ?? '');
  check(
    titleTags.length === 1,
    'exactly one <title>',
    `${titleTags.length} <title> tags`,
  );
  check(
    title.length > 0 && title.length <= TITLE_MAX,
    `title length ${title.length}/${TITLE_MAX}: "${title}"`,
    `title length ${title.length} (max ${TITLE_MAX}): "${title}"`,
  );
  check(!/^home\b/i.test(title), 'title is not the generic "Home | ..."');
  if (titles.has(title)) fail(`title duplicated with ${titles.get(title)}`);
  titles.set(title, loc);

  const description =
    attr(html, /<meta[^>]*name="description"[^>]*>/, 'content') ?? '';
  check(
    description.length >= DESCRIPTION_MIN &&
      description.length <= DESCRIPTION_MAX,
    `description length ${description.length}`,
    `description length ${description.length} (want ${DESCRIPTION_MIN}-${DESCRIPTION_MAX})`,
  );
  if (descriptions.has(description))
    fail(`description duplicated with ${descriptions.get(description)}`);
  descriptions.set(description, loc);

  const canonicals = html.match(/<link[^>]*rel="canonical"[^>]*>/g) ?? [];
  const canonical = attr(canonicals[0] ?? '', /<link[^>]*>/, 'href');
  check(
    canonicals.length === 1,
    'exactly one canonical',
    `${canonicals.length} canonical tags`,
  );
  check(
    canonical === loc,
    'canonical matches the sitemap URL',
    `canonical "${canonical}" != sitemap "${loc}"`,
  );

  const ogUrl = attr(html, /<meta[^>]*property="og:url"[^>]*>/, 'content');
  check(
    ogUrl === loc,
    'og:url matches the sitemap URL',
    `og:url "${ogUrl}" != "${loc}"`,
  );

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  check(
    h1 === 1,
    'exactly one <h1> in the prerendered HTML',
    `${h1} <h1> in the prerendered HTML`,
  );

  check(
    !/<meta[^>]*name="keywords"/.test(html),
    'no meta keywords (ignored by Google)',
  );

  const ldBlocks = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ];
  check(
    ldBlocks.length > 0,
    `${ldBlocks.length} JSON-LD block(s)`,
    'no JSON-LD found',
  );
  for (const [, json] of ldBlocks) {
    let data;
    try {
      data = JSON.parse(json);
    } catch {
      fail('JSON-LD block is not valid JSON');
      continue;
    }
    const internal = [];
    (function walk(node) {
      if (typeof node === 'string') {
        if (node.startsWith(ORIGIN)) internal.push(node);
      } else if (node && typeof node === 'object') {
        Object.values(node).forEach(walk);
      }
    })(data);
    for (const u of internal) {
      const isAsset = /\.[a-z0-9]+$/i.test(new URL(u).pathname);
      check(
        isAsset || locs.has(u),
        `JSON-LD URL is canonical: ${u}`,
        `JSON-LD URL not in sitemap / no trailing slash: ${u}`,
      );
    }
  }
}

// ---- robots / llms / redirects ------------------------------------------------
console.log('\nrobots.txt / llms.txt / _redirects');
const robots = readFileSync(resolve(DIST, 'robots.txt'), 'utf8');
check(
  robots.includes(`Sitemap: ${ORIGIN}/sitemap.xml`),
  'robots.txt declares the sitemap',
);
check(
  !/^Disallow:\s*\/\s*$/m.test(robots),
  'robots.txt does not block the whole site',
);

if (existsSync(resolve(DIST, 'llms.txt'))) {
  const llms = readFileSync(resolve(DIST, 'llms.txt'), 'utf8');
  const internal = [
    ...llms.matchAll(
      /\]\((https:\/\/ngx-request-lock-docs\.netlify\.app[^)]*)\)/g,
    ),
  ].map((m) => m[1]);
  for (const u of internal)
    check(
      locs.has(u),
      `llms.txt link is canonical: ${u}`,
      `llms.txt link not in sitemap: ${u}`,
    );
} else {
  fail('llms.txt missing');
}

const redirects = readFileSync(resolve(DIST, '_redirects'), 'utf8');
check(
  !/^\/[a-z-]+\/\s+\/[a-z-]+\s+301/m.test(redirects),
  "no slash-stripping redirect that would fight Netlify's own 301 (redirect loop risk)",
);
check(existsSync(resolve(DIST, '_headers')), '_headers present');

console.log(
  failures === 0
    ? '\nAll SEO checks passed.'
    : `\n${failures} check(s) failed.`,
);
process.exit(failures === 0 ? 0 : 1);
