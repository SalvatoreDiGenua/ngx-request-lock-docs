# ngx-request-lock

UI locking bound to the lifecycle of your HTTP requests, for Angular.

[![npm version](https://img.shields.io/npm/v/ngx-request-lock.svg)](https://www.npmjs.com/package/ngx-request-lock)
[![npm downloads](https://img.shields.io/npm/dm/ngx-request-lock.svg)](https://www.npmjs.com/package/ngx-request-lock)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ngx-request-lock.svg?label=minzip)](https://bundlephobia.com/package/ngx-request-lock)
[![Angular](https://img.shields.io/badge/Angular-%5E22.0.0-dd0031.svg)](https://angular.dev)

`ngx-request-lock` binds a UI flow to the lifecycle of its HTTP requests. A shared `requestId` coordinates buttons, forms, and panels across single or chained requests, unlocking them automatically when all calls complete.

## Table of contents

- [Why this library](#why-this-library)
- [Requirements](#requirements)
- [Compatibility](#compatibility)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
  - [Basic: one button, one request](#basic-one-button-one-request)
  - [Shared flow: many elements, many requests](#shared-flow-many-elements-many-requests)
  - [Pending state: swap label, show spinner](#pending-state-swap-label-show-spinner)
- [Public API](#public-api)
- [What this library is not](#what-this-library-is-not)
- [Links](#links)
- [License](#license)

## Why this library

Front-end state bugs often stem from active UI elements during pending HTTP requests. Unblocked controls allow repeated clicks and concurrent edits, sending duplicate requests to the server and causing state divergence.

`ngx-request-lock` uses `requestId` as the unit of coordination. Interactive elements and HTTP requests share an ID to form a reference-counted flow. The interceptor manages state through Angular primitives (`HttpContext`, `HttpInterceptorFn`, signals) without external state managers or RxJS code.

## Requirements

- Angular **v22** or newer.
- Peer dependencies: `@angular/common ^22.0.0`, `@angular/core ^22.0.0`.
- Standalone APIs, functional HTTP interceptors, and signals (default in v22).
- Secure context (HTTPS or `localhost`) for `crypto.randomUUID()`.

## Compatibility

| `ngx-request-lock` | Angular   |
| ------------------ | --------- |
| `1.x`              | `^22.0.0` |

## Installation

```bash
npm install ngx-request-lock
```

The library ships as Angular Package Format, is tree-shakable, and is marked `sideEffects: false`. The only runtime dependency is `tslib`.

## Setup

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
  provideHttpClient(
    withInterceptors([requestLockInterceptor /*, ...others */]),
  ),
];
```

## Usage

### Basic: one button, one request

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

### Shared flow: many elements, many requests

Bind the same `requestId` to every directive and every request that participates in the same flow:

```ts
@Component({
  imports: [RequestLockDirective],
  template: `
    <button ngxRequestLock [requestId]="flowId()" (click)="save()">Save</button>
    <button ngxRequestLock [requestId]="flowId()" (click)="reset()">
      Reset
    </button>
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

### Pending state: swap label, show spinner

`RequestLockService.isPending(id)` returns a `Signal<boolean>` you can consume anywhere:

```ts
import { computed, inject, viewChild } from '@angular/core';
import { RequestLockDirective, RequestLockService } from 'ngx-request-lock';

private readonly service = inject(RequestLockService);
private readonly lock = viewChild.required(RequestLockDirective);

protected readonly isPending = computed(() =>
  this.service.isPending(this.lock().requestId())(),
);
```

Use it to swap a button label, render a spinner, dim a panel, or set `[attr.aria-busy]` on a wrapper. `isPending(id)` returns a new `computed` on every call, so store it in a field if you read it repeatedly.

## Public API

| Export                         | Kind                               | Purpose                                                             |
| ------------------------------ | ---------------------------------- | ------------------------------------------------------------------- |
| `REQUEST_LOCK_ID`              | `HttpContextToken<string \| null>` | Tags a request with a lock identifier. Default is `null`.           |
| `createRequestLockContext(id)` | `(id: string) => HttpContext`      | Builds the `HttpContext` for a tracked request.                     |
| `requestLockInterceptor`       | `HttpInterceptorFn`                | Reads the id from the context and drives the service.               |
| `RequestLockService`           | Root-provided service              | Reference-counted pending state, `isPending(id): Signal<boolean>`.  |
| `RequestLockDirective`         | Standalone directive               | Selector `[ngxRequestLock]`, exportAs `requestLock`.                |
| `provideRequestLock()`         | `() => EnvironmentProviders`       | Registers `provideHttpClient(withInterceptors([...]))` in one call. |

## What this library is not

- It does not cancel or debounce requests.
- It does not replace HTTP-level idempotency on the server.
- It does not implement a global spinner or toast system.
- It does not ship any CSS.

## Links

- **Repository**: [github.com/SalvatoreDiGenua/ngx-request-lock-docs](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs)
- **Issues**: [github.com/SalvatoreDiGenua/ngx-request-lock-docs/issues](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/issues)
- **Changelog**: [CHANGELOG.md](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/blob/main/CHANGELOG.md)
- **Documentation site**: [DOCS](https://ngx-request-lock-docs.netlify.app/)

## License

[MIT](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/blob/main/LICENSE) (c) 2026.
