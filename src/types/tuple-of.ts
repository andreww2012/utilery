import type {TupleOf as TupleOfBase} from 'type-fest';
import type {GreaterThanOrEqual} from './greater-than-or-equal.ts';

// TypeScript fails to build tuple types of this length or longer ("too large to represent"), and
// the failure can't be detected by a type, as the error is reported where the type is used
type TooLargeTupleLength = 10_000;

// Without the decimal part, which the comparison gets wrong (`12.25` counts as `10000` or more)
// TODO: remove this after updating `type-fest` to a release with the fix:
// https://github.com/sindresorhus/type-fest/commit/cdf0ede656d9899eade7c5d0ec930d07069b26a7
type IntegerPart<Value extends number> =
  `${Value}` extends `${infer Integer extends number}.${string}` ? Integer : Value;

/**
 * A tuple type of `Length` elements of type `Fill`.
 * The wide `number` type gives an array type, a negative length gives an empty
 * tuple, and a decimal part of the length is ignored.
 * A length too large for TypeScript to represent as a tuple (10 000 or more)
 * also gives an array type.
 * For a readonly tuple, wrap it in `Readonly`.
 * @example
 * type Rgb = TupleOf<3, number>;
 * //=> [number, number, number]
 * type Board = TupleOf<3, TupleOf<3, 'X' | 'O' | null>>;
 * type A = TupleOf<number, string>;
 * //=> string[]
 */
export type TupleOf<Length extends number, Fill = unknown> = [Length] extends [never]
  ? TupleOfBase<Length, Fill>
  : Length extends unknown
    ? TupleOfBase<
        GreaterThanOrEqual<IntegerPart<Length>, TooLargeTupleLength> extends true ? number : Length,
        Fill
      >
    : never;
