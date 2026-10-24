import {isArray} from '../predicate/is-array.ts';
import type {MaybeReadonlyArray} from '../types/maybe-readonly-array.ts';

// Distributes over a union, so its array members keep their own types instead of becoming elements
type ArrayifyEachMember<T, ShouldWrapNullish extends boolean> = T extends null | undefined
  ? ShouldWrapNullish extends true
    ? [T]
    : []
  : T extends readonly unknown[]
    ? T
    : [T];

/**
 * Ensures a value is an array: returns it unchanged when it already is one,
 * wraps it in a single-element array otherwise, and (by default) returns an
 * empty array for nullish input (`null` / `undefined`).
 * Note that this *wraps* rather than *converts*: passing an iterable like a
 * `Set` yields `[set]`, not its spread contents (use `Array.from` for that).
 *
 * Two things make it sharper than a plain cast: precise typing (an existing
 * array, including a tuple, keeps its exact type, any other value widens to
 * `value[]`), and nullish values collapse to `[]` rather than being wrapped as
 * `[null]` / `[undefined]`.
 * Pass `shouldWrapNullish: true` to opt back into wrapping nullish values like
 * any other value.
 *
 * A union mixing arrays with other values is typed member by member: its tuples
 * keep their types, and its other values become single-element tuples.
 * @param value - The value to ensure is an array.
 * @param shouldWrapNullish - When `true`, a nullish `value` is wrapped (`[value]`)
 * like any other value instead of collapsing to `[]`.
 * Defaults to `false`.
 * @returns The original array, a new single-element array wrapping `value`, or
 * an empty array when `value` is nullish and `shouldWrapNullish` is `false`.
 * @example
 * // Wraps a non-array
 * arrayify(1);
 * // [1]
 * @example
 * // Returns an existing array untouched (preserving tuple types)
 * arrayify([1, 2, 3]);
 * // [1, 2, 3]
 * @example
 * // Types each member of a union mixing arrays with other values separately
 * declare const formatter: 'oxfmt' | ['dprint', {language: string}];
 * const [name, options] = arrayify(formatter);
 * // name: 'oxfmt' | 'dprint', options: {language: string} | undefined
 * @example
 * // Wraps rather than converts: a Set is not spread
 * arrayify(new Set([1, 2, 3]));
 * // [Set(3) {1, 2, 3}]
 * @example
 * // Nullish input collapses to an empty array by default
 * arrayify(undefined);
 * // []
 * arrayify(null);
 * // []
 * @example
 * // ...unless `shouldWrapNullish` opts into treating it like any other value
 * arrayify(null, true);
 * // [null]
 * arrayify(undefined, true);
 * // [undefined]
 */
export function arrayify<T extends null | undefined>(value: T, shouldWrapNullish: true): [T];
export function arrayify<T extends readonly unknown[]>(value: T, shouldWrapNullish: true): T;
export function arrayify<T>(
  value: MaybeReadonlyArray<T>,
  shouldWrapNullish: true,
): NonNullable<T>[];
// Comes after the `MaybeReadonlyArray<T>` overload, which catches homogeneous unions first
export function arrayify<T>(value: T, shouldWrapNullish: true): ArrayifyEachMember<T, true>;
export function arrayify(value: null | undefined, shouldWrapNullish?: boolean): [];
export function arrayify<T extends readonly unknown[]>(
  value: T | null | undefined,
  shouldWrapNullish?: boolean,
): T;
export function arrayify<T>(
  value: MaybeReadonlyArray<T> | null | undefined,
  shouldWrapNullish?: boolean,
): NonNullable<T>[];
export function arrayify<T>(value: T, shouldWrapNullish?: boolean): ArrayifyEachMember<T, false>;
export function arrayify(value: unknown, shouldWrapNullish = false): unknown {
  if (value == null) {
    return shouldWrapNullish ? [value] : [];
  }

  return isArray(value) ? value : [value];
}
