import {nodes} from 'neotraverse';
import type {TraverseOptions} from './_shared.ts';

/**
 * Returns every node of `value` (including the root and every intermediate container), depth-first,
 * as a flat array.
 */
export const traverseNodes: {
  /**
   * Returns every node of `value` (including the root and every intermediate
   * container), depth-first, as a flat array.
   * @param value - The (possibly nested) value to enumerate.
   * @param options - Traversal options (`immutable`, `includeSymbols`, `maxDepth`, ...).
   * @returns Every node, in depth-first order.
   * @example
   * traverseNodes({x: 1, y: {z: 2}}).filter((node) => typeof node === 'number');
   * // [1, 2]
   */
  (value: unknown, options?: TraverseOptions): unknown[];
} = nodes;
