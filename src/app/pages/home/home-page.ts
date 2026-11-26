import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { CodeBlockComponent } from '../../shared/ui/code-block/code-block';
import { LinkCardComponent } from '../../shared/ui/link-card/link-card';
import { LanguageService } from '../../core/i18n/language.service';

const HERO_CODE = `import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RequestLockDirective, RequestLockMouseEvent } from 'ngx-request-lock';

@Component({
  imports: [RequestLockDirective],
  template: \`<button ngxRequestLock (click)="save($event)">Save</button>\`,
})
export class SaveButton {
  private readonly http = inject(HttpClient);

  save(event: RequestLockMouseEvent): void {
    this.http.post('/api/items', {}, { context: event.context }).subscribe();
  }
}`;

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
      <header class="docs-home-hero mb-12">
        <div>
          <h1
            class="mb-4 text-3xl font-semibold text-slate-950 sm:text-[2.5rem] dark:text-slate-50"
          >
            {{ t('header.subtitle') }}
          </h1>

          <p
            class="max-w-prose text-base leading-relaxed text-slate-700 dark:text-slate-200"
            [innerHTML]="t('home.hero.intro')"
          ></p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <a
              [routerLink]="language.path('/installation')"
              class="inline-flex min-h-11 items-center gap-2 rounded-lg bg-sky-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500 dark:focus-visible:outline-sky-300"
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
              [routerLink]="language.path('/architecture')"
              class="inline-flex min-h-11 items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-900 underline underline-offset-4 transition-colors hover:text-sky-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800 dark:text-slate-100 dark:hover:text-sky-300 dark:focus-visible:outline-sky-300"
            >
              <span>{{ t('nav.architecture') }}</span>
            </a>
          </div>

          <div class="docs-home-example">
            <p class="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {{ t('home.hero.exampleTitle') }}
            </p>
            <ngx-code-block
              [code]="heroCode"
              language="typescript"
              [lineNumbers]="false"
            />
            <a
              [routerLink]="language.path('/directive-usage')"
              class="text-sm font-semibold text-sky-900 underline underline-offset-4 hover:text-sky-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-800 dark:text-sky-300 dark:hover:text-sky-200 dark:focus-visible:outline-sky-300"
              >{{ t('home.hero.exampleLink') }}</a
            >
          </div>
        </div>
      </header>

      <section class="mb-12">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {{ t('home.install.title') }}
          </h2>
        </div>
        <div class="max-w-2xl">
          <ngx-code-block
            code="npm install ngx-request-lock"
            language="bash"
            [lineNumbers]="false"
          />
        </div>

        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {{ t('home.install.note') }}
        </p>
      </section>

      <section>
        <div class="mb-6">
          <h2 class="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {{ t('home.startHere.title') }}
          </h2>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {{ t('home.startHere.description') }}
          </p>
        </div>

        <div class="docs-home-index">
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
export default class HomePage {
  protected readonly language = inject(LanguageService);
  protected readonly heroCode = HERO_CODE;
}
