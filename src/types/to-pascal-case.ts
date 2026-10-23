import type {PascalCase} from 'type-fest';
import type {ToCamelCaseOptions} from './to-camel-case.ts';

/**
 * Converts a string literal type to PascalCase, like `'foo-bar'` to
 * `'FooBar'`.
 * For object keys, use `ToPascalCaseKeys`.
 * @example
 * type A = ToPascalCase<'foo-bar'>;
 * //=> 'FooBar'
 * type B = ToPascalCase<'foo-BAR-baz', {preserveConsecutiveUppercase: true}>;
 * //=> 'FooBARBaz'
 */
export type ToPascalCase<
  Value,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToCamelCaseOptions = {},
> = PascalCase<Value, Options>;
