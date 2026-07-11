# ngx-request-lock

`ngx-request-lock` is an Angular library that helps coordinate UI locking around HTTP requests.

It lets you attach a request tracking id to an HTTP call, track its pending state through a functional interceptor, and expose that state through a lightweight service based on Angular signals.

## Features

- Request-scoped tracking with `HttpContextToken`.
- Functional HTTP interceptor integration.
- Pending-state tracking through an injectable service.
- Signal-based state for reactive UIs.
- Minimal public API exported from the library entry point.

## How it works

The library uses three main pieces:

- `HTTPTRACKINGID`, an `HttpContextToken` used to mark requests that should be tracked. [file:505]
- `httpTrackingInterceptor`, a functional interceptor that starts tracking before the request and stops tracking when it finishes. [file:506]
- `HttpTrackingService`, a root-provided service that keeps track of pending request counts and creates typed request contexts. [file:508]

The public API is exposed from the library entry point. [file:507]

## Installation

```bash
npm install ngx-request-lock
```

## Usage

Register the interceptor in your Angular application and use the service to create a request context when needed.

```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { httpTrackingInterceptor } from 'ngx-request-lock';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([httpTrackingInterceptor]))],
};
```

Use the service to create a context for tracked requests:

```ts
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpTrackingService } from 'ngx-request-lock';

const http = inject(HttpClient);
const tracking = inject(HttpTrackingService);

http.get('/api/items', {
  context: tracking.createContext('items-list'),
});
```

Check the pending state in your component or UI logic:

```ts
const pending = tracking.isPending('items-list');
```

## Building

To build the library, run:

```bash
ng build ngx-request-lock
```

The build artifacts are generated in `dist/`.

## Publishing

After building the library:

```bash
cd dist/ngx-request-lock
npm publish
```

## Public API

The library entry point exports the main pieces you need to integrate it into an Angular app:

- `HTTPTRACKINGID`
- `HttpTrackingService`
- `httpTrackingInterceptor`

## Development

Use the Angular CLI and the standard library workflow for local development.

```bash
ng test
```
