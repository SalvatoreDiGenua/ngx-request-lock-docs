#!/usr/bin/env node
/**
 * Generates public/sitemap.xml.
 *
 * - URLs come from the routes declared in src/app/core/layout/nav-items.ts,
 *   so a new page shows up in the sitemap as soon as it is in the nav.
 * - Every URL is written in its canonical, slash-terminated form (the same
 *   one used by <link rel="canonical"> and the JSON-LD).
 * - <lastmod> is the date of the last commit that really changed the page:
 *     1. the page's own folder (component, SEO data, ...);
 *     2. its section of public/i18n/en.json (where most of the copy lives).
 *   Only that section is compared, so editing the "problem" text does not
 *   touch the lastmod of "architecture".
 *
 * Safety: dates are never invented. If git history is missing or shallow
 * (e.g. some CI clones), the script leaves the committed sitemap untouched
 * and exits successfully, so it can never break a build.
 *
 * Usage: node scripts/generate-sitemap.mjs [--dry-run]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://ngx-request-lock-docs.netlify.app';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const NAV_FILE = 'src/app/core/layout/nav-items.ts';
const I18N_FILE = 'public/i18n/en.json';
const OUT_FILE = resolve(ROOT, 'public/sitemap.xml');
const dryRun = process.argv.includes('--dry-run');

const git = (...args) =>
  execFileSync('git', args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();

const skip = (reason) => {
  console.warn(`[sitemap] ${reason} - keeping the committed sitemap.xml.`);
  process.exit(0);
};

// ---- routes ---------------------------------------------------------------
const navSource = readFileSync(resolve(ROOT, NAV_FILE), 'utf8');
const routes = [...navSource.matchAll(/route:\s*'([^']+)'/g)].map((m) => m[1]);
if (routes.length === 0) {
  console.error(`[sitemap] no routes found in ${NAV_FILE}`);
  process.exit(1);
}

const canonicalPath = (route) =>
  route === '/' ? '/' : `${route.replace(/\/+$/, '')}/`;
const pageDir = (route) => (route === '/' ? 'home' : route.slice(1));
const i18nKey = (route) =>
  pageDir(route).replace(/-([a-z])/g, (_, c) => c.toUpperCase());

// ---- git availability -----------------------------------------------------
try {
  if (git('rev-parse', '--is-inside-work-tree') !== 'true')
    skip('not a git work tree');
  if (git('rev-parse', '--is-shallow-repository') === 'true')
    skip('shallow clone: history is not reliable');
} catch {
  skip('git is not available');
}

// ---- dates ----------------------------------------------------------------
const lastCommitDate = (path) =>
  git('log', '-1', '--format=%cs', '--', path) || null;

const readJsonAt = (sha, path) => {
  try {
    return JSON.parse(git('show', `${sha}:${path}`));
  } catch {
    return null;
  }
};

/** Date of the newest commit that changed `key` inside en.json. */
const lastI18nSectionDate = (key) => {
  const log = git('log', '--format=%H %cs', '--', I18N_FILE);
  if (!log) return null;
  for (const line of log.split('\n')) {
    const [sha, date] = line.split(' ');
    const after = readJsonAt(sha, I18N_FILE);
    const before = readJsonAt(`${sha}^`, I18N_FILE);
    if (!after) continue;
    if (!before || JSON.stringify(after[key]) !== JSON.stringify(before[key])) {
      return date;
    }
  }
  return null;
};

const newest = (...dates) => dates.filter(Boolean).sort().at(-1) ?? null;

const entries = routes.map((route) => {
  const dir = `src/app/pages/${pageDir(route)}`;
  const lastmod = newest(
    existsSync(resolve(ROOT, dir)) ? lastCommitDate(dir) : null,
    lastI18nSectionDate(i18nKey(route)),
  );
  return { loc: `${ORIGIN}${canonicalPath(route)}`, lastmod };
});

// ---- output ---------------------------------------------------------------
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries.flatMap(({ loc, lastmod }) => [
    '  <url>',
    `    <loc>${loc}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    '  </url>',
  ]),
  '</urlset>',
  '',
].join('\n');

const current = existsSync(OUT_FILE) ? readFileSync(OUT_FILE, 'utf8') : '';
if (current === xml) {
  console.log('[sitemap] up to date.');
} else if (dryRun) {
  console.log(xml);
} else {
  writeFileSync(OUT_FILE, xml);
  console.log(`[sitemap] wrote ${entries.length} URLs to public/sitemap.xml`);
}
