import type {ArrayValues as ArrayValuesBase} from 'type-fest';

/**
 * The union of the elements of a tuple type, like `T[number]`.
 * For the union of its indexes, use `ArrayIndexes`.
 * @example
 * const weekdays = ['Monday', 'Tuesday', 'Wednesday'] as const;
 * type Weekday = ArrayValues<typeof weekdays>;
 * //=> 'Monday' | 'Tuesday' | 'Wednesday'
 */
export type ArrayValues<T extends readonly unknown[]> = ArrayValuesBase<T>;
