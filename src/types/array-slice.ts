import type {ArraySlice as ArraySliceBase} from 'type-fest';

/**
 * A part of a tuple type from `Start` (inclusive) to `End` (exclusive), like
 * `Array.prototype.slice`.
 * Negative indexes count from the end.
 * Leave out `End` to slice to the end, and both to copy the tuple.
 * @example
 * type A = ArraySlice<[0, 1, 2, 3, 4], 1, -2>;
 * //=> [1, 2]
 * type B = ArraySlice<[0, 1, 2, 3, 4], -2>;
 * //=> [3, 4]
 */
export type ArraySlice<
  ArrayType extends readonly unknown[],
  Start extends number = never,
  End extends number = never,
> = ArraySliceBase<ArrayType, Start, End>;
