import type {IterableElement as IterableElementBase} from 'type-fest';

/**
 * The element type of an iterable or an async iterable, like an array, a
 * `Set`, a `Map`, a generator or a stream.
 * @example
 * function* numbers() {
 *   yield 1;
 *   yield 2;
 * }
 * type A = IterableElement<ReturnType<typeof numbers>>;
 * //=> 1 | 2
 * @example
 * const fruits = new Set(['apple', 'pear'] as const);
 * type Fruit = IterableElement<typeof fruits>;
 * //=> 'apple' | 'pear'
 */
export type IterableElement<TargetIterable> = IterableElementBase<TargetIterable>;
