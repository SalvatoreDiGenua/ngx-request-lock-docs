import {
  Component,
  computed,
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
 * Line numbers: Shiki wraps each highlighted line in a `<span class="line">`
 * by default, so numbering is added purely with CSS counters (no Shiki
 * transformer needed). For the SSR / no-JS fallback, the raw code is split
 * into lines in the template and each one gets the same `.line` class so
 * the numbering CSS applies uniformly in both cases.
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

      /*
       * Line numbers, applied identically to Shiki's highlighted output
       * (each line already wrapped in <span class="line">) and to the
       * SSR fallback (lines split manually in the template).
       */
      :host ::ng-deep .line-numbers code {
        counter-reset: line;
        display: block;
      }
      :host ::ng-deep .line-numbers .line {
        display: inline-block;
        width: 100%;
      }
      :host ::ng-deep .line-numbers .line::before {
        counter-increment: line;
        content: counter(line);
        display: inline-block;
        box-sizing: content-box;
        width: 2rem;
        margin-right: 1rem;
        padding-right: 0.5rem;
        text-align: right;
        color: rgb(148 163 184 / 0.5); /* slate-400/50 */
        user-select: none;
      }
    `,
  ],
  template: `
    <figure
      class="relative my-4 overflow-hidden rounded-lg border border-slate-300 bg-slate-950 text-slate-100 shadow-sm dark:border-slate-700"
    >
      @if (language(); as lang) {
        <figcaption
          class="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-2 text-xs font-mono uppercase tracking-wider text-slate-300 backdrop-blur-xs"
        >
          <span class="font-semibold text-sky-400">{{ lang }}</span>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-sans font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 cursor-pointer"
            [attr.aria-label]="'common.copyAriaLabel' | transloco"
            (click)="copy()"
          >
            @if (copied()) {
              <svg
                class="h-3.5 w-3.5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2.5"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span class="text-emerald-400">{{
                'common.copied' | transloco
              }}</span>
            } @else {
              <svg
                class="h-3.5 w-3.5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{{ 'common.copy' | transloco }}</span>
            }
          </button>
        </figcaption>
      }

      @if (highlightedHtml(); as html) {
        <div [class.line-numbers]="lineNumbers()" [innerHTML]="html"></div>
      } @else {
        <pre
          class="overflow-x-auto px-4 py-4 text-sm leading-relaxed"
          [class.line-numbers]="lineNumbers()"
        >
          <code>
            @for (line of codeLines(); track $index) {
              <span class="line">{{ line }}</span>
            }
          </code>
        </pre>
      }
    </figure>
  `,
})
export class CodeBlockComponent {
  public readonly code = input.required<string>();
  public readonly language = input<string | null>(null);
  public readonly lineNumbers = input<boolean>(true);

  protected readonly copied = signal(false);
  protected readonly highlightedHtml = signal<SafeHtml | null>(null);
  protected readonly codeLines = computed(() => this.code().split('\n'));

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
