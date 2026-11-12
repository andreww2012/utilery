# Package: [`ts-extras`](https://npmx.dev/ts-extras)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

Mostly thin, strongly-typed re-exports.
`Unsafe` in a name flags that the stronger type relies on an unsound cast (e.g. `Object.fromEntries` typed with the keys and values of the pairs).

| Original function group and name | Status | Our function group and name            | Notes                                                                                            |
| -------------------------------- | ------ | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`objectKeys`][ts-extras]        | ❌     | `object/objectKeysUnsafe`              | Replaced by our own code: arrays give no method names, unions give keys per member               |
| [`ObjectKeys`][ts-extras]        | ❌     | *(not added)*                          | Describes the result of the upstream `objectKeys`, not of `object/objectKeysUnsafe`              |
| [`objectValues`][ts-extras]      | ❌     | `object/objectValuesUnsafe`            | Replaced by our own code: optional values include `undefined`, unions give values per member     |
| [`objectEntries`][ts-extras]     | ❌     | `object/objectEntriesUnsafe`           | Replaced by our own code: optional values include `undefined`, unions give entries per member    |
| [`objectFromEntries`][ts-extras] | ✅     | `object/objectFromEntriesUnsafe`       | Renamed; shallow, distinct from `object/objectFromEntriesDeep`                                   |
| [`objectHasOwn`][ts-extras]      | ✅     | `object/objectHasOwn` *(same)*         | Narrows nothing when the object type already has the key                                         |
| [`objectAssign`][ts-extras]      | ✅     | `object/objectAssign` *(same)*         | Reimplemented with the same types: an own `__proto__` key becomes a property, not skipped        |
| [`objectUpdate`][ts-extras]      | ✅     | `object/objectUpdate` *(same)*         | Reimplemented: its signature can't be written out; copies `__proto__` like `objectAssign`        |
| [`objectHasIn`][ts-extras]       | ✅     | `predicate/isIn`                       | Renamed; `(key, object)` order; narrows the object, unless its type already has the key          |
| [`keyIn`][ts-extras]             | ✅     | `predicate/isKeyIn`                    | Renamed; `(key, object)` order; narrows the key to those present in the object, if it can        |
| [`arrayAt`][ts-extras]           | ✅     | `array/arrayAt`                        | Consolidated with `es-toolkit`'s `at` (also accepts a list of indexes)                           |
| [`arrayConcat`][ts-extras]       | ✅     | `array/arrayConcat` *(same)*           | -                                                                                                |
| [`arrayFirst`][ts-extras]        | ✅     | `array/arrayFirst` *(same)*            | -                                                                                                |
| [`arrayLast`][ts-extras]         | ✅     | `array/arrayLast` *(same)*             | -                                                                                                |
| [`arrayIncludes`][ts-extras]     | ✅     | `array/arrayIncludes` *(same)*         | -                                                                                                |
| [`arrayIndexOf`][ts-extras]      | ✅     | `array/arrayIndexOf` *(same)*          | -                                                                                                |
| [`arrayLastIndexOf`][ts-extras]  | ✅     | `array/arrayLastIndexOf` *(same)*      | -                                                                                                |
| [`arrayIsArray`][ts-extras]      | ❌     | *(not added)*                          | Covered by `predicate/isArray`                                                                   |
| [`arrayJoin`][ts-extras]         | ✅     | `array/arrayJoin` *(same)*             | -                                                                                                |
| [`setHas`][ts-extras]            | ✅     | `set/setHas` *(same)*                  | -                                                                                                |
| [`mapHas`][ts-extras]            | ✅     | `map/mapHas` *(same)*                  | -                                                                                                |
| [`stringSplit`][ts-extras]       | ✅     | `string/stringSplit` *(same)*          | -                                                                                                |
| [`stringStartsWith`][ts-extras]  | ✅     | `string/startsWith`                    | Renamed                                                                                          |
| [`stringEndsWith`][ts-extras]    | ✅     | `string/endsWith`                      | Renamed                                                                                          |
| [`isFinite`][ts-extras]          | ✅     | `predicate/isFiniteNumber`             | Renamed to avoid clashing with the global `isFinite`; takes a `number` and returns a `boolean`   |
| [`isInfinite`][ts-extras]        | ✅     | `predicate/isInfinite` *(same)*        | -                                                                                                |
| [`isInteger`][ts-extras]         | ✅     | `predicate/isInteger` *(same)*         | Takes a `number` and returns a `boolean`, with no narrowing of numeric literals                  |
| [`isSafeInteger`][ts-extras]     | ✅     | `predicate/isSafeInteger` *(same)*     | Takes a `number` and returns a `boolean`, with no narrowing of numeric literals                  |
| [`isPropertyDefined`][ts-extras] | ✅     | `predicate/isPropertyDefined` *(same)* | -                                                                                                |
| [`isPropertyPresent`][ts-extras] | ✅     | `predicate/isPropertyNotNullish`       | Renamed for clarity (neither `null` nor `undefined`)                                             |
| [`not`][ts-extras]               | ✅     | `function/negatePredicate`             | Renamed; inverts a type-guard predicate                                                          |
| [`safeCastTo`][ts-extras]        | ✅     | `ts/castToSafe`                        | Renamed                                                                                          |
| [`asWritable`][ts-extras]        | ✅     | `ts/castToWritableUnsafe`              | Renamed; `Unsafe` flags the identity-at-runtime cast                                             |
| [`isDefined`][ts-extras]         | ❌     | *(not added)*                          | Modern TS (5.5+) infers type predicates, so `.filter((x) => x !== undefined)` narrows on its own |
| [`isPresent`][ts-extras]         | ❌     | *(not added)*                          | Same: `.filter((x) => x != null)` narrows on its own                                             |
| [`isEmpty`][ts-extras]           | ❌     | *(not added)*                          | Covered by `predicate/isEmptyValue`                                                              |
| [`isNonEmpty`][ts-extras]        | ❌     | *(not added)*                          | Covered by `array/arrayHasMinElements`                                                           |
| [`hasAtLeast`][ts-extras]        | ❌     | *(not added)*                          | Covered by `array/arrayHasMinElements`                                                           |
| [`isTruthy`][ts-extras]          | ❌     | *(not added)*                          | Covered by `predicate/isTruthy`                                                                  |
| [`objectMapValues`][ts-extras]   | ❌     | *(not added)*                          | Covered by `object/mapValues`                                                                    |
| [`isEqualType`][ts-extras]       | ❌     | *(not added)*                          | Compile-time-only test helper; use `expectTypeOf` instead                                        |
| [`assert`][ts-extras]            | ❌     | *(not added)*                          | Use `misc/invariant`                                                                             |
| [`assertDefined`][ts-extras]     | ❌     | *(not added)*                          | Use `misc/invariant`                                                                             |
| [`assertPresent`][ts-extras]     | ❌     | *(not added)*                          | Use `misc/invariant`                                                                             |
| [`assertError`][ts-extras]       | ❌     | *(not added)*                          | Use the native `Error.isError`                                                                   |
| [`assertNever`][ts-extras]       | ❌     | *(not added)*                          | Use a `satisfies never` assertion                                                                |

[ts-extras]: https://github.com/sindresorhus/ts-extras
