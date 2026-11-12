import {isIncludedIn as isIncludedInBase} from 'remeda';
import type {IsLiteral} from '../types/is-literal.ts';
import type {IsUnion} from '../types/is-union.ts';

type Container<T = unknown> = readonly T[] | readonly [];

// A type with a single value: a literal, `null` or `undefined`
type IsSingleValue<T> =
  IsUnion<T> extends true
    ? false
    : [T] extends [null]
      ? true
      : [T] extends [undefined]
        ? true
        : IsLiteral<T>;

// A tuple of single values without optional or rest elements, which holds every value of its type
type IsConstantTuple<T extends Container> = T extends readonly []
  ? true
  : T extends readonly [infer Head, ...infer Rest]
    ? IsSingleValue<Head> extends true
      ? IsConstantTuple<Rest>
      : false
    : false;

// Narrowing is exact when the container holds every value of `data` that the element type covers
type CanNarrow<T, S extends Container> = [Extract<T, S[number]>] extends [never]
  ? true
  : IsConstantTuple<S>;

/** Checks whether a value is one of the elements of an array, like `Array.prototype.includes` */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const isIncludedIn: {
  /**
   * Checks whether `data` is one of the elements of `container`, like
   * `container.includes(data)`, and narrows it to the element type.
   * It narrows only when that is exact: when `container` is a tuple of single
   * literal values, like `['cat', 'dog'] as const`, or when no member of the type
   * of `data` is covered by the element type, like `string` with
   * `('cat' | 'dog')[]`.
   * Values are compared with `SameValueZero`, so `NaN` matches `NaN`.
   * @param data - The value to look for.
   * @param container - The array to search.
   * @returns `true` if `container` has `data`, otherwise `false`.
   * @example
   * declare const animal: 'cat' | 'dog' | 'mouse';
   * if (isIncludedIn(animal, ['cat', 'dog'] as const)) {
   *   animal; // 'cat' | 'dog'
   * } else {
   *   animal; // 'mouse'
   * }
   */
  <T, S extends Container<T>>(
    data: T,
    container: CanNarrow<T, S> extends true ? S : never,
  ): data is S[number];

  /**
   * Checks whether `data` is one of the elements of `container`, like
   * `container.includes(data)`.
   * Narrowing wouldn't be exact, so nothing is narrowed: the array may not hold
   * every value of `data` that its element type covers.
   * Values are compared with `SameValueZero`, so `NaN` matches `NaN`.
   * @param data - The value to look for.
   * @param container - The array to search.
   * @returns `true` if `container` has `data`, otherwise `false`.
   * @example
   * declare const animal: 'cat' | 'dog' | 'mouse';
   * declare const pets: ('cat' | 'dog')[];
   * if (!isIncludedIn(animal, pets)) {
   *   animal; // still 'cat' | 'dog' | 'mouse'
   * }
   */
  <T, S extends T>(data: T, container: Container<S>): boolean;

  /**
   * Creates a type guard that checks whether its argument is one of the elements
   * of `container`, like `container.includes(data)`, and narrows it to the
   * element type.
   * Unlike the form that takes `data`, it can't check the type of the argument
   * in advance.
   * So when the guard returns `false`, a union argument loses the members that
   * the element type covers, even though the array may not hold them: with
   * `('cat' | 'dog')[]`, `'cat' | 'dog' | 'mouse'` becomes `'mouse'`.
   * Values are compared with `SameValueZero`, so `NaN` matches `NaN`.
   * @param container - The array to search.
   * @returns A type guard for the elements of `container`.
   * @example
   * declare const names: string[];
   * names.filter(isIncludedIn(['cat', 'dog'] as const));
   * // ('cat' | 'dog')[]
   */
  <T, S extends Container<T>>(
    container: CanNarrow<T, S> extends true ? S : never,
  ): (data: T) => data is S[number];

  /**
   * Creates a function that checks whether its argument is one of the elements
   * of `container`, like `container.includes(data)`.
   * Narrowing wouldn't be exact, so nothing is narrowed.
   * Values are compared with `SameValueZero`, so `NaN` matches `NaN`.
   * @param container - The array to search.
   * @returns A predicate for the elements of `container`.
   * @example
   * declare const animals: ('cat' | 'dog' | 'mouse')[];
   * declare const pets: ('cat' | 'dog')[];
   * animals.filter(isIncludedIn(pets));
   * // ('cat' | 'dog' | 'mouse')[]
   */
  <T, S extends T>(container: Container<S>): (data: T) => boolean;
} = isIncludedInBase;
