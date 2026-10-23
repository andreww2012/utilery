import pMemoize, {type AnyAsyncFunction, type ShouldCache, pMemoizeClear} from 'p-memoize';

interface MemoizeAsyncCache<Key, Value> {
  has: (key: Key) => Promise<boolean> | boolean;
  get: (key: Key) => Promise<Value | undefined> | Value | undefined;
  set: (key: Key, value: Value) => unknown;
  /** Not used, but allowed so that a cache with this method can be passed as an object literal */
  delete?: (key: Key) => unknown;
  /** Called by the `clear` method of the memoized function */
  clear?: () => unknown;
}

/** Options of `memoizeAsync` */
export interface MemoizeAsyncOptions<Fn extends AnyAsyncFunction, CacheKey> {
  /**
   * Returns the cache key of a call from its arguments.
   * The key can be of any type the `cache` supports, compared like `Map` keys
   * are: by default, two objects are only the same key when they are the same
   * object.
   * Return a string, like `JSON.stringify(callArguments)`, to compare the
   * arguments by value.
   * A call with no arguments gets the same key as a call with `undefined`.
   * `this` is not part of the key.
   * It must not return a promise, as every call would then get a new key.
   * Defaults to returning the first argument
   */
  readonly cacheKey?: (
    callArguments: Parameters<Fn>,
  ) => CacheKey extends PromiseLike<unknown> ? never : CacheKey;

  /**
   * Where to store the results: an object with `has`, `get` and `set` methods,
   * and optionally `clear`, like a `WeakMap` or an LRU cache.
   * `get` is only called after `has` returns `true`, so a cache that loses the
   * entry in between gives `undefined`.
   * Pass `false` to only share pending calls.
   * Defaults to a new `Map`
   */
  readonly cache?: MemoizeAsyncCache<CacheKey, Awaited<ReturnType<Fn>>> | false;

  /**
   * Decides whether to store a value the function resolved with: return
   * `false` to not store it, so that the next call runs the function again.
   * Pending calls are shared either way.
   * An error it throws is passed to the caller, and the value is not stored.
   * Not called when `cache` is `false`.
   * Defaults to storing every value
   */
  readonly shouldCache?: ShouldCache<CacheKey, Awaited<ReturnType<Fn>>, Parameters<Fn>>;
}

/**
 * Memoizes an async function: calls with the same cache key share one call,
 * both while it is pending and after it resolves, so the function runs only
 * once per key.
 * Unlike `memoize`, a rejection is never cached: the next call with that key
 * tries again.
 *
 * The cache key is the first argument by default; pass `cacheKey` to build it
 * from all arguments.
 * Pass `cache` to use another storage (like a `WeakMap`, an LRU cache, or one
 * whose entries expire), or `false` to only share pending calls.
 * `shouldCache` decides whether a value is stored.
 * Call `clear()` on the result to forget everything; it throws a `TypeError`
 * for a cache that has no `clear` method, like a `WeakMap`.
 * @param fn - The async function to memoize.
 * @param options - `cacheKey`, `cache` and `shouldCache`.
 * @returns The memoized function, with a `clear` method.
 * @example
 * const getUser = memoizeAsync(async (id: string) => await fetchUser(id));
 * await Promise.all([getUser('1'), getUser('1')]);
 * // `fetchUser` is called once
 * @example
 * // Key by all arguments
 * const search = memoizeAsync(fetchResults, {cacheKey: (callArguments) => JSON.stringify(callArguments)});
 * @example
 * // Don't cache empty results
 * const findUser = memoizeAsync(queryUser, {shouldCache: (user) => user != null});
 */
export const memoizeAsync = <Fn extends AnyAsyncFunction, CacheKey = Parameters<Fn>[0]>(
  fn: Fn,
  options?: MemoizeAsyncOptions<Fn, CacheKey>,
): Fn & {clear: () => void} => {
  const memoized = pMemoize(fn, options);
  return Object.assign(memoized, {
    clear: () => {
      if (options?.cache !== false) {
        pMemoizeClear(memoized);
      }
    },
  });
};
