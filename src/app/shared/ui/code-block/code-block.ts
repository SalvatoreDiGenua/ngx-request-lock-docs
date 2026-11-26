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
        padding: 1.25rem 1.5rem;
        overflow-x: auto;
        font-size: 0.875rem;
        line-height: 1.7;
        background-color: transparent !important;
      }

      :host ::ng-deep pre.shiki:focus-visible {
        outline: 2px solid var(--color-ring-inverse);
        outline-offset: -2px;
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
        color: var(--color-code-line-number);
        user-select: none;
      }

      :host ::ng-deep .line-numbers .line:hover {
        background-color: var(--color-code-line-hover);
      }

      .code-body {
        background: var(--color-code-canvas);
      }

      .code-body.is-collapsed {
        max-height: 25rem;
        overflow-y: auto;
      }

      .code-body:focus-visible {
        outline: 2px solid var(--color-ring-inverse);
        outline-offset: -2px;
      }
    `,
  ],
  template: `
    <figure
      class="my-5 min-w-0 overflow-hidden rounded-xl bg-slate-900 text-slate-100 ring-1 ring-slate-700/80 dark:ring-slate-600/70"
    >
      <figcaption
        class="flex min-h-12 items-center justify-between gap-3 bg-slate-800 px-4 py-2 text-sm text-slate-200 sm:px-6"
      >
        <span class="font-medium">{{ displayLanguage() }}</span>
        <div class="flex items-center gap-3">
          @if (copyFailed()) {
            <span role="status" class="text-sm text-amber-200">{{
              'common.copyFailed' | transloco
            }}</span>
          }
          <button
            type="button"
            class="inline-flex min-h-8 items-center gap-2 rounded-md px-2.5 py-1 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            [attr.aria-label]="
              (copied() ? 'common.copied' : 'common.copyAriaLabel') | transloco
            "
            (click)="copy()"
          >
            @if (copied()) {
              <svg
                class="h-4 w-4 text-emerald-300"
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
              <span class="text-emerald-300">{{
                'common.copied' | transloco
              }}</span>
            } @else {
              <svg
                class="h-4 w-4 text-slate-200"
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
        </div>
      </figcaption>

      <div
        class="code-body"
        [class.is-collapsed]="isLong() && !expanded()"
        [attr.tabindex]="isLong() && !expanded() ? 0 : null"
      >
        @if (highlightedHtml(); as html) {
          <div [class.line-numbers]="lineNumbers()" [innerHTML]="html"></div>
        } @else {
          <pre
            tabindex="0"
            class="overflow-x-auto px-6 py-5 text-sm leading-relaxed focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-300"
            [class.line-numbers]="lineNumbers()"
          ><code>@for (line of codeLines(); track $index) {<span class="line">{{ line }}</span>}</code></pre>
        }
      </div>

      @if (isLong()) {
        <button
          type="button"
          class="flex w-full items-center justify-center bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-300"
          [attr.aria-expanded]="expanded()"
          (click)="expanded.update((value) => !value)"
        >
          {{
            (expanded() ? 'common.collapseCode' : 'common.showFullCode')
              | transloco
          }}
        </button>
      }
    </figure>
  `,
})
export class CodeBlockComponent {
  public readonly code = input.required<string>();
  public readonly language = input<string | null>(null);
  public readonly lineNumbers = input<boolean>(true);

  protected readonly copied = signal(false);
  protected readonly copyFailed = signal(false);
  protected readonly highlightedHtml = signal<SafeHtml | null>(null);
  protected readonly codeLines = computed(() => this.code().split('\n'));
  protected readonly isLong = computed(() => this.codeLines().length > 18);
  protected readonly expanded = signal(false);
  protected readonly displayLanguage = computed(() => {
    switch (normalizeLanguage(this.language())) {
      case 'typescript':
        return 'TypeScript';
      case 'bash':
        return 'Bash';
      case 'css':
        return 'CSS';
      case 'html':
        return 'HTML';
      case 'json':
        return 'JSON';
    }
  });

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
      this.copyFailed.set(false);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      this.copyFailed.set(true);
    }
  }
}
