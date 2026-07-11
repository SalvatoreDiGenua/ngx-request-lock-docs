import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { CodeBlockComponent } from '../../shared/ui/code-block/code-block';
import { LinkCardComponent } from '../../shared/ui/link-card/link-card';

@Component({
  selector: 'ngx-home-page',
  imports: [TranslocoDirective, CodeBlockComponent, LinkCardComponent],
  template: `
    <article *transloco="let t" class="max-w-none">
      <header class="mb-8">
        <p
          class="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-sky-800 dark:text-sky-300"
        >
          ngx-request-lock
        </p>
        <h1
          class="mb-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50"
        >
          {{ t('header.subtitle') }}
        </h1>

        <p
          class="max-w-2xl text-base leading-relaxed text-slate-700 dark:text-slate-300"
          [innerHTML]="t('home.hero.intro')"
        ></p>
      </header>

      <section class="mb-10">
        <h2
          class="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-50"
        >
          {{ t('home.install.title') }}
        </h2>
        <ngx-code-block code="npm install ngx-request-lock" language="bash" />

        <p class="mt-3 text-sm text-slate-700 dark:text-slate-300">
          {{ t('home.install.note') }}
        </p>
      </section>

      <section>
        <h2
          class="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50"
        >
          {{ t('home.startHere.title') }}
        </h2>

        <div class="grid gap-4 sm:grid-cols-2">
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
            [title]="t('home.cards.examples.title')"
            [description]="t('home.cards.examples.description')"
            route="/examples"
          />
        </div>
      </section>
    </article>
  `,
})
export default class HomePage {}
