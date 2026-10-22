# Package: [`@sindresorhus/slugify`](https://npmx.dev/@sindresorhus/slugify)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                                    | Status | Our function group and name  | Notes                                                                                                        |
| ------------------------------------------------------------------- | ------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`slugify`](https://github.com/sindresorhus/slugify#api)            | ✅     | `string/slugify`             | The default export; transliterates any script into ASCII (see below); no `transliterate` option              |
| [`slugifyWithCounter`](https://github.com/sindresorhus/slugify#api) | ❌     | `string/createUniqueSlugify` | Our own counter: upstream can return the same slug twice (`Usage`, `Usage`, `Usage 2` gives `usage-2` twice) |
| `Options`                                                           | ✅     | `string/SlugifyOptions`      | Renamed; without `transliterate`                                                                             |

Our `slugify` first transliterates the text like the package does (with its built-in replacements, like `&` → `and`, plus `customReplacements` and `locale`), then turns whatever is left into ASCII with [`any-ascii`](any-ascii.md) (Chinese, Japanese, Korean, Hebrew, Thai, emoji, etc.), so the result never contains characters outside ASCII.
A [patch](../../patches/@sindresorhus__slugify.patch) exposes the built-in replacements for that.
