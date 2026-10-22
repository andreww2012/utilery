# Package: [`p-memoize`](https://npmx.dev/p-memoize)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                  | Status | Our function group and name    | Notes                                                                                                        |
| ------------------------------------------------- | ------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| [`pMemoize`][api]                                 | ✅     | `function/memoizeAsync`        | Renamed; the default export; the result also has a `clear` method (which does nothing with `{cache: false}`) |
| [`pMemoizeClear`][api]                            | ❌     | `function/memoizeAsync`        | Covered: call `clear()` on the memoized function                                                             |
| [`pMemoizeDecorator`][api]                        | ⌛     | —                              | Not added yet                                                                                                |
| `Options`                                         | ✅     | `function/MemoizeAsyncOptions` | Renamed                                                                                                      |
| `AnyAsyncFunction`, `CacheStorage`, `ShouldCache` | ❌     | —                              | Used in the types of `function/memoizeAsync` only                                                            |

[api]: https://github.com/sindresorhus/p-memoize#api
