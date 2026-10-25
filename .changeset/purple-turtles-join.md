---
'utilery': minor
---

Fixed the types of `objectEntriesUnsafe`, `objectKeysUnsafe` and `objectValuesUnsafe`:

- **BREAKING:** the values of optional properties given by `objectEntriesUnsafe` and `objectValuesUnsafe` include `undefined`, as such a property may be set to it, unless the `exactOptionalPropertyTypes` compiler option is on
- a union of objects gives the keys, entries and values of each member instead of `never`
- in generic code, the keys can index the object when its type parameter has known keys or an index signature, like `T extends {a: number}`
- the keys of string enums keep their enum type
- arrays give their index strings and other own keys, like `index` of a regex match, without `length` and method names
