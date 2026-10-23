import {filter} from 'neotraverse';
import type {TraverseContext, TraverseOptions} from './_shared.ts';

/**
 * Collects every node of `value` (depth-first) for which `predicate` is truthy into a flat array.
 */
export const traverseFilter: {
  /**
   * Collects every node of `value` (depth-first) for which `predicate` is truthy
   * into a flat array.
   * @param value - The (possibly nested) value to search.
   * @param predicate - Invoked as `(context, node)`; return truthy to keep the node.
   * @param options - Traversal options (`immutable`, `includeSymbols`, `maxDepth`, ...).
   * @returns A flat array of the matching nodes.
   * @example
   * const isEven = (node: unknown) => typeof node === 'number' && node % 2 === 0;
   * traverseFilter({a: 1, b: 2, c: 3}, (_context, node) => isEven(node));
   * // [2]
   */
  (
    value: unknown,
    predicate: (context: TraverseContext, node: unknown) => unknown,
    options?: TraverseOptions,
  ): unknown[];
} = filter;
