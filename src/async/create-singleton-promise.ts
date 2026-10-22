import {noop} from '../function/noop.ts';
import {promiseTry} from './promise-try.ts';

/** Options of `createSingletonPromise` */
export interface SingletonPromiseOptions {
  /**
   * Keeps a rejected promise, so later calls get the same rejection instead
   * of calling the function again. Defaults to `false`
   */
  cacheRejections?: boolean;

  /**
   * How long a resolved value is kept, in milliseconds, counted from when it
   * resolved; the next call after that calls the function again. Kept forever
   * by default
   */
  ttl?: number;
}

/**
 * Wraps an async function so that it runs only once: every call shares the
 * same promise, both while it is pending and after it resolves. Useful for
 * lazy initialization, like connecting to a database or loading a module on
 * first use.
 *
 * A rejection is not kept by default: the next call tries again (pass
 * `{cacheRejections: true}` to keep it). Pass `ttl` to refresh the value
 * after some time. Call `reset()` to forget the promise; it resolves once the
 * forgotten promise has settled.
 * @param fn - The async function to run once.
 * @param options - `cacheRejections`: keep a rejection (defaults to `false`); `ttl`: how long to keep a resolved value, in milliseconds.
 * @returns A function returning the shared promise, with a `reset` method.
 * @example
 * const getDatabase = createSingletonPromise(() => connect(databaseUrl));
 * const [a, b] = await Promise.all([getDatabase(), getDatabase()]);
 * // connected once; `a === b`
 * @example
 * // Reload the config at most once a minute
 * const getConfig = createSingletonPromise(fetchConfig, {ttl: 60_000});
 * @example
 * // Start over
 * await getDatabase.reset();
 */
export const createSingletonPromise = <T>(fn: () => T, options: SingletonPromiseOptions = {}) => {
  const {cacheRejections = false, ttl} = options;
  let cached: {promise: Promise<Awaited<T>>; resolvedAt?: number} | undefined;

  const isExpired = () =>
    ttl != null && cached?.resolvedAt != null && Date.now() - cached.resolvedAt >= ttl;

  const getPromise = () => {
    if (cached == null || isExpired()) {
      const entry: NonNullable<typeof cached> = {promise: promiseTry(fn)};
      cached = entry;
      void entry.promise
        .then(() => {
          entry.resolvedAt = Date.now();
        })
        .catch(() => {
          if (!cacheRejections && cached === entry) {
            cached = undefined;
          }
        });
    }

    return cached.promise;
  };

  return Object.assign(getPromise, {
    reset: async () => {
      const previous = cached?.promise;
      cached = undefined;
      // Only waits for it to settle: its rejection was already reported to its callers
      await previous?.catch(noop);
    },
  });
};
