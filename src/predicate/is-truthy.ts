import type {Truthy} from '../types/truthy.ts';

/**
 * Checks whether `value` is truthy and acts as a type guard that subtracts the
 * falsy members (`false`, `0`, `0n`, `''`, `null`, `undefined`) from its type.
 * Unlike `array.filter(Boolean)` (whose return type is unchanged), filtering
 * with `isTruthy` narrows the resulting element type.
 *
 * Note that falsy *literals* can only be removed from union types: `isTruthy`
 * narrows `0 | 1` to `1` and `'' | 'a'` to `'a'`, but cannot subtract `''`/`0`
 * from the wide `string`/`number` types, which remain as-is.
 * @param value - The value to test.
 * @returns `true` when `value` is truthy; narrows `value` to its non-falsy type.
 * @example
 * // Filtering narrows the element type (here to `number`)
 * const values: (number | null | undefined)[] = [1, null, 2, undefined];
 * const numbers = values.filter(isTruthy);
 * // numbers: number[] -> [1, 2]
 * @example
 * // Removes falsy literals from a union
 * const flag = 0 as 0 | 1;
 * if (isTruthy(flag)) {
 *   flag; // 1
 * }
 */
export const isTruthy = <T>(value: T): value is Truthy<T> => Boolean(value);
