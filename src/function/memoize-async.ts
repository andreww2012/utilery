import pMemoize, {type AnyAsyncFunction, type Options, pMemoizeClear} from 'p-memoize';

/** Options of `memoizeAsync` */
export type MemoizeAsyncOptions<Fn extends AnyAsyncFunction, CacheKey> = Options<Fn, CacheKey>;

/**
 * Memoizes an async function: calls with the same cache key share one call,
 * both while it is pending and after it resolves, so the function runs only
 * once per key. Unlike `memoize`, a rejection is never cached: the next call
 * with that key tries again.
 *
 * The cache key is the first argument by default; pass `cacheKey` to build it
 * from all arguments. Pass `cache` to use another storage (like a `WeakMap`,
 * an LRU cache, or one whose entries expire), or `false` to only share
 * pending calls. `shouldCache` decides whether a value is stored. Call
 * `clear()` on the result to forget everything; it throws a `TypeError` for a
 * cache that has no `clear` method, like a `WeakMap`.
 * @param fn - The async function to memoize.
 * @param options - `cacheKey`, `cache` and `shouldCache`.
 * @returns The memoized function, with a `clear` method.
 * @example
 * const getUser = memoizeAsync(async (id: string) => await fetchUser(id));
 * await Promise.all([getUser('1'), getUser('1')]);
 * // `fetchUser` is called once
 * @example
 * // Key by all arguments
 * const search = memoizeAsync(fetchResults, {cacheKey: (args) => JSON.stringify(args)});
 * @example
 * // Don't cache empty results
 * const findUser = memoizeAsync(queryUser, {shouldCache: (user) => user != null});
 */
export const memoizeAsync = <Fn extends AnyAsyncFunction, CacheKey = Parameters<Fn>[0]>(
  fn: Fn,
  options?: MemoizeAsyncOptions<Fn, CacheKey>,
) => {
  const memoized = pMemoize(fn, options);
  return Object.assign(memoized, {
    clear: () => {
      if (options?.cache !== false) {
        pMemoizeClear(memoized);
      }
    },
  });
};
