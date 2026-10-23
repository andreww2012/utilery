// Infers the parameter of the typed overload
type ModuleIdOf<GetModule> = GetModule extends {
  (id: infer Id): unknown;
  // eslint-disable-next-line ts/unified-signatures -- matching two overloads needs two signatures
  (id: string): unknown;
}
  ? Id
  : never;

/** ID of a Node.js built-in module, like `'node:fs'` or `'path'` */
type BuiltinModuleId = ModuleIdOf<NodeJS.Process['getBuiltinModule']>;

/**
 * Loads a Node.js built-in module (like `node:fs`) synchronously, from code
 * that also runs in other environments: returns `undefined` instead of
 * failing where built-in modules are not available, like in browsers.
 *
 * Unlike a top-level `import`, nothing is loaded until the function is called,
 * so bundlers for the browser do not try to resolve the module.
 * Works in Node.js and in runtimes compatible with it (Deno, Bun).
 * @param id - The ID of the built-in module, with or without the `node:` prefix.
 * @returns The module, or `undefined` if built-in modules are not available.
 * @example
 * const fs = getBuiltinModule('node:fs');
 * if (fs) {
 *   fs.writeFileSync('log.txt', message);
 * } else {
 *   localStorage.setItem('log', message);
 * }
 * @example
 * getBuiltinModule('node:path')?.join('a', 'b');
 * // 'a/b' in Node.js, `undefined` in browsers
 */
export const getBuiltinModule = <Id extends BuiltinModuleId>(
  id: Id,
): ReturnType<typeof process.getBuiltinModule<Id>> | undefined =>
  // eslint-disable-next-line ts/no-unnecessary-condition -- missing outside Node.js, which its types can't tell
  globalThis.process?.getBuiltinModule?.(id);
