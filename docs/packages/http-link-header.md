<!-- cspell:ignore Occurence -->

# Package: [`http-link-header`](https://npmx.dev/http-link-header)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

The `http` group / `unutils/http`.

| Original function group and name                                                                                                                                                                              | Status | Our function group and name | Notes                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Link.parse`](https://github.com/jhermsmeier/node-http-link-header#usage)                                                                                                                                    | ✅     | `http/parseLinkHeader`      | Gives the list of links (`refs`); an empty list for a missing or invalid header instead of throwing; typed with an optional `rel` and decoded `name*` parameters, which the package types as strings |
| `Link` class (`rel`, `get`, `has`, `set`, `setUnique`, `toString`)                                                                                                                                            | ⌛     | -                           | Not added yet; use `Array#filter` and `Array#find` on the list                                                                                                                                       |
| `Link.isCompatibleEncoding`, `Link.isSingleOccurenceAttr`, `Link.isTokenAttr`, `Link.escapeQuotes`, `Link.expandRelations`, `Link.parseExtendedValue`, `Link.formatExtendedAttribute`, `Link.formatAttribute` | ❌     | -                           | Internals of the parser and the formatter                                                                                                                                                            |
