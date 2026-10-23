import type {SharedUnionFields as SharedUnionFieldsBase} from 'type-fest';

/**
 * Merges a union of object types into one object type with only the fields
 * that all of them have.
 * The type of a field is the union of its types.
 * For nested fields too, use `SharedUnionFieldsDeep`.
 * For all the fields, use `AllUnionFields`.
 * @example
 * type Cat = {name: string; type: 'cat'; catType: string};
 * type Dog = {name: string; type: 'dog'; dogType: string};
 * type Pet = SharedUnionFields<Cat | Dog>;
 * //=> {name: string; type: 'cat' | 'dog'}
 */
export type SharedUnionFields<Union> = SharedUnionFieldsBase<Union>;
