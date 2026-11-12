---
'utilery': minor
---

**BREAKING:** Made `isInteger`, `isSafeInteger` and `isFiniteNumber` return a `boolean` instead of narrowing number literal types: `isInteger` and `isSafeInteger` narrowed a `number` to `never` when they returned `true`, and `isFiniteNumber` when it returned `false`
