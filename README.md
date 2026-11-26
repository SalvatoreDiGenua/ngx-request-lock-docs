# ngx-request-lock documentation

Angular HTTP requests, button loading state and shared request flows with `ngx-request-lock`.

[![npm version](https://img.shields.io/npm/v/ngx-request-lock.svg)](https://www.npmjs.com/package/ngx-request-lock)
[![npm downloads](https://img.shields.io/npm/dm/ngx-request-lock.svg)](https://www.npmjs.com/package/ngx-request-lock)
[![bundle size](https://img.shields.io/bundlephobia/minzip/ngx-request-lock.svg?label=minzip)](https://bundlephobia.com/package/ngx-request-lock)
[![Angular](https://img.shields.io/badge/Angular-%5E22.0.0-dd0031.svg)](https://angular.dev)

[Documentation in English](https://ngx-request-lock-docs.netlify.app/) | [Documentazione in italiano](https://ngx-request-lock-docs.netlify.app/it/) | [Library README](projects/ngx-request-lock/README.md) | [npm package](https://www.npmjs.com/package/ngx-request-lock)

This repository contains the `ngx-request-lock` Angular library and its bilingual documentation site. The guides explain how to disable buttons during selected `HttpClient` requests, limit repeat clicks and coordinate related actions with a shared `requestId`.

The directive has an unconditional 10-second safety unlock. It can release a button before a slow request ends; server-side idempotency is still needed for operations that must never run twice.

## Documentation guides

English pages use the root URL; Italian pages use `/it/`. The language switch opens the corresponding page in the other language.

| Topic           | English                                                                                   | Italiano                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Overview        | [Angular HTTP loading and button locking](https://ngx-request-lock-docs.netlify.app/)     | [Richieste HTTP e blocco dei pulsanti](https://ngx-request-lock-docs.netlify.app/it/)        |
| Repeat clicks   | [Prevent duplicate requests](https://ngx-request-lock-docs.netlify.app/problem/)          | [Evitare richieste duplicate](https://ngx-request-lock-docs.netlify.app/it/problem/)         |
| Architecture    | [HTTP interceptor and signals](https://ngx-request-lock-docs.netlify.app/architecture/)   | [Interceptor HTTP e signal](https://ngx-request-lock-docs.netlify.app/it/architecture/)      |
| Setup           | [Install and configure](https://ngx-request-lock-docs.netlify.app/installation/)          | [Installazione e configurazione](https://ngx-request-lock-docs.netlify.app/it/installation/) |
| Button examples | [Disable buttons during HTTP](https://ngx-request-lock-docs.netlify.app/directive-usage/) | [Disabilitare i pulsanti](https://ngx-request-lock-docs.netlify.app/it/directive-usage/)     |
| Shared flows    | [Coordinate HTTP flows](https://ngx-request-lock-docs.netlify.app/flow-lock/)             | [Coordinare le richieste HTTP](https://ngx-request-lock-docs.netlify.app/it/flow-lock/)      |

The site includes interactive examples, copyable code with syntax highlighting and a responsive request-flow diagram. Documentation routes are prerendered in both languages. Each page has localized metadata, a canonical URL and language alternates. Unknown URLs render a localized 404 page with `noindex`.

## How the library works

1. `ngxRequestLock` disables the clicked button and enriches the host's native click event with a `requestId` and a ready `HttpContext`.
2. The handler passes `event.context` to `HttpClient`. Other calls can join the flow with `createRequestLockContext(id)`.
3. `requestLockInterceptor` reads `REQUEST_LOCK_ID`, increments the pending counter and decrements it through `finalize` on completion, error or unsubscription.
4. `RequestLockService.isPending(id)` exposes a boolean signal. Directives sharing the ID observe the same pending state; applications can use it for loading labels, spinners and `aria-busy`.

`HttpContext` is client-side Angular metadata; it is not sent to the server. The directive updates the native `disabled` attribute of its target button. Custom panel states or spinners require application bindings. Safety timeouts are described in the [library README](projects/ngx-request-lock/README.md#request-lifecycle-and-safety-timeouts).

## Install the library

In an Angular application:

```bash
npm install ngx-request-lock
```

The current package declares `@angular/common` and `@angular/core` peer dependencies at `^22.0.0`. Start with the [installation guide](https://ngx-request-lock-docs.netlify.app/installation/) or the [library setup and examples](projects/ngx-request-lock/README.md).

## Develop the documentation locally

Use Node.js supported by Angular 22 and npm. The workspace declares `npm@11.17.0` as its package manager.

```bash
npm ci
npm start
```

Open [localhost:4200](http://localhost:4200/). For the local-network development server on port 5200:

```bash
npm run start-local-machine
```

Open [localhost:5200](http://localhost:5200/) or the [Italian home](http://localhost:5200/it/).

The TypeScript path mapping resolves `ngx-request-lock` directly to `projects/ngx-request-lock/src/public-api.ts`, so a separate library build is not required to run the documentation app.

## Build and validate

```bash
npm run lint
npm run build
npm run check:seo
```

`build` generates the sitemap before building the application and prerenders the 12 documentation routes. Run `check:seo` after a build: it checks the generated HTML, canonical URLs, language alternates, metadata, structured data and sitemap.

To preview the production output:

```bash
npm run serve:ssg:ngx-request-lock-docs
```

This serves the static output at [localhost:8080](http://localhost:8080/). To check server-rendered routes, including HTTP 404 responses, use:

```bash
npm run serve:ssr:ngx-request-lock-docs
```

To build and test the library separately:

```bash
npm run build:lib
npx ng test ngx-request-lock --watch=false
```

The packaged library is written to `dist/ngx-request-lock/`. The library and documentation app have independent versions.

## Project structure

```text
projects/ngx-request-lock/
  src/public-api.ts        Published library exports
  src/lib/                 Directive, interceptor, service, token and provider
  README.md                npm-facing usage guide
src/app/
  core/                    Layout, locale routing and SEO services
  pages/                   Guides and interactive examples
  shared/ui/               Code blocks, flow diagram, callouts and headings
src/styles.css             Global styles and design tokens
public/i18n/               English and Italian translations
scripts/generate-sitemap.mjs
scripts/check-seo.mjs
```

When updating a guide, keep `public/i18n/en.json` and `public/i18n/it.json` aligned. Page metadata lives in `src/app/pages/*/*-page-seo.ts` and the Italian route metadata in `src/app/app.routes.ts`. Update examples against the public library API and document the safety timeout wherever describing how long buttons stay disabled.

## Contributing and releases

Report bugs and propose changes in the [issue tracker](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/issues). See [CHANGELOG.md](CHANGELOG.md) for release notes and [MIT](LICENSE) for the license.
