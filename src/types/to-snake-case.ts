import type {SnakeCase} from 'type-fest';
import type {ToWordsOptions} from './to-words.ts';

/**
 * Converts a string literal type to snake_case, like `'fooBar'` to
 * `'foo_bar'`.
 * For object keys, use `ToSnakeCaseKeys`.
 * @example
 * type A = ToSnakeCase<'fooBar'>;
 * //=> 'foo_bar'
 * type B = ToSnakeCase<'p2pNetwork', {splitOnNumbers: true}>;
 * //=> 'p_2_p_network'
 */
// eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
export type ToSnakeCase<Value, Options extends ToWordsOptions = {}> = SnakeCase<Value, Options>;
