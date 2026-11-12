---
'utilery': patch
---

Fixed `isTruthy` narrowing an `unknown` value to `never` when it returns `false`: it now stays `unknown` there, and is narrowed to the truthy types when it returns `true`
