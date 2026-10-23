# Package: [`which`](https://npmx.dev/which)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                        | Status | Our function group and name | Notes                                                                                            |
| ------------------------------------------------------- | ------ | --------------------------- | ------------------------------------------------------------------------------------------------ |
| [`which`](https://github.com/npm/node-which#usage)      | ✅     | `server/findExecutable`     | Renamed; gives `undefined` (an empty array with `all`) instead of throwing when nothing is found |
| [`which.sync`](https://github.com/npm/node-which#usage) | ✅     | `server/findExecutableSync` | Same                                                                                             |

> **Note:** Our bundled copy is [patched](../../patches/which.patch) for a bug that its latest release (7.0.0) still has.
> Without the patch, `all: true` gives each match twice on Windows.
