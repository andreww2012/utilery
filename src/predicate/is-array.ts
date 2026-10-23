import {isArray as isArrayBase} from 'remeda';

/**
 * Checks whether a value is an array, like `Array.isArray`, but also narrows readonly arrays.
 *
 * `Array.isArray` narrows to `any[]`, and a readonly array is not assignable to it.
 * So for a `T | readonly T[]` value, it gives `any[]` when `true` and keeps `readonly T[]` when
 * `false`.
 * This guard narrows to the array members of the value's type (or to `readonly unknown[]` if
 * there are none) when `true`, and removes them when `false`.
 * @param data - The value to check.
 * @returns `true` if `data` is an array, `false` otherwise.
 * @example
 * declare const paths: string | readonly string[];
 *
 * if (isArray(paths)) {
 *   paths; // readonly string[]
 * } else {
 *   paths; // string
 * }
 * @example
 * // Mutable arrays and tuples keep their types
 * declare const size: number | [width: number, height: number];
 *
 * const [width, height] = isArray(size) ? size : [size, size];
 * @example
 * // Narrows `unknown` to a readonly array, so its elements can't be modified by mistake
 * declare const value: unknown;
 *
 * if (isArray(value)) {
 *   value; // readonly unknown[]
 * }
 * @example
 * isArray([1, 2, 3]); // true
 * isArray(new Set([1, 2, 3])); // false
 * isArray({length: 0}); // false
 */
// eslint-disable-next-line unicorn/prefer-export-from -- re-declared to attach rewritten JSDoc; an `export ... from` would inherit the upstream docs
export const isArray = isArrayBase;
