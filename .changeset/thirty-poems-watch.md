---
'utilery': patch
---

Editor hovers now show the results of these utilities and types as single object types, instead of intersections like `{a: number} & {b: number}` or helper types like `Pick<...>`:

- `assignDefaults`, `mergeDeep` (with `mergeValues`), `omit`, `pick` and `swapObjectProperties`
- `DiscriminatedUnion`, `NonEmptyObject`, `OmitDistributed`, `OmitIndexSignature`, `PickConditional`, `PickDistributed`, `PickIndexSignature`, `RequireAtLeastOne`, `RequireExactlyOne`, `SetNonNullable`, `StringifiedValues` and `TruncateOptions`
