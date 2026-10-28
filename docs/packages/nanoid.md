# Package: [`nanoid`](https://npmx.dev/nanoid)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

| Original function group and name                                                | Status | Our function group and name | Notes                                                                                                    |
| ------------------------------------------------------------------------------- | ------ | --------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`nanoid`](https://github.com/ai/nanoid#api)                                    | ✅     | `id/nanoid`                 | Consolidates the secure and non-secure generators; `{insecure: true}` opts into the `Math.random` source |
| [`nanoid/non-secure` `nanoid`](https://github.com/ai/nanoid#non-secure)         | ✅     | `id/nanoid`                 | Reached via `nanoid(size, {insecure: true})`                                                             |
| [`customAlphabet`](https://github.com/ai/nanoid#custom-alphabet-or-size)        | ✅     | `id/nanoidFactory`          | Consolidated with `customRandom`; secure/non-secure chosen via options                                   |
| [`nanoid/non-secure` `customAlphabet`](https://github.com/ai/nanoid#non-secure) | ✅     | `id/nanoidFactory`          | Reached via `nanoidFactory(alphabet, size, {insecure: true})`                                            |
| [`customRandom`](https://github.com/ai/nanoid#custom-random-bytes-generator)    | ✅     | `id/nanoidFactory`          | Reached via `nanoidFactory(alphabet, size, {random})`                                                    |
| [`urlAlphabet`](https://github.com/ai/nanoid#custom-alphabet-or-size)           | ✅     | `id/NANOID_URL_ALPHABET`    | Re-exported as a named constant                                                                          |
| [`random`](https://github.com/ai/nanoid#custom-random-bytes-generator)          | ✅     | `misc/randomBytes`          | Secure random-bytes helper; pairs with `nanoidFactory`'s `random` option                                 |

The bundled build resolves nanoid's isomorphic (`crypto.getRandomValues`) implementation via a [local patch](../../patches/nanoid.patch), so every entrypoint, including the main barrel, works in both Node.js and the browser.
