import {resolveRandomArguments} from '../_internal/random-integer.ts';

/**
 * Returns a random number (not necessarily an integer) from `minimum`
 * (inclusive) to `maximum` (exclusive).
 * Called with a single number, the range is from `0` to it.
 *
 * Throws an `Error` when `maximum` is not greater than `minimum`.
 * Uses `Math.random` (not cryptographically secure) unless another generator is
 * passed, like a seeded one from `createSeededRandom`.
 * @param minimum - The inclusive lower bound, or the exclusive upper bound when it is the only
 * number.
 * @param maximum - The exclusive upper bound.
 * @param options - Options.
 * @param options.random - A function returning numbers from `0` to `1`, used instead of
 * `Math.random`.
 * @returns A random number within the range.
 * @example
 * random(1.5, 2.5);
 * // e.g. 1.9327
 * random(10);
 * // e.g. 3.1415, from 0 to 10
 * @example
 * // Reproducible
 * random(0, 100, {random: createSeededRandom(1)});
 */
export function random(minimum: number, maximum: number, options?: {random?: () => number}): number;
export function random(maximum: number, options?: {random?: () => number}): number;
export function random(
  minimumOrMaximum: number,
  maximumOrOptions?: number | {random?: () => number},
  options?: {random?: () => number},
) {
  const [minimum, maximum, getRandom = Math.random] = resolveRandomArguments(
    minimumOrMaximum,
    maximumOrOptions,
    options,
  );
  if (minimum >= maximum) {
    throw new Error('Invalid input: The maximum value must be greater than the minimum value.');
  }

  return getRandom() * (maximum - minimum) + minimum;
}
