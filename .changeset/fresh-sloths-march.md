---
'utilery': minor
---

Updated [`safe-stable-stringify` from v3.0.0 to v3.0.1](https://github.com/BridgeAR/safe-stable-stringify/compare/v3.0.0...v3.0.1), which affected:

- `jsonStringifyStable`:
  - **BREAKING:** a function created with `jsonStringifyStable.configure` now treats the elements of a `BigInt64Array` or a `BigUint64Array` like other bigints, instead of always writing them as numbers: it leaves them out when the `bigint` option is `false`, and throws with the `strict` option, unless `bigint` is set
  - **BREAKING:** with both the `strict` and `safe` options, the error message is now written in place of each typed array element that has no exact JSON form, instead of replacing the whole result
  - With the `safe` option, the error message of a getter that throws is now escaped, so the result is valid JSON when the message has quotes