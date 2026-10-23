import type {ArrayIndices} from 'type-fest';

/**
 * The union of the valid indexes of a tuple type, like `0 | 1 | 2`.
 * For the union of its elements, use `ArrayValues`.
 * @example
 * const weekdays = ['Monday', 'Tuesday', 'Wednesday'] as const;
 * type WeekdayIndex = ArrayIndexes<typeof weekdays>;
 * //=> 0 | 1 | 2
 * const getWeekday = (index: WeekdayIndex) => weekdays[index];
 */
export type ArrayIndexes<TArray extends readonly unknown[]> = ArrayIndices<TArray>;
