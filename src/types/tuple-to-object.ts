import type {TupleToObject as TupleToObjectBase} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

/**
 * An object type with the indexes of a tuple type as keys and its elements as
 * values.
 * Optional elements give optional keys, and a readonly tuple gives readonly
 * keys.
 * Element labels are lost, as TypeScript does not expose them.
 * A rest element, or an array type that is not a tuple, gives a number index
 * signature.
 * @example
 * type A = TupleToObject<[number, string?]>;
 * //=> {0: number; 1?: string}
 * type B = TupleToObject<readonly [x: number, y: number]>;
 * //=> {readonly 0: number; readonly 1: number}
 * type C = TupleToObject<string[]>;
 * //=> {[x: number]: string}
 */
export type TupleToObject<TArray extends UnknownArray> = TupleToObjectBase<TArray>;
