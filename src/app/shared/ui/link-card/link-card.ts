import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ngx-link-card',
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="route()"
      class="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-sky-400 dark:hover:shadow-sky-950/40 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
    >
      <div>
        <div class="mb-2 flex items-center justify-between gap-2">
          <h3
            class="text-base font-semibold text-slate-900 transition-colors group-hover:text-sky-600 dark:text-slate-50 dark:group-hover:text-sky-400"
          >
            {{ title() }}
          </h3>
          <svg
            class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-sky-500 dark:text-slate-500 dark:group-hover:text-sky-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {{ description() }}
        </p>
      </div>
    </a>
  `,
})
export class LinkCardComponent {
  public readonly title = input.required<string>();
  public readonly description = input.required<string>();
  public readonly route = input.required<string>();
}
