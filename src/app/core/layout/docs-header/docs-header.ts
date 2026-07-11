import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'ngx-docs-header',
  imports: [RouterLink, TranslocoPipe],
  template: `
    <header
      class="sticky top-0 z-30 border-b border-slate-300 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-700 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/80"
    >
      <div
        class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6"
      >
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-md border border-slate-400 bg-white p-2 text-slate-800 transition hover:border-sky-600 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:hidden dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-sky-400 dark:hover:text-sky-300 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
            [attr.aria-label]="
              (mobileNavOpen() ? 'header.closeNav' : 'header.openNav')
                | transloco
            "
            [attr.aria-expanded]="mobileNavOpen()"
            aria-controls="mobile-nav"
            (click)="toggleMobileNav.emit()"
          >
            @if (mobileNavOpen()) {
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="h-5 w-5"
              >
                <path stroke-linecap="round" d="M5 5l10 10M15 5L5 15" />
              </svg>
            } @else {
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  d="M3 6h14M3 10h14M3 14h14"
                />
              </svg>
            }
          </button>

          <a
            routerLink="/"
            class="flex flex-col rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
          >
            <span
              class="font-mono text-sm font-semibold text-slate-900 dark:text-slate-50"
            >
              {{ 'header.title' | transloco }}
            </span>
            <span
              class="hidden text-xs text-slate-700 sm:block dark:text-slate-300"
            >
              {{ 'header.subtitle' | transloco }}
            </span>
          </a>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-md border border-slate-400 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-800 transition hover:border-sky-600 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-sky-400 dark:hover:text-sky-300 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
            [attr.aria-label]="'header.languageSwitch' | transloco"
            [attr.aria-pressed]="language.language() === 'it'"
            (click)="language.toggle()"
          >
            {{ language.language() === 'en' ? 'IT' : 'EN' }}
          </button>
        </div>
      </div>
    </header>
  `,
})
export class DocsHeaderComponent {
  public readonly mobileNavOpen = input<boolean>(false);
  public readonly toggleMobileNav = output<void>();

  protected readonly language = inject(LanguageService);
}
