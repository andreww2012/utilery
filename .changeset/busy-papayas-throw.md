---
'utilery': minor
---

Fixed the types of `isPlainObject`, `isJsonArray`, `isJsonObject` and `isJsonValue`, which dropped other objects and arrays, like a `Date` or an `unknown[]`, from the type of the value when they returned `false`:

- **BREAKING:** they narrow to `Record<PropertyKey, unknown>`, `JsonArray`, `JsonObject` and `JsonValue` instead of types with `any`
- they no longer narrow a value that already has such a type, which became `never` when they returned `false`
