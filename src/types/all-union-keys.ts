import type {KeysOfUnion} from 'type-fest';

/**
 * The keys of all members of a union of object types.
 * `keyof` gives only the keys that every member has.
 * @example
 * type Union = {common: string; a: number} | {common: string; b: string};
 * type CommonKeys = keyof Union;
 * //=> 'common'
 * type AllKeys = AllUnionKeys<Union>;
 * //=> 'common' | 'a' | 'b'
 */
export type AllUnionKeys<ObjectType> = KeysOfUnion<ObjectType>;
