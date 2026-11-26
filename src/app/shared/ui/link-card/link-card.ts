import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/i18n/language.service';

/**
 * Card whose only link is the title: crawlers and screen readers get a short,
 * meaningful anchor text instead of "title + description" glued together.
 * The whole card stays clickable through the anchor's stretched ::after
 * overlay, and the focus ring is drawn on the card via `has-[:focus-visible]`.
 */
@Component({
  selector: 'ngx-link-card',
  imports: [RouterLink],
  template: `
    <div
      class="group relative flex h-full min-w-0 flex-col justify-between rounded-lg p-4 transition-colors hover:bg-slate-100 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-sky-700 dark:hover:bg-slate-800 dark:has-[:focus-visible]:outline-sky-400"
    >
      <div>
        <div class="mb-2 flex items-center justify-between gap-2">
          <h3 class="text-base font-semibold">
            <a
              [routerLink]="language.path(route())"
              class="text-slate-900 transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-sky-800 focus:outline-none dark:text-slate-50 dark:group-hover:text-sky-300"
            >
              {{ title() }}
            </a>
          </h3>
          <svg
            class="h-4 w-4 shrink-0 text-slate-500 dark:text-slate-400"
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
        <p class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {{ description() }}
        </p>
      </div>
    </div>
  `,
})
export class LinkCardComponent {
  public readonly title = input.required<string>();
  public readonly description = input.required<string>();
  public readonly route = input.required<string>();
  protected readonly language = inject(LanguageService);
}
