import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

export type HeadingLevel = 'h2' | 'h3';

@Component({
  selector: 'ngx-section-heading',
  imports: [NgTemplateOutlet],
  template: `
    <ng-template #headingContent><ng-content /></ng-template>
    @if (level() === 'h2') {
      <h2
        [attr.id]="anchor()"
        class="mt-10 mb-3 scroll-mt-24 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
      >
        <span
          class="rounded no-underline hover:text-sky-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:text-sky-300 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
        >
          <ng-container [ngTemplateOutlet]="headingContent" />
        </span>
      </h2>
    } @else {
      <h3
        [attr.id]="anchor()"
        class="mt-6 mb-2 scroll-mt-24 text-lg font-semibold text-slate-900 dark:text-slate-50"
      >
        <span
          class="rounded no-underline hover:text-sky-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:text-sky-300 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
        >
          <ng-container [ngTemplateOutlet]="headingContent" />
        </span>
      </h3>
    }
  `,
})
export class SectionHeadingComponent {
  public readonly anchor = input<string | null>(null);
  public readonly level = input<HeadingLevel>('h2');
}
