# Package: [`lossless-json`](https://npmx.dev/lossless-json)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name  | Status | Our function group and name  | Notes                                                                                                                |
| --------------------------------- | ------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [`parse`][lossless-json]          | ✅     | `json/jsonParseLossless`     | Renamed; preserves numeric precision (big ints **and** decimals) as `NumberLossless`. See note below                 |
| [`stringify`][lossless-json]      | ✅     | `json/jsonStringifyLossless` | Renamed; lossless serialize, incl. `bigint` and `NumberLossless` as bare numeric literals                            |
| [`LosslessNumber`][lossless-json] | ✅     | `json/NumberLossless`        | Renamed (words swapped); precision-preserving number wrapper; `.valueOf()` returns `number`/`bigint`, throws on loss |

> **Note on `jsonParseLossless`:** parsing losslessly is now achievable natively: since Node 21, `JSON.parse` revivers receive the raw `context.source` text.
> This util is the ergonomic, tested packaging of that (plus the matching lossless `stringify`, which native `JSON.stringify` cannot do, as it throws on `bigint`).

[lossless-json]: https://github.com/josdejong/lossless-json
