import { Component, input } from '@angular/core';
import { DemoStatus } from './demos-types';

/**
 * Small ARIA-live status pill used across the interactive demos.
 * Kept in its own file so the demo templates can stay linter-friendly
 * (no cross-template string concatenation).
 */
@Component({
  selector: 'ngx-demo-status-pill',
  template: `
    @if (status().kind !== 'idle') {
      <span
        role="status"
        aria-live="polite"
        class="ml-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-2xs transition-all animate-in fade-in zoom-in duration-200"
        [class.bg-emerald-100]="status().kind === 'ok'"
        [class.text-emerald-800]="status().kind === 'ok'"
        [class.dark:bg-emerald-950/80]="status().kind === 'ok'"
        [class.dark:text-emerald-300]="status().kind === 'ok'"
        [class.dark:border]="status().kind === 'ok'"
        [class.dark:border-emerald-800]="status().kind === 'ok'"
        [class.bg-rose-100]="status().kind === 'error'"
        [class.text-rose-800]="status().kind === 'error'"
        [class.dark:bg-rose-950/80]="status().kind === 'error'"
        [class.dark:text-rose-300]="status().kind === 'error'"
        [class.dark:border]="status().kind === 'error'"
        [class.dark:border-rose-800]="status().kind === 'error'"
      >
        <span
          class="h-1.5 w-1.5 rounded-full"
          [class.bg-emerald-600]="status().kind === 'ok'"
          [class.dark:bg-emerald-400]="status().kind === 'ok'"
          [class.bg-rose-600]="status().kind === 'error'"
          [class.dark:bg-rose-400]="status().kind === 'error'"
        ></span>
        {{ status().text }}
      </span>
    }
  `,
})
export class DemoStatusPillComponent {
  public readonly status = input.required<DemoStatus>();
}
