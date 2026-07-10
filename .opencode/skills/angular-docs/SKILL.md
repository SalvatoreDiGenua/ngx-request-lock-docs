---
name: angular-docs
description: Use this skill when generating Angular documentation, Angular library docs, docs-site pages, setup guides, architecture explanations, or Angular-focused technical content.
license: MIT
compatibility: opencode
metadata:
  domain: angular
  workflow: documentation
---

Write documentation for Angular projects using modern Angular conventions.

Rules:

- Use correct Angular terminology.
- Prefer standalone-first Angular patterns unless the project clearly uses NgModules.
- When documenting HTTP setup, prefer `provideHttpClient(...)`.
- When documenting interceptors, mention functional interceptors and `withInterceptors(...)` when relevant.
- When documenting request metadata passed to interceptors, use `HttpContextToken` and `HttpContext`.
- Keep explanations aligned with Angular library design, including `public-api.ts` as the public surface when the project is a library.
- Do not introduce outdated Angular patterns unless the existing codebase already depends on them.

When documenting an Angular library:

1. Identify the public API.
2. Separate architecture, setup, usage, and API reference.
3. Explain how the library integrates into an Angular app.
4. Use examples that feel realistic in Angular applications.
5. Keep the explanation framework-native and dependency-aware.

When documenting an Angular docs app:

- Suggest routeable pages under `src/app`.
- Suggest Angular component names and route paths.
- Suggest reusable blocks such as code examples, API tables, warning boxes, and architecture notes.
- Keep structure suitable for standalone components and Angular routing.

Style:

- Write like a senior Angular engineer.
- Be technical, clear, and concise.
- Avoid marketing language.
- Prefer implementation-aware explanations over abstract descriptions.
