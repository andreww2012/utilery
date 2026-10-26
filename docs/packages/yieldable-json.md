# Package: [`yieldable-json`](https://npmx.dev/yieldable-json)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name   | Status | Our function group and name | Notes                                                                                             |
| ---------------------------------- | ------ | --------------------------- | ------------------------------------------------------------------------------------------------- |
| [`parseAsync`][yieldable-json]     | ✅     | `json/jsonParseAsync`       | Promisified, typed; non-blocking `JSON.parse` that yields to the event loop. Optional `intensity` |
| [`stringifyAsync`][yieldable-json] | ✅     | `json/jsonStringifyAsync`   | Promisified, typed; non-blocking `JSON.stringify`. Optional `replacer`/`space`/`intensity`        |

> **Note:** `yieldable-json`'s `ParseError`/`StringifyError` do not extend `Error`, so rejections carry those objects as-is.
> Our bundled copy is [patched](../../patches/yieldable-json.patch) for bugs that its latest release (2.1.0) still has.
> Without the patch, `parseAsync` assigns an undeclared variable and replaces the prototype of an object with a `__proto__` key, and `stringifyAsync` differs from `JSON.stringify` in many cases (`space`, replacers, `toJSON`, control characters, circular references, functions), ignores `intensity` and breaks with concurrent calls.

[yieldable-json]: https://github.com/ibmruntimes/yieldable-json
