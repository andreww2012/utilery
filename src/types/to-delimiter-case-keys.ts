import type {DelimiterCasedProperties} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Converts the top-level keys of an object type to lowercase words joined with
 * the given delimiter (see `ToDelimiterCase`).
 * For nested keys too, use `ToDelimiterCaseKeysDeep`.
 * @example
 * type A = ToDelimiterCaseKeys<{userId: number; userName: string}, '.'>;
 * //=> {'user.id': number; 'user.name': string}
 */
export type ToDelimiterCaseKeys<
  Value,
  Delimiter extends string,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToWordsOptions = {},
> = DelimiterCasedProperties<Value, Delimiter, Options>;
