import {flow as esFlow, flowRight as esFlowRight} from 'es-toolkit/function';
import type {AnyFunction, FirstFunction, LastFunction} from './_shared.ts';

interface FlowFn {
  /**
   * Composes a list of functions into a single function that pipes its input
   * through them from left to right: the first function in the list receives
   * the call arguments and each following one takes the previous result.
   * @param functions - The functions to compose.
   * Must contain at least one function; the first one may accept any signature,
   * every following one is called with a single argument (the previous return
   * value).
   * @param isFromRight - Leave it out, or pass `false`, to run the list from left
   * to right.
   * Pass `true` to run it from right to left.
   * @returns A function that takes the parameters of the first function,
   * threads its input through the composed list and returns the final result.
   * @example
   * const piped = flow([
   *   (value: number) => value + 1,
   *   (value: number) => value * 2,
   *   (value: number) => `result: ${value}`,
   * ]);
   * piped(3);
   * // 'result: 8'  ((3 + 1) * 2)
   * @example
   * // The first function can accept multiple arguments
   * const sum = flow([(a: number, b: number) => a + b, (n: number) => n * 10]);
   * sum(2, 3);
   * // 50
   */
  <const Functions extends readonly AnyFunction[]>(
    functions: Functions,
    isFromRight?: false,
  ): (...arguments_: Parameters<FirstFunction<Functions>>) => ReturnType<LastFunction<Functions>>;

  /**
   * Composes a list of functions into a single function that runs them from
   * right to left, mirroring mathematical function composition: the last
   * function in the list receives the call arguments and each previous one
   * takes the result of the one after it.
   * @param functions - The functions to compose.
   * Must contain at least one function; the last one may accept any signature,
   * every previous one is called with a single argument (the result of the one
   * after it).
   * @param isFromRight - `true` to run the list from right to left.
   * @returns A function that takes the parameters of the last function, threads
   * its input through the composed list and returns the final result.
   * @example
   * const composed = flow(
   *   [
   *     (value: number) => `result: ${value}`,
   *     (value: number) => value * 2,
   *     (value: number) => value + 1,
   *   ],
   *   true,
   * );
   * composed(3);
   * // 'result: 8'  ((3 + 1) * 2)
   */
  <const Functions extends readonly AnyFunction[]>(
    functions: Functions,
    isFromRight: true,
  ): (...arguments_: Parameters<LastFunction<Functions>>) => ReturnType<FirstFunction<Functions>>;

  /**
   * Composes a list of functions into a single function that runs them from
   * left to right, or from right to left when `isFromRight` is `true`.
   * When the direction is only known at runtime, the types of the parameters
   * and the result are unknown.
   * @param functions - The functions to compose.
   * Must contain at least one function.
   * @param isFromRight - When `true`, runs the list from right to left.
   * Defaults to `false`.
   * @returns A function that threads its input through the composed list and
   * returns the final result.
   * @example
   * declare const isReversed: boolean;
   * const composed = flow([String, Number], isReversed);
   */
  (functions: readonly AnyFunction[], isFromRight?: boolean): (...arguments_: never[]) => unknown;
}

/** Composes a list of functions into a single function */
export const flow = ((functions: readonly AnyFunction[], isFromRight = false) =>
  isFromRight ? esFlowRight(...functions) : esFlow(...functions)) as FlowFn;
