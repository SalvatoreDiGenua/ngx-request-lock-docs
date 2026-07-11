import { Component, computed, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export type CalloutVariant = 'info' | 'note' | 'tip' | 'warning';

interface VariantStyle {
  readonly container: string;
  readonly title: string;
  /** Transloco key for the default label. */
  readonly labelKey: string;
}

const VARIANTS: Record<CalloutVariant, VariantStyle> = {
  info: {
    container:
      'border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-100',
    title: 'text-sky-800 dark:text-sky-200',
    labelKey: 'callout.info',
  },
  note: {
    container:
      'border-slate-300 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100',
    title: 'text-slate-700 dark:text-slate-200',
    labelKey: 'callout.note',
  },
  tip: {
    container:
      'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-100',
    title: 'text-emerald-800 dark:text-emerald-200',
    labelKey: 'callout.tip',
  },
  warning: {
    container:
      'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100',
    title: 'text-amber-800 dark:text-amber-200',
    labelKey: 'callout.warning',
  },
};

@Component({
  selector: 'ngx-callout',
  imports: [TranslocoPipe],
  template: `
    <aside
      role="note"
      class="my-6 rounded-lg border-l-4 px-4 py-3 text-sm"
      [class]="style().container"
    >
      <p
        class="mb-1 text-xs font-semibold uppercase tracking-wide"
        [class]="style().title"
      >
        {{ title() ?? (style().labelKey | transloco) }}
      </p>
      <div class="prose-sm">
        <ng-content />
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
