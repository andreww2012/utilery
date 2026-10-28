---
'utilery': patch
---

Made importing `utilery` ~25% faster and `utilery/string` ~3 times faster: the bundled [`string-width`](https://npmx.dev/string-width), [`wrap-ansi`](https://npmx.dev/wrap-ansi) and [`@sindresorhus/transliterate`](https://npmx.dev/@sindresorhus/transliterate) are now patched to create their `Intl.Segmenter`s and big regexes on the first call instead of on import
