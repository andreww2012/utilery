import {flow as esFlow, flowRight as esFlowRight} from 'es-toolkit/function';

/**
 * Composes a list of functions into a single function.
 * By default the first function in the list receives the call arguments and
 * each subsequent function takes the previous result.
 * With `isFromRight = true`, composition runs in reverse order (the last
 * function in the list is invoked first), mirroring mathematical function
 * composition.
 * @param functions - The functions to compose.
 * Must contain at least one function; the first one may accept any signature,
 * every following one is called with a single argument (the previous return
 * value).
 * @param isFromRight - When `true`, runs the list right-to-left (compose).
 * Defaults to `false` (pipe).
 * @returns A function that, when invoked, threads its input through the
 * composed list and returns the final result.
 * @example
 * // Pipe: input flows left-to-right
 * const piped = flow([
 *   (value: number) => value + 1,
 *   (value: number) => value * 2,
 *   (value: number) => `result: ${value}`,
 * ]);
 * piped(3);
 * // 'result: 8'  ((3 + 1) * 2)
 * @example
 * // Compose: input flows right-to-left
 * const composed = flow(
 *   [
 *     (value: number) => `result: ${value}`,
 *     (value: number) => value * 2,
 *     (value: number) => value + 1,
 *   ],
 *   true,
 * );
 * composed(3);
 * // 'result: 8'  (same as above; the list is reversed)
 * @example
 * // The first function can accept multiple arguments
 * const sum = flow([(a: number, b: number) => a + b, (n: number) => n * 10]);
 * sum(2, 3);
 * // 50
 */
export const flow = (
  functions: readonly ((...parameters: never[]) => unknown)[],
  isFromRight = false,
): ((...parameters: never[]) => unknown) => {
  return isFromRight ? esFlowRight(...functions) : esFlow(...functions);
};
