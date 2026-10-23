<!-- cspell:ignore unflatten -->

# Package: [`devalue`](https://npmx.dev/devalue)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name        | Status | Our function group and name                    | Notes                                                                                                                                                                                             |
| --------------------------------------- | ------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`stringify`][devalue]                  | ✅     | `json/structuredStringify`                     | Renamed; keeps `Date`/`Map`/`Set`/`BigInt`/etc. and circular refs. The result is valid JSON text, but it describes the value as a flat list of its parts, so only `structuredParse` reads it back |
| [`stringifyAsync`][devalue]             | ✅     | `json/structuredStringifyAsync`                | Renamed; `structuredStringify` that waits for any promises inside the value and stores what they resolved to. Unlike `jsonStringifyAsync`, it does not yield to the event loop                    |
| [`parse`][devalue]                      | ✅     | `json/structuredParse`                         | Renamed; turns a `structuredStringify` string back into the value it came from. Consolidated with `unflatten`                                                                                     |
| [`unflatten`][devalue]                  | ✅     | `json/structuredParse`                         | Reached by passing the already-`JSON.parse`d payload instead of the string. See the note below                                                                                                    |
| [`DevalueError`][devalue]               | ✅     | `json/StructuredStringifyError`                | Renamed; `value`/`root` typed `unknown`. Thrown by `structuredStringify(Async)` on a value it cannot serialize, carrying the `path` to it                                                         |
| [`defaultStringifyOperations`][devalue] | ✅     | `json/STRUCTURED_STRINGIFY_DEFAULT_OPERATIONS` | Renamed. See the note below                                                                                                                                                                       |
| [`defaultParseOperations`][devalue]     | ✅     | `json/STRUCTURED_PARSE_DEFAULT_OPERATIONS`     | Renamed. See the note below                                                                                                                                                                       |
| [`filterArrayIndices`][devalue]         | ✅     | `json/structuredFilterArrayIndexes`            | Renamed; helper for hand-writing the `indicesOf` operation                                                                                                                                        |
| [`StringifyOptions`][devalue] (type)    | ✅     | `json/StructuredStringifyOptions`              | Renamed                                                                                                                                                                                           |
| [`StringifyOperations`][devalue] (type) | ✅     | `json/StructuredStringifyOperations`           | Renamed                                                                                                                                                                                           |
| [`ParseOptions`][devalue] (type)        | ✅     | `json/StructuredParseOptions`                  | Renamed                                                                                                                                                                                           |
| [`ParseOperations`][devalue] (type)     | ✅     | `json/StructuredParseOperations`               | Renamed                                                                                                                                                                                           |
| `DefaultStringifyOperations` (type)     | ❌     | *(not added)*                                  | Use `typeof STRUCTURED_STRINGIFY_DEFAULT_OPERATIONS`                                                                                                                                              |
| `DefaultParseOperations` (type)         | ❌     | *(not added)*                                  | Use `typeof STRUCTURED_PARSE_DEFAULT_OPERATIONS`                                                                                                                                                  |
| `StringValueTag` / `ViewTag` (types)    | ❌     | *(not added)*                                  | Only appear as parameters of operations, where they are inferred from context                                                                                                                     |
| `TypedArray` (type)                     | ❌     | *(not added)*                                  | Not specific to serialization                                                                                                                                                                     |
| [`uneval`][devalue]                     | ❌     | *(not added)*                                  | Produces JavaScript source code instead of data, so reading it back needs `eval`, niche and easy to misuse                                                                                        |

> **Note on `unflatten`:** `structuredStringify` returns a string that is itself valid JSON: an array listing every part of your value, where the parts refer to each other by index (that indirection is what makes circular references and duplicates work), or a bare number for a few special values like `undefined`.
> `structuredParse` accepts either that string or what `JSON.parse` turns it into.
> The latter is worth something when the serialized value rides inside a larger JSON document, e.g. `{"type": "data", "payload": <structuredStringify output>}`.
> There you can `JSON.parse` the whole document once and pass `payload` straight to `structuredParse`, instead of embedding the payload as an escaped string and parsing it a second time.

> **Note on `operations`:** `structuredStringify`, `structuredStringifyAsync` and `structuredParse` accept an `operations` option that swaps out the individual steps they take: the ways a value is inspected while serializing, and the ways it is built back up while reviving.
> It covers two rare jobs: serializing a value without running any code it owns (getters, proxy traps, patched prototypes), and handling values that live somewhere else entirely: another realm (`node:vm`), a WASM-hosted engine, a separate process.
> Spread the `STRUCTURED_*_DEFAULT_OPERATIONS` constants to override only a few steps.
> The operations types are typed with `any` on purpose: a "value" there may be any opaque handle the custom steps agree on, not necessarily a real JavaScript value.

[devalue]: https://github.com/sveltejs/devalue
