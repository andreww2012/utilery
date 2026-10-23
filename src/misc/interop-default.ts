/**
 * Resolves a module (or a promise of one, like the result of a dynamic
 * `import()`) to its default export when it has one, or to the module itself
 * otherwise.
 * A `default` export that is `null` or `undefined` counts as missing, as some
 * CommonJS interop layers add it to every module.
 *
 * Useful when the shape of a module depends on how it was built and loaded:
 * importing a CommonJS module gives its exports as the default export, while an
 * ES module might have no default export at all.
 * @param module - The module or a promise of it.
 * @returns A promise of the default export when the module has a `default` property that is not
 * `null` or `undefined`, otherwise of the module itself.
 * @example
 * // Dynamic import of a package that may or may not have a default export
 * const plugin = await interopDefault(import('eslint-plugin-example'));
 * @example
 * // Already loaded modules work too
 * await interopDefault({default: 42, named: 'x'});
 * // 42
 * await interopDefault({named: 'x'});
 * // {named: 'x'}
 * await interopDefault({default: undefined, named: 'x'});
 * // {default: undefined, named: 'x'}
 */
export function interopDefault<T>(
  module: T,
): Promise<
  Awaited<T> extends {default: infer Default}
    ? Default extends null | undefined
      ? Awaited<T>
      : Default
    : Awaited<T>
>;
export async function interopDefault(module: unknown) {
  const resolved = await module;

  return resolved != null &&
    (typeof resolved === 'object' || typeof resolved === 'function') &&
    'default' in resolved &&
    resolved.default != null
    ? resolved.default
    : resolved;
}
