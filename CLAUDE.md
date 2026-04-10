# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**claude-connect** is a pnpm monorepo with two packages:
- `api/` — NestJS 11 backend (REST API, port 3000)
- `web/` — Vite 8 + TypeScript frontend (vanilla DOM, no framework)

Requires Node 18+ and pnpm 9+.

## Commands

### Root-level (all packages)
```bash
pnpm install          # Install all dependencies
pnpm build            # Build all packages
pnpm test             # Test all packages
pnpm lint             # Lint all packages
```

### Web workspace
```bash
pnpm web:dev          # Dev server with HMR
pnpm web:build        # Production build
pnpm web:preview      # Preview production build
```

### API workspace
```bash
pnpm api:dev          # Watch mode (ts-node)
pnpm api:debug        # Watch mode with debugger
pnpm api:build        # Compile to dist/
pnpm api:start        # Run compiled output
pnpm api:test         # Unit tests (jest)
pnpm api:test:watch   # Unit tests in watch mode
pnpm api:test:cov     # Unit tests with coverage
pnpm api:test:e2e     # End-to-end tests
pnpm api:lint         # ESLint
pnpm api:format       # Prettier format
```

### Running a single test (API)
```bash
cd api && npx jest --testPathPattern=app.controller
```

## Architecture

### API (NestJS)
Standard NestJS module structure: `AppModule` → `AppController` + `AppService`. Entry point is `api/src/main.ts`, which reads `PORT` env var (default 3000).

- Unit tests live alongside source files as `*.spec.ts`
- E2E tests live in `api/test/` and use supertest against the full app

### Web (Vite)
Plain TypeScript with DOM APIs — no React or other UI framework. `web/src/main.ts` is the entry point loaded by `web/index.html`.

### TypeScript configs
- `api/tsconfig.json` enables decorator metadata (required by NestJS) and targets ES2023/CommonJS
- `api/tsconfig.build.json` excludes test files from compilation
- `web/tsconfig.json` uses ESNext modules with bundler resolution and enables strict unused-variable checks

### Linting (API)
ESLint flat config (`api/eslint.config.mjs`) using TypeScript ESLint + Prettier. Rules intentionally relax `@typescript-eslint/no-explicit-any` and `@typescript-eslint/no-floating-promises`.

## Frontend Guidelines

### Atomic Design
Organize components following Atomic Design:
- `atoms/` — indivisible UI elements (Button, Input, Label, Icon)
- `molecules/` — combinations of atoms (FormField, SearchBar, Card)
- `organisms/` — complex sections composed of molecules/atoms (Header, Form, DataTable)
- `templates/` — page layouts without real data
- `pages/` — templates filled with real data, bound to routes

### Tailwind CSS
- Use Tailwind utility classes exclusively for styling; avoid custom CSS unless strictly necessary
- Avoid arbitrary values (`w-[123px]`) — prefer design tokens from the Tailwind config
- Extract repeated class combinations into components, not CSS files

### Component Tests
Every component must have a test file (`*.spec.ts` or `*.test.ts`) covering its **essential behavior**:
- Renders without errors
- Reflects the main prop/state variations
- Fires the expected events when the user interacts

## Backend Guidelines

### REST Principles
All API endpoints must be adherent to REST:

- **Resource-based URLs**: nouns, not verbs — `/users`, `/users/:id`, never `/getUser`
- **Correct HTTP verbs**: `GET` (read), `POST` (create), `PUT`/`PATCH` (update), `DELETE` (remove)
- **Appropriate status codes**: `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `422 Unprocessable Entity`, `500 Internal Server Error`
- **Stateless**: no session state on the server; each request carries all needed context
- **Consistent response shape**: always return a predictable JSON envelope; errors must include a `message` field
- **Versioning**: prefix routes with `/v1/` (or the current version) to allow non-breaking evolution
- **Plural resource names**: `/users` not `/user`, `/orders` not `/order`

## Git

### Conventional Commits
All commits across every package in this monorepo must follow the [Conventional Commits](https://www.conventionalcommits.org) spec:

```
<type>(<optional scope>): <short description>

[optional body]

[optional footer(s)]
```

**Allowed types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Scope examples:** `api`, `web`, `auth`, `deps`

**Examples:**
```
feat(api): add POST /v1/users endpoint
fix(web): correct button disabled state on form submit
docs: update README with setup instructions
test(api): add unit tests for UserService
chore(deps): upgrade NestJS to 11.1
```

- The subject line must be lowercase and must not end with a period
- Breaking changes must include `BREAKING CHANGE:` in the footer or `!` after the type/scope
