import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ngx-link-card',
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="route()"
      class="group block rounded-lg border border-slate-300 bg-white p-5 shadow-sm transition hover:border-sky-600 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:hover:border-sky-400 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
    >
      <h3
        class="mb-1 text-base font-semibold text-slate-900 group-hover:text-sky-700 dark:text-slate-50 dark:group-hover:text-sky-300"
      >
        {{ title() }}
      </h3>
      <p class="text-sm text-slate-700 dark:text-slate-300">
        {{ description() }}
      </p>
    </a>
  `,
})
export class LinkCardComponent {
  public readonly title = input.required<string>();
  public readonly description = input.required<string>();
  public readonly route = input.required<string>();
}
