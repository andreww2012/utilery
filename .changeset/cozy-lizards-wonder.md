---
'utilery': minor
---

Updated [`remeda` from v2.54.1 to v2.60.0](https://github.com/remeda/remeda/compare/v2.54.1...v2.60.0), which affected:

- `arrayDropFirstBy`:
  - **BREAKING:** the same change as in `arrayReverse`, for a `count` of 0 or less
- `arrayNthBy`
- `arrayReverse`:
  - **BREAKING:** the result keeps the empty slots of a sparse array instead of making them `undefined`, and is an instance of the same class for an instance of an `Array` subclass
- `arraySort`:
  - **BREAKING:** the same change as in `arrayReverse`
- `arraySplit`:
  - **BREAKING:** the same change as in `arrayReverse`, for the first part when the predicate matches nothing
- `arraySwapIndexes`:
  - **BREAKING:** the same change as in `arrayReverse`
- `arrayTakeFirstBy`:
  - **BREAKING:** the same change as in `arrayReverse`, for a `count` of the array length or more
- `objectFromKeys`:
  - **BREAKING:** the empty slots of a sparse array are skipped instead of adding an `undefined` key
- `setByPathImmutable`:
  - **BREAKING:** the same change as in `arrayReverse`, for the copies of the arrays on the path