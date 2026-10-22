# Package: [`path-type`](https://npmx.dev/path-type)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name | Status | Our function group and name | Notes                                                                              |
| -------------------------------- | ------ | --------------------------- | ---------------------------------------------------------------------------------- |
| [`isFile`][api]                  | ✅     | `server/isFile`             | Also `false` for a path going through a file (`ENOTDIR`), like `server/pathExists` |
| [`isDirectory`][api]             | ✅     | `server/isDirectory`        | Same                                                                               |
| [`isSymlink`][api]               | ✅     | `server/isSymlink`          | Same                                                                               |
| [`isFileSync`][api]              | ✅     | `server/isFileSync`         | Same                                                                               |
| [`isDirectorySync`][api]         | ✅     | `server/isDirectorySync`    | Same                                                                               |
| [`isSymlinkSync`][api]           | ✅     | `server/isSymlinkSync`      | Same                                                                               |

[api]: https://github.com/sindresorhus/path-type#api
