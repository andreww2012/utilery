import {flowAsync as esFlowAsync} from 'es-toolkit/fp';
import type {AnyFunction, FirstFunction, LastFunction} from './_shared.ts';

interface FlowAsyncFn {
  /**
   * Async counterpart of `flow`: composes a list of functions into a single
   * function that returns a promise and pipes its input through them from left
   * to right.
   * The first function in the list receives the call arguments, and each
   * following one receives the **awaited** result of the previous one, so sync
   * and async functions can be mixed freely.
   * @param functions - The functions to compose.
   * Must contain at least one function; the first one may accept any signature,
   * every following one is called with a single argument (the previous awaited
   * return value).
   * @param isFromRight - Leave it out, or pass `false`, to run the list from left
   * to right.
   * Pass `true` to run it from right to left.
   * @returns A function that takes the parameters of the first function,
   * threads its input through the composed list and resolves to the final
   * awaited result.
   * @example
   * const loadUserName = flowAsync([
   *   (id: number) => fetch(`/api/users/${id}`),
   *   (response: Response) => response.json(),
   *   (user: {name: string}) => user.name,
   * ]);
   * await loadUserName(1);
   * // 'Alice'
   */
  <const Functions extends readonly AnyFunction[]>(
    functions: Functions,
    isFromRight?: false,
  ): (
    ...arguments_: Parameters<FirstFunction<Functions>>
  ) => Promise<Awaited<ReturnType<LastFunction<Functions>>>>;

  /**
   * Async counterpart of `flow`: composes a list of functions into a single
   * function that returns a promise and runs them from right to left.
   * The last function in the list receives the call arguments, and each
   * previous one receives the **awaited** result of the one after it, so sync
   * and async functions can be mixed freely.
   * @param functions - The functions to compose.
   * Must contain at least one function; the last one may accept any signature,
   * every previous one is called with a single argument (the awaited result of
   * the one after it).
   * @param isFromRight - `true` to run the list from right to left.
   * @returns A function that takes the parameters of the last function, threads
   * its input through the composed list and resolves to the final awaited
   * result.
   * @example
   * const composed = flowAsync(
   *   [(value: number) => `result: ${value}`, async (value: number) => value * 2],
   *   true,
   * );
   * await composed(3);
   * // 'result: 6'
   */
  <const Functions extends readonly AnyFunction[]>(
    functions: Functions,
    isFromRight: true,
  ): (
    ...arguments_: Parameters<LastFunction<Functions>>
  ) => Promise<Awaited<ReturnType<FirstFunction<Functions>>>>;

  /**
   * Async counterpart of `flow`: composes a list of functions into a single
   * function that returns a promise and runs them from left to right, or from
   * right to left when `isFromRight` is `true`.
   * When the direction is only known at runtime, the types of the parameters
   * and the result are unknown.
   * @param functions - The functions to compose.
   * Must contain at least one function.
   * @param isFromRight - When `true`, runs the list from right to left.
   * Defaults to `false`.
   * @returns A function that threads its input through the composed list and
   * resolves to the final awaited result.
   * @example
   * declare const isReversed: boolean;
   * const composed = flowAsync([String, Number], isReversed);
   */
  (
    functions: readonly AnyFunction[],
    isFromRight?: boolean,
  ): (...arguments_: never[]) => Promise<unknown>;
}

/** Composes a list of sync or async functions into a single function that returns a promise */
export const flowAsync = ((functions: readonly AnyFunction[], isFromRight = false) =>
  esFlowAsync(
    ...((isFromRight ? functions.toReversed() : functions) as Parameters<typeof esFlowAsync>),
  )) as FlowAsyncFn;
