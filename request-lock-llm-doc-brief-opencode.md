# OpenCode / Perplexity Agent API Prompt — ngx-request-lock Documentation

You are OpenCode, powered by the Perplexity Agent API.

Your task is to generate the complete documentation content for the Angular library **ngx-request-lock**. Write as a senior software engineer producing reusable technical documentation for an Angular project. The result must be implementation-oriented, technically accurate, bilingual, and ready to be mapped into Angular components under `src/app`.[cite:28][cite:34][cite:36][cite:102]

## Your role
You are not writing generic marketing copy.
You are writing structured engineering documentation for a real Angular workspace that already exists.
You must explain the purpose, architecture, setup, usage, benefits, limitations, and public API of the library in a way that can be directly used to build a documentation site.

## What you are documenting
Document an Angular library whose purpose is to associate a UI action, usually a button click, with an HTTP request so that the related UI element can be locked while the request is pending and unlocked when the request completes.

The implementation is based on:

- Angular `HttpContextToken` metadata attached to requests;[cite:28]
- a functional HTTP interceptor that reads the metadata and updates state;[cite:25][cite:36]
- a central service that tracks pending state per action identifier;
- one or more directives that apply disabled state or visual state to the DOM while the request is in progress.

Explain clearly that Angular request context is local to the Angular app and is not transmitted to the backend, which makes it the correct place for request-bound UI lock metadata.[cite:28][cite:103]

## Core problem this library solves
Make these motivations explicit across the documentation:

- Prevent multiple clicks from triggering duplicate HTTP requests.
- Prevent accidental double submission of forms or repeated destructive actions.
- Standardize button loading and disabled states during async HTTP work.
- Remove duplicated `loading`, `disabled`, and request-state boilerplate from individual components.
- Provide a solution that feels native to Angular and does not require external runtime libraries.

## Angular-native design you must emphasize
Explain that this library is Angular-like because:

- request metadata belongs in `HttpContextToken`, not in HTTP body payloads or fake headers, when the concern is local interceptor behavior;[cite:28][cite:83]
- Angular configures HTTP features through `provideHttpClient(...)`;[cite:34][cite:36]
- Angular recommends functional interceptors with `withInterceptors(...)` because they have more predictable ordering;[cite:36]
- a library should expose a curated public surface through `public-api.ts`.[cite:1]

## Important constraints
Respect all of the following:

- Do not invent capabilities that are not implied by the current project structure.
- Do not describe the library as using NgRx, external signal libraries, UI kits, or third-party loading frameworks.
- Do not imply that the backend knows about request-lock metadata, because Angular `HttpContext` is not sent to the server.[cite:28][cite:103]
- Do not use a hype-driven tone.
- Do not write vague statements like “powerful”, “seamless”, or “revolutionary” unless backed by concrete explanation.
- Do explain trade-offs and scope boundaries.

## Output languages
Write every documentation section in both:

- Italian
- English

Prefer a structure that can later be stored in Angular translation objects or bilingual page content.

## Current workspace structure
Use the following structure as the source of truth for naming and architecture:

```text
Y:.
│   .editorconfig
│   .gitignore
│   .postcssrc.json
│   .prettierrc
│   AGENTS.md
│   angular.json
│   eslint.config.js
│   ngx-request-lock-docs.code-workspace
│   package-lock.json
│   package.json
│   README.md
│   structure.txt
│   tsconfig.app.json
│   tsconfig.json
│   tsconfig.spec.json
│
├───.claude
│       CLAUDE.md
│
├───.cursor
│   └───rules
│           cursor.mdc
│
├───.gemini
│       GEMINI.md
│
├───.github
│       copilot-instructions.md
│
├───.junie
│       guidelines.md
│
├───.vscode
│       extensions.json
│       launch.json
│       tasks.json
│
├───.windsurf
│   └───rules
│           guidelines.md
│
├───projects
│   └───ngx-request-lock
│       │   eslint.config.js
│       │   ng-package.json
│       │   package.json
│       │   README.md
│       │   tsconfig.lib.json
│       │   tsconfig.lib.prod.json
│       │   tsconfig.spec.json
│       │
│       └───src
│           │   public-api.ts
│           │
│           └───lib
│               ├───core
│               │   ├───interceptors
│               │   │       request-lock-interceptor.ts
│               │   │
│               │   ├───models
│               │   ├───services
│               │   │       request-lock-service.ts
│               │   │
│               │   ├───tokens
│               │   │       request-lock-token.ts
│               │   │
│               │   └───utils
│               │           create-request-lock-context.ts
│               │
│               ├───directives
│               │       p-request-lock.ts
│               │       request-lock.ts
│               │
│               ├───providers
│               │       provide-request-lock.ts
│               │
│               └───testing
├───public
│       favicon.ico
│
└───src
    │   index.html
    │   main.ts
    │   styles.css
│
    └───app
            app.config.ts
            app.html
            app.routes.ts
            app.scss
            app.ts
```

