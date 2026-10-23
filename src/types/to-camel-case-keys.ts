import type {CamelCasedProperties} from 'type-fest';
import type {ToCamelCaseOptions} from './to-camel-case.ts';

/**
 * Converts the top-level keys of an object type to camelCase (see
 * `ToCamelCase`).
 * For nested keys too, use `ToCamelCaseKeysDeep`.
 * @example
 * type A = ToCamelCaseKeys<{UserId: number; user_name: string}>;
 * //=> {userId: number; userName: string}
 */
export type ToCamelCaseKeys<
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToCamelCaseOptions = {},
> = CamelCasedProperties<Value, Options>;
