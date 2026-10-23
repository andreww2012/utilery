import {ary} from 'es-toolkit/function';

/** Wraps a function so that it receives at most `n` arguments: the rest are dropped */
export const withMaxArity: {
  /**
   * Wraps a function so that it receives at most `n` arguments: the rest are
   * dropped.
   * Handy for passing a function with optional parameters as a callback that
   * gets extra arguments, like `parseInt` to `Array.prototype.map`.
   * @param fn - The function to call.
   * @param n - The maximum number of arguments to pass on.
   * @returns A function that calls `fn` with its first `n` arguments.
   * @example
   * ['1', '2', '3'].map(withMaxArity(Number.parseInt, 1));
   * // [1, 2, 3], while `.map(Number.parseInt)` gives [1, NaN, NaN]
   */
  <F extends (...parameters: never[]) => unknown>(
    fn: F,
    n: number,
  ): (...parameters: any[]) => ReturnType<F>;
} = ary;
