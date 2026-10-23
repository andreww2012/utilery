# Package: [`picomatch`](https://npmx.dev/picomatch)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

The `glob` group / `unutils/glob`.

| Original function group and name                                  | Status | Our function group and name | Notes                                                                                                                |
| ----------------------------------------------------------------- | ------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [`makeRe`][api]                                                   | ✅     | `glob/globToRegex`          | Renamed; our own options (`dot`, `caseInsensitive`, `windows`, `matchBasename`); POSIX paths unless `windows` is set |
| [`isMatch`][api]                                                  | ✅     | `glob/isGlobMatch`          | Renamed; same options                                                                                                |
| [`scan`][api]                                                     | ✅     | `glob/isGlobPattern`        | Only its `isGlob` result                                                                                             |
| [`picomatch`][api]                                                | ❌     | `glob/createPathFilter`     | Covered: matchers with include and exclude patterns, which can also be regular expressions                           |
| `test`, `matchBase`, `parse`, `compileRe`, `toRegex`, `constants` | ❌     | -                           | Low-level parts of the matcher                                                                                       |
| `picomatch/posix`                                                 | ❌     | -                           | Paths are POSIX by default already                                                                                   |

[api]: https://github.com/micromatch/picomatch#api
