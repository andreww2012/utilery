import type {ExtendsStrict as ExtendsStrictBase} from 'type-fest';

/** Options of `ExtendsStrict` */
export interface ExtendsStrictOptions {
  /**
   * Checks each member of a union on its own, so that a union whose members
   * only partly match gives `boolean`.
   * Defaults to `false`
   */
  distributiveUnions?: boolean;

  /**
   * Treats `Left` being `never` as assignable only to `never`, `any` and
   * `unknown`, instead of to every type.
   * Defaults to `true`
   */
  strictNever?: boolean;

  /**
   * Treats `Left` being `any` as assignable only to `any` and `unknown`, instead
   * of to every type.
   * When `false` and `distributiveUnions` is `true`, `any` gives `boolean`.
   * Defaults to `false`
   */
  strictAny?: boolean;
}

/**
 * Whether `Left` is assignable to `Right`, like `Left extends Right`, with
 * options for how unions, `never` and `any` are treated.
 * By default, unions are not distributed, and `never` is not assignable to
 * other types.
 * @example
 * type A = ExtendsStrict<number | string, string>;
 * //=> false
 * type B = ExtendsStrict<number | string, string, {distributiveUnions: true}>;
 * //=> boolean
 * type C = ExtendsStrict<never, number>;
 * //=> false
 * type D = ExtendsStrict<any, number, {strictAny: true}>;
 * //=> false
 */
export type ExtendsStrict<
  Left,
  Right,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends ExtendsStrictOptions = {},
> = ExtendsStrictBase<Left, Right, Options>;
