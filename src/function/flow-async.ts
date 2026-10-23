import {flowAsync as esFlowAsync} from 'es-toolkit/fp';

/**
 * Async counterpart of `flow`: composes a list of functions into a single
 * function that returns a promise.
 * Each function receives the **awaited** result of the previous one, so sync
 * and async functions can be mixed freely.
 * By default the first function in the list receives the call arguments; with
 * `isFromRight = true`, the last function in the list is invoked first.
 * @param functions - The functions to compose.
 * Must contain at least one function; the first one may accept any signature,
 * every following one is called with a single argument (the previous awaited
 * return value).
 * @param isFromRight - When `true`, runs the list right-to-left (compose).
 * Defaults to `false` (pipe).
 * @returns A function that, when invoked, threads its input through the
 * composed list and resolves to the final awaited result.
 * @example
 * // Pipe: input flows left-to-right, awaiting every step
 * const loadUserName = flowAsync([
 *   (id: number) => fetch(`/api/users/${id}`),
 *   (response: Response) => response.json(),
 *   (user: {name: string}) => user.name,
 * ]);
 * await loadUserName(1);
 * // 'Alice'
 * @example
 * // Compose: input flows right-to-left
 * const composed = flowAsync(
 *   [(value: number) => `result: ${value}`, async (value: number) => value * 2],
 *   true,
 * );
 * await composed(3);
 * // 'result: 6'
 */
export const flowAsync = (
  functions: readonly ((...parameters: never[]) => unknown)[],
  isFromRight = false,
): ((...parameters: never[]) => Promise<unknown>) => {
  return esFlowAsync(
    ...((isFromRight ? functions.toReversed() : functions) as Parameters<typeof esFlowAsync>),
  );
};
