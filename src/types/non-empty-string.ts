import type {NonEmptyString as NonEmptyStringBase} from 'type-fest';

/**
 * `T` if it can't be an empty string, otherwise `never`.
 * So `'a'` and `` `a${string}` `` give `T`, while `''`, `string` and
 * `Uppercase<string>` give `never`.
 * Use it in a parameter type to reject empty strings at compile time.
 * @example
 * declare function setName<T extends string>(name: NonEmptyString<T>): void;
 * setName('a');
 * // @ts-expect-error: empty
 * setName('');
 */
export type NonEmptyString<T extends string> = NonEmptyStringBase<T>;
