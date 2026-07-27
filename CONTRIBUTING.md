# Contributing to ngx-request-lock

Thanks for your interest in contributing! This document explains how to propose changes.

## How to contribute

This repository accepts changes **exclusively through Pull Requests**. Direct pushes to the `main` branch are not allowed.

1. **Fork** the repository
2. **Create a branch** from your fork, with a descriptive name:
   - `feat/feature-name` for new features
   - `fix/bug-name` for bugfixes
   - `docs/topic` for documentation changes
3. **Install dependencies**:
   ```
   npm install
   ```
4. **Build the library** (the docs app imports from `dist/ngx-request-lock`):
   ```
   npm run build:lib
   ```
5. **Make your changes**, following the existing code style (ESLint + Prettier)
6. **Run lint and tests** before opening a PR:
   ```
   npm run lint
   npm test
   npx ng test ngx-request-lock --watch=false
   ```
7. **Open a Pull Request** targeting `main`, clearly describing what changes and why

## PR guidelines

- A PR should address a single topic/issue
- Update `CHANGELOG.md` if the change is relevant to library consumers
- Add/update tests for any new feature or fix
- PRs must pass CI (lint, build, test) before they can be merged
- PRs require maintainer approval before merging

## Reporting bugs or proposing features

Open an issue on the [GitHub tracker](https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/issues) describing:

- Expected vs actual behavior (for bugs)
- Use case and motivation (for feature requests)
- Angular and library version in use

## Code of conduct

Be respectful and constructive in discussions. Hostile or disrespectful interactions will not be tolerated.
