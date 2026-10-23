import type {JsonPrimitive as JsonPrimitiveBase} from 'type-fest';

/**
 * A JSON primitive: a string, a number, a boolean or `null`.
 * @example
 * const values: JsonPrimitive[] = ['a', 1, true, null];
 */
export type JsonPrimitive = JsonPrimitiveBase;
