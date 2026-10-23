import type {DelimiterCase} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Converts a string literal type to lowercase words joined with the given
 * delimiter, like `'fooBar'` to `'foo#bar'`.
 * For object keys, use `ToDelimiterCaseKeys`.
 * @example
 * type A = ToDelimiterCase<'fooBar', '#'>;
 * //=> 'foo#bar'
 * type B = ToDelimiterCase<'p2pNetwork', '#', {splitOnNumbers: true}>;
 * //=> 'p#2#p#network'
 */
export type ToDelimiterCase<
  Value,
  Delimiter extends string,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToWordsOptions = {},
> = DelimiterCase<Value, Delimiter, Options>;
