# Package: [`puka`](https://npmx.dev/puka)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                                                                                                | Status | Our function group and name | Notes                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------- | ------------------------------------------------------------------------- |
| [`quoteForShell`](https://gitlab.com/rhendric/puka#api-documentation)                                                           | ✅     | `server/quoteShellArgument` | Renamed; options object instead of positional `forceQuote` and `platform` |
| `quoteForCmd`, `quoteForSh`                                                                                                     | ❌     | `server/quoteShellArgument` | Covered: pass `platform`                                                  |
| `sh`, `unquoted`                                                                                                                | ⌛     | —                           | Not added yet                                                             |
| `ShellString`, `ShellStringText`, `ShellStringUnquoted`, `Formatter`, `formatSymbol`, `preformatSymbol`, `shellStringSemicolon` | ❌     | —                           | Building blocks of the `sh` tag                                           |
