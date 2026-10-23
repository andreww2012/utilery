import type {SomeExtend} from 'type-fest';
import type {UnknownArray} from './unknown-array.ts';

/** Options of `SomeElementExtends` */
export interface SomeElementExtendsOptions {
  /**
   * Treats a `never` element as matching only `never` (or `any`), instead of
   * matching every type.
   * Defaults to `true`
   */
  strictNever?: boolean;
}

/**
 * Whether some element of a tuple type is assignable to `Type`.
 * When no element fully matches but one partly does, like `number | string`
 * for `number`, the result is `boolean`.
 * An optional element matches only when `Type` includes `undefined`, unless
 * the `exactOptionalPropertyTypes` compiler option is on.
 * For every element, use `EveryElementExtends`.
 * @example
 * type A = SomeElementExtends<['1', '2', 3], number>;
 * //=> true
 * type B = SomeElementExtends<[1, 2, 3], string>;
 * //=> false
 * type C = SomeElementExtends<[string, number | string], number>;
 * //=> boolean
 * @example
 * type D = SomeElementExtends<[1, never], string>;
 * //=> false
 * type E = SomeElementExtends<[1, never], string, {strictNever: false}>;
 * //=> true
 */
export type SomeElementExtends<
  TArray extends UnknownArray,
  Type,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends SomeElementExtendsOptions = {},
> = SomeExtend<TArray, Type, Options>;
