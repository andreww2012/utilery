import type {CamelCase} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Options of `ToCamelCase`, `ToPascalCase`, `ToCamelCaseKeys`, `ToPascalCaseKeys` and their deep
 * versions
 */
export interface ToCamelCaseOptions extends ToWordsOptions {
  /**
   * Keeps runs of uppercase letters, so that `'foo-BAR-baz'` gives
   * `'fooBARBaz'` instead of `'fooBarBaz'`.
   * Defaults to `false`
   */
  preserveConsecutiveUppercase?: boolean;

  /**
   * Keeps underscores at the start, so that `'_foo_bar'` gives `'_fooBar'`.
   * Defaults to `false`
   */
  preserveLeadingUnderscores?: boolean;
}

/**
 * Converts a string literal type to camelCase, like `'foo-bar'` to `'fooBar'`.
 * For object keys, use `ToCamelCaseKeys`.
 * @example
 * type A = ToCamelCase<'foo-bar'>;
 * //=> 'fooBar'
 * type B = ToCamelCase<'foo-BAR-baz', {preserveConsecutiveUppercase: true}>;
 * //=> 'fooBARBaz'
 */
export type ToCamelCase<
  Type,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToCamelCaseOptions = {},
> = CamelCase<Type, Options>;
