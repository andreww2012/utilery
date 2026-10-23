import type {AllExtend} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

/** Options of `EveryElementExtends` */
export interface EveryElementExtendsOptions {
  /**
   * Treats a `never` element as matching only `never` (or `any`), instead of
   * matching every type.
   * Defaults to `true`
   */
  strictNever?: boolean;
}

/**
 * Whether every element of a tuple type is assignable to `Type`.
 * An element that only partly matches, like `number | string` for `number`,
 * gives `boolean`.
 * An optional element matches only when `Type` includes `undefined`, unless
 * the `exactOptionalPropertyTypes` compiler option is on.
 * For some elements, use `SomeElementExtends`.
 * @example
 * type A = EveryElementExtends<[1, 2, 3], number>;
 * //=> true
 * type B = EveryElementExtends<[1, 2, '3'], number>;
 * //=> false
 * type C = EveryElementExtends<[number, number | string], number>;
 * //=> boolean
 * @example
 * type D = EveryElementExtends<[1, never], number>;
 * //=> false
 * type E = EveryElementExtends<[1, never], number, {strictNever: false}>;
 * //=> true
 */
export type EveryElementExtends<
  TArray extends UnknownArray,
  Type,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends EveryElementExtendsOptions = {},
> = AllExtend<TArray, Type, Options>;
