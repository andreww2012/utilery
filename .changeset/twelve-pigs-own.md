---
'utilery': patch
---

Fixed keys from data or callbacks changing prototypes:

- `deleteByPath`:
  - refuses with `false` a path that steps through an inherited `constructor` or `__proto__`, or into the `prototype` of a function, also with a key that only converts to these names, like `["constructor"]`: `deleteByPath({}, 'constructor.keys')` deleted `Object.keys`, and `deleteByPath({}, 'constructor.prototype.toString')` deleted `Object.prototype.toString`, for the whole program
  - goes through and deletes own `constructor` and `__proto__` keys like other keys, while it refused an own `__proto__` key before
- these utilities no longer replace the prototype of the object they build or update with the value of a `__proto__` key (or a key that converts to it, like `["__proto__"]`), which `JSON.parse` can create and a callback can return, but keep the key as an own property:
  - `allKeyed`
  - `assignDefaults` with `{deep: true}`, or with `{copy: true}` and such a key in the target
  - `cloneDeep` and `cloneShallow`
  - `flattenObject`
  - `jsonParseAsync`
  - `mapKeys`, `mapKeysAsync`, `mapValues` and `mapValuesAsync`
  - `mergeDeep` with `{copy: true}` and such a key in the target
  - `objectAssign` and `objectUpdate`
  - `objectFromKeys`
  - `omit`, which also removes the key when asked, and `pick`
  - `parseLinkHeader`, which also no longer gives a parameter named like an inherited property, such as `constructor`, that property as an earlier value
  - `replaceKeys` and `transformKeysDeep`
  - `setByPathImmutable`, for a `__proto__` segment of an array
  - `sortKeys`
  - `swapObjectKeysValues`
