import type {AsyncReturnType} from 'type-fest';

/**
 * The type a function's returned promise resolves to, like
 * `Awaited<ReturnType<T>>`.
 * @example
 * declare function fetchUser(): Promise<{name: string}>;
 * type User = ReturnTypeAwaited<typeof fetchUser>;
 * //=> {name: string}
 */
export type ReturnTypeAwaited<Target extends (...arguments_: any[]) => PromiseLike<unknown>> =
  AsyncReturnType<Target>;
