import type {RandomInteger} from 'remeda';
import type {Subtract} from 'type-fest';
import {randomInteger, resolveRandomArguments} from '../_internal/random-integer.ts';

/**
 * Returns a pseudo-random integer in the **exclusive** range `[minimum, maximum)`.
 * Called with a single argument the range is `[0, maximum)`, the form used for
 * random array indexing (`array[randomIntExclusive(array.length)]`).
 * When both bounds are small numeric literals the return type narrows to the
 * precise literal union of possible results; otherwise `number`.
 *
 * The upper bound is excluded, matching array indexing and the `nextInt(n)`
 * convention of Java/Go/Ruby.
 * For an inclusive upper bound use `randomIntInclusive`.
 * Uses `Math.random` (not cryptographically secure) unless another generator is
 * passed, like a seeded one from `createSeededRandom`.
 * The range must be non-empty (`maximum` greater than `minimum`, or `maximum`
 * greater than `0` for the single-argument form).
 * @param minimum - The inclusive lower bound.
 * When called with a single argument this slot is the exclusive upper bound instead and the lower
 * bound defaults to `0`.
 * @param maximum - The exclusive upper bound.
 * @param options - Options.
 * @param options.random - A function returning numbers from `0` to `1`, used instead of
 * `Math.random`.
 * @returns A random integer within the exclusive range.
 * @example
 * randomIntExclusive(1, 4);
 * // 1 | 2 | 3 (e.g. 2)
 * @example
 * // Single argument: range is [0, maximum); ideal for array indexing
 * randomIntExclusive(3);
 * // 0 | 1 | 2 (e.g. 1)
 */
export function randomIntExclusive<Minimum extends number, Maximum extends number>(
  minimum: Minimum,
  maximum: Maximum,
  options?: {random?: () => number},
): RandomInteger<Minimum, Subtract<Maximum, 1>>;
export function randomIntExclusive<Maximum extends number>(
  maximum: Maximum,
  options?: {random?: () => number},
): RandomInteger<0, Subtract<Maximum, 1>>;
export function randomIntExclusive(
  minimumOrMaximum: number,
  maximumOrOptions?: number | {random?: () => number},
  options?: {random?: () => number},
) {
  const [minimum, maximum, getRandom] = resolveRandomArguments(
    minimumOrMaximum,
    maximumOrOptions,
    options,
  );
  return randomInteger(minimum, maximum - 1, getRandom);
}
