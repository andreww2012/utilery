<!-- cspell:ignore uncapitalize delimiterkeys constantkeys pascalkeys kebabkeys camelkeys snakekeys -->

# Package: [`string-ts`](https://npmx.dev/string-ts)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

[`string-ts`][string-ts] provides string helpers whose result **type** tracks the runtime value (e.g. `toCamelCase('foo-bar')` is typed `'fooBar'`, not `string`).
Where `es-toolkit` already ships a Unicode-aware runtime for the same operation, we keep that runtime and layer `string-ts`'s literal type on top: its own runtime is ASCII-only and mangles accented/CJK input.
The pure `String.prototype` wrappers re-export `string-ts` directly (their runtime **is** the native method, so it stays Unicode-safe).

| Original function and name          | Status | Our function group and name      | Notes                                                                                                            |
| ----------------------------------- | ------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `camelCase` / `toCamelCase`         | ✅     | `string/toCamelCase`             | Renamed; es-toolkit runtime + `string-ts` `CamelCase` type                                                       |
| `kebabCase` / `toKebabCase`         | ✅     | `string/toKebabCase`             | Renamed; es-toolkit runtime + `KebabCase` type                                                                   |
| `snakeCase` / `toSnakeCase`         | ✅     | `string/toSnakeCase`             | Renamed; es-toolkit runtime + `SnakeCase` type                                                                   |
| `pascalCase` / `toPascalCase`       | ✅     | `string/toPascalCase`            | Renamed; es-toolkit runtime + `PascalCase` type                                                                  |
| `constantCase` / `toConstantCase`   | ✅     | `string/toConstantCase`          | Renamed; es-toolkit runtime + `ConstantCase` type                                                                |
| `delimiterCase` / `toDelimiterCase` | ✅     | `string/toDelimiterCase`         | **New**; es-toolkit `words().join()` runtime (case-preserving) + `DelimiterCase` type                            |
| `titleCase` / `toTitleCase`         | ✅     | `string/toTitleCase`             | Already provided (via `remeda`, with options)                                                                    |
| `lowerCase`                         | ✅     | `string/toLowerCase`             | Renamed; space-joined lower-case words                                                                           |
| `upperCase`                         | ✅     | `string/toUpperCase`             | Renamed; space-joined UPPER-case words                                                                           |
| `toLowerCase`                       | ❌     | *(not added)*                    | Native `.toLowerCase()`; the name is taken by the word-splitting variant and TS's `Lowercase<T>` covers the type |
| `toUpperCase`                       | ❌     | *(not added)*                    | Native `.toUpperCase()`; see above (`Uppercase<T>`)                                                              |
| `capitalize`                        | ✅     | `string/upperFirst`              | Equivalent (first char only); es-toolkit's `capitalize` (lowercases the rest) stays as `string/capitalize`       |
| `uncapitalize`                      | ✅     | `string/lowerFirst`              | Equivalent (first char only)                                                                                     |
| `charAt`                            | ✅     | `string/charAt`                  | Typed `String#charAt`                                                                                            |
| `slice`                             | ✅     | `string/stringSlice`             | Renamed typed `String#slice`                                                                                     |
| `concat`                            | ✅     | `string/stringConcat`            | Renamed typed `String#concat`                                                                                    |
| `startsWith`                        | ✅     | `string/startsWith`              | Typed `String#startsWith`                                                                                        |
| `endsWith`                          | ✅     | `string/endsWith`                | Typed `String#endsWith`                                                                                          |
| `includes`                          | ✅     | `string/stringIncludes`          | Renamed typed `String#includes`                                                                                  |
| `length`                            | ✅     | `string/stringLength`            | Renamed typed `.length`                                                                                          |
| `padStart`                          | ✅     | `string/padStart`                | Typed `String#padStart`                                                                                          |
| `padEnd`                            | ✅     | `string/padEnd`                  | Typed `String#padEnd`                                                                                            |
| `repeat`                            | ✅     | `string/stringRepeat`            | Renamed typed `String#repeat`                                                                                    |
| `replace`                           | ✅     | `string/replace`                 | Typed `String#replace`                                                                                           |
| `replaceAll`                        | ✅     | `string/replaceAll`              | Typed `String#replaceAll`                                                                                        |
| `trim`                              | ✅     | `string/trim`                    | Typed `String#trim`                                                                                              |
| `trimStart`                         | ✅     | `string/trimStart`               | Typed `String#trimStart`                                                                                         |
| `trimEnd`                           | ✅     | `string/trimEnd`                 | Typed `String#trimEnd`                                                                                           |
| `reverse`                           | ✅     | `string/stringReverse`           | es-toolkit grapheme-safe runtime + `string-ts` `Reverse` type                                                    |
| `split`                             | ❌     | *(not added)*                    | Covered by `string/stringSplit` (`ts-extras`), already literal-typed                                             |
| `join`                              | ❌     | *(not added)*                    | Covered by `array/arrayJoin` (`ts-extras`), already literal-typed                                                |
| `words`                             | ✅     | `string/toWords`                 | es-toolkit runtime + `string-ts` `Words` type                                                                    |
| `truncate`                          | ❌     | *(not added)*                    | Covered by `string/truncate` (`es-toolkit/compat`), richer options                                               |
| `camelKeys`                         | ✅     | `object/toCamelCaseKeys`         | Shallow                                                                                                          |
| `snakeKeys`                         | ✅     | `object/toSnakeCaseKeys`         | Shallow                                                                                                          |
| `kebabKeys`                         | ✅     | `object/toKebabCaseKeys`         | Shallow                                                                                                          |
| `pascalKeys`                        | ✅     | `object/toPascalCaseKeys`        | Shallow                                                                                                          |
| `constantKeys`                      | ✅     | `object/toConstantCaseKeys`      | Shallow                                                                                                          |
| `delimiterKeys`                     | ✅     | `object/toDelimiterCaseKeys`     | Shallow; takes a delimiter                                                                                       |
| `deepCamelKeys`                     | ✅     | `object/toCamelCaseKeysDeep`     | Deep; es-toolkit runtime (Unicode-aware). Existing `toCamelCaseKeys` renamed to free the shallow name            |
| `deepSnakeKeys`                     | ✅     | `object/toSnakeCaseKeysDeep`     | Deep; es-toolkit runtime (Unicode-aware)                                                                         |
| `deepKebabKeys`                     | ✅     | `object/toKebabCaseKeysDeep`     | Deep; es-toolkit runtime (Unicode-aware, keeps class instances as-is)                                            |
| `deepPascalKeys`                    | ✅     | `object/toPascalCaseKeysDeep`    | Deep; es-toolkit runtime (Unicode-aware, keeps class instances as-is)                                            |
| `deepConstantKeys`                  | ✅     | `object/toConstantCaseKeysDeep`  | Deep; es-toolkit runtime (Unicode-aware, keeps class instances as-is)                                            |
| `deepDelimiterKeys`                 | ✅     | `object/toDelimiterCaseKeysDeep` | Deep; takes a delimiter                                                                                          |
| `replaceKeys`                       | ✅     | `object/replaceKeys`             | Shallow substring replacement on keys                                                                            |
| `deepTransformKeys`                 | ✅     | `object/transformKeysDeep`       | Renamed; deep `(key) => key` mapper                                                                              |

