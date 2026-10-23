# Package: [`verkit`](https://npmx.dev/verkit)

> **Legend:** ✅ added · ❌ not added (see notes) · 🚧 under consideration · ⌛ planned

Semantic versions and npm-style ranges, following the rules of `node-semver`.

| Original function group and name                                                                                   | Status | Our function group and name | Notes                                                         |
| ------------------------------------------------------------------------------------------------------------------ | ------ | --------------------------- | ------------------------------------------------------------- |
| [`compare`][docs]                                                                                                  | ✅     | `semver/compareSemver`      | Renamed                                                       |
| [`satisfies`][docs]                                                                                                | ✅     | `semver/isSemverInRange`    | Renamed                                                       |
| [`isValid`][docs]                                                                                                  | ✅     | `semver/isValidSemver`      | Renamed                                                       |
| [`tryParse`][docs]                                                                                                 | ✅     | `semver/parseSemver`        | Renamed; `undefined` instead of `null` for an invalid version |
| [`SemVer`][docs]                                                                                                   | ✅     | `semver/ParsedSemver`       | Renamed                                                       |
| `parse`                                                                                                            | ❌     | `semver/parseSemver`        | Covered: throws instead of returning `undefined`              |
| `compareReversed`, `compareMain`, `comparePrerelease`, `compareBuild`, `compareWithOperator`                       | ⌛     | -                           | Not added yet                                                 |
| `isEqual`, `isNotEqual`, `isGreaterThan`, `isGreaterThanOrEqual`, `isLessThan`, `isLessThanOrEqual`                | ⌛     | -                           | Not added yet; `compareSemver(a, b) > 0` and so on            |
| `sort`, `sortReversed`                                                                                             | ⌛     | -                           | Not added yet; `toSorted(compareSemver)`                      |
| `compareIdentifiers`, `compareIdentifiersReversed`                                                                 | ⌛     | -                           | Not added yet                                                 |
| `isPrerelease`, `isStable`, `normalize`, `normalizeFull`, `clean`, `coerce`, `increment`, `truncate`, `difference` | ⌛     | -                           | Not added yet                                                 |
| `getMajor`, `getMinor`, `getPatch`, `getPrerelease`, `getBuild`                                                    | ⌛     | -                           | Not added yet; read the result of `parseSemver`               |
| `parseRange`, `tryParseRange`, `isValidRange`, `normalizeRange`, `simplifyRange`, `rangeToComparators`             | ⌛     | -                           | Not added yet                                                 |
| `findMaxSatisfying`, `findMinSatisfying`, `findMinimumForRange`                                                    | ⌛     | -                           | Not added yet                                                 |
| `isOutsideRange`, `isGreaterThanRange`, `isLessThanRange`, `rangesIntersect`, `isRangeSubset`                      | ⌛     | -                           | Not added yet                                                 |
| `parseComparator`, `tryParseComparator`, `normalizeComparator`, `satisfiesComparator`, `comparatorsIntersect`      | ⌛     | -                           | Not added yet                                                 |
| `SEMVER_SPEC_VERSION`, `INCREMENT_TYPES`, `TRUNCATION_TYPES` and the other types                                   | ⌛     | -                           | Not added yet                                                 |

[docs]: https://npmx.dev/package-docs/verkit
