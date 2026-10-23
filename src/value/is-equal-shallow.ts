import {isShallowEqual} from 'remeda';

interface IsEqualShallow {
  /**
   * Checks whether two values are shallowly equal, narrowing the first one to
   * the type of the second one.
   * Values are compared like this:
   *
   * - Primitives are compared with `SameValueZero`, so `NaN` equals `NaN` and
   *   `0` equals `-0`.
   * - Arrays and objects are equal when they have the same own enumerable keys,
   *   with values equal by `SameValueZero`.
   * - Maps are equal when they have the same keys, with values equal by
   *   `SameValueZero`, and sets when they have the same values.
   *
   * Nested values are not compared by content: for that, use `isEqual`.
   * Symbol keys are ignored.
   * Other built-in objects, like dates, regular expressions and promises, are
   * compared by their own enumerable keys, so two different dates are equal.
   * @param data - The first value.
   * @param other - The second value.
   * @returns `true` if the values are shallowly equal, otherwise `false`.
   * @example
   * declare const mode: 'a' | 'b';
   * if (isEqualShallow(mode, 'a')) {
   *   mode; // 'a'
   * }
   */
  <T, S extends T>(data: T, other: T extends Exclude<T, S> ? S : never): data is S;

  /**
   * Checks whether two values are shallowly equal.
   * Values are compared like this:
   *
   * - Primitives are compared with `SameValueZero`, so `NaN` equals `NaN` and
   *   `0` equals `-0`.
   * - Arrays and objects are equal when they have the same own enumerable keys,
   *   with values equal by `SameValueZero`.
   * - Maps are equal when they have the same keys, with values equal by
   *   `SameValueZero`, and sets when they have the same values.
   *
   * Nested values are not compared by content: for that, use `isEqual`.
   * Symbol keys are ignored.
   * Other built-in objects, like dates, regular expressions and promises, are
   * compared by their own enumerable keys, so two different dates are equal.
   * @param data - The first value.
   * @param other - The second value.
   * @returns `true` if the values are shallowly equal, otherwise `false`.
   * @example
   * isEqualShallow([1, 2, 3], [1, 2, 3]);
   * // true
   * isEqualShallow({a: 1, b: 'x'}, {b: 'x', a: 1});
   * // true
   * isEqualShallow({a: 1, b: [2]}, {a: 1, b: [2]});
   * // false: the arrays are different objects
   */
  <T>(data: T, other: T): boolean;

  /**
   * Creates a function that checks whether its argument is shallowly equal to
   * `other`, narrowing it to the type of `other`.
   * Values are compared like this:
   *
   * - Primitives are compared with `SameValueZero`, so `NaN` equals `NaN` and
   *   `0` equals `-0`.
   * - Arrays and objects are equal when they have the same own enumerable keys,
   *   with values equal by `SameValueZero`.
   * - Maps are equal when they have the same keys, with values equal by
   *   `SameValueZero`, and sets when they have the same values.
   *
   * Nested values are not compared by content: for that, use `isEqual`.
   * Symbol keys are ignored.
   * Other built-in objects, like dates, regular expressions and promises, are
   * compared by their own enumerable keys, so two different dates are equal.
   * @param other - The value to compare with.
   * @returns A type guard for values shallowly equal to `other`.
   * @example
   * declare const modes: ('a' | 'b')[];
   * modes.filter(isEqualShallow<'a' | 'b', 'a'>('a'));
   * // 'a'[]
   */
  <T, S extends T>(other: T extends Exclude<T, S> ? S : never): (data: T) => data is S;

  /**
   * Creates a function that checks whether its argument is shallowly equal to
   * `other`.
   * Values are compared like this:
   *
   * - Primitives are compared with `SameValueZero`, so `NaN` equals `NaN` and
   *   `0` equals `-0`.
   * - Arrays and objects are equal when they have the same own enumerable keys,
   *   with values equal by `SameValueZero`.
   * - Maps are equal when they have the same keys, with values equal by
   *   `SameValueZero`, and sets when they have the same values.
   *
   * Nested values are not compared by content: for that, use `isEqual`.
   * Symbol keys are ignored.
   * Other built-in objects, like dates, regular expressions and promises, are
   * compared by their own enumerable keys, so two different dates are equal.
   * @param other - The value to compare with.
   * @returns A predicate for values shallowly equal to `other`.
   * @example
   * [[1, 2], [1, 3]].filter(isEqualShallow([1, 2]));
   * // [[1, 2]]
   */
  <T>(other: T): (data: T) => boolean;
}

/**
 * Checks whether two values are shallowly equal: their own properties, elements or entries are
 * compared with `SameValueZero`.
 * With one argument, it returns a function that compares its argument with the given value.
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const isEqualShallow: IsEqualShallow = isShallowEqual;
