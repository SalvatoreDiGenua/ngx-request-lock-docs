import { Component } from '@angular/core';
import { TranslocoDirective, translateSignal } from '@jsverse/transloco';
import { CalloutComponent } from '../../shared/ui/callout/callout';
import { CodeExampleComponent } from '../../shared/ui/code-example/code-example';
import { SectionHeadingComponent } from '../../shared/ui/section-heading/section-heading';
import { FlowLockDemo, InFlightVariantDemo } from '../examples/demos';

const FLOW_LOCK_CODE = `import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RequestLockDirective,
  createRequestLockContext,
} from 'ngx-request-lock';

/**
 * One shared \`requestId\` coordinates the whole flow, not just a single click.
 * Every element bound to the same id observes the same lock signal, so:
 *
 *   - both buttons stay disabled during the mutation,
 *   - they stay disabled while the automatic refresh (GET) is still in flight,
 *   - any other related action that reuses the id joins the same lock.
 *
 * The lock releases only when the entire flow settles.
 */
@Component({
  selector: 'ngx-post-flow',
  imports: [RequestLockDirective],
  template: \`
    <button
      ngxRequestLock
      [requestId]="flowId()"
      type="button"
      (click)="save()"
    >
      Save
    </button>

    <button
      ngxRequestLock
      [requestId]="flowId()"
      type="button"
      (click)="reset()"
    >
      Reset
    </button>
  \`,
})
export class PostFlow {
  private readonly http = inject(HttpClient);

  // The flow owns the id, not the button. Anything tagged with it joins
  // the same reference-counted lock.
  protected readonly flowId = signal(crypto.randomUUID());

  protected save(): void {
    const id = this.flowId();
    this.http
      .post('/api/posts', { title: 'hello' }, {
        context: createRequestLockContext(id),
      })
      .subscribe({
        // Follow-up GET reuses the same id. The lock stays held until
        // both the POST and the GET have settled.
        next: () => this.refresh(id),
      });
  }

  protected reset(): void {
    this.refresh(this.flowId());
  }

  private refresh(id: string): void {
    this.http
      .get('/api/posts/1', { context: createRequestLockContext(id) })
      .subscribe();
  }
}`;

const FORM_REFRESH_CODE = `@Component({
  selector: 'ngx-user-form',
  imports: [ReactiveFormsModule, RequestLockDirective],
  template: \`
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="name" />
      <input formControlName="email" type="email" />

      <button
        ngxRequestLock
        [requestId]="flowId()"
        type="submit"
        [disabled]="form.invalid"
      >
        Save
      </button>

      <button
        ngxRequestLock
        [requestId]="flowId()"
        type="button"
        (click)="refresh()"
      >
        Refresh
      </button>
    </form>
  \`,
})
export class UserForm {
  private readonly http = inject(HttpClient);
  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: [''],
    email: [''],
  });

  // The form, the submit, and the refresh all share one lock.
  protected readonly flowId = signal(crypto.randomUUID());

  protected submit(): void {
    if (this.form.invalid) return;
    const id = this.flowId();

    this.http
      .post<{ id: number }>('/api/users', this.form.getRawValue(), {
        context: createRequestLockContext(id),
      })
      .subscribe({
        // Automatic GET refresh reuses the flow id: the whole form stays
        // locked until the refresh completes.
        next: (user) => this.load(id, user.id),
      });
  }

  protected refresh(): void {
    this.load(this.flowId(), /* userId */ 1);
  }

  private load(id: string, userId: number): void {
    this.http
      .get(\`/api/users/\${userId}\`, {
        context: createRequestLockContext(id),
      })
      .subscribe();
  }
}`;

