import {
  Component,
  effect,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslocoPipe } from '@jsverse/transloco';

import { highlightToHtml, normalizeLanguage } from './shiki-highlighter';

/**
 * Syntax-highlighted code snippet with a copy-to-clipboard button.
 *
 * Highlighting uses Shiki with the `github-dark` theme. Shiki is loaded
 * via a dynamic `import('shiki')` so it never runs during Angular SSR /
 * prerendering: on the server we render the raw code inside a plain
 * `<pre><code>` block, and on the client the effect swaps in the
 * highlighted HTML once Shiki resolves.
 *
 * Shiki emits `<span style="color: #..."></span>` tokens with the palette
 * baked into inline `style` attributes. Angular's default HTML sanitizer
 * strips those `style` attributes when binding to `[innerHTML]`, which is
 * why we run the highlighted HTML through
 * `DomSanitizer.bypassSecurityTrustHtml`. The input to Shiki is the
 * caller-provided `code` string, which is treated as static content in
 * this docs app; Shiki does not evaluate it, only tokenizes it.
 *
 * The `code` and `language` public API is preserved. This component is
 * intended for code snippets only. For non-code visuals such as ASCII
 * flow diagrams, use `ngx-diagram-block` instead.
 */
@Component({
  selector: 'ngx-code-block',
  imports: [TranslocoPipe],
  styles: [
    `
      /*
       * Shiki emits its own <pre class="shiki github-dark"> element with
       * inline token colors. We only override its layout so it aligns with
       * the surrounding <figure> chrome; the token colors themselves come
       * from Shiki's inline styles and must not be touched.
       */
      :host ::ng-deep pre.shiki {
        margin: 0;
        padding: 1rem;
        overflow-x: auto;
        font-size: 0.875rem;
        line-height: 1.625;
        background-color: transparent !important;
      }
    `,
  ],
  template: `
    <figure
      class="relative my-4 overflow-hidden rounded-lg border border-slate-300 bg-slate-950 text-slate-100 shadow-sm dark:border-slate-700"
    >
      @if (language(); as lang) {
        <figcaption
          class="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2 text-xs font-mono uppercase tracking-wide text-slate-200"
        >
          <span>{{ lang }}</span>
          <button
            type="button"
            class="rounded px-2 py-1 text-xs font-sans font-medium text-slate-100 hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            [attr.aria-label]="'common.copyAriaLabel' | transloco"
            (click)="copy()"
          >
            {{
              copied()
                ? ('common.copied' | transloco)
                : ('common.copy' | transloco)
            }}
          </button>
        </figcaption>
      }

      @if (highlightedHtml(); as html) {
        <div [innerHTML]="html"></div>
      } @else {
        <pre
          class="overflow-x-auto px-4 py-4 text-sm leading-relaxed"
        ><code>{{ code() }}</code></pre>
      }
    </figure>
  `,
})
export class CodeBlockComponent {
  public readonly code = input.required<string>();
  public readonly language = input<string | null>(null);

  protected readonly copied = signal(false);
  protected readonly highlightedHtml = signal<SafeHtml | null>(null);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly sanitizer = inject(DomSanitizer);

  constructor() {
    // Re-highlight whenever the code or language inputs change. Runs only
    // in the browser so SSR falls back to the raw <pre><code> template.
    effect((onCleanup) => {
      const source = this.code();
      const lang = normalizeLanguage(this.language());
      if (!this.isBrowser) {
        return;
      }
      let cancelled = false;
      onCleanup(() => {
        cancelled = true;
      });
      void highlightToHtml(source, lang).then((html) => {
        if (cancelled || html === null) {
          return;
        }
        // Shiki output is a fully-controlled <pre>/<code>/<span> tree
        // with inline style attributes. Bypass sanitization so those
        // token colors are not stripped by Angular's default sanitizer.
        this.highlightedHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
      });
    });
  }

  protected async copy(): Promise<void> {
    if (!this.isBrowser) {
      return;
    }
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // clipboard unavailable, silently ignore
    }
  }
}
