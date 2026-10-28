import {arrayJoin as arrayJoinBase} from 'ts-extras';
import type {ArrayJoin} from '../types/array-join.ts';

/**
 * Joins the elements of an array into a string, like `Array.prototype.join`, but the result type is
 * the joined literal when the elements and the delimiter are literals
 */
export const arrayJoin: {
  /**
   * Joins the elements of an array into a string, like `Array.prototype.join`,
   * but the result type is the joined literal when the elements and the
   * delimiter are literals.
   * `null` and `undefined` become empty strings.
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
  <
    const Items extends readonly (string | number | bigint | boolean | null | undefined)[],
    Delimiter extends string,
  >(
    array: Items,
    delimiter: Delimiter,
  ): ArrayJoin<Items, Delimiter>;
} = arrayJoinBase;
