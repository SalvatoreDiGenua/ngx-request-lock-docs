import { Component } from '@angular/core';
import { TranslocoDirective, translateSignal } from '@jsverse/transloco';
import { CalloutComponent } from '../../shared/ui/callout/callout';
import { CodeBlockComponent } from '../../shared/ui/code-block/code-block';
import { SectionHeadingComponent } from '../../shared/ui/section-heading/section-heading';

const DIAGRAM = `  (user click)
       │
       ▼
┌──────────────────────┐         ┌───────────────────────┐
│ RequestLockDirective │         │  RequestLockService   │
│  #lock="requestLock" │ ◀────── │  isPending(id): Signal│
│  lock.requestId() ───┼─┐       │  start(id) / end(id)  │
└──────────────────────┘ │       └─────────▲─────────────┘
                         │                 │
                         ▼                 │ start / end
                  HttpContext              │
             REQUEST_LOCK_ID = id          │
                         │                 │
                         ▼                 │
                 HttpClient.request        │
                         │                 │
                         ▼                 │
              requestLockInterceptor ──────┘
                         │
                         ▼
                       server`;

@Component({
  selector: 'ngx-architecture-page',
  imports: [
    TranslocoDirective,
    CalloutComponent,
    CodeBlockComponent,
    SectionHeadingComponent,
  ],
  template: `
    <article *transloco="let t" class="max-w-none">
      <h1 class="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {{ title() }}
      </h1>

      <p
        class="text-base text-slate-700 dark:text-slate-300"
        [innerHTML]="t('architecture.intro')"
      ></p>

      <ngx-section-heading anchor="building-blocks">
        {{ t('architecture.buildingBlocks.title') }}
      </ngx-section-heading>

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('architecture.buildingBlocks.list')"
      ></ul>

      <ngx-section-heading anchor="data-flow">
        {{ t('architecture.dataFlow.title') }}
      </ngx-section-heading>

      <ngx-code-block [code]="diagram" language="text" />

      <ol
        class="list-decimal space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('architecture.dataFlow.steps')"
      ></ol>

      <ngx-callout variant="info">
        <p [innerHTML]="t('architecture.httpContextNote')"></p>
      </ngx-callout>

      <ngx-section-heading anchor="reference-count">
        {{ t('architecture.refCount.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('architecture.refCount.text')"
      ></p>

      <ngx-callout variant="note">
        <p [innerHTML]="t('architecture.refCount.note')"></p>
      </ngx-callout>
    </article>
  `,
})
export default class ArchitecturePage {
  protected readonly title = translateSignal('nav.architecture');
  protected readonly diagram = DIAGRAM;
}
