# Package: [`write-json-file`](https://npmx.dev/write-json-file)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                                           | Status | Our function group and name   | Notes                                                                                      |
| -------------------------------------------------------------------------- | ------ | ----------------------------- | ------------------------------------------------------------------------------------------ |
| [`writeJsonFile`](https://github.com/sindresorhus/write-json-file#api)     | ✅     | `server/writeJsonFile`        | Indents with 2 spaces (not a tab) and keeps the indentation of an existing file by default |
| [`writeJsonFileSync`](https://github.com/sindresorhus/write-json-file#api) | ✅     | `server/writeJsonFileSync`    | Same                                                                                       |
| `Options`                                                                  | ✅     | `server/WriteJsonFileOptions` | Renamed; declared on our side with our defaults; `replacer` can be a readonly array        |
