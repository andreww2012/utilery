import type {ConditionalPickDeep} from 'type-fest';

/** Options of `PickConditionalDeep` */
export interface PickConditionalDeepOptions {
  /**
   * How a value matches `Condition`: `'extends'` when it is assignable to it,
   * and `'equality'` when it is exactly the same type.
   * Defaults to `'extends'`
   */
  condition?: 'extends' | 'equality';
}

/**
 * Keeps only the properties of an object type whose values match `Condition`,
 * at any depth, along with the objects on the way to them.
 * For an optional property, include `undefined` in `Condition`.
 * Gives `never` when nothing matches.
 * For top-level properties only, use `PickConditional`.
 * @example
 * type Example = {
 *   a: string;
 *   b: string | boolean;
 *   c: {d: string; e: {f?: string; g: boolean}};
 * };
 * type A = PickConditionalDeep<Example, string>;
 * //=> {a: string; c: {d: string}}
 * type B = PickConditionalDeep<Example, string | undefined>;
 * //=> {a: string; c: {d: string; e: {f?: string}}}
 * type C = PickConditionalDeep<Example, string | boolean, {condition: 'equality'}>;
 * //=> {b: string | boolean}
 */
export type PickConditionalDeep<
  Type,
  Condition,
  // eslint-disable-next-line ts/no-empty-object-type -- no options, so that the defaults apply
  Options extends PickConditionalDeepOptions = {},
> = ConditionalPickDeep<Type, Condition, Options>;
