import {curry as esCurry, curryRight as esCurryRight} from 'es-toolkit/function';

type Curry<Params extends readonly unknown[], Result> = Params extends readonly []
  ? () => Result
  : Params extends readonly [infer Head, ...infer Tail]
    ? (head: Head) => Curry<Tail, Result>
    : never;

type CurryRight<Params extends readonly unknown[], Result> = Params extends readonly []
  ? () => Result
  : Params extends readonly [...infer Init, infer Last]
    ? (last: Last) => CurryRight<Init, Result>
    : never;

interface CurryFn {
  <F extends (...parameters: never[]) => unknown>(
    fn: F,
    isFromRight?: false,
  ): Curry<Parameters<F>, ReturnType<F>>;

  <F extends (...parameters: never[]) => unknown>(
    fn: F,
    isFromRight: true,
  ): CurryRight<Parameters<F>, ReturnType<F>>;
}

/**
 * Converts a function `fn(a, b, c, ...)` into a chain of single-argument
 * calls `f(a)(b)(c)...` that returns the original result once every argument
 * has been supplied.
 * @param fn - The function to curry.
 * Its arity determines how many calls the returned chain expects.
 * @param isFromRight - When `true`, arguments are collected from the rightmost
 * parameter inward, so `f(c)(b)(a)` reaches the original `fn(a, b, c)`.
 * Defaults to `false` (left-to-right collection).
 * @returns A curried function that accepts one argument per call until the
 * original function's parameter count is reached.
 * @example
 * // Left-to-right curry collects arguments in declaration order
 * const add = (a: number, b: number, c: number) => a + b + c;
 * const curried = curry(add);
 * curried(1)(2)(3);
 * // 6
 * @example
 * // Right curry collects arguments from the rightmost parameter inward
 * const subtract = (a: number, b: number, c: number) => a - b - c;
 * const curriedRight = curry(subtract, true);
 * curriedRight(1)(2)(3);
 * // 3 - 2 - 1 === 0
 * @example
 * // Nullary functions are returned as a thunk you can still invoke
 * const greet = () => 'hi';
 * curry(greet)();
 * // 'hi'
 */
export const curry = ((fn: (...parameters: never[]) => unknown, isFromRight = false) => {
  return isFromRight ? esCurryRight(fn) : esCurry(fn);
}) as CurryFn;
