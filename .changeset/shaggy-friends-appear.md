---
'utilery': minor
---

Updated [`string-width` from v8.3.0 to v9.0.0](https://github.com/sindresorhus/string-width/compare/v8.3.0...v9.0.0), which affected:

- `getStringWidth`:
  - **BREAKING:** the width of some text changed: Thai, Lao and Indic clusters with several visible characters, Hangul syllables written as separate letters, some emoji and flag sequences, and lone surrogates. For example, `getStringWidth('นำ')` gives `2` instead of `1`
- `wrapText`:
  - **BREAKING:** it breaks lines of such text at other places, as it measures the text with the same widths