**Types.** Each utility above already returns the precise type, so `string-ts`'s types are consumed implicitly: they are not re-exported as standalone types.
Exceptions and rationale:

- **Net-new, added to `unutils/types`**: `ToConstantCaseKeys`, `ToConstantCaseKeysDeep` (renamed from `ConstantKeys` / `DeepConstantKeys`), completing the `To*CaseKeys` family, which `type-fest` provides for every case except constant.
- **Already provided by `type-fest`** under `unutils/types`: the case types (`CamelCase` → `ToCamelCase`, etc.), `Words` → `ToWords`, `Trim`, `Replace`, `Split` → `StringSplit`, `Join` → `ArrayJoin`, `Slice` → `StringSlice`, `Repeat` → `StringRepeat`, and the `*Keys` / `Deep*Keys` families → `To*CaseKeys` / `To*CaseKeysDeep`.
- **Not re-exported** (the runtime utility already returns the precise type, and these aren't useful enough at the pure type level to warrant a standalone export, and `type-fest` ships none of them either): `CharAt`, `Concat`, `StartsWith`, `EndsWith`, `Includes`, `Length`, `PadStart`, `PadEnd`, `ReplaceAll`, `Reverse`, `TrimStart`, `TrimEnd`, `ReplaceKeys`.
- **Not added**: `TitleCase` (the `toTitleCase` util already yields the precise type), `Truncate` (util not added), and the low-level char-class helpers `Digit(s)`, `Letter(s)`, `LowerLetter(s)`, `UpperLetter(s)`, `Separator(s)`, `IsDigit`, `IsLetter`, `IsLower`, `IsUpper`, `IsSeparator`, `IsSpecial` (`type-fest` already ships `LowercaseLetter` / `UppercaseLetter` / `DigitCharacter` and `IsLowercase` / `IsUppercase` for the common cases).

[string-ts]: https://github.com/gustavoguichard/string-ts
