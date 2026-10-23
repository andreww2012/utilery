import type {Join} from 'type-fest';

/**
 * Joins the elements of a tuple type into a string literal type with the given
 * delimiter, like `Array.prototype.join`.
 * `null` and `undefined` become empty strings.
 * The type-level counterpart of `arrayJoin`.
 * @example
 * type A = ArrayJoin<['foo', 0, 'baz'], '.'>;
 * //=> 'foo.0.baz'
 * type B = ArrayJoin<['foo', undefined, 'baz'], '.'>;
 * //=> 'foo..baz'
 * type C = ArrayJoin<['prefix', ...string[]], '.'>;
 * //=> `prefix.${string}`
 */
export type ArrayJoin<
  Items extends readonly (string | number | bigint | boolean | undefined | null)[],
  Delimiter extends string,
> = Join<Items, Delimiter>;
