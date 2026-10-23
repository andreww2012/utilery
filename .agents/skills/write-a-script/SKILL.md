---
name: write-a-script
description: Instructions on writing standalone scripts (`scripts/*.ts`).
---

<!-- cspell:ignore dogfood -->

Scripts live at `scripts/<name>.ts` and run directly via `node scripts/<name>.ts`.
You should do your best to avoid using features that would make the script not runnable with plain Node.JS type stripping.
Use relative paths to import source utilities.

## Dogfood utilities, but only when it helps

Prefer the project's own utilities over native or hand-rolled equivalents **when they make a positive difference**: added safety, correct typing, or non-obvious edge-case handling.

## Registering the script

`knip` reports scripts as unused files unless it can see them referenced.
A script invoked only from a workflow or config file (not a `package.json` script) must be added to `entry` in `knip.config.ts`.

## Structure & verification

- ESM top-level cannot `return`; wrap the flow in a `run()` function so you can use early returns and guard clauses.
