# utilery

## 0.3.0

### Minor Changes

- [`2ffeb62`](https://github.com/andreww2012/utilery/commit/2ffeb62e472208630d3420ee8e7dbd66d7c33201) - Added new `pathExists`, `readJsonFileSafe` and `readFilesInDirectorySafe` server utilities: check whether a path exists, and read a JSON file or all files of a directory, getting `null` when it does not exist

- [`07e9ad8`](https://github.com/andreww2012/utilery/commit/07e9ad8938dce00f37a850d6d2f66f96314f93b5) - Added new string utilities:
  
  - `levenshteinDistance` and `findClosestString` ([`leven`](https://github.com/sindresorhus/leven#api) and [`closestMatch`](https://github.com/sindresorhus/leven#api) from [`leven`](https://npmx.dev/leven))
  - `substringBefore`, `substringAfter`, `substringBeforeLast` and `substringAfterLast`
  - `unquote` and `stringByteLength`
  - `decodeUriComponentSafe` ([`decodeUriComponent`](https://github.com/SamVerschueren/decode-uri-component#usage) from [`decode-uri-component`](https://npmx.dev/decode-uri-component)) and `splitOutsideQuotes` ([`split`](https://github.com/jonschlinkert/split-string#usage) from [`split-string`](https://npmx.dev/split-string))

- [`02db2b7`](https://github.com/andreww2012/utilery/commit/02db2b7d48c79d6cee26c8e8f7d5d2a43072b16e) - Added new `findExecutable` and `findExecutableSync` utilities ([`which`](https://github.com/npm/node-which#usage) from [`which`](https://npmx.dev/which), giving `undefined` instead of throwing), a new `quoteShellArgument` utility ([`quoteForShell`](https://gitlab.com/rhendric/puka#quoteforshell) from [`puka`](https://npmx.dev/puka)) and a new `isProcessAlive` utility

- [`1d699b1`](https://github.com/andreww2012/utilery/commit/1d699b1b5a1e0092edaeb99e01fec47aaa4da594) - `colors` returns plain text when colors are not supported (output that is not a terminal, `NO_COLOR`, `FORCE_COLOR=0`), and a new `isColorSupported` utility tells whether they are

- [`5c043e8`](https://github.com/andreww2012/utilery/commit/5c043e8455dd79c643c6fb5eb6d4ce35d4221b39) - Added a new `semver` group for semantic versions: `compareSemver`, `isSemverInRange`, `isValidSemver` and `parseSemver` ([`compare`][docs], [`satisfies`][docs], [`isValid`][docs] and [`tryParse`][docs] from [`verkit`](https://npmx.dev/verkit)), and the `ParsedSemver` type
  
  [docs]: https://npmx.dev/package-docs/verkit

- [`14f9bbc`](https://github.com/andreww2012/utilery/commit/14f9bbce3ebe4aa0485ae0c224bb38e7357e1751) - Added a new `bitwise` group for bit flags and other bit manipulation of 32-bit integers. Bit indexes are typed as `BitIndex` (an integer from 0 to 31), so out-of-range literals and enum members fail at compile time, and `isBitIndex` checks dynamic numbers:
  
  - `BitIndex`, `isBitIndex`, `isBitSet` and `indexesOfSetBits`
  - from [`@thi.ng/binary`](https://npmx.dev/@thi.ng/binary):
    - `setBit` ([`bitSet`](https://docs.thi.ng/umbrella/binary/functions/bitSet.html), or [`bitClear`](https://docs.thi.ng/umbrella/binary/functions/bitClear.html) when `false` is passed)
    - `clearBit` ([`bitClear`](https://docs.thi.ng/umbrella/binary/functions/bitClear.html))
    - `toggleBit` ([`bitFlip`](https://docs.thi.ng/umbrella/binary/functions/bitFlip.html))
    - `countSetBits` ([`popCount`](https://docs.thi.ng/umbrella/binary/variables/popCount.html))
    - `countTrailingZeroBits` ([`ctz32`](https://docs.thi.ng/umbrella/binary/variables/ctz32.html))
    - `rotateBitsLeft` ([`rotateLeft`](https://docs.thi.ng/umbrella/binary/functions/rotateLeft.html)) and `rotateBitsRight` ([`rotateRight`](https://docs.thi.ng/umbrella/binary/functions/rotateRight.html))
    - `toInt32` ([`u32i32`](https://docs.thi.ng/umbrella/binary/variables/u32i32.html)) and `toUint32` ([`i32u32`](https://docs.thi.ng/umbrella/binary/variables/i32u32.html))

- [`54f7fff`](https://github.com/andreww2012/utilery/commit/54f7fff6e90815ac8d8f3fe474a151d5921b5025) - Added a new `createSeededRandom` utility: a seeded `Math.random` replacement from a number or a string seed, for reproducible results

- [`9db3b5c`](https://github.com/andreww2012/utilery/commit/9db3b5c141c39f074f62c7325815069a197f9b2b) - Added a new `glob` group: `globToRegex`, `isGlobMatch` and `isGlobPattern` ([`makeRe`](https://github.com/micromatch/picomatch#makere), [`isMatch`](https://github.com/micromatch/picomatch#ismatch) and [`scan`](https://github.com/micromatch/picomatch#scan) from [`picomatch`](https://npmx.dev/picomatch)), and `createPathFilter`, a filter from `include` and `exclude` patterns

- [`161bee0`](https://github.com/andreww2012/utilery/commit/161bee0205dd8c0a652fd5a07c6cf2aed715dd6b) - Added a new `getBuiltinModule` utility: a typed `process.getBuiltinModule` that gives `undefined` outside Node.js

- [`80150d3`](https://github.com/andreww2012/utilery/commit/80150d37f3c175bc54d0dda398ceb6b466f8bab6) - Renamed the package from `@andreww2012/unutils` to [`utilery`](https://npmx.dev/utilery), so install it and import from `utilery` instead

- [`a6d367d`](https://github.com/andreww2012/utilery/commit/a6d367d8d7a6f12223f2d455d30321105bd7cb58) - `arrayShuffle`, `arraySample`, `random`, `randomIntInclusive` and `randomIntExclusive` get a `random` option for another generator, like one from `createSeededRandom`

- [`d8b0c25`](https://github.com/andreww2012/utilery/commit/d8b0c25fad92b0e5ad1e21d5bbcd750d72e6de3f) - Added a new `parseNpmPackageSpecifier` utility ([`parse`](https://github.com/egoist/parse-package-name#usage) from [`parse-package-name`](https://npmx.dev/parse-package-name)) that splits a specifier like `@scope/package@1.2.3/sub/path` into the name, the version and the path

- [`2eb3659`](https://github.com/andreww2012/utilery/commit/2eb36595f20753b588bfc6f102cd260ec9a38922) - `createSingletonPromise` no longer keeps a rejection by default, so the next call tries again (pass `{cacheRejections: true}` for the old behavior), and gets a `ttlMs` option

- [`8de06c0`](https://github.com/andreww2012/utilery/commit/8de06c0f2ce7be5732f444eeec6d3c7c5500f62e) - Added new utilities:
  
  - `downloadFile` in a new `browser` group: saves a string, bytes, a `Blob`, a `fetch` response or a stream as a file, like a download link, or through a "Save as" dialog in browsers that support it
  - `formatDateForFileName`: formats a date and time for file names, like `2026-10-25_14-30-05`, with a choice of precision, UTC and separators

- [`42e7cec`](https://github.com/andreww2012/utilery/commit/42e7cecede5f312f93a226601899082a13c4c35e) - Added new `findUp` and `findUpSync` utilities ([`findUp`][api] and [`findUpSync`][api] from [`find-up-simple`](https://npmx.dev/find-up-simple)) that find a file or directory in parent directories, and a new `isPathInside` utility
  
  [api]: https://github.com/sindresorhus/find-up-simple#api

- [`60b94fa`](https://github.com/andreww2012/utilery/commit/60b94fa696597ae19ccad28850eb0952090d0897) - Added a new `sleepAbortable` utility: like `sleep`, but rejects with the reason of the aborted signal and has an `unref` option to not keep the Node.js process alive

- [`83b38c1`](https://github.com/andreww2012/utilery/commit/83b38c19ad7b2dbdae0305b761c431b58be45e8f) - Added new `getErrorMessage` and `interopDefault` utilities: get a message from a caught value of any type, and resolve a module (or a dynamic `import()`) to its default export when it has one

- [`32e6ccc`](https://github.com/andreww2012/utilery/commit/32e6cccffaed0aaf736df7d07035bdeecaf1fad6) - Updated [`remeda` from v2.51.0 to v2.53.0](https://github.com/remeda/remeda/compare/v2.51.0...v2.53.0), which affected:
  
  - `arrayMapWithAccumulator`:
    - **BREAKING:** the callback now gets the source array as its fourth argument instead of the elements processed so far

- [`5951301`](https://github.com/andreww2012/utilery/commit/595130199cac563dad48aa6cc34e840f6975699d) - Added new `stripAnsi`, `getStringWidth` and `wrapText` utilities ([`stripAnsi`](https://github.com/chalk/strip-ansi#usage), [`stringWidth`](https://github.com/sindresorhus/string-width#api) and [`wrapAnsi`](https://github.com/chalk/wrap-ansi#api) from [`strip-ansi`](https://npmx.dev/strip-ansi), [`string-width`](https://npmx.dev/string-width) and [`wrap-ansi`](https://npmx.dev/wrap-ansi)): remove ANSI escape codes, measure the terminal width of a string and wrap styled text

- [`22b4cae`](https://github.com/andreww2012/utilery/commit/22b4cae3c01abd403e5806286d0fcfda5470d3ae) - Added a new `MaybeReadonlyArray` type: a value or a readonly array of it. `generateMailtoLink` now uses it, so its recipient options also accept readonly arrays

- [`22b4cae`](https://github.com/andreww2012/utilery/commit/22b4cae3c01abd403e5806286d0fcfda5470d3ae) - Added a new [`isArray`](https://remedajs.com/docs/#isArray) utility from [`remeda`](https://npmx.dev/remeda): unlike `Array.isArray`, it also narrows readonly arrays

- [`23be320`](https://github.com/andreww2012/utilery/commit/23be320fd565ca5714aeffa42f390478fb6c90e2) - `omit`: a `*` deep path segment now matches every element of an array or property of an object, e.g. `users.*.password` removes `password` from every user. Deep paths also no longer mutate the input when they go through an array, e.g. `omit(object, ['users.0.password'])`

- [`4d59645`](https://github.com/andreww2012/utilery/commit/4d5964564ece650ea33578dbe73ebf54418f44da) - Added a new `path` group for file paths on any platform, with `isSafeRelativePath` and `parseNodeModulesPath`. `toForwardSlashes` moved there from `string`, so import it from `utilery/path` instead of `utilery/string`

- [`03565c6`](https://github.com/andreww2012/utilery/commit/03565c63fe8afa385e039e7a3e4df7a671eaa99e) - Added new `isPromiseLike`, `isValidDate` and `isUnsafeObjectKey` utilities

- [`5d9e54f`](https://github.com/andreww2012/utilery/commit/5d9e54ff7d1ae3044b1c4861f4537697d47cf4a4) - Added a new `topologicalSort` utility ([`toposort.array`](https://github.com/marcelklehr/toposort) from [`toposort`](https://npmx.dev/toposort)) and the `CyclicDependencyError` it throws for a dependency cycle

- [`c818297`](https://github.com/andreww2012/utilery/commit/c8182974fa8b8325dafb701011a7816db00c6bba) - Added a new `withAbortSignal` utility that makes a promise reject with the reason of an `AbortSignal` as soon as it is aborted

- [`bce739b`](https://github.com/andreww2012/utilery/commit/bce739ba6067a5b4214a57914ad2e7c74d350066) - Utilities with a newer native counterpart now call it where it is available, with the same results everywhere:
  
  - `mapGetOrInsert` and `mapGetOrInsertComputed` call `Map#getOrInsert` and `Map#getOrInsertComputed`:
    - **BREAKING:** so the `has`, `get` and `set` methods of a `Map` subclass are not called there
  - `promiseTry` calls `Promise.try`
  - `regexEscape` calls `RegExp.escape`:
    - **BREAKING:** now escapes the same characters as `RegExp.escape`: also `/`, the other ASCII punctuation except `_`, whitespace, line terminators, lone surrogates and a leading ASCII letter or digit. This fixes a `SyntaxError` or a wrong match inside `[...]` with the `v` flag (like `[${regexEscape('a/b')}]` or `[${regexEscape('a&&b')}]`) and right after an escape like `\1` or `\0`
  - `uint8ArrayToBase64` and `stringToBase64` call `Uint8Array#toBase64`
  - `uint8ArrayToHex` calls `Uint8Array#toHex`
  - `base64ToUint8Array` and `base64ToString` call `Uint8Array.fromBase64`:
    - **BREAKING:** now throw a `SyntaxError` instead of a `DOMException`
    - **BREAKING:** now reject incomplete padding (`SGVsbA=`), and always ignore ASCII whitespace (some valid strings with it were rejected)
  - `hexToUint8Array` calls `Uint8Array.fromHex`:
    - **BREAKING:** now throws a `SyntaxError` instead of an `Error`

- [`edc0141`](https://github.com/andreww2012/utilery/commit/edc014145b0ccbfd5d86f0f7fa0098fb05848f90) - Added new `writeJsonFile` and `writeJsonFileSync` utilities ([`writeJsonFile`](https://github.com/sindresorhus/write-json-file#api) and [`writeJsonFileSync`](https://github.com/sindresorhus/write-json-file#api) from [`write-json-file`](https://npmx.dev/write-json-file)) that write JSON atomically and keep the indentation of an existing file, and a new `getAppPaths` utility ([`envPaths`](https://github.com/sindresorhus/env-paths#api) from [`env-paths`](https://npmx.dev/env-paths)) for the data, config and cache directories of an app

- [`3f4c756`](https://github.com/andreww2012/utilery/commit/3f4c756bbd7883ce48e8e50dff0260f1353f1a91) - `truncate` gets a `position` option to cut the start or the middle

- [`6833f78`](https://github.com/andreww2012/utilery/commit/6833f78d3a09dedf5626f0b114a9bcf67d057228) - Added a new `isNodeError` utility that tells whether a caught value is a Node.js system error, optionally with one of the given codes, and narrows its type

- [`8768aab`](https://github.com/andreww2012/utilery/commit/8768aab6c981a3adb684ce86808d078e6aebc6e3) - Fixed the types of `objectEntriesUnsafe`, `objectKeysUnsafe` and `objectValuesUnsafe`:
  
  - **BREAKING:** the values of optional properties given by `objectEntriesUnsafe` and `objectValuesUnsafe` include `undefined`, as such a property may be set to it, unless the `exactOptionalPropertyTypes` compiler option is on
  - a union of objects gives the keys, entries and values of each member instead of `never`
  - in generic code, the keys can index the object when its type parameter has known keys or an index signature, like `T extends {a: number}`
  - the keys of string enums keep their enum type
  - arrays give their index strings and other own keys, like `index` of a regex match, without `length` and method names

- [`10964e7`](https://github.com/andreww2012/utilery/commit/10964e7ca847af9ffd7093b68c5f50e36d0956ea) - Added new `formatTerminalLink`, `formatTerminalFileLink` and `isTerminalLinkSupported` utilities ([`hyperlink`][api], [`link`][api] and [`supportsHyperlinks`][api] from [`clickable-path`](https://npmx.dev/clickable-path)) for clickable links in terminals
  
  [api]: https://github.com/danielroe/clickable-path#api

- [`e3a9fc0`](https://github.com/andreww2012/utilery/commit/e3a9fc0be8c0342691e6d3042ed3b81186be9717) - Added new `isFile`, `isDirectory` and `isSymlink` utilities and their `*Sync` versions ([`isFile`][api], [`isDirectory`][api], [`isSymlink`][api], etc. from [`path-type`](https://npmx.dev/path-type)), which give `false` for a missing path, and a new `pathExistsSync` utility
  
  [api]: https://github.com/sindresorhus/path-type#api

- [`0d9e353`](https://github.com/andreww2012/utilery/commit/0d9e353152b846360603e0db11a9fa7fc0a0635c) - Added new `slugify` and `createUniqueSlugify` utilities, based on [`slugify`](https://github.com/sindresorhus/slugify#api) from [`@sindresorhus/slugify`](https://npmx.dev/@sindresorhus/slugify) and on [`any-ascii`](https://npmx.dev/any-ascii): URL slugs that are always ASCII, for text in any script, including Chinese, Japanese and Korean, and slugs that never repeat

- [`5f36e56`](https://github.com/andreww2012/utilery/commit/5f36e56a9812f47f22121d5aec09bdc69917c448) - Added new utilities:
  
  - `formatBytes` ([`prettyBytes`](https://github.com/sindresorhus/pretty-bytes#api) from [`pretty-bytes`](https://npmx.dev/pretty-bytes)) and `formatRelativeTime`
  - `parseBoolean` ([`yn`](https://github.com/sindresorhus/yn#api) from [`yn`](https://npmx.dev/yn))
  - `sanitizeUrl` ([`sanitizeUrl`](https://github.com/braintree/sanitize-url#usage) from [`@braintree/sanitize-url`](https://npmx.dev/@braintree/sanitize-url)) and `redactUrlCredentials`

- [`34e077d`](https://github.com/andreww2012/utilery/commit/34e077dc9e3e8b29000c216963dd9c70fbc773cd) - Added new `isAbortError` and `isTimeoutError` utilities: check whether a caught value is an error named `AbortError` or `TimeoutError`

- [`6d0acc3`](https://github.com/andreww2012/utilery/commit/6d0acc3414e89e94fe3b09da2a93148ffcf0c917) - Updated [`es-toolkit` from v1.52.0 to v1.53.0](https://github.com/toss/es-toolkit/compare/v1.52.0...v1.53.0), which affected:
  
  - `assignDefaults`:
    - with `{copy: true}`, copies the target like it does with `{copy: true, deep: true}`, so a target with a `null` prototype keeps it
  - `ceil`
  - `deburr`:
    - **BREAKING:** keeps letters of scripts other than Latin, like Cyrillic, Greek and Hangul, as they are, even with diacritical marks: `deburr('й')` gives `'й'` instead of `'и'`
  - `findObjectKey`:
    - types keys as `Object.keys` gives them: numeric keys as strings, without symbol keys
  - `floor`
  - `freezeDeep`
  - `interpolate`:
    - returns exactly `max` when `t` is `1`, which rounding errors could break before
  - `isObjectMatching`
  - `mapKeys`
  - `mapRange`:
    - maps the end of the input range to exactly the end of the output range
  - `mergeDeep`
  - `omit`:
    - shares the other values with the input when it removes a key whose name looks like a path (like `'a.b'`), as it does for other keys, instead of copying them
  - `once`
  - `orderBy`
  - `pick`
  - `sortBy`
  - `truncate`
  
  Added utilities from the new release:
  
  - `toSentenceCase` ([`sentenceCase`](https://es-toolkit.dev/reference/string/sentenceCase.html))
  - `interpolateInverse` ([`inverseLerp`](https://es-toolkit.dev/reference/math/inverseLerp.html))
  - `serializeStable` ([`serialize`](https://es-toolkit.dev/reference/util/serialize.html)), which escapes quotes in strings, so they can't make different values give the same string
  - `Queue` ([`Queue`](https://es-toolkit.dev/reference/util/Queue.html))
  - `formatQueryString` ([`stringify`](https://es-toolkit.dev/reference/query-string/stringify.html))

- [`52f68c9`](https://github.com/andreww2012/utilery/commit/52f68c9c912e7de5020750f386bd0d2206265e38) - `withTimeout` passes an `AbortSignal` to the function and aborts it on timeout; it rejects with a `DOMException` named `TimeoutError`, and with the abort reason when its `signal` is aborted (instead of only stopping the timer)

- [`bade937`](https://github.com/andreww2012/utilery/commit/bade9379b7de0bc48e13ee266201cd9d21150f1d) - Added a new `findClosestNumber` utility

- [`63cbf31`](https://github.com/andreww2012/utilery/commit/63cbf31cf04d7536456b5cdcf697aa2f7a73b592) - Updated [`safe-stable-stringify` from v2.5.0 to v3.0.0](https://github.com/BridgeAR/safe-stable-stringify/compare/v2.5.0...v3.0.0), which affected:
  
  - `jsonStringifyStable`:
    - **BREAKING:** now replaces circular references with `"[Circular: N]"` instead of `"[Circular]"`, where `N` is the depth of the referenced ancestor (`0` for the root)

- [`17ed0f2`](https://github.com/andreww2012/utilery/commit/17ed0f2a5e0134573a747a9647c69a40c1d253fa) - Added a new `bytes` group of `Uint8Array` conversions, Base64 and hex encoding, from [`uint8array-extras`](https://npmx.dev/uint8array-extras):
  
  - [`uint8ArrayToBase64`][api], [`base64ToUint8Array`][api], [`stringToBase64`][api] and [`base64ToString`][api]
  - [`uint8ArrayToHex`][api] and [`hexToUint8Array`][api]
  - [`uint8ArrayToString`][api], [`stringToUint8Array`][api], [`concatUint8Arrays`][api] and [`toUint8Array`][api]
  
  [api]: https://github.com/sindresorhus/uint8array-extras#api

- [`e11e7f6`](https://github.com/andreww2012/utilery/commit/e11e7f607ff96d117119c16920c5baded8400d5f) - Added a new `http` group for parsing and formatting HTTP headers:
  
  - `parseRetryAfter`
  - `parseLinkHeader` ([`Link.parse`](https://github.com/jhermsmeier/node-http-link-header#usage) from [`http-link-header`](https://npmx.dev/http-link-header))
  - `parseCacheControl` and `formatCacheControl` ([`parse`](https://github.com/tusbar/cache-control#parseheader) and [`format`](https://github.com/tusbar/cache-control#formatcachecontrol) from [`@tusbar/cache-control`](https://npmx.dev/@tusbar/cache-control))
  - `parseRangeHeader` ([`rangeParser`](https://github.com/jshttp/range-parser#api) from [`range-parser`](https://npmx.dev/range-parser))
  - `getPreferredEncoding` ([`encoding`](https://github.com/jshttp/negotiator#accept-encoding-negotiation) from [`negotiator`](https://npmx.dev/negotiator))

- [`18ef481`](https://github.com/andreww2012/utilery/commit/18ef481c7cb0e6ebeba61c655ded40ab20aeb98a) - Added a new `net` group for IP addresses, based on [`ipaddr.js`](https://npmx.dev/ipaddr.js):
  
  - `isIpv4` and `isIpv6` ([`IPv4.isValidFourPartDecimal`][api] and [`IPv6.isValid`][api], strict about embedded IPv4 addresses too) and `isIp`
  - `getIpRange` (based on [`process`][api]), which tells whether an address is private, loopback, link-local, etc.
  - `isLocalhost`
  
  [api]: https://github.com/whitequark/ipaddr.js#api

- [`01f111d`](https://github.com/andreww2012/utilery/commit/01f111de6e6fe46fb3011afa2600f4039c0fc671) - Added a new `formatDuration` utility from [`pretty-ms`](https://npmx.dev/pretty-ms) ([`prettyMilliseconds`](https://github.com/sindresorhus/pretty-ms#api)) that formats milliseconds like `'1h 2m 3s'` or, in colon notation, `'1:02:03'`, and a new `parseColonDuration` utility that parses the colon notation back into milliseconds

- [`1b1f8d3`](https://github.com/andreww2012/utilery/commit/1b1f8d33b99a796799d7b425cbc99a96f374bf05) - Added a new `promiseTry` utility: like `Promise.try`, it calls a function and always gives a promise, turning a synchronous throw into a rejection

- [`bee52e6`](https://github.com/andreww2012/utilery/commit/bee52e6479f04874ccbdc646b7687b8672717f92) - Added a new `jsonStringifyForHtml` utility ([`htmlEscape`](https://github.com/zertosh/htmlescape#usage) from [`htmlescape`](https://npmx.dev/htmlescape)) that turns a value into JSON safe to embed in an HTML `<script>`

- [`758f540`](https://github.com/andreww2012/utilery/commit/758f540f10c646ad6313933bef1917e34d934433) - Added new `memoizeAsync` ([`pMemoize`](https://github.com/sindresorhus/p-memoize#api) from [`p-memoize`](https://npmx.dev/p-memoize)) and `callAll` utilities: memoize an async function without caching rejections, and combine functions into one that calls all of them

- [`6dabc8e`](https://github.com/andreww2012/utilery/commit/6dabc8e5adbeb5392a3334d5d25c86fe59630dab) - `arrayChunks` now also accepts an array of sizes, making one chunk per size. `Infinity` as a size collects the rest of the elements, and a literal tuple of sizes gives a tuple of chunks

- [`4f6604a`](https://github.com/andreww2012/utilery/commit/4f6604a765238024c37193101c2396b6d42b8e2a) - Added new `arrayIsUnique`, `arrayFindDuplicates` and `arrayToggle` utilities: check whether an array has repeated elements, find them, and add or remove a value like `classList.toggle` does

- [`49c57d1`](https://github.com/andreww2012/utilery/commit/49c57d1ccad7b2b95b399184d6266e51f8dd4817) - Updated [`ms-ts` from v1.1.0 to v1.2.0](https://github.com/andreww2012/ms-ts/compare/ms-ts@1.1.0...ms-ts@1.2.0), which affected:
  
  - `ms`:
    - **BREAKING:** calling it without the duration string as the generic parameter is now an error
  - `Ms`

### Patch Changes

- [`3c88f4a`](https://github.com/andreww2012/utilery/commit/3c88f4aa3a09aa3e0c5375abe16788caa57d558e) - Updated [`arkregex` from v0.0.12 to v0.0.14](https://github.com/arktypeio/arktype/compare/arkregex@0.0.12...arkregex@0.0.14), which affected:
  
  - `regexTyped`

- [`4be25e6`](https://github.com/andreww2012/utilery/commit/4be25e69146998c79f2f5ac8806642adccdd43ae) - Updated [`remeda` from v2.53.0 to v2.54.1](https://github.com/remeda/remeda/compare/v2.53.0...v2.54.1)

- [`057879f`](https://github.com/andreww2012/utilery/commit/057879f5adb7ec00a675d66c0297908df7c658ad) - Updated [`lossless-json` from v4.3.1 to v4.3.3](https://github.com/josdejong/lossless-json/compare/v4.3.1...v4.3.3), which affected:
  
  - `jsonParseLossless`
  - `jsonStringifyLossless`
  - `NumberLossless`

- [`75bf10b`](https://github.com/andreww2012/utilery/commit/75bf10bedcc7737267ac2987ecc354582a0e49dc) - Updated [`p-memoize` from v8.0.0 to v9.0.0](https://github.com/sindresorhus/p-memoize/compare/v8.0.0...v9.0.0), which affected:
  
  - `memoizeAsync`
  - `MemoizeAsyncOptions`

- [`676ca73`](https://github.com/andreww2012/utilery/commit/676ca73f53a9666801802e0229061585fe330ca4) - `jsonStringifyAsync` now matches `JSON.stringify` in more cases:
  
  - circular structures are rejected at any depth, instead of resolving with `[object Object]` in the output or crashing the process (circular arrays)
  - functions and symbols are skipped, and `undefined`, functions and symbols in arrays become `null`

- [`e8ba0c7`](https://github.com/andreww2012/utilery/commit/e8ba0c7eda8e43413ad3b31715b51dc6285f2145) - Exported `TruncateOptions`, the options type of `truncate`

- [`3423c17`](https://github.com/andreww2012/utilery/commit/3423c17c118879c7e51d6dce3a36790b5d428924) - Updated [`pretty-ms` from v9.3.1 to v10.0.0](https://github.com/sindresorhus/pretty-ms/compare/v9.3.1...v10.0.0), which affected:
  
  - `formatDuration`

- [`3bdc0f0`](https://github.com/andreww2012/utilery/commit/3bdc0f038c9304386abf4916918ea76b8905688c) - `regexEscape` now uses [`escape-string-regexp`](https://npmx.dev/escape-string-regexp) and also escapes `-`, so its result is safe inside a character class

- [`6c8c77b`](https://github.com/andreww2012/utilery/commit/6c8c77bba3ab3ac444534cbc846f485291bd1a14) - Updated [`devalue` from v6.0.2 to v6.0.3](https://github.com/sveltejs/devalue/compare/v6.0.2...v6.0.3)

- [`51d85f2`](https://github.com/andreww2012/utilery/commit/51d85f2d3c710b7d7ae66e1d6df06365bf35933a) - Rewrote the docs of re-exported utilities, types and their options: they now name our utilities and types instead of the upstream ones, don't mention bundled packages, and show up at call sites, also in parameter hints. Documented the overloads and errors of more utilities

- [`57ce269`](https://github.com/andreww2012/utilery/commit/57ce2694e92edb6f5f148047450e42fed95e5cbe) - `arrayify`: a union mixing arrays with other values is now typed member by member, so its tuples keep their own types instead of becoming array elements

- [`2f0a434`](https://github.com/andreww2012/utilery/commit/2f0a4348587b9ec5f90bb710e44368e0b764e467) - Added the missing license text of [`typed-query-selector`](https://npmx.dev/typed-query-selector), whose types the published package includes, to `THIRD_PARTY_NOTICES.md`

- [`e42cff7`](https://github.com/andreww2012/utilery/commit/e42cff7ac8cc4cbc1d6efbea825f1397100f164d) - Updated [`ms-ts` from v1.0.0 to v1.1.0](https://github.com/andreww2012/ms-ts/compare/v1.0.0...ms-ts@1.1.0)

- [`ec23c95`](https://github.com/andreww2012/utilery/commit/ec23c9524a6964c01a36d8565e92311f056d6f69) - Importing the main entry point or `regex` no longer adds a global `ArkEnv` type to your project. With `skipLibCheck: false`, it broke type checking in projects that also use [ArkType](https://npmx.dev/arktype)

- [`c9c3f1c`](https://github.com/andreww2012/utilery/commit/c9c3f1c72e4df200f7f516ca2bb8e72ec15f0609) - Editor hovers now show the results of these utilities and types as single object types, instead of intersections like `{a: number} & {b: number}` or helper types like `Pick<...>`:
  
  - `assignDefaults`, `mergeDeep` (with `mergeValues`), `omit`, `pick` and `swapObjectProperties`
  - `DiscriminatedUnion`, `NonEmptyObject`, `OmitDistributed`, `OmitIndexSignature`, `PickConditional`, `PickDistributed`, `PickIndexSignature`, `RequireAtLeastOne`, `RequireExactlyOne`, `SetNonNullable`, `StringifiedValues` and `TruncateOptions`

- [`a3d2793`](https://github.com/andreww2012/utilery/commit/a3d27939b94002a98ee1420f16f2f609365f64a7) - Fixed keys from data or callbacks changing prototypes:
  
  - `deleteByPath`:
    - refuses with `false` a path that steps through an inherited `constructor` or `__proto__`, or into the `prototype` of a function, also with a key that only converts to these names, like `["constructor"]`: `deleteByPath({}, 'constructor.keys')` deleted `Object.keys`, and `deleteByPath({}, 'constructor.prototype.toString')` deleted `Object.prototype.toString`, for the whole program
    - goes through and deletes own `constructor` and `__proto__` keys like other keys, while it refused an own `__proto__` key before
  - these utilities no longer replace the prototype of the object they build or update with the value of a `__proto__` key (or a key that converts to it, like `["__proto__"]`), which `JSON.parse` can create and a callback can return, but keep the key as an own property:
    - `allKeyed`
    - `assignDefaults` with `{deep: true}`, or with `{copy: true}` and such a key in the target
    - `cloneDeep` and `cloneShallow`
    - `flattenObject`
    - `jsonParseAsync`
    - `mapKeys`, `mapKeysAsync`, `mapValues` and `mapValuesAsync`
    - `mergeDeep` with `{copy: true}` and such a key in the target
    - `objectAssign` and `objectUpdate`
    - `objectFromKeys`
    - `omit`, which also removes the key when asked, and `pick`
    - `parseLinkHeader`, which also no longer gives a parameter named like an inherited property, such as `constructor`, that property as an earlier value
    - `replaceKeys` and `transformKeysDeep`
    - `setByPathImmutable`, for a `__proto__` segment of an array
    - `sortKeys`
    - `swapObjectKeysValues`

- [`c31b63c`](https://github.com/andreww2012/utilery/commit/c31b63c78de7d49712996c570e497810e79d8f15) - Updated [`decode-uri-component` from v0.5.0 to v0.5.1](https://github.com/SamVerschueren/decode-uri-component/compare/v0.5.0...v0.5.1), which affected:
  
  - `decodeUriComponentSafe`:
    - a cut-off `%C2` and the byte order marks `%FE%FF` and `%FF%FE` now become replacement characters (U+FFFD) in any case of hex digits, not only in upper case

- [`d31458b`](https://github.com/andreww2012/utilery/commit/d31458b9a125a1ed285cfecaf1ffbe8dc21aca1b) - Listed the exact versions of all bundled packages in the new [`inlinedDependencies`](https://github.com/e18e/ecosystem-issues/issues/237) field of `package.json`

- [`8feeb0b`](https://github.com/andreww2012/utilery/commit/8feeb0b79f6f1845634aeb87a9f1847b8a6e327f) - Fixed utilities for options set to `undefined`, which the types allow without the `exactOptionalPropertyTypes` compiler option, and types for users with that option:
  
  - options set to `undefined` work like missing ones in:
    - `jsonStringifyStable.configure`, which threw a `TypeError` for them
    - `formatBytes`: `space`
    - `slugify` and `createUniqueSlugify`: `separator`, `lowercase`, `decamelize` and `preserveCharacters`
    - `truncate`: `omission`
    - `writeJsonFile` and `writeJsonFileSync`: `detectIndent`
  - with the compiler option:
    - `undefined` can be passed as `circularValue` to `jsonStringifyStable.configure` and as `indent` to `writeJsonFile` and `writeJsonFileSync`, as documented
    - `objectUpdate` accepts an optional property of the update for a required property of the target, and rejects `undefined` for an optional property of the target that doesn't include it

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
