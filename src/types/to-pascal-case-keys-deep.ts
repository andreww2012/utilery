import type {PascalCasedPropertiesDeep} from 'type-fest';
import type {ToCamelCaseOptions} from './to-camel-case.ts';

/**
 * Converts the keys of an object type to PascalCase (see `ToPascalCase`), at any
 * depth, including in arrays.
 * For the top-level keys only, use `ToPascalCaseKeys`.
 * @example
 * type A = ToPascalCaseKeysDeep<{userInfo: {userId: number}; userFriends: {userId: number}[]}>;
 * //=> {UserInfo: {UserId: number}; UserFriends: {UserId: number}[]}
 */
export type ToPascalCaseKeysDeep<
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToCamelCaseOptions = {},
> = PascalCasedPropertiesDeep<Value, Options>;
