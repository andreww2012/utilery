import type {AllUnionFields as AllUnionFieldsBase} from 'type-fest';

/**
 * Merges a union of object types into one object type with the fields of all
 * of them: a field that some members lack becomes optional, and the type of a
 * shared field is the union of its types.
 * Unlike the union itself, the result lets you read any of the fields.
 * For only the fields that all members have, use `SharedUnionFields`.
 * @example
 * type Cat = {name: string; type: 'cat'; catType: string};
 * type Dog = {name: string; type: 'dog'; dogType: string};
 * type Pet = AllUnionFields<Cat | Dog>;
 * //=> {name: string; type: 'cat' | 'dog'; catType?: string; dogType?: string}
 */
export type AllUnionFields<Union> = AllUnionFieldsBase<Union>;
