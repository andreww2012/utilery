---
'utilery': patch
---

Fixed the types of `interopDefault`:

- in generic code, a module typed as `T | {default: T}` resolves to `T`, where the result couldn't be assigned to `T` before
- a module whose `default` export may be `null` or `undefined` resolves to the default export or the module itself, without an intersection with `{default: undefined}`
- a union of modules resolves each module of the union
