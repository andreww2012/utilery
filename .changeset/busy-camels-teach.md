---
'utilery': minor
---

**BREAKING:** Turned `stringIncludes` into a type guard: it now narrows a `string` to `` `${string}<searched string>${string}` `` and a union of string literals to the members that contain the searched string, and no longer computes a `true` or `false` type for literal arguments
