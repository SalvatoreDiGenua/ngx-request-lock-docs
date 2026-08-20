import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { CodeBlockComponent } from '../../shared/ui/code-block/code-block';
import { LinkCardComponent } from '../../shared/ui/link-card/link-card';

@Component({
  selector: 'ngx-home-page',
  imports: [
    RouterLink,
    TranslocoDirective,
    CodeBlockComponent,
    LinkCardComponent,
  ],
  template: `
    <article *transloco="let t" class="max-w-none">
      <header
        class="relative mb-12 overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-sky-50/50 via-white to-slate-50/50 p-6 md:p-10 dark:border-slate-800/80 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-900/40"
      >
        <div class="relative z-10">
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span
              class="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-100/80 px-3 py-1 font-mono text-xs font-semibold text-sky-800 dark:border-sky-800 dark:bg-sky-950/80 dark:text-sky-300"
            >
              <span
                class="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse"
              ></span>
              ngx-request-lock
            </span>
            <span
              class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              Angular 22+
            </span>
            <span
              class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              Zoneless & Signals
            </span>
          </div>

          <h1
            class="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-slate-50"
          >
            {{ t('header.subtitle') }}
          </h1>

          <p
            class="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300"
            [innerHTML]="t('home.hero.intro')"
          ></p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              routerLink="/installation"
              class="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <span>{{ t('nav.installation') }}</span>
              <svg
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              routerLink="/architecture"
              class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-2xs transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
            >
              <span>{{ t('nav.architecture') }}</span>
            </a>
          </div>
        </div>
      </header>

      <section class="mb-12">
        <div class="mb-4 flex items-center justify-between">
          <h2
            class="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
          >
            {{ t('home.install.title') }}
          </h2>
        </div>
        <ngx-code-block code="npm install ngx-request-lock" language="bash" />

        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {{ t('home.install.note') }}
        </p>
      </section>

      <section>
        <div class="mb-6">
          <h2
            class="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
          >
            {{ t('home.startHere.title') }}
          </h2>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Explore key concepts, architecture diagrams, and interactive live
            demos.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ngx-link-card
            [title]="t('home.cards.problem.title')"
            [description]="t('home.cards.problem.description')"
            route="/problem"
          />
          <ngx-link-card
            [title]="t('home.cards.architecture.title')"
            [description]="t('home.cards.architecture.description')"
            route="/architecture"
          />
          <ngx-link-card
            [title]="t('home.cards.installation.title')"
            [description]="t('home.cards.installation.description')"
            route="/installation"
          />
          <ngx-link-card
            [title]="t('home.cards.directiveUsage.title')"
            [description]="t('home.cards.directiveUsage.description')"
            route="/directive-usage"
          />
          <ngx-link-card
            [title]="t('home.cards.flowLock.title')"
            [description]="t('home.cards.flowLock.description')"
            route="/flow-lock"
          />
        </div>
      </section>
    </article>
  `,
})
export default class HomePage {}
