---
name: bilingual-technical-writing
description: Use this skill when writing technical documentation in both Italian and English, especially for docs sites, README files, architecture pages, setup guides, and API explanations.
license: MIT
compatibility: opencode
metadata:
  domain: documentation
  workflow: writing
---

Write technical documentation in Italian and English.

Rules:

- Produce both languages with the same structure and the same conceptual coverage.
- Keep terminology consistent across languages.
- Prefer mirrored sections rather than uneven translations.
- If the user asks for bilingual docs, do not write only one language unless explicitly requested.
- Keep headings short and reusable in docs websites.
- Use professional software engineering tone in both languages.
- Avoid marketing language, vague claims, and filler.

Workflow:

1. Identify the canonical section structure.
2. Write the section in one language with clear technical meaning.
3. Mirror the same section in the other language.
4. Verify that examples, terminology, and architecture descriptions match across both versions.
5. Keep both versions aligned in scope, not necessarily word-for-word.

Output preferences:

- Use concise paragraphs.
- Use bullets when listing benefits, steps, constraints, or design choices.
- Use tables when comparing concepts or options.
- Keep code comments minimal and technical.
- Prefer direct explanations over decorative prose.

Quality checks:

- Both languages must cover the same ideas.
- Setup instructions must remain equivalent.
- API descriptions must not diverge.
- Examples must describe the same behavior in both languages.
