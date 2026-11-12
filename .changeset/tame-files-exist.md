---
'utilery': minor
---

**BREAKING:** Turned `startsWith` and `endsWith` into type guards: they now narrow a `string` to `` `<prefix>${string}` `` and `` `${string}<suffix>` ``, and a union of string literals to the matching members, and no longer compute a `true` or `false` type for literal arguments
