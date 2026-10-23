---
'unutils': minor
---

Utilities with a newer native counterpart now call it where it is available, with the same results everywhere:

- `mapGetOrInsert` and `mapGetOrInsertComputed` call `Map#getOrInsert` and `Map#getOrInsertComputed`:
  - **BREAKING:** so the `has`, `get` and `set` methods of a `Map` subclass are not called there
- `promiseTry` calls `Promise.try`
- `regexEscape` calls `RegExp.escape`:
  - **BREAKING:** now escapes the same characters as `RegExp.escape`: also `/`, the other ASCII punctuation except `_`, whitespace, line terminators, lone surrogates and a leading ASCII letter or digit. This fixes a `SyntaxError` or a wrong match inside `[...]` with the `v` flag (like `[${regexEscape('a/b')}]` or `[${regexEscape('a&&b')}]`) and right after an escape like `\1` or `\0`
- `uint8ArrayToBase64` and `stringToBase64` call `Uint8Array#toBase64`
- `uint8ArrayToHex` calls `Uint8Array#toHex`
- `base64ToUint8Array` and `base64ToString` call `Uint8Array.fromBase64`:
  - **BREAKING:** now throw a `SyntaxError` instead of a `DOMException`
  - **BREAKING:** now reject incomplete padding (`SGVsbA=`), and always ignore ASCII whitespace (some valid strings with it were rejected)
- `hexToUint8Array` calls `Uint8Array.fromHex`:
  - **BREAKING:** now throws a `SyntaxError` instead of an `Error`