## Architecture you must document
Explain the responsibilities of these files and layers:

- `request-lock-token.ts`: defines the request metadata token.
- `create-request-lock-context.ts`: creates an `HttpContext` or helper wrapper used to tag a request with a lock identifier.[cite:28]
- `request-lock-interceptor.ts`: reads the lock id from request context, marks the action as pending, and clears it in request finalization.[cite:25][cite:36]
- `request-lock-service.ts`: stores, derives, or exposes pending state by lock id.
- `request-lock.ts` and `p-request-lock.ts`: map library state to directive-based UI behavior.
- `provide-request-lock.ts`: exposes Angular setup helpers based on `provideHttpClient(...)` and `withInterceptors(...)`.[cite:34][cite:36]
- `public-api.ts`: exports the supported public contract of the library.[cite:1]

## Required documentation sections
Generate full content for each of the following sections in Italian and English.

### 1. Home
Explain what Request Lock is, who it is for, and what problem it solves.

### 2. Problem Statement
Describe the practical problems that happen without this library:

- duplicate network requests;
- inconsistent loading styles;
- repeated component-level booleans;
- boilerplate around request lifecycle handling;
- UI drifting out of sync with asynchronous operations.

Use realistic examples such as save, delete, login, submit, or checkout buttons.

### 3. Architecture
Explain the internal architecture using the current file structure. Clarify the separation between metadata, interceptor pipeline, state tracking, directive layer, and provider setup.

### 4. Why Angular-native
Explain why the implementation follows Angular best practices and why `HttpContextToken`, functional interceptors, and `provideHttpClient(...)` are appropriate choices.[cite:28][cite:34][cite:36]

### 5. Installation and Setup
Explain how to consume the library in an Angular application.

Include:

- workspace or package usage;
- provider registration;
- interceptor configuration;
- request context creation;
- directive usage on buttons or interactive elements.

Also explain that interceptor order matters, and that `withInterceptors(...)` gives explicit control over that order.[cite:36][cite:45]

### 6. Usage Examples
Generate practical examples for:

- a save button;
- a delete button;
- a form submission button;
- multiple independent buttons on the same page.

For each example, explain what happens before the request, during the request, and after completion or failure.

### 7. Advantages
Explain the main engineering and UX advantages:

- centralized async UI state;
- reduced boilerplate;
- lower risk of duplicate actions;
- more consistent behavior across the app;
- simpler mental model for teams;
- no external runtime dependency;
- Angular-native integration.

### 8. Limitations and Design Choices
Explain scope boundaries and intentional design choices.

State that the library is not:

- a full state management solution;
- a replacement for domain-specific workflow state;
- an automatic tracker for every request unless the request is intentionally tagged;
- a backend protocol.

### 9. API Reference
Document the public API with concise but implementation-aware explanations.
Infer names from the current structure, but keep explanations robust enough to survive small naming changes.

### 10. FAQ
Write a bilingual FAQ that answers at least these questions:

- Why not just use a local `loading` boolean?
- Why use an interceptor instead of handling this in every component?
- Can multiple buttons be tracked independently?
- What happens on HTTP error?
- Does this work with standalone Angular apps?
- Does it require RxJS-heavy code in components?

## Writing style requirements
Follow these rules strictly:

- Write like a senior Angular engineer.
- Prefer precision over enthusiasm.
- Use short, structured sections.
- Use correct Angular terminology.
- Avoid filler and generic phrasing.
- Explain cause, effect, benefits, and trade-offs.
- Make the output directly reusable inside a docs website.

## Angular docs app orientation
Shape the output so it can be implemented under `src/app` as routeable documentation pages.

Use this recommended target structure:

```text
src/app/
├── core/
│   ├── layout/
│   ├── models/
│   └── i18n/
├── features/
│   ├── home/
│   ├── problem/
│   ├── architecture/
│   ├── angular-native/
│   ├── setup/
│   ├── examples/
│   ├── advantages/
│   ├── limitations/
│   ├── api-reference/
│   └── faq/
└── shared/
    ├── components/
    └── ui/
```

For each section, also suggest:

- Angular page or component name;
- route path;
- whether the page needs code blocks, architecture notes, comparison tables, warnings, or callouts.

## Deliverables you must produce
Produce all of the following:

1. A bilingual content map for the docs site.
2. Full content for each documentation section in Italian and English.
3. Suggested Angular component names under `src/app`.
4. Suggested route paths.
5. Suggested shared UI blocks for examples, notes, warnings, and bilingual rendering.
6. Homepage hero content, feature bullets, and architecture summary.
7. A package-level README summary for `projects/ngx-request-lock/README.md`.

## Final instruction
Generate the complete bilingual documentation set for the Angular docs application and for the package README, based on the current project structure and the real purpose of the library. Keep everything Angular-native, dependency-light, technically grounded, and ready to be turned into routeable documentation pages under `src/app`.[cite:1][cite:28][cite:34][cite:36]
