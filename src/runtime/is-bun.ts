/**
 * Checks whether the code runs in Bun, by checking that `process.versions.bun`
 * exists.
 *
 * Bun is compatible with Node.js, so `isNode` returns `true` in it too: use this
 * function to tell them apart.
 * @returns `true` in Bun, otherwise `false`.
 * @example
 * isBun();
 * // true in Bun, false in Node.js and browsers
 * @example
 * const runtimeName = isBun() ? 'Bun' : 'Node.js';
 */
export const isBun = (): boolean =>
  // eslint-disable-next-line ts/no-unnecessary-condition -- missing outside Node.js and Bun, which its types can't tell
  globalThis.process?.versions?.bun != null;
