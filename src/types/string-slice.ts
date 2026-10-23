import type {StringSlice as StringSliceBase} from 'type-fest';

/**
 * A part of a string literal type from `Start` (inclusive) to `End`
 * (exclusive), like `String.prototype.slice` does at runtime.
 * Negative indexes count from the end.
 * Leave out `End` to slice to the end.
 * For tuples, use `ArraySlice`.
 * @example
 * type A = StringSlice<'hello world', 0, 5>;
 * //=> 'hello'
 * type B = StringSlice<'hello world', 6>;
 * //=> 'world'
 * type C = StringSlice<'hello world', -5>;
 * //=> 'world'
 */
export type StringSlice<
  S extends string,
  Start extends number = never,
  End extends number = never,
> = StringSliceBase<S, Start, End>;
