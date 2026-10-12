---
'unutils': minor
---

`arrayChunks` now also accepts an array of sizes, making one chunk per size. `Infinity` as a size collects the rest of the elements, and a literal tuple of sizes gives a tuple of chunks
