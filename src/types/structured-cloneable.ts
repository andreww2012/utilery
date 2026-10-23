import type {StructuredCloneable as StructuredCloneableBase} from 'type-fest';

/**
 * A value that `structuredClone` copies without losing data: primitives,
 * plain objects, arrays, dates, maps, sets, typed arrays, errors and the like,
 * at any depth.
 * An instance of a custom error class is cloned as a plain `Error`.
 * @example
 * const good = {count: 3, date: new Date(), map: new Map()} satisfies StructuredCloneable;
 * class Custom {}
 * // @ts-expect-error: class instances lose their class
 * const bad = {custom: new Custom()} satisfies StructuredCloneable;
 */
export type StructuredCloneable = StructuredCloneableBase;
