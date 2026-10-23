import type {DelimiterCasedPropertiesDeep} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Converts the keys of an object type to lowercase words joined with the given
 * delimiter (see `ToDelimiterCase`), at any depth, including in arrays.
 * For the top-level keys only, use `ToDelimiterCaseKeys`.
 * @example
 * type A = ToDelimiterCaseKeysDeep<{userInfo: {userId: number}}, '.'>;
 * //=> {'user.info': {'user.id': number}}
 */
export type ToDelimiterCaseKeysDeep<
  Value,
  Delimiter extends string,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToWordsOptions = {},
> = DelimiterCasedPropertiesDeep<Value, Delimiter, Options>;
