---
'utilery': minor
---

Updated [`safe-stable-stringify` from v2.5.0 to v3.0.0](https://github.com/BridgeAR/safe-stable-stringify/compare/v2.5.0...v3.0.0), which affected:

- `jsonStringifyStable`:
  - **BREAKING:** now replaces circular references with `"[Circular: N]"` instead of `"[Circular]"`, where `N` is the depth of the referenced ancestor (`0` for the root)