# Package: [`lossless-json`](https://npmx.dev/lossless-json)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name  | Status | Our function group and name  | Notes                                                                                                                |
| --------------------------------- | ------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [`parse`][lossless-json]          | ✅     | `json/jsonParseLossless`     | Renamed; preserves numeric precision (big ints **and** decimals) as `NumberLossless`. See note below                 |
| [`stringify`][lossless-json]      | ✅     | `json/jsonStringifyLossless` | Renamed; lossless serialize, incl. `bigint` and `NumberLossless` as bare numeric literals                            |
| [`LosslessNumber`][lossless-json] | ✅     | `json/NumberLossless`        | Renamed (words swapped); precision-preserving number wrapper; `.valueOf()` returns `number`/`bigint`, throws on loss |

> **Note on `jsonParseLossless`:** since Node.js 21, `JSON.parse` revivers get the raw text of each value (`context.source`), so lossless parsing is also possible natively.
> This utility uses its own parser instead, and comes with the matching lossless `stringify`, which native `JSON.stringify` can't replace, as it throws on `bigint`.

[lossless-json]: https://github.com/josdejong/lossless-json
