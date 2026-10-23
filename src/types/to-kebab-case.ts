import type {KebabCase} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Converts a string literal type to kebab-case, like `'fooBar'` to
 * `'foo-bar'`.
 * For object keys, use `ToKebabCaseKeys`.
 * @example
 * type A = ToKebabCase<'fooBar'>;
 * //=> 'foo-bar'
 * type B = ToKebabCase<'div.card::after', {splitOnPunctuation: true}>;
 * //=> 'div-card-after'
 */
// eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
export type ToKebabCase<Value, Options extends ToWordsOptions = {}> = KebabCase<Value, Options>;
