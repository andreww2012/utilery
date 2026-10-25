---
'utilery': patch
---

Fixed utilities for options set to `undefined`, which the types allow without the `exactOptionalPropertyTypes` compiler option, and types for users with that option:

- options set to `undefined` work like missing ones in:
  - `jsonStringifyStable.configure`, which threw a `TypeError` for them
  - `formatBytes`: `space`
  - `slugify` and `createUniqueSlugify`: `separator`, `lowercase`, `decamelize` and `preserveCharacters`
  - `truncate`: `omission`
  - `writeJsonFile` and `writeJsonFileSync`: `detectIndent`
- with the compiler option:
  - `undefined` can be passed as `circularValue` to `jsonStringifyStable.configure` and as `indent` to `writeJsonFile` and `writeJsonFileSync`, as documented
  - `objectUpdate` accepts an optional property of the update for a required property of the target, and rejects `undefined` for an optional property of the target that doesn't include it
