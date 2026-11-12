# Package: [`@sindresorhus/slugify`](https://npmx.dev/@sindresorhus/slugify)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                                    | Status | Our function group and name  | Notes                                                                                                      |
| ------------------------------------------------------------------- | ------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`slugify`](https://github.com/sindresorhus/slugify#api)            | ✅     | `string/slugify`             | The default export; transliterates any script into ASCII (see below); no `transliterate` option            |
| [`slugifyWithCounter`](https://github.com/sindresorhus/slugify#api) | ❌     | `string/createUniqueSlugify` | Our own counter, joined with `separator`: upstream always joins it with `-` (`a_b-2` for `separator: '_'`) |
| `Options`                                                           | ✅     | `string/SlugifyOptions`      | Renamed; without `transliterate`                                                                           |

Our `slugify` lets the package do everything but the transliteration, which it extends: whatever the package's transliteration leaves outside ASCII (Chinese, Japanese, Korean, Hebrew, Thai, emoji, etc.) is turned into ASCII with [`any-ascii`](./any-ascii.md), so the result never contains characters outside ASCII.
Chinese characters and Korean syllables become separate words.
A [patch](../../patches/@sindresorhus__slugify.patch) lets the `transliterate` option be a function for that.
