import {paths} from 'neotraverse';
import type {TraverseOptions} from './_shared.ts';

/**
 * Returns the path (as an array of keys) of every node of `value`, depth-first,
 * starting with the empty path for the root.
 * @param value - The (possibly nested) value to enumerate.
 * @param options - Traversal options (`immutable`, `includeSymbols`, `maxDepth`, ...).
 * @returns One key-array per node, in depth-first order.
 * @example
 * traversePaths({a: {b: 1}});
 * // [[], ['a'], ['a', 'b']]
 */
export const traversePaths: (value: unknown, options?: TraverseOptions) => PropertyKey[][] = paths;
