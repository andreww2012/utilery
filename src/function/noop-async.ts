import {asyncNoop} from 'es-toolkit/function';

/** An async function that does nothing: it returns a promise that resolves to `undefined` */
export const noopAsync: {
  /**
   * An async function that does nothing: it returns a promise that resolves to
   * `undefined`.
   * Handy as a default for an optional async callback.
   * For a synchronous one, use `noop`.
   * @returns A promise that resolves to `undefined`.
   * @example
   * const save = options.onSave ?? noopAsync;
   * await save();
   */
  (): Promise<void>;
} = asyncNoop;
