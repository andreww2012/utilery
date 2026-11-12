---
'utilery': patch
---

Made importing `utilery` ~25% faster and `utilery/string` ~3 times faster by creating `Intl.Segmenter`s and big regexes on the first call instead of on import
