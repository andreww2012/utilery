import type {Primitive as PrimitiveBase} from 'type-fest';

/**
 * A primitive value: `null`, `undefined`, a string, a number, a bigint, a
 * boolean or a symbol.
 * To check a value at runtime, use `isPrimitive`.
 * @example
 * const values: Primitive[] = [null, undefined, 'a', 1, 1n, true, Symbol('id')];
 */
export type Primitive = PrimitiveBase;
