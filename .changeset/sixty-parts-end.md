---
'utilery': minor
---

Updated [`es-toolkit` from v1.52.0 to v1.53.0](https://github.com/toss/es-toolkit/compare/v1.52.0...v1.53.0), which affected:

- `assignDefaults`:
  - with `{copy: true}`, copies the target like it does with `{copy: true, deep: true}`, so a target with a `null` prototype keeps it
- `ceil`
- `deburr`:
  - **BREAKING:** keeps letters of scripts other than Latin, like Cyrillic, Greek and Hangul, as they are, even with diacritical marks: `deburr('й')` gives `'й'` instead of `'и'`
- `findObjectKey`:
  - types keys as `Object.keys` gives them: numeric keys as strings, without symbol keys
- `floor`
- `freezeDeep`
- `interpolate`:
  - returns exactly `max` when `t` is `1`, which rounding errors could break before
- `isObjectMatching`
- `mapKeys`
- `mapRange`:
  - maps the end of the input range to exactly the end of the output range
- `mergeDeep`
- `omit`:
  - shares the other values with the input when it removes a key whose name looks like a path (like `'a.b'`), as it does for other keys, instead of copying them
- `once`
- `orderBy`
- `pick`
- `sortBy`
- `truncate`

Added utilities from the new release:

- `toSentenceCase` ([`sentenceCase`](https://es-toolkit.dev/reference/string/sentenceCase.html))
- `interpolateInverse` ([`inverseLerp`](https://es-toolkit.dev/reference/math/inverseLerp.html))
- `serializeStable` ([`serialize`](https://es-toolkit.dev/reference/util/serialize.html)), which escapes quotes in strings, so they can't make different values give the same string
- `Queue` ([`Queue`](https://es-toolkit.dev/reference/util/Queue.html))
- `formatQueryString` ([`stringify`](https://es-toolkit.dev/reference/query-string/stringify.html))
