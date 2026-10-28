# Package: [`string-width`](https://npmx.dev/string-width)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                                  | Status | Our function group and name | Notes                       |
| ----------------------------------------------------------------- | ------ | --------------------------- | --------------------------- |
| [`stringWidth`](https://github.com/sindresorhus/string-width#api) | ✅     | `string/getStringWidth`     | Renamed; the default export |

> **Note:** Our bundled copy is [patched](../../patches/string-width.patch) to create its `Intl.Segmenter` and emoji regex on the first call instead of on import.
> Without the patch, every import of `utilery` and `utilery/string` takes ~14 ms longer, even when `getStringWidth` is never called.
