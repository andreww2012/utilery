import {map} from 'neotraverse';
import type {TraverseContext, TraverseOptions} from './_shared.ts';

/**
 * Like `traverseForEach`, but returns a deeply-cloned copy of `value` with every mutation applied
 * via the context, leaving the input untouched
 */
// The upstream function returns `any`, but it returns a clone of the value it was given
export const traverseMap: {
  /**
   * Like `traverseForEach`, but returns a deeply-cloned copy of `value`
   * with every mutation applied via the context, leaving the input untouched.
   *
   * The result keeps the input's static shape (`T`); leaf-type changes made
   * through `context.update` are not reflected in the type.
   * Hardened against prototype pollution.
   * @param value - The (possibly nested) value to map over.
   * @param callback - Invoked as `(context, node)` for every node; use `context.update` to
   * transform.
   * @param options - Traversal options (`immutable`, `includeSymbols`, `maxDepth`, ...).
   * @returns A new value of the same shape with the transformations applied.
   * @example
   * traverseMap({count: 1}, (context, node) => {
   *   if (typeof node === 'number') {
   *     context.update(node + 1);
   *   }
   * });
   * // {count: 2}
   */
  <T>(
    value: T,
    callback: (context: TraverseContext, node: unknown) => void,
    options?: TraverseOptions,
  ): T;
} = map;
