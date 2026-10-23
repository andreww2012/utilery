import type {ExtractStrict as ExtractStrictBase} from 'type-fest';

/**
 * `Extract`, but every member of `U` must keep something of `T`, so that a typo
 * or an outdated member is a compile error.
 * @example
 * type A = ExtractStrict<'xs' | 's' | 'm' | 'l', 'xs' | 's'>;
 * //=> 'xs' | 's'
 * type B = ExtractStrict<{status: 'ok'; data: string} | {status: 'error'}, {status: 'ok'}>;
 * //=> {status: 'ok'; data: string}
 * @example
 * // @ts-expect-error: `'xxl'` keeps nothing
 * type C = ExtractStrict<'s' | 'm' | 'l', 'l' | 'xxl'>;
 */
export type ExtractStrict<
  T,
  U extends ([U] extends [
    // Every member of `U` must keep something of `T`
    U extends unknown ? (Extract<T, U> extends never ? never : U) : never,
  ]
    ? unknown
    : never),
> = ExtractStrictBase<T, U>;
