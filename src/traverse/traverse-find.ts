import {find} from 'neotraverse';
import type {TraverseContext, TraverseOptions} from './_shared.ts';

/**
 * Returns the first node of `value` (depth-first) for which `predicate` is
 * truthy, or `undefined` if none match.
 * @param value - The (possibly nested) value to search.
 * @param predicate - Invoked as `(context, node)`; return truthy to select the node.
 * @param options - Traversal options (`immutable`, `includeSymbols`, `maxDepth`, ...).
 * @returns The first matching node, or `undefined`.
 * @example
 * traverseFind({a: 1, b: 5}, (_context, node) => typeof node === 'number' && node > 3);
 * // 5
 */
export const traverseFind: (
  value: unknown,
  predicate: (context: TraverseContext, node: unknown) => unknown,
  options?: TraverseOptions,
) => unknown = find;
