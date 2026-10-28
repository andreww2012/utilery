import {before} from 'es-toolkit/function';

/**
 * Wraps a function so that it is only called on the first `n - 1` calls: from the `n`-th call on,
 * the wrapper does nothing
 */
export const untilNthCall: {
  /**
   * Wraps a function so that it is only called on the first `n - 1` calls: from
   * the `n`-th call on, the wrapper does nothing.
   * An `n` of `0` or `1` never calls `fn`.
   * For the opposite, use `fromNthCall`.
   * @param n - The number of the first call that no longer calls `fn`.
   * @param fn - The function to call.
   * @returns A function that calls `fn` with its arguments before the `n`-th call, and returns
   * `undefined` from then on.
   * @throws {Error} When `n` is not a non-negative integer.
   * @example
   * const warn = untilNthCall(3, (message: string) => console.warn(message));
   * warn('a'); // logs 'a'
   * warn('b'); // logs 'b'
   * warn('c'); // nothing
   */
  <F extends (...parameters: never[]) => unknown>(
    n: number,
    fn: F,
  ): (...parameters: Parameters<F>) => ReturnType<F> | undefined;
} = before;
