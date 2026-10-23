import type {TupleOf as TupleOfBase} from 'type-fest';

/**
 * A tuple type of `Length` elements of type `Fill`.
 * The wide `number` type gives an array type, a negative length gives an empty
 * tuple, and a decimal part of the length is ignored.
 * For a readonly tuple, wrap it in `Readonly`.
 * @example
 * type Rgb = TupleOf<3, number>;
 * //=> [number, number, number]
 * type Board = TupleOf<3, TupleOf<3, 'X' | 'O' | null>>;
 * type A = TupleOf<number, string>;
 * //=> string[]
 */
export type TupleOf<Length extends number, Fill = unknown> = TupleOfBase<Length, Fill>;
