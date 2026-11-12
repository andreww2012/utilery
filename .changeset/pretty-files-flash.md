---
'utilery': minor
---

Updated [`ts-extras` from v1.3.0 to v2.0.0](https://github.com/sindresorhus/ts-extras/compare/v1.3.0...v2.0.0), which affected:

- `arrayConcat`:
  - A single tuple now keeps its shape: `arrayConcat(['x', 1] as const)` is typed as `['x', 1]` instead of `('x' | 1)[]`
  - Primitives are now accepted after the first array and added as elements: `arrayConcat(['a'], 1)`
  - The result type now includes the elements of arrays passed as a spread of unknown length
- `arrayFirst`:
  - The result now has no `undefined` for a tuple that ends with a required element, like `[...string[], number]`
- `arrayJoin`:
  - The delimiter is now optional and defaults to a comma
  - Elements with no literal form, like objects, are now accepted and give a `string`
- `arrayLast`:
  - The result now has no `undefined` for a tuple that starts with a required element, like `[string, ...number[]]`
- `isIn`:
  - **BREAKING:** it now returns `false` for `null` and `undefined`, and looks up a primitive on its wrapper object, instead of throwing a `TypeError`
  - It now returns `false` instead of throwing for a proxy that is revoked or whose trap throws
- `isKeyIn`:
  - It now returns `false` instead of throwing for a proxy that is revoked or whose trap throws
- `isPropertyDefined` and `isPropertyNotNullish`:
  - A property that the type of the value doesn't declare is now narrowed to `{} | null` and `{}` instead of `unknown`
  - They now return `false` instead of throwing for a proxy that is revoked or whose trap throws
- `negatePredicate`:
  - An `unknown` value is now narrowed to every type but the one of the original guard instead of staying `unknown`, and is no longer `never` when the new guard returns `false`
- `objectAssign`:
  - A key that is optional in both the target and a source now stays optional in the result type instead of becoming required
  - A source typed as a union of objects now adds the keys of all its members to the result type instead of making it `object`
  - A `__proto__` key of a source is now left out of the result type
- `objectFromEntriesUnsafe`:
  - **BREAKING:** all the keys of the result are now optional when a pair of a tuple has a union or non-literal key, like `[condition ? 'a' : 'b', 1]`
- `objectHasOwn`:
  - **BREAKING:** it now returns `false` for `null` and `undefined` instead of throwing a `TypeError`
  - It now returns `false` instead of throwing for a proxy that is revoked or whose trap throws
- `stringSplit`:
  - A regular expression delimiter and a `limit` are now accepted and give `string[]`
