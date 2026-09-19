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
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-4 w-4 shrink-0"
                >
                  <path
                    d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
                  />
                </svg>
                npm
              </a>
              <a
                href="https://github.com/SalvatoreDiGenua/ngx-request-lock-docs"
                rel="noopener noreferrer"
                target="_blank"
                class="inline-flex items-center gap-1.5 transition hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:text-sky-300 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="h-4 w-4 shrink-0"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
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
              <a
                href="https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/blob/main/CHANGELOG.md"
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
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M12 7v5l4 2" />
                </svg>
                {{ 'footer.changelog' | transloco }}
              </a>
              <a
                href="https://github.com/SalvatoreDiGenua"
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {{ 'footer.author' | transloco }}
              </a>
            </nav>
          </div>
        </div>

        <div class="mt-8 pt-4">
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
