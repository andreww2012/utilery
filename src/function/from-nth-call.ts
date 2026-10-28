import {after} from 'es-toolkit/function';

/**
 * Wraps a function so that the first `n - 1` calls do nothing: it only starts calling `fn` from the
 * `n`-th call on
 */
export const fromNthCall: {
  /**
   * Wraps a function so that the first `n - 1` calls do nothing: it only starts
   * calling `fn` from the `n`-th call on.
   * Handy to act only once several events have happened.
   * An `n` of `0` or `1` calls `fn` every time.
   * For the opposite, use `untilNthCall`.
   * @param n - The number of the first call that calls `fn`.
   * @param fn - The function to call.
   * @returns A function that calls `fn` with its arguments from the `n`-th call on, and returns
   * `undefined` before.
   * @throws {Error} When `n` is not a non-negative integer.
   * @example
   * const onAllLoaded = fromNthCall(3, () => console.log('All 3 files are loaded'));
   * onAllLoaded(); // nothing
   * onAllLoaded(); // nothing
   * onAllLoaded(); // logs
   */
  <F extends (...parameters: never[]) => unknown>(
    n: number,
    fn: F,
  ): (...parameters: Parameters<F>) => ReturnType<F> | undefined;
} = after;
