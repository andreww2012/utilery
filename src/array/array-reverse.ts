import {reverse} from 'remeda';
import type {ArrayReverse} from 'type-fest';

/**
 * Returns a new array with the elements of `array` in reverse order, just like
 * `Array.prototype.toReversed`, but preserves the *tuple structure* of the input
 * in the return type: reversing a fixed-length tuple yields a tuple of the same
 * length with its element types reversed, rather than the widened union array
 * native `toReversed()` produces.
 * Regular arrays still reverse to `T[]`.
 *
 * This tuple preservation is the one thing native `array.toReversed()` cannot
 * express (it widens `[1, 'a', true]` to `(1 | 'a' | true)[]`) and the reason this
 * util exists.
 * Unlike `Array.prototype.reverse`, it does not mutate the input.
 * @param array - The array (or tuple) to reverse.
 * Not mutated.
 * @returns A new reversed array, tuple-preserving when the input is a tuple.
 * @example
 * // Regular array: reverses to `T[]`
 * arrayReverse([1, 2, 3]);
 * // [3, 2, 1]
 * @example
 * // Tuple input: the type is the reversed tuple (`readonly [boolean, string, number]`)
 * arrayReverse([1, 'a', true] as const);
 * // [true, 'a', 1]
 */
// Cast to type-fest's `ArrayReverse` (an external named type): remeda's own
// reverse type is mangled by the dts bundler, while a named import survives
export const arrayReverse = <T extends readonly unknown[]>(array: T) =>
  reverse(array) as ArrayReverse<T>;
