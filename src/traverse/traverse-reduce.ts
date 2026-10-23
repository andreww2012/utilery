import {reduce} from 'neotraverse';
import type {TraverseContext, TraverseOptions} from './_shared.ts';

/** Folds every node of `value` into a single accumulator, depth-first */
// The upstream function returns `any`, but it returns the accumulator
export const traverseReduce: {
  /**
   * Folds every node of `value` into a single accumulator, depth-first.
   * The `callback` receives the traversal `context`, the current `accumulator`
   * and the node, and returns the next accumulator.
   * @param value - The (possibly nested) value to reduce.
   * @param callback - Invoked as `(context, accumulator, node)` for every node.
   * @param initialValue - The starting accumulator.
   * @param options - Traversal options (`immutable`, `includeSymbols`, `maxDepth`, ...).
   * @returns The final accumulator.
   * @example
   * traverseReduce(
   *   {a: 1, b: 2},
   *   (_context, accumulator, node) => accumulator + (typeof node === 'number' ? node : 0),
   *   0,
   * );
   * // 3
   */
  <Accumulator>(
    value: unknown,
    callback: (context: TraverseContext, accumulator: Accumulator, node: unknown) => Accumulator,
    initialValue?: Accumulator,
    options?: TraverseOptions,
  ): Accumulator;
} = reduce;
