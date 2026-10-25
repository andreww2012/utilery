---
'utilery': patch
---

Updated [`decode-uri-component` from v0.5.0 to v0.5.1](https://github.com/SamVerschueren/decode-uri-component/compare/v0.5.0...v0.5.1), which affected:

- `decodeUriComponentSafe`:
  - a cut-off `%C2` and the byte order marks `%FE%FF` and `%FF%FE` now become replacement characters (U+FFFD) in any case of hex digits, not only in upper case
