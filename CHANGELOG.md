# utilery

## 0.2.0

### Minor Changes

- [`47be3d5`](https://github.com/andreww2012/unutils/commit/47be3d50238cdb323f2b60025d5752fac960456a) Thanks [@andreww2012](https://github.com/andreww2012)! - Narrowed the supported Node.js versions to `^22.23.1 || ^24.18.0 || >=26.4.0` (was `^22.23.1 || >=24`) and exported `package.json` as `/package.json` subpath

- [`9fe6fdb`](https://github.com/andreww2012/unutils/commit/9fe6fdbb11803a0d49c275e2f3dc58e23e55d1ac) Thanks [@andreww2012](https://github.com/andreww2012)! - Added the following new utilities from [`ms-ts`](https://npmx.dev/ms-ts) package:
  
  - `ms` (`misc` group)
  - `Ms` (`types` group)

- [`2fecdaf`](https://github.com/andreww2012/unutils/commit/2fecdafb70abe5fce7607741a2dd34b34b2c74f2) Thanks [@andreww2012](https://github.com/andreww2012)! - Added a new `misc/generateMailtoLink` utility

- [`ca6a52c`](https://github.com/andreww2012/unutils/commit/ca6a52cea44141574855eafeb475c7638f94b5df) Thanks [@andreww2012](https://github.com/andreww2012)! - Added a new `array/arrayHasMaxElements` utility - the "at most" counterpart to `array/arrayHasMinElements` - together with the `types/ArrayWithMaxLength` type powering its narrowing

- [`280d41e`](https://github.com/andreww2012/unutils/commit/280d41e4bc6a7a9eadf80b3c182ba8a88c19a3a6) Thanks [@andreww2012](https://github.com/andreww2012)! - Added the following new utilities from [`typed-query-selector`](https://npmx.dev/typed-query-selector) package, belonging to the new `dom` group:
  
  - `querySelectorTyped`
  - `querySelectorAllTyped`
  - `closestTyped`
  - `ElementFromSelector` (type)
  - `ElementFromSelectorStrict` (type)
  - `ElementFromTagName` (type)
  
  Added two opt-in side-effect entrypoints that type the *native* DOM lookup methods from the selector:
  
  - `unutils/dom/query-selector-typed.global`
  - `unutils/dom/query-selector-typed-strict.global`
  
  You should import at most one of the two.

- [`19ad83a`](https://github.com/andreww2012/unutils/commit/19ad83a87557f1509ae1bd9087ecd9e36d039d2f) Thanks [@andreww2012](https://github.com/andreww2012)! - Added the following new utilities from [`nanoid`](https://npmx.dev/nanoid) package, belonging to the new `id` group:
  
  - `nanoid`
  - `nanoidFactory`
  - `NANOID_URL_ALPHABET` (constant)

- [`625e1a3`](https://github.com/andreww2012/unutils/commit/625e1a3881134a24e3875d9690083b9e0342fc84) Thanks [@andreww2012](https://github.com/andreww2012)! - Added two new `map` utilities that mirror the native `Map#getOrInsert` and `Map#getOrInsertComputed` methods, which are not yet widely available:
  
  - `mapGetOrInsert` - returns the value stored under a key, inserting an eagerly built default first when the key is missing
  - `mapGetOrInsertComputed` - the lazy counterpart, building the default only on a miss
  
  Both return a non-optional value, so `mapGetOrInsertComputed(map, key, () => []).push(item)` replaces the usual read-check-insert dance.

- [`2c764a4`](https://github.com/andreww2012/unutils/commit/2c764a429dc3990eb69c0618311dd9f0a0081ce6) Thanks [@andreww2012](https://github.com/andreww2012)! - Updated [`type-fest` from v5.8.0 to v5.10.0](https://github.com/sindresorhus/type-fest/compare/v5.8.0...v5.10.0):
  
  - Added `RenameKeys` (as-is) and `MaxNumberInUnion` (renamed from `UnionMax`) utilities

- [`17d62ef`](https://github.com/andreww2012/unutils/commit/17d62efb016f10794841cd3846a5e1ac746a798a) Thanks [@andreww2012](https://github.com/andreww2012)! - Updated [`es-toolkit` from v1.49.0 to v1.52.0](https://github.com/toss/es-toolkit/compare/v1.49.0...v1.52.0):
  
  - Added the following utilities:
    - `object` group:
      - `freezeDeep` (renamed from [`deepFreeze`](https://es-toolkit.dev/reference/object/deepFreeze.html))
      - [`mapKeysAsync`](https://es-toolkit.dev/reference/object/mapKeysAsync.html) (as-is)
      - [`mapValuesAsync`](https://es-toolkit.dev/reference/object/mapValuesAsync.html) (as-is)
    - `function` group:
      - `flowAsync` (`flowAsync` from `es-toolkit/fp`, taking the functions as an array like `flow`)
      - `toDisposable` (consolidates [`defer`](https://es-toolkit.dev/reference/util/defer.html) and [`deferAsync`](https://es-toolkit.dev/reference/util/deferAsync.html))
    - `iterable` group, from the new `es-toolkit/iterator` entrypoint (all of them accept any iterable, not only iterators):
      - `generateSequence` (renamed from `iterate`)
      - `iterableCartesianProduct` (renamed from `cartesianProduct`)
      - `iterableChunks` (renamed from `chunk`)
      - `iterableCount` (renamed from `count`)
      - `iterableDropWhile` (renamed from `dropWhile`)
      - `iterableFirst` (renamed from `head`)
      - `iterablePartition` (renamed from `partition`)
      - `iterableRange` (renamed from `range`)
      - `iterableScan` (renamed from `scan`)
      - `iterableTakeWhile` (renamed from `takeWhile`)
      - `iterableTranspose` (renamed from `zip`)
      - `iterableUnique` (renamed from `uniqBy`)
    - `math` group, from the new `es-toolkit/bigint` entrypoint:
      - `bigintMedian` (consolidates [`median`](https://es-toolkit.dev/reference/bigint/median.html) and [`medianBy`](https://es-toolkit.dev/reference/bigint/medianBy.html))
      - `bigintPercentile` (renamed from [`percentile`](https://es-toolkit.dev/reference/bigint/percentile.html))
      - `bigintSum` (consolidates [`sum`](https://es-toolkit.dev/reference/bigint/sum.html) and [`sumBy`](https://es-toolkit.dev/reference/bigint/sumBy.html))
  - The following utilities now also accept bigints, consolidated with their counterparts from the new `es-toolkit/bigint` entrypoint:
    - `array/maxBy` ([`maxBy`](https://es-toolkit.dev/reference/bigint/maxBy.html))
    - `array/minBy` ([`minBy`](https://es-toolkit.dev/reference/bigint/minBy.html))
    - `math/clamp` ([`clamp`](https://es-toolkit.dev/reference/bigint/clamp.html))
    - `math/isInRange` ([`inRange`](https://es-toolkit.dev/reference/bigint/inRange.html))
    - `math/max` ([`max`](https://es-toolkit.dev/reference/bigint/max.html))
    - `math/min` ([`min`](https://es-toolkit.dev/reference/bigint/min.html))
    - `math/range` ([`range`](https://es-toolkit.dev/reference/bigint/range.html))
    - `math/rangeRight` ([`rangeRight`](https://es-toolkit.dev/reference/bigint/rangeRight.html))
  - `toConstantCaseKeysDeep`, `toKebabCaseKeysDeep` and `toPascalCaseKeysDeep` are now based on the new [`toConstantCaseKeys`](https://es-toolkit.dev/reference/object/toConstantCaseKeys.html), [`toKebabCaseKeys`](https://es-toolkit.dev/reference/object/toKebabCaseKeys.html) and [`toPascalCaseKeys`](https://es-toolkit.dev/reference/object/toPascalCaseKeys.html): non-ASCII letters are no longer treated as word boundaries, and class instances are kept as-is

- [`3c743b5`](https://github.com/andreww2012/unutils/commit/3c743b500430e20704718f4a6d603a390a00320b) Thanks [@andreww2012](https://github.com/andreww2012)! - Updated [`devalue` from v5.8.1 to v6.0.2](https://github.com/sveltejs/devalue/compare/v5.8.1...v6.0.2)
  
  Added the following new utilities from [`devalue`](https://npmx.dev/devalue) package (`json` group):
  
  - `structuredStringifyAsync` (renamed from `stringifyAsync`) - the promise-awaiting counterpart of `structuredStringify`
  - `StructuredStringifyError` (renamed from `DevalueError`) - thrown by `structuredStringify` and `structuredStringifyAsync`
  - `structuredFilterArrayIndexes` (renamed from `filterArrayIndices`) - for custom `StructuredStringifyOperations`
  - `STRUCTURED_STRINGIFY_DEFAULT_OPERATIONS` (constant, renamed from `defaultStringifyOperations`) - default `operations` of `structuredStringify` and `structuredStringifyAsync`
  - `STRUCTURED_PARSE_DEFAULT_OPERATIONS` (constant, renamed from `defaultParseOperations`) - default `operations` of `structuredParse`
  - `StructuredStringifyOptions` (type, renamed from `StringifyOptions`) - options of `structuredStringify` and `structuredStringifyAsync`
  - `StructuredStringifyOperations` (type, renamed from `StringifyOperations`) - `operations` option of `structuredStringify` and `structuredStringifyAsync`
  - `StructuredParseOptions` (type, renamed from `ParseOptions`) - options of `structuredParse`
  - `StructuredParseOperations` (type, renamed from `ParseOperations`) - `operations` option of `structuredParse`

### Patch Changes

- [`4154dfd`](https://github.com/andreww2012/unutils/commit/4154dfd13a11cce7708f2ade3c4a381e82e7cf37) Thanks [@andreww2012](https://github.com/andreww2012)! - Updated [`nanoid` from v6.0.1 to v6.0.2](https://github.com/ai/nanoid/compare/6.0.1...6.0.2)

- [`36aec3b`](https://github.com/andreww2012/unutils/commit/36aec3b065269ad64fda98a8b03f58caa448f702) Thanks [@andreww2012](https://github.com/andreww2012)! - Updated [`arkregex` from v0.0.8 to v0.0.12](https://github.com/arktypeio/arktype/compare/arktype@2.2.3...arktype@2.2.7)

- [`9de1274`](https://github.com/andreww2012/unutils/commit/9de1274e68392bd3a385c519bd4a255f88fa347a) Thanks [@andreww2012](https://github.com/andreww2012)! - Fixed `jsonParseAsync` and `jsonStringifyAsync`:
  
  - `jsonParseAsync` no longer rejects every input with `ReferenceError: chunk is not defined`
  - `jsonStringifyAsync` now matches `JSON.stringify` in more cases:
    - nested objects and arrays are indented correctly with `space`
    - `space` is limited like in `JSON.stringify`: strings are cut to 10 characters, and numbers are truncated
    - values with `toJSON` (like `Date`) no longer get extra whitespace, and the replacer gets them after `toJSON` is called
    - the replacer gets array indexes as strings, and a replacer array accepts numbers and skips duplicates
    - control characters are escaped
  - `jsonStringifyAsync` now respects `intensity` instead of always using `1`
  - Concurrent `jsonStringifyAsync` calls no longer mix up long strings or fail with "Circular Structure Detected"

- [`1e232d0`](https://github.com/andreww2012/unutils/commit/1e232d00252d980033cae7c4549f2d7f3c806a19) Thanks [@andreww2012](https://github.com/andreww2012)! - The package now declares the `sideEffects` field in `package.json`, so bundlers drop unused modules: for example, importing a single utility from the main entrypoint no longer adds ~19 KB of unused code to the bundle

- [`c15d096`](https://github.com/andreww2012/unutils/commit/c15d09676a9d0aa0721e7987c1aae32eed8c4057) Thanks [@andreww2012](https://github.com/andreww2012)! - Updated [`remeda` from v2.39.0 to v2.51.0](https://github.com/remeda/remeda/compare/v2.39.0...v2.51.0)

- [`55cfbc6`](https://github.com/andreww2012/unutils/commit/55cfbc66959a54447d121073eb28c07960fded07) Thanks [@andreww2012](https://github.com/andreww2012)! - Updated [`ts-extras` from v1.2.0 to v1.3.0](https://github.com/sindresorhus/ts-extras/compare/v1.2.0...v1.3.0)

- [`8edb1b4`](https://github.com/andreww2012/unutils/commit/8edb1b47a345aa5c42d7e937b253520497e87de3) Thanks [@andreww2012](https://github.com/andreww2012)! - Updated [`typed-query-selector` from v2.12.2 to v2.12.3](https://github.com/g-plane/typed-query-selector/compare/v2.12.2...v2.12.3)
  
  Selectors with `[]` inside a quoted attribute value, like `input[name="tags[]"]`, are now resolved to the right element type instead of falling back to `Element`

## 0.1.0

### Minor Changes

- 68b46d2: `Nullable`: new type utility that wides the given type with `null` and `undefined`
- b16aa66: Updated [`es-toolkit` from v1.47.1 to v1.49.0](https://github.com/toss/es-toolkit/compare/v1.47.1...v1.49.0):

  - `arrayChunks` now accepts a function as the second parameter, using `chunkBy` from `es-toolkit/fp` in this case

- 6afcd0e: Updated [`ts-extras` from v1.0.0 to v1.2.0](https://github.com/sindresorhus/ts-extras/compare/v1.0.0...v1.2.0):

  - Added `object/object{Assign,Update}` utilities as-is

- df7f800: Updated [`type-fest` from v5.7.0 to v5.8.0](https://github.com/sindresorhus/type-fest/compare/v5.7.0...v5.8.0):

  - Added `ExtractExactly`, `StringLength`, `StringToArray` and `StringToNumber` utilities as-is

- fb67815: `Falsy`, `Truthy`: new type utilities to represent "falsy" and "truthy" runtime values respectively, to the degree TypeScript allows that
- 8ef2d03: Added a new group of object traversing utilities (called `traverse`) from `neotraverse` package: `traverse{Every,Filter,Find,ForEach,Map,Nodes,Paths,Reduce,Some}`

### Patch Changes

- 34da115: `arrayify` now correctly flattens heterogeneous array types (`(T | T[])[]` becomes `T[]`)
- a554170: Added missing type parameter to `jsonParseSafe`, allowing to cast the output to the given type
- 6de873b: <s>`arraySwapIndices`</s> utility was renamed to `arraySwapIndexes`

## 0.0.1

### Patch Changes

- 901b105: Initial release.

## 0.0.1

### Patch Changes

- 901b105: Initial release.
