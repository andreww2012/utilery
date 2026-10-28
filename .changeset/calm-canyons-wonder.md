---
'utilery': minor
---

Added a new `onlySyntaxCharacters` option to `regexEscape` that escapes only `^$\.*+?()[]{}|/` with a backslash, so that people can read the result or type it by hand: `My$Button` becomes `My\$Button` instead of `\x4dy\$Button`
