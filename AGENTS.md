Before your first response, you MUST read [the project guidelines](./.agents/guidelines.md) in full.
Follow them in everything you do, even when you are only answering a question.

# `utilery`

`utilery` is a project aiming at providing as much utility functions as possible from a single source.
It collects utilities from popular utility libraries, such as `es-toolkit`, and provides its own.
All without zero dependencies because all external dependencies are bundled.

## Instructions

- The project targets modern JavaScript execution environments (Node.js 22+ and "Baseline Widely Available" web features).
- Update `README.md` to reflect the made changes after you've finished.
- The `sideEffects` field in `package.json` tells bundlers that only `*.global.ts` modules have side effects, so they drop any other module whose exports are unused.
  Other modules, including the code of bundled packages, must not do anything on import that matters even when their exports are unused (patch globals or prototypes, add listeners, etc.)
  `nr test:side-effects` snapshots the code that bundlers can't drop: when the snapshot changes (often after bumping a bundled package), check that the new code doesn't do that.
- Likewise, only the types of `*.global.ts` modules may change globals or other modules (`declare global`, `declare module '...'`, `/// <reference ...>`, etc.)
- Packages that `src/` imports are bundled, and they belong to the `bundled` catalog in `pnpm-workspace.yaml`.
  `nr build` lists them, along with the packages they depend on, in `inlinedDependencies` of `package.json`: run it after adding, removing or bumping one, and keep the updated field.
  Until you run it, ESLint reports imports of a new one as missing from `dependencies`, which the build fixes.
- When you bump the version of a bundled package, describe only the changes we make ourselves: utilities added, removed or renamed, and behavior changes we make in our code or by patching the package (`patches/`).
  Upstream changes are covered by a link to the full upstream diff between the old and the new version (e.g. a GitHub compare link), which you always add.
  They include fixes, behavior and type changes of utilities we already export, even when our wrappers had to be adjusted to them (e.g. a wrapper signature updated to match a new upstream type).
  If the package has no tags for these versions, use commit hashes the versions were published from.
  The exception is an upstream change that breaks a released utility (one that exists at the latest release tag): describe it briefly in the changeset and in both the title and the body of the commit message, start its changeset item with `**BREAKING:**`, and treat the bump as any other breaking change (see below).
  This applies everywhere you describe the bump: changesets, commit messages, `README.md` and your replies, etc.
- In changesets, link each upstream utility name to its docs page when it has one, and write enumerations of more than a few items as a (nested) Markdown list.
  Refer to our utilities and groups by their bare names: `getErrorMessage`, `bitwise`.
  In a bump changeset, list every affected symbol, with the changes to describe nested under it.
  A symbol is affected when the upstream diff changes its behavior or types for calls our types allow, directly or through other utilities (name a whole group instead when the diff reaches most of it).
  Using the package is not enough: check each symbol against the diff, and leave out `, which affected:` when nothing is affected.
  For example:

  ```md
  Updated [`p-memoize` from v8.0.0 to v9.0.0](https://github.com/sindresorhus/p-memoize/compare/v8.0.0...v9.0.0), which affected:

  - `memoizeAsync`:
    - **BREAKING:** <how its behavior changed>
  - `MemoizeAsyncOptions`
  ```

- Always check edge cases like:
  - Readonly array/object/Set/Map, tuples.
  - Multi-byte symbols, CJK, etc. - we should aim at full Unicode support unless it's explicitly not promised.
- Tests check behavior: what a utility returns, throws or accepts, and what a type resolves to.
  Never test where a utility or type comes from, e.g. by comparing it with the upstream one.
  Every bug you fix gets a regression test that fails without the fix, including bugs in types.
  A doc you correct because it described the behavior wrongly gets a test of the behavior it now describes.
- Always document which non-native errors a utility may throw.
- Give exported functions explicit return types.
  The exception is a function whose body is a cast (`value as T`): the cast already gives the type, so don't repeat it.
- Use `Maybe(Readonly)Array` instead of `T | (readonly) T[]`.
  JSDoc prose and type tests that show the union shape on purpose may keep the spelled-out form.
- Until v1, breaking changes are fine: renaming released utilities, moving them to another group, changing their behavior.
  Don't keep a worse name or group only because it's already released.
  Still mark breaking commits with `!` and describe the change in a changeset (a minor bump while on 0.x).
- If "our" utility has exactly the same signature and you only need to attach a custom JSDoc, prefer simply re-assigning it if possible.
  Write the signature out as a call signature that carries the JSDoc, and put a short summary on the constant: `/** <summary> */ export const ours: {/** <JSDoc> */ (value: string): number} = upstream;` (example: `src/array/array-combinations.ts`).
  Call sites show the JSDoc of the called signature, so without the type they show the upstream docs, or none.
  A function type like `(value: string) => number` isn't enough: TypeScript 7 shows no JSDoc for it in the parameter hints ([a bug](https://github.com/microsoft/TypeScript/issues/64937)).
  Use our parameter names, and a JSDoc per call signature for overloads (example: `src/semver/is-semver-in-range.ts`).
  A function property, like `.as`, gets a nested type with a documented call signature too (example: `src/dom/query-selector-typed.ts`).
  For a class, keep the full JSDoc on the constant, which `instanceof` shows, and document its constructor with a construct signature (example: `src/json/json-parse-lossless.ts`).
  To keep the static members of the class, type the constant as an interface that extends `OmitStrict<typeof Upstream, 'prototype'>` (example: `src/server/exec.ts`).
  Leave out the type only when TypeScript can't check it against the upstream one (like `regexTyped`, where it fails with TS2589).
  For a type, re-declare it with the same type parameters (example: `src/types/omit-strict.ts`), and re-declare an options type whose property docs don't satisfy the rules either.
- Prefer using native features in places where using them would make execution faster in a reasonable number of cases: for example, our custom `mapGetOrInsert` implementation may use the native `Map#getOrInsert` if it's available.
  - Both paths must give the same results and throw the same error types.
    When the native feature gives different results, check whether ours is wrong, and if it is, fix it to match the native one.
    Otherwise, don't use the native feature (like `Math.sumPrecise`, which rounds differently than `sum` and is slower).
  - Check for the native feature inside the function: bundlers keep top-level reads like `Promise.try` even when the module is unused.
  - Test both paths with `describeWithAndWithoutNative` from `test/describe-with-and-without-native.ts`.

## Domain description

### Utility

*Utility* is an exported function or a TypeScript type located at `src/<group-name>/<utility-name>.ts`.
This file might also export utility-related symbols like types or constants.
Utility belongs to a single group.
It is re-exported in `src/<group-name>/index.ts`.
