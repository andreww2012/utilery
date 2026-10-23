import type {SnakeCasedPropertiesDeep} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Converts the keys of an object type to snake_case (see `ToSnakeCase`), at any
 * depth, including in arrays.
 * For the top-level keys only, use `ToSnakeCaseKeys`.
 * @example
 * type A = ToSnakeCaseKeysDeep<{userInfo: {userId: number}; userFriends: {userId: number}[]}>;
 * //=> {user_info: {user_id: number}; user_friends: {user_id: number}[]}
 */
export type ToSnakeCaseKeysDeep<
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToWordsOptions = {},
> = SnakeCasedPropertiesDeep<Value, Options>;
