import { Component } from '@angular/core';
import { TranslocoDirective, translateSignal } from '@jsverse/transloco';
import { CalloutComponent } from '../../shared/ui/callout/callout';
import { CodeExampleComponent } from '../../shared/ui/code-example/code-example';
import { LinkCardComponent } from '../../shared/ui/link-card/link-card';
import { SectionHeadingComponent } from '../../shared/ui/section-heading/section-heading';
import {
  BasicDemo,
  DeleteDemo,
  FormDemo,
  PendingStateDemo,
  SaveDemo,
} from '../examples/demos';

const BASIC_CODE = `import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RequestLockDirective,
  createRequestLockContext,
} from 'ngx-request-lock';

@Component({
  selector: 'ngx-basic-example',
  imports: [RequestLockDirective],
  template: \`
    <button ngxRequestLock #lock="requestLock" (click)="ping(lock.requestId())">
      Ping
    </button>
  \`,
})
export class BasicExample {
  private readonly http = inject(HttpClient);

  protected ping(id: string): void {
    this.http
      .get('/api/ping', { context: createRequestLockContext(id) })
      .subscribe();
  }
}`;

const SAVE_CODE = `@Component({
  selector: 'ngx-save-user',
  imports: [RequestLockDirective],
  template: \`
    <button ngxRequestLock #lock="requestLock" (click)="save(lock.requestId())">
      Save
    </button>
  \`,
})
export class SaveUser {
  private readonly http = inject(HttpClient);
  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: [''],
    email: [''],
  });

  protected save(id: string): void {
    this.http
      .post('/api/users', this.form.getRawValue(), {
        context: createRequestLockContext(id),
      })
      .subscribe();
  }
}`;

const DELETE_CODE = `@Component({
  selector: 'ngx-delete-user',
  imports: [RequestLockDirective],
  template: \`
    <button
      ngxRequestLock
      #lock="requestLock"
      class="text-red-600"
      (click)="remove(lock.requestId())"
    >
      Delete
    </button>
  \`,
})
export class DeleteUser {
  private readonly http = inject(HttpClient);
  protected readonly userId = input.required<string>();

  protected remove(id: string): void {
    this.http
      .delete(\`/api/users/\${this.userId()}\`, {
        context: createRequestLockContext(id),
      })
      .subscribe();
  }
}`;

const FORM_CODE = `@Component({
  selector: 'ngx-signup-form',
  imports: [ReactiveFormsModule, RequestLockDirective],
  template: \`
    <form [formGroup]="form">
      <input formControlName="email" type="email" />
      <input formControlName="password" type="password" />

      <button
        ngxRequestLock
        #lock="requestLock"
        [disabled]="form.invalid"
        (click)="submit(lock.requestId())"
      >
        Sign up
      </button>
    </form>
  \`,
})
export class SignupForm {
  private readonly http = inject(HttpClient);
  protected readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected submit(id: string): void {
    if (this.form.invalid) return;

    this.http
      .post('/api/signup', this.form.getRawValue(), {
        context: createRequestLockContext(id),
      })
      .subscribe();
  }
}`;

const PENDING_STATE_CODE = `import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RequestLockDirective,
  RequestLockService,
  createRequestLockContext,
} from 'ngx-request-lock';

@Component({
  selector: 'ngx-pending-save',
  imports: [RequestLockDirective],
  template: \`
    <button
      ngxRequestLock
      #lock="requestLock"
      type="button"
      [attr.aria-busy]="isPending() ? 'true' : null"
      (click)="save(lock.requestId())"
    >
      @if (isPending()) {
        <span class="spinner" aria-hidden="true"></span>
        <span>Saving&hellip;</span>
      } @else {
        <span>Save</span>
      }
    </button>
  \`,
})
export class PendingSave {
  private readonly http = inject(HttpClient);
  private readonly lockService = inject(RequestLockService);
  private readonly lock = viewChild.required(RequestLockDirective);

  // Reactive pending flag derived from the shared service.
  protected readonly isPending = computed(() =>
    this.lockService.isPending(this.lock().requestId)(),
  );

  protected save(id: string): void {
    this.http
      .post('/api/users', {}, { context: createRequestLockContext(id) })
      .subscribe();
  }
}`;

