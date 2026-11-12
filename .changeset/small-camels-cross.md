---
'utilery': minor
---

Updated [`@sindresorhus/slugify` from v3.0.1 to v4.0.1](https://github.com/sindresorhus/slugify/compare/v3.0.1...v4.0.1) and [`@sindresorhus/transliterate` from v2.3.1 to v3.0.0](https://github.com/sindresorhus/transliterate/compare/v2.3.1...v3.0.0), which affected:

- `slugify` and `createUniqueSlugify`:
  - **BREAKING:** some slugs changed: many characters are transliterated differently, and camelCase words are split before the transliteration instead of after it
  - **BREAKING:** they throw a `RangeError` for text with more than 100 combining marks in a row
  - **BREAKING:** each Chinese character and Korean syllable became a word of its own, also next to Latin letters and digits and with `decamelize: false`, so `你好2` gives `ni-hao-2` instead of `ni-hao2`
  - Fixed slugs with characters outside ASCII for a `locale` that has its own lowercase rules: `slugify('I', {locale: 'tr'})` gave `ı`
