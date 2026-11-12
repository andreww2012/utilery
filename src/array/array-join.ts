import {arrayJoin as arrayJoinBase} from 'ts-extras';
import type {Primitive} from '../types/primitive.ts';

/**
 * Joins the elements of an array into a string, like `Array.prototype.join`, but the result type is
 * the joined literal when the elements and the delimiter are literals
 */
export const arrayJoin: {
  /**
   * Joins the elements of an array with a comma, like `Array.prototype.join`
   * with no delimiter, but the result type is the joined literal when the
   * elements are literals.
   * `null` and `undefined` become empty strings.
   * @param array - The array to join.
   * @returns The joined string.
   * @example
   * arrayJoin(['a', 'b', 'c']);
   * // 'a,b,c' (type: 'a,b,c')
   */
  <const Items extends readonly Exclude<Primitive, symbol>[]>(
    array: Items,
    delimiter?: undefined,
  ): ReturnType<typeof arrayJoinBase<Items, ','>>;

  /**
   * Joins the elements of an array into a string, like `Array.prototype.join`,
   * but the result type is the joined literal when the elements and the
   * delimiter are literals.
   * `null` and `undefined` become empty strings.
   * An array of unknown length and a tuple with optional elements give a
   * `string`.
   * @param array - The array to join.
   * @param delimiter - The string to put between the elements.
   * @returns The joined string.
   * @example
   * arrayJoin(['a', 'b', 'c'], '.');
   * // 'a.b.c' (type: 'a.b.c')
   * @example
   * declare const names: string[];
   * arrayJoin(names, ', ');
   * // type: string
   */
  <const Items extends readonly Exclude<Primitive, symbol>[], Delimiter extends string>(
    array: Items,
    delimiter: Delimiter,
  ): ReturnType<typeof arrayJoinBase<Items, Delimiter>>;

  /**
   * Joins the elements of an array into a string, like `Array.prototype.join`.
   * Elements with no literal form, like objects, are converted to strings the
   * same way.
   * An array that may have a `symbol` element is not accepted, as joining it
   * throws a `TypeError`.
   * @param array - The array to join.
   * @param delimiter - The string to put between the elements.
   * Defaults to a comma.
   * @returns The joined string.
   * @throws {TypeError} When an element can't be converted to a string: a
   * `symbol` that the types can't reject, like one in an `unknown[]` or in a
   * nested array, or an object with no `toString` method.
   * @example
   * arrayJoin([new Date(0), 'b'], ' | ');
   * // type: string
   */
  <Items extends readonly unknown[]>(
    array: Items & readonly Exclude<Items[number], symbol>[],
    delimiter?: string,
  ): string;
} = arrayJoinBase;
