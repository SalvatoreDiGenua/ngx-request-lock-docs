import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ngx-docs-footer',
  imports: [TranslocoPipe],
  template: `
    <footer
      class="mt-12 border-t border-slate-300 py-8 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300"
    >
      <div class="mx-auto max-w-7xl px-4 md:px-6">
        <div class="flex flex-col gap-8 md:flex-row md:justify-between">
          <div class="flex flex-col gap-2">
            <p class="font-mono font-semibold text-slate-900 dark:text-white">
              ngx-request-lock
            </p>
            <p class="max-w-sm text-slate-600 dark:text-slate-400">
              {{ 'footer.tagline' | transloco }}
            </p>
          </div>

          <div class="flex flex-col gap-8 sm:flex-row sm:gap-12">
            <nav
              [attr.aria-label]="'footer.links' | transloco"
              class="flex flex-col gap-2"
            >
              <span class="font-semibold text-slate-900 dark:text-white">
                {{ 'footer.links' | transloco }}
              </span>
              <a
                href="https://www.npmjs.com/package/ngx-request-lock"
                rel="noopener noreferrer"
                target="_blank"
                class="inline-flex items-center gap-1.5 transition hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:text-sky-300 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
              >
                <img
                  src="https://cdn.simpleicons.org/npm"
                  alt=""
                  aria-hidden="true"
                  class="h-4 w-4 shrink-0"
                />
                npm
              </a>
              <a
                href="https://github.com/SalvatoreDiGenua/ngx-request-lock-docs"
                rel="noopener noreferrer"
                target="_blank"
                class="inline-flex items-center gap-1.5 transition hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:text-sky-300 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
              >
                <img
                  src="https://cdn.simpleicons.org/github"
                  alt=""
                  aria-hidden="true"
                  class="h-4 w-4 shrink-0"
                />
                {{ 'footer.sourceCode' | transloco }}
              </a>
              <a
                href="https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/blob/main/LICENSE"
                rel="noopener noreferrer"
                target="_blank"
                class="inline-flex items-center gap-1.5 transition hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:text-sky-300 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 w-4 shrink-0"
                >
                  <path
                    d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                  />
                  <path d="M14 2v4a1 1 0 0 0 1 1h4" />
                  <path d="M10 9H8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                </svg>
                MIT {{ 'footer.license' | transloco }}
              </a>
            </nav>
          </div>
        </div>

        <div class="mt-8 border-t border-slate-200 pt-4 dark:border-slate-800">
          <p class="text-xs text-slate-700 dark:text-slate-300">
            © {{ currentYear }} Salvatore Di Genua -
            {{ 'footer.builtWith' | transloco }}
          </p>
        </div>
      </div>
    </footer>
  `,
})
export class DocsFooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
