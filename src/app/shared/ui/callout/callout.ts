import { Component, computed, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export type CalloutVariant = 'info' | 'note' | 'tip' | 'warning';

interface VariantStyle {
  readonly container: string;
  readonly title: string;
  readonly iconClass: string;
  /** Transloco key for the default label. */
  readonly labelKey: string;
}

const VARIANTS: Record<CalloutVariant, VariantStyle> = {
  info: {
    container:
      'border-sky-400 bg-sky-50/80 text-sky-950 dark:border-sky-500 dark:bg-sky-950/40 dark:text-sky-100',
    title: 'text-sky-900 dark:text-sky-200',
    iconClass: 'text-sky-600 dark:text-sky-400',
    labelKey: 'callout.info',
  },
  note: {
    container:
      'border-slate-400 bg-slate-50 text-slate-900 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100',
    title: 'text-slate-800 dark:text-slate-200',
    iconClass: 'text-slate-600 dark:text-slate-400',
    labelKey: 'callout.note',
  },
  tip: {
    container:
      'border-emerald-400 bg-emerald-50/80 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-100',
    title: 'text-emerald-900 dark:text-emerald-200',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
    labelKey: 'callout.tip',
  },
  warning: {
    container:
      'border-amber-400 bg-amber-50/80 text-amber-950 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-100',
    title: 'text-amber-900 dark:text-amber-200',
    iconClass: 'text-amber-600 dark:text-amber-400',
    labelKey: 'callout.warning',
  },
};

@Component({
  selector: 'ngx-callout',
  imports: [TranslocoPipe],
  template: `
    <aside
      role="note"
      class="my-6 rounded-xl border-l-4 p-4 text-sm shadow-xs transition-all"
      [class]="style().container"
    >
      <div class="flex items-start gap-3">
        <div class="mt-0.5 shrink-0" [class]="style().iconClass">
          @switch (variant()) {
            @case ('tip') {
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            }
            @case ('warning') {
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            }
            @case ('note') {
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            }
            @default {
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          }
        </div>
        <div class="min-w-0 flex-1">
          <p
            class="mb-1 text-xs font-bold uppercase tracking-wider"
            [class]="style().title"
          >
            {{ title() ?? (style().labelKey | transloco) }}
          </p>
          <div class="prose-sm leading-relaxed">
            <ng-content />
          </div>
        </div>
      </div>
    </aside>
  `,
})
export class CalloutComponent {
  public readonly variant = input<CalloutVariant>('info');
  public readonly title = input<string | null>(null);

  protected readonly style = computed<VariantStyle>(
    () => VARIANTS[this.variant()],
  );
}
