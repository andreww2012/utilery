# Package: [`wrap-ansi`](https://npmx.dev/wrap-ansi)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                     | Status | Our function group and name | Notes                       |
| ---------------------------------------------------- | ------ | --------------------------- | --------------------------- |
| [`wrapAnsi`](https://github.com/chalk/wrap-ansi#api) | ✅     | `string/wrapText`           | Renamed; the default export |
| `Options`                                            | ✅     | `string/WrapTextOptions`    | Renamed                     |

> **Note:** Our bundled copy is [patched](../../patches/wrap-ansi.patch) to create its `Intl.Segmenter` on the first call that needs it instead of on import.
> Without the patch, every import of `utilery` and `utilery/string` takes ~5 ms longer, even when `wrapText` is never called.