const CUSTOM_DIRECTIVE_CODE = `import { Directive, Renderer2, inject } from '@angular/core';
import { RequestLockDirective } from 'ngx-request-lock';

/**
 * Docs-app-only example.
 * Extends RequestLockDirective and overrides setBlockStatus to render
 * a custom loading animation instead of toggling [disabled].
 */
@Directive({
  selector: '[ngxLoadingRequestLock]',
  exportAs: 'loadingRequestLock',
})
export class LoadingRequestLockDirective extends RequestLockDirective {
  private readonly localRenderer = inject(Renderer2);
  private spinner: HTMLElement | null = null;

  protected override setBlockStatus(): void {
    if (!this.button) return;

    if (this.isBlocked) {
      this.localRenderer.setAttribute(this.button, 'aria-disabled', 'true');
      this.localRenderer.setAttribute(this.button, 'aria-busy', 'true');
      this.localRenderer.addClass(this.button, 'ngx-lock-loading');
      this.attachSpinner();
      return;
    }

    this.localRenderer.removeAttribute(this.button, 'aria-disabled');
    this.localRenderer.removeAttribute(this.button, 'aria-busy');
    this.localRenderer.removeClass(this.button, 'ngx-lock-loading');
    this.detachSpinner();
  }

  private attachSpinner(): void {
    if (this.spinner || !this.button) return;
    const el = this.localRenderer.createElement('span') as HTMLElement;
    this.localRenderer.addClass(el, 'ngx-lock-spinner');
    this.localRenderer.setAttribute(el, 'aria-hidden', 'true');
    this.localRenderer.appendChild(this.button, el);
    this.spinner = el;
  }

  private detachSpinner(): void {
    if (!this.spinner || !this.button) return;
    this.localRenderer.removeChild(this.button, this.spinner);
    this.spinner = null;
  }
}`;

const CUSTOM_USAGE_CODE = `@Component({
  selector: 'ngx-fancy-save',
  imports: [LoadingRequestLockDirective],
  template: \`
    <button
      ngxLoadingRequestLock
      #lock="loadingRequestLock"
      (click)="save(lock.requestId())"
    >
      <span>Save</span>
    </button>
  \`,
})
export class FancySave {
  private readonly http = inject(HttpClient);

  protected save(id: string): void {
    this.http
      .post('/api/users', {}, { context: createRequestLockContext(id) })
      .subscribe();
  }
}`;

const CUSTOM_STYLE_CODE = `/* consumer styles */
.ngx-lock-loading {
  position: relative;
  cursor: not-allowed;
  opacity: 0.75;
  pointer-events: none;
}

.ngx-lock-spinner {
  display: inline-block;
  width: 0.9em;
  height: 0.9em;
  margin-left: 0.5em;
  border-radius: 9999px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: ngx-lock-spin 0.6s linear infinite;
}

@keyframes ngx-lock-spin {
  to { transform: rotate(360deg); }
}`;

