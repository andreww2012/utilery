---
'utilery': patch
---

Fixed type guards whose branches dropped values that can still reach them:

- `isValidDate` and `isJson` narrowed a `Date` or a `string` to `never` when they returned `false`. They no longer narrow it
- `objectHasOwn`, `isIn` and `isKeyIn` narrowed the object or the key to `never` when they returned `false` and the object type already had the key, like a `Record<string, number>` with a `string` key. They no longer narrow it. `isKeyIn` also no longer narrows the key to `__proto__` or `constructor`, for which it always returns `false`
- `isAbortError` and `isTimeoutError` narrowed an `Error` to `never` when they returned `false`. They now narrow to an error with their `name`
- `isNodeError` narrowed a system error to `never` when it returned `false` for codes of a wide type, like `string[]`. It no longer narrows such an error
- `arrayHasMinElements` narrowed an array to `never` when it returned `false` for a union of lengths, like `1 | 3`, and `arrayHasMaxElements` kept too few lengths when it returned `true`. They now narrow only for a single non-negative integer, so `arrayHasMinElements` no longer fails with "Type instantiation is excessively deep" for a length like `1.5` or `-1`
- `arrayPartition` and `iterablePartition` typed the unmatched elements as `never` when they already had the narrowed type. They now keep their type

Also documented which values `isTruthy`, `isPropertyDefined`, `isPropertyNotNullish`, `isEqualShallow`, `negatePredicate`, `isIn`, `isNodeError` and the data-last form of `isIncludedIn` still drop from a branch
