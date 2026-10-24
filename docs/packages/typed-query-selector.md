# Package: [`typed-query-selector`](https://npmx.dev/typed-query-selector)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

The package ships no runtime code at all: it is three declaration files.
Its headline feature is a *global* augmentation of `querySelector`, which we cannot apply
unconditionally: our declarations are bundled into every entrypoint, so a `declare global`
would reach consumers who never asked for it.
It is therefore split into opt-in side-effect entrypoints, and the selector parser is
additionally exposed through ordinary functions that need no globals at all.

| Original entrypoint and name       | Status | Our entrypoint and name                          | Notes                                                                                                                                             |
| ---------------------------------- | ------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `parser` → `ParseSelector`         | ✅     | `dom/ElementFromSelector`                        | Renamed after what it resolves to rather than how                                                                                                 |
| `parser` → `StrictlyParseSelector` | ✅     | `dom/ElementFromSelectorStrict`                  | Renamed; resolves a malformed selector to `never` instead of falling back                                                                         |
| `parser` → `TagNameToElement`      | ✅     | `dom/ElementFromTagName`                         | Renamed; bare tag name → element type                                                                                                             |
| `.` (default augmentation)         | ✅     | `utilery/dom/query-selector-typed.global`        | Re-declared against our own types. Ours also emits a real (empty) module, so a plain `import '...'` works without the type-only-import workaround |
| `strict`                           | ✅     | `utilery/dom/query-selector-typed-strict.global` | Same, for the strict parser. Mutually exclusive with the entry above                                                                              |

## Additions

The package has no functions to wrap, so these are ours, built on `ElementFromSelector`.
They give the same selector-driven typing as the augmentations without touching globals, which
makes them usable from library code that must not impose an augmentation on its consumers.

| Our function group and name | Notes                                                                        |
| --------------------------- | ---------------------------------------------------------------------------- |
| `dom/querySelectorTyped`    | Typed `querySelector`, with an optional search root defaulting to `document` |
| `dom/querySelectorAllTyped` | Typed `querySelectorAll` that returns a real array instead of a `NodeList`   |
| `dom/closestTyped`          | Typed `closest`                                                              |

Each also carries `.as<T>()`, which states the element type explicitly for custom elements:
inference cannot reach them, and TypeScript will not let a caller pin one type argument while
inferring another.

## Notes on the strict parser

The strict variant validates the tag names it extracts and the overall shape of the selector:
dangling combinators (`'div#app >'`), stray punctuation (`'div#app ?'`) and identifiers that
cannot begin a tag name (`'123bad'`) all resolve to `never`.
It is deliberately not spec-complete, since a full CSS parser would cost too much
type-checking time: an unterminated attribute bracket (`'div[test'`), for instance, is
dropped during preprocessing and leaves a valid tag behind.
