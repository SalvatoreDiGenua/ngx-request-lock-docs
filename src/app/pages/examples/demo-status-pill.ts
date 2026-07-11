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
        class="ml-3 inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-medium"
        [class.bg-emerald-100]="status().kind === 'ok'"
        [class.text-emerald-800]="status().kind === 'ok'"
        [class.dark:bg-emerald-900]="status().kind === 'ok'"
        [class.dark:text-emerald-100]="status().kind === 'ok'"
        [class.bg-rose-100]="status().kind === 'error'"
        [class.text-rose-800]="status().kind === 'error'"
        [class.dark:bg-rose-900]="status().kind === 'error'"
        [class.dark:text-rose-100]="status().kind === 'error'"
      >
        {{ status().text }}
      </span>
    }
  `,
})
export class DemoStatusPillComponent {
  public readonly status = input.required<DemoStatus>();
}
