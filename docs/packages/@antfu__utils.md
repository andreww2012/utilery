<!-- cspell:ignore lerp -->

# Package: [`@antfu/utils`](https://npmx.dev/@antfu/utils)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

A general-purpose grab-bag that overlaps heavily with `es-toolkit` and our existing utilities, so most entries are already covered.
Only its **non-type** (runtime) exports are audited here; the type-level utilities are out of scope.

| Original function         | Status | Our function group and name    | Notes                                                                                    |
| ------------------------- | ------ | ------------------------------ | ---------------------------------------------------------------------------------------- |
| `assert`                  | ❌     | `misc/invariant`               | es-toolkit's `invariant` is identical                                                    |
| `at`                      | ❌     | `array/arrayAt`                | Covered (also accepts a list of indices)                                                 |
| `batchInvoke`             | ❌     | *(not added)*                  | Trivial `fns.forEach((fn) => fn?.())`                                                    |
| `capitalize`              | ❌     | `string/capitalize`            | es-toolkit equivalent (also lowercases the tail)                                         |
| `clamp`                   | ❌     | `math/clamp`                   | Covered                                                                                  |
| `clampArrayRange`         | ❌     | *(not added)*                  | Trivial `clamp(n, 0, arr.length - 1)`; degenerate on empty arrays                        |
| `clearUndefined`          | 🚧     | *(under consideration)*        | Mutating strip of `undefined`; `omit(obj, (v) => v === undefined)` covers the copy case  |
| `createControlledPromise` | ❌     | *(native)*                     | Use `Promise.withResolvers()`                                                            |
| `createPromiseLock`       | 🚧     | *(under consideration)*        | A dynamic wait-group (await all in-flight); would need a rename                          |
| `createSingletonPromise`  | ❌     | `async/createSingletonPromise` | Replaced by our own code: doesn't keep rejections by default, has a `ttl` option         |
| `debounce`                | ❌     | `function/debounce`            | Covered (es-toolkit)                                                                     |
| `deepMerge`               | ❌     | `object/mergeDeep`             | Covered                                                                                  |
| `deepMergeWithArray`      | ❌     | `object/mergeDeep`             | Array-concat merge expressible via the `mergeValues` customizer                          |
| `ensurePrefix`            | ✅     | `string/ensurePrefix`          | Renamed args to `(value, prefix)` (subject-first)                                        |
| `ensureSuffix`            | ✅     | `string/ensureSuffix`          | Renamed args to `(value, suffix)` (subject-first)                                        |
| `filterInPlace`           | ❌     | `array/arrayPurgeBy`           | Mutating remove-by-predicate                                                             |
| `flattenArrayable`        | ❌     | *(not added)*                  | Trivial `arrayify(x).flat(1)`                                                            |
| `getTypeName`             | ✅     | `value/typeOf`                 | Renamed; no longer lowercases object class tags                                          |
| `hasOwnProperty`          | ❌     | `object/objectHasOwn`          | Covered                                                                                  |
| `invoke`                  | ❌     | *(not added)*                  | Trivial; call `fn()` directly                                                            |
| `isBoolean`               | ❌     | *(native)*                     | `typeof x === 'boolean'`                                                                 |
| `isBrowser`               | ❌     | `runtime/isBrowser`            | Covered                                                                                  |
| `isDate`                  | ❌     | *(native)*                     | `x instanceof Date`                                                                      |
| `isDeepEqual`             | ❌     | `value/isEqual`                | Covered                                                                                  |
| `isDef`                   | ❌     | *(native)*                     | `x !== undefined`; TS 5.5+ infers the narrowing in `.filter`                             |
| `isFunction`              | ❌     | *(native)*                     | `typeof x === 'function'`                                                                |
| `isKeyOf`                 | ❌     | `predicate/isKeyIn`            | Same `key in object` guard                                                               |
| `isNull`                  | ❌     | *(native)*                     | `x === null`                                                                             |
| `isNumber`                | ❌     | *(native)*                     | `typeof x === 'number'`                                                                  |
| `isObject`                | ❌     | `predicate/isPlainObject`      | antfu's `isObject` is plain-object detection                                             |
| `isPrimitive`             | ❌     | `predicate/isPrimitive`        | Covered                                                                                  |
| `isRegExp`                | ❌     | *(native)*                     | `x instanceof RegExp`                                                                    |
| `isString`                | ❌     | *(native)*                     | `typeof x === 'string'`                                                                  |
| `isTruthy`                | ✅     | `predicate/isTruthy`           | Reimplemented with a precise `Truthy<T>` narrowing                                       |
| `isUndefined`             | ❌     | *(native)*                     | `x === undefined`                                                                        |
| `isWindow`                | ❌     | *(not added)*                  | DOM-only; off-target for a node-first library                                            |
| `last`                    | ❌     | `array/arrayLast`              | Covered                                                                                  |
| `lerp`                    | ✅     | `math/interpolate`             | Renamed; unclamped by default (opt-in `clamp`)                                           |
| `mergeArrayable`          | ❌     | *(not added)*                  | Trivial `args.flatMap(arrayify)`                                                         |
| `move`                    | ✅     | `array/arrayMove`              | Renamed (group prefix); mutating                                                         |
| `noNull`                  | ❌     | *(native)*                     | `x !== null`                                                                             |
| `noop`                    | ❌     | `function/noop`                | Covered                                                                                  |
| `notNullish`              | ❌     | *(native)*                     | `x != null`; TS 5.5+ infers the narrowing in `.filter`                                   |
| `notUndefined`            | ❌     | *(native)*                     | `x !== undefined`; TS 5.5+ infers the narrowing                                          |
| `objectEntries`           | ❌     | `object/objectEntriesUnsafe`   | Covered                                                                                  |
| `objectId`                | ❌     | *(not added)*                  | Niche; `Math.random` ids + primitive passthrough; would need a counter-based rewrite     |
| `objectKeys`              | ❌     | `object/objectKeysUnsafe`      | Covered                                                                                  |
| `objectMap`               | ✅     | `object/mapEntries`            | Renamed; entry transform with `undefined`-drop                                           |
| `objectOmit`              | ❌     | `object/omit`                  | Covered (incl. `omitUndefined` via predicate)                                            |
| `objectPick`              | ❌     | `object/pick`                  | Covered (incl. `omitUndefined` via predicate)                                            |
| `p`                       | ❌     | `async/withConcurrencyLimit`   | Promise-pool API; niche, overlaps existing concurrency control                           |
| `partition`               | ✅     | `array/arrayPartition`         | n-way partition folded into the existing util                                            |
| `randomStr`               | 🚧     | *(under consideration)*        | `Math.random`-based; a crypto-secure variant is preferable                               |
| `range`                   | ❌     | `math/range`                   | Covered (incl. `rangeRight`)                                                             |
| `remap`                   | ✅     | `math/mapRange`                | Renamed; tuple ranges, unclamped by default                                              |
| `remove`                  | ❌     | `array/arrayPurgeBy`           | Covered (mutating)                                                                       |
| `sample`                  | ✅     | `array/arraySample`            | With-replacement sampling folded in (unbiased)                                           |
| `shuffle`                 | ❌     | `array/arrayShuffle`           | Covered                                                                                  |
| `slash`                   | ✅     | `string/toForwardSlashes`      | Renamed for clarity                                                                      |
| `sleep`                   | ❌     | `async/sleep`                  | Covered (es-toolkit `delay`)                                                             |
| `sum`                     | ❌     | `math/sum`                     | Covered                                                                                  |
| `tap`                     | ✅     | `function/tap`                 | -                                                                                        |
| `template`                | 🚧     | *(under consideration)*        | Falsy values wrongly hit the fallback (`\|\|`); missing indexed args emit `"undefined"`  |
| `throttle`                | ❌     | `function/throttle`            | Covered (es-toolkit)                                                                     |
| `timestamp`               | ❌     | *(native)*                     | `Date.now()`                                                                             |
| `toArray`                 | ❌     | `array/arrayify`               | Covered                                                                                  |
| `toString`                | ❌     | *(not added)*                  | Internal helper (`Object.prototype.toString.call`)                                       |
| `unindent`                | ❌     | `string/dedent`                | Broken with interpolations (reads only `strings[0]`); superseded by the `dedent` package |
| `uniq`                    | ❌     | `array/arrayUnique`            | Covered                                                                                  |
| `uniqueBy`                | ❌     | `array/arrayUnique`            | Covered (comparator form)                                                                |

## Types

| Original type | Status | Our type group and name | Notes                                     |
| ------------- | ------ | ----------------------- | ----------------------------------------- |
| `Nullable`    | ✅     | `types/Nullable`        | Widens a type with `null` and `undefined` |
