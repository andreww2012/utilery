---
'unutils': minor
---

Added a new `path` group for file paths on any platform, with `isSafeRelativePath` and `parseNodeModulesPath`. `toForwardSlashes` moved there from `string`, so import it from `unutils/path` instead of `unutils/string`
