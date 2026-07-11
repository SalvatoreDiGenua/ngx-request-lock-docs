# ngx-request-lock docs 📘

Documentation site for the **ngx-request-lock** Angular library.

This project explains how the library works, how to install it, and how to use it in a real Angular application. The docs are structured as route-based pages and mirror the actual public API and architecture of the library.

## What this project contains ✨

- Overview and project introduction.
- Installation and setup instructions.
- Architecture notes for the library internals.
- Usage examples and integration patterns.
- Route-based documentation pages built with Angular standalone components.
- A bilingual docs experience managed through translation keys and JSON files.

## About the library 🧩

`ngx-request-lock` helps coordinate UI locking around HTTP requests.

It is designed for Angular applications that need to prevent repeated actions while a request is still pending. The library tracks requests through an `HttpContext` token, a functional HTTP interceptor, and a signal-based service that exposes pending state to the UI. [file:505][file:506][file:508]

In practice, this means you can attach a tracking id to a request, detect whether that request is still in progress, and use that state to disable buttons, show loading indicators, or prevent duplicate submissions. [file:505][file:506][file:508]

## Project structure 🗂️

The docs are organized around clear topics:

- Home.
- Problem statement.
- Architecture.
- Installation and setup.
- Usage examples.
- API reference.

Shared UI stays small and reusable, with components for navigation, code examples, callouts, and content sections.

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

Create a production build with:

```bash
ng build
```

The build output is generated in `dist/`.

## Tests ✅

Run unit tests with:

```bash
ng test
```

## Documentation guidelines 📝

When editing or adding docs pages:

- Use Angular standalone components.
- Prefer clear route-based page structure.
- Keep examples tied to the actual library code.
- Do not invent APIs or behavior that do not exist in the repository.
- Use Tailwind CSS for layout and styling when available.
- Keep setup, usage, and architecture separate for readability.

## Library flow 🔍

The library works with three main pieces:

- A request tracking token stored in `HttpContext`. [file:505]
- A functional interceptor that starts and stops tracking around the request lifecycle. [file:506]
- A root service that stores pending request counts and exposes computed pending state. [file:508]

## License 📄

Add the project license here if and when it is defined.
