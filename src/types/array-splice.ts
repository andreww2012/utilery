import type {ArraySplice as ArraySpliceBase} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

/**
 * A tuple type with `DeleteCount` elements removed from index `Start` and
 * `Items` inserted there, like `Array.prototype.splice` does at runtime.
 * @example
 * type A = ArraySplice<['January', 'April'], 1, 0, ['February', 'March']>;
 * //=> ['January', 'February', 'March', 'April']
 * type B = ArraySplice<['January', 'Foo', 'April'], 1, 1>;
 * //=> ['January', 'April']
 */
export type ArraySplice<
  T extends UnknownArray,
  Start extends number,
  DeleteCount extends number,
  Items extends UnknownArray = [],
> = ArraySpliceBase<T, Start, DeleteCount, Items>;
