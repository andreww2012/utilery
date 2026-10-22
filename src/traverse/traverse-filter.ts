import {filter} from 'neotraverse';
import type {TraverseContext, TraverseOptions} from './_shared.ts';

/**
 * Collects every node of `value` (depth-first) for which `predicate` is truthy
 * into a flat array.
 * @param value - The (possibly nested) value to search.
 * @param predicate - Invoked as `(context, node)`; return truthy to keep the node.
 * @param options - Traversal options (`immutable`, `includeSymbols`, `maxDepth`, ...).
 * @returns A flat array of the matching nodes.
 * @example
 * traverseFilter({a: 1, b: 2, c: 3}, (_context, node) => typeof node === 'number' && node % 2 === 0);
 * // [2]
 */
export const traverseFilter: (
  value: unknown,
  predicate: (context: TraverseContext, node: unknown) => unknown,
  options?: TraverseOptions,
) => unknown[] = filter;
