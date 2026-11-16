import {type RangeInput, isRangeSubset} from 'verkit';

/** Checks whether every version that satisfies one npm-style range also satisfies another */
export const isSemverRangeSubset: {
  /**
   * Checks whether every version that satisfies the npm-style range `subset` also
   * satisfies the range `superset`.
   * A range that no version can satisfy, like `>2 <1`, is a subset of any range.
   *
   * Prereleases follow the npm rules, as in `isSemverInRange`: `>=1.0.0-rc.1` is
   * not a subset of `>=0.5.0`, because `1.0.0-rc.1` satisfies only the former;
   * pass `{includePrerelease: true}` to treat them like any other version.
   * Throws a `TypeError` for an invalid range, unless both ranges are the same
   * string, which gives `true` unchecked.
   * @param subset - The range that may be fully covered by `superset`.
   * @param superset - The range that may cover `subset`.
   * @param options - Options.
   * @param options.includePrerelease - Let prereleases match any range (defaults to `false`).
   * @param options.loose - Accept common syntax mistakes, like a leading `=` (defaults to `false`).
   * @returns `true` if `subset` allows no version that `superset` doesn't, otherwise `false`.
   * @example
   * isSemverRangeSubset('>=9 <11', '<11');
   * // true
   * isSemverRangeSubset('^1.2.0', '^1');
   * // true
   * @example
   * isSemverRangeSubset('~10 || ^11', '<11');
   * // false
   * isSemverRangeSubset('^1', '^1.2.0');
   * // false
   */
  (
    subset: string,
    superset: string,
    options?: {includePrerelease?: boolean; loose?: boolean},
  ): boolean;

  /**
   * Checks whether every version that satisfies the npm-style range `subset` also
   * satisfies the range `superset`, each given as a string or as the object it
   * was already parsed into, which keeps the options it was parsed with.
   * Throws a `TypeError` for an invalid range.
   * @param subset - The range that may be fully covered by `superset`.
   * @param superset - The range that may cover `subset`.
   * @returns `true` if `subset` allows no version that `superset` doesn't, otherwise `false`
   */
  (subset: RangeInput, superset: RangeInput): boolean;
} = isRangeSubset;
