# ngx-request-lock 🔒

`ngx-request-lock` is an Angular library that binds a UI flow to the lifecycle of its HTTP requests.

A shared `requestId` coordinates every element and every request in the flow (buttons, forms, panels) and re-enables them together when the whole flow settles. No manual `loading` flags. No `finalize` in user code. No manual reset on error paths.

## Features ✨

- Standalone directive `[ngxRequestLock]` that toggles the nearest button's `disabled` attribute.
- Functional HTTP interceptor driven by request metadata (`HttpContext`).
- Signal-based `RequestLockService` with reference-counted pending state.
- Whole-flow locking: any number of directives and requests can share one `requestId`.
- Zero CSS shipped: the library stays styling-agnostic.
- Angular Package Format build, tree-shakable, `sideEffects: false`.

## Requirements 🧰

- Angular **v22** or newer.
- Peer dependencies: `@angular/common ^22.0.0`, `@angular/core ^22.0.0`.
- Standalone APIs, functional HTTP interceptors, and signals (default in v22).
- Secure context (HTTPS or `localhost`) for `crypto.randomUUID()`.

## Installation 📦

```bash
npm install ngx-request-lock
```

## Setup 🚀

Register the provider in your application config:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRequestLock } from 'ngx-request-lock';

export const appConfig: ApplicationConfig = {
  providers: [provideRequestLock()],
};
```

`provideRequestLock()` calls `provideHttpClient(withInterceptors([requestLockInterceptor]))` internally. Do not add a separate `provideHttpClient(...)` alongside it, or the interceptor will be overridden.

If your app already configures `provideHttpClient` with other interceptors, skip `provideRequestLock()` and register the interceptor directly:

```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestLockInterceptor } from 'ngx-request-lock';

providers: [
  provideHttpClient(withInterceptors([requestLockInterceptor /*, ...others */])),
];
```

## Usage 💡

Place the directive on the interactive element and tag the request with the same id:

```ts
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  RequestLockDirective,
  createRequestLockContext,
} from 'ngx-request-lock';

@Component({
  selector: 'app-ping',
  imports: [RequestLockDirective],
  template: `
    <button ngxRequestLock #lock="requestLock" (click)="ping(lock.requestId())">
      Ping
    </button>
  `,
})
export class Ping {
  private readonly http = inject(HttpClient);

  protected ping(id: string): void {
    this.http
      .get('/api/ping', { context: createRequestLockContext(id) })
      .subscribe();
  }
}
```

The button is disabled from the click until the request settles (success or error). Two safety timeouts also unblock the element:

- **500 ms** if no pending state has been observed by then.
- **10 s** unconditionally.

### Shared flow across multiple elements 🔗

Bind the same `requestId` to every directive and every request that participates in the same flow:

```ts
@Component({
  imports: [RequestLockDirective],
  template: `
    <button ngxRequestLock [requestId]="flowId()" (click)="save()">Save</button>
    <button ngxRequestLock [requestId]="flowId()" (click)="reset()">Reset</button>
  `,
})
export class Editor {
  private readonly http = inject(HttpClient);
  protected readonly flowId = signal(crypto.randomUUID());

  protected save(): void {
    this.http
      .post('/api/items', payload, {
        context: createRequestLockContext(this.flowId()),
      })
      .subscribe();
  }

  protected reset(): void {
    /* ... */
  }
}
```

Every request that carries the same id contributes to one reference-counted lock. Both buttons stay disabled until every request in the flow has settled.

### Reading pending state 📡

`RequestLockService.isPending(id)` returns a `Signal<boolean>` you can consume anywhere:

```ts
import { RequestLockService } from 'ngx-request-lock';

const service = inject(RequestLockService);
const isPending = service.isPending('items-flow');
```

Use it to swap a button label, render a spinner, dim a panel, or set `[attr.aria-busy]` on a wrapper. `isPending(id)` returns a new `computed` on every call, so store it in a field if you read it repeatedly.

## Public API 📚

| Export                        | Kind                                | Purpose                                                          |
| ----------------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| `REQUEST_LOCK_ID`             | `HttpContextToken<string \| null>`  | Tags a request with a lock identifier. Default is `null`.        |
| `createRequestLockContext(id)`| `(id: string) => HttpContext`       | Builds the `HttpContext` for a tracked request.                  |
| `requestLockInterceptor`      | `HttpInterceptorFn`                 | Reads the id from the context and drives the service.            |
| `RequestLockService`          | Root-provided service               | Reference-counted pending state, `isPending(id): Signal<boolean>`. |
| `RequestLockDirective`        | Standalone directive                | Selector `[ngxRequestLock]`, exportAs `requestLock`.              |
| `provideRequestLock()`        | `() => EnvironmentProviders`        | Registers `provideHttpClient(withInterceptors([...]))` in one call. |

## What this library is not ⛔

- It does not cancel or debounce requests.
- It does not replace HTTP-level idempotency on the server.
- It does not implement a global spinner or toast system.
- It does not ship any CSS.

## Building 🛠️

From the workspace root:

```bash
ng build ngx-request-lock
```

The build artifacts are written to `dist/ngx-request-lock`.

## Publishing 📤

```bash
cd dist/ngx-request-lock
npm publish
```

## Documentation 📖

Full guide, architecture notes, and interactive examples are available in the docs app at the workspace root.
