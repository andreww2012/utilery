import type {SplitOnRestElement} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

interface ArraySplitOnRestElementOptions {
  /**
   * Keeps the optional modifier (`?`) of elements.
   * When `false`, an optional `T?` becomes `T | undefined`, or `T` with the
   * `exactOptionalPropertyTypes` compiler option.
   * Defaults to `true`
   */
  preserveOptionalModifier?: boolean;
}

/**
 * Splits a tuple type into three tuples: the elements before the rest element,
 * the rest element itself, and the elements after it.
 * A missing part is an empty tuple, and `readonly` is kept.
 * For one of the parts, use `ArrayExtractRestElement` or
 * `ArrayExcludeRestElement`.
 * @example
 * type A = ArraySplitOnRestElement<[number, ...string[], boolean]>;
 * //=> [[number], string[], [boolean]]
 * type B = ArraySplitOnRestElement<[number, string?]>;
 * //=> [[number, string?], [], []]
 * type C = ArraySplitOnRestElement<[number, string?], {preserveOptionalModifier: false}>;
 * //=> [[number, string | undefined], [], []]
 */
export type ArraySplitOnRestElement<
  ArrayType extends UnknownArray,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ArraySplitOnRestElementOptions = {},
> = SplitOnRestElement<ArrayType, Options>;