@Component({
  selector: 'ngx-directive-usage-page',
  imports: [
    TranslocoDirective,
    CalloutComponent,
    CodeExampleComponent,
    LinkCardComponent,
    SectionHeadingComponent,
    BasicDemo,
    SaveDemo,
    DeleteDemo,
    FormDemo,
    PendingStateDemo,
  ],
  template: `
    <article *transloco="let t" class="max-w-none">
      <h1 class="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {{ title() }}
      </h1>

      <p
        class="text-base text-slate-700 dark:text-slate-300"
        [innerHTML]="t('directiveUsage.intro')"
      ></p>

      <ngx-callout variant="tip">
        <p [innerHTML]="t('shared.tipConfig')"></p>
      </ngx-callout>

      <ngx-section-heading>
        {{ t('directiveUsage.basic.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('directiveUsage.basic.text')"
      ></p>

      <ngx-code-example [code]="basicCode" language="typescript" />

      <section
        class="my-6 rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40"
        [attr.aria-label]="t('shared.liveDemoAriaLabel')"
      >
        <p
          class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400"
        >
          {{ t('shared.liveDemo') }}
        </p>
        <ngx-basic-demo />
      </section>

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('directiveUsage.basic.bullets')"
      ></ul>

      <ngx-section-heading>
        {{ t('directiveUsage.crud.title') }}
      </ngx-section-heading>

      <p class="text-slate-700 dark:text-slate-300">
        {{ t('directiveUsage.crud.text') }}
      </p>

      <ngx-code-example
        [code]="saveCode"
        language="typescript"
        title="Save (POST)"
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
        <ngx-save-demo />
      </section>

      <ngx-code-example
        [code]="deleteCode"
        language="typescript"
        title="Delete (DELETE)"
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
        <ngx-delete-demo />
      </section>

      <ngx-code-example
        [code]="formCode"
        language="typescript"
        title="Reactive form submit"
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
        <ngx-form-demo />
      </section>

      <ngx-callout variant="note">
        <p [innerHTML]="t('directiveUsage.formNote')"></p>
      </ngx-callout>

      <ngx-section-heading>
        {{ t('directiveUsage.pending.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('directiveUsage.pending.text')"
      ></p>

      <section
        class="my-6 rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/40"
        [attr.aria-label]="t('shared.liveDemoAriaLabel')"
      >
        <p
          class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400"
        >
          {{ t('shared.liveDemo') }}
        </p>
        <ngx-pending-state-demo />
      </section>

      <ngx-code-example
        [code]="pendingStateCode"
        language="typescript"
        title="Signal-driven pending state"
      />

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('directiveUsage.pending.bullets')"
      ></ul>

      <ngx-callout variant="tip">
        <p [innerHTML]="t('directiveUsage.pending.tip')"></p>
      </ngx-callout>

      <ngx-section-heading>
        {{ t('directiveUsage.custom.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('directiveUsage.custom.text')"
      ></p>

      <ngx-callout variant="info">
        <p [innerHTML]="t('directiveUsage.custom.info')"></p>
      </ngx-callout>

      <ngx-code-example
        [code]="customDirectiveCode"
        language="typescript"
        title="LoadingRequestLockDirective"
      />

      <p class="text-slate-700 dark:text-slate-300">
        {{ t('directiveUsage.custom.usageText') }}
      </p>

      <ngx-code-example
        [code]="customUsageCode"
        language="typescript"
        title="Usage"
      />

      <ngx-code-example
        [code]="customStyleCode"
        language="css"
        title="Consumer styles"
      />

      <ngx-callout variant="warning">
        <p [innerHTML]="t('directiveUsage.custom.warning')"></p>
      </ngx-callout>

      <ngx-section-heading>
        {{ t('directiveUsage.next.title') }}
      </ngx-section-heading>

      <div class="grid gap-4 sm:grid-cols-2">
        <ngx-link-card
          [title]="t('directiveUsage.next.flowLockTitle')"
          [description]="t('directiveUsage.next.flowLockDesc')"
          route="/flow-lock"
        />
      </div>
    </article>
  `,
})
export default class DirectiveUsagePage {
  protected readonly title = translateSignal('nav.directiveUsage');
  protected readonly basicCode = BASIC_CODE;
  protected readonly saveCode = SAVE_CODE;
  protected readonly deleteCode = DELETE_CODE;
  protected readonly formCode = FORM_CODE;
  protected readonly pendingStateCode = PENDING_STATE_CODE;
  protected readonly customDirectiveCode = CUSTOM_DIRECTIVE_CODE;
  protected readonly customUsageCode = CUSTOM_USAGE_CODE;
  protected readonly customStyleCode = CUSTOM_STYLE_CODE;
}
