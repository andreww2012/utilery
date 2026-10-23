import type {Falsy} from '../types/falsy.ts';

/**
 * Combines functions into one that calls each of them in order with the same
 * arguments.
 * Falsy entries (`null`, `undefined`, `false`, `0`, `''`) are skipped, so
 * optional callbacks and `condition && callback` can be passed directly.
 * Return values are ignored.
 * If a function throws, the error is rethrown and the functions after it are
 * not called.
 * @param functions - The functions to call, or falsy values to skip.
 * @returns A function that calls all of them.
 * @example
 * const onClick = callAll(trackClick, props.onClick);
 * onClick(event);
 * // calls `trackClick(event)`, then `props.onClick?.(event)`
 * @example
 * // Run all cleanup functions
 * const cleanup = callAll(unsubscribe, clearTimer, isOpen && close);
 * cleanup();
 */
export const callAll =
  <Arguments extends unknown[]>(
    ...functions: (((...parameters: Arguments) => unknown) | Falsy)[]
  ) =>
  (...callArguments: Arguments): void => {
    functions.forEach((fn) => {
      if (fn) {
        fn(...callArguments);
      }
    });
  };