const IN_FLIGHT_CODE = `import { Component, computed, inject, signal } from '@angular/core';
import {
  RequestLockDirective,
  RequestLockService,
  createRequestLockContext,
} from 'ngx-request-lock';

/**
 * The shared \`requestId\` also drives a visual in-flight state at the panel
 * level. The buttons still lock through the directive, but the wrapper reads
 * \`RequestLockService.isPending(flowId)\` and dims the whole card, sets
 * \`aria-busy\`, and renders an overlay spinner while any request in the flow
 * is still pending.
 */
@Component({
  selector: 'ngx-post-panel',
  imports: [RequestLockDirective],
  template: \`
    <section
      class="panel"
      [class.is-busy]="isPending()"
      [attr.aria-busy]="isPending() ? 'true' : null"
    >
      <button
        ngxRequestLock
        [requestId]="flowId()"
        type="button"
        (click)="load()"
      >
        Load
      </button>

      <button
        ngxRequestLock
        [requestId]="flowId()"
        type="button"
        (click)="destroy()"
      >
        Delete
      </button>

      @if (isPending()) {
        <div class="overlay" aria-hidden="true">
          <span class="spinner"></span>
        </div>
      }
    </section>
  \`,
})
export class PostPanel {
  private readonly http = inject(HttpClient);
  private readonly lockService = inject(RequestLockService);

  protected readonly flowId = signal(crypto.randomUUID());

  // Panel-level pending state. Anything tagged with \`flowId\` counts,
  // regardless of which button (or follow-up call) started it.
  protected readonly isPending = computed(() =>
    this.lockService.isPending(this.flowId())(),
  );

  protected load(): void {
    this.http
      .get('/api/posts/1', {
        context: createRequestLockContext(this.flowId()),
      })
      .subscribe();
  }

  protected destroy(): void {
    this.http
      .delete('/api/posts/1', {
        context: createRequestLockContext(this.flowId()),
      })
      .subscribe();
  }
}`;

@Component({
  selector: 'ngx-flow-lock-page',
  imports: [
    TranslocoDirective,
    CalloutComponent,
    CodeExampleComponent,
    SectionHeadingComponent,
    FlowLockDemo,
    InFlightVariantDemo,
  ],
  template: `
    <article *transloco="let t" class="max-w-none">
      <h1 class="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {{ title() }}
      </h1>

      <p
        class="text-base text-slate-700 dark:text-slate-300"
        [innerHTML]="t('flowLock.intro')"
      ></p>

      <ngx-callout variant="tip">
        <p [innerHTML]="t('shared.tipConfig')"></p>
      </ngx-callout>

      <ngx-section-heading>
        {{ t('flowLock.sharedFlow.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('flowLock.sharedFlow.text')"
      ></p>

      <ngx-callout variant="tip">
        <p [innerHTML]="t('flowLock.sharedFlow.tip')"></p>
      </ngx-callout>

      <ngx-code-example
        [code]="flowLockCode"
        language="typescript"
        title="Shared requestId across a flow"
      />

      <section
        class="my-6 rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40"
        [attr.aria-label]="t('shared.liveDemoAriaLabel')"
      >
        <p
          class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400"
        >
          {{ t('shared.liveDemo') }}
        </p>
        <ngx-flow-lock-demo />
      </section>

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('flowLock.sharedFlow.bullets')"
      ></ul>

      <ngx-section-heading level="h3">
        {{ t('flowLock.formRefresh.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('flowLock.formRefresh.text')"
      ></p>

      <ngx-code-example
        [code]="formRefreshCode"
        language="typescript"
        title="Form: POST + automatic GET refresh"
      />

      <ngx-section-heading>
        {{ t('flowLock.inFlight.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('flowLock.inFlight.text')"
      ></p>

      <ngx-code-example
        [code]="inFlightCode"
        language="typescript"
        title="Panel-level visual in-flight state"
      />

      <section
        class="my-6 rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40"
        [attr.aria-label]="t('shared.liveDemoAriaLabel')"
      >
        <p
          class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400"
        >
          {{ t('shared.liveDemo') }}
        </p>
        <ngx-in-flight-variant-demo />
      </section>

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('flowLock.inFlight.bullets')"
      ></ul>

      <ngx-callout variant="note">
        <p [innerHTML]="t('flowLock.inFlight.note')"></p>
      </ngx-callout>

      <ngx-section-heading>
        {{ t('flowLock.why.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('flowLock.why.intro')"
      ></p>

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('flowLock.why.bullets')"
      ></ul>
    </article>
  `,
})
export default class FlowLockPage {
  protected readonly title = translateSignal('nav.flowLock');
  protected readonly flowLockCode = FLOW_LOCK_CODE;
  protected readonly formRefreshCode = FORM_REFRESH_CODE;
  protected readonly inFlightCode = IN_FLIGHT_CODE;
}
