import type {KebabCasedPropertiesDeep} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Converts the keys of an object type to kebab-case (see `ToKebabCase`), at any
 * depth, including in arrays.
 * For the top-level keys only, use `ToKebabCaseKeys`.
 * @example
 * type A = ToKebabCaseKeysDeep<{userInfo: {userId: number}; userFriends: {userId: number}[]}>;
 * //=> {'user-info': {'user-id': number}; 'user-friends': {'user-id': number}[]}
 */
export type ToKebabCaseKeysDeep<
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToWordsOptions = {},
> = KebabCasedPropertiesDeep<Value, Options>;
