import type {SnakeCasedProperties} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Converts the top-level keys of an object type to snake_case (see
 * `ToSnakeCase`).
 * For nested keys too, use `ToSnakeCaseKeysDeep`.
 * @example
 * type A = ToSnakeCaseKeys<{userId: number; userName: string}>;
 * //=> {user_id: number; user_name: string}
 */
export type ToSnakeCaseKeys<
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToWordsOptions = {},
> = SnakeCasedProperties<Value, Options>;
