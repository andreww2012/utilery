# Package: [`@sindresorhus/transliterate`](https://npmx.dev/@sindresorhus/transliterate)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

A dependency of [`@sindresorhus/slugify`](./@sindresorhus__slugify.md) that `string/slugify` also calls directly.

| Original function group and name                                     | Status | Our function group and name | Notes                                                                      |
| -------------------------------------------------------------------- | ------ | --------------------------- | -------------------------------------------------------------------------- |
| [`transliterate`](https://github.com/sindresorhus/transliterate#api) | ❌     | -                           | Used inside `string/slugify` only; `string/deburr` covers removing accents |

> **Note:** Our bundled copy is [patched](../../patches/@sindresorhus__transliterate.patch) to build its replacement patterns on the first call that needs them instead of on import.
> Without the patch, every import of `utilery` and `utilery/string` takes ~6 ms longer, even when `slugify` is never called.
