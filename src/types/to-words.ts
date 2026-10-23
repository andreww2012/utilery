import type {Words} from 'type-fest';

/** Options of `ToWords` and the case conversion types */
export interface ToWordsOptions {
  /**
   * Splits on numbers too, so that `'p2pNetwork'` gives `'p'`, `'2'`, `'p'` and
   * `'Network'`.
   * Defaults to `true` for `ToWords`, `ToCamelCase` and `ToPascalCase`, and to
   * `false` for the other case conversions
   */
  splitOnNumbers?: boolean;

  /**
   * Splits on punctuation characters too, like `#`, `&`, `:` and `@`, and
   * removes them.
   * Defaults to `false`
   */
  splitOnPunctuation?: boolean;
}

/**
 * Splits a string literal type into a tuple type of its words: at capital
 * letters, spaces, `-` and `_`, and numbers.
 * @example
 * type A = ToWords<'helloWorld'>;
 * //=> ['hello', 'World']
 * type B = ToWords<'--hello the_world'>;
 * //=> ['hello', 'the', 'world']
 * type C = ToWords<'p2pNetwork', {splitOnNumbers: false}>;
 * //=> ['p2p', 'Network']
 * type D = ToWords<'hello:world', {splitOnPunctuation: true}>;
 * //=> ['hello', 'world']
 */
export type ToWords<
  Sentence extends string,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ToWordsOptions = {},
> = Words<Sentence, Options>;
