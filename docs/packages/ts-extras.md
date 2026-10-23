# Package: [`ts-extras`](https://npmx.dev/ts-extras)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

Mostly thin, strongly-typed re-exports. `Unsafe` in a name flags that the stronger type relies on an unsound cast (e.g. `Object.keys` typed as `(keyof T)[]`).

| Original function group and name | Status | Our function group and name            | Notes                                                                                            |
| -------------------------------- | ------ | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`objectKeys`][ts-extras]        | ✅     | `object/objectKeysUnsafe`              | Renamed; `Unsafe` flags the unsound `(keyof T)[]` cast                                           |
| [`objectValues`][ts-extras]      | ✅     | `object/objectValuesUnsafe`            | Renamed                                                                                          |
| [`objectEntries`][ts-extras]     | ✅     | `object/objectEntriesUnsafe`           | Renamed                                                                                          |
| [`objectFromEntries`][ts-extras] | ✅     | `object/objectFromEntriesUnsafe`       | Renamed; shallow, distinct from `object/objectFromEntriesDeep`                                   |
| [`objectHasOwn`][ts-extras]      | ✅     | `object/objectHasOwn` *(same)*         | -                                                                                                |
| [`objectAssign`][ts-extras]      | ✅     | `object/objectAssign` *(same)*         | -                                                                                                |
| [`objectUpdate`][ts-extras]      | ✅     | `object/objectUpdate` *(same)*         | -                                                                                                |
| [`objectHasIn`][ts-extras]       | ✅     | `predicate/isIn`                       | Renamed; `(key, object)` order (reads like `key in object`); narrows the object                  |
| [`keyIn`][ts-extras]             | ✅     | `predicate/isKeyIn`                    | Renamed; `(key, object)` order; narrows the key to those present in the object                   |
| [`arrayAt`][ts-extras]           | ✅     | `array/arrayAt`                        | Consolidated with es-toolkit's `at` (also accepts a list of indexes)                             |
| [`arrayConcat`][ts-extras]       | ✅     | `array/arrayConcat` *(same)*           | -                                                                                                |
| [`arrayFirst`][ts-extras]        | ✅     | `array/arrayFirst` *(same)*            | -                                                                                                |
| [`arrayLast`][ts-extras]         | ✅     | `array/arrayLast` *(same)*             | -                                                                                                |
| [`arrayIncludes`][ts-extras]     | ✅     | `array/arrayIncludes` *(same)*         | -                                                                                                |
| [`arrayJoin`][ts-extras]         | ✅     | `array/arrayJoin` *(same)*             | -                                                                                                |
| [`setHas`][ts-extras]            | ✅     | `set/setHas` *(same)*                  | -                                                                                                |
| [`stringSplit`][ts-extras]       | ✅     | `string/stringSplit` *(same)*          | -                                                                                                |
| [`isFinite`][ts-extras]          | ✅     | `predicate/isFiniteNumber`             | Renamed to avoid clashing with the global `isFinite`                                             |
| [`isInfinite`][ts-extras]        | ✅     | `predicate/isInfinite` *(same)*        | -                                                                                                |
| [`isInteger`][ts-extras]         | ✅     | `predicate/isInteger` *(same)*         | -                                                                                                |
| [`isSafeInteger`][ts-extras]     | ✅     | `predicate/isSafeInteger` *(same)*     | -                                                                                                |
| [`isPropertyDefined`][ts-extras] | ✅     | `predicate/isPropertyDefined` *(same)* | -                                                                                                |
| [`isPropertyPresent`][ts-extras] | ✅     | `predicate/isPropertyNotNullish`       | Renamed for clarity (neither `null` nor `undefined`)                                             |
| [`not`][ts-extras]               | ✅     | `function/negatePredicate`             | Renamed; inverts a type-guard predicate                                                          |
| [`safeCastTo`][ts-extras]        | ✅     | `ts/castToSafe`                        | Renamed                                                                                          |
| [`asWritable`][ts-extras]        | ✅     | `ts/castToWritableUnsafe`              | Renamed; `Unsafe` flags the identity-at-runtime cast                                             |
| [`isDefined`][ts-extras]         | ❌     | *(not added)*                          | Modern TS (5.5+) infers type predicates, so `.filter((x) => x !== undefined)` narrows on its own |
| [`isPresent`][ts-extras]         | ❌     | *(not added)*                          | Same: `.filter((x) => x != null)` narrows on its own                                             |
| [`isEmpty`][ts-extras]           | ❌     | *(not added)*                          | Covered by `predicate/isEmptyValue` (es-toolkit)                                                 |
| [`objectMapValues`][ts-extras]   | ❌     | *(not added)*                          | Covered by `object/mapValues` (es-toolkit)                                                       |
| [`isEqualType`][ts-extras]       | ❌     | *(not added)*                          | Compile-time-only test helper; use `expectTypeOf` instead                                        |
| [`assert`][ts-extras]            | ❌     | *(not added)*                          | Use `misc/invariant`                                                                             |
| [`assertDefined`][ts-extras]     | ❌     | *(not added)*                          | Use `misc/invariant`                                                                             |
| [`assertPresent`][ts-extras]     | ❌     | *(not added)*                          | Use `misc/invariant`                                                                             |
| [`assertError`][ts-extras]       | ❌     | *(not added)*                          | Use the native `Error.isError`                                                                   |
| [`assertNever`][ts-extras]       | ❌     | *(not added)*                          | Use a `satisfies never` assertion                                                                |

[ts-extras]: https://github.com/sindresorhus/ts-extras
