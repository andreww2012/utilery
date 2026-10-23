import {isEmpty} from 'es-toolkit/compat';

type EmptyObject<T> = {[K in keyof T]?: never};

type EmptyObjectOf<T> = EmptyObject<T> extends T ? EmptyObject<T> : never;

/** Checks whether a value is empty, like `''`, `[]`, `{}`, `null` or an empty `Map` */
export const isEmptyValue: {
  /**
   * Checks whether a value is empty:
   *
   * - `null` and `undefined`;
   * - a string, an array, a typed array, a `Buffer` or an `arguments` object with
   *   a length of `0`;
   * - a `Map` or a `Set` with no entries;
   * - an object or a function with no own enumerable string keys;
   * - any other primitive, like a number or a boolean.
   *
   * A plain object with a `length` property is checked by its keys, not its
   * `length`.
   * To only check plain objects, use `isEmptyObject`.
   * @param value - The value to check.
   * @returns `true` if the value is empty, otherwise `false`.
   * @example
   * isEmptyValue('');
   * // true
   * isEmptyValue(new Map());
   * // true
   * isEmptyValue({a: 1});
   * // false
   */
  // eslint-disable-next-line ts/no-explicit-any, ts/no-unnecessary-type-parameters -- the exact upstream type, which catches `any` arguments
  <T extends {__trapAny: any}>(value?: T): boolean;

  /**
   * Checks whether a value is empty:
   *
   * - `null` and `undefined`;
   * - a string, an array, a typed array, a `Buffer` or an `arguments` object with
   *   a length of `0`;
   * - a `Map` or a `Set` with no entries;
   * - an object or a function with no own enumerable string keys;
   * - any other primitive, like a number or a boolean.
   *
   * A plain object with a `length` property is checked by its keys, not its
   * `length`.
   * To only check plain objects, use `isEmptyObject`.
   * @param value - The string to check.
   * @returns `true` if the string is `''`, narrowing it to `''`, otherwise `false`.
   * @example
   * isEmptyValue('');
   * // true
   * isEmptyValue(' ');
   * // false
   */
  (value: string): value is '';

  /**
   * Checks whether a value is empty:
   *
   * - `null` and `undefined`;
   * - a string, an array, a typed array, a `Buffer` or an `arguments` object with
   *   a length of `0`;
   * - a `Map` or a `Set` with no entries;
   * - an object or a function with no own enumerable string keys;
   * - any other primitive, like a number or a boolean.
   *
   * A plain object with a `length` property is checked by its keys, not its
   * `length`.
   * To only check plain objects, use `isEmptyObject`.
   * @param value - The collection to check.
   * @returns `true` if the value is `null`, `undefined`, or has no elements or
   * entries, otherwise `false`.
   * @example
   * isEmptyValue(new Map());
   * // true
   * isEmptyValue([0]);
   * // false
   */
  // eslint-disable-next-line ts/no-explicit-any -- the exact upstream type
  (value: Map<any, any> | Set<any> | ArrayLike<any> | null | undefined): boolean;

  /**
   * Checks whether a value is empty:
   *
   * - `null` and `undefined`;
   * - a string, an array, a typed array, a `Buffer` or an `arguments` object with
   *   a length of `0`;
   * - a `Map` or a `Set` with no entries;
   * - an object or a function with no own enumerable string keys;
   * - any other primitive, like a number or a boolean.
   *
   * A plain object with a `length` property is checked by its keys, not its
   * `length`.
   * To only check plain objects, use `isEmptyObject`.
   * @param value - The object to check.
   * @returns `true` if the object has no own enumerable string keys, otherwise
   * `false`.
   * @example
   * isEmptyValue({});
   * // true
   * isEmptyValue({a: 1});
   * // false
   */
  (value: object): boolean;

  /**
   * Checks whether a value is empty:
   *
   * - `null` and `undefined`;
   * - a string, an array, a typed array, a `Buffer` or an `arguments` object with
   *   a length of `0`;
   * - a `Map` or a `Set` with no entries;
   * - an object or a function with no own enumerable string keys;
   * - any other primitive, like a number or a boolean.
   *
   * A plain object with a `length` property is checked by its keys, not its
   * `length`.
   * To only check plain objects, use `isEmptyObject`.
   * @param value - The object to check.
   * @returns `true` if the value is `null`, `undefined` or an object with no own
   * enumerable string keys, narrowing it to an object without its properties,
   * otherwise `false`.
   * @example
   * const settings: {theme?: string} | null = loadSettings();
   * if (isEmptyValue(settings)) {
   *   settings;
   *   // {theme?: never} | null
   * }
   */
  <T extends object>(value: T | null | undefined): value is EmptyObjectOf<T> | null | undefined;

  /**
   * Checks whether a value is empty:
   *
   * - `null` and `undefined`;
   * - a string, an array, a typed array, a `Buffer` or an `arguments` object with
   *   a length of `0`;
   * - a `Map` or a `Set` with no entries;
   * - an object or a function with no own enumerable string keys;
   * - any other primitive, like a number or a boolean.
   *
   * A plain object with a `length` property is checked by its keys, not its
   * `length`.
   * To only check plain objects, use `isEmptyObject`.
   * @param value - The value to check.
   * @returns `true` if the value is empty, otherwise `false`.
   * @example
   * // Primitives other than strings are always empty
   * isEmptyValue(42);
   * // true
   */
  // eslint-disable-next-line ts/no-explicit-any -- the exact upstream type
  (value?: any): boolean;
} = isEmpty;
