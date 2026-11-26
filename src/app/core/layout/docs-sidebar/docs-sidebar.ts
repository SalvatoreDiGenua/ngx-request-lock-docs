import { Component, inject, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_GROUPS } from '../nav-items';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../i18n/language.service';

@Component({
  selector: 'ngx-docs-sidebar',
  imports: [RouterLink, RouterLinkActive, TranslocoPipe],
  template: `
    <nav
      [attr.aria-label]="ariaLabel()"
      class="max-h-[calc(100vh-4rem)] overflow-y-auto py-7 md:sticky md:top-16"
    >
      @for (group of groups; track group.labelKey) {
        <div class="mb-6">
          <p
            class="mb-2 px-3 text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            {{ group.labelKey | transloco }}
          </p>
          <ul class="space-y-1">
            @for (item of group.items; track item.route) {
              <li>
                <a
                  [routerLink]="language.path(item.route)"
                  routerLinkActive="bg-sky-100 text-sky-950 font-semibold dark:bg-sky-950 dark:text-sky-100"
                  ariaCurrentWhenActive="page"
                  [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                  class="block rounded-lg px-3 py-2 text-sm font-medium leading-snug text-slate-700 transition-colors hover:bg-white hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:focus-visible:outline-sky-400"
                  (click)="navigate.emit()"
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
  public readonly ariaLabel = input<string>('Documentation');
  public readonly navigate = output<void>();

  protected readonly groups = NAV_GROUPS;
  protected readonly language = inject(LanguageService);
}
