---
'utilery': minor
---

Updated [`string-ts` from v2.3.1 to v2.4.0](https://github.com/gustavoguichard/string-ts/compare/v2.3.1...v2.4.0), which affected:

- `padEnd` and `padStart`:
  - **BREAKING:** the result type is now `` `<original string>${string}` `` for `padEnd` and `` `${string}<original string>` `` for `padStart`, instead of the padded literal, when more than 45 characters are added
- `stringRepeat`:
  - **BREAKING:** the result type is now `string` instead of the repeated literal for a count above 45
  - Big counts no longer fail with the "Type instantiation is excessively deep" error
