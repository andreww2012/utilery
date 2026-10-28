import {isNode as isNodeBase} from 'es-toolkit/predicate';

/** Checks whether the code runs in Node.js or in a runtime compatible with it, like Bun */
export const isNode: {
  /**
   * Checks whether the code runs in Node.js or in a runtime compatible with it,
   * like Bun, by checking that `process.versions.node` exists.
   * Such runtimes provide the Node.js APIs, like built-in modules (`node:fs`).
   * To tell Bun apart, use `isBun`.
   * @returns `true` in Node.js and in runtimes compatible with it, otherwise `false`.
   * @example
   * if (isNode()) {
   *   const fs = await import('node:fs');
   * }
   */
  (): boolean;
} = isNodeBase;
