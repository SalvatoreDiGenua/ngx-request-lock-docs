import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

/**
 * Temporary placeholder used by scaffolded pages until real content is written.
 */
@Component({
  selector: 'ngx-page-placeholder',
  imports: [TranslocoPipe],
  template: `
    <article class="max-w-none">
      <h1
        class="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
      >
        {{ title() }}
      </h1>
      <p class="text-base text-slate-700 dark:text-slate-300">
        {{ 'common.placeholder' | transloco }}
      </p>
    </article>
  `,
})
export class PagePlaceholderComponent {
  public readonly title = input.required<string>();
}
