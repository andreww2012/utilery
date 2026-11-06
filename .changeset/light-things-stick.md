---
'utilery': patch
---

Fixed the `NumberLossless` type, the `options` parameter of `jsonParseLossless` and the `numberStringifiers` parameter of `jsonStringifyLossless`, which were typed as `any`. Without `skipLibCheck`, TypeScript also reported that it can't find the `lossless-json` module
