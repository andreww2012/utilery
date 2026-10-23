import {every} from 'neotraverse';
import type {TraverseContext, TraverseOptions} from './_shared.ts';

/**
 * Returns `true` if `predicate` is truthy for every node of `value`, stopping at the first node
 * that fails.
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const traverseEvery: {
  /**
   * Returns `true` if `predicate` is truthy for every node of `value`, stopping
   * at the first node that fails.
   * @param value - The (possibly nested) value to test.
   * @param predicate - Invoked as `(context, node)`; return falsy to short-circuit with `false`.
   * @param options - Traversal options (`immutable`, `includeSymbols`, `maxDepth`, ...).
   * @returns Whether every node matched.
   * @example
   * traverseEvery({a: 2, b: 4}, (_context, node) => typeof node !== 'number' || node % 2 === 0);
   * // true
   */
  (
    value: unknown,
    predicate: (context: TraverseContext, node: unknown) => unknown,
    options?: TraverseOptions,
  ): boolean;
} = every;
