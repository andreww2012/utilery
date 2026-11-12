---
'utilery': minor
---

**BREAKING:** Turned `startsWith` and `endsWith` into type guards: they now narrow a `string` to a template literal type like `` `https://${string}` `` and a union of string literals to the matching members, and no longer compute a `true` or `false` type for literal arguments
