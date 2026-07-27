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
                <path stroke-linecap="round" d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            }
          </button>

          <a
            routerLink="/"
            class="flex items-center gap-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
          >
            <!--
              Brand mark. Geometry mirrors public/favicon.svg exactly.
              aria-hidden because the anchor already has an accessible
              name from the title text below.
            -->
            <svg
              viewBox="0 0 64 64"
              class="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
              aria-hidden="true"
              focusable="false"
            >
              <rect
                x="2"
                y="2"
                width="60"
                height="60"
                rx="12"
                ry="12"
                fill="#0f172a"
              />
              <g
                fill="none"
                stroke="#38bdf8"
                stroke-width="5"
                stroke-linecap="round"
              >
                <path d="M 20 30 V 24 A 12 12 0 0 1 44 24 V 30" />
                <path d="M 17 27 L 20 30 L 23 27" />
                <path d="M 41 27 L 44 30 L 47 27" />
              </g>
              <rect
                x="14"
                y="30"
                width="36"
                height="24"
                rx="4"
                ry="4"
                fill="#f1f5f9"
              />
              <g fill="#0f172a">
                <circle cx="32" cy="40" r="3" />
                <path d="M 30.5 41.5 L 33.5 41.5 L 33 48 L 31 48 Z" />
              </g>
            </svg>

            <span class="flex flex-col">
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
