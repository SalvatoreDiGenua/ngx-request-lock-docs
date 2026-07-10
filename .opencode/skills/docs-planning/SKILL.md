---
name: docs-planning
description: Use this skill when planning technical documentation, docs sites, README structure, Angular docs pages, or bilingual documentation architecture before writing the final content.
compatibility: opencode
license: MIT
metadata:
  domain: documentation
  workflow: planning
---

Plan the documentation before writing it.

Your job is to create a documentation plan that is structured, implementation-oriented, and suitable for technical projects. Do not start with the final long-form documentation unless the user explicitly asks for it. Start with structure.

Follow this workflow:

1. Identify the documentation goal.

- Determine what is being documented: library, app, API, feature, architecture, setup guide, or docs website.
- Identify the audience: library consumers, internal developers, maintainers, or mixed audience.
- Identify constraints such as language, framework, format, and target location in the project.

2. Extract the main topics.

- List the core concepts the documentation must cover.
- Separate motivations, architecture, setup, usage, API, and FAQ.
- Highlight what is essential versus optional.

3. Create the documentation map.

- Propose the main sections and their order.
- For each section, define:
  - purpose;
  - key questions answered;
  - expected content type, for example prose, code snippets, table, callout, warning, FAQ.
- Prefer a structure that can scale.

4. If the project is Angular, plan for implementation.

- Suggest routeable pages under src/app.
- Suggest component names and route paths.
- Suggest reusable UI blocks such as code-example, warning-box, architecture-note, api-table, bilingual-section.
- Keep the plan aligned with Angular conventions and standalone-first thinking.

5. If the documentation is bilingual, plan the language strategy.

- Decide whether content should be duplicated per page or stored in translation objects.
- Keep the same section hierarchy across languages.
- Ensure both languages cover the same concepts.

6. Define the writing order.

- Recommend what should be written first.
- Prefer this order:
  - home / overview;
  - problem statement;
  - architecture;
  - setup;
  - examples;
  - API reference;
  - FAQ.
- Break large work into smaller deliverables.

7. Produce a concise execution plan.

- Output:
  - documentation map;
  - suggested file or page structure;
  - section-by-section checklist;
  - recommended next step.

Rules:

- Prefer planning over immediate generation.
- Be concrete and implementation-aware.
- Avoid generic filler.
- Do not invent features that are not supported by the project.
- If enough context is missing, ask focused questions before planning.
- When the user already provided the structure, use it as the source of truth.
