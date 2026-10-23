import type {PascalCasedProperties} from 'type-fest';
import type {ToCamelCaseOptions} from './to-camel-case.ts';

/**
 * Converts the top-level keys of an object type to PascalCase (see
 * `ToPascalCase`).
 * For nested keys too, use `ToPascalCaseKeysDeep`.
 * @example
 * type A = ToPascalCaseKeys<{userId: number; user_name: string}>;
 * //=> {UserId: number; UserName: string}
 */
export type ToPascalCaseKeys<
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToCamelCaseOptions = {},
> = PascalCasedProperties<Value, Options>;
