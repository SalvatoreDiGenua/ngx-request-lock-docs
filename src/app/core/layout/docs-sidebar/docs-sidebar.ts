import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_GROUPS } from '../nav-items';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ngx-docs-sidebar',
  imports: [RouterLink, RouterLinkActive, TranslocoPipe],
  template: `
    <nav
      aria-label="Documentation"
      class="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-6 pr-4"
    >
      @for (group of groups; track group.labelKey) {
        <div class="mb-6">
          <p
            class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            {{ group.labelKey | transloco }}
          </p>
          <ul class="space-y-1">
            @for (item of group.items; track item.route) {
              <li>
                <a
                  [routerLink]="item.route"
                  routerLinkActive="bg-sky-100 text-sky-900 font-semibold dark:bg-sky-900/50 dark:text-sky-100"
                  [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                  class="block rounded px-3 py-1.5 text-sm font-medium text-slate-800 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
                >
                  {{ item.labelKey | transloco }}
                </a>
              </li>
            }
          </ul>
        </div>
      }
    </nav>
  `,
})
export class DocsSidebarComponent {
  protected readonly groups = NAV_GROUPS;
}
