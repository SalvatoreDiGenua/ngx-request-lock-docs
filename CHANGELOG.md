# Changelog

All notable changes to `ngx-request-lock` are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-07-27

Initial public release.

### Added

- `REQUEST_LOCK_ID`: `HttpContextToken<string | null>` that tags a request
  with a lock identifier.
- `createRequestLockContext(id)`: helper that builds the `HttpContext` to
  attach to a tracked request.
- `requestLockInterceptor`: functional `HttpInterceptorFn` that drives the
  service based on the request context.
- `RequestLockService`: root-provided, signal-backed service holding a
  reference-counted map of pending requests. Exposes `isPending(id)` as
  `Signal<boolean>`.
- `RequestLockDirective` (selector `[ngxRequestLock]`, `exportAs: 'requestLock'`):
  standalone directive that toggles the nearest button's `disabled`
  attribute based on the shared signal. Supports whole-flow locks via a
  shared `requestId`.
- `provideRequestLock()`: environment provider that registers
  `provideHttpClient(withInterceptors([requestLockInterceptor]))` in one call.
- Two safety timeouts on the directive: 500 ms if no pending state has
  been observed, and 10 s unconditional ceiling.
- Unit test suite covering the service, interceptor, context helper, and
  directive (22 tests, Vitest).

### Notes

- Requires Angular v22 or newer.
- Distributed as Angular Package Format, tree-shakable, `sideEffects: false`.
- Zero CSS shipped: the library stays styling-agnostic.

[Unreleased]: https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/releases/tag/v1.0.0
