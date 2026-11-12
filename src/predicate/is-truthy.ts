import {isTruthy as isTruthyBase} from 'ts-extras';
import type {IsAny} from '../types/is-any.ts';
import type {Primitive} from '../types/primitive.ts';
import type {Truthy} from '../types/truthy.ts';

type TruthyValue<T> =
  IsAny<T> extends true ? T : unknown extends T ? Truthy<Primitive> | object : Truthy<T>;

/**
 * Checks whether `value` is truthy and acts as a type guard that subtracts the falsy members
 * (`false`, `0`, `0n`, `''`, `null`, `undefined`) from its type
 */
export const isTruthy: {
  /**
   * Checks whether `value` is truthy and acts as a type guard that subtracts the
   * falsy members (`false`, `0`, `0n`, `''`, `null`, `undefined`) from its type.
   * Unlike `array.filter(Boolean)` (whose return type is unchanged), filtering
   * with `isTruthy` narrows the resulting element type.
   *
   * Note that falsy *literals* can only be removed from union types: `isTruthy`
   * narrows `0 | 1` to `1` and `'' | 'a'` to `'a'`, but cannot subtract `''`/`0`
   * from the wide `string`/`number` types, which remain as-is.
   * So when it returns `false`, a wide `string`, `number` or `bigint` becomes
   * `never`, and a union loses it (`string | undefined` becomes `undefined`),
   * even though `''`, `0`, `NaN` and `0n` are falsy.
   * To check such a value outside of callbacks, use `!value` instead.
   * An `unknown` value is narrowed to the truthy types (`string`, `number`,
   * `bigint`, `true`, `symbol` and `object`), and stays `unknown` when it returns
   * `false`.
   * @param value - The value to test.
   * @returns `true` when `value` is truthy; narrows `value` to its non-falsy type.
   * @example
   * // Filtering narrows the element type (here to `number`)
   * const values: (number | null | undefined)[] = [1, null, 2, undefined];
   * const numbers = values.filter(isTruthy);
   * // numbers: number[] -> [1, 2]
   * @example
   * // Removes falsy literals from a union
   * const flag = 0 as 0 | 1;
   * if (isTruthy(flag)) {
   *   flag; // 1
   * }
   */
  <T>(value: T): value is T & TruthyValue<T>;
} = isTruthyBase;
