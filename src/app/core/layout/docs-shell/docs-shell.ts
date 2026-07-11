import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { DocsHeaderComponent } from '../docs-header/docs-header';
import { DocsSidebarComponent } from '../docs-sidebar/docs-sidebar';
import { DocsFooterComponent } from '../docs-footer/docs-footer';

@Component({
  selector: 'ngx-docs-shell',
  imports: [
    RouterOutlet,
    DocsHeaderComponent,
    DocsSidebarComponent,
    DocsFooterComponent,
    TranslocoPipe,
  ],
  template: `
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-sky-700 focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-white dark:focus:bg-sky-500 dark:focus:text-slate-950 dark:focus:ring-sky-200 dark:focus:ring-offset-slate-950"
    >
      {{ 'header.skipToContent' | transloco }}
    </a>

    <div
      class="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      <ngx-docs-header />

      <div class="mx-auto flex max-w-7xl gap-8 px-4 md:px-6">
        <aside class="hidden w-64 shrink-0 md:block">
          <ngx-docs-sidebar />
        </aside>

        <main
          id="main-content"
          tabindex="-1"
          class="min-w-0 flex-1 py-8 focus:outline-none"
        >
          <router-outlet />
        </main>
      </div>

      <ngx-docs-footer />
    </div>
  `,
})
export class DocsShellComponent {}
