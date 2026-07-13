import { Component } from '@angular/core';
import { TranslocoDirective, translateSignal } from '@jsverse/transloco';
import { CalloutComponent } from '../../shared/ui/callout/callout';
import { CodeBlockComponent } from '../../shared/ui/code-block/code-block';
import { CodeExampleComponent } from '../../shared/ui/code-example/code-example';
import { LinkCardComponent } from '../../shared/ui/link-card/link-card';
import { SectionHeadingComponent } from '../../shared/ui/section-heading/section-heading';

const INSTALL_CMD = `npm install ngx-request-lock`;

const PROVIDER_CODE = `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideRequestLock } from 'ngx-request-lock';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRequestLock(),
  ],
};`;

const MANUAL_PROVIDER_CODE = `import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestLockInterceptor } from 'ngx-request-lock';

import { authInterceptor } from './core/http/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, requestLockInterceptor]),
    ),
  ],
};`;

const CONTEXT_CODE = `import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { createRequestLockContext } from 'ngx-request-lock';

const http = inject(HttpClient);

http.post('/api/users', payload, {
  context: createRequestLockContext(id),
}).subscribe();`;

const DIRECTIVE_CODE = `import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RequestLockDirective,
  createRequestLockContext,
} from 'ngx-request-lock';

@Component({
  selector: 'ngx-save-button',
  imports: [RequestLockDirective],
  template: \`
    <button ngxRequestLock #lock="requestLock" (click)="save(lock.requestId())">
      Save
    </button>
  \`,
})
export class SaveButton {
  private readonly http = inject(HttpClient);

  protected save(id: string): void {
    this.http
      .post('/api/users', {}, { context: createRequestLockContext(id) })
      .subscribe();
  }
}`;

const FULL_CONFIG_CODE = `import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideRequestLock } from 'ngx-request-lock';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideRequestLock(),
  ],
};`;

const FULL_COMPONENT_CODE = `import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RequestLockDirective,
  createRequestLockContext,
} from 'ngx-request-lock';

@Component({
  selector: 'ngx-ping',
  imports: [RequestLockDirective],
  template: \`
    <button
      ngxRequestLock
      #lock="requestLock"
      type="button"
      (click)="ping(lock.requestId())"
    >
      Ping
    </button>
  \`,
})
export class Ping {
  private readonly http = inject(HttpClient);

  protected ping(id: string): void {
    this.http
      .get('/api/ping', { context: createRequestLockContext(id) })
      .subscribe();
  }
}`;

@Component({
  selector: 'ngx-installation-page',
  imports: [
    TranslocoDirective,
    CalloutComponent,
    CodeBlockComponent,
    CodeExampleComponent,
    LinkCardComponent,
    SectionHeadingComponent,
  ],
  template: `
    <article *transloco="let t" class="max-w-none">
      <h1 class="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {{ title() }}
      </h1>

      <p
        class="text-base text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.intro')"
      ></p>

      <ngx-section-heading anchor="requirements">
        {{ t('installation.requirements.title') }}
      </ngx-section-heading>

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.requirements.list')"
      ></ul>

      <ngx-section-heading anchor="install">
        {{ t('installation.install.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.install.text')"
      ></p>

      <ngx-code-block [code]="installCmd" language="bash" />

      <ngx-callout variant="note">
        <p [innerHTML]="t('installation.install.peerNote')"></p>
      </ngx-callout>

      <ngx-section-heading anchor="provider">
        {{ t('installation.provider.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.provider.text')"
      ></p>

      <ngx-code-example
        [code]="providerCode"
        language="typescript"
        title="app.config.ts"
      />

      <ngx-callout variant="warning">
        <p [innerHTML]="t('installation.provider.warning')"></p>
      </ngx-callout>

      <ngx-section-heading anchor="manual-provider">
        {{ t('installation.manualProvider.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.manualProvider.text')"
      ></p>

      <ngx-code-example
        [code]="manualProviderCode"
        language="typescript"
        title="app.config.ts"
      />

      <ngx-callout variant="info">
        <p [innerHTML]="t('installation.manualProvider.note')"></p>
      </ngx-callout>

      <ngx-section-heading anchor="request-context">
        {{ t('installation.context.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.context.text')"
      ></p>

      <ngx-code-example [code]="contextCode" language="typescript" />

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.context.bullets')"
      ></ul>

      <ngx-section-heading anchor="directive">
        {{ t('installation.directive.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.directive.text')"
      ></p>

      <ngx-code-example [code]="directiveCode" language="typescript" />

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.directive.bullets')"
      ></ul>

      <ngx-section-heading anchor="unlock-lifecycle">
        {{ t('installation.lifecycle.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.lifecycle.text')"
      ></p>

      <ol
        class="list-decimal space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.lifecycle.steps')"
      ></ol>

      <ngx-section-heading anchor="safety-timeouts" level="h3">
        {{ t('installation.safety.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.safety.text')"
      ></p>

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('installation.safety.bullets')"
      ></ul>

      <ngx-section-heading anchor="full-example">
        {{ t('installation.fullExample.title') }}
      </ngx-section-heading>

      <p class="text-slate-700 dark:text-slate-300">
        {{ t('installation.fullExample.text') }}
      </p>

      <ngx-code-example
        [code]="fullConfigCode"
        language="typescript"
        [title]="t('installation.fullExample.configTitle')"
      />

      <ngx-code-example
        [code]="fullComponentCode"
        language="typescript"
        [title]="t('installation.fullExample.componentTitle')"
      />

      <ngx-section-heading anchor="next-steps">
        {{ t('installation.next.title') }}
      </ngx-section-heading>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <ngx-link-card
          [title]="t('installation.next.examplesTitle')"
          [description]="t('installation.next.examplesDesc')"
          route="/examples"
        />
        <ngx-link-card
          [title]="t('installation.next.architectureTitle')"
          [description]="t('installation.next.architectureDesc')"
          route="/architecture"
        />
      </div>
    </article>
  `,
})
export default class InstallationPage {
  protected readonly title = translateSignal('nav.installation');
  protected readonly installCmd = INSTALL_CMD;
  protected readonly providerCode = PROVIDER_CODE;
  protected readonly manualProviderCode = MANUAL_PROVIDER_CODE;
  protected readonly contextCode = CONTEXT_CODE;
  protected readonly directiveCode = DIRECTIVE_CODE;
  protected readonly fullConfigCode = FULL_CONFIG_CODE;
  protected readonly fullComponentCode = FULL_COMPONENT_CODE;
}
