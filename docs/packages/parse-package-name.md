# Package: [`parse-package-name`](https://npmx.dev/parse-package-name)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                              | Status | Our function group and name     | Notes                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------- | ------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`parse`](https://github.com/egoist/parse-package-name#usage) | ✅     | `misc/parseNpmPackageSpecifier` | Renamed; `undefined` for relative, absolute and `node:` specifiers instead of a wrong result or an error; `version` is `undefined` when missing instead of `latest`; `undefined` instead of an `Error` for specifiers missing a part (`@scope`, `lodash@`) |
