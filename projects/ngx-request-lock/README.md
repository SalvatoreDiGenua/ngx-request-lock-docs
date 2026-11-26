# ngx-request-lock

Disable Angular buttons during HTTP requests and expose loading state through signals.

[![npm version](https://img.shields.io/npm/v/ngx-request-lock.svg)](https://www.npmjs.com/package/ngx-request-lock)
[![npm downloads](https://img.shields.io/npm/dm/ngx-request-lock.svg)](https://www.npmjs.com/package/ngx-request-lock)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ngx-request-lock.svg?label=minzip)](https://bundlephobia.com/package/ngx-request-lock)
[![Angular](https://img.shields.io/badge/Angular-%5E22.0.0-dd0031.svg)](https://angular.dev)

[English documentation](https://ngx-request-lock-docs.netlify.app/) | [Documentazione in italiano](https://ngx-request-lock-docs.netlify.app/it/)

`ngx-request-lock` connects a button's disabled state to selected Angular `HttpClient` calls. Add `ngxRequestLock` to a button and pass the click event's `HttpContext` to the request. A shared `requestId` coordinates multiple buttons and concurrent or chained calls; a boolean signal exposes the pending state for loading labels and spinners.

The directive has a **10-second safety unlock**, so a slow request can outlast the button's disabled state. It limits repeat clicks in the browser; server-side idempotency is still needed for operations that must never run twice.

## Contents

- [Requirements and installation](#requirements-and-installation)
- [Compatibility](#compatibility)
- [Configure the HTTP interceptor](#configure-the-http-interceptor)
- [Disable a button during an HTTP request](#disable-a-button-during-an-http-request)
- [Use an explicit request ID](#use-an-explicit-request-id)
- [Coordinate buttons and chained requests](#coordinate-buttons-and-chained-requests)
- [Show loading state with a signal](#show-loading-state-with-a-signal)
- [Request lifecycle and safety timeouts](#request-lifecycle-and-safety-timeouts)
- [Public API](#public-api)
- [Scope and limitations](#scope-and-limitations)
- [Documentation and support](#documentation-and-support)

## Requirements and installation

```bash
npm install ngx-request-lock
```

- The current package declares Angular peer dependencies `@angular/common ^22.0.0` and `@angular/core ^22.0.0`.
- Examples use standalone components, functional HTTP interceptors and signals.
- The default ID generator uses `crypto.randomUUID()`, which requires a secure browser context: HTTPS or `localhost`.

The library ships in Angular Package Format with `sideEffects: false` and supports tree-shaking. Its only declared runtime dependency is `tslib`, alongside the Angular peer dependencies.

## Compatibility

| `ngx-request-lock` | Angular   |
| ------------------ | --------- |
| `1.x`              | `^22.0.0` |

## Configure the HTTP interceptor

Register `provideRequestLock()` in the application config:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRequestLock } from 'ngx-request-lock';

export const appConfig: ApplicationConfig = {
  providers: [provideRequestLock()],
};
```

This provider registers `HttpClient` with `requestLockInterceptor`. If your app already configures `provideHttpClient`, add the interceptor to that configuration instead of calling `provideRequestLock()` alongside it:

```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { requestLockInterceptor } from 'ngx-request-lock';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([requestLockInterceptor]))],
};
```

Keep your existing HTTP features and interceptors in the same configuration.

## Disable a button during an HTTP request

The directive enriches the host's native click event with `requestId` and a ready `HttpContext`. Type the handler as `RequestLockMouseEvent` and pass `event.context` to `HttpClient`:

```ts
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RequestLockDirective, RequestLockMouseEvent } from 'ngx-request-lock';

@Component({
  selector: 'app-save-button',
  imports: [RequestLockDirective],
  template: `
    <button type="button" ngxRequestLock (click)="save($event)">Save</button>
  `,
})
export class SaveButton {
  private readonly http = inject(HttpClient);

  protected save(event: RequestLockMouseEvent): void {
    this.http
      .post(
        '/api/items',
        { title: 'Hello' },
        {
          context: event.context,
        },
      )
      .subscribe();
  }
}
```

The `(click)` binding must be on the element carrying the directive. A handler on a descendant can run before the directive enriches the event; use an explicit ID for that pattern. The example subscribes to start the request; add error handling appropriate to your application.

## Use an explicit request ID

A template reference exposes the directive's `requestId()` signal. Build a request context from that ID when the handler does not use the enriched event:

```html
<button
  type="button"
  ngxRequestLock
  #lock="requestLock"
  (click)="ping(lock.requestId())"
>
  Ping
</button>
```

In the component, inject `HttpClient` and use the exported helper:

```ts
import { createRequestLockContext } from 'ngx-request-lock';

// Component method; `http` is an injected HttpClient.
protected ping(id: string): void {
  this.http.get('/api/ping', {
    context: createRequestLockContext(id),
  }).subscribe();
}
```

`HttpContext` holds client-side Angular metadata. The lock ID is not serialized into headers, the request body or query parameters, and is not sent to the server.

## Coordinate buttons and chained requests

Give related buttons the same ID and tag every participating request with it. In this example, Save sends a POST followed by a GET; Refresh joins the same flow:

```ts
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { switchMap } from 'rxjs';
import {
  RequestLockDirective,
  createRequestLockContext,
} from 'ngx-request-lock';

@Component({
  selector: 'app-item-editor',
  imports: [RequestLockDirective],
  template: `
    <button type="button" ngxRequestLock [requestId]="flowId" (click)="save()">
      Save
    </button>
    <button
      type="button"
      ngxRequestLock
      [requestId]="flowId"
      (click)="refresh()"
    >
      Refresh
    </button>
  `,
})
export class ItemEditor {
  private readonly http = inject(HttpClient);
  protected readonly flowId = crypto.randomUUID();

  protected save(): void {
    const context = createRequestLockContext(this.flowId);
    this.http
      .post('/api/items', { title: 'Hello' }, { context })
      .pipe(switchMap(() => this.http.get('/api/items', { context })))
      .subscribe();
  }

  protected refresh(): void {
    this.http
      .get('/api/items', {
        context: createRequestLockContext(this.flowId),
      })
      .subscribe();
  }
}
```

The interceptor reference-counts active requests per ID. The pending signal remains true while any tagged call is active. Linked buttons observe that state, subject to the directive's safety timeouts. A delayed follow-up request joins when it starts; the counter does not reserve a lock across gaps with no active requests.

## Show loading state with a signal

For a component that owns a stable ID, store the pending signal once and bind it in the template:

```ts
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  RequestLockDirective,
  RequestLockService,
  createRequestLockContext,
} from 'ngx-request-lock';

@Component({
  selector: 'app-loading-button',
  imports: [RequestLockDirective],
  template: `
    <button
      type="button"
      ngxRequestLock
      [requestId]="requestId"
      [attr.aria-busy]="isPending()"
      (click)="save()"
    >
      {{ isPending() ? 'Saving…' : 'Save' }}
    </button>
  `,
})
export class LoadingButton {
  private readonly http = inject(HttpClient);
  protected readonly requestId = crypto.randomUUID();
  protected readonly isPending = inject(RequestLockService).isPending(
    this.requestId,
  );

  protected save(): void {
    this.http
      .post(
        '/api/items',
        { title: 'Hello' },
        {
          context: createRequestLockContext(this.requestId),
        },
      )
      .subscribe();
  }
}
```

`isPending(id)` returns a new computed signal on each call. Retain it when reading the same ID repeatedly. Use the signal for custom spinners, panel states or accessible loading labels. The directive itself only updates the target button's native `disabled` attribute.

## Request lifecycle and safety timeouts

1. Clicking a directive host immediately locks its target button.
2. Each subscribed HTTP request tagged with the ID increments the pending counter.
3. The interceptor uses `finalize` to decrement the counter on completion, error or unsubscription.
4. When the counter reaches zero, the pending signal becomes false and linked directives unlock.

Two safety timers are scheduled on click:

- At **500 ms**, the directive unlocks if it has not observed a pending request.
- At **10 seconds**, it unlocks unconditionally, even if HTTP is still pending.

These timers affect the directive's disabled state. They do not cancel requests or reset the service's pending counter. A loading indicator bound to the signal can therefore remain active after the button unlocks.

## Public API

| Export                         | Kind                               | Purpose                                                                    |
| ------------------------------ | ---------------------------------- | -------------------------------------------------------------------------- |
| `REQUEST_LOCK_ID`              | `HttpContextToken<string \| null>` | Request lock identifier; defaults to `null`.                               |
| `createRequestLockContext(id)` | `(id: string) => HttpContext`      | Creates metadata for a tracked request.                                    |
| `requestLockInterceptor`       | `HttpInterceptorFn`                | Tracks requests carrying a lock ID.                                        |
| `RequestLockService`           | Root service                       | Exposes `start(id)`, `end(id)` and `isPending(id): Signal<boolean>`.       |
| `RequestLockDirective`         | Standalone directive               | Selector `[ngxRequestLock]`, export name `requestLock`, input `requestId`. |
| `RequestLockMouseEvent`        | Interface extending `MouseEvent`   | Native click event enriched with `requestId` and `context`.                |
| `provideRequestLock()`         | `() => EnvironmentProviders`       | Registers `HttpClient` with the lock interceptor.                          |

`RequestLockMouseEvent.requestId` and `.context` are optional in the TypeScript interface for compatibility with Angular's native event typing. The directive assigns them to the click event on its host.

## Scope and limitations

- Only requests tagged with a lock ID are tracked; untagged requests pass through unchanged.
- The directive targets the matching or nearest ancestor button, or the first descendant button. It does not disable every control in an arbitrary form or panel.
- It does not deduplicate requests already sent, cancel requests or debounce interactions.
- It does not replace server-side idempotency or concurrency controls.
- It ships no CSS, global spinner or toast system. Render custom loading UI from the pending signal.
- The 10-second safety unlock means it is not a guarantee that buttons stay disabled for an entire long-running request.

## Documentation and support

| Guide         | English                                                                                 | Italiano                                                                                           |
| ------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Repeat clicks | [Prevent duplicate requests](https://ngx-request-lock-docs.netlify.app/problem/)        | [Evitare richieste duplicate](https://ngx-request-lock-docs.netlify.app/it/problem/)               |
| Architecture  | [HTTP interceptor and signals](https://ngx-request-lock-docs.netlify.app/architecture/) | [Interceptor HTTP e signal](https://ngx-request-lock-docs.netlify.app/it/architecture/)            |
| Setup         | [Installation](https://ngx-request-lock-docs.netlify.app/installation/)                 | [Installazione](https://ngx-request-lock-docs.netlify.app/it/installation/)                        |
| Examples      | [Button loading state](https://ngx-request-lock-docs.netlify.app/directive-usage/)      | [Stato di caricamento dei pulsanti](https://ngx-request-lock-docs.netlify.app/it/directive-usage/) |
| Shared flows  | [Coordinate HTTP requests](https://ngx-request-lock-docs.netlify.app/flow-lock/)        | [Coordinare le richieste HTTP](https://ngx-request-lock-docs.netlify.app/it/flow-lock/)            |

[Source code](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/tree/main/projects/ngx-request-lock) | [Issues](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/issues) | [Changelog](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/blob/main/CHANGELOG.md)

## License

[MIT](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/blob/main/LICENSE) © 2026.
