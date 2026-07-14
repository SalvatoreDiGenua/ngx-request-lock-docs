import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ngx-docs-footer',
  imports: [TranslocoPipe],
  template: `
    <footer
      class="mt-12 border-t border-slate-300 py-6 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300"
    >
      <div
        class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 md:flex-row md:items-center md:px-6"
      >
        <p>{{ 'footer.builtWith' | transloco }}</p>
        <a
          href="https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/tree/main/projects/ngx-request-lock"
          rel="noopener noreferrer"
          target="_blank"
          class="rounded font-semibold text-sky-700 underline decoration-sky-700/40 underline-offset-2 hover:decoration-sky-700 hover:text-sky-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-sky-300 dark:decoration-sky-300/40 dark:hover:text-sky-200 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
        >
          {{ 'footer.sourceCode' | transloco }}
        </a>
      </div>
    </footer>
  `,
})
export class DocsFooterComponent {}
