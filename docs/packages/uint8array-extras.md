# Package: [`uint8array-extras`](https://npmx.dev/uint8array-extras)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

Conversions between `Uint8Array`, strings, Base64 and hex that work in every environment, unlike Node's `Buffer` and the `btoa`/`atob` pair (Latin-1 only).
The `bytes` group / `unutils/bytes`.

| Original function group and name                                    | Status | Our function group and name | Notes                        |
| ------------------------------------------------------------------- | ------ | --------------------------- | ---------------------------- |
| [`uint8ArrayToBase64`][api]                                         | ✅     | `bytes/uint8ArrayToBase64`  | `urlSafe` is optional        |
| [`base64ToUint8Array`][api]                                         | ✅     | `bytes/base64ToUint8Array`  | -                            |
| [`stringToBase64`][api]                                             | ✅     | `bytes/stringToBase64`      | `urlSafe` is optional        |
| [`base64ToString`][api]                                             | ✅     | `bytes/base64ToString`      | -                            |
| [`uint8ArrayToHex`][api]                                            | ✅     | `bytes/uint8ArrayToHex`     | -                            |
| [`hexToUint8Array`][api]                                            | ✅     | `bytes/hexToUint8Array`     | -                            |
| [`uint8ArrayToString`][api]                                         | ✅     | `bytes/uint8ArrayToString`  | -                            |
| [`stringToUint8Array`][api]                                         | ✅     | `bytes/stringToUint8Array`  | -                            |
| [`concatUint8Arrays`][api]                                          | ✅     | `bytes/concatUint8Arrays`   | Also accepts readonly arrays |
| [`toUint8Array`][api]                                               | ✅     | `bytes/toUint8Array`        | -                            |
| `isUint8Array`, `assertUint8Array`, `assertUint8ArrayOrArrayBuffer` | ⌛     | —                           | Not added yet                |
| `areUint8ArraysEqual`, `compareUint8Arrays`                         | ⌛     | —                           | Not added yet                |
| `indexOf`, `includes`                                               | ⌛     | —                           | Not added yet                |
| `getUintBE`                                                         | ⌛     | —                           | Not added yet                |
| `TypedArray`                                                        | ❌     | `types/TypedArray`          | Covered                      |

[api]: https://github.com/sindresorhus/uint8array-extras#api
