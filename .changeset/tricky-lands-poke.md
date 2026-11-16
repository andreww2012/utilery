---
'utilery': patch
---

Fixed the types of `arrayDifference`, `arrayIntersection` and `arrayIsSubset` called without a comparator or a key function: the second array may now hold elements of any type, and the result gets its element type from the first array alone. For example, `arrayIntersection(['s', 'm'] as const, strings)` now gives `('s' | 'm')[]` instead of `string[]`
