import type {MaybePromise} from '../types/maybe-promise.ts';

// A nullish default export counts as missing. Not `Default extends null | undefined`: it would
// distribute, and the module in its true branch would become an intersection with `{default: undefined}`
type DefaultExportOrModule<Module> = Module extends {default: infer Default}
  ? unknown extends Default
    ? Default
    :
        | NonNullable<Default>
        | (null extends Default ? Module : undefined extends Default ? Module : never)
  : Module;

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
 *
 * In generic code, a module typed as `T | {default: T}` resolves to `T`.
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
 * @example
 * // Generic code
 * const load = <T>(loadModule: () => Promise<T | {default: T}>): Promise<T> =>
 *   interopDefault(loadModule());
 */
export function interopDefault<T extends {default: unknown}>(
  module: MaybePromise<T>,
): Promise<DefaultExportOrModule<T>>;

/**
 * Resolves a module typed as `T | {default: T}` (or a promise of one) to `T`,
 * also in generic code.
 * @param module - The module or a promise of it.
 * @returns A promise of the default export when the module has a `default` property that is not
 * `null` or `undefined`, otherwise of the module itself.
 */
export function interopDefault<T = never>(
  // With `NoInfer` and `never`, a module with no `default` key in its type doesn't match, so the
  // next overload keeps a generic type as is, to be resolved where it's known
  module: MaybePromise<{default: T} | NoInfer<T>>,
): Promise<T>;

/**
 * Resolves a module (or a promise of one) to its default export when it has
 * one that is not `null` or `undefined`, or to the module itself otherwise.
 * @param module - The module or a promise of it.
 * @returns A promise of the default export when the module has a `default` property that is not
 * `null` or `undefined`, otherwise of the module itself.
 */
export function interopDefault<T>(module: T): Promise<DefaultExportOrModule<Awaited<T>>>;
export async function interopDefault(module: unknown): Promise<unknown> {
  const resolved = await module;

  return resolved != null &&
    (typeof resolved === 'object' || typeof resolved === 'function') &&
    'default' in resolved &&
    resolved.default != null
    ? resolved.default
    : resolved;
}
