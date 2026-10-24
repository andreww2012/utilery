---
'utilery': patch
---

`jsonStringifyAsync` now matches `JSON.stringify` in more cases:

- circular structures are rejected at any depth, instead of resolving with `[object Object]` in the output or crashing the process (circular arrays)
- functions and symbols are skipped, and `undefined`, functions and symbols in arrays become `null`
