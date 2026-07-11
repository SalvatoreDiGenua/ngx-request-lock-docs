# ngx-request-lock docs

Documentation site for the **ngx-request-lock** Angular library.

This project explains how the library works, how to install it, and how to use it in a real Angular application. The docs are organized as route-based pages and are written to reflect the actual public API and internal structure of the library.

## What this project contains

- Overview and project introduction.
- Installation and setup instructions.
- Architecture notes for the library internals.
- Usage examples and integration patterns.
- Documentation pages built with Angular standalone components and routing.
- A bilingual docs experience where content is managed through translation keys and JSON files.

## Library focus

`ngx-request-lock` helps coordinate UI locking around HTTP requests. It uses an Angular `HttpContext` token to attach a request tracking id, a functional HTTP interceptor to track request lifecycle, and a service to keep track of pending requests. [file:506][file:508]

The public surface is exposed through the library entry point, and the docs should always stay aligned with the real exported API. [file:236]

## Project structure

The docs are organized around routeable pages, typically covering:

- Home.
- Problem statement.
- Architecture.
- Installation and setup.
- Usage examples.
- API reference.

Shared UI should stay small and reusable, with components for navigation, code examples, callouts, and content sections.

## Getting started

Install dependencies:

```bash
npm install
```

Run the docs locally:

```bash
ng serve
```

Then open `http://localhost:4200/`.

## Build

Create a production build with:

```bash
ng build
```

The build output is generated in `dist/`.

## Tests

Run unit tests with:

```bash
ng test
```

## Documentation guidelines

When editing or adding docs pages:

- Use Angular standalone components.
- Prefer clear route-based page structure.
- Keep examples tied to the actual library code.
- Do not invent APIs or behavior that do not exist in the repository.
- Use Tailwind CSS for layout and styling when available.
- Keep setup, usage, and architecture separate for readability.

## Development notes

The docs should describe the real behavior of the library:

- A request context token carries the tracking id. [file:505]
- The interceptor reads the context and starts or ends tracking around the request lifecycle. [file:506]
- The service stores pending request counts and exposes computed pending state. [file:508]

## Contributing

When updating the docs, keep the content consistent across all translated pages and update translation files together with the corresponding UI components.

## License

Add the project license here if and when it is defined.
