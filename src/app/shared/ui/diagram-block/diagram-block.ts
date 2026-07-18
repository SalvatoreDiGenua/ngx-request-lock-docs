import { Component, input } from '@angular/core';

/**
 * Non-code visual block for architecture and flow diagrams.
 *
 * This component intentionally avoids the code-snippet treatment: no syntax
 * highlighting, no copy button, and no `language` chrome. It renders a
 * monospaced, preformatted block optimized for Unicode / ASCII flow diagrams
 * (box-drawing characters, arrows, etc.), and exposes an accessible caption
 * and figure title.
 *
 * The block is fully SSR-safe (pure static markup) and reuses the docs app's
 * light/dark surface tokens so it stays consistent with surrounding content.
 *
 * Usage:
 *   <ngx-diagram-block
 *     [content]="diagram"
 *     title="Data flow"
 *     ariaLabel="Request lock data flow diagram"
 *   />
 */
@Component({
  selector: 'ngx-diagram-block',
  template: `
    <figure
      class="my-6 overflow-hidden rounded-lg border border-slate-300 bg-slate-50 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      @if (title(); as t) {
        <figcaption
          class="border-b border-slate-200 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
        >
          {{ t }}
        </figcaption>
      }

      <div
        role="img"
        [attr.aria-label]="ariaLabel() ?? title() ?? 'Architecture diagram'"
        class="overflow-x-auto px-4 py-4"
      >
        <pre
          class="whitespace-pre font-mono text-sm leading-6 text-slate-800 dark:text-slate-200"
          >{{ content() }}</pre>
      </div>

      @if (caption(); as c) {
        <p
          class="border-t border-slate-200 bg-slate-100/60 px-4 py-2 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300"
        >
          {{ c }}
        </p>
      }
    </figure>
  `,
})
export class DiagramBlockComponent {
  /** Raw text of the diagram (Unicode / ASCII flow). Preformatted. */
  public readonly content = input.required<string>();

  /** Optional short title shown above the diagram (e.g. "Data flow"). */
  public readonly title = input<string | null>(null);

  /** Optional caption shown below the diagram. */
  public readonly caption = input<string | null>(null);

  /**
   * Accessible label announced by screen readers. Falls back to `title()`,
   * then to a generic label. Diagrams are conveyed as images because
   * assistive tech would otherwise read the box-drawing characters.
   */
  public readonly ariaLabel = input<string | null>(null);
}
