# ngx-request-lock docs 📘

Documentation site for the **ngx-request-lock** Angular library.

This project explains how the library works, how to install it, and how to use it in a real Angular application. The docs are structured as route-based pages and mirror the actual public API and architecture of the library.

## About the library 🧩

`ngx-request-lock` binds a UI flow to the lifecycle of its HTTP requests. A shared `requestId` coordinates every element and every request in the flow (buttons, forms, panels) and re-enables them together when the whole flow settles, with no manual `loading` flags.

The library exposes:

- `REQUEST_LOCK_ID`, an `HttpContextToken<string | null>` that tags a request with a lock identifier.
- `createRequestLockContext(id)`, a helper that builds the `HttpContext` to attach to the request.
- `requestLockInterceptor`, a functional HTTP interceptor that drives the service.
- `RequestLockService`, a root-provided service holding a reference-counted map of pending requests, exposed as a `Signal<boolean>` per id via `isPending(id)`.
- `RequestLockDirective` (selector `[ngxRequestLock]`), which toggles the nearest button's `disabled` attribute based on the shared signal.
- `provideRequestLock()`, an environment provider that wires everything up in one call.

## What this docs project contains ✨

- Overview and problem statement.
- Architecture notes covering token, interceptor, service, and directive.
- Installation and setup instructions.
- Directive usage examples: basic, save, delete, form submit, per-button pending state, custom loading directive.
- Flow lock examples: shared `requestId` across multiple elements and multiple requests.
- Bilingual content (English and Italian) driven by JSON translation files.
- Route-based pages built with Angular standalone components.

## Project structure 🗂️

```
├── projects/ngx-request-lock/   # The published library source
├── src/                         # The docs Angular app
│   └── app/
│       ├── core/                # Layout, i18n, navigation
│       ├── pages/               # Route-based docs pages
│       └── shared/ui/           # Reusable blocks (callout, code-block, api-table, ...)
└── public/i18n/                 # en.json and it.json translation files
```

## Getting started 🚀

Install dependencies:

```bash
npm install
```

Run the docs locally:

```bash
ng serve
```

Then open `http://localhost:4200/`.

## Build 🛠️

Build the docs app:

```bash
ng build
```

Build the library:

```bash
ng build ngx-request-lock
```

Build output is generated in `dist/`.

## Tests ✅

```bash
ng test
```

## Documentation guidelines 📝

When editing or adding docs pages:

- Use Angular standalone components.
- Keep the route-based page structure.
- Keep every example tied to the actual library code. Do not invent APIs or behavior.
- Use Tailwind CSS for layout and styling.
- Keep setup, usage, and architecture separate for readability.
- Keep prose in ASCII punctuation. Avoid em dashes, curly quotes, and ellipsis characters.
- Keep both languages (en, it) in sync inside `public/i18n/`.

## Requirements 🧰

- Angular **v22** or newer.
- Standalone APIs, functional HTTP interceptors, and signals.
- A secure browser context (HTTPS or `localhost`) for `crypto.randomUUID()`.

## Links 🔗

- Library source: `projects/ngx-request-lock/`
- Live docs: served from the docs app in `src/`
- Package on npm: `ngx-request-lock`
