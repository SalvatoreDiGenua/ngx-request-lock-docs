import {
  Component,
  ElementRef,
  afterRenderEffect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { DocsHeaderComponent } from '../docs-header/docs-header';
import { DocsSidebarComponent } from '../docs-sidebar/docs-sidebar';
import { DocsFooterComponent } from '../docs-footer/docs-footer';

/**
 * Selector for elements that can receive focus inside the mobile-nav
 * drawer. Keep in sync with the focus-trap logic in `handleTab()`.
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

@Component({
  selector: 'ngx-docs-shell',
  imports: [
    RouterOutlet,
    DocsHeaderComponent,
    DocsSidebarComponent,
    DocsFooterComponent,
    TranslocoPipe,
  ],
  host: {
    '(document:keydown.escape)': 'closeMobileNav()',
  },
  template: `
    <a
      href="/"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-sky-700 focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-white dark:focus:bg-sky-500 dark:focus:text-slate-950 dark:focus:ring-sky-200 dark:focus:ring-offset-slate-950"
    >
      {{ 'header.skipToContent' | transloco }}
    </a>

    <div
      class="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"
    >
      <ngx-docs-header
        [mobileNavOpen]="mobileNavOpen()"
        (toggleMobileNav)="toggleMobileNav()"
      />

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

    @if (mobileNavOpen()) {
      <div
        class="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden"
        aria-hidden="true"
        (click)="closeMobileNav()"
      ></div>
    }

    <div
      #mobileNav
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="'header.navAriaLabelMobile' | transloco"
      [attr.aria-hidden]="!mobileNavOpen()"
      [attr.inert]="mobileNavOpen() ? null : ''"
      class="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform border-r border-slate-300 bg-white shadow-xl transition-transform duration-200 ease-out md:hidden dark:border-slate-700 dark:bg-slate-950"
      [class.translate-x-0]="mobileNavOpen()"
      [class.-translate-x-full]="!mobileNavOpen()"
      (keydown.tab)="handleTab($event, false)"
      (keydown.shift.tab)="handleTab($event, true)"
    >
      <div
        class="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800"
      >
        <span
          class="font-mono text-sm font-semibold text-slate-900 dark:text-slate-50"
        >
          {{ 'header.title' | transloco }}
        </span>
        <button
          #closeButton
          type="button"
          class="rounded-md p-2 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-sky-400 dark:focus-visible:ring-offset-slate-950"
          [attr.aria-label]="'header.closeNav' | transloco"
          (click)="closeMobileNav()"
        >
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
        </button>
      </div>

      <div class="px-4">
        <ngx-docs-sidebar
          [ariaLabel]="'header.navAriaLabelMobile' | transloco"
          (navigate)="closeMobileNav()"
        />
      </div>
    </div>
  `,
})
export class DocsShellComponent {
  protected readonly mobileNavOpen = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly mobileNav =
    viewChild.required<ElementRef<HTMLElement>>('mobileNav');
  private readonly closeButton =
    viewChild.required<ElementRef<HTMLButtonElement>>('closeButton');

  /**
   * Element that owned focus before the drawer opened. Used to restore focus
   * to the original trigger (typically the hamburger toggle) when the drawer
   * closes, per WCAG 2.4.3 (Focus Order).
   */
  private previouslyFocused: HTMLElement | null = null;

  constructor() {
    // Sync side effects (scroll lock + focus move) with the open/close state.
    // Runs after render so `viewChild` refs and DOM classes are up-to-date.
    afterRenderEffect(() => {
      const open = this.mobileNavOpen();
      const body = this.document.body;

      if (open) {
        this.previouslyFocused =
          (this.document.activeElement as HTMLElement | null) ?? null;
        body.classList.add('overflow-hidden');
        // Move focus into the drawer on the next microtask so the browser
        // has time to apply `inert=null` before we call `.focus()`.
        queueMicrotask(() => this.closeButton().nativeElement.focus());
      } else {
        body.classList.remove('overflow-hidden');
        this.previouslyFocused?.focus();
        this.previouslyFocused = null;
      }
    });
  }

  protected toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open);
  }

  protected closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }

  /**
   * Focus trap: keep Tab/Shift+Tab cycling inside the drawer while it is
   * open. Only runs when the drawer is the modal (mobile view + open).
   *
   * `event` is typed as `Event` because Angular's `(keydown.*)` filter
   * events surface the base `Event` type in template bindings.
   */
  protected handleTab(event: Event, shift: boolean): void {
    if (!this.mobileNavOpen()) {
      return;
    }

    const root = this.mobileNav().nativeElement;
    const focusable = Array.from(
      root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((el) => !el.hasAttribute('inert') && el.offsetParent !== null);

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.document.activeElement as HTMLElement | null;

    if (shift && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!shift && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
