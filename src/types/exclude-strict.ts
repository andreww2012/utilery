import type {ExcludeStrict as ExcludeStrictBase} from 'type-fest';

/**
 * `Exclude`, but every member of `U` must remove something from `T`, so that a
 * typo or an outdated member is a compile error.
 * @example
 * type A = ExcludeStrict<'xs' | 's' | 'm' | 'l', 'xs' | 's'>;
 * //=> 'm' | 'l'
 * type B = ExcludeStrict<{status: 'ok'; data: string} | {status: 'error'}, {status: 'ok'}>;
 * //=> {status: 'error'}
 * @example
 * // @ts-expect-error: `'xxl'` removes nothing
 * type C = ExcludeStrict<'s' | 'm' | 'l', 'l' | 'xxl'>;
 */
export type ExcludeStrict<
  T,
  U extends ([U] extends [
    // Every member of `U` must remove something from `T`
    U extends unknown ? ([T] extends [Exclude<T, U>] ? never : U) : never,
  ]
    ? unknown
    : never),
> = ExcludeStrictBase<T, U>;
