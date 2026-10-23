import type {Falsy} from './falsy.ts';

/**
 * Removes the falsy members (`false`, `0`, `0n`, `''`, `null`, `undefined`) from
 * `T`, leaving only the values that are truthy in a boolean context.
 * The complement of {@link Falsy}, and the narrowing performed by `isTruthy`.
 *
 * Only falsy *literals* can be removed: `Truthy` narrows `0 | 1` to `1` and
 * `'' | 'a'` to `'a'`, but cannot subtract `0`/`''` from the wide `number`/
 * `string` types, which remain as-is.
 * @example
 * type A = Truthy<0 | 1 | '' | 'a'>; // 1 | 'a'
 * @example
 * type B = Truthy<string | null | undefined>; // string
 */
export type Truthy<T> = Exclude<T, Falsy>;
