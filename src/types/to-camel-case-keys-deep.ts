import type {CamelCasedPropertiesDeep} from 'type-fest';
import type {ToCamelCaseOptions} from './to-camel-case.ts';

/**
 * Converts the keys of an object type to camelCase (see `ToCamelCase`), at any
 * depth, including in arrays.
 * For the top-level keys only, use `ToCamelCaseKeys`.
 * @example
 * type A = ToCamelCaseKeysDeep<{UserInfo: {UserId: number}; UserFriends: {UserId: number}[]}>;
 * //=> {userInfo: {userId: number}; userFriends: {userId: number}[]}
 */
export type ToCamelCaseKeysDeep<
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToCamelCaseOptions = {},
> = CamelCasedPropertiesDeep<Value, Options>;
