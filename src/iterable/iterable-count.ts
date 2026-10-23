import {count} from 'es-toolkit/iterator';

/**
 * Counts the elements of an iterable by consuming it.
 * Never use it on an infinite iterable.
 *
 * To count elements by group, use `countBy`.
 * @param iterable - The iterable to count the elements of.
 * @returns The number of elements.
 * @example
 * iterableCount(new Set([1, 2, 3]));
 * // 3
 * @example
 * iterableCount(iterableRange(0, 100, 7));
 * // 15
 */
export const iterableCount = (iterable: Iterable<unknown>) => count(iterable[Symbol.iterator]());
