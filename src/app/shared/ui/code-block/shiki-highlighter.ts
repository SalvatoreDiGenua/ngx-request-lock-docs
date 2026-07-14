/**
 * Shared, lazy Shiki highlighter for the docs app.
 *
 * Shiki is dynamically imported so it is only pulled into the browser bundle
 * and never executed during Angular SSR / prerendering.
 *
 * We render every snippet with the `github-dark` theme. The `<figure>`
 * wrapper in the code-block component already has a dark surface, so a
 * single dark theme keeps the snippet visually consistent in both light
 * and dark app modes and simplifies the CSS surface.
 */

/** Languages currently used by the docs. Keep this list minimal. */
export type ShikiLang = 'typescript' | 'bash' | 'css' | 'html' | 'json';

const SUPPORTED_LANGS: readonly ShikiLang[] = [
  'typescript',
  'bash',
  'css',
  'html',
  'json',
];

/** Normalize aliases and unknown values to a supported Shiki language. */
export function normalizeLanguage(input: string | null | undefined): ShikiLang {
  if (!input) {
    return 'typescript';
  }
  const lower = input.toLowerCase();
  switch (lower) {
    case 'ts':
    case 'typescript':
      return 'typescript';
    case 'js':
    case 'javascript':
      // JS grammar is a subset of TS; render as TS to keep the bundle small.
      return 'typescript';
    case 'sh':
    case 'shell':
    case 'bash':
      return 'bash';
    case 'css':
      return 'css';
    case 'html':
    case 'xml':
      return 'html';
    case 'json':
      return 'json';
    default:
      return SUPPORTED_LANGS.includes(lower as ShikiLang)
        ? (lower as ShikiLang)
        : 'typescript';
  }
}

/**
 * Highlight `code` for the given language and return an HTML string.
 * Safe to call only in the browser. Returns `null` on failure.
 *
 * The output is a `<pre class="shiki github-dark">...</pre>` block with
 * inline `style="color: #..."` attributes on each token. The consumer
 * must render it via a sanitizer bypass (see `CodeBlockComponent`),
 * otherwise Angular's default HTML sanitizer strips the inline styles
 * and the tokens appear uncolored.
 */
export async function highlightToHtml(
  code: string,
  language: ShikiLang,
): Promise<string | null> {
  try {
    const { codeToHtml } = await import('shiki');
    return await codeToHtml(code, {
      lang: language,
      theme: 'github-dark',
    });
  } catch {
    return null;
  }
}
