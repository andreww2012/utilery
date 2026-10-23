import type {KebabCasedProperties} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Converts the top-level keys of an object type to kebab-case (see
 * `ToKebabCase`).
 * For nested keys too, use `ToKebabCaseKeysDeep`.
 * @example
 * type A = ToKebabCaseKeys<{userId: number; userName: string}>;
 * //=> {'user-id': number; 'user-name': string}
 */
export type ToKebabCaseKeys<
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToWordsOptions = {},
> = KebabCasedProperties<Value, Options>;
