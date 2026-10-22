<!-- cspell:ignore jsonrepair jsondiffpatch hyperjump unpatch lerp unflatten -->

# unutils [![npm](https://img.shields.io/npm/v/unutils)](https://npmx.dev/unutils)

A growing collection of general-purpose utilities and TypeScript types, mostly consolidated from existing popular packages with improved UX/DX, bug fixes and improvements in functionality.

## Features

- 🌱 **Zero dependencies**: everything is bundled;
- 🌳 **Tree-shakeable**: unused utilities are dropped from your bundle;
- ✨ **More than 250** utilities and **200** types.

## Installation

Minimum supported runtimes:

- NodeJS: `^22.23.1 || ^24.18.0 || >=26.4.0`
- Browsers: all [Baseline widely available](https://web-platform-dx.github.io/baseline) features are implemented (see [the corresponding `browserslist` browsers list](https://browsersl.ist/#q=baseline+widely+available))

```sh
pnpm i -D unutils
npm i -D unutils
yarn add -D unutils
```

## Usage

Import any function or type from the main entrypoint (except for runtime-specific utilities):

```ts
import {mapKeys} from 'unutils';
```

or from a specific entrypoint:

```ts
import {every} from 'unutils/iterable';
```

See individual symbols' JSDoc for detailed documentation.

<details>
<summary>List of entrypoints</summary>

| Entrypoint  | Description                                             | Available in main? |
| ----------- | ------------------------------------------------------- | ------------------ |
| `array`     | Array and tuple manipulation                            | ✅                 |
| `async`     | Promises, mutexes, timeouts and concurrency             | ✅                 |
| `bitwise`   | Bit flags and other bit manipulation of 32-bit integers | ✅                 |
| `bytes`     | `Uint8Array` conversion, Base64 and hex encoding        | ✅                 |
| `dom`       | Selector-typed DOM lookups                              | ❌                 |
| `function`  | Function composition, currying and partial application  | ✅                 |
| `glob`      | Glob pattern matching and path filters                  | ✅                 |
| `http`      | Parsing and formatting of HTTP headers                  | ✅                 |
| `id`        | Unique ID generation                                    | ✅                 |
| `iterable`  | Generic iterable traversal and aggregation              | ✅                 |
| `json`      | JSON parsing and serialization                          | ✅                 |
| `map`       | `Map` querying, insertion and transformation            | ✅                 |
| `math`      | Numeric aggregation, interpolation and randomness       | ✅                 |
| `misc`      | Miscellaneous helpers that fit no other group           | ✅                 |
| `net`       | IP address validation and classification                | ✅                 |
| `object`    | Object merging, picking and deep-path access            | ✅                 |
| `path`      | Cross-platform file path checks and parsing             | ✅                 |
| `predicate` | Type guards and value predicates                        | ✅                 |
| `regex`     | Type-safe `RegExp` and pattern escaping                 | ✅                 |
| `runtime`   | Runtime environment detection                           | ✅                 |
| `semver`    | Semantic version comparison and npm-style ranges        | ✅                 |
| `server`    | Node-only helpers (filesystem, process, terminal)       | ❌                 |
| `set`       | `Set` querying and transformation                       | ✅                 |
| `string`    | String casing, splitting and affixing                   | ✅                 |
| `traverse`  | Recursive visitor traversal of nested values            | ✅                 |
| `ts`        | TypeScript runtime and compile-time assertions          | ✅                 |
| `types`     | Type-only utility types                                 | ✅                 |
| `value`     | Cloning, equality and type inspection for any value     | ✅                 |

</details>

### Global augmentation entrypoints

Entrypoints whose name ends in `.global` export nothing at all.
They are imported for their effect instead: each one augments an existing *global* type, so the improvement reaches every call site in your project without a single one of them changing.

```ts
import 'unutils/dom/query-selector-typed.global';

document.querySelector('button#submit'); // HTMLButtonElement | null
```

One import anywhere in your project is enough — a declaration file or an entry module is the usual place.
They are strictly opt-in: no other entrypoint pulls them in, so nothing changes until you add the import yourself.
Where several of them augment the same thing, import at most one, otherwise their declarations merge into each other.

<details>
<summary>List of global augmentation entrypoints</summary>

| Entrypoint                               | Description                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dom/query-selector-typed.global`        | Types the native `querySelector`, `querySelectorAll` and `closest` from the CSS selector literal they are given, on every `ParentNode` and `Element`. An unknown tag or a malformed selector falls back to `Element`. The same typing is available as ordinary functions from `dom`, should you prefer not to touch globals |
| `dom/query-selector-typed-strict.global` | As above, except a malformed selector resolves to `never` rather than falling back, turning a typo into a compile error instead of a runtime throw. Mutually exclusive with the entrypoint above                                                                                                                            |

</details>

## Functions & types

### Packages

Each bundled package has its own page under [`docs/packages/`](docs/packages/), listing every
utility it provides and how it maps into `unutils` (renames, consolidations, and what was skipped).

| Package                                                                | What we take from it                                                                                                                                                                     |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`es-toolkit`](docs/packages/es-toolkit.md)                            | Broad lodash-style toolkit — the bulk of the `array`, `object`, `function`, `math`, `predicate` and `string` groups (plus `es-toolkit/compat`), lazy `iterable*` helpers and bigint math |
| [`remeda`](docs/packages/remeda.md)                                    | Data-first utilities with strong tuple/literal typing — many `array`/`object` helpers                                                                                                    |
| [`@antfu/utils`](docs/packages/@antfu__utils.md)                       | Small general-purpose helpers (e.g. `ensurePrefix`, `toForwardSlashes`)                                                                                                                  |
| [`arkregex`](docs/packages/arkregex.md)                                | Type-safe `RegExp` that infers the match and captures from a literal pattern                                                                                                             |
| [`@braintree/sanitize-url`](docs/packages/@braintree__sanitize-url.md) | Making untrusted URLs safe for links (`misc/sanitizeUrl`)                                                                                                                                |
| [`clickable-path`](docs/packages/clickable-path.md)                    | Clickable terminal links and their support detection (`server/formatTerminalLink`)                                                                                                       |
| [`decode-uri-component`](docs/packages/decode-uri-component.md)        | URI component decoding that never throws (`string/decodeUriComponentSafe`)                                                                                                               |
| [`dedent`](docs/packages/dedent.md)                                    | Tagged-template / function dedent that handles interpolations                                                                                                                            |
| [`destr`](docs/packages/destr.md)                                      | Forgiving and strict JSON parsing (`jsonParseSafe` / `jsonParse`)                                                                                                                        |
| [`devalue`](docs/packages/devalue.md)                                  | Serialize/revive `Date`/`Map`/`Set`/`BigInt`, circular refs and nested promises (not plain JSON)                                                                                         |
| [`env-paths`](docs/packages/env-paths.md)                              | Standard data, config and cache directories of the OS (`server/getAppPaths`)                                                                                                             |
| [`escape-string-regexp`](docs/packages/escape-string-regexp.md)        | Escaping strings for regular expressions (`regex/regexEscape`)                                                                                                                           |
| [`find-up-simple`](docs/packages/find-up-simple.md)                    | Finding a file or directory in parent directories (`server/findUp`)                                                                                                                      |
| [`http-link-header`](docs/packages/http-link-header.md)                | Parsing the `Link` HTTP header (`http/parseLinkHeader`)                                                                                                                                  |
| [`ipaddr.js`](docs/packages/ipaddr.js.md)                              | IP address validation and ranges — the `net` group / `unutils/net`                                                                                                                       |
| [`leven`](docs/packages/leven.md)                                      | Levenshtein distance and "did you mean" suggestions                                                                                                                                      |
| [`lossless-json`](docs/packages/lossless-json.md)                      | Precision-preserving JSON parse/stringify (`bigint` and decimals)                                                                                                                        |
| [`ms-ts`](docs/packages/ms-ts.md)                                      | Compile-time duration-string → milliseconds conversion (`ms` / `Ms`)                                                                                                                     |
| [`nanoid`](docs/packages/nanoid.md)                                    | Secure, URL-safe unique ID generation — the `id` group / `unutils/id`                                                                                                                    |
| [`negotiator`](docs/packages/negotiator.md)                            | Content encoding negotiation (`http/getPreferredEncoding`)                                                                                                                               |
| [`neotraverse`](docs/packages/neotraverse.md)                          | Recursive visitor traversal of nested values — the `traverse` group / `unutils/traverse`                                                                                                 |
| [`p-memoize`](docs/packages/p-memoize.md)                              | Memoizing async functions without caching rejections (`function/memoizeAsync`)                                                                                                           |
| [`parse-package-name`](docs/packages/parse-package-name.md)            | Splitting npm package specifiers (`misc/parseNpmPackageSpecifier`)                                                                                                                       |
| [`path-type`](docs/packages/path-type.md)                              | Checking whether a path is a file, a directory or a symbolic link                                                                                                                        |
| [`picomatch`](docs/packages/picomatch.md)                              | Glob matching — the `glob` group / `unutils/glob`                                                                                                                                        |
| [`pretty-bytes`](docs/packages/pretty-bytes.md)                        | Human-readable sizes in bytes (`misc/formatBytes`)                                                                                                                                       |
| [`pretty-ms`](docs/packages/pretty-ms.md)                              | Human-readable duration formatting, including the colon notation (`misc/formatDuration`)                                                                                                 |
| [`puka`](docs/packages/puka.md)                                        | Quoting shell arguments for POSIX shells and `cmd.exe` (`server/quoteShellArgument`)                                                                                                     |
| [`range-parser`](docs/packages/range-parser.md)                        | Parsing the `Range` HTTP header (`http/parseRangeHeader`)                                                                                                                                |
| [`safe-stable-stringify`](docs/packages/safe-stable-stringify.md)      | Deterministic, circular-safe `JSON.stringify`                                                                                                                                            |
| [`@sindresorhus/slugify`](docs/packages/@sindresorhus__slugify.md)     | URL slugs (`string/slugify`), with [`@sindresorhus/transliterate`](docs/packages/@sindresorhus__transliterate.md) and [`any-ascii`](docs/packages/any-ascii.md) for any script           |
| [`split-string`](docs/packages/split-string.md)                        | Splitting outside quotes and brackets (`string/splitOutsideQuotes`)                                                                                                                      |
| [`string-ts`](docs/packages/string-ts.md)                              | Type-level-aware string helpers — literal-preserving case conversion, native-method wrappers and object-key transforms                                                                   |
| [`string-width`](docs/packages/string-width.md)                        | Terminal column width of a string (`string/getStringWidth`)                                                                                                                              |
| [`strip-ansi`](docs/packages/strip-ansi.md)                            | Removing ANSI escape codes (`string/stripAnsi`)                                                                                                                                          |
| [`@thi.ng/binary`](docs/packages/@thi.ng__binary.md)                   | Bit manipulation of 32-bit integers: most of the `bitwise` group / `unutils/bitwise`                                                                                                     |
| [`toposort`](docs/packages/toposort.md)                                | Topological sorting (`array/topologicalSort`)                                                                                                                                            |
| [`ts-extras`](docs/packages/ts-extras.md)                              | Thin, strongly-typed wrappers over native methods                                                                                                                                        |
| [`@tusbar/cache-control`](docs/packages/@tusbar__cache-control.md)     | Parsing and formatting the `Cache-Control` HTTP header                                                                                                                                   |
| [`type-fest`](docs/packages/type-fest.md)                              | Type-only utility types (the `types` group / `unutils/types`)                                                                                                                            |
| [`typed-query-selector`](docs/packages/typed-query-selector.md)        | Infers the element type from a CSS selector literal — the `dom` group / `unutils/dom`                                                                                                    |
| [`uint8array-extras`](docs/packages/uint8array-extras.md)              | `Uint8Array` conversions, Base64 and hex — the `bytes` group / `unutils/bytes`                                                                                                           |
| [`verkit`](docs/packages/verkit.md)                                    | Semantic versions and npm-style ranges — the `semver` group / `unutils/semver`                                                                                                           |
| [`which`](docs/packages/which.md)                                      | Finding an executable in `PATH` (`server/findExecutable`)                                                                                                                                |
| [`wrap-ansi`](docs/packages/wrap-ansi.md)                              | Wrapping styled text to a width (`string/wrapText`)                                                                                                                                      |
| [`write-json-file`](docs/packages/write-json-file.md)                  | Atomic JSON file writing that keeps the indentation (`server/writeJsonFile`)                                                                                                             |
| [`yieldable-json`](docs/packages/yieldable-json.md)                    | Non-blocking async JSON parse/stringify                                                                                                                                                  |
| [`yn`](docs/packages/yn.md)                                            | Parsing yes/no-like values (`misc/parseBoolean`)                                                                                                                                         |

<details>
<summary>Under consideration</summary>

Candidate libraries on the radar.
These cover JSON *manipulation* axes (repair, partial parsing, diff, pointer/patch) not yet provided — adding them would expand `unutils` beyond parsing and serialization.

| Library                                             | Axis                            | Status | Notes                                                                                            |
| --------------------------------------------------- | ------------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| [`jsonrepair`][jsonrepair]                          | Repair malformed JSON           | 🚧     | Fixes unquoted keys, trailing commas, comments, fenced blocks, etc.; complements `jsonParseSafe` |
| [`partial-json`][partial-json]                      | Parse incomplete/truncated JSON | 🚧     | Best-effort value from a partial buffer (e.g. streaming LLM output); configurable `Allow` mask   |
| [`jsondiffpatch`][jsondiffpatch]                    | Document diff/patch             | 🚧     | `diff`/`patch`/`unpatch`/`reverse` with array-move detection; core has no runtime dependency     |
| [`@hyperjump/json-pointer`][hyperjump-json-pointer] | JSON Pointer (RFC 6901)         | 🚧     | Get/set/remove a value by `/a/b/0` path                                                          |
| [`immutable-json-patch`][immutable-json-patch]      | JSON Patch (RFC 6902)           | 🚧     | Immutable apply/compare/revert; pairs with JSON Pointer                                          |
| JSON Merge Patch (RFC 7386)                         | Merge patch                     | 🚧     | No well-maintained typed library exists; a custom implementation would be the likely route       |

> JSONPath (querying) was considered and **set aside**: the dominant `jsonpath-plus` has a history of RCE advisories, and the axis is broad/lower-demand.
> Relaxed syntax (JSON5/JSONC), canonical/RFC 8785 output, and `bigint`-safe stringify are already covered by existing entries or native features.

</details>

### Custom functions

| Our function group and name           | Notes                                                                                                                                                                                                                   |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `array/arrayAt`                       | Consolidates `ts-extras`' `arrayAt` (precise tuple typing for literal indices) with es-toolkit's `at` (also accepts a list of indices)                                                                                  |
| `array/arrayChunks`                   | Consolidates fixed-size `chunk` with a by-key variant; pass an iteratee to group runs of consecutive same-key elements, or an array of sizes for one chunk per size (`Infinity` collects the rest)                      |
| `array/arrayDifference`               | Consolidates `difference`/`differenceBy`/`differenceWith`; optional mapper or comparator                                                                                                                                |
| `array/arrayDrop`                     | Consolidates `drop`/`dropWhile`; pass a predicate to drop while it holds                                                                                                                                                |
| `array/arrayDropFirstBy`              | Drops the `count` "smallest" elements by one or more `OrderRule`s (via `remeda`'s `dropFirstBy`), O(n) without sorting; kept elements keep their order                                                                  |
| `array/arrayDropRight`                | Consolidates `dropRight`/`dropRightWhile`; pass a predicate to drop while it holds                                                                                                                                      |
| `array/arrayFill`                     | Consolidates `fill`/`toFilled`; pass `{copy: true}` to return a new array                                                                                                                                               |
| `array/arrayFilter`                   | Tuple-aware `Array#filter` (via `remeda`); a tuple + (inferred) type guard yields the refined tuple (`[1, 2, 3]` filtered by `!== 2` → `[1, 3]`) not `(1 \| 3)[]`                                                       |
| `array/arrayFindDuplicates`           | Elements repeating an earlier one, one per repeated value; optional mapper or comparator; `{limit}` stops the search early                                                                                              |
| `array/arrayFirstBy`                  | First element by one or more `OrderRule`s (via `remeda`'s `firstBy`), O(n) without sorting; min/max + tie-breakers; non-empty tuples never give `undefined`                                                             |
| `array/arrayHasMaxElements`           | Type-guard: a literal maximum narrows to `ArrayWithMaxLength` (every length still possible, `never` if none is); non-literal returns a plain `boolean`                                                                  |
| `array/arrayHasMinElements`           | Type-guard (via `remeda`'s `hasAtLeast`): a literal minimum narrows to a known-minimum tuple; non-literal returns a plain `boolean`                                                                                     |
| `array/arrayify`                      | Wraps non-arrays (tuple-preserving); nullish input returns `[]` (or `[value]` with `wrapNullish`)                                                                                                                       |
| `array/arrayIntersection`             | Consolidates `intersection`/`intersectionBy`/`intersectionWith`; optional mapper or comparator                                                                                                                          |
| `array/arrayIsSubset`                 | Consolidates `isSubset`/`isSubsetWith`; optional mapper or comparator                                                                                                                                                   |
| `array/arrayIsUnique`                 | Whether no element repeats, stopping at the first repeat; optional mapper or comparator; can be passed directly as a callback (`.filter(arrayIsUnique)`)                                                                |
| `array/arrayMap`                      | Tuple-preserving `Array#map` (via `remeda`); a fixed-length tuple maps to a same-length tuple instead of widening to `U[]`                                                                                              |
| `array/arrayMapWithAccumulator`       | Prefix scan (via `remeda`'s `mapWithFeedback`): threads an accumulator, returning every intermediate state (same length, tuple-preserving)                                                                              |
| `array/arrayNthBy`                    | Element at the `index`-th position in the order defined by `OrderRule`s (via `remeda`'s `nthBy`), O(n) without sorting; out-of-bounds → `undefined`                                                                     |
| `array/arrayPartition`                | Single predicate gives a binary `[matched, unmatched]` (guard-narrowing); multiple predicates give an n-way partition                                                                                                   |
| `array/arrayPurgeValues`              | Consolidates `pull`/`pullAllBy`/`pullAllWith`; mutating; optional mapper or comparator                                                                                                                                  |
| `array/arrayRankBy`                   | Rank an item would have by one or more `OrderRule`s — count of elements sorting before it (via `remeda`'s `rankBy`), O(n); item need not be present                                                                     |
| `array/arrayReverse`                  | Tuple-preserving reverse (via `remeda` + type-fest's `ArrayReverse`); a fixed-length tuple reverses to a same-length tuple instead of widening to a union array                                                         |
| `array/arraySample`                   | Consolidates `sample`/`sampleSize` (our own code of the same algorithms); pass a size for multiple elements, `{withReplacement: true}` to allow repeats, `{random}` for another generator                               |
| `array/arrayShuffle`                  | Fisher–Yates shuffle into a new array; `{random}` takes another generator, like a seeded one from `createSeededRandom`                                                                                                  |
| `array/arraySort`                     | Length-preserving non-mutating sort by comparator (via `remeda`); a fixed-length tuple keeps its length (slots widen to the element union)                                                                              |
| `array/arraySplit`                    | Consolidates remeda's `splitAt`/`splitWhen` into `[before, after]`; pass a predicate to split at the first match; tuple-preserving for literal indices                                                                  |
| `array/arraySwapIndexes`              | Swaps the elements at two indices (tuple-preserving via `remeda`); negative indices count from the end; out-of-bounds/`NaN` returns an unchanged copy                                                                   |
| `array/arraySymmetricDifference`      | Consolidates `xor`/`xorBy`/`xorWith`; renamed to the set-theory term                                                                                                                                                    |
| `array/arrayTakeFirstBy`              | The `count` "smallest" elements by one or more `OrderRule`s (via `remeda`'s `takeFirstBy`), O(n) without sorting                                                                                                        |
| `array/arrayTakeWhile`                | Consolidates `takeWhile`/`takeRightWhile`; pass `true` to walk from the end                                                                                                                                             |
| `array/arrayToggle`                   | Adds a missing value or removes every occurrence of a present one, like `classList.toggle`; `shouldInclude` (its `force`) only adds (`true`) or only removes (`false`); mutating unless `{copy: true}`                  |
| `array/arrayTranspose`                | Consolidates `zip`/`unzip`/`zipWith`/`unzipWith`; optional `(...column) => value` iteratee                                                                                                                              |
| `array/arrayUnion`                    | Consolidates `union`/`unionBy`/`unionWith`; optional mapper or comparator                                                                                                                                               |
| `array/arrayUnique`                   | Consolidates `uniq`/`uniqBy`/`uniqWith`; optional mapper or comparator                                                                                                                                                  |
| `array/flatMap`                       | Defaults to deep flattening; pass a finite `depth` for a specific level                                                                                                                                                 |
| `array/flatten`                       | Defaults to deep flattening; pass a finite `depth` for a specific level                                                                                                                                                 |
| `array/maxBy`                         | Element with the largest `getValue` result; the result may be a number or a bigint                                                                                                                                      |
| `array/minBy`                         | Element with the smallest `getValue` result; the result may be a number or a bigint                                                                                                                                     |
| `array/sortedArrayIndexOf`            | Binary search for an existing value in a sorted array; returns its index or `-1`; `{rightmost?}`                                                                                                                        |
| `array/sortedArrayInsertionIndex`     | Binary-search insertion point into a sorted array; `{iteratee?, rightmost?}`                                                                                                                                            |
| `array/sortedArrayInsertionIndexWith` | Binary-search insertion index via a monotonic `predicate` (via `remeda`'s `sortedIndexWith`); any comparable condition, not just `number`/`string` keys                                                                 |
| `array/topologicalSort`               | Orders nodes after their dependencies (via `toposort`), given a `getDependencies` function; missing dependencies are added; `CyclicDependencyError` lists the cycle                                                     |
| `async/createSingletonPromise`        | Runs an async function once and shares its promise; a rejection is retried on the next call unless `{cacheRejections: true}`; `ttl` refreshes the value; `reset()`                                                      |
| `async/promiseTry`                    | Like `Promise.try`: calls a function and always gives a promise, turning a synchronous throw into a rejection                                                                                                           |
| `async/sleepAbortable`                | Like `sleep`, but `{signal}` stops it with the abort reason; `{unref: true}` doesn't keep the Node.js process alive                                                                                                     |
| `async/withAbortSignal`               | Makes a promise reject with the reason of an `AbortSignal` as soon as it is aborted                                                                                                                                     |
| `async/withTimeout`                   | Runs an async function with a time limit, rejecting with a `TimeoutError`; the function gets an `AbortSignal` aborted on timeout; `{signal}` stops it earlier                                                           |
| `bitwise/indexesOfSetBits`            | Indexes of the `1` bits of a 32-bit integer, in ascending order, typed as `BitIndex` so they can be passed to the other bit utilities                                                                                   |
| `bitwise/isBitIndex`                  | Type guard for `BitIndex`; narrows a dynamic number (a loop counter, a parsed value) before passing it to the bit utilities                                                                                             |
| `bitwise/isBitSet`                    | Whether a bit of a 32-bit integer is `1`                                                                                                                                                                                |
| `bitwise/setBit`                      | Consolidates `@thi.ng/binary`'s `bitSet`/`bitClear`: pass `false` as the third argument to set the bit to `0`                                                                                                           |
| `dom/closestTyped`                    | Typed `closest`; the matched ancestor's type is inferred from the selector literal                                                                                                                                      |
| `dom/querySelectorAllTyped`           | Typed `querySelectorAll` returning a real array instead of a `NodeList`; optional search root                                                                                                                           |
| `dom/querySelectorTyped`              | Typed `querySelector`; optional search root defaulting to `document`; `.as<T>()` for custom elements                                                                                                                    |
| `function/callAll`                    | Combines functions into one calling them all with the same arguments; skips falsy values, like the result of `condition && fn`                                                                                          |
| `function/curry`                      | Consolidates `curry`/`curryRight`; pass `true` to collect arguments right-to-left                                                                                                                                       |
| `function/flow`                       | Consolidates `flow`/`flowRight`; functions as an array; pass `true` for right-to-left                                                                                                                                   |
| `function/flowAsync`                  | Async `flow` (from `es-toolkit/fp`): each function gets the awaited result of the previous one; functions as an array; pass `true` for right-to-left                                                                    |
| `function/mapTimes`                   | Renamed `times`; iteratee required; clearer than `Array.from({length}, ...)`                                                                                                                                            |
| `function/maybeCall`                  | Resolves a `MaybeFn` (value or getter); calls it with forwarded args when it is a function, else returns it as-is                                                                                                       |
| `function/partial`                    | Consolidates `partial`/`partialRight`; args as an array; pass `true` to pre-apply trailing                                                                                                                              |
| `function/toDisposable`               | Consolidates `defer`/`deferAsync`: wraps a cleanup callback for `using`/`await using`; an async callback gives an `AsyncDisposable` only                                                                                |
| `glob/createPathFilter`               | Filter function from `include` and `exclude` patterns: globs (via `picomatch`) or regular expressions                                                                                                                   |
| `http/parseRetryAfter`                | Parses the `Retry-After` header (seconds or an HTTP date) into milliseconds                                                                                                                                             |
| `iterable/countBy`                    | -                                                                                                                                                                                                                       |
| `iterable/every`                      | Generalized from `set/every`; simple `(value) => boolean` callback                                                                                                                                                      |
| `iterable/find`                       | Generalized from `set/find`; simple `(value) => boolean` callback                                                                                                                                                       |
| `iterable/forEach`                    | Generalized from `set/forEach`; simple `(value) => void` callback                                                                                                                                                       |
| `iterable/iterableCartesianProduct`   | Lazy Cartesian product of any iterables; the first one may be infinite                                                                                                                                                  |
| `iterable/iterableChunks`             | Lazy fixed-size chunks of any iterable                                                                                                                                                                                  |
| `iterable/iterableCount`              | Counts the elements of any iterable                                                                                                                                                                                     |
| `iterable/iterableDropWhile`          | Lazy `dropWhile` over any iterable                                                                                                                                                                                      |
| `iterable/iterableFirst`              | First element of any iterable (renamed `head`); closes the iterator                                                                                                                                                     |
| `iterable/iterablePartition`          | `[matched, unmatched]` split of any iterable; a type guard narrows both arrays                                                                                                                                          |
| `iterable/iterableScan`               | Lazy running accumulation (prefix scan) of any iterable                                                                                                                                                                 |
| `iterable/iterableTakeWhile`          | Lazy `takeWhile` over any iterable                                                                                                                                                                                      |
| `iterable/iterableTranspose`          | Lazy `zip` of an array of iterables; stops at the shortest one                                                                                                                                                          |
| `iterable/iterableUnique`             | Lazy `uniqBy` over any iterable; the mapper is optional                                                                                                                                                                 |
| `iterable/keyedBy`                    | -                                                                                                                                                                                                                       |
| `iterable/reduce`                     | Generalized from `set/reduce`; simple `(acc, value) => acc` callback                                                                                                                                                    |
| `iterable/slidingWindow`              | -                                                                                                                                                                                                                       |
| `iterable/some`                       | Generalized from `set/some`; simple `(value) => boolean` callback                                                                                                                                                       |
| `json/jsonParse`                      | Strict, throwing `JSON.parse` upgrade; decodes standalone tokens; blocks prototype pollution                                                                                                                            |
| `json/jsonParseAsync`                 | Promisified non-blocking `JSON.parse` (yields to the event loop); `yieldable-json` wrapper                                                                                                                              |
| `json/jsonParseSafe`                  | Forgiving parse that never throws; falls back to the original input when it cannot be parsed                                                                                                                            |
| `json/jsonStringifyAsync`             | Promisified non-blocking `JSON.stringify` (yields to the event loop); `yieldable-json` wrapper                                                                                                                          |
| `json/structuredParse`                | Consolidates `devalue`'s `parse`/`unflatten`; accepts the serialized string or its already-`JSON.parse`d form                                                                                                           |
| `map/mapGetOrInsert`                  | Reads `key`, inserting `defaultValue` first when it is missing; the return is non-optional, so `mapGetOrInsert(map, key, []).push(item)` is a one-liner. Mirrors the native `Map#getOrInsert`, not yet widely available |
| `map/mapGetOrInsertComputed`          | Lazy counterpart: the factory receives `key` and runs only on a miss, so every missing key gets a freshly built default. Mirrors the native `Map#getOrInsertComputed`                                                   |
| `math/bigintMedian`                   | Consolidates bigint `median`/`medianBy`; accepts any iterable; throws for an empty input                                                                                                                                |
| `math/bigintSum`                      | Consolidates bigint `sum`/`sumBy`; accepts any iterable (single-pass); `0n` for an empty input                                                                                                                          |
| `math/clamp`                          | Number and bigint overloads                                                                                                                                                                                             |
| `math/createSeededRandom`             | Seeded `Math.random` replacement (Mulberry32) from a number or a string seed, for reproducible results                                                                                                                  |
| `math/findClosestNumber`              | Value closest to a target number; the earlier one on a tie                                                                                                                                                              |
| `math/interpolate`                    | Renamed `lerp`; `(min, max, t, clamp = false)`; extrapolates unless `clamp` is `true`                                                                                                                                   |
| `math/isInRange`                      | Renamed `inRange`; number and bigint overloads                                                                                                                                                                          |
| `math/mapRange`                       | Renamed `remap`; `(value, inputRange, outputRange, clamp = false)`; affine range remap, extrapolates unless `clamp`                                                                                                     |
| `math/max`                            | Single-pass over any iterable of numbers and/or bigints; returns `undefined` for an empty input                                                                                                                         |
| `math/mean`                           | Generalized to any iterable (single-pass); optional `(item) => number` selector                                                                                                                                         |
| `math/median`                         | Generalized to any iterable (materialized + sorted); optional `(item) => number` selector                                                                                                                               |
| `math/min`                            | Single-pass over any iterable of numbers and/or bigints; returns `undefined` for an empty input                                                                                                                         |
| `math/random`                         | Random number in `[minimum, maximum)`; `{random}` takes another generator                                                                                                                                               |
| `math/randomIntExclusive`             | Random integer in `[minimum, maximum)`; precise literal union for small literal ranges; `{random}` takes another generator                                                                                              |
| `math/randomIntInclusive`             | Random integer in `[minimum, maximum]`; precise literal union for small literal ranges; `{random}` takes another generator                                                                                              |
| `math/range`                          | Number and bigint overloads                                                                                                                                                                                             |
| `math/rangeRight`                     | Number and bigint overloads                                                                                                                                                                                             |
| `math/sum`                            | Generalized to any iterable (single-pass); optional `(item, index) => number` selector                                                                                                                                  |
| `misc/formatRelativeTime`             | Relative time in any language via `Intl.RelativeTimeFormat` (`3 days ago`, `in 2 hours`, `yesterday`), with the largest fitting unit                                                                                    |
| `misc/generateMailtoLink`             | Builds a percent-encoded `mailto:` link; recipients in the path by default (`{recipientsAsQueryParam}` for a `to` query param), `cc`/`bcc`/`subject`/`body` as params                                                   |
| `misc/getErrorMessage`                | Message of a caught value of any type: an error's (or error-like object's) `message`, a string as is, other primitives as strings, otherwise a fallback; `{includeCode}` appends the error code                         |
| `misc/interopDefault`                 | Resolves a module or a promise of it (like a dynamic `import()`) to its default export when it has one (not `null` or `undefined`), otherwise to the module itself                                                      |
| `misc/parseColonDuration`             | Parses `m:ss`, `h:mm:ss` or `d:hh:mm:ss` (optionally negative, with fractional seconds) into milliseconds; `undefined` for invalid input. Reverses `formatDuration` with `{colonNotation: true}`                        |
| `misc/redactUrlCredentials`           | Replaces the credentials of a URL with `***`, for logs                                                                                                                                                                  |
| `net/isLocalhost`                     | Whether a host name points to the local machine: `localhost`, its subdomains or a loopback IP (also in square brackets)                                                                                                 |
| `object/assignDefaults`               | Consolidates `defaults`/`defaultsDeep`/`toDefaulted`; single source or array, `{deep, copy}` modes                                                                                                                      |
| `object/findObjectKey`                | Consolidates `findKey`/`findLastKey`; pass `true` to scan from the end                                                                                                                                                  |
| `object/hasPath`                      | Deep-path existence check; pass `{inherited: true}` to include the prototype chain                                                                                                                                      |
| `object/mapObjectValuesByKey`         | Transforms each value by a per-key function (via `remeda`'s `evolve`); untouched keys are kept, result stays precisely typed                                                                                            |
| `object/mergeDeep`                    | Consolidates `merge`/`mergeWith`/`toMerged`; optional `mergeValues` customizer and `{copy}` mode; precise merged type without a customizer                                                                              |
| `object/mergeObjects`                 | Shallow-merges a non-empty object array into one (via `remeda`'s `mergeAll`); precise positional merge type                                                                                                             |
| `object/objectFromEntriesDeep`        | Deep-path `Object.fromEntries`; builds nested objects/arrays from `[path, value]` entries                                                                                                                               |
| `object/objectFromKeys`               | Builds an object from an array of keys via a mapper (via `remeda`'s `fromKeys`); literal keys yield a precisely-typed record                                                                                            |
| `object/objectUpsertProperty`         | Returns a copy with one property inserted-or-overwritten, precisely typed (via `remeda`'s `addProp`)                                                                                                                    |
| `object/omit`                         | Consolidates `omit`/`omitBy`; top-level keys, deep paths, or a predicate; a `*` path segment matches every array element or object property (`users.*.password`); never mutates the input                               |
| `object/pick`                         | Consolidates `pick`/`pickBy`; top-level keys, deep paths, or a predicate                                                                                                                                                |
| `object/setByPath`                    | Consolidates `set`/`setWith`; mutating deep-path write with optional container customizer                                                                                                                               |
| `object/setByPathImmutable`           | Immutable, statically-typed deep set (via `remeda`'s `setPath`); path & value type-checked against the object, no container creation                                                                                    |
| `object/swapObjectKeysValues`         | Consolidates `invert`/`invertBy`; pass an iteratee to group colliding keys into arrays                                                                                                                                  |
| `object/swapObjectProperties`         | Swaps the values (and types) of two properties (via `remeda`'s `swapProps`); object analog of `arraySwapIndexes`                                                                                                        |
| `object/toPathSegments`               | Parses a path string into segments (via `remeda`'s `stringToPath`); a literal string yields a precisely-typed tuple, numeric segments as numbers                                                                        |
| `object/updateByPath`                 | Consolidates `update`/`updateWith`; mutating deep-path update with optional container customizer                                                                                                                        |
| `path/isSafeRelativePath`             | Whether a path is relative and never leaves its base directory (`..`, absolute, drive and UNC paths are rejected)                                                                                                       |
| `path/parseNodeModulesPath`           | Splits a path inside `node_modules` into the directory, the package name and the subpath (innermost package for nested ones)                                                                                            |
| `predicate/isAbortError`              | Whether a caught value is an error named `AbortError`                                                                                                                                                                   |
| `predicate/isBuffer`                  | Enhanced with a `value is Buffer` type guard                                                                                                                                                                            |
| `predicate/isIn`                      | `ts-extras`' `objectHasIn` with `(key, object)` argument order (reads like `key in object`); narrows the object                                                                                                         |
| `predicate/isKeyIn`                   | `ts-extras`' `keyIn` with `(key, object)` argument order; narrows the key to those present in the object                                                                                                                |
| `predicate/isPromiseLike`             | Whether a value has a `then` method, like promises from any realm or library                                                                                                                                            |
| `predicate/isTimeoutError`            | Whether a caught value is an error named `TimeoutError`                                                                                                                                                                 |
| `predicate/isTruthy`                  | Truthy type guard whose narrowing subtracts the falsy members (unlike `.filter(Boolean)`, which keeps the type)                                                                                                         |
| `predicate/isUnsafeObjectKey`         | Whether a key can be used for prototype pollution: `__proto__`, `constructor` or `prototype`                                                                                                                            |
| `predicate/isValidDate`               | Whether a value is a `Date` holding a valid time                                                                                                                                                                        |
| `server/colors`                       | es-toolkit's terminal styles that return plain text when colors are not supported (see `server/isColorSupported`)                                                                                                       |
| `server/isColorSupported`             | Whether to color output: `FORCE_COLOR` first, then a terminal that supports colors (respects `NO_COLOR`, `TERM=dumb`)                                                                                                   |
| `server/isNodeError`                  | Whether a caught value is a Node.js system error, optionally with one of the given codes; narrows to `NodeJS.ErrnoException`                                                                                            |
| `server/isPathInside`                 | Whether a path is inside another one (via `path.relative`); not inside itself; handles `..name` entries and other Windows drive                                                                                         |
| `server/isProcessAlive`               | Whether a process with the given ID is running (`EPERM` counts as running)                                                                                                                                              |
| `server/pathExists`                   | Whether a file or directory exists; `false` for a missing path (`ENOENT`, `ENOTDIR`), other errors are rethrown                                                                                                         |
| `server/pathExistsSync`               | Synchronous `pathExists`; unlike `fs.existsSync`, rethrows errors other than a missing path                                                                                                                             |
| `server/readFileSafe`                 | Reads a file, returning `null` on a missing file (`ENOENT`) but rethrowing other errors; `asBinary` for a raw `Buffer`                                                                                                  |
| `server/readFilesInDirectorySafe`     | Reads the files of a directory as `{path, relativePath, contents}`, sorted by path; `null` for a missing directory; `{recursive, extensions, filter, asBinary}`; skips symbolic links                                   |
| `server/readJsonFileSafe`             | Reads and strictly parses a JSON file (like `jsonParse`), ignoring a byte order mark; `null` for a missing file; parse errors include the file path                                                                     |
| `string/createUniqueSlugify`          | `slugify` that never repeats a slug (`foo`, `foo-2`, ...); `reset()`                                                                                                                                                    |
| `string/ensurePrefix`                 | `(value, prefix)` (subject-first); prepends `prefix` only when missing                                                                                                                                                  |
| `string/ensureSuffix`                 | `(value, suffix)` (subject-first); appends `suffix` only when missing                                                                                                                                                   |
| `string/slugify`                      | URL slugs from text in any script, always ASCII: transliteration via `@sindresorhus/slugify`, the rest via `any-ascii`                                                                                                  |
| `string/stringByteLength`             | UTF-8 byte length of a string without encoding it                                                                                                                                                                       |
| `string/stringReverse`                | Reverses a string by grapheme (via es-toolkit's `reverseString`, so emoji stay intact); literal inputs get the precise reversed type                                                                                    |
| `string/substringAfter`               | Part after the first delimiter, or a fallback (the whole string by default)                                                                                                                                             |
| `string/substringAfterLast`           | Part after the last delimiter, or a fallback (the whole string by default)                                                                                                                                              |
| `string/substringBefore`              | Part before the first delimiter, or a fallback (the whole string by default)                                                                                                                                            |
| `string/substringBeforeLast`          | Part before the last delimiter, or a fallback (the whole string by default)                                                                                                                                             |
| `string/toCamelCase`                  | camelCase; es-toolkit runtime (Unicode-aware) + `string-ts` literal type. Renamed from es-toolkit's `camelCase`                                                                                                         |
| `string/toConstantCase`               | CONSTANT_CASE; es-toolkit runtime + `string-ts` literal type                                                                                                                                                            |
| `string/toDelimiterCase`              | Joins words with a delimiter, preserving case (via es-toolkit's `words`); literal inputs get the precise type                                                                                                           |
| `string/toKebabCase`                  | kebab-case; es-toolkit runtime + `string-ts` literal type                                                                                                                                                               |
| `string/toLowerCase`                  | Space-joined lower-case words; es-toolkit runtime + `string-ts` literal type                                                                                                                                            |
| `string/toPascalCase`                 | PascalCase; es-toolkit runtime + `string-ts` literal type                                                                                                                                                               |
| `string/toSnakeCase`                  | snake_case; es-toolkit runtime + `string-ts` literal type                                                                                                                                                               |
| `string/toTitleCase`                  | Title-cases a string (via `remeda`'s `toTitleCase`); literal inputs get the precise title-cased type; preserves consecutive capitals by default. Replaces `toStartCase`                                                 |
| `string/toUpperCase`                  | Space-joined UPPER-CASE words; es-toolkit runtime + `string-ts` literal type                                                                                                                                            |
| `string/toWords`                      | Splits a string into words (via es-toolkit); literal inputs get the precise word tuple                                                                                                                                  |
| `string/truncate`                     | es-toolkit's `truncate` plus `position: 'start'                                                                                                                                                                         |
| `string/unquote`                      | Removes one pair of matching quotes around a string                                                                                                                                                                     |
| `ts/allUnionMembers`                  | Compile-time guard that a tuple lists every member of a union exactly once (no missing, extra or duplicate); `{readonly}` keeps the tuple readonly                                                                      |
| `value/cloneDeep`                     | Consolidates `cloneDeep`/`cloneDeepWith`; optional customizer                                                                                                                                                           |
| `value/cloneShallow`                  | Consolidates `clone`/`cloneWith`; optional customizer                                                                                                                                                                   |
| `value/isEqual`                       | Consolidates `isEqual`/`isEqualWith`; optional customizer                                                                                                                                                               |
| `value/isObjectMatching`              | Consolidates `isMatch`/`isMatchWith`; deep partial match; optional customizer                                                                                                                                           |
| `value/typeOf`                        | Enhanced `typeof`: lowercase for primitives and `null`, the `Symbol.toStringTag` class tag for objects (`Array`, `Date`, …)                                                                                             |

### Custom types

| Our type group and name    | Notes                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `bitwise/BitIndex`         | Integer from `0` to `31`, the index of a bit in a 32-bit integer; the bit utilities accept only it, so out-of-range literals and enum members fail at compile time |
| `types/ArrayWithMaxLength` | Union of every shape an array can take with at most N elements, keeping per-position types; impossible shapes drop out (`never` if all do)                         |
| `types/Falsy`              | Union of the literal-representable falsy values (`false`, `0`, `0n`, `''`, `null`, `undefined`); `NaN` excluded (no literal type)                                  |
| `types/MaybeReadonlyArray` | A value or a readonly array of it (`T \| readonly T[]`); unlike `MaybeArray`, accepts `as const` arrays                                                            |
| `types/Truthy`             | Complement of `Falsy`: removes the literal falsy members from a type (`Truthy<0 \| 1>` is `1`)                                                                     |

## License

MIT (See [`LICENSE`](./LICENSE) file for the full license text).

Bundled packages are licensed under their own terms — see [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

## Contributors

<!-- eslint-disable markdown-preferences/padding-line-between-blocks, markdown/require-alt-text -->
<!-- cspell:disable -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/andreww2012"><img src="https://avatars.githubusercontent.com/u/6554045?v=4?s=70" width="70px;" alt="Andrew Kazakov"/><br /><sub><b>Andrew Kazakov</b></sub></a><br /><a href="https://github.com/andreww2012/unutils/commits?author=andreww2012" title="Code">💻</a> <a href="https://github.com/andreww2012/unutils/commits?author=andreww2012" title="Documentation">📖</a> <a href="#infra-andreww2012" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-andreww2012" title="Maintenance">🚧</a> <a href="#tool-andreww2012" title="Tools">🔧</a> <a href="https://github.com/andreww2012/unutils/commits?author=andreww2012" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

[jsonrepair]: https://npmx.dev/jsonrepair

[partial-json]: https://npmx.dev/partial-json

[jsondiffpatch]: https://npmx.dev/jsondiffpatch

[hyperjump-json-pointer]: https://npmx.dev/@hyperjump/json-pointer

[immutable-json-patch]: https://npmx.dev/immutable-json-patch

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- eslint-enable markdown-preferences/padding-line-between-blocks, markdown/require-alt-text -->
