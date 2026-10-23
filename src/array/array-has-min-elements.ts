import {type ArrayRequiredPrefix, hasAtLeast} from 'remeda';
import type {IsNumericLiteral} from 'type-fest';

/**
 * Checks whether `array` contains at least `minimum` elements.
 * When `minimum` is a literal number, this acts as a **type guard** that
 * narrows the array to one with that many guaranteed (required) leading
 * elements, so indexing the first `minimum` positions afterwards is type-safe.
 * A non-literal `minimum` simply returns a `boolean`.
 * @param array - The array (or tuple) to check.
 * Not mutated.
 * @param minimum - The minimum number of elements.
 * Pass a literal for the type-guard narrowing.
 * @returns `true` when `array.length >= minimum`; narrows the array type when `minimum` is a
 * literal.
 * @example
 * // Type guard: narrows to a known-minimum tuple
 * const values: number[] = [1, 2, 3];
 * if (arrayHasMinElements(values, 2)) {
 *   values[0].toFixed(); // `values` is now `[number, number, ...number[]]`
 * }
 * @example
 * // Plain boolean for a non-literal minimum
 * arrayHasMinElements([1, 2, 3], someCount);
 */
export function arrayHasMinElements<T extends readonly unknown[], N extends number>(
  // The `| readonly unknown[]` makes the predicate (always some array) assignable
  // to the parameter while `T` still infers from the argument, as remeda does
  array: T | readonly unknown[],
  minimum: IsNumericLiteral<N> extends true ? N : never,
): array is ArrayRequiredPrefix<T, N>;
export function arrayHasMinElements(array: readonly unknown[], minimum: number): boolean;
export function arrayHasMinElements(array: readonly unknown[], minimum: number): boolean {
  return hasAtLeast(array, minimum);
}
