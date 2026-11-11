---
'utilery': patch
---

Fixed `TupleOf` for lengths of 10 000 or more, where TypeScript failed with "Type produces a tuple type that is too large to represent": it now gives an array type, like it does for the wide `number` type
