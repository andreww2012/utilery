import type {IsTuple as IsTupleBase} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

/** Options of `IsTuple` */
export interface IsTupleOptions {
  /**
   * Only counts tuples of a fixed length: a tuple with a rest element, like
   * `[1, ...number[]]`, is not a tuple then.
   * Defaults to `true`
   */
  fixedLengthOnly?: boolean;
}

/**
 * Whether an array type is a tuple.
 * A union of tuples and other arrays gives `boolean`.
 * @example
 * type A = IsTuple<[1, 2?]>;
 * //=> true
 * type B = IsTuple<number[]>;
 * //=> false
 * type C = IsTuple<[1, ...number[]]>;
 * //=> false
 * type D = IsTuple<[1, ...number[]], {fixedLengthOnly: false}>;
 * //=> true
 */
export type IsTuple<
  TArray extends UnknownArray,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends IsTupleOptions = {},
> = IsTupleBase<TArray, Options>;
