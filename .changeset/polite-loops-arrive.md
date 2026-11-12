---
'utilery': minor
---

Updated [`es-toolkit` from v1.53.0 to v1.53.2](https://github.com/toss/es-toolkit/compare/v1.53.0...v1.53.2), which affected:

- `cloneShallow`:
  - The clone of a `DataView` made without a customizer now views the same part of the buffer as the original, instead of the whole buffer
- `reduceAsync`:
  - **BREAKING:** an explicit `undefined` or `null` is now used as the initial value, instead of starting from the first item
- `truncate`:
  - **BREAKING:** with the `separator` option, the string is now cut right at the limit when a match of the separator starts there, instead of before the previous match: `truncate('a b c d e f g', {length: 8, separator: ' '})` is now `'a b c...'` instead of `'a b...'`
  - **BREAKING:** of the adjacent matches of a regex `separator`, the string is now cut before the last one instead of the first one