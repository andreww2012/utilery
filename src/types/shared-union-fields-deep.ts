import type {SharedUnionFieldsDeep as SharedUnionFieldsDeepBase} from 'type-fest';

/** Options of `SharedUnionFieldsDeep` */
export interface SharedUnionFieldsDeepOptions {
  /**
   * Also keeps only the shared fields of the elements of arrays and tuples:
   * when all members are arrays or tuples, the result has the length of the
   * shortest one.
   * Defaults to `false`
   */
  recurseIntoArrays?: boolean;
}

/**
 * Merges a union of object types into one object type with only the fields
 * that all of them have, at any depth.
 * The type of a field is the union of its types.
 * For the top level only, use `SharedUnionFields`.
 * @example
 * type Cat = {info: {name: string; type: 'cat'; catType: string}};
 * type Dog = {info: {name: string; type: 'dog'; dogType: string}};
 * type Pet = SharedUnionFieldsDeep<Cat | Dog>;
 * //=> {info: {name: string; type: 'cat' | 'dog'}}
 */
export type SharedUnionFieldsDeep<
  Union,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends SharedUnionFieldsDeepOptions = {},
> = SharedUnionFieldsDeepBase<Union, Options>;
