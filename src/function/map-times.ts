import {times} from 'es-toolkit/compat';

/**
 * Invokes `iteratee` `count` times, passing the zero-based call index each
 * time, and collects the results into an array.
 * A clearer, intent-revealing alternative to
 * `Array.from({length: count}, (_, index) => ...)`.
 * A `count` of `0` or below yields an empty array.
 * @param count - How many times to invoke `iteratee`.
 * @param iteratee - Called once per index with the current index (`0` to
 * `count - 1`); its return value becomes the corresponding array element.
 * @returns An array of length `max(count, 0)` holding the collected results.
 * @example
 * mapTimes(3, (index) => index * 2);
 * // [0, 2, 4]
 * @example
 * // Build a fixed-size array of a constant value
 * mapTimes(2, () => 'unutils');
 * // ['unutils', 'unutils']
 */
export const mapTimes = <Result>(count: number, iteratee: (index: number) => Result): Result[] =>
  times(count, iteratee);
