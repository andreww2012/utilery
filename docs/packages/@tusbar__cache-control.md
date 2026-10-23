# Package: [`@tusbar/cache-control`](https://npmx.dev/@tusbar/cache-control)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                                       | Status | Our function group and name   | Notes                                               |
| ---------------------------------------------------------------------- | ------ | ----------------------------- | --------------------------------------------------- |
| [`parse`](https://github.com/tusbar/cache-control#parseheader)         | ✅     | `http/parseCacheControl`      | Renamed; accepts `null`                             |
| [`format`](https://github.com/tusbar/cache-control#formatcachecontrol) | ✅     | `http/formatCacheControl`     | Renamed                                             |
| `CacheControlValue`                                                    | ✅     | `http/CacheControlDirectives` | Renamed                                             |
| `CacheControl`                                                         | ❌     | -                             | The class of the result of `http/parseCacheControl` |
