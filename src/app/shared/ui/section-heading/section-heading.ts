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
        class="mt-12 mb-4 scroll-mt-24 text-2xl font-semibold text-slate-900 dark:text-slate-50"
      >
        <span class="block">
          <ng-container [ngTemplateOutlet]="headingContent" />
        </span>
      </h2>
    } @else {
      <h3
        [attr.id]="anchor()"
        class="mt-8 mb-3 scroll-mt-24 text-lg font-semibold text-slate-900 dark:text-slate-50"
      >
        <span class="block">
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
