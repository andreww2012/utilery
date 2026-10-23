# Package: [`safe-stable-stringify`](https://npmx.dev/safe-stable-stringify)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name     | Status | Our function group and name | Notes                                                                                                                                                                                    |
| ------------------------------------ | ------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`(default)`][safe-stable-stringify] | ✅     | `json/jsonStringifyStable`  | Renamed; deterministic output (recursively sorted keys); circular refs become `"[Circular: N]"`, where `N` is the depth of the referenced ancestor (`0` for the root); supports `bigint` |
| [`configure`][safe-stable-stringify] | 🚧     | *(under consideration)*     | Escape hatch for custom comparator / circular handling, skipped to keep the surface minimal                                                                                              |

[safe-stable-stringify]: https://github.com/BridgeAR/safe-stable-stringify
