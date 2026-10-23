---
'unutils': patch
---

Importing the main entry point or `regex` no longer adds a global `ArkEnv` type to your project. With `skipLibCheck: false`, it broke type checking in projects that also use [ArkType](https://npmx.dev/arktype)
