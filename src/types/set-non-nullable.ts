import type {SetNonNullable as SetNonNullableBase} from 'type-fest';
import type {Prettify} from './prettify.ts';

/**
 * Removes `null` and `undefined` from the given properties of an object type
 * (all of them by default), keeping the other properties as they are.
 * Optional properties stay optional.
 * For deep paths, use `SetNonNullableDeep`.
 * @example
 * type Foo = {a: number | null; b: string | undefined; c?: boolean | null};
 * type A = SetNonNullable<Foo, 'b' | 'c'>;
 * //=> {a: number | null; b: string; c?: boolean}
 * type B = SetNonNullable<Foo>;
 * //=> {a: number; b: string; c?: boolean}
 */
export type SetNonNullable<BaseType, Keys extends keyof BaseType = keyof BaseType> = Prettify<
  SetNonNullableBase<BaseType, Keys>
>;
