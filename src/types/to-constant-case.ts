import type {ScreamingSnakeCase} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Converts a string literal type to CONSTANT_CASE, like `'fooBar'` to
 * `'FOO_BAR'`.
 * For object keys, use `ToConstantCaseKeys`.
 * @example
 * type A = ToConstantCase<'fooBar'>;
 * //=> 'FOO_BAR'
 * type B = ToConstantCase<'div.card::after', {splitOnPunctuation: true}>;
 * //=> 'DIV_CARD_AFTER'
 */
export type ToConstantCase<
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToWordsOptions = {},
> = ScreamingSnakeCase<Value, Options>;
