import type {IsNumericLiteral} from 'type-fest';
import type {ArrayWithMaxLength} from '../types/array-with-max-length.ts';

/**
 * Checks whether `array` contains at most `maximum` elements.
 * When `maximum` is a literal number, this acts as a **type guard** that narrows the array to the
 * union of every length it can still have, so a `switch` on `length` afterwards is exhaustive, and
 * an array that can never be that short narrows to `never`.
 * A non-literal `maximum` simply returns a `boolean`.
 * @param array - The array (or tuple) to check.
 * Not mutated.
 * @param maximum - The maximum number of elements.
 * Pass a literal for the type-guard narrowing.
 * @returns `true` when `array.length <= maximum`; narrows the array type when `maximum` is a
 * literal.
 * @example
 * // Type guard: narrows to the lengths that remain possible
 * const values: number[] = [1, 2];
 * if (arrayHasMaxElements(values, 2)) {
 *   values; // `[] | [number] | [number, number]`
 * }
 * @example
 * // Positions keep their types; impossible shapes drop out
 * const pair: [string, ...number[]] = ['a', 1];
 * if (arrayHasMaxElements(pair, 2)) {
 *   pair; // `[string] | [string, number]`
 * }
 * @example
 * // Plain boolean for a non-literal maximum
 * arrayHasMaxElements([1, 2, 3], someCount);
 */
export function arrayHasMaxElements<T extends readonly unknown[], N extends number>(
  // The `| readonly unknown[]` makes the predicate (always some array) assignable
  // to the parameter while `T` still infers from the argument
  array: T | readonly unknown[],
  maximum: IsNumericLiteral<N> extends true ? N : never,
): array is ArrayWithMaxLength<T, N>;
export function arrayHasMaxElements(array: readonly unknown[], maximum: number): boolean;
export function arrayHasMaxElements(array: readonly unknown[], maximum: number): boolean {
  return array.length <= maximum;
}
