# Package: [`decode-uri-component`](https://npmx.dev/decode-uri-component)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                                                     | Status | Our function group and name     | Notes                       |
| ------------------------------------------------------------------------------------ | ------ | ------------------------------- | --------------------------- |
| [`decodeUriComponent`](https://github.com/SamVerschueren/decode-uri-component#usage) | ✅     | `string/decodeUriComponentSafe` | Renamed; the default export |

> **Note:** Our bundled copy is [patched](../../patches/decode-uri-component.patch) for a bug that its latest release (0.5.1) still has.
> Without the patch, a cut-off `%C2` and the byte order marks `%FE%FF` and `%FF%FE` become replacement characters (U+FFFD) only when their hex digits are in upper case.
