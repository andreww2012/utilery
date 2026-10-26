---
name: add-or-modify-utility
description: Instructions on working with utilities, primarily adding or modifying.
---

Utility is located at `src/<group-name>/<utility-name>.ts` along with its types, constants and other closely related symbol exports.
All exports at these paths are supposed to be public and re-exported at `src/<group-name>/index.ts`.
Utility belongs to a single group.

Utility should conform to one of the following forms:

1. *Re-export from an external package*
   1. *Pure re-export with nothing added on top*

      Example: `src/array/cartesian-product.ts`.
   2. *Re-export with documentation improvements or very minor improvements of other kind(s)*
      If the original documentation does not satisfy the criteria, it should be rewritten to satisfy them.
      IMPORTANT: such rewrites must not be considered custom implementation (form 3): they may contain trivial-ish logic required for consolidation, added behavior/options, typing improvements.

      Example: `src/types/nullable.ts`.

      If you're only enhancing JSDoc and exporting the original implementation by directly assigning it, write its signature out as a documented call signature, as described in `AGENTS.md`.
      When the upstream types aren't exported, refer to them through the upstream function, like `Parameters<typeof upstream<T>>[0]` (example: `src/object/object-assign.ts`).
2. *Enhanced version of an external package's utility(-ies).*
   Preferably a thin wrapper that delegates the real work to the external function(s) while customizing/improving the UX.

   Examples: `src/array/array-difference.ts`, `src/array/sorted-array-insertion-index.ts`.
3. *Fully custom implementation*, which still might depend on other utilities.
   IMPORTANT: there should be a substantial % of real custom logic to fall into this category; otherwise, the utility/type should probably be considered form 1-2.

The latter two forms require the utility to have a comprehensive JSDoc documentation describing its purpose and including parameter and return value descriptions, as well as a block of examples.
Any documentation, be it JSDoc, `*.md` files, or in any other form, must never include implementation details, such as used package names (the list is not exhaustive), unless it is necessary.
If form 1-1 documentation does not satisfy the criteria from this skill, it should probably become form 1-2.
Note: only ever use `{@link X}` when `X` is imported or declared in the same file.
For any cross-file reference use plain backticks `` `X` `` instead.

## Global augmentation modules

A module whose only purpose is a global type augmentation (`declare global`, exports nothing) must be named `src/<group-name>/<utility-name>.global.ts`.

Example: `src/dom/query-selector-typed.global.ts`.

- It must NOT be re-exported from `src/<group-name>/index.ts`.
- It needs a row in the "List of entrypoints" table in `README.md`, and `nr build` adds its `package.json` `exports` entry.
- Note that an external package's `declare global` cannot be re-exported.
  `import type {} from 'the-package'` is erased from the declaration output, and a plain value import fails when the package ships no runtime code.
  Re-declare the augmentation against our own types instead.
- `declare global` applies to the entire TypeScript program regardless of which file imports it, so mutually exclusive augmentations can never be tested alongside each other: their overloads merge, so none of them can be tested on its own.
  So test it **only** from `test/published-dts/scenarios/<utility-name>.global/` (not from an in-repo `*.spec-d.ts`), matching the source file name - the harness gives every `*.global` scenario directory a `tsc` program of its own.

## Adding utilities

You might be asked to add utility(-ies) from existing npm package(s), provided code, or to create a new one from free description.

For every candidate, first of all you should evaluate whether it already exists - exactly the same or close enough equivalent.
If the candidate is strictly a superset of the existing utility (functionality, performance, and typing-wise), it should be replaced with a candidate.
If strictly a subset, it should be discarded.
Otherwise, you should analyze whether it should be added as a replacement, discarded, or added as a new utility.

Then, a very good name must be chosen:

<details>
<summary>Utility naming guideline</summary>

> **The most important test of a good name:** an average JavaScript developer should be able to well enough understand what the function does *only by its name*.

Names target a reader who has never used the source library: we rename whenever the original is unclear, and keep it only when it already explains itself or very well known (`debounce`, `memoize`, `clamp`, `flatMap`, `omit`).

- **Spell out the operation; drop terse or cryptic names.** `ary` → `withMaxArity`, `after` → `fromNthCall`, `sortedIndex` → `sortedArrayInsertionIndex`.
- **Adopt a widely-recognized math/CS term when it names the operation precisely.** `zip`/`unzip` → `arrayTranspose`, `xor` → `arraySymmetricDifference`.
- **Avoid ambiguous or misleading words.** `after`/`before` sound temporal → `fromNthCall`/`untilNthCall`; `escape` is vague → `escapeHtml`.
- **Reflect behavior, including side effects.** Mutating array helpers share an `arrayPurge*` prefix: `pull` → `arrayPurgeValues`, `remove` → `arrayPurgeBy`, `pullAt` → `arrayPurgeIndexes`.
- **Prefix by group to disambiguate and signal the operand**, where it helps: `map*` (`filter` → `mapFilter`), `set*` (`filter` → `setFilter`), and `array*` for many array utilities; likewise encode a precondition when it matters (`sortedArray*`).
  Not mandatory when the name is already unambiguous (`flatMap`, `sortBy`).
- **Predicates read as a question (`is*`)**: `inRange` → `isInRange`, `isLength` → `isValidLength`; converters use `to*`: `camelCase` → `toCamelCase`.
- **Strict camelCase, acronyms included.** `isJSON` → `isJson`.
- **Spelling preferences**:
  - ❌ indices ✅ indexes <!-- cspell:disable-line -->
- All the above applies to type utility naming.

</details>

Then pick the right group for the utility.
If there isn't a group that fits, create a new one.
The new group must be added to the "List of entrypoints" in `README.md`.
All groups' symbols should be re-exported in `src/index.ts`, unless the group targets specific JS runtime environments like browsers or Node.js.
All groups automatically get their own entrypoint (`/<group-name>`), which `nr build` adds to `package.json`'s `exports` field.

> [!TIP]
> If you are choosing between "custom implementation" and "pure-export from a package" AND the implementations are identical, and you're inclining to go for the former "because it saves bundle size", this is WRONG: all external libraries' imports are bundled anyway.
> You only increase maintenance cost, winning nothing.

### Adding from a package

If the package is not in dependencies, install it with `pnpm i -D --save-catalog-name=bundled <package>`.
It gets its own page in `docs/packages/`, linked from the "Packages" table in `README.md`.
Copy the license texts of the package and of the new packages it depends on (see `inlinedDependencies` in `package.json` after `nr build`) to `THIRD_PARTY_NOTICES.md`.

If you're not asked about specific utilities, you should add all utilities that are supposed to be public, from all entrypoints.
However, a section corresponding to the package in `README.md` should include *all* such utilities.

If the package *is* in dependencies, you should add all missing, rename all renamed, and delete all deleted utilities.

When you're working with more than a single utility at a time, never perform bulk actions initially.
First you need to reach the shared understanding on naming, updating and deletion plan.
Prefer using /grill-me skill if it's available for that purpose.
Avoid presenting big lists of utilities to triage.
Instead, group them granularly by their purpose and other features, trying to keep the groups small (like 5 or so entries, unless they strongly form a family).

When choosing a utility form, remember to always prefer re-using the utility code instead of writing our own to reduce maintenance cost.
If the situation requiring re-implementation would be negated or significantly improved if some symbols were exported, create a pnpm patch for the library that exports them.

### Adding from code/description

Please challenge & healthy criticize **at least** along the following axes:

- Functionality should not be covered by already existing utilities.
- There shouldn't be public npm package(s) that do the same job at least as good.
- Review implementation for issues (general code review, performance, maintenance cost, etc.).
