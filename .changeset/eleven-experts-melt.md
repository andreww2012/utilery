---
'utilery': minor
---

Fixed the types of `setHas` and `arrayIncludes`:

- **BREAKING:** when they return `true`, they keep `null` and `undefined` that the set or array may hold, instead of narrowing them away. When they return `false`, a union value now loses them too, like the other members that the element type covers
- they no longer narrow a value that already has the element type, which became `never` when they returned `false`
