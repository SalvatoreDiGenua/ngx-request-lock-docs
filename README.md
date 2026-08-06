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
- [Quick start](#quick-start)
- [Usage patterns](#usage-patterns)
  - [Basic: one button, one request](#basic-one-button-one-request)
  - [Shared flow: many elements, many requests](#shared-flow-many-elements-many-requests)
  - [Pending state: swap label, show spinner](#pending-state-swap-label-show-spinner)
- [Public API](#public-api)
- [What this library is not](#what-this-library-is-not)
- [Project structure](#project-structure)
- [Local development](#local-development)
- [Issues](#issues)
- [Changelog](#changelog)
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

## Quick start

Register the provider in your application config:

```ts
// app.config.ts
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

## Usage patterns

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

## Project structure

This repository is an Angular monorepo containing both the library and its documentation site.

```
.
├── projects/ngx-request-lock/   The published library source
│   ├── src/                     Library entry point and public API
│   ├── package.json             npm manifest (version 1.0.0)
│   ├── README.md                npm-facing README
│   └── ng-package.json          Angular Package Format config
├── src/                         Documentation Angular app
│   ├── app/
│   │   ├── core/                Layout, i18n, navigation
│   │   ├── pages/               Route-based docs pages
│   │   └── shared/ui/           Reusable blocks (callout, code-block, ...)
│   └── styles.css               Global styles and design tokens
├── public/i18n/                 en.json and it.json translation files
├── public/                      Static assets (favicons, manifest)
├── CHANGELOG.md                 Release notes
├── LICENSE                      MIT
└── README.md                    This file
```

The library and the docs app are versioned independently. Library releases are tracked in [`CHANGELOG.md`](./CHANGELOG.md).

## Local development

Install dependencies:

```bash
npm install
```

Build the library first (the docs app imports from `dist/ngx-request-lock` via the workspace path mapping):

```bash
npm run build:lib
```

Run the docs app locally:

```bash
npm start
```

Then open `http://localhost:4200/`.

Other useful scripts:

```bash
npm run build          # Production build of the docs app
npm run build:lib      # Production build of the library
npm test               # Run the docs app test suite
npm run lint           # Lint both projects
```

Library unit tests live under `projects/ngx-request-lock/src/lib/**/*.spec.ts` and run with Vitest via Angular's test builder:

```bash
npx ng test ngx-request-lock --watch=false
```

## Issues

Bug reports and feature requests are welcome on the [GitHub issue tracker](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/issues).

## Changelog

See [`CHANGELOG.md`](./CHANGELOG.md) for the full list of changes across releases.

## License

[MIT](./LICENSE) (c) 2026.
