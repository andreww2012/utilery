import {percentile} from 'es-toolkit/bigint';

/** Returns the value at the given percentile of an array of bigints */
export const bigintPercentile: {
  /**
   * Returns the value at the given percentile of an array of bigints.
   * Uses the nearest-rank method: the result is always one of the values of the
   * array, never a value in between.
   * For numbers, use `percentile`.
   * @param values - The bigints.
   * Not mutated.
   * @param percentile - The percentile, from `0` to `100`.
   * @returns The bigint at the given percentile.
   * @throws {Error} When `percentile` is not a number from `0` to `100`.
   * @throws {RangeError} When `values` is empty.
   * @example
   * bigintPercentile([1n, 2n, 3n, 4n, 5n], 50);
   * // 3n
   * bigintPercentile([1n, 2n, 3n, 4n, 5n], 90);
   * // 5n
   */
  (values: readonly bigint[], percentile: number): bigint;
} = percentile;
