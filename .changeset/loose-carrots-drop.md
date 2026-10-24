---
'utilery': patch
---

`regexEscape` now uses [`escape-string-regexp`](https://npmx.dev/escape-string-regexp) and also escapes `-`, so its result is safe inside a character class
