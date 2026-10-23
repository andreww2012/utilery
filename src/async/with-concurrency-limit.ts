import {limitAsync} from 'es-toolkit/promise';

/** Wraps an async function so that at most `concurrency` of its calls run at the same time */
export const withConcurrencyLimit: {
  /**
   * Wraps an async function so that at most `concurrency` of its calls run at the
   * same time.
   * Further calls wait until a running one settles, and then start in the order
   * they were made.
   * @param callback - The async function to limit.
   * @param concurrency - The maximum number of calls that run at the same time.
   * @returns A function with the same signature as `callback`.
   * @example
   * const fetchLimited = withConcurrencyLimit((url: string) => fetch(url), 3);
   * // At most 3 requests are in flight at any time
   * await Promise.all(urls.map((url) => fetchLimited(url)));
   */
  <F extends Parameters<typeof limitAsync>[0]>(callback: F, concurrency: number): F;
} = limitAsync;
