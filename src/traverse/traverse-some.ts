import {some} from 'neotraverse';
import type {TraverseContext, TraverseOptions} from './_shared.ts';

/**
 * Returns `true` if `predicate` is truthy for at least one node of `value`, stopping at the first
 * match
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const traverseSome: {
  /**
   * Returns `true` if `predicate` is truthy for at least one node of `value`,
   * stopping at the first match.
   * @param value - The (possibly nested) value to test.
   * @param predicate - Invoked as `(context, node)`; return truthy to short-circuit with `true`.
   * @param options - Traversal options (`immutable`, `includeSymbols`, `maxDepth`, ...).
   * @returns Whether any node matched.
   * @example
   * traverseSome({a: 1, b: 2}, (_context, node) => typeof node === 'number' && node > 1);
   * // true
   */
  (
    value: unknown,
    predicate: (context: TraverseContext, node: unknown) => unknown,
    options?: TraverseOptions,
  ): boolean;
} = some;
