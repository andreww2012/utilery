# Package: [`split-string`](https://npmx.dev/split-string)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                               | Status | Our function group and name | Notes                                                                                                                                                                                                                 |
| -------------------------------------------------------------- | ------ | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`split`](https://github.com/jonschlinkert/split-string#usage) | ✅     | `string/splitOutsideQuotes` | Renamed; separator as an argument, quotes and `()`, `[]`, `{}` brackets respected by default; no custom `keep` function; a `TypeError` for a separator that is not a single UTF-16 code unit, which would never match |
