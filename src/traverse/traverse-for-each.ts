import {forEach} from 'neotraverse';
import type {TraverseContext, TraverseOptions} from './_shared.ts';

/**
 * Recursively visits every node of `value` (arrays, plain objects and their
 * nested combinations) depth-first, invoking `callback` for each. The first
 * argument is the traversal `context` (`path`, `key`, `parent`, `isLeaf`,
 * `level`, `circular`, plus mutators like `update`/`remove`/`stop`); the second
 * is the node itself. Mutations happen in place via the context, so the
 * (mutated) input is returned (a copy when `{immutable: true}`).
 *
 * Hardened against prototype pollution.
 * The walk is recursive and overflows the call stack past ~2000 levels of
 * nesting; pass `{maxDepth}` to bound it on untrusted input.
 * @param value - The (possibly nested) value to walk.
 * @param callback - Invoked as `(context, node)` for every node.
 * @param options - Traversal options (`immutable`, `includeSymbols`, `maxDepth`, ...).
 * @returns The (mutated) `value`, keeping its static shape.
 * @example
 * traverseForEach([5, -3], (context, node) => {
 *   if (typeof node === 'number' && node < 0) {
 *     context.update(node + 128);
 *   }
 * });
 * // [5, 125]
 */
// The upstream function returns `any`, but it returns the value it was given
export const traverseForEach: <T>(
  value: T,
  callback: (context: TraverseContext, node: unknown) => void,
  options?: TraverseOptions,
) => T = forEach;
