import type {LiteralUnion as LiteralUnionBase} from 'type-fest';
import type {Primitive} from './primitive.ts';

/**
 * A union of literal types and a primitive type, like `'dog' | 'cat' | string`,
 * that keeps the autocompletion of the literals in IDEs.
 * TypeScript reduces such a union to the primitive type, so the literals would
 * not be suggested.
 * @example
 * type Pet = LiteralUnion<'dog' | 'cat', string>;
 * const pet: Pet = 'dog'; // 'dog' and 'cat' are suggested
 * const other: Pet = 'parrot'; // any string is accepted
 */
export type LiteralUnion<LiteralType, BaseType extends Primitive> = LiteralUnionBase<
  LiteralType,
  BaseType
>;
